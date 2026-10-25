const test = require("node:test");
const assert = require("node:assert/strict");
const {
  parsePageParameters,
  normalizeHeadingBlock,
  safeVideoEmbed,
  sanitizeRichText,
  slugify,
} = require("../notesCms");

test("slugify creates a stable, URL-safe slug", () => {
  assert.equal(slugify("  Héading: Notes & Guides! "), "heading-notes-guides");
  assert.equal(slugify("☀️"), "");
});

test("section heading blocks are validated and normalized", () => {
  assert.deepEqual(normalizeHeadingBlock("  Retrieval steps  ", "h2"), { text: "Retrieval steps", level: "h2" });
  assert.throws(() => normalizeHeadingBlock("", "h2"), /need text/);
  assert.throws(() => normalizeHeadingBlock("Title", "h1"), /heading level/);
});

test("rich text sanitizer keeps supported markup and removes active content", () => {
  const html = sanitizeRichText(
    '<h2>Safe heading</h2><table><tr><td>Cell</td></tr></table><script>alert(1)</script><a href="javascript:alert(1)">bad</a><iframe src="https://evil.example"></iframe>'
  );
  assert.match(html, /<h2>Safe heading<\/h2>/);
  assert.match(html, /<table>/);
  assert.doesNotMatch(html, /<script|<iframe|javascript:/i);
});

test("video embeds are restricted to supported YouTube and Vimeo URLs", () => {
  assert.equal(
    safeVideoEmbed("https://youtu.be/abcdefghijk"),
    "https://www.youtube-nocookie.com/embed/abcdefghijk"
  );
  assert.equal(
    safeVideoEmbed("https://vimeo.com/123456"),
    "https://player.vimeo.com/video/123456"
  );
  assert.equal(safeVideoEmbed("https://evil.example/watch?v=abcdefghijk"), null);
  assert.equal(safeVideoEmbed("javascript:alert(1)"), null);
});

test("pagination inputs are bounded and sorting is allowlisted", () => {
  assert.deepEqual(parsePageParameters({ page: "2", limit: "20", sort: "title" }), {
    page: 2,
    limit: 20,
    sort: "title",
  });
  assert.throws(() => parsePageParameters({ limit: "1000" }), /between 1 and 50/);
  assert.throws(() => parsePageParameters({ sort: "publishedAt;drop" }), /Choose newest/);
});
