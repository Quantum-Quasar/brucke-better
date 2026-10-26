import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

// Content version for /data/* URLs: a hash of the exported JSON, so every
// content change yields new URLs and the files can be cached as immutable.
function contentVersion() {
  const hash = createHash("sha1");
  const walk = (dir) => {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir).sort()) {
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else {
        hash.update(full);
        hash.update(readFileSync(full));
      }
    }
  };
  walk(path.join(process.cwd(), "public", "data"));
  return hash.digest("hex").slice(0, 12);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_CONTENT_VERSION: contentVersion() },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "microphone=(), camera=(), geolocation=()",
          },
        ],
      },
      {
        source: "/sounds/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/webfonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Client requests carry ?v=<content hash> (see content-client.ts), so
        // the URL changes whenever the data does and can be cached forever.
        source: "/data/:path*",
        has: [{ type: "query", key: "v" }],
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Unversioned fallback (e.g. a stale client): revalidate hourly.
        source: "/data/:path*",
        missing: [{ type: "query", key: "v" }],
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
