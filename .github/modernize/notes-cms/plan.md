# Notes CMS Implementation Plan

## Scope

Upgrade the existing portfolio notes feature into a MongoDB-backed CMS while retaining its admin cookie authentication, Express/Vite deployment, and existing GridFS uploads. Keep the existing database and files intact; the requested canonical storage is database `vertex_notes`, collection `notes`. Existing legacy notes in the default `test.media_notes` database must be preserved and migrated idempotently if they can be safely mapped.

## Requirements

| ID | Requirement |
| --- | --- |
| REQ-001 | Admin dashboard with note counts, recent activity, and create/edit/delete actions. |
| REQ-002 | Note metadata: title, unique slug, summary, category, tags, cover, SEO fields, and draft/published state. |
| REQ-003 | Rich text with headings, emphasis, lists, links, quotes, code, tables, and horizontal rules; sanitize on the server. |
| REQ-004 | Ordered, editable content blocks for rich text, images/galleries, safe video embeds, downloadable files, and callouts/links. |
| REQ-005 | Image, video, and document resources use persistent file storage, size/type checks, metadata, and downloadable/viewable URLs. |
| REQ-006 | Admin category management with validated, unique category names/slugs. |
| REQ-007 | Admin search, category/tag/status/type filters, sort, and server-side pagination. |
| REQ-008 | Draft save, publish, unpublish, and republish workflow with publication timestamps. |
| REQ-009 | Public listing/detail pages expose only published notes and render the saved content and resources. |
| REQ-010 | Public search, category/tag filtering, sorting, and pagination. |
| REQ-011 | Canonical data is in `vertex_notes.notes`; category records use a separate collection; indexes support lookups. |
| REQ-012 | REST API validates input, returns consistent errors, and provides admin and public operations. |
| REQ-013 | All writes and admin reads require the existing admin session; drafts and unpublished media are not public. |
| REQ-014 | Preserve existing data and upload references during transition; do not drop or overwrite collections. |
| REQ-015 | Responsive, accessible admin dashboard/editor and public note pages integrated with current routes/styles. |
| REQ-016 | Verify build, lint, API validation, upload handling, persistence, and draft/public isolation. |

## Architecture and decisions

- Keep the existing Express/Mongoose backend, admin session cookie, and Vite `/api` proxy.
- Resolve the configured MongoDB URI to the explicit `vertex_notes` database using a named Mongoose database connection; the URI currently has no database path.
- Use `notes` and `categories` collections in `vertex_notes`; store file bytes in GridFS, never in note documents.
- Keep the previous `test.media_notes` collection and bucket non-destructively. Check/migrate legacy records and copy their referenced uploads only when valid; make migration repeat-safe.
- Use a server-sanitized HTML field for rich text and a strict allowlist for embed hosts. Generate embed URLs from validated provider/video identifiers rather than accepting arbitrary iframe HTML.
- Preserve current admin and student routes, adding editor/detail routes under those route groups.
- Do not commit secrets or print connection strings.

## Implementation stages

### Stage 1 — Storage, compatibility, and API foundation

1. Confirm current route/auth/upload contracts and the database/legacy data locations.
2. Add the CMS note/category schemas, indexes, explicit database selection, and idempotent category/legacy-data handling.
3. Implement validated GridFS media uploads/downloads, sanitization, admin CRUD/workflow/category/dashboard APIs, and published-only public APIs.
4. Add focused backend tests for validation, authorization, query filters, and publication isolation.

### Stage 2 — Admin dashboard and authoring

1. Replace the simple upload form with a dashboard supporting counts, status filters, search, categories, sorting, and pagination.
2. Add a dedicated note editor for metadata, categories/tags, status, safe rich text, ordered blocks, and media previews.
3. Wire create/update/publish/unpublish/delete and category-management controls to the authenticated API.
4. Keep file selection/reordering usable on mobile and expose clear save/error states.

### Stage 3 — Public notes experience

1. Build a published-only list with search/category/tag filters, sorting, and pagination.
2. Build slug-based detail pages that render sanitized rich text and ordered blocks, safe video embeds, cover images, and downloadable resources.
3. Update share links and page metadata without revealing drafts or admin-only fields.

### Stage 4 — Validation and handoff

1. Verify database targeting and legacy preservation using metadata/count checks; confirm note content and file bytes persist after restart.
2. Verify anonymous requests cannot access admin APIs, drafts, or unpublished files.
3. Run focused backend tests, frontend lint on changed files, and the production build.
4. Fix issues caused by the change and document any existing, unrelated failures separately.

## Tasks and requirement traceability

| Task | Work | Requirements |
| --- | --- | --- |
| T-001 | Confirm current routes, auth, Mongo database name, collection counts, and legacy upload shape. | REQ-011, REQ-013, REQ-014 |
| T-002 | Add/verify editor, sanitizer, and backend test dependencies. | REQ-003, REQ-016 |
| T-003 | Implement database selection, CMS schemas, indexes, and non-destructive legacy/category initialization. | REQ-002, REQ-006, REQ-011, REQ-014 |
| T-004 | Implement safe GridFS file ingestion, streaming, metadata, and ownership checks. | REQ-005, REQ-012, REQ-013, REQ-014 |
| T-005 | Implement admin note/category/dashboard APIs and public published-only search/detail APIs. | REQ-001, REQ-006, REQ-007, REQ-008, REQ-009, REQ-010, REQ-012, REQ-013 |
| T-006 | Implement admin dashboard, table filters, pagination, and category controls. | REQ-001, REQ-006, REQ-007, REQ-015 |
| T-007 | Implement metadata editor, rich text, ordered blocks, media selection, and workflow actions. | REQ-002, REQ-003, REQ-004, REQ-005, REQ-008, REQ-015 |
| T-008 | Implement public listing, detail, safe block rendering, and share/SEO behavior. | REQ-009, REQ-010, REQ-015 |
| T-009 | Verify persistence, permissions, search/filter behavior, uploads, build, lint, and tests. | REQ-005, REQ-007, REQ-008, REQ-009, REQ-012, REQ-013, REQ-014, REQ-016 |

## Acceptance checks

- The application connects to `vertex_notes` explicitly and saves CMS notes in `vertex_notes.notes`.
- An unauthenticated client receives 401 for every admin read/write; a draft slug is indistinguishable from an unavailable public note.
- Create, edit, preview, save-draft, publish, unpublish, republish, and delete work; only publish makes a note public.
- Public/admin list queries support validated search/filter/sort/page parameters with accurate totals.
- Image/document uploads are signature-checked, bounded, stored in GridFS, and served only when referenced by a published note publicly or by an authenticated admin.
- Rich text is sanitized server-side and external embeds are restricted to supported safe providers.
- Old collections and source files remain untouched; any imported legacy data can be safely reprocessed without duplicate notes.
- Frontend production build and focused lint/tests pass.

## Risks and mitigations

- The URI has no database pathname. Explicitly select `vertex_notes`; verify the effective database name before writes.
- A legacy note exists in `test.media_notes`. Preserve its source and attachment bucket; use an idempotent copy/migration rather than deleting or changing source records.
- MongoDB/GridFS must be reachable for persistence checks. If unavailable, keep local build/tests running and report the blocked remote verification clearly.
- The repository has unrelated pre-existing lint warnings/errors; run targeted checks and do not modify unrelated files.
