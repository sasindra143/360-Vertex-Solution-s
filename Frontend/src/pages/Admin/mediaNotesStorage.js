import { apiUrl } from "../../utils/api";

const LEGACY_DATABASE_NAME = "vertex-media-notes";
const LEGACY_STORE_NAME = "mediaNotes";
const LEGACY_DATABASE_VERSION = 1;
const LEGACY_MIGRATION_KEY = "vertex-media-notes-cms-migrated-v1";

async function readJsonResponse(response) {
  const result = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result?.message || `Notes request failed (${response.status}).`);
  }
  return result;
}

async function request(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    credentials: "include",
    ...options,
    ...(options.body && !(options.body instanceof FormData)
      ? { headers: { "Content-Type": "application/json", ...options.headers } }
      : {}),
  });
  return readJsonResponse(response);
}

function queryString(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") search.set(key, String(value));
  });
  return search.size ? `?${search.toString()}` : "";
}

export function getAdminNotes(params) {
  return request(`/api/admin/notes${queryString(params)}`);
}

export function getPublicNotes(params) {
  return request(`/api/notes${queryString(params)}`);
}

export function getAdminNote(id) {
  return request(`/api/admin/notes/${encodeURIComponent(id)}`);
}

export function getPublicNote(slug) {
  return request(`/api/notes/${encodeURIComponent(slug)}`);
}

export function getAdminCategories() {
  return request("/api/admin/notes/categories");
}

export function getPublicCategories() {
  return request("/api/notes/categories");
}

export function getNotesDashboard() {
  return request("/api/admin/notes/dashboard");
}

export function createAdminNote(note) {
  return request("/api/admin/notes", { method: "POST", body: JSON.stringify({ note }) });
}

export function updateAdminNote(id, note) {
  return request(`/api/admin/notes/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify({ note }),
  });
}

export function publishAdminNote(id) {
  return request(`/api/admin/notes/${encodeURIComponent(id)}/publish`, { method: "PATCH" });
}

export function unpublishAdminNote(id) {
  return request(`/api/admin/notes/${encodeURIComponent(id)}/unpublish`, { method: "PATCH" });
}

export function deleteAdminNote(id) {
  return request(`/api/admin/notes/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function uploadNoteMedia(file) {
  const formData = new FormData();
  formData.append("file", file, file.name);
  return request("/api/admin/notes/uploads", { method: "POST", body: formData });
}

export function createAdminCategory(category) {
  return request("/api/admin/notes/categories", {
    method: "POST",
    body: JSON.stringify(category),
  });
}

export function updateAdminCategory(id, category) {
  return request(`/api/admin/notes/categories/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });
}

export function deleteAdminCategory(id) {
  return request(`/api/admin/notes/categories/${encodeURIComponent(id)}`, { method: "DELETE" });
}

function readLegacyNotes() {
  if (!("indexedDB" in window)) return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    const opening = window.indexedDB.open(LEGACY_DATABASE_NAME, LEGACY_DATABASE_VERSION);
    opening.onupgradeneeded = () => {
      const database = opening.result;
      if (!database.objectStoreNames.contains(LEGACY_STORE_NAME)) {
        database.createObjectStore(LEGACY_STORE_NAME, { keyPath: "id" });
      }
    };
    opening.onerror = () => reject(opening.error || new Error("Could not access old local notes."));
    opening.onsuccess = () => {
      const database = opening.result;
      const transaction = database.transaction(LEGACY_STORE_NAME, "readonly");
      const reading = transaction.objectStore(LEGACY_STORE_NAME).getAll();
      reading.onsuccess = () => {
        database.close();
        resolve(reading.result.sort((first, second) => (
          (second.createdAt || "").localeCompare(first.createdAt || "")
        )));
      };
      reading.onerror = () => {
        database.close();
        reject(reading.error || new Error("Could not read old local notes."));
      };
    };
  });
}

function asNamedFile(value, fallbackName) {
  if (!(value instanceof Blob)) return null;
  if (value instanceof File && value.name) return value;
  const extension = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
  }[value.type] || "bin";
  return new File([value], `${fallbackName}.${extension}`, { type: value.type });
}

export async function migrateLegacyLocalNotes(categoryId) {
  if (window.localStorage.getItem(LEGACY_MIGRATION_KEY)) return 0;
  const legacyNotes = await readLegacyNotes();
  let migrated = 0;
  for (const legacy of legacyNotes) {
    const blocks = [];
    const bulletPoints = Array.isArray(legacy.bulletPoints) ? legacy.bulletPoints : [];
    if (bulletPoints.length) {
      blocks.push({
        id: crypto.randomUUID(),
        type: "richText",
        html: `<ul>${bulletPoints.map((point) => `<li><p>${String(point).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char])}</p></li>`).join("")}</ul>`,
      });
    }

    const document = asNamedFile(legacy.documentFile, legacy.documentName || "learning-note");
    if (document) {
      const uploaded = await uploadNoteMedia(document);
      blocks.push({ id: crypto.randomUUID(), type: "document", attachment: uploaded, label: uploaded.name });
    }
    const oldImages = (legacy.contentImages || []).filter((image) => image instanceof Blob);
    if (legacy.mediaBlob instanceof Blob && legacy.mediaType === "image") oldImages.push(legacy.mediaBlob);
    const uploadedImages = [];
    for (const [index, image] of oldImages.slice(0, 24).entries()) {
      const uploaded = await uploadNoteMedia(asNamedFile(image, image.name || `note-image-${index + 1}`));
      uploadedImages.push(uploaded);
    }
    if (uploadedImages.length) blocks.push({ id: crypto.randomUUID(), type: "gallery", attachments: uploadedImages });
    if (!blocks.length) continue;

    await createAdminNote({
      title: legacy.title || "Imported learning resource",
      slug: legacy.id || undefined,
      summary: legacy.description || "Imported from this browser's saved learning resources.",
      categoryId,
      tags: [],
      status: "published",
      seoTitle: "",
      seoDescription: "",
      blocks,
    });
    migrated += 1;
  }
  window.localStorage.setItem(LEGACY_MIGRATION_KEY, "complete");
  return migrated;
}
