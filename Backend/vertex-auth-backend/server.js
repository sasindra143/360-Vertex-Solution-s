require("dotenv").config();

const crypto = require("crypto");
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { createMediaNotesRouters } = require("./mediaNotes");
const { createNotesCmsRouters } = require("./notesCms");
const { createJobsRouters } = require("./jobsApi");
const { createPromptsRouters } = require("./promptsApi");
const { createRegistrationRouters } = require("./registrationsApi");

const app = express();
const PORT = Number(process.env.PORT || 3001);
const SESSION_COOKIE = "vertex_admin_session";
const SESSION_DURATION_SECONDS = 8 * 60 * 60;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 10;
const loginAttempts = new Map();
const activeSessions = new Map();

const requiredEnvironment = ["ADMIN_EMAIL", "ADMIN_PASSWORD_HASH", "ADMIN_SESSION_SECRET"];
const missingEnvironment = requiredEnvironment.filter((name) => !process.env[name]);
if (missingEnvironment.length > 0) {
  throw new Error(`Missing required backend environment variables: ${missingEnvironment.join(", ")}`);
}

const adminEmail = process.env.ADMIN_EMAIL.trim().toLowerCase();
const sessionSecret = process.env.ADMIN_SESSION_SECRET;
const allowedOrigins = new Set(
  (process.env.FRONTEND_ORIGINS || "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);
const cookieSecure = process.env.NODE_ENV === "production";

app.disable("x-powered-by");
app.use(cors({
  origin(origin, callback) {
    callback(null, !origin || allowedOrigins.has(origin) ? origin || false : false);
  },
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));

function rejectUnexpectedOrigin(req, res) {
  const origin = req.get("origin");
  if (!origin || !allowedOrigins.has(origin)) {
    res.status(403).json({ message: "Request origin is not allowed." });
    return true;
  }
  return false;
}

function createSessionToken() {
  const sessionId = crypto.randomUUID();
  const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
  const payload = Buffer.from(JSON.stringify({
    sessionId,
    email: adminEmail,
    role: "ADMIN",
    expiresAt,
  })).toString("base64url");
  const signature = crypto.createHmac("sha256", sessionSecret).update(payload).digest("base64url");
  activeSessions.set(sessionId, expiresAt);
  return `${payload}.${signature}`;
}

function getSessionTokenFromRequest(req) {
  const cookies = (req.headers.cookie || "").split(";").map((cookie) => cookie.trim());
  const cookie = cookies.find((value) => value.startsWith(`${SESSION_COOKIE}=`));
  return cookie ? cookie.slice(SESSION_COOKIE.length + 1) : null;
}

function getSessionFromRequest(req) {
  const token = getSessionTokenFromRequest(req);
  if (!token) return null;
  const [payload, suppliedSignature, extra] = token.split(".");
  if (!payload || !suppliedSignature || extra !== undefined) return null;

  const expectedSignature = crypto.createHmac("sha256", sessionSecret).update(payload).digest();
  let actualSignature;
  try {
    actualSignature = Buffer.from(suppliedSignature, "base64url");
  } catch {
    return null;
  }
  if (actualSignature.length !== expectedSignature.length || !crypto.timingSafeEqual(actualSignature, expectedSignature)) {
    return null;
  }

  let session;
  try {
    session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  if (
    session.email !== adminEmail ||
    session.role !== "ADMIN" ||
    typeof session.sessionId !== "string" ||
    typeof session.expiresAt !== "number" ||
    session.expiresAt <= Date.now() ||
    activeSessions.get(session.sessionId) !== session.expiresAt
  ) {
    return null;
  }
  return session;
}

function setSessionCookie(res, token) {
  const secure = cookieSecure ? "; Secure" : "";
  const sameSite = cookieSecure ? "None" : "Strict";
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${token}; HttpOnly; SameSite=${sameSite}; Path=/api/admin; Max-Age=${SESSION_DURATION_SECONDS}${secure}`
  );
}

function clearSessionCookie(res) {
  const secure = cookieSecure ? "; Secure" : "";
  const sameSite = cookieSecure ? "None" : "Strict";
  res.setHeader("Set-Cookie", [
    `${SESSION_COOKIE}=; HttpOnly; SameSite=${sameSite}; Path=/api/admin; Max-Age=0${secure}`,
    `${SESSION_COOKIE}=; HttpOnly; SameSite=${sameSite}; Path=/api/admin/auth; Max-Age=0${secure}`,
  ]);
}

function getRateLimitState(ip) {
  const now = Date.now();
  const current = loginAttempts.get(ip);
  if (!current || current.resetAt <= now) {
    const fresh = { count: 0, resetAt: now + LOGIN_WINDOW_MS };
    loginAttempts.set(ip, fresh);
    return fresh;
  }
  return current;
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/admin/auth/login", async (req, res) => {
  if (rejectUnexpectedOrigin(req, res)) return;

  const attempt = getRateLimitState(req.ip);
  if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
    res.setHeader("Retry-After", Math.ceil((attempt.resetAt - Date.now()) / 1000));
    return res.status(429).json({ message: "Too many sign-in attempts. Please try again later." });
  }

  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (
    !email ||
    email.length > 254 ||
    !password ||
    password.length > 256 ||
    email !== adminEmail ||
    !(await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH))
  ) {
    attempt.count += 1;
    return res.status(401).json({ message: "Invalid email or password." });
  }

  loginAttempts.delete(req.ip);
  setSessionCookie(res, createSessionToken());
  return res.json({ user: { email: adminEmail, role: "ADMIN", full_name: "Sasindra Madduri" } });
});

app.get("/api/admin/auth/session", (req, res) => {
  const session = getSessionFromRequest(req);
  if (!session) return res.status(401).json({ message: "Admin authentication required." });
  setSessionCookie(res, getSessionTokenFromRequest(req));
  return res.json({ user: { email: session.email, role: session.role, full_name: "Sasindra Madduri" } });
});

app.post("/api/admin/auth/logout", (req, res) => {
  if (rejectUnexpectedOrigin(req, res)) return;
  const session = getSessionFromRequest(req);
  if (session) activeSessions.delete(session.sessionId);
  clearSessionCookie(res);
  return res.status(204).end();
});

const { publicRouter: legacyPublicNotesRouter, adminRouter: legacyAdminNotesRouter } = createMediaNotesRouters({
  getSessionFromRequest,
  rejectUnexpectedOrigin,
});
const { publicRouter: publicNotesRouter, adminRouter: adminNotesRouter } = createNotesCmsRouters({
  getSessionFromRequest,
  rejectUnexpectedOrigin,
});
const { publicRouter: publicJobsRouter, adminRouter: adminJobsRouter } = createJobsRouters({
  getSessionFromRequest,
  rejectUnexpectedOrigin,
});
const { publicRouter: publicPromptsRouter, adminRouter: adminPromptsRouter } = createPromptsRouters({
  getSessionFromRequest,
  rejectUnexpectedOrigin,
});
const { publicRouter: publicRegistrationsRouter, adminRouter: adminRegistrationsRouter } = createRegistrationRouters({
  getSessionFromRequest,
  rejectUnexpectedOrigin,
});
app.use("/api/notes", publicNotesRouter);
app.use("/api/admin/notes", adminNotesRouter);
app.use("/api/jobs", publicJobsRouter);
app.use("/api/admin/jobs", adminJobsRouter);
app.use("/api/prompts", publicPromptsRouter);
app.use("/api/admin/prompts", adminPromptsRouter);
app.use("/api/registrations", publicRegistrationsRouter);
app.use("/api/admin/registrations", adminRegistrationsRouter);
app.use("/api/legacy/media-notes", legacyPublicNotesRouter);
app.use("/api/admin/legacy-media-notes", legacyAdminNotesRouter);

app.use((error, _req, res, _next) => {
  console.error("Backend request failed:", error.message);
  if (res.headersSent) return;
  return res.status(500).json({ message: "The server could not complete the request." });
});

app.listen(PORT, process.env.HOST || "127.0.0.1", () => {
  console.log(`Admin authentication API listening on port ${PORT}.`);
});
