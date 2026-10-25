const test = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const {
  CATEGORIES,
  JOB_UPLOAD_LIMITS,
  getEffectiveStatus,
  parseJobInput,
  parseListParameters,
  safeHttpsUrl,
  slugify,
  createJobsRouters,
} = require("../jobsApi");

const validDraft = {
  title: "React Engineer",
  companyName: "Example Company",
  category: "frontend-react",
  employmentType: "Full-time",
  location: "Hyderabad",
  workMode: "Hybrid",
  experience: "Freshers",
  description: "Build frontend experiences.",
};

test("job categories cover the requested career areas", () => {
  assert.equal(CATEGORIES.length, 17);
  assert.ok(CATEGORIES.some(({ id }) => id === "government-it-jobs"));
  assert.ok(CATEGORIES.some(({ id }) => id === "remote-jobs"));
});

test("job upload limits support company logos and official notification PDFs", () => {
  assert.equal(JOB_UPLOAD_LIMITS.logoBytes, 10 * 1024 * 1024);
  assert.equal(JOB_UPLOAD_LIMITS.notificationPdfBytes, 25 * 1024 * 1024);
});

test("job draft input validates fields and generates a URL-safe slug", () => {
  const job = parseJobInput(validDraft);
  assert.equal(job.slug, "react-engineer");
  assert.equal(job.status, "draft");
  assert.deepEqual(job.skills, []);
  assert.throws(() => parseJobInput({ ...validDraft, workMode: "Anywhere" }), /work mode/);
  assert.throws(() => parseJobInput({ ...validDraft, status: "published" }), /job status/);
  assert.throws(() => parseJobInput({ ...validDraft, applicationDeadline: 123 }), /valid date/);
  assert.throws(() => parseJobInput({ ...validDraft, applicationDeadline: "2026-02-31" }), /valid date/);
});

test("publishing requires verified official source and application information", () => {
  assert.throws(() => parseJobInput({ ...validDraft, status: "open" }, { publishing: true }), /application URL/);
  const published = parseJobInput({
    ...validDraft,
    status: "open",
    applicationDeadline: "2026-10-11",
    applicationUrl: "https://careers.example.com/apply",
    sourceUrl: "https://careers.example.com/notice",
    lastVerifiedAt: "2026-10-10",
  }, { publishing: true });
  assert.equal(published.applicationUrl, "https://careers.example.com/apply");
  assert.equal(published.applicationDeadline.toISOString(), "2026-10-11T23:59:59.999Z");
});

test("unsafe job URLs are rejected", () => {
  assert.throws(() => safeHttpsUrl("javascript:alert(1)", "Application URL"), /HTTPS/);
  assert.throws(() => safeHttpsUrl("https://user:pass@example.com", "Application URL"), /credentials/);
  assert.equal(safeHttpsUrl("", "Company logo URL", { optional: true }), "");
});

test("job status reflects deadlines and list filters are allowlisted", () => {
  const now = new Date("2026-10-11T00:00:00.000Z");
  assert.equal(getEffectiveStatus({ status: "open", applicationDeadline: "2026-10-12" }, now), "closingSoon");
  assert.equal(getEffectiveStatus({ status: "open", applicationDeadline: "2026-10-10" }, now), "closed");
  assert.equal(getEffectiveStatus({ status: "closed" }, now), "closed");
  assert.deepEqual(
    (({ page, limit, sort, experience }) => ({ page, limit, sort, experience }))(
      parseListParameters({ page: "2", limit: "15", sort: "deadline", experience: "Freshers" })
    ),
    { page: 2, limit: 15, sort: "deadline", experience: "Freshers" }
  );
  assert.throws(() => parseListParameters({ sort: "random" }), /sorting/);
  assert.throws(() => parseListParameters({ workMode: "anywhere" }), /work mode/);
});

test("job slug normalization is stable", () => {
  assert.equal(slugify("  Data & AI Engineer! "), "data-ai-engineer");
});

test("job routes keep admin APIs private while exposing the category catalog", async (context) => {
  const app = express();
  const { publicRouter, adminRouter } = createJobsRouters({
    getSessionFromRequest: () => null,
    rejectUnexpectedOrigin: (_req, res) => {
      res.status(403).json({ message: "Request origin is not allowed." });
      return true;
    },
  });
  app.use("/api/jobs", publicRouter);
  app.use("/api/admin/jobs", adminRouter);
  const server = await new Promise((resolve) => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  context.after(() => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  }));

  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const categoriesResponse = await fetch(`${baseUrl}/api/jobs/categories`);
  assert.equal(categoriesResponse.status, 200);
  assert.equal((await categoriesResponse.json()).length, 17);
  const adminResponse = await fetch(`${baseUrl}/api/admin/jobs`);
  assert.equal(adminResponse.status, 401);
  assert.deepEqual(await adminResponse.json(), { message: "Admin authentication required." });
});
