const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const sanitizeHtml = require("sanitize-html");
const { GridFSBucket, ObjectId } = require("mongodb");

const DATABASE_NAME = "vertex_notes";
const FILE_BUCKET = "notesMedia";
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = 25 * 1024 * 1024;
const MAX_VIDEO_SIZE = 20 * 1024 * 1024;
const MAX_FILES_PER_NOTE = 24;

class InputValidationError extends Error {}

function isInputValidationError(error) {
  return error instanceof InputValidationError || error.name === "ValidationError";
}

function normalizeHeadingBlock(text, level) {
  if (typeof text !== "string" || !text.trim() || text.trim().length > 240) {
    throw new InputValidationError("Section headings need text of up to 240 characters.");
  }
  if (!["h2", "h3"].includes(level)) {
    throw new InputValidationError("Choose a valid section heading level.");
  }
  return { text: text.trim(), level };
}

const attachmentSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
}, { _id: false });

const contentBlockSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    enum: ["richText", "heading", "image", "gallery", "video", "document", "callout", "link"],
    required: true,
  },
  html: { type: String, maxlength: 100000 },
  text: { type: String, maxlength: 5000 },
  level: { type: String, enum: ["h2", "h3"] },
  attachment: { type: attachmentSchema, default: null },
  attachments: { type: [attachmentSchema], default: undefined },
  alt: { type: String, maxlength: 300 },
  caption: { type: String, maxlength: 500 },
  label: { type: String, maxlength: 200 },
  url: { type: String, maxlength: 2048 },
  embedUrl: { type: String, maxlength: 500 },
  tone: { type: String, enum: ["info", "tip", "warning"], default: "info" },
}, { _id: false });

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  slug: { type: String, required: true, trim: true, lowercase: true, maxlength: 100 },
  summary: { type: String, default: "", trim: true, maxlength: 500 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "NoteCategory", required: true },
  tags: { type: [String], default: [] },
  coverImage: { type: attachmentSchema, default: null },
  coverImageAlt: { type: String, default: "", maxlength: 300 },
  blocks: { type: [contentBlockSchema], default: [] },
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  publishedAt: { type: Date, default: null },
  seoTitle: { type: String, default: "", trim: true, maxlength: 160 },
  seoDescription: { type: String, default: "", trim: true, maxlength: 320 },
}, { timestamps: true, collection: "notes" });

noteSchema.index({ slug: 1 }, { unique: true });
noteSchema.index({ status: 1, publishedAt: -1 });
noteSchema.index({ category: 1, status: 1, publishedAt: -1 });
noteSchema.index({ tags: 1, status: 1, publishedAt: -1 });

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 60 },
  slug: { type: String, required: true, trim: true, lowercase: true, maxlength: 80 },
  description: { type: String, default: "", trim: true, maxlength: 240 },
}, { timestamps: true, collection: "categories" });

categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ name: 1 }, { unique: true });

const cmsConnection = () => mongoose.connection.useDb(DATABASE_NAME, { useCache: true });

function getModels() {
  const connection = cmsConnection();
  return {
    Note: connection.models.Note || connection.model("Note", noteSchema, "notes"),
    Category: connection.models.NoteCategory
      || connection.model("NoteCategory", categorySchema, "categories"),
  };
}

let databasePromise;
let gridFsBucket;

async function ensureDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB is not configured. Set MONGODB_URI in the backend environment.");
  }
  if (mongoose.connection.readyState !== 1) {
    if (!databasePromise) {
      databasePromise = mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      }).catch((error) => {
        databasePromise = null;
        throw error;
      });
    }
    await databasePromise;
  }
  const connection = cmsConnection();
  if (!gridFsBucket) gridFsBucket = new GridFSBucket(connection.db, { bucketName: FILE_BUCKET });
  return connection;
}

function getGridFsBucket() {
  if (!gridFsBucket) throw new Error("Notes media storage has not been initialized.");
  return gridFsBucket;
}

const uploadStorage = multer.diskStorage({
  destination: os.tmpdir(),
  filename: (_req, _file, callback) => callback(null, `vertex-cms-${crypto.randomUUID()}`),
});

const uploadMedia = multer({
  storage: uploadStorage,
  limits: { fileSize: MAX_DOCUMENT_SIZE, files: 1, fields: 2, fieldSize: 1024 },
  fileFilter: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const supported = [
      ".jpg", ".jpeg", ".png", ".gif", ".webp",
      ".pdf", ".doc", ".docx",
      ".mp4", ".webm",
    ].includes(extension);
    if (!supported) {
      callback(new Error("Upload a supported image, PDF, Word document, MP4, or WebM file."));
      return;
    }
    callback(null, true);
  },
});

function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100)
    .replace(/-+$/g, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sanitizeRichText(value) {
  if (typeof value !== "string" || value.length > 100000) {
    throw new InputValidationError("Rich text must be a string of up to 100,000 characters.");
  }
  return sanitizeHtml(value, {
    allowedTags: [
      "h2", "h3", "h4", "p", "strong", "b", "em", "i", "u", "s",
      "ul", "ol", "li", "blockquote", "pre", "code", "hr",
      "table", "thead", "tbody", "tr", "th", "td", "a",
    ],
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["https", "mailto"],
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          ...(attribs.href?.startsWith("http") ? { target: "_blank" } : {}),
          rel: "nofollow noopener noreferrer",
        },
      }),
    },
  });
}

function safeExternalUrl(value) {
  if (typeof value !== "string" || value.length > 2048) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

function safeVideoEmbed(value) {
  const safeUrl = safeExternalUrl(value);
  if (!safeUrl) return null;
  const url = new URL(safeUrl);
  const host = url.hostname.toLowerCase();
  let videoId;

  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0];
  } else if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(host)) {
    videoId = url.searchParams.get("v")
      || url.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/)?.[1];
  }
  if (videoId && /^[A-Za-z0-9_-]{6,20}$/.test(videoId)) {
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  }

  if (host === "vimeo.com" || host === "www.vimeo.com" || host === "player.vimeo.com") {
    const match = url.pathname.match(/\/(?:video\/)?(\d+)\/?$/);
    if (match) return `https://player.vimeo.com/video/${match[1]}`;
  }
  return null;
}

function normalizeTags(value) {
  if (!Array.isArray(value) || value.length > 12) {
    throw new InputValidationError("Add no more than 12 tags.");
  }
  return [...new Set(value.map((tag) => {
    if (typeof tag !== "string" || tag.trim().length > 32) {
      throw new InputValidationError("Each tag must be text of up to 32 characters.");
    }
    return tag.trim().toLowerCase();
  }).filter(Boolean))];
}

function parsePageParameters(query) {
  const page = Number.parseInt(query.page || "1", 10);
  const limit = Number.parseInt(query.limit || "10", 10);
  if (!Number.isInteger(page) || page < 1 || page > 100000) {
    throw new InputValidationError("Page must be a positive whole number.");
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new InputValidationError("Page size must be between 1 and 50.");
  }
  const sort = query.sort || "newest";
  if (!["newest", "oldest", "title"].includes(sort)) {
    throw new InputValidationError("Choose newest, oldest, or title sorting.");
  }
  return { page, limit, sort };
}

function publicFileUrl(slug, fileId) {
  return `/api/notes/${encodeURIComponent(slug)}/files/${fileId}`;
}

function adminFileUrl(fileId) {
  return `/api/admin/notes/uploads/${fileId}`;
}

function serializeAttachment(attachment, admin, slug) {
  if (!attachment) return null;
  const fileId = attachment.fileId.toString();
  return {
    id: fileId,
    name: attachment.name,
    contentType: attachment.contentType,
    size: attachment.size,
    url: admin ? adminFileUrl(fileId) : publicFileUrl(slug, fileId),
  };
}

function serializeNote(note, admin = false) {
  const slug = note.slug;
  return {
    id: note._id.toString(),
    title: note.title,
    slug,
    summary: note.summary,
    category: note.category && typeof note.category === "object"
      ? {
        id: note.category._id.toString(),
        name: note.category.name,
        slug: note.category.slug,
      }
      : null,
    tags: note.tags || [],
    coverImage: serializeAttachment(note.coverImage, admin, slug),
    coverImageAlt: note.coverImageAlt || "",
    blocks: (note.blocks || []).map((block) => ({
      id: block.id,
      type: block.type,
      ...(block.html ? { html: block.html } : {}),
      ...(block.text ? { text: block.text } : {}),
      ...(block.level ? { level: block.level } : {}),
      ...(block.attachment ? { attachment: serializeAttachment(block.attachment, admin, slug) } : {}),
      ...(block.attachments?.length
        ? { attachments: block.attachments.map((item) => serializeAttachment(item, admin, slug)) }
        : {}),
      ...(block.alt ? { alt: block.alt } : {}),
      ...(block.caption ? { caption: block.caption } : {}),
      ...(block.label ? { label: block.label } : {}),
      ...(block.url ? { url: block.url } : {}),
      ...(block.embedUrl ? { embedUrl: block.embedUrl } : {}),
      ...(block.tone ? { tone: block.tone } : {}),
    })),
    status: note.status,
    publishedAt: note.publishedAt,
    seoTitle: admin ? note.seoTitle : (note.seoTitle || note.title),
    seoDescription: admin ? note.seoDescription : (note.seoDescription || note.summary),
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };
}

function createAuthenticationMiddleware(getSessionFromRequest) {
  return (req, res, next) => {
    if (!getSessionFromRequest(req)) {
      res.status(401).json({ message: "Admin authentication required." });
      return;
    }
    next();
  };
}

function createOriginMiddleware(rejectUnexpectedOrigin) {
  return (req, res, next) => {
    if (!rejectUnexpectedOrigin(req, res)) next();
  };
}

function getSafeOriginalName(file) {
  const name = path.basename(file.originalname.replace(/\\/g, "/"))
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, 180);
  return name || "upload";
}

function fileDetails(file) {
  const extension = path.extname(file.originalname).toLowerCase();
  const types = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
  };
  const contentType = types[extension];
  const descriptor = fs.openSync(file.path, "r");
  const header = Buffer.alloc(12);
  try {
    fs.readSync(descriptor, header, 0, header.length, 0);
  } finally {
    fs.closeSync(descriptor);
  }

  const valid = extension === ".pdf"
    ? header.subarray(0, 5).toString() === "%PDF-"
    : extension === ".doc"
      ? header.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))
      : extension === ".docx"
        ? header.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]))
        : extension === ".png"
          ? header.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
          : extension === ".jpg" || extension === ".jpeg"
            ? header.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))
            : extension === ".gif"
              ? ["GIF87a", "GIF89a"].includes(header.subarray(0, 6).toString())
              : extension === ".webp"
                ? header.subarray(0, 4).toString() === "RIFF" && header.subarray(8, 12).toString() === "WEBP"
                : extension === ".mp4"
                  ? header.subarray(4, 8).toString() === "ftyp"
                  : extension === ".webm"
                    ? header.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))
                    : false;
  if (!valid) throw new InputValidationError(`The uploaded file "${getSafeOriginalName(file)}" does not match its file type.`);
  if (contentType.startsWith("image/") && file.size > MAX_IMAGE_SIZE) {
    throw new InputValidationError("Images must be 10 MB or smaller.");
  }
  if (contentType.startsWith("video/") && file.size > MAX_VIDEO_SIZE) {
    throw new InputValidationError("Videos must be 20 MB or smaller.");
  }
  if (!contentType.startsWith("image/") && !contentType.startsWith("video/") && file.size > MAX_DOCUMENT_SIZE) {
    throw new InputValidationError("Documents must be 25 MB or smaller.");
  }
  return { contentType, name: getSafeOriginalName(file), size: file.size };
}

function uploadToGridFs(file, details) {
  return new Promise((resolve, reject) => {
    const bucket = getGridFsBucket();
    const stream = bucket.openUploadStream(details.name, {
      contentType: details.contentType,
      metadata: { contentType: details.contentType },
    });
    const source = fs.createReadStream(file.path);
    source.on("error", (error) => stream.destroy(error));
    stream.on("error", reject);
    stream.on("finish", () => resolve({
      id: stream.id.toString(),
      name: details.name,
      contentType: details.contentType,
      size: details.size,
      url: adminFileUrl(stream.id.toString()),
    }));
    source.pipe(stream);
  });
}

async function cleanTempFile(file) {
  if (!file?.path) return;
  await fs.promises.unlink(file.path).catch((error) => {
    if (error.code !== "ENOENT") console.error("Could not remove temporary CMS upload:", error.message);
  });
}

async function ensureDefaultCategory(Category) {
  if (await Category.exists({})) return;
  try {
    await Category.create({ name: "General", slug: "general" });
  } catch (error) {
    if (error.code !== 11000) throw error;
  }
}

function parseNotePayload(body) {
  const payload = body?.note;
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new InputValidationError("Provide the note as a JSON object.");
  }
  return payload;
}

async function resolveAttachments(payload) {
  const references = [];
  const collect = (attachment) => {
    if (!attachment) return;
    const id = attachment.id || attachment.fileId;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      throw new InputValidationError("A referenced media file is invalid.");
    }
    references.push({ source: attachment, id });
  };

  collect(payload.coverImage);
  if (!Array.isArray(payload.blocks) || payload.blocks.length > 80) {
    throw new InputValidationError("A note can contain up to 80 content blocks.");
  }
  for (const block of payload.blocks) {
    if (!block || typeof block !== "object") throw new InputValidationError("A content block is invalid.");
    collect(block.attachment);
    if (block.attachments !== undefined) {
      if (!Array.isArray(block.attachments) || block.attachments.length > MAX_FILES_PER_NOTE) {
        throw new InputValidationError("A gallery can contain up to 24 images.");
      }
      block.attachments.forEach(collect);
    }
  }
  if (references.length > MAX_FILES_PER_NOTE) {
    throw new InputValidationError(`A note can reference up to ${MAX_FILES_PER_NOTE} media files.`);
  }
  const ids = [...new Set(references.map((item) => item.id))].map((id) => new ObjectId(id));
  const files = await getGridFsBucket().find({ _id: { $in: ids } }).toArray();
  const fileMap = new Map(files.map((file) => [file._id.toString(), file]));

  const resolve = (attachment) => {
    if (!attachment) return null;
    const id = (attachment.id || attachment.fileId).toLowerCase();
    const file = fileMap.get(id);
    if (!file) throw new InputValidationError("A referenced media file could not be found.");
    const contentType = file.metadata?.contentType || "application/octet-stream";
    if (contentType === "application/octet-stream") {
      throw new InputValidationError("A referenced media file does not have a supported content type.");
    }
    return {
      fileId: file._id,
      name: file.filename,
      contentType,
      size: file.length,
    };
  };
  return { resolve };
}

async function normalizeNote(payload, Category, existingNote) {
  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  const summary = typeof payload.summary === "string" ? payload.summary.trim() : "";
  const slug = slugify(payload.slug || title);
  if (!title || title.length > 160) throw new InputValidationError("Add a title of up to 160 characters.");
  if (!slug) throw new InputValidationError("Add a title that can be used to create a URL slug.");
  if (summary.length > 500) throw new InputValidationError("The summary must be 500 characters or shorter.");

  const status = payload.status === "published" ? "published" : "draft";
  if (payload.status !== undefined && !["draft", "published"].includes(payload.status)) {
    throw new InputValidationError("Choose either draft or published status.");
  }
  const categoryId = typeof payload.categoryId === "string" ? payload.categoryId : payload.category?.id;
  if (typeof categoryId !== "string" || !ObjectId.isValid(categoryId)) {
    throw new InputValidationError("Choose a valid category.");
  }
  const category = await Category.findById(categoryId).select("_id");
  if (!category) throw new InputValidationError("The selected category no longer exists.");

  const tags = normalizeTags(payload.tags || []);
  if (!Array.isArray(payload.blocks)) throw new InputValidationError("Content blocks must be a list.");
  const { resolve } = await resolveAttachments(payload);
  const coverImage = resolve(payload.coverImage);

  const blocks = payload.blocks.map((block) => {
    const id = typeof block.id === "string" && block.id.length <= 80 ? block.id : crypto.randomUUID();
    const type = block.type;
    if (!["richText", "heading", "image", "gallery", "video", "document", "callout", "link"].includes(type)) {
      throw new InputValidationError("A content block has an unsupported type.");
    }
    const normalized = { id, type };
    if (type === "richText") normalized.html = sanitizeRichText(block.html || "");
    if (type === "heading") Object.assign(normalized, normalizeHeadingBlock(block.text, block.level));
    if (type === "callout") {
      if (typeof block.text !== "string" || !block.text.trim() || block.text.length > 5000) {
        throw new InputValidationError("Callout blocks need text of up to 5,000 characters.");
      }
      normalized.text = block.text.trim();
      normalized.tone = ["info", "tip", "warning"].includes(block.tone) ? block.tone : "info";
    }
    if (type === "image") {
      normalized.attachment = resolve(block.attachment);
      if (!normalized.attachment?.contentType.startsWith("image/")) {
        throw new InputValidationError("Image blocks must reference an image upload.");
      }
      normalized.alt = typeof block.alt === "string" ? block.alt.trim().slice(0, 300) : "";
      normalized.caption = typeof block.caption === "string" ? block.caption.trim().slice(0, 500) : "";
    }
    if (type === "gallery") {
      normalized.attachments = (block.attachments || []).map(resolve);
      if (!normalized.attachments.length || normalized.attachments.some((item) => !item.contentType.startsWith("image/"))) {
        throw new InputValidationError("Gallery blocks need at least one image upload.");
      }
      normalized.caption = typeof block.caption === "string" ? block.caption.trim().slice(0, 500) : "";
    }
    if (type === "video") {
      const embedUrl = safeVideoEmbed(block.url);
      if (embedUrl) normalized.embedUrl = embedUrl;
      else if (block.attachment) {
        normalized.attachment = resolve(block.attachment);
        if (!normalized.attachment.contentType.startsWith("video/")) {
          throw new InputValidationError("Video blocks must use a supported video upload or a YouTube/Vimeo URL.");
        }
      } else {
        throw new InputValidationError("Video blocks need a safe YouTube/Vimeo URL or a video upload.");
      }
      normalized.caption = typeof block.caption === "string" ? block.caption.trim().slice(0, 500) : "";
    }
    if (type === "document") {
      normalized.attachment = resolve(block.attachment);
      if (!normalized.attachment || normalized.attachment.contentType.startsWith("image/") || normalized.attachment.contentType.startsWith("video/")) {
        throw new InputValidationError("Document blocks must reference a PDF or Word document.");
      }
      normalized.label = typeof block.label === "string" ? block.label.trim().slice(0, 200) : normalized.attachment.name;
    }
    if (type === "link") {
      normalized.url = safeExternalUrl(block.url);
      if (!normalized.url) throw new InputValidationError("Links must use a valid HTTPS URL.");
      normalized.label = typeof block.label === "string" ? block.label.trim().slice(0, 200) : "Open link";
    }
    return normalized;
  });

  if (status === "published" && (!summary || !blocks.length)) {
    throw new InputValidationError("Published notes need a summary and at least one content block.");
  }

  const duplicate = await getModels().Note.findOne({ slug, ...(existingNote ? { _id: { $ne: existingNote._id } } : {}) }).select("_id");
  if (duplicate) throw new Error("That slug is already in use. Choose a unique slug.");

  return {
    title,
    slug,
    summary,
    category: category._id,
    tags,
    coverImage,
    coverImageAlt: typeof payload.coverImageAlt === "string" ? payload.coverImageAlt.trim().slice(0, 300) : "",
    blocks,
    status,
    publishedAt: status === "published" ? (existingNote?.publishedAt || new Date()) : null,
    seoTitle: typeof payload.seoTitle === "string" ? payload.seoTitle.trim().slice(0, 160) : "",
    seoDescription: typeof payload.seoDescription === "string" ? payload.seoDescription.trim().slice(0, 320) : "",
  };
}

async function populateNote(note) {
  await note.populate("category", "name slug");
  return note;
}

function querySort(sort, admin = false) {
  if (sort === "oldest") return { publishedAt: 1, createdAt: 1 };
  if (sort === "title") return { title: 1, _id: 1 };
  return admin ? { updatedAt: -1, _id: -1 } : { publishedAt: -1, _id: -1 };
}

async function buildListFilter(query, { admin, Category, Note }) {
  const filter = admin ? {} : { status: "published" };
  const q = typeof query.q === "string" ? query.q.trim().slice(0, 100) : "";
  if (q) {
    const expression = new RegExp(escapeRegExp(q), "i");
    filter.$or = [
      { title: expression },
      { slug: expression },
      { summary: expression },
      { tags: expression },
      { "blocks.html": expression },
      { "blocks.text": expression },
    ];
  }
  if (query.category) {
    const category = await Category.findOne({
      $or: [
        { slug: String(query.category).slice(0, 80) },
        ...(ObjectId.isValid(String(query.category)) ? [{ _id: new ObjectId(String(query.category)) }] : []),
      ],
    }).select("_id");
    filter.category = category?._id || new ObjectId();
  }
  if (query.tag) filter.tags = String(query.tag).trim().toLowerCase().slice(0, 32);
  if (admin && ["draft", "published"].includes(query.status)) filter.status = query.status;
  if (admin && typeof query.type === "string" && ["richText", "heading", "image", "gallery", "video", "document", "callout", "link"].includes(query.type)) {
    filter["blocks.type"] = query.type;
  }
  return { filter, pagination: parsePageParameters(query) };
}

function sendGridFsFile(res, attachment, bucket) {
  const inline = attachment.contentType === "application/pdf"
    || attachment.contentType.startsWith("image/")
    || attachment.contentType.startsWith("video/");
  const safeName = encodeURIComponent(attachment.name).replace(/['()*]/g, (character) => (
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  ));
  res.setHeader("Content-Type", attachment.contentType);
  res.setHeader("Content-Disposition", `${inline ? "inline" : "attachment"}; filename*=UTF-8''${safeName}`);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "private, no-store");
  const download = bucket.openDownloadStream(attachment.fileId);
  download.on("error", (error) => {
    if (!res.headersSent) res.status(404).json({ message: "Uploaded file not found." });
    else res.destroy(error);
  });
  download.pipe(res);
}

function attachmentInNote(note, fileId) {
  const attachments = [
    note.coverImage,
    ...(note.blocks || []).flatMap((block) => [block.attachment, ...(block.attachments || [])]),
  ].filter(Boolean);
  return attachments.find((item) => item.fileId.toString() === fileId) || null;
}

function createNotesCmsRouters({ getSessionFromRequest, rejectUnexpectedOrigin }) {
  const publicRouter = express.Router();
  const adminRouter = express.Router();
  const requireAdmin = createAuthenticationMiddleware(getSessionFromRequest);
  const requireAllowedOrigin = createOriginMiddleware(rejectUnexpectedOrigin);
  const requireCmsDatabase = (_req, res, next) => {
    ensureDatabase()
      .then(() => next())
      .catch((error) => {
        console.error("Notes CMS database is unavailable:", error.message);
        res.status(503).json({ message: "Notes storage is unavailable. Check the MongoDB connection configuration." });
      });
  };

  publicRouter.use(requireCmsDatabase);

  publicRouter.get("/categories", async (_req, res, next) => {
    try {
      const { Category, Note } = getModels();
      await ensureDefaultCategory(Category);
      const categories = await Category.find().sort({ name: 1 }).lean();
      const counts = await Note.aggregate([
        { $match: { status: "published" } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]);
      const countMap = new Map(counts.map((item) => [item._id.toString(), item.count]));
      res.json(categories.map((category) => ({
        id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        description: category.description,
        count: countMap.get(category._id.toString()) || 0,
      })));
    } catch (error) {
      next(error);
    }
  });

  publicRouter.get("/", async (req, res, next) => {
    try {
      const { Note, Category } = getModels();
      const { filter, pagination } = await buildListFilter(req.query, { admin: false, Category, Note });
      const [total, notes] = await Promise.all([
        Note.countDocuments(filter),
        Note.find(filter)
          .populate("category", "name slug")
          .sort(querySort(pagination.sort))
          .skip((pagination.page - 1) * pagination.limit)
          .limit(pagination.limit)
          .lean(),
      ]);
      res.json({
        items: notes.map((note) => serializeNote(note)),
        page: pagination.page,
        limit: pagination.limit,
        total,
        pages: Math.ceil(total / pagination.limit),
      });
    } catch (error) {
      if (isInputValidationError(error)) {
        res.status(400).json({ message: error.message });
        return;
      }
      next(error);
    }
  });

  publicRouter.get("/:slug/files/:fileId", async (req, res, next) => {
    try {
      if (!ObjectId.isValid(req.params.fileId)) {
        res.status(404).json({ message: "Uploaded file not found." });
        return;
      }
      const { Note } = getModels();
      const note = await Note.findOne({ slug: req.params.slug, status: "published" }).lean();
      const attachment = note && attachmentInNote(note, req.params.fileId);
      if (!attachment) {
        res.status(404).json({ message: "Uploaded file not found." });
        return;
      }
      sendGridFsFile(res, attachment, getGridFsBucket());
    } catch (error) {
      next(error);
    }
  });

  publicRouter.get("/:slug", async (req, res, next) => {
    try {
      const { Note } = getModels();
      const note = await Note.findOne({ slug: req.params.slug, status: "published" })
        .populate("category", "name slug")
        .lean();
      if (!note) {
        res.status(404).json({ message: "Note not found." });
        return;
      }
      res.json(serializeNote(note));
    } catch (error) {
      next(error);
    }
  });

  adminRouter.use(requireAdmin, requireCmsDatabase);

  adminRouter.get("/categories", async (_req, res, next) => {
    try {
      const { Category, Note } = getModels();
      await ensureDefaultCategory(Category);
      const [categories, notes] = await Promise.all([
        Category.find().sort({ name: 1 }).lean(),
        Note.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]),
      ]);
      const countMap = new Map(notes.map((item) => [item._id.toString(), item.count]));
      res.json(categories.map((category) => ({
        id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        description: category.description,
        count: countMap.get(category._id.toString()) || 0,
      })));
    } catch (error) {
      next(error);
    }
  });

  adminRouter.post("/categories", requireAllowedOrigin, async (req, res, next) => {
    try {
      const { Category } = getModels();
      const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
      const slug = slugify(req.body?.slug || name).slice(0, 80);
      const description = typeof req.body?.description === "string" ? req.body.description.trim() : "";
      if (!name || name.length > 60 || !slug || description.length > 240) {
        res.status(400).json({ message: "Provide a category name (up to 60 characters), a valid slug, and a description up to 240 characters." });
        return;
      }
      const category = await Category.create({ name, slug, description });
      res.status(201).json({ id: category._id.toString(), name, slug, description, count: 0 });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "A category with that name or slug already exists." });
        return;
      }
      next(error);
    }
  });

  adminRouter.put("/categories/:categoryId", requireAllowedOrigin, async (req, res, next) => {
    try {
      if (!ObjectId.isValid(req.params.categoryId)) {
        res.status(404).json({ message: "Category not found." });
        return;
      }
      const { Category } = getModels();
      const category = await Category.findById(req.params.categoryId);
      if (!category) {
        res.status(404).json({ message: "Category not found." });
        return;
      }
      const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
      const slug = slugify(req.body?.slug || name).slice(0, 80);
      const description = typeof req.body?.description === "string" ? req.body.description.trim() : "";
      if (!name || name.length > 60 || !slug || description.length > 240) {
        res.status(400).json({ message: "Provide a category name (up to 60 characters), a valid slug, and a description up to 240 characters." });
        return;
      }
      Object.assign(category, { name, slug, description });
      await category.save();
      res.json({ id: category._id.toString(), name, slug, description });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "A category with that name or slug already exists." });
        return;
      }
      next(error);
    }
  });

  adminRouter.delete("/categories/:categoryId", requireAllowedOrigin, async (req, res, next) => {
    try {
      if (!ObjectId.isValid(req.params.categoryId)) {
        res.status(404).json({ message: "Category not found." });
        return;
      }
      const { Category, Note } = getModels();
      const category = await Category.findById(req.params.categoryId);
      if (!category) {
        res.status(404).json({ message: "Category not found." });
        return;
      }
      if (await Note.exists({ category: category._id })) {
        res.status(409).json({ message: "Move notes to another category before deleting this one." });
        return;
      }
      await category.deleteOne();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  adminRouter.get("/dashboard", async (_req, res, next) => {
    try {
      const { Note, Category } = getModels();
      await ensureDefaultCategory(Category);
      const [total, drafts, published, recent] = await Promise.all([
        Note.countDocuments(),
        Note.countDocuments({ status: "draft" }),
        Note.countDocuments({ status: "published" }),
        Note.find().populate("category", "name slug").sort({ updatedAt: -1 }).limit(5).lean(),
      ]);
      res.json({
        total,
        drafts,
        published,
        categories: await Category.countDocuments(),
        recent: recent.map((note) => serializeNote(note, true)),
      });
    } catch (error) {
      next(error);
    }
  });

  adminRouter.get("/uploads/:fileId", async (req, res, next) => {
    try {
      if (!ObjectId.isValid(req.params.fileId)) {
        res.status(404).json({ message: "Uploaded file not found." });
        return;
      }
      const file = await getGridFsBucket().find({ _id: new ObjectId(req.params.fileId) }).next();
      if (!file) {
        res.status(404).json({ message: "Uploaded file not found." });
        return;
      }
      const attachment = {
        fileId: file._id,
        name: file.filename,
        contentType: file.metadata?.contentType || "application/octet-stream",
      };
      sendGridFsFile(res, attachment, getGridFsBucket());
    } catch (error) {
      next(error);
    }
  });

  adminRouter.post("/uploads", requireAllowedOrigin, (req, res, next) => {
    uploadMedia.single("file")(req, res, async (uploadError) => {
      if (uploadError) {
        await cleanTempFile(req.file);
        res.status(400).json({ message: uploadError.message });
        return;
      }
      try {
        if (!req.file) {
          res.status(400).json({ message: "Choose a file to upload." });
          return;
        }
        const details = fileDetails(req.file);
        res.status(201).json(await uploadToGridFs(req.file, details));
      } catch (error) {
        if (isInputValidationError(error)) {
          res.status(400).json({ message: error.message });
          return;
        }
        next(error);
      } finally {
        await cleanTempFile(req.file);
      }
    });
  });

  adminRouter.get("/", async (req, res, next) => {
    try {
      const { Note, Category } = getModels();
      const { filter, pagination } = await buildListFilter(req.query, { admin: true, Category, Note });
      const [total, notes] = await Promise.all([
        Note.countDocuments(filter),
        Note.find(filter)
          .populate("category", "name slug")
          .sort(querySort(pagination.sort, true))
          .skip((pagination.page - 1) * pagination.limit)
          .limit(pagination.limit)
          .lean(),
      ]);
      res.json({
        items: notes.map((note) => serializeNote(note, true)),
        page: pagination.page,
        limit: pagination.limit,
        total,
        pages: Math.ceil(total / pagination.limit),
      });
    } catch (error) {
      if (isInputValidationError(error)) {
        res.status(400).json({ message: error.message });
        return;
      }
      next(error);
    }
  });

  adminRouter.post("/", requireAllowedOrigin, async (req, res, next) => {
    try {
      const { Note, Category } = getModels();
      await ensureDefaultCategory(Category);
      const payload = parseNotePayload(req.body);
      const note = new Note(await normalizeNote(payload, Category, null));
      await note.save();
      await populateNote(note);
      res.status(201).json(serializeNote(note, true));
    } catch (error) {
      if (error.code === 11000 || error.message.includes("already in use")) {
        res.status(409).json({ message: error.message || "That slug is already in use." });
        return;
      }
      if (isInputValidationError(error)) {
        res.status(400).json({ message: error.message });
        return;
      }
      next(error);
    }
  });

  adminRouter.get("/:noteId/files/:fileId", async (req, res, next) => {
    try {
      const { Note } = getModels();
      const note = ObjectId.isValid(req.params.noteId)
        ? await Note.findById(req.params.noteId).lean()
        : null;
      const attachment = note && ObjectId.isValid(req.params.fileId)
        ? attachmentInNote(note, req.params.fileId)
        : null;
      if (!attachment) {
        res.status(404).json({ message: "Uploaded file not found." });
        return;
      }
      sendGridFsFile(res, attachment, getGridFsBucket());
    } catch (error) {
      next(error);
    }
  });

  adminRouter.get("/:noteId", async (req, res, next) => {
    try {
      const { Note } = getModels();
      const note = ObjectId.isValid(req.params.noteId)
        ? await Note.findById(req.params.noteId).populate("category", "name slug").lean()
        : null;
      if (!note) {
        res.status(404).json({ message: "Note not found." });
        return;
      }
      res.json(serializeNote(note, true));
    } catch (error) {
      next(error);
    }
  });

  adminRouter.put("/:noteId", requireAllowedOrigin, async (req, res, next) => {
    try {
      if (!ObjectId.isValid(req.params.noteId)) {
        res.status(404).json({ message: "Note not found." });
        return;
      }
      const { Note, Category } = getModels();
      await ensureDefaultCategory(Category);
      const note = await Note.findById(req.params.noteId);
      if (!note) {
        res.status(404).json({ message: "Note not found." });
        return;
      }
      const payload = parseNotePayload(req.body);
      Object.assign(note, await normalizeNote(payload, Category, note));
      await note.save();
      await populateNote(note);
      res.json(serializeNote(note, true));
    } catch (error) {
      if (error.code === 11000 || error.message.includes("already in use")) {
        res.status(409).json({ message: error.message || "That slug is already in use." });
        return;
      }
      if (isInputValidationError(error)) {
        res.status(400).json({ message: error.message });
        return;
      }
      next(error);
    }
  });

  adminRouter.patch("/:noteId/:action", requireAllowedOrigin, async (req, res, next) => {
    try {
      if (!ObjectId.isValid(req.params.noteId) || !["publish", "unpublish"].includes(req.params.action)) {
        res.status(404).json({ message: "Note action not found." });
        return;
      }
      const { Note } = getModels();
      const note = await Note.findById(req.params.noteId);
      if (!note) {
        res.status(404).json({ message: "Note not found." });
        return;
      }
      if (req.params.action === "publish") {
        if (!note.summary || !note.blocks.length) {
          res.status(400).json({ message: "Add a summary and at least one content block before publishing." });
          return;
        }
        note.status = "published";
        note.publishedAt = new Date();
      } else {
        note.status = "draft";
        note.publishedAt = null;
      }
      await note.save();
      await populateNote(note);
      res.json(serializeNote(note, true));
    } catch (error) {
      next(error);
    }
  });

  adminRouter.delete("/:noteId", requireAllowedOrigin, async (req, res, next) => {
    try {
      if (!ObjectId.isValid(req.params.noteId)) {
        res.status(404).json({ message: "Note not found." });
        return;
      }
      const { Note } = getModels();
      const note = await Note.findById(req.params.noteId);
      if (!note) {
        res.status(404).json({ message: "Note not found." });
        return;
      }
      await note.deleteOne();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  return { publicRouter, adminRouter };
}

module.exports = {
  createNotesCmsRouters,
  normalizeHeadingBlock,
  safeVideoEmbed,
  sanitizeRichText,
  slugify,
  parsePageParameters,
};
