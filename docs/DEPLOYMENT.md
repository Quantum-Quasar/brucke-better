# Deployment

Brücke is a static Next.js app (`bun run build` pre-renders every route). The only
runtime configuration is the public site URL used for social metadata.

## Vercel

1. Import the GitHub repository into Vercel.
2. Framework preset: **Next.js**.
3. Install command: `bun install --frozen-lockfile`.
4. Build command: `bun run build`.
5. Set `NEXT_PUBLIC_SITE_URL` to the production origin (for example
   `https://brucke.example.com`). Without it, Open Graph URLs fall back to
   `http://localhost:3000`.
6. Deploy, then run the smoke suite against the deployed URL:

```bash
PLAYWRIGHT_BASE_URL="https://your-deployed-origin.example" \
bunx playwright test tests/e2e/smoke.spec.ts
```

For a local production-build check instead, run
`PLAYWRIGHT_WEB_SERVER="bun run start" bunx playwright test`.
An external `PLAYWRIGHT_BASE_URL` disables local server startup.

## Pre-deploy checks

```bash
bun run test
bun run typecheck
bun run lint
bun run build
bun scripts/audit-word-refs.ts
bun scripts/audit-teasers.ts
bun scripts/audit-wording.ts
bun scripts/audit-vocab-balance.ts --strict
```

The app has no accounts, server database, or cloud TTS. Progress is local to the
browser; deployment is static hosting plus the optional public URL variable.

## Installation, offline cache and backups

Serve over HTTPS for service workers (localhost is allowed for development
verification). Install through the browser's Install app / Add to Home Screen menu.
The worker runs only in production, not `next dev`; `/sw.js` must retain its
no-cache headers. Updates wait for tabs to close or for the learner to choose reload.
Activation retains the previous usable cache; open tabs keep older resources available.
With no open tabs, activation prunes superseded caches while retaining the latest build with a cached application page, not a fallback-only installation.
Cached navigation is used for disconnections and transient HTTP 5xx errors, not legitimate 404s.

Only requested pages, lesson data and chunks are cached, with a 240-entry cap
per build plus a small offline fallback. Visit each lesson segment/exercise online before
relying on it offline. New or evicted content and non-installed TTS voices still
need a connection. The whole course is never downloaded at installation.

Settings → backup offers a persistent-storage request and JSON import/export.
The reminder appears after learning progress exists; download the file to
storage outside the browser. Persistent storage and installation cannot protect
against manual browser-data deletion or device loss; there is no cloud recovery.

Verify the production-only offline and backup scenarios:

```bash
PLAYWRIGHT_WEB_SERVER="bun run start" bunx playwright test tests/e2e/local-first.spec.ts
```
