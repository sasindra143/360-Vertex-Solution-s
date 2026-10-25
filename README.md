# 360-Vertex-Solution-s

Website and API for 360 Vertex Solutions.

## Project structure

- `Frontend/` — React and Vite website.
- `Backend/vertex-auth-backend/` — Express API for admin authentication and site content.

## Run locally

1. Configure the backend environment by copying `Backend/vertex-auth-backend/.env.example` to `.env` in that directory and supplying the required values. Do not commit `.env`.
2. In `Backend/vertex-auth-backend`, run `npm install` and `npm start`. The API listens on port `3001` by default.
3. In `Frontend`, run `npm install` and `npm run dev`. Vite proxies `/api` requests to the local API.

The backend health endpoint is available at `/api/health`. The frontend development server normally runs at `http://localhost:5173`.
