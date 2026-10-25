const test = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const {
  AI_TOOLS,
  DIFFICULTIES,
  UPLOAD_LIMITS,
  createPromptsRouters,
  formatPromptId,
  parseByteRange,
  parsePromptInput,
  slugify,
} = require("../promptsApi");

const categories = [{ id: "writing", name: "Writing" }];
const validPrompt = {
  title: "Product description",
  description: "Write clear product copy.",
  promptText: "Act as a product copywriter and write a description for [product].",
  categoryId: "writing",
  tags: ["copywriting"],
  aiTools: ["ChatGPT"],
  difficulty: "Beginner",
  status: "draft",
};

test("prompt vocabularies include common AI tools and difficulty levels", () => {
  assert.ok(AI_TOOLS.includes("ChatGPT"));
  assert.ok(AI_TOOLS.includes("Claude"));
  assert.deepEqual(DIFFICULTIES, ["Beginner", "Intermediate", "Advanced"]);
});

test("prompt IDs use the required six-digit backend format", () => {
  assert.equal(formatPromptId(1), "VTX-PMT-000001");
  assert.equal(formatPromptId(125), "VTX-PMT-000125");
});

test("prompt upload limits accept the advertised image, video, and PDF sizes", () => {
  assert.equal(UPLOAD_LIMITS.imageBytes, 10 * 1024 * 1024);
  assert.equal(UPLOAD_LIMITS.videoBytes, 20 * 1024 * 1024);
  assert.equal(UPLOAD_LIMITS.pdfBytes, 25 * 1024 * 1024);
  assert.equal(UPLOAD_LIMITS.videos, 1);
  assert.equal(UPLOAD_LIMITS.pdfs, 3);
});

test("prompt media byte ranges support normal and suffix requests safely", () => {
  assert.deepEqual(parseByteRange("bytes=2-5", 10), { start: 2, end: 5 });
  assert.deepEqual(parseByteRange("bytes=7-", 10), { start: 7, end: 9 });
  assert.deepEqual(parseByteRange("bytes=-4", 10), { start: 6, end: 9 });
  assert.equal(parseByteRange("bytes=10-", 10), false);
  assert.equal(parseByteRange("bytes=4-2", 10), false);
  assert.equal(parseByteRange(undefined, 10), null);
});

test("prompt input validates required fields and category", () => {
  const parsed = parsePromptInput(validPrompt, categories);
  assert.equal(parsed.title, validPrompt.title);
  assert.equal(parsed.status, "draft");
  assert.deepEqual(parsed.tags, ["copywriting"]);
  assert.equal("promptId" in parsePromptInput({ ...validPrompt, promptId: "VTX-PMT-999999" }, categories), false);
  assert.throws(() => parsePromptInput({ ...validPrompt, title: "" }, categories), /title is required/);
  assert.throws(() => parsePromptInput({ ...validPrompt, categoryId: "missing" }, categories), /valid prompt category/);
  assert.throws(() => parsePromptInput({ ...validPrompt, aiTools: ["Unknown AI"] }, categories), /supported AI tools/);
});

test("prompt input rejects unsafe external image URLs and invalid publication states", () => {
  assert.throws(() => parsePromptInput({ ...validPrompt, externalExampleImageUrl: "javascript:alert(1)" }, categories), /HTTPS/);
  assert.throws(() => parsePromptInput({ ...validPrompt, status: "live" }, categories), /status/);
  assert.equal(parsePromptInput({ ...validPrompt, externalExampleImageUrl: "https://images.example.org/sample.png" }, categories).externalExampleImageUrl,
    "https://images.example.org/sample.png");
});

test("prompt category slugs are normalized", () => {
  assert.equal(slugify("  Brand & Marketing  "), "brand-marketing");
});

test("public prompt APIs remain accessible while admin APIs require existing authentication", async (context) => {
  const app = express();
  const { publicRouter, adminRouter } = createPromptsRouters({
    getSessionFromRequest: () => null,
    rejectUnexpectedOrigin: (_req, res) => {
      res.status(403).json({ message: "Request origin is not allowed." });
      return true;
    },
  });
  app.use("/api/prompts", publicRouter);
  app.use("/api/admin/prompts", adminRouter);
  const server = await new Promise((resolve) => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  context.after(() => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  }));

  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(`${baseUrl}/api/admin/prompts`);
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { message: "Admin authentication required." });
  const duplicateResponse = await fetch(`${baseUrl}/api/admin/prompts/VTX-PMT-000001/duplicate`, { method: "POST" });
  assert.equal(duplicateResponse.status, 401);
});
