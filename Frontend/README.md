# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Career job updates

The public, admin-managed job board is available at `/career-jobs`; job detail pages use `/career-jobs/:slug`. It does not import or invent vacancies: visitors see only records that an administrator has published after checking the official source.

Start the frontend with `npm run dev` from `Frontend` and the existing API with `npm start` from `Backend/vertex-auth-backend`. Sign in with the existing admin account and open `/admin/jobs` to create or edit a listing. Save as a draft to keep it private. Publishing or marking a listing closed requires the official application URL, official source URL, and a last-verified date. A deadline within seven days is automatically shown as “Closing soon”; expired open listings are shown as closed and no longer offer an Apply button.

Job data uses the existing `MONGODB_URI` and the existing `vertex_notes` database, in a separate `jobs` collection that MongoDB creates when the first listing is saved. No additional database or package is required. Set `PUBLIC_SITE_URL` in the backend environment to the deployed site's HTTPS origin when it differs from `https://www.360vertexsolutions.com`. The dynamic published-jobs sitemap is served at `/api/jobs/sitemap.xml`; the deployment must route `/api` to the backend for the sitemap index in `public/sitemap.xml` to reach it. If the API uses a separate public host, update that sitemap-index URL to the deployed API host.

Backend validation and admin authorization tests run with `npm test` from `Backend/vertex-auth-backend`. The frontend production build is checked with `npm run build` from `Frontend`.

## AI prompts library

The public prompt library is available at `/prompts`, with public prompt detail pages at `/prompts/:promptId`. Search includes prompt IDs, titles, descriptions, prompt text, categories, tags, and supported AI tools. Only published prompts are returned publicly.

Use the existing admin sign-in, then open `/admin/prompts`. Add a category under **Categories** before creating the first prompt. **Add New Prompt** supports drafts, publishing, featured prompts, tags, supported tools, and image uploads. The backend generates IDs such as `VTX-PMT-000001`; IDs cannot be supplied or changed by the client. Uploaded cover and example images use the existing MongoDB connection and GridFS storage. Each file is limited to 10 MB and checked against its image signature. Duplicating a prompt creates a new draft and a new ID. Prompt deletion also removes its stored images.

Prompt records use the existing `MONGODB_URI` and `vertex_notes` database in separate `ai_prompts`, `ai_prompt_categories`, and `ai_prompt_counters` collections; GridFS files use the `vertexPromptFiles` bucket. No additional environment variable, package, database, or authentication system is required. MongoDB must permit collection/index creation by the configured application user.

The admin form can enable the image-generation flag, but no image-generation provider is currently configured. Visitors therefore receive a clear unavailable note instead of a nonfunctional generation button. The **Generated Images** admin section lists uploaded cover and example images; it does not claim those assets were generated automatically.
