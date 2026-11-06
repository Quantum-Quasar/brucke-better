import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

// Keep data URLs stable across code-only changes, but isolate offline caches
// by both content and application code.
function versionOf(paths) {
  const hash = createHash("sha1");
  const walk = (entry) => {
    if (!existsSync(entry)) return;
    if (statSync(entry).isDirectory()) {
      for (const name of readdirSync(entry).sort()) walk(path.join(entry, name));
    } else {
      hash.update(entry);
      hash.update(readFileSync(entry));
    }
  };
  for (const entry of paths) walk(path.join(process.cwd(), entry));
  return hash.digest("hex").slice(0, 12);
}

const dataVersion = versionOf(["public/data"]);
const appVersion = versionOf(["src", "public/data", "public/sw.js", "public/offline.html", "public/icons", "next.config.mjs", "bun.lock"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_CONTENT_VERSION: dataVersion, NEXT_PUBLIC_APP_VERSION: appVersion },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    // Lessons and atlas details are in-page views now. Old deep links land on
    // the parent tab with a query the client restores, then cleans the URL.
    return [
      {
        source: "/trail/:lang/:id",
        destination: "/?lang=:lang&lesson=:id",
        permanent: false,
      },
      {
        source: "/trail/:id",
        destination: "/?lesson=:id",
        permanent: false,
      },
      {
        source: "/trail",
        destination: "/",
        permanent: false,
      },
      {
        source: "/atlas/master",
        destination: "/atlas?master=1",
        permanent: false,
      },
      {
        source: "/atlas/:family",
        destination: "/atlas?family=:family",
        permanent: false,
      },
    ];
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
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
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
