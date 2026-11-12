type SiteUrlOptions = {
  siteUrl?: string;
  nodeEnv?: string;
  allowLocalSiteUrl?: string;
};

function isLoopback(hostname: string): boolean {
  hostname = hostname.replace(/\.$/, "");
  return hostname === "localhost" || hostname.endsWith(".localhost") ||
    hostname === "[::1]" || /^127\./.test(hostname);
}

/** Validate the metadata origin without silently publishing development URLs. */
export function resolveSiteUrl({ siteUrl, nodeEnv, allowLocalSiteUrl }: SiteUrlOptions): URL {
  const production = nodeEnv === "production";
  if (!siteUrl && production) {
    throw new Error("NEXT_PUBLIC_SITE_URL is required for production builds. Set the public HTTPS origin, or explicitly set a loopback URL with ALLOW_LOCAL_SITE_URL=1 for local verification.");
  }

  let url: URL;
  try {
    url = new URL(siteUrl || "http://localhost:3000");
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) origin, for example https://brucke.example.com.");
  }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials, a path, query or fragment.");
  }

  const local = isLoopback(url.hostname);
  if (production && !(local && allowLocalSiteUrl === "1")) {
    if (local || url.hostname === "0.0.0.0" || url.hostname === "[::]" ||
        url.hostname.endsWith(".local") || !url.hostname.includes(".") || url.protocol !== "https:") {
      throw new Error("NEXT_PUBLIC_SITE_URL must be a public HTTPS origin in production. Local verification requires an explicit loopback URL and ALLOW_LOCAL_SITE_URL=1.");
    }
  }
  return new URL(url.origin);
}

export function getSiteUrl(): URL {
  return resolveSiteUrl({
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    nodeEnv: process.env.NODE_ENV,
    allowLocalSiteUrl: process.env.ALLOW_LOCAL_SITE_URL,
  });
}
