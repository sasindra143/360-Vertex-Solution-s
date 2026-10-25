import { apiUrl } from "../../utils/api";

async function readResponse(response) {
  const payload = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.message || `Prompt request failed (${response.status}).`);
  return payload;
}

async function request(path, options = {}) {
  return readResponse(await fetch(apiUrl(path), {
    credentials: "include",
    ...options,
    ...(options.body && !(options.body instanceof FormData)
      ? { headers: { "Content-Type": "application/json", ...options.headers } }
      : {}),
  }));
}

function queryString(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  });
  return query.size ? `?${query}` : "";
}

export const getPublicPrompts = (params) => request(`/api/prompts${queryString(params)}`);
export const getPublicPrompt = (promptId) => request(`/api/prompts/${encodeURIComponent(promptId)}`);
export const getPublicPromptCategories = () => request("/api/prompts/categories");

export const getAdminPrompts = (params) => request(`/api/admin/prompts${queryString(params)}`);
export const getAdminPrompt = (promptId) => request(`/api/admin/prompts/${encodeURIComponent(promptId)}`);
export const getAdminPromptCategories = () => request("/api/admin/prompts/categories");
export const createAdminPromptCategory = (name) => request("/api/admin/prompts/categories", {
  method: "POST",
  body: JSON.stringify({ name }),
});
export const deleteAdminPromptCategory = (categoryId) => request(`/api/admin/prompts/categories/${encodeURIComponent(categoryId)}`, { method: "DELETE" });

export function saveAdminPrompt(prompt, {
  promptId, coverFile, exampleFiles, videoFile, documentFiles,
  keepCoverId, keepExampleImageIds, keepVideoIds, keepDocumentIds,
}) {
  const form = new FormData();
  form.set("prompt", JSON.stringify(prompt));
  if (keepCoverId) form.set("keepCoverId", keepCoverId);
  form.set("keepExampleImageIds", JSON.stringify(keepExampleImageIds || []));
  form.set("keepVideoIds", JSON.stringify(keepVideoIds || []));
  form.set("keepDocumentIds", JSON.stringify(keepDocumentIds || []));
  if (coverFile) form.append("coverImage", coverFile, coverFile.name);
  (exampleFiles || []).forEach((file) => form.append("exampleImages", file, file.name));
  if (videoFile) form.append("videos", videoFile, videoFile.name);
  (documentFiles || []).forEach((file) => form.append("documents", file, file.name));
  const path = promptId
    ? `/api/admin/prompts/${encodeURIComponent(promptId)}`
    : "/api/admin/prompts";
  return request(path, { method: promptId ? "PUT" : "POST", body: form });
}

export const setAdminPromptStatus = (promptId, status) => request(`/api/admin/prompts/${encodeURIComponent(promptId)}/status`, {
  method: "PATCH",
  body: JSON.stringify({ status }),
});
export const duplicateAdminPrompt = (promptId) => request(`/api/admin/prompts/${encodeURIComponent(promptId)}/duplicate`, { method: "POST" });
export const deleteAdminPrompt = (promptId) => request(`/api/admin/prompts/${encodeURIComponent(promptId)}`, { method: "DELETE" });
