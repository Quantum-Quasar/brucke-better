import { expect, test } from "@playwright/test";
import { resolveDeploymentUrl } from "../../scripts/resolve-deployment-url";

test.describe("deployed preview/staging smoke", () => {
  test.skip(process.env.PLAYWRIGHT_DEPLOYMENT_SMOKE !== "1", "Runs only against a trusted deployed origin.");
  test.use({ serviceWorkers: "block" });

  for (const path of ["/", "/atlas", "/review", "/settings", "/about"]) {
    test(`${path} serves and hydrates without runtime errors`, async ({ page, context, baseURL }) => {
      const origin = resolveDeploymentUrl(baseURL, process.env.DEPLOYMENT_SMOKE_ORIGINS || "");
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      // Do not follow redirects or load active content from an untrusted origin.
      await context.route("**/*", async (route) => {
        const url = new URL(route.request().url());
        if (url.origin !== origin) await route.abort("blockedbyclient");
        else await route.continue();
      });
      const response = await page.goto(`${origin}${path}`, { waitUntil: "networkidle" });
      expect(response?.status()).toBe(200);
      expect(new URL(page.url()).origin).toBe(origin);
      await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");
      await expect(page).toHaveTitle(/Brücke/);
      await expect(page.locator("main")).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
});
