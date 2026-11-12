import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolveSiteUrl } from "../src/lib/site-url";

/** Only exact, repository-configured origins may receive deployment smoke traffic. */
export function resolveDeploymentUrl(rawUrl: unknown, allowedOrigins: string): string {
  if (typeof rawUrl !== "string" || !rawUrl) {
    throw new Error("The successful deployment must provide deployment_status.environment_url.");
  }
  const origins = allowedOrigins.split(/[\s,]+/).filter(Boolean);
  if (!origins.length) {
    throw new Error("Set the DEPLOYMENT_SMOKE_ORIGINS repository variable to the exact trusted HTTPS preview/staging origins (comma or newline separated).");
  }
  const candidate = resolveSiteUrl({ siteUrl: rawUrl, nodeEnv: "production" });
  const trusted = origins.map((siteUrl) => resolveSiteUrl({ siteUrl, nodeEnv: "production" }).origin);
  if (!trusted.includes(candidate.origin)) {
    throw new Error(`Deployment origin ${candidate.origin} is not in DEPLOYMENT_SMOKE_ORIGINS. Wildcard and suffix matching are deliberately unsupported.`);
  }
  return candidate.origin;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const eventPath = process.env.GITHUB_EVENT_PATH;
    if (!eventPath) throw new Error("GITHUB_EVENT_PATH is required to validate a deployment event.");
    const event = JSON.parse(readFileSync(eventPath, "utf8"));
    console.log(resolveDeploymentUrl(event.deployment_status?.environment_url, process.env.DEPLOYMENT_SMOKE_ORIGINS || ""));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
