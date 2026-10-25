const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFSBucket, ObjectId } = require("mongodb");

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = 25 * 1024 * 1024;
const MAX_IMAGES_PER_NOTE = 8;
const NOTE_FILES_BUCKET = "mediaNoteFiles";

const attachmentSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
}, { _id: false });

const mediaNoteSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true, maxlength: 120 },
  description: { type: String, required: true, maxlength: 2000 },
  bulletPoints: { type: [String], default: [] },
  documentType: { type: String, enum: ["pdf", "word", "mixed"], default: "pdf" },
  documentFile: { type: attachmentSchema, default: null },
  contentImages: { type: [attachmentSchema], default: [] },
}, { timestamps: true, collection: "media_notes" });

const MediaNote = mongoose.models.MediaNote || mongoose.model("MediaNote", mediaNoteSchema);

const storage = multer.diskStorage({
  destination: os.tmpdir(),
  filename: (_req, _file, callback) => callback(null, `vertex-note-${crypto.randomUUID()}`),
});

const uploadFiles = multer({
  storage,
  limits: {
    fileSize: MAX_DOCUMENT_SIZE,
    files: MAX_IMAGES_PER_NOTE + 1,
    fields: 8,
    fieldSize: 32 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const isDocument = [".pdf", ".doc", ".docx"].includes(extension);
    const isImage = [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(extension);
    if ((file.fieldname === "document" && isDocument) || (file.fieldname === "images" && isImage)) {
      callback(null, true);
      return;
    }
    callback(new Error("Upload a PDF, DOC, DOCX, or supported image file."));
  },
});

let gridFsBucket;
let databaseConnection;

async function ensureDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB is not configured. Set MONGODB_URI in the backend environment.");
  }
  if (mongoose.connection.readyState !== 1) {
    if (!databaseConnection) {
      databaseConnection = mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      }).catch((error) => {
        databaseConnection = null;
        throw error;
      });
    }
    await databaseConnection;
  }
  if (!gridFsBucket) {
    gridFsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: NOTE_FILES_BUCKET });
  }
}

function requireDatabase(_req, res, next) {
  ensureDatabase().then(() => next()).catch((error) => {
    console.error("Media notes database is unavailable:", error.message);
    res.status(503).json({ message: "Notes storage is unavailable. Check the MongoDB connection configuration." });
  });
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

function attachmentResponse(noteId, attachment) {
  if (!attachment) return null;
  return {
    id: attachment.fileId.toString(),
    name: attachment.name,
    contentType: attachment.contentType,
    size: attachment.size,
    url: `/api/notes/${encodeURIComponent(noteId)}/files/${attachment.fileId.toString()}`,
  };
}

function serializeNote(note) {
  return {
    id: note.id,
    title: note.title,
    description: note.description,
    bulletPoints: note.bulletPoints,
    documentType: note.documentType,
    documentFile: attachmentResponse(note.id, note.documentFile),
    contentImages: note.contentImages.map((image) => attachmentResponse(note.id, image)),
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  };
}

function parseBulletPoints(value) {
  let points;
  try {
    points = JSON.parse(value || "[]");
  } catch {
    throw new Error("Bullet points must be a valid list.");
  }
  if (!Array.isArray(points) || points.length > 50 || points.some((point) => typeof point !== "string")) {
    throw new Error("Bullet points must be a list of up to 50 text items.");
  }
  return points.map((point) => point.trim()).filter(Boolean).map((point) => point.slice(0, 500));
}

function validateFileSignature(file) {
  const descriptor = fs.openSync(file.path, "r");
  const header = Buffer.alloc(12);
  try {
    fs.readSync(descriptor, header, 0, header.length, 0);
  } finally {
    fs.closeSync(descriptor);
  }

  const extension = path.extname(file.originalname).toLowerCase();
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
                : false;
  if (!valid) throw new Error(`The uploaded file "${file.originalname}" does not match its file type.`);
}

function uploadToGridFs(file) {
  return new Promise((resolve, reject) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const contentType = {
      ".pdf": "application/pdf",
      ".doc": "application/msword",
      ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
    }[extension];
    const stream = gridFsBucket.openUploadStream(file.originalname, {
      contentType,
    });
    const source = fs.createReadStream(file.path);
    source.on("error", (error) => stream.destroy(error));
    stream.on("error", reject);
    stream.on("finish", () => resolve({
      fileId: stream.id,
      name: file.originalname,
      contentType,
      size: file.size,
    }));
    source.pipe(stream);
  });
}

async function removeGridFsFile(attachment) {
  if (!attachment?.fileId) return;
  try {
    await gridFsBucket.delete(attachment.fileId);
  } catch (error) {
    if (error.code !== 26) throw error;
  }
}

async function cleanTempFiles(files) {
  const allFiles = Object.values(files || {}).flat();
  await Promise.all(allFiles.map((file) => fs.promises.unlink(file.path).catch((error) => {
    if (error.code !== "ENOENT") console.error("Could not remove temporary note upload:", error.message);
  })));
}

function createMediaNotesRouters({ getSessionFromRequest, rejectUnexpectedOrigin }) {
  const publicRouter = express.Router();
  const adminRouter = express.Router();
  const requireAdmin = createAuthenticationMiddleware(getSessionFromRequest);
  const requireAllowedOrigin = createOriginMiddleware(rejectUnexpectedOrigin);

  publicRouter.get("/", requireDatabase, async (_req, res, next) => {
    try {
      const notes = await MediaNote.find().sort({ createdAt: -1 }).lean();
      res.json(notes.map(serializeNote));
    } catch (error) {
      next(error);
    }
  });

  publicRouter.get("/:noteId/files/:fileId", requireDatabase, async (req, res, next) => {
    try {
      if (!ObjectId.isValid(req.params.fileId)) {
        res.status(404).json({ message: "Uploaded file not found." });
        return;
      }
      const note = await MediaNote.findOne({ id: req.params.noteId }).lean();
      if (!note) {
        res.status(404).json({ message: "Note not found." });
        return;
      }
      const attachments = [note.documentFile, ...note.contentImages].filter(Boolean);
      const attachment = attachments.find((item) => item.fileId.toString() === req.params.fileId);
      if (!attachment) {
        res.status(404).json({ message: "Uploaded file not found." });
        return;
      }

      const isInline = attachment.contentType === "application/pdf" || attachment.contentType.startsWith("image/");
      const safeName = encodeURIComponent(attachment.name).replace(/['()*]/g, (character) => (
        `%${character.charCodeAt(0).toString(16).toUpperCase()}`
      ));
      res.setHeader("Content-Type", attachment.contentType);
      res.setHeader("Content-Disposition", `${isInline ? "inline" : "attachment"}; filename*=UTF-8''${safeName}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Cache-Control", "public, max-age=3600");

      const download = gridFsBucket.openDownloadStream(attachment.fileId);
      download.on("error", (error) => {
        if (!res.headersSent) res.status(404).json({ message: "Uploaded file not found." });
        else res.destroy(error);
      });
      download.pipe(res);
    } catch (error) {
      next(error);
    }
  });

  adminRouter.use(requireAdmin);
  adminRouter.use(requireDatabase);

  adminRouter.get("/", async (_req, res, next) => {
    try {
      const notes = await MediaNote.find().sort({ createdAt: -1 }).lean();
      res.json(notes.map(serializeNote));
    } catch (error) {
      next(error);
    }
  });

  const handleSave = (isUpdate) => (req, res, next) => {
    uploadFiles.fields([
      { name: "document", maxCount: 1 },
      { name: "images", maxCount: MAX_IMAGES_PER_NOTE },
    ])(req, res, async (uploadError) => {
      if (uploadError) {
        await cleanTempFiles(req.files);
        const status = uploadError instanceof multer.MulterError ? 400 : 400;
        res.status(status).json({ message: uploadError.message });
        return;
      }

      const temporaryFiles = req.files || {};
      const newAttachments = [];
      try {
        const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
        const description = typeof req.body.description === "string" ? req.body.description.trim() : "";
        const documentType = typeof req.body.documentType === "string" ? req.body.documentType : "pdf";
        if (!title || title.length > 120 || !description || description.length > 2000) {
          res.status(400).json({ message: "Provide a title (up to 120 characters) and description (up to 2,000 characters)." });
          return;
        }
        if (!["pdf", "word", "mixed"].includes(documentType)) {
          res.status(400).json({ message: "Choose a supported document type." });
          return;
        }

        const bulletPoints = parseBulletPoints(req.body.bulletPoints);
        const uploadedDocument = temporaryFiles.document?.[0];
        const uploadedImages = temporaryFiles.images || [];
        if (uploadedImages.length > MAX_IMAGES_PER_NOTE) {
          res.status(400).json({ message: `Upload no more than ${MAX_IMAGES_PER_NOTE} images per note.` });
          return;
        }
        if (uploadedDocument && uploadedDocument.size > MAX_DOCUMENT_SIZE) {
          res.status(400).json({ message: "The document is too large. Maximum accepted size is 25 MB." });
          return;
        }
        if (uploadedImages.some((image) => image.size > MAX_IMAGE_SIZE)) {
          res.status(400).json({ message: "Each image must be 20 MB or smaller." });
          return;
        }
        for (const file of [uploadedDocument, ...uploadedImages].filter(Boolean)) validateFileSignature(file);

        const noteId = isUpdate ? req.params.noteId : (req.body.id || crypto.randomUUID());
        if (typeof noteId !== "string" || noteId.length > 100) {
          res.status(400).json({ message: "The note ID is invalid." });
          return;
        }
        const existingNote = isUpdate ? await MediaNote.findOne({ id: noteId }) : null;
        if (isUpdate && !existingNote) {
          res.status(404).json({ message: "Note not found." });
          return;
        }
        const previousAttachments = existingNote
          ? [existingNote.documentFile, ...existingNote.contentImages].filter(Boolean)
          : [];

        let documentFile = uploadedDocument ? null : existingNote?.documentFile || null;
        if (!uploadedDocument && existingNote?.documentFile && req.body.keepDocumentId !== existingNote.documentFile.fileId.toString()) {
          documentFile = null;
        }
        const requestedImageIds = req.body.keepImageIds ? JSON.parse(req.body.keepImageIds) : [];
        if (!Array.isArray(requestedImageIds) || requestedImageIds.some((id) => typeof id !== "string")) {
          res.status(400).json({ message: "The retained image list is invalid." });
          return;
        }
        const priorImages = existingNote?.contentImages || [];
        const retainedImages = requestedImageIds.map((id) => priorImages.find((image) => image.fileId.toString() === id));
        if (retainedImages.some((image) => !image)) {
          res.status(400).json({ message: "A selected image does not belong to this note." });
          return;
        }
        if (uploadedDocument) {
          documentFile = await uploadToGridFs(uploadedDocument);
          newAttachments.push(documentFile);
        }
        const addedImages = [];
        for (const image of uploadedImages) {
          const attachment = await uploadToGridFs(image);
          newAttachments.push(attachment);
          addedImages.push(attachment);
        }
        const contentImages = [...retainedImages, ...addedImages];
        if (!documentFile && contentImages.length === 0) {
          res.status(400).json({ message: "Upload a document or at least one image before saving." });
          return;
        }

        const noteData = {
          id: noteId,
          title,
          description,
          bulletPoints,
          documentType,
          documentFile,
          contentImages,
        };
        let savedNote;
        if (isUpdate) {
          Object.assign(existingNote, noteData);
          savedNote = await existingNote.save();
        } else {
          savedNote = await new MediaNote(noteData).save();
        }

        const retainedFileIds = new Set(
          [documentFile, ...contentImages].filter(Boolean).map((attachment) => attachment.fileId.toString())
        );
        const removedAttachments = previousAttachments.filter(
          (attachment) => !retainedFileIds.has(attachment.fileId.toString())
        );
        for (const attachment of removedAttachments) {
          await removeGridFsFile(attachment).catch((error) => {
            console.error("Could not remove replaced note attachment:", error.message);
          });
        }
        res.status(isUpdate ? 200 : 201).json(serializeNote(savedNote));
      } catch (error) {
        await Promise.all(newAttachments.map((attachment) => removeGridFsFile(attachment).catch((cleanupError) => {
          console.error("Could not clean up an incomplete note upload:", cleanupError.message);
        })));
        if (error.code === 11000) {
          res.status(409).json({ message: "A note with this ID already exists." });
          return;
        }
        if (error instanceof SyntaxError || error.message.includes("Bullet points") || error.message.includes("does not match its file type")) {
          res.status(400).json({ message: error.message });
          return;
        }
        next(error);
      } finally {
        await cleanTempFiles(temporaryFiles);
      }
    });
  };

  adminRouter.post("/", requireAllowedOrigin, handleSave(false));
  adminRouter.put("/:noteId", requireAllowedOrigin, handleSave(true));

  adminRouter.delete("/:noteId", requireAllowedOrigin, async (req, res, next) => {
    try {
      const note = await MediaNote.findOne({ id: req.params.noteId });
      if (!note) {
        res.status(404).json({ message: "Note not found." });
        return;
      }
      await MediaNote.deleteOne({ id: note.id });
      for (const attachment of [note.documentFile, ...note.contentImages].filter(Boolean)) {
        await removeGridFsFile(attachment).catch((error) => {
          console.error("Could not remove deleted note attachment:", error.message);
        });
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  return { publicRouter, adminRouter };
}

module.exports = { createMediaNotesRouters };
