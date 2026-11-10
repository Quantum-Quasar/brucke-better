import fs from "fs";
import { defineConfig } from "@playwright/test";

// Browser smoke suite. Runs the app in dev mode against a dedicated port so
// it never collides with a manually started dev server on :3000.
// Browser: Playwright's bundled Chromium when installed (bunx playwright
// install chromium), otherwise the system Chromium (/usr/sbin/chromium on
// Arch). Override either with CHROMIUM_PATH.

const PORT = Number(process.env.PLAYWRIGHT_PORT || 3111);
const EXTERNAL_BASE_URL = process.env.PLAYWRIGHT_BASE_URL;
// CI runs the suite against the production server (`bun run start`) so the
// prerendered SSG output is what gets tested; local runs default to dev.
const WEB_SERVER_COMMAND = process.env.PLAYWRIGHT_WEB_SERVER || "bun run dev";
const SYSTEM_CHROMIUM = "/usr/sbin/chromium";
const executablePath = process.env.CHROMIUM_PATH ?? (fs.existsSync(SYSTEM_CHROMIUM) ? SYSTEM_CHROMIUM : undefined);

export default defineConfig({
  testDir: "./tests/e2e",
  // A cold Next dev compile of a route can take well over a minute on a busy
  // machine, and the first goto in a run pays for it. Keep the budget generous
  // but bounded so a genuinely hung page still fails.
  timeout: 150_000,
  expect: { timeout: 15_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: EXTERNAL_BASE_URL || `http://localhost:${PORT}`,
    headless: true,
    screenshot: "only-on-failure",
    navigationTimeout: 120_000,
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  webServer: EXTERNAL_BASE_URL ? undefined : {
    command: WEB_SERVER_COMMAND,
    port: PORT,
    // Next.js dev server binds process.env.PORT
    env: { ...process.env, PORT: String(PORT) },
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
