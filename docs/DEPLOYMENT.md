# Deployment

Brücke pre-renders its Next.js routes during `bun run build`. Public metadata,
canonical links, sitemap and robots all use `NEXT_PUBLIC_SITE_URL` at build time.

## Vercel

1. Import the GitHub repository into Vercel.
2. Framework preset: **Next.js**.
3. Install command: `bun install --frozen-lockfile`.
4. Build command: `bun run build`.
5. Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin, for example
   `https://brucke.example.com`. Production builds reject missing/invalid values,
   credentials, paths, query strings, fragments, HTTP and localhost origins.
   Set this explicitly for each deployment environment; never publish the local
   verification override described below.
6. Deploy, then optionally run the existing browser suite against the deployed URL:

```bash
bunx playwright install chromium
PLAYWRIGHT_BASE_URL="https://your-deployed-origin.example" \
bunx playwright test tests/e2e/smoke.spec.ts
```

An external `PLAYWRIGHT_BASE_URL` disables local server startup.

## Automatic deployed preview/staging smoke

`.github/workflows/deployment-smoke.yml` runs when GitHub receives a successful
`deployment_status` event. Enable deployment status reporting in your hosting
integration and set the **repository Actions variable** `DEPLOYMENT_SMOKE_ORIGINS`
to the exact trusted HTTPS origins, separated by commas or newlines, for example:

```text
https://preview.brucke.example.com
https://staging.brucke.example.com
```

Use your real domains.
Prefer stable preview/staging aliases and configure the integration's
`deployment_status.environment_url` to report that alias. If a provider emits a
unique deployment origin, add that exact origin before its success event.
There is intentionally no `*.vercel.app` wildcard or hostname-suffix trust:
missing configuration, foreign origins, local URLs and non-origin URLs fail closed.
The URL is read from event JSON, not expanded into shell source; redirects and
browser requests to other origins are blocked.

The workflow checks out **only trusted default-branch tooling**, never a PR's ref
or deployment SHA, uses a read-only token without persisted checkout credentials,
and supplies no secrets or authentication/protection-bypass tokens. Thus a
fork-PR preview cannot execute its repository scripts in the job. The deployed
site must be publicly reachable; protection/login redirects fail the smoke check
rather than receiving credentials. Smoke coverage checks key routes, successful
responses, client hydration and uncaught runtime errors.

## Explicit local production verification

Development (`bun run dev`) may use localhost by default. Production builds must
not silently do so. To test a local production server deliberately:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3111 ALLOW_LOCAL_SITE_URL=1 bun run build
NEXT_PUBLIC_SITE_URL=http://localhost:3111 ALLOW_LOCAL_SITE_URL=1 \
PLAYWRIGHT_WEB_SERVER="bun run start" PLAYWRIGHT_PRODUCTION=1 bun run test:e2e
```

`ALLOW_LOCAL_SITE_URL=1` permits only an explicitly configured loopback origin
(`localhost`, `127.x.x.x` or `::1`), not arbitrary HTTP hosts or missing values.
Alternatively build with the real public HTTPS site URL and test the server
locally without any override; metadata will correctly retain the public origin.
CI uses an explicit public URL for both production-build jobs.

## Pre-deploy checks

```bash
bun run test
bun run typecheck
bun run lint
NEXT_PUBLIC_SITE_URL=https://your-public-origin.example bun run build
bun scripts/audit-word-refs.ts
bun scripts/audit-teasers.ts
bun scripts/audit-wording.ts
bun scripts/audit-vocab-balance.ts --strict
```

On a fresh checkout, `bun run test` generates required client data automatically.
Before invoking Vitest directly, run `bun run export-data`; builds and development
also generate these ignored outputs. No network fetch is needed for generation.

The app has no accounts, server database, or cloud TTS. Progress is local to the
browser; deployment is hosting plus the required production public URL.

## Portable demo captures

Start the app, install Chromium once, then capture:

```bash
bunx playwright install chromium
DEMO_BASE_URL=http://localhost:3000 bun scripts/capture-demo-images.ts
```

`DEMO_BASE_URL` accepts an HTTP(S) origin (defaults to `PLAYWRIGHT_BASE_URL`, then
`http://localhost:3000`). `DEMO_OUTPUT_DIR` selects the output directory (default
`./demo-images`). Playwright's bundled Chromium is used by default; optionally
set `CHROMIUM_PATH` to an existing browser executable. Invalid configuration,
missing browsers, connection failures and capture errors exit nonzero with
actionable diagnostics.

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
