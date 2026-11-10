/* Cache only requested content; never download a course in the background. */
const version = new URL(self.location.href).searchParams.get("v") || "1";
const prefix = "brucke-offline-";
const cacheName = `${prefix}${version}`;
const routes = new Set(["/", "/atlas", "/panorama", "/review", "/settings", "/about"]);
const limit = 240;

function isAsset(url) {
  return url.origin === self.location.origin && (
    url.pathname.startsWith("/_next/static/") ||
    /^\/data\/(de|fr|es|nl)\/(compendium\.json|lesson-index\.json|lessons\/\d+\.json)$/.test(url.pathname) ||
    url.pathname.startsWith("/webfonts/") ||
    url.pathname.startsWith("/sounds/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname === "/icon.svg"
  );
}

async function remember(request, response) {
  if (!response.ok || response.type === "opaque") return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
  const keys = (await cache.keys()).filter((key) => new URL(key.url).pathname !== "/offline.html");
  for (const key of keys.slice(0, Math.max(0, keys.length - limit))) await cache.delete(key);
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll([
    "/offline.html", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png",
  ])));
  // Do not skipWaiting: an open lesson must keep its own build's chunks.
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(prefix) && key !== cacheName) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  const navigation = request.mode === "navigate" && routes.has(url.pathname);
  const flight = request.headers.get("RSC") === "1" && routes.has(url.pathname);
  const asset = isAsset(url);
  if (!navigation && !flight && !asset) return;

  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const saved = await cache.match(request);
    if (asset && saved) {
      // LRU touch: re-insert the hit at the newest end so frequently opened
      // lessons/assets are not evicted ahead of stale ones under the size cap.
      event.waitUntil(cache.put(request, saved.clone()).catch(() => {}));
      return saved;
    }
    try {
      const response = await fetch(request);
      event.waitUntil(remember(request, response.clone()).catch(() => {}));
      return response;
    } catch (error) {
      if (saved) return saved;
      if (navigation) {
        const fallback = await cache.match("/offline.html");
        if (fallback) return fallback;
      }
      throw error;
    }
  })());
});

// Registration happens after hydration. Preserve the current document and the
// assets already loaded before the worker took control, without fetching lessons.
self.addEventListener("message", (event) => {
  // The update prompt asks the waiting worker to activate; the page then reloads
  // on controllerchange. Activation stays user-driven so an open lesson keeps its
  // own build's chunks until the learner chooses to update.
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }
  if (event.data?.type !== "CACHE_VISIT" || !Array.isArray(event.data.urls)) return;
  event.waitUntil((async () => {
    for (const value of event.data.urls.slice(0, limit)) {
      if (typeof value !== "string") continue;
      let url;
      try { url = new URL(value, self.location.origin); } catch { continue; }
      if (!isAsset(url) && !(url.origin === self.location.origin && routes.has(url.pathname) && !url.search)) continue;
      const request = new Request(url.href);
      const cache = await caches.open(cacheName);
      if (await cache.match(request)) continue;
      try { await remember(request, await fetch(request)); } catch { /* Still usable online when storage is full. */ }
    }
    event.ports[0]?.postMessage({ cached: true });
  })());
});
