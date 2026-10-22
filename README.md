# Ankit Trading Company

A separate Vite/React website and Express/SQLite inquiry API. Built in the existing frontend and backend folders. JavaScript/JSX only.

## Local development

Requires Node.js 22.19 or later in the Node 22 line (or current supported LTS). Dependencies are already installed in this workspace. On a fresh checkout run `npm ci` in each folder.

Terminal 1:

```powershell
cd backend
Copy-Item .env.example .env
npm run dev
```

Terminal 2:

```powershell
cd frontend
Copy-Item .env.example .env
npm run dev
```

Open http://127.0.0.1:5173. Vite forwards `/api` to http://127.0.0.1:4000. The frontend environment variable is embedded at build time; rebuild after changing it. No SMTP configuration is needed to save inquiries.

## Build and verification

```powershell
cd frontend
npm run build
# Optional source lint:
npm run lint
```

```powershell
cd backend
npm test
npm start
```

API tests use temporary in-memory databases and ephemeral HTTP servers. They cover health, persistence, invalid input, honeypot protection, private records, malformed JSON, origin restrictions, request limits, rate limiting and SMTP failure. They require local loopback networking.

## Configuration and content

- Business identity, phone, WhatsApp, GSTIN and address: `frontend/src/config/business.js`.
- Material descriptions, examples and image names: `frontend/src/data/materials.js`.
- Design tokens, responsive layouts and motion preference styles: `frontend/src/index.css`.
- API client: `frontend/src/services/api.js`.
- Backend settings: `backend/.env.example`.
- Photo sources and licensing: `IMAGE_CREDITS.md`.

The two mentioned visual references were not present in the chat. The design follows the written direction. Photos represent materials and industrial settings; they are not photographs of this business or its premises. No business history, prices, collection promises or achievements have been invented.

## API contract

`GET /api/health`: 200 when the database responds, otherwise 503.

`POST /api/inquiries`: JSON with `name`, `phone`, optional `email`, `material`, optional `quantity`, `location`, `message`, and an empty `website` honeypot. Material is one of `iron-scrap`, `plastic-scrap`, `waste-paper`, `cardboard`, `glass-bottles`, `other`. Phone accepts a valid Indian mobile number, optionally prefixed by +91. Name/location must contain at least 2 characters; message at least 10. Maximum lengths are enforced on the server. Unknown fields are rejected.

Returns 201 with a saved-inquiry confirmation and reference, 422 for validation, 400 for spam or malformed JSON, 403 for unapproved origins, 413 for requests above 16 KB, 415 for non-JSON, 429 after 5 requests per 15 minutes per IP, and 503 if saving fails. There is no public endpoint for viewing inquiries.

SQLite is stored at `backend/data/inquiries.sqlite` by default, using WAL mode and parameterized statements. A custom DB_PATH is relative to the server's working directory. Never put the database in the frontend public directory or expose it from a static server. Back it up with SQLite-aware tooling. Access stored inquiries only through trusted server administration. Keep only data needed for responding and establish an appropriate retention policy.

Optional SMTP notifications happen after the durable save. Missing credentials or SMTP failure never turn a saved inquiry into a failed submission. Notification status is stored as not_configured, pending, sent or failed. Automatic retries and an admin inbox are not included; pending or failed notifications should be monitored by an operator. The browser never claims an email was sent.

## Deployment

1. Build the frontend and serve `frontend/dist` over HTTPS. Configure an SPA fallback to index.html for `/about`, `/contact`, `/materials/*` and other frontend routes. Asset files should return real 404 responses when missing.
2. Run `backend/src/server.js` as a long-running Node service with a process manager and persistent writable SQLite storage. Do not deploy the SQLite API to an ephemeral serverless filesystem.
3. Prefer same-origin `/api` reverse proxying to the backend; do not rewrite API paths to index.html. Alternatively set VITE_API_URL to the absolute HTTPS API URL and rebuild.
4. Set CORS_ORIGINS to the exact public frontend origin(s), without a trailing slash. CORS is an origin control, not authentication; the inquiry route is intentionally public and rate limited.
5. Leave HOST=127.0.0.1 behind a local reverse proxy. Set HOST=0.0.0.0 only if needed by your host. Set TRUST_PROXY_HOPS only to the actual trusted reverse-proxy hop count. TLS should terminate at the reverse proxy.
6. Set optional SMTP values and test them with your provider. Keep .env and SQLite files private and backed up. Never place secrets in VITE_ variables.
7. After selecting the final domain, make og:image an absolute HTTPS URL in frontend/index.html, and add domain-specific canonical links, sitemap and robots.txt. They are intentionally not populated with an invented domain.

Typography uses Google Fonts (Space Grotesk and Inter) with local system fallbacks. Material photos are stored locally at 900px and 1800px widths with responsive srcset. Framer Motion respects reduced motion, and CSS removes smooth scrolling and decorative transitions when requested.

## Browser verification (2026-10-22)

Tested the home, about, gallery, five material detail routes, contact and branded 404 in the available Chromium browser at 320, 375, 425, 768, 1024, 1440 and 1920 CSS pixels. No horizontal overflow or offscreen headings, CTA buttons or form fields were detected. Visually inspected desktop/mobile home and contact views, mobile menu open/close/navigation, validation, and a successful frontend-to-SQLite submission. Console showed no warnings/errors in that flow.

Production build and backend integration tests pass. Real SMTP delivery, a deployed HTTPS domain, actual WhatsApp message delivery, real phones/safe-area hardware, Safari and Firefox have not been verified. WhatsApp opens a prefilled draft; the visitor must send it. One clearly labeled Website QA Test inquiry was saved in the local development database for end-to-end verification.
