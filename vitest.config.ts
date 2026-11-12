import { defineConfig, configDefaults } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    // The full-corpus scans (recurrence, search-discovery) walk every lesson in
    // every course; they can exceed the 5s default when 62 workers contend for
    // CPU, so give them headroom.
    testTimeout: 15000,
    // tests/e2e is the Playwright browser suite (`bun run test:e2e`)
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
