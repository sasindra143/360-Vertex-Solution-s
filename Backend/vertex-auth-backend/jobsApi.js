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
const FILE_BUCKET = "jobFiles";
const MAX_LOGO_SIZE = 10 * 1024 * 1024;
const MAX_NOTIFICATION_SIZE = 25 * 1024 * 1024;
const PAGE_LIMIT = 50;
const CATEGORIES = [
  { id: "software-developer", name: "Software Developer / Java Developer" },
  { id: "java-full-stack", name: "Java Full Stack Developer" },
  { id: "frontend-react", name: "Frontend Developer / React Developer" },
  { id: "backend-spring-boot", name: "Backend Developer / Spring Boot Developer" },
  { id: "web-developer", name: "Web Developer" },
  { id: "python-developer", name: "Python Developer" },
  { id: "data-analyst", name: "Data Analyst" },
  { id: "data-scientist-ml", name: "Data Scientist / Machine Learning Engineer" },
  { id: "ai-generative-ai", name: "AI Engineer / Generative AI" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "cloud-devops", name: "Cloud Computing / DevOps" },
  { id: "software-testing-qa", name: "Software Testing / QA" },
  { id: "it-support", name: "IT Support" },
  { id: "internships", name: "Internships" },
  { id: "government-it-jobs", name: "Government IT Jobs" },
  { id: "off-campus-drives", name: "Off-Campus Drives" },
  { id: "remote-jobs", name: "Work From Home / Remote Jobs" },
];
const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const WORK_MODES = ["Remote", "Hybrid", "On-site"];
const EXPERIENCE_LEVELS = ["Freshers", "0-1 years", "1-3 years", "3-5 years", "5+ years"];
const STATUSES = ["draft", "open", "closed"];
const JOB_UPLOAD_LIMITS = Object.freeze({ logoBytes: MAX_LOGO_SIZE, notificationPdfBytes: MAX_NOTIFICATION_SIZE });
const attachmentSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
}, { _id: false });

class JobInputError extends Error {}

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  slug: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
  companyName: { type: String, required: true, trim: true, maxlength: 120 },
  companyLogoUrl: { type: String, default: "", maxlength: 2048 },
  companyLogoUpload: { type: attachmentSchema, default: null },
  notificationFile: { type: attachmentSchema, default: null },
  category: { type: String, required: true, enum: CATEGORIES.map(({ id }) => id) },
  employmentType: { type: String, required: true, enum: EMPLOYMENT_TYPES },
  location: { type: String, required: true, trim: true, maxlength: 120 },
  workMode: { type: String, required: true, enum: WORK_MODES },
  experience: { type: String, required: true, enum: EXPERIENCE_LEVELS },
  qualification: { type: String, default: "", trim: true, maxlength: 1000 },
  graduationYears: { type: [Number], default: [] },
  skills: { type: [String], default: [] },
  salary: { type: String, default: "", trim: true, maxlength: 120 },
  applicationStartDate: { type: Date, default: null },
  applicationDeadline: { type: Date, default: null },
  description: { type: String, required: true, trim: true, maxlength: 12000 },
  openings: { type: Number, default: null, min: 1, max: 100000 },
  applicationUrl: { type: String, default: "", maxlength: 2048 },
  sourceUrl: { type: String, default: "", maxlength: 2048 },
  lastVerifiedAt: { type: Date, default: null },
  status: { type: String, enum: STATUSES, default: "draft", index: true },
  featured: { type: Boolean, default: false },
  publishedAt: { type: Date, default: null },
}, { timestamps: true, collection: "jobs" });

jobSchema.index({ slug: 1 }, { unique: true });
jobSchema.index({ status: 1, publishedAt: -1 });
jobSchema.index({ category: 1, status: 1, publishedAt: -1 });
jobSchema.index({ applicationDeadline: 1, status: 1 });

function getJobModel() {
  const connection = mongoose.connection.useDb(DATABASE_NAME, { useCache: true });
  return connection.models.Job || connection.model("Job", jobSchema, "jobs");
}

let databasePromise;
let jobsBucket;

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
  if (!jobsBucket) {
    jobsBucket = new GridFSBucket(mongoose.connection.useDb(DATABASE_NAME, { useCache: true }).db, { bucketName: FILE_BUCKET });
  }
}

const uploadStorage = multer.diskStorage({
  destination: os.tmpdir(),
  filename: (_req, _file, callback) => callback(null, `vertex-job-${crypto.randomUUID()}`),
});
const jobUploads = multer({
  storage: uploadStorage,
  limits: { fileSize: MAX_NOTIFICATION_SIZE, files: 2, fields: 4, fieldSize: 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (file.fieldname === "companyLogo" && [".jpg", ".jpeg", ".png", ".webp"].includes(extension)) return callback(null, true);
    if (file.fieldname === "notificationFile" && extension === ".pdf") return callback(null, true);
    callback(new JobInputError("Company logos must be JPG, PNG, or WebP. Job notifications must be PDF files."));
  },
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function slugify(value) {
  return value.normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

function safeHttpsUrl(value, fieldName, { optional = false } = {}) {
  const candidate = typeof value === "string" ? value.trim() : "";
  if (!candidate && optional) return "";
  if (!candidate || candidate.length > 2048) {
    throw new JobInputError(`${fieldName} must be a valid HTTPS URL.`);
  }
  let parsed;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new JobInputError(`${fieldName} must be a valid HTTPS URL.`);
  }
  if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
    throw new JobInputError(`${fieldName} must use HTTPS and cannot contain credentials.`);
  }
  return parsed.toString();
}

function parseDate(value, fieldName) {
  if (value === "" || value === null || value === undefined) return null;
  if (typeof value !== "string") throw new JobInputError(`${fieldName} must be a valid date.`);
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (dateOnly) {
    const [, year, month, day] = dateOnly.map(Number);
    const parsedDate = new Date(Date.UTC(year, month - 1, day));
    if (parsedDate.getUTCFullYear() !== year || parsedDate.getUTCMonth() !== month - 1 || parsedDate.getUTCDate() !== day) {
      throw new JobInputError(`${fieldName} must be a valid date.`);
    }
  }
  const dateValue = fieldName === "Application deadline" && dateOnly ? `${value}T23:59:59.999Z` : value;
  const result = new Date(dateValue);
  if (Number.isNaN(result.getTime())) throw new JobInputError(`${fieldName} must be a valid date.`);
  return result;
}

function applicationUrlPresent(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function parseJobInput(input, { publishing = false } = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new JobInputError("Provide a job object.");
  }
  const category = CATEGORIES.some((item) => item.id === input.category) ? input.category : "";
  const employmentType = EMPLOYMENT_TYPES.includes(input.employmentType) ? input.employmentType : "";
  const workMode = WORK_MODES.includes(input.workMode) ? input.workMode : "";
  const experience = EXPERIENCE_LEVELS.includes(input.experience) ? input.experience : "";
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const companyName = typeof input.companyName === "string" ? input.companyName.trim() : "";
  const description = typeof input.description === "string" ? input.description.trim() : "";
  const location = typeof input.location === "string" ? input.location.trim() : "";
  const qualification = typeof input.qualification === "string" ? input.qualification.trim() : "";
  const salary = typeof input.salary === "string" ? input.salary.trim() : "";
  if (input.skills !== undefined && !Array.isArray(input.skills)) throw new JobInputError("Skills must be provided as a list.");
  if (input.graduationYears !== undefined && !Array.isArray(input.graduationYears)) {
    throw new JobInputError("Graduation years must be provided as a list.");
  }
  const rawSkills = Array.isArray(input.skills) ? input.skills : [];
  const rawYears = Array.isArray(input.graduationYears) ? input.graduationYears : [];
  const skills = [...new Set(rawSkills
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean))];
  const graduationYears = [...new Set(rawYears.map(Number))];
  const openings = input.openings === "" || input.openings === null || input.openings === undefined
    ? null
    : Number(input.openings);
  if (input.status !== undefined && !STATUSES.includes(input.status)) {
    throw new JobInputError("Choose draft, open, or closed job status.");
  }
  const status = input.status || "draft";

  if (!title || title.length > 160) throw new JobInputError("Job title is required and must be 160 characters or fewer.");
  if (!companyName || companyName.length > 120) throw new JobInputError("Company name is required and must be 120 characters or fewer.");
  if (!category) throw new JobInputError("Choose a supported job category.");
  if (!employmentType) throw new JobInputError("Choose a supported employment type.");
  if (!location || location.length > 120) throw new JobInputError("Location is required and must be 120 characters or fewer.");
  if (!workMode) throw new JobInputError("Choose a supported work mode.");
  if (!experience) throw new JobInputError("Choose an experience level.");
  if (!description || description.length > 12000) throw new JobInputError("Job description is required and must be 12,000 characters or fewer.");
  if (qualification.length > 1000 || salary.length > 120) throw new JobInputError("Qualification or salary information is too long.");
  if (rawSkills.length > 40 || skills.some((skill) => skill.length > 60)) throw new JobInputError("Provide up to 40 skills, each 60 characters or fewer.");
  if (graduationYears.length > 12 || graduationYears.some((year) => !Number.isInteger(year) || year < 1950 || year > 2100)) {
    throw new JobInputError("Graduation years must be valid years between 1950 and 2100.");
  }
  if (openings !== null && (!Number.isInteger(openings) || openings < 1 || openings > 100000)) {
    throw new JobInputError("Number of openings must be a whole number from 1 to 100,000.");
  }

  const applicationStartDate = parseDate(input.applicationStartDate, "Application start date");
  const applicationDeadline = parseDate(input.applicationDeadline, "Application deadline");
  const lastVerifiedAt = parseDate(input.lastVerifiedAt, "Last verified date");
  if (applicationStartDate && applicationDeadline && applicationStartDate > applicationDeadline) {
    throw new JobInputError("Application start date must be on or before the deadline.");
  }
  if (lastVerifiedAt && lastVerifiedAt > new Date()) {
    throw new JobInputError("Last verified date cannot be in the future.");
  }
  if (publishing && status !== "draft") {
    if (!applicationUrlPresent(input.applicationUrl)) throw new JobInputError("An official application URL is required before publishing.");
    if (!applicationUrlPresent(input.sourceUrl)) throw new JobInputError("An official source/notification URL is required before publishing.");
    if (!lastVerifiedAt) throw new JobInputError("Set the last verified date before publishing.");
    if (status === "open" && applicationDeadline && applicationDeadline <= new Date()) {
      throw new JobInputError("An expired job cannot be published as open.");
    }
  }

  const slug = slugify(input.slug || title);
  if (!slug) throw new JobInputError("Job title must include letters or numbers to create a URL.");

  return {
    title,
    slug,
    companyName,
    companyLogoUrl: safeHttpsUrl(input.companyLogoUrl, "Company logo URL", { optional: true }),
    category,
    employmentType,
    location,
    workMode,
    experience,
    qualification,
    graduationYears,
    skills,
    salary,
    applicationStartDate,
    applicationDeadline,
    description,
    openings,
    applicationUrl: safeHttpsUrl(input.applicationUrl, "Application URL", { optional: !publishing || status === "draft" }),
    sourceUrl: safeHttpsUrl(input.sourceUrl, "Official source URL", { optional: !publishing || status === "draft" }),
    lastVerifiedAt,
    status,
    featured: input.featured === true,
  };
}

function getEffectiveStatus(job, now = new Date()) {
  if (job.status === "draft") return "draft";
  if (job.status === "closed") return "closed";
  if (job.applicationDeadline && new Date(job.applicationDeadline) <= now) return "closed";
  if (job.applicationDeadline && new Date(job.applicationDeadline) <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)) {
    return "closingSoon";
  }
  return "open";
}

function serializeJob(job, admin = false) {
  const category = CATEGORIES.find((item) => item.id === job.category);
  const fileBase = admin ? `/api/admin/jobs/${job._id.toString()}/files` : `/api/jobs/${encodeURIComponent(job.slug)}/files`;
  return {
    id: job._id.toString(),
    title: job.title,
    slug: job.slug,
    companyName: job.companyName,
    companyLogoUrl: job.companyLogoUpload
      ? `${fileBase}/${job.companyLogoUpload.fileId.toString()}`
      : job.companyLogoUrl || "",
    ...(admin ? { companyLogoName: job.companyLogoUpload?.name || "" } : {}),
    notificationFile: job.notificationFile ? {
      id: job.notificationFile.fileId.toString(),
      name: job.notificationFile.name,
      url: `${fileBase}/${job.notificationFile.fileId.toString()}`,
    } : null,
    ...(admin ? { companyLogoUploadId: job.companyLogoUpload?.fileId.toString() || "" } : {}),
    category: job.category,
    categoryName: category?.name || job.category,
    employmentType: job.employmentType,
    location: job.location,
    workMode: job.workMode,
    experience: job.experience,
    qualification: job.qualification || "",
    graduationYears: job.graduationYears || [],
    skills: job.skills || [],
    salary: job.salary || "",
    applicationStartDate: job.applicationStartDate,
    applicationDeadline: job.applicationDeadline,
    description: job.description,
    openings: job.openings ?? null,
    applicationUrl: job.applicationUrl || "",
    sourceUrl: job.sourceUrl || "",
    lastVerifiedAt: job.lastVerifiedAt,
    status: getEffectiveStatus(job),
    featured: Boolean(job.featured),
    postedAt: job.publishedAt || job.createdAt,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  };
}

function safeUploadName(file) {
  return path.basename(file.originalname.replace(/\\/g, "/"))
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, 180) || "job-upload";
}

function validateJobUpload(file, kind) {
  const extension = path.extname(file.originalname).toLowerCase();
  const maxSize = kind === "companyLogo" ? MAX_LOGO_SIZE : MAX_NOTIFICATION_SIZE;
  if (file.size > maxSize) {
    throw new JobInputError(`${kind === "companyLogo" ? "Company logos" : "Notification PDFs"} must be ${maxSize / 1024 / 1024} MB or smaller.`);
  }
  const descriptor = fs.openSync(file.path, "r");
  const header = Buffer.alloc(12);
  try {
    fs.readSync(descriptor, header, 0, header.length, 0);
  } finally {
    fs.closeSync(descriptor);
  }
  const valid = kind === "notificationFile"
    ? extension === ".pdf" && header.subarray(0, 5).toString() === "%PDF-"
    : extension === ".png"
      ? header.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
      : extension === ".jpg" || extension === ".jpeg"
        ? header.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))
        : extension === ".webp"
          ? header.subarray(0, 4).toString() === "RIFF" && header.subarray(8, 12).toString() === "WEBP"
          : false;
  if (!valid) throw new JobInputError(`The uploaded ${kind === "companyLogo" ? "logo" : "notification"} file does not match its file type.`);
  return {
    contentType: kind === "notificationFile" ? "application/pdf"
      : extension === ".png" ? "image/png"
        : extension === ".webp" ? "image/webp" : "image/jpeg",
    name: safeUploadName(file),
    size: file.size,
  };
}

async function saveJobUpload(file, details) {
  const stream = jobsBucket.openUploadStream(details.name, { contentType: details.contentType });
  await pipeline(fs.createReadStream(file.path), stream);
  return { fileId: stream.id, ...details };
}

async function removeJobUpload(attachment) {
  if (!attachment?.fileId) return;
  try {
    await jobsBucket.delete(attachment.fileId);
  } catch (error) {
    if (error.code !== 26) throw error;
  }
}

async function cleanJobTempFiles(files) {
  await Promise.all(Object.values(files || {}).flat().map((file) => fs.promises.unlink(file.path).catch((error) => {
    if (error.code !== "ENOENT") console.error("Could not remove temporary job upload:", error.message);
  })));
}

function sendJobFile(bucket, job, fileId, res, next) {
  const attachment = [job.companyLogoUpload, job.notificationFile].find((file) => file?.fileId.equals(fileId));
  if (!attachment) return res.status(404).json({ message: "Job file not found." });
  res.setHeader("Content-Type", attachment.contentType);
  res.setHeader("Content-Length", attachment.size);
  res.setHeader("Content-Disposition", "inline");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "private, max-age=3600");
  bucket.openDownloadStream(fileId).on("error", (error) => {
    if (!res.headersSent) res.status(404).json({ message: "Job file not found." });
    else res.destroy(error);
  }).pipe(res);
}

function parseListParameters(query, admin = false) {
  const page = Number.parseInt(query.page || "1", 10);
  const limit = Number.parseInt(query.limit || "12", 10);
  if (!Number.isInteger(page) || page < 1 || page > 100000) throw new JobInputError("Page must be a positive whole number.");
  if (!Number.isInteger(limit) || limit < 1 || limit > PAGE_LIMIT) throw new JobInputError("Page size must be between 1 and 50.");
  const sort = query.sort || "newest";
  if (!["newest", "deadline", "company"].includes(sort)) throw new JobInputError("Choose newest, deadline, or company sorting.");
  const status = query.status || "";
  if (status && !(admin ? STATUSES.includes(status) || status === "closingSoon" : ["open", "closingSoon", "closed"].includes(status))) {
    throw new JobInputError("Choose a valid job status.");
  }
  const experience = query.experience || "";
  if (experience && !EXPERIENCE_LEVELS.includes(experience)) throw new JobInputError("Choose a valid experience level.");
  const workMode = query.workMode || "";
  if (workMode && !WORK_MODES.includes(workMode)) throw new JobInputError("Choose a valid work mode.");
  const employmentType = query.employmentType || "";
  if (employmentType && !EMPLOYMENT_TYPES.includes(employmentType)) throw new JobInputError("Choose a valid employment type.");
  const category = query.category || "";
  if (category && !CATEGORIES.some((item) => item.id === category)) throw new JobInputError("Choose a valid job category.");
  const graduationYear = query.graduationYear ? Number(query.graduationYear) : null;
  if (graduationYear !== null && (!Number.isInteger(graduationYear) || graduationYear < 1950 || graduationYear > 2100)) {
    throw new JobInputError("Graduation year must be a valid year.");
  }
  return {
    page,
    limit,
    sort,
    status,
    experience,
    workMode,
    employmentType,
    category,
    graduationYear,
    location: typeof query.location === "string" ? query.location.trim().slice(0, 120) : "",
    q: typeof query.q === "string" ? query.q.trim().slice(0, 120) : "",
  };
}

function createAuthenticationMiddleware(getSessionFromRequest) {
  return (req, res, next) => {
    if (!getSessionFromRequest(req)) return res.status(401).json({ message: "Admin authentication required." });
    next();
  };
}

function createOriginMiddleware(rejectUnexpectedOrigin) {
  return (req, res, next) => {
    if (!rejectUnexpectedOrigin(req, res)) next();
  };
}

function filtersFor(params, admin) {
  const filter = {};
  if (!admin) filter.status = { $in: ["open", "closed"] };
  else if (params.status && params.status !== "closingSoon") filter.status = params.status;
  if (params.category) filter.category = params.category;
  if (params.employmentType) filter.employmentType = params.employmentType;
  if (params.workMode) filter.workMode = params.workMode;
  if (params.experience) filter.experience = params.experience;
  if (params.graduationYear) filter.graduationYears = params.graduationYear;
  if (params.location) filter.location = { $regex: escapeRegExp(params.location), $options: "i" };
  if (params.q) {
    const term = { $regex: escapeRegExp(params.q), $options: "i" };
    filter.$and = [{
      $or: [
        { title: term },
        { companyName: term },
        { description: term },
        { skills: term },
        { category: term },
      ],
    }];
  }
  if (params.status === "closingSoon") {
    const now = new Date();
    filter.status = "open";
    filter.applicationDeadline = { $gt: now, $lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) };
  } else if (!admin && params.status === "open") {
    filter.status = "open";
    filter.$and = [
      ...(filter.$and || []),
      { $or: [{ applicationDeadline: null }, { applicationDeadline: { $gt: new Date() } }] },
    ];
  } else if (!admin && params.status === "closed") {
    filter.$or = [
      ...(filter.$or || []),
      { status: "closed" },
      { status: "open", applicationDeadline: { $lte: new Date() } },
    ];
  } else if (!admin) {
    filter.$and = [
      ...(filter.$and || []),
      { $or: [{ status: "closed" }, { status: "open", $or: [{ applicationDeadline: null }, { applicationDeadline: { $gt: new Date() } }] }] },
    ];
  }
  return filter;
}

function sortFor(sort) {
  if (sort === "deadline") return { applicationDeadline: 1, publishedAt: -1 };
  if (sort === "company") return { companyName: 1, publishedAt: -1 };
  return { publishedAt: -1, createdAt: -1 };
}

function escapeXml(value) {
  return String(value).replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character]);
}

function sendInputError(error, res, next) {
  if (error instanceof JobInputError) {
    res.status(400).json({ message: error.message });
    return;
  }
  if (error.code === 11000) {
    res.status(409).json({ message: "A job with that URL slug already exists." });
    return;
  }
  next(error);
}

function createJobsRouters({ getSessionFromRequest, rejectUnexpectedOrigin }) {
  const publicRouter = express.Router();
  const adminRouter = express.Router();
  const requireAdmin = createAuthenticationMiddleware(getSessionFromRequest);
  const requireAllowedOrigin = createOriginMiddleware(rejectUnexpectedOrigin);
  adminRouter.use(requireAdmin);

  publicRouter.get("/categories", (_req, res) => res.json(CATEGORIES));
  adminRouter.get("/categories", (_req, res) => res.json(CATEGORIES));

  const getPublicFile = async (req, res, next) => {
    try {
      await ensureDatabase();
      const fileId = mongoose.isValidObjectId(req.params.fileId) ? new ObjectId(req.params.fileId) : null;
      if (!fileId) return res.status(404).json({ message: "Job file not found." });
      const job = await getJobModel().findOne({
        slug: req.params.slug,
        status: { $in: ["open", "closed"] },
      }).select("companyLogoUpload notificationFile").lean();
      if (!job) return res.status(404).json({ message: "Job file not found." });
      return sendJobFile(jobsBucket, job, fileId, res, next);
    } catch (error) {
      next(error);
    }
  };
  publicRouter.get("/:slug/files/:fileId", getPublicFile);

  publicRouter.get("/sitemap.xml", async (_req, res, next) => {
    try {
      await ensureDatabase();
      const now = new Date();
      const jobs = await getJobModel().find({
        status: "open",
        $or: [{ applicationDeadline: null }, { applicationDeadline: { $gt: now } }],
      }).select("slug updatedAt publishedAt").sort({ publishedAt: -1 }).lean();
      const configuredSiteUrl = process.env.PUBLIC_SITE_URL || "https://www.360vertexsolutions.com";
      const siteUrl = new URL(configuredSiteUrl);
      if (siteUrl.protocol !== "https:" || siteUrl.username || siteUrl.password) {
        throw new Error("PUBLIC_SITE_URL must be a public HTTPS origin.");
      }
      const origin = siteUrl.origin;
      const urls = [
        `<url><loc>${escapeXml(`${origin}/career-jobs`)}</loc></url>`,
        ...jobs.map((job) => (
          `<url><loc>${escapeXml(`${origin}/career-jobs/${encodeURIComponent(job.slug)}`)}</loc><lastmod>${new Date(job.updatedAt || job.publishedAt).toISOString().slice(0, 10)}</lastmod></url>`
        )),
      ];
      res.type("application/xml").send(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`
      );
    } catch (error) {
      next(error);
    }
  });

  publicRouter.get("/", async (req, res, next) => {
    try {
      await ensureDatabase();
      const params = parseListParameters(req.query);
      const Job = getJobModel();
      const filter = filtersFor(params, false);
      const [documents, total] = await Promise.all([
        Job.find(filter).sort(sortFor(params.sort)).skip((params.page - 1) * params.limit).limit(params.limit).lean(),
        Job.countDocuments(filter),
      ]);
      res.json({
        items: documents.map(serializeJob),
        page: params.page,
        pages: Math.ceil(total / params.limit),
        total,
      });
    } catch (error) {
      sendInputError(error, res, next);
    }
  });

  publicRouter.get("/:slug", async (req, res, next) => {
    try {
      await ensureDatabase();
      const job = await getJobModel().findOne({
        slug: req.params.slug,
        status: { $in: ["open", "closed"] },
      }).lean();
      if (!job) return res.status(404).json({ message: "Job not found." });
      res.json(serializeJob(job));
    } catch (error) {
      next(error);
    }
  });

  adminRouter.get("/", async (req, res, next) => {
    try {
      await ensureDatabase();
      const params = parseListParameters(req.query, true);
      const Job = getJobModel();
      const filter = filtersFor(params, true);
      const now = new Date();
      const [documents, total, drafts, open, closed, featured] = await Promise.all([
        Job.find(filter).sort(sortFor(params.sort)).skip((params.page - 1) * params.limit).limit(params.limit).lean(),
        Job.countDocuments(filter),
        Job.countDocuments({ status: "draft" }),
        Job.countDocuments({ status: "open", $or: [{ applicationDeadline: null }, { applicationDeadline: { $gt: now } }] }),
        Job.countDocuments({ $or: [{ status: "closed" }, { status: "open", applicationDeadline: { $lte: now } }] }),
        Job.countDocuments({ featured: true, status: { $in: ["open", "closed"] } }),
      ]);
      res.json({
        items: documents.map((job) => serializeJob(job, true)),
        page: params.page,
        pages: Math.ceil(total / params.limit),
        total,
        dashboard: { total: await Job.countDocuments(), drafts, open, closed, featured },
      });
    } catch (error) {
      sendInputError(error, res, next);
    }
  });

  adminRouter.get("/:jobId", async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.jobId)) return res.status(404).json({ message: "Job not found." });
      await ensureDatabase();
      const job = await getJobModel().findById(req.params.jobId).lean();
      if (!job) return res.status(404).json({ message: "Job not found." });
      res.json(serializeJob(job, true));
    } catch (error) {
      next(error);
    }
  });

  adminRouter.get("/:jobId/files/:fileId", async (req, res, next) => {
    try {
      await ensureDatabase();
      if (!mongoose.isValidObjectId(req.params.jobId) || !mongoose.isValidObjectId(req.params.fileId)) {
        return res.status(404).json({ message: "Job file not found." });
      }
      const job = await getJobModel().findById(req.params.jobId).select("companyLogoUpload notificationFile").lean();
      if (!job) return res.status(404).json({ message: "Job file not found." });
      return sendJobFile(jobsBucket, job, new ObjectId(req.params.fileId), res, next);
    } catch (error) {
      next(error);
    }
  });

  const saveJob = (update) => (req, res, next) => {
    jobUploads.fields([{ name: "companyLogo", maxCount: 1 }, { name: "notificationFile", maxCount: 1 }])(
      req, res, async (uploadError) => {
        const files = req.files || {};
        const added = [];
        if (uploadError) {
          await cleanJobTempFiles(files);
          if (uploadError.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "Uploads must be 25 MB or smaller." });
          }
          return sendInputError(uploadError, res, next);
        }
        try {
          await ensureDatabase();
          if (update && !mongoose.isValidObjectId(req.params.jobId)) return res.status(404).json({ message: "Job not found." });
          const Job = getJobModel();
          const job = update ? await Job.findById(req.params.jobId) : new Job();
          if (update && !job) return res.status(404).json({ message: "Job not found." });
          const input = JSON.parse(req.body.job || "{}");
          const logoFile = files.companyLogo?.[0];
          const notificationFile = files.notificationFile?.[0];
          const parsed = parseJobInput(input, { publishing: input.status !== "draft" });
          const oldLogo = job.companyLogoUpload;
          const oldNotification = job.notificationFile;
          const keepLogo = !logoFile && req.body.keepCompanyLogoId === oldLogo?.fileId.toString() ? oldLogo : null;
          const keepNotification = !notificationFile && req.body.keepNotificationFileId === oldNotification?.fileId.toString()
            ? oldNotification
            : null;
          if (logoFile) {
            const uploaded = await saveJobUpload(logoFile, validateJobUpload(logoFile, "companyLogo"));
            added.push(uploaded);
            parsed.companyLogoUrl = "";
            job.companyLogoUpload = uploaded;
          } else {
            job.companyLogoUpload = keepLogo;
          }
          if (notificationFile) {
            const uploaded = await saveJobUpload(notificationFile, validateJobUpload(notificationFile, "notificationFile"));
            added.push(uploaded);
            job.notificationFile = uploaded;
          } else {
            job.notificationFile = keepNotification;
          }
          Object.assign(job, parsed);
          if (job.status === "draft") job.publishedAt = null;
          else if (!job.publishedAt) job.publishedAt = new Date();
          await job.save();
          for (const previous of [oldLogo, oldNotification]) {
            const current = [job.companyLogoUpload, job.notificationFile];
            if (previous && !current.some((file) => file?.fileId.equals(previous.fileId))) {
              await removeJobUpload(previous).catch((error) => console.error("Could not remove replaced job upload:", error.message));
            }
          }
          res.status(update ? 200 : 201).json(serializeJob(job, true));
        } catch (error) {
          await Promise.all(added.map((file) => removeJobUpload(file).catch((cleanupError) => console.error("Could not clean up job upload:", cleanupError.message))));
          if (error instanceof SyntaxError) return res.status(400).json({ message: "Job data is invalid." });
          sendInputError(error, res, next);
        } finally {
          await cleanJobTempFiles(files);
        }
      }
    );
  };

  adminRouter.post("/", requireAllowedOrigin, saveJob(false));
  adminRouter.put("/:jobId", requireAllowedOrigin, saveJob(true));

  adminRouter.delete("/:jobId", requireAllowedOrigin, async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.jobId)) return res.status(404).json({ message: "Job not found." });
      await ensureDatabase();
      const deleted = await getJobModel().findByIdAndDelete(req.params.jobId);
      if (!deleted) return res.status(404).json({ message: "Job not found." });
      await Promise.all([deleted.companyLogoUpload, deleted.notificationFile].filter(Boolean).map((file) => (
        removeJobUpload(file).catch((error) => console.error("Could not remove deleted job upload:", error.message))
      )));
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  return { publicRouter, adminRouter };
}

module.exports = {
  CATEGORIES,
  EXPERIENCE_LEVELS,
  EMPLOYMENT_TYPES,
  JOB_UPLOAD_LIMITS,
  WORK_MODES,
  getEffectiveStatus,
  parseJobInput,
  parseListParameters,
  safeHttpsUrl,
  slugify,
  createJobsRouters,
};
