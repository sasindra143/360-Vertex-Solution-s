const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { pipeline } = require("stream/promises");

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFSBucket, ObjectId } = require("mongodb");

const DATABASE_NAME = "vertex_notes";
const FILE_BUCKET = "vertexPromptFiles";
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 20 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = 25 * 1024 * 1024;
const MAX_EXAMPLE_IMAGES = 6;
const MAX_PROMPT_DOCUMENTS = 3;
const UPLOAD_LIMITS = Object.freeze({
  imageBytes: MAX_IMAGE_SIZE,
  videoBytes: MAX_VIDEO_SIZE,
  pdfBytes: MAX_DOCUMENT_SIZE,
  exampleImages: MAX_EXAMPLE_IMAGES,
  videos: 1,
  pdfs: MAX_PROMPT_DOCUMENTS,
});
const PAGE_LIMIT = 50;
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const AI_TOOLS = ["ChatGPT", "Claude", "Gemini", "Midjourney", "DALL·E", "Stable Diffusion", "Copilot", "Other"];

class PromptInputError extends Error {}

const attachmentSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
}, { _id: false });

const promptSchema = new mongoose.Schema({
  promptId: { type: String, required: true, unique: true, immutable: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  promptText: { type: String, required: true, trim: true, maxlength: 20000 },
  categoryId: { type: String, required: true, maxlength: 100 },
  categoryName: { type: String, required: true, maxlength: 100 },
  tags: { type: [String], default: [] },
  aiTools: { type: [String], default: [] },
  difficulty: { type: String, enum: DIFFICULTIES, default: "Beginner" },
  coverImage: { type: attachmentSchema, default: null },
  exampleImages: { type: [attachmentSchema], default: [] },
  videos: { type: [attachmentSchema], default: [] },
  documents: { type: [attachmentSchema], default: [] },
  externalExampleImageUrl: { type: String, default: "", maxlength: 2048 },
  generateImage: { type: Boolean, default: false },
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  featured: { type: Boolean, default: false },
  publishedAt: { type: Date, default: null },
}, { timestamps: true, collection: "ai_prompts" });

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, unique: true, trim: true, maxlength: 100 },
}, { timestamps: true, collection: "ai_prompt_categories" });

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence: { type: Number, required: true, default: 0 },
}, { collection: "ai_prompt_counters" });

let databasePromise;
let fileBucket;

function getModel(name, schema, collection) {
  const connection = mongoose.connection.useDb(DATABASE_NAME, { useCache: true });
  return connection.models[name] || connection.model(name, schema, collection);
}

function getPromptModel() {
  return getModel("AiPrompt", promptSchema, "ai_prompts");
}

function getCategoryModel() {
  return getModel("AiPromptCategory", categorySchema, "ai_prompt_categories");
}

function getCounterModel() {
  return getModel("AiPromptCounter", counterSchema, "ai_prompt_counters");
}

async function ensureDatabase() {
  if (!process.env.MONGODB_URI) throw new Error("MongoDB is not configured. Set MONGODB_URI in the backend environment.");
  if (mongoose.connection.readyState !== 1) {
    if (!databasePromise) {
      databasePromise = mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
        .catch((error) => {
          databasePromise = null;
          throw error;
        });
    }
    await databasePromise;
  }
  if (!fileBucket) {
    const database = mongoose.connection.useDb(DATABASE_NAME, { useCache: true }).db;
    fileBucket = new GridFSBucket(database, { bucketName: FILE_BUCKET });
  }
}

function slugify(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);
}

function safeImageUrl(value) {
  const candidate = typeof value === "string" ? value.trim() : "";
  if (!candidate) return "";
  if (candidate.length > 2048) throw new PromptInputError("Example image URL must be 2,048 characters or fewer.");
  let parsed;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new PromptInputError("Example image URL must be a valid HTTPS URL.");
  }
  if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
    throw new PromptInputError("Example image URL must use HTTPS and cannot contain credentials.");
  }
  return parsed.toString();
}

function parsePromptInput(input, categories) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new PromptInputError("Provide a prompt object.");
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const description = typeof input.description === "string" ? input.description.trim() : "";
  const promptText = typeof input.promptText === "string" ? input.promptText.trim() : "";
  if (!title || title.length > 160) throw new PromptInputError("Prompt title is required and must be 160 characters or fewer.");
  if (!description || description.length > 1000) throw new PromptInputError("Short description is required and must be 1,000 characters or fewer.");
  if (!promptText || promptText.length > 20000) throw new PromptInputError("Full prompt text is required and must be 20,000 characters or fewer.");

  const categoryId = typeof input.categoryId === "string" ? input.categoryId.trim() : "";
  const category = categories.find((entry) => entry.id === categoryId);
  if (!category) throw new PromptInputError("Choose a valid prompt category.");
  if (!DIFFICULTIES.includes(input.difficulty)) throw new PromptInputError("Choose a valid difficulty level.");
  if (input.tags !== undefined && !Array.isArray(input.tags)) throw new PromptInputError("Tags must be provided as a list.");
  if (input.aiTools !== undefined && !Array.isArray(input.aiTools)) throw new PromptInputError("Supported AI tools must be provided as a list.");
  const tags = [...new Set((input.tags || []).filter((tag) => typeof tag === "string").map((tag) => tag.trim()).filter(Boolean))];
  if (tags.length > 30 || tags.some((tag) => tag.length > 40)) throw new PromptInputError("Use up to 30 tags, with no more than 40 characters each.");
  const aiTools = [...new Set((input.aiTools || []).filter((tool) => typeof tool === "string"))];
  if (aiTools.some((tool) => !AI_TOOLS.includes(tool))) throw new PromptInputError("Choose supported AI tools from the list.");
  if (!["draft", "published"].includes(input.status)) throw new PromptInputError("Choose draft or published status.");

  return {
    title,
    description,
    promptText,
    categoryId,
    categoryName: category.name,
    tags,
    aiTools,
    difficulty: input.difficulty,
    externalExampleImageUrl: safeImageUrl(input.externalExampleImageUrl),
    generateImage: input.generateImage === true || input.generateImage === "true",
    status: input.status,
    featured: input.featured === true || input.featured === "true",
  };
}

function formatPromptId(sequence) {
  return `VTX-PMT-${String(sequence).padStart(6, "0")}`;
}

async function generatePromptId() {
  const result = await getCounterModel().findOneAndUpdate(
    { _id: "prompt" },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return formatPromptId(result.sequence);
}

function attachmentResponse(prompt, attachment, isAdmin = false) {
  if (!attachment) return null;
  const base = isAdmin ? "/api/admin/prompts" : "/api/prompts";
  return {
    id: attachment.fileId.toString(),
    name: attachment.name,
    contentType: attachment.contentType,
    size: attachment.size,
    url: `${base}/${encodeURIComponent(prompt.promptId)}/files/${attachment.fileId.toString()}`,
  };
}

function serializePrompt(prompt, isAdmin = false) {
  return {
    id: prompt._id.toString(),
    promptId: prompt.promptId,
    title: prompt.title,
    description: prompt.description,
    promptText: prompt.promptText,
    category: { id: prompt.categoryId, name: prompt.categoryName },
    tags: prompt.tags,
    aiTools: prompt.aiTools,
    difficulty: prompt.difficulty,
    coverImage: attachmentResponse(prompt, prompt.coverImage, isAdmin),
    exampleImages: (prompt.exampleImages || []).map((image) => attachmentResponse(prompt, image, isAdmin)),
    videos: (prompt.videos || []).map((video) => attachmentResponse(prompt, video, isAdmin)),
    documents: (prompt.documents || []).map((document) => attachmentResponse(prompt, document, isAdmin)),
    externalExampleImageUrl: prompt.externalExampleImageUrl,
    generateImage: prompt.generateImage,
    imageGenerationAvailable: false,
    status: prompt.status,
    featured: prompt.featured,
    publishedAt: prompt.publishedAt?.toISOString() || null,
    createdAt: prompt.createdAt.toISOString(),
    updatedAt: prompt.updatedAt.toISOString(),
  };
}

const uploadStorage = multer.diskStorage({
  destination: os.tmpdir(),
  filename: (_req, _file, callback) => callback(null, `vertex-prompt-${crypto.randomUUID()}`),
});
const uploads = multer({
  storage: uploadStorage,
  limits: { fileSize: MAX_DOCUMENT_SIZE, files: MAX_EXAMPLE_IMAGES + MAX_PROMPT_DOCUMENTS + 2, fields: 32, fieldSize: 24 * 1024 },
  fileFilter: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".webm", ".pdf"].includes(extension)) callback(null, true);
    else callback(new Error("Upload a JPG, PNG, GIF, WebP, MP4, WebM, or PDF file."));
  },
});

function validateUpload(file, kind) {
  const extension = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = {
    image: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    video: [".mp4", ".webm"],
    document: [".pdf"],
  }[kind];
  if (!allowedExtensions.includes(extension)) throw new PromptInputError(`Unsupported ${kind} file type.`);
  const limit = kind === "image" ? MAX_IMAGE_SIZE : kind === "video" ? MAX_VIDEO_SIZE : MAX_DOCUMENT_SIZE;
  if (file.size > limit) throw new PromptInputError(`${kind === "image" ? "Images" : kind === "video" ? "Videos" : "PDF files"} must be no larger than ${limit / 1024 / 1024} MB.`);
  const descriptor = fs.openSync(file.path, "r");
  const header = Buffer.alloc(16);
  try {
    fs.readSync(descriptor, header, 0, header.length, 0);
  } finally {
    fs.closeSync(descriptor);
  }
  const valid = kind === "image" && (extension === ".png"
    ? header.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    : extension === ".jpg" || extension === ".jpeg"
      ? header.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))
      : extension === ".gif"
        ? ["GIF87a", "GIF89a"].includes(header.subarray(0, 6).toString())
        : extension === ".webp"
          ? header.subarray(0, 4).toString() === "RIFF" && header.subarray(8, 12).toString() === "WEBP"
          : false)
    || (kind === "document" && header.subarray(0, 5).toString() === "%PDF-")
    || (kind === "video" && (extension === ".webm"
      ? header.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))
      : header.subarray(4, 8).toString() === "ftyp"));
  if (!valid) throw new PromptInputError(`The uploaded file "${file.originalname}" does not match its ${kind} file type.`);
}

function uploadPromptFile(file) {
  return new Promise((resolve, reject) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const contentType = {
      ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".gif": "image/gif", ".webp": "image/webp",
      ".mp4": "video/mp4", ".webm": "video/webm", ".pdf": "application/pdf",
    }[extension];
    const stream = fileBucket.openUploadStream(file.originalname, { contentType });
    const source = fs.createReadStream(file.path);
    source.on("error", (error) => stream.destroy(error));
    stream.on("error", reject);
    stream.on("finish", () => resolve({ fileId: stream.id, name: file.originalname, contentType, size: file.size }));
    source.pipe(stream);
  });
}

async function removeFile(attachment) {
  if (!attachment?.fileId) return;
  try {
    await fileBucket.delete(attachment.fileId);
  } catch (error) {
    if (error.code !== 26) throw error;
  }
}

async function copyGridFsFile(attachment) {
  const output = fileBucket.openUploadStream(attachment.name, { contentType: attachment.contentType });
  await pipeline(fileBucket.openDownloadStream(attachment.fileId), output);
  return { fileId: output.id, name: attachment.name, contentType: attachment.contentType, size: attachment.size };
}

async function cleanTempFiles(files) {
  const list = Object.values(files || {}).flat();
  await Promise.all(list.map((file) => fs.promises.unlink(file.path).catch((error) => {
    if (error.code !== "ENOENT") console.error("Could not remove temporary prompt upload:", error.message);
  })));
}

function parseRetainedIds(value, label) {
  let ids;
  try {
    ids = JSON.parse(value || "[]");
  } catch {
    throw new PromptInputError(`The retained ${label} list is invalid.`);
  }
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string")) {
    throw new PromptInputError(`The retained ${label} list is invalid.`);
  }
  return ids;
}

function parseByteRange(header, size) {
  if (typeof header !== "string") return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || (!match[1] && !match[2]) || size <= 0) return false;
  let start = match[1] ? Number(match[1]) : null;
  let end = match[2] ? Number(match[2]) : null;
  if (start === null) {
    const suffixLength = end;
    if (!suffixLength) return false;
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  } else if (end === null || end >= size) {
    end = size - 1;
  }
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= size || end < start) return false;
  return { start, end };
}

function requireAdmin(getSessionFromRequest) {
  return (req, res, next) => {
    if (!getSessionFromRequest(req)) return res.status(401).json({ message: "Admin authentication required." });
    next();
  };
}

function validListParameters(query) {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 12);
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > PAGE_LIMIT) {
    throw new PromptInputError(`Page must be positive and limit must be between 1 and ${PAGE_LIMIT}.`);
  }
  return { page, limit, q: String(query.q || "").trim().slice(0, 120), category: String(query.category || ""), status: String(query.status || "") };
}

function makeFilter(params, admin) {
  const filter = admin ? {} : { status: "published" };
  if (params.status) {
    if (!admin && params.status !== "published") throw new PromptInputError("Public prompt status filter is invalid.");
    filter.status = params.status;
  }
  if (params.category) filter.categoryId = params.category;
  if (params.q) {
    const expression = new RegExp(params.q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ promptId: expression }, { title: expression }, { description: expression }, { promptText: expression }, { categoryName: expression }, { tags: expression }, { aiTools: expression }];
  }
  return filter;
}

function createPromptsRouters({ getSessionFromRequest, rejectUnexpectedOrigin }) {
  const publicRouter = express.Router();
  const adminRouter = express.Router();
  const authenticate = requireAdmin(getSessionFromRequest);
  const checkOrigin = (req, res, next) => (rejectUnexpectedOrigin(req, res) ? undefined : next());
  const requireDatabase = (_req, res, next) => {
    ensureDatabase().then(() => next()).catch((error) => {
      console.error("AI prompts database is unavailable:", error.message);
      res.status(503).json({ message: "AI prompts storage is unavailable. Check MongoDB configuration." });
    });
  };

  publicRouter.get("/categories", requireDatabase, async (_req, res, next) => {
    try {
      res.json(await getCategoryModel().find().sort({ name: 1 }).select("id name").lean());
    } catch (error) {
      next(error);
    }
  });

  const getFile = (admin) => async (req, res, next) => {
    try {
      await ensureDatabase();
      const Prompt = getPromptModel();
      const criteria = { promptId: req.params.promptId.toUpperCase() };
      if (!admin) criteria.status = "published";
      const prompt = await Prompt.findOne(criteria).lean();
      const fileId = mongoose.isValidObjectId(req.params.fileId) ? new ObjectId(req.params.fileId) : null;
      if (!prompt || !fileId) return res.status(404).json({ message: "Prompt image not found." });
      const attachment = [prompt.coverImage, ...(prompt.exampleImages || []), ...(prompt.videos || []), ...(prompt.documents || [])]
        .find((file) => file?.fileId.equals(fileId));
      if (!attachment) return res.status(404).json({ message: "Prompt file not found." });
      res.setHeader("Content-Type", attachment.contentType);
      res.setHeader("Content-Length", attachment.size);
      if (attachment.contentType.startsWith("image/") || attachment.contentType.startsWith("video/") || attachment.contentType === "application/pdf") {
        res.setHeader("Content-Disposition", "inline");
      }
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Cache-Control", "private, max-age=3600");
      res.setHeader("Accept-Ranges", "bytes");
      const range = parseByteRange(req.headers.range, attachment.size);
      if (range === false) {
        res.setHeader("Content-Range", `bytes */${attachment.size}`);
        return res.status(416).end();
      }
      const streamOptions = range ? { start: range.start, end: range.end + 1 } : undefined;
      if (range) {
        res.status(206);
        res.setHeader("Content-Length", range.end - range.start + 1);
        res.setHeader("Content-Range", `bytes ${range.start}-${range.end}/${attachment.size}`);
      }
      fileBucket.openDownloadStream(fileId, streamOptions).on("error", (error) => {
        if (!res.headersSent) res.status(404).json({ message: "Prompt image not found." });
        else res.destroy(error);
      }).pipe(res);
    } catch (error) {
      next(error);
    }
  };
  publicRouter.get("/:promptId/files/:fileId", requireDatabase, getFile(false));

  publicRouter.get("/", requireDatabase, async (req, res, next) => {
    try {
      const params = validListParameters(req.query);
      const filter = makeFilter(params, false);
      const Prompt = getPromptModel();
      const [items, total] = await Promise.all([
        Prompt.find(filter).sort({ featured: -1, publishedAt: -1 }).skip((params.page - 1) * params.limit).limit(params.limit).lean(),
        Prompt.countDocuments(filter),
      ]);
      res.json({ items: items.map((item) => serializePrompt(item)), page: params.page, pages: Math.ceil(total / params.limit), total });
    } catch (error) {
      if (error instanceof PromptInputError) return res.status(400).json({ message: error.message });
      next(error);
    }
  });

  publicRouter.get("/:promptId", requireDatabase, async (req, res, next) => {
    try {
      const prompt = await getPromptModel().findOne({ promptId: req.params.promptId.toUpperCase(), status: "published" }).lean();
      if (!prompt) return res.status(404).json({ message: "Prompt not found." });
      res.json(serializePrompt(prompt));
    } catch (error) {
      next(error);
    }
  });

  adminRouter.use(authenticate);
  adminRouter.use((req, res, next) => (
    ["GET", "HEAD", "OPTIONS"].includes(req.method) ? next() : checkOrigin(req, res, next)
  ));
  adminRouter.use(requireDatabase);
  adminRouter.get("/:promptId/files/:fileId", getFile(true));
  adminRouter.get("/categories", async (_req, res, next) => {
    try {
      res.json(await getCategoryModel().find().sort({ name: 1 }).select("id name").lean());
    } catch (error) {
      next(error);
    }
  });
  adminRouter.post("/categories", async (req, res, next) => {
    try {
      const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
      if (!name || name.length > 100) return res.status(400).json({ message: "Category name is required and must be 100 characters or fewer." });
      const id = slugify(name);
      if (!id) return res.status(400).json({ message: "Enter a category name containing letters or numbers." });
      const category = await getCategoryModel().create({ id, name });
      res.status(201).json({ id: category.id, name: category.name });
    } catch (error) {
      if (error.code === 11000) return res.status(409).json({ message: "A prompt category with that name already exists." });
      next(error);
    }
  });
  adminRouter.delete("/categories/:categoryId", async (req, res, next) => {
    try {
      const category = await getCategoryModel().findOne({ id: req.params.categoryId });
      if (!category) return res.status(404).json({ message: "Prompt category not found." });
      if (await getPromptModel().exists({ categoryId: category.id })) {
        return res.status(409).json({ message: "This category is in use by prompts and cannot be deleted." });
      }
      await category.deleteOne();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  adminRouter.get("/", async (req, res, next) => {
    try {
      const params = validListParameters(req.query);
      const filter = makeFilter(params, true);
      const Prompt = getPromptModel();
      const [items, total] = await Promise.all([
        Prompt.find(filter).sort({ updatedAt: -1 }).skip((params.page - 1) * params.limit).limit(params.limit).lean(),
        Prompt.countDocuments(filter),
      ]);
      res.json({ items: items.map((item) => serializePrompt(item, true)), page: params.page, pages: Math.ceil(total / params.limit), total });
    } catch (error) {
      if (error instanceof PromptInputError) return res.status(400).json({ message: error.message });
      next(error);
    }
  });
  adminRouter.get("/:promptId", async (req, res, next) => {
    try {
      const prompt = await getPromptModel().findOne({ promptId: req.params.promptId.toUpperCase() }).lean();
      if (!prompt) return res.status(404).json({ message: "Prompt not found." });
      res.json(serializePrompt(prompt, true));
    } catch (error) {
      next(error);
    }
  });
  adminRouter.post("/:promptId/duplicate", async (req, res, next) => {
    const copies = [];
    try {
      const original = await getPromptModel().findOne({ promptId: req.params.promptId.toUpperCase() }).lean();
      if (!original) return res.status(404).json({ message: "Prompt not found." });
      const coverImage = original.coverImage ? await copyGridFsFile(original.coverImage) : null;
      if (coverImage) copies.push(coverImage);
      const exampleImages = [];
      for (const image of original.exampleImages || []) {
        const copy = await copyGridFsFile(image);
        copies.push(copy);
        exampleImages.push(copy);
      }
      const videos = [];
      for (const video of original.videos || []) {
        const copy = await copyGridFsFile(video);
        copies.push(copy);
        videos.push(copy);
      }
      const documents = [];
      for (const document of original.documents || []) {
        const copy = await copyGridFsFile(document);
        copies.push(copy);
        documents.push(copy);
      }
      const duplicate = await getPromptModel().create({
        promptId: await generatePromptId(),
        title: `${original.title} (Copy)`.slice(0, 160),
        description: original.description,
        promptText: original.promptText,
        categoryId: original.categoryId,
        categoryName: original.categoryName,
        tags: original.tags,
        aiTools: original.aiTools,
        difficulty: original.difficulty,
        coverImage,
        exampleImages,
        videos,
        documents,
        externalExampleImageUrl: original.externalExampleImageUrl,
        generateImage: original.generateImage,
        status: "draft",
        featured: false,
      });
      res.status(201).json(serializePrompt(duplicate, true));
    } catch (error) {
      await Promise.all(copies.map((image) => removeFile(image).catch((cleanupError) => console.error("Could not clean up duplicated prompt image:", cleanupError.message))));
      if (error.code === 11000) return res.status(409).json({ message: "The generated prompt ID conflicted with an existing ID. Please retry." });
      next(error);
    }
  });

  const savePrompt = (update) => (req, res, next) => {
    uploads.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "exampleImages", maxCount: MAX_EXAMPLE_IMAGES },
      { name: "videos", maxCount: 1 },
      { name: "documents", maxCount: MAX_PROMPT_DOCUMENTS },
    ])(req, res, async (uploadError) => {
      const files = req.files || {};
      const added = [];
      if (uploadError) {
        await cleanTempFiles(files);
        return res.status(400).json({ message: uploadError.message });
      }
      try {
        const input = JSON.parse(req.body.prompt || "{}");
        const categories = await getCategoryModel().find().lean();
        const data = parsePromptInput(input, categories);
        const Prompt = getPromptModel();
        const existing = update ? await Prompt.findOne({ promptId: req.params.promptId.toUpperCase() }) : null;
        if (update && !existing) return res.status(404).json({ message: "Prompt not found." });

        const uploadedCover = files.coverImage?.[0];
        const uploadedExamples = files.exampleImages || [];
        const uploadedVideos = files.videos || [];
        const uploadedDocuments = files.documents || [];
        if (uploadedExamples.length > MAX_EXAMPLE_IMAGES) return res.status(400).json({ message: `Upload no more than ${MAX_EXAMPLE_IMAGES} example images.` });
        for (const file of [...(uploadedCover ? [uploadedCover] : []), ...uploadedExamples]) validateUpload(file, "image");
        for (const file of uploadedVideos) validateUpload(file, "video");
        for (const file of uploadedDocuments) validateUpload(file, "document");

        const oldAttachments = existing
          ? [existing.coverImage, ...existing.exampleImages, ...(existing.videos || []), ...(existing.documents || [])].filter(Boolean)
          : [];
        const priorCover = existing?.coverImage || null;
        let coverImage = uploadedCover ? null : (req.body.keepCoverId === priorCover?.fileId.toString() ? priorCover : null);
        const previousExamples = existing?.exampleImages || [];
        const retainedIds = parseRetainedIds(req.body.keepExampleImageIds, "example-image");
        const retained = retainedIds.map((id) => previousExamples.find((image) => image.fileId.toString() === id));
        if (retained.some((image) => !image)) throw new PromptInputError("A selected example image does not belong to this prompt.");
        if (retained.length + uploadedExamples.length > MAX_EXAMPLE_IMAGES) {
          return res.status(400).json({ message: `A prompt can have no more than ${MAX_EXAMPLE_IMAGES} example images.` });
        }
        const retainedVideoIds = parseRetainedIds(req.body.keepVideoIds, "video");
        const priorVideos = existing?.videos || [];
        const retainedVideos = retainedVideoIds.map((id) => priorVideos.find((video) => video.fileId.toString() === id));
        if (retainedVideos.some((video) => !video) || retainedVideos.length + uploadedVideos.length > 1) {
          throw new PromptInputError("A prompt can have only one video. Select a video that belongs to this prompt.");
        }
        const retainedDocumentIds = parseRetainedIds(req.body.keepDocumentIds, "PDF");
        const priorDocuments = existing?.documents || [];
        const retainedDocuments = retainedDocumentIds.map((id) => priorDocuments.find((document) => document.fileId.toString() === id));
        if (retainedDocuments.some((document) => !document) || retainedDocuments.length + uploadedDocuments.length > MAX_PROMPT_DOCUMENTS) {
          throw new PromptInputError(`A prompt can have no more than ${MAX_PROMPT_DOCUMENTS} PDF attachments.`);
        }
        if (!uploadedCover && req.body.keepCoverId && !coverImage) throw new PromptInputError("The selected cover image does not belong to this prompt.");
        if (uploadedCover) {
          coverImage = await uploadPromptFile(uploadedCover);
          added.push(coverImage);
        }
        const examples = [];
        for (const file of uploadedExamples) {
          const image = await uploadPromptFile(file);
          added.push(image);
          examples.push(image);
        }
        const videos = [];
        for (const file of uploadedVideos) {
          const video = await uploadPromptFile(file);
          added.push(video);
          videos.push(video);
        }
        const documents = [];
        for (const file of uploadedDocuments) {
          const document = await uploadPromptFile(file);
          added.push(document);
          documents.push(document);
        }
        data.coverImage = coverImage;
        data.exampleImages = [...retained, ...examples];
        data.videos = [...retainedVideos, ...videos];
        data.documents = [...retainedDocuments, ...documents];
        data.publishedAt = data.status === "published" ? (existing?.publishedAt || new Date()) : null;
        const saved = existing
          ? Object.assign(existing, data)
          : new Prompt({ ...data, promptId: await generatePromptId() });
        await saved.save();
        const keep = new Set([data.coverImage, ...data.exampleImages, ...data.videos, ...data.documents]
          .filter(Boolean).map((attachment) => attachment.fileId.toString()));
        for (const image of oldAttachments) {
          if (!keep.has(image.fileId.toString())) {
            await removeFile(image).catch((error) => console.error("Could not remove replaced prompt attachment:", error.message));
          }
        }
        res.status(update ? 200 : 201).json(serializePrompt(saved, true));
      } catch (error) {
        await Promise.all(added.map((image) => removeFile(image).catch((cleanupError) => console.error("Could not clean up prompt image:", cleanupError.message))));
        if (error instanceof PromptInputError || error instanceof SyntaxError) return res.status(400).json({ message: error.message || "Prompt data is invalid." });
        if (error.code === 11000) return res.status(409).json({ message: "The generated prompt ID conflicted with an existing ID. Please retry." });
        next(error);
      } finally {
        await cleanTempFiles(files);
      }
    });
  };
  adminRouter.post("/", savePrompt(false));
  adminRouter.put("/:promptId", savePrompt(true));

  adminRouter.patch("/:promptId/status", async (req, res, next) => {
    try {
      const status = req.body?.status;
      if (!["draft", "published"].includes(status)) return res.status(400).json({ message: "Choose draft or published status." });
      const prompt = await getPromptModel().findOne({ promptId: req.params.promptId.toUpperCase() });
      if (!prompt) return res.status(404).json({ message: "Prompt not found." });
      prompt.status = status;
      prompt.publishedAt = status === "published" ? (prompt.publishedAt || new Date()) : null;
      await prompt.save();
      res.json(serializePrompt(prompt, true));
    } catch (error) {
      next(error);
    }
  });
  adminRouter.delete("/:promptId", async (req, res, next) => {
    try {
      const prompt = await getPromptModel().findOneAndDelete({ promptId: req.params.promptId.toUpperCase() });
      if (!prompt) return res.status(404).json({ message: "Prompt not found." });
      for (const attachment of [prompt.coverImage, ...prompt.exampleImages, ...(prompt.videos || []), ...(prompt.documents || [])].filter(Boolean)) {
        await removeFile(attachment).catch((error) => console.error("Could not remove deleted prompt attachment:", error.message));
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  return { publicRouter, adminRouter };
}

module.exports = { AI_TOOLS, DIFFICULTIES, PromptInputError, UPLOAD_LIMITS, createPromptsRouters, formatPromptId, generatePromptId, parseByteRange, parsePromptInput, slugify };
