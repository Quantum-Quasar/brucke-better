/* Cache requested content and explicit offline course downloads; never download a course in the background. */
const version = new URL(self.location.href).searchParams.get("v") || "1";
const shellPrefix = "brucke-offline-";
const mediaPrefix = "brucke-media-";
const shellCacheName = `${shellPrefix}${version}`;
const mediaCacheName = `${mediaPrefix}shared`;
const offlineCoursesCacheName = "brucke-offline-courses";
const routes = new Set([
  "/",
  "/atlas",
  "/panorama",
  "/review",
  "/settings",
  "/about",
  "/read",
  "/practice",
  "/cando",
  "/mistakes",
  "/exp-ui",
  "/exp-ui/review",
  "/exp-ui/words",
  "/exp-ui/settings",
  "/exp-ui2",
  "/exp-ui2/review",
  "/exp-ui2/words",
  "/exp-ui2/settings",
  "/exp-ui3",
  "/exp-ui3/review",
  "/exp-ui3/words",
  "/exp-ui3/settings",
  "/exp-ui4",
  "/exp-ui4/review",
  "/exp-ui4/words",
  "/exp-ui4/settings",
]);
const shellLimit = 120;
const mediaLimit = 200;

function isCanonicalLessonRoute(pathname) {
  return /^\/trail\/(de|fr|es|nl)\/\d+\/?$/.test(pathname);
}

function isHandledRoute(pathname) {
  return routes.has(pathname) || isCanonicalLessonRoute(pathname);
}

function isMediaAsset(url) {
  return url.origin === self.location.origin && (
    /^\/data\/(de|fr|es|nl)\/(compendium\.json|lesson-index\.json|word-details\.json|lessons\/\d+\.json)$/.test(url.pathname) ||
    url.pathname.startsWith("/webfonts/") ||
    (url.pathname.startsWith("/exp-ui/") || url.pathname.startsWith("/exp-ui2/") || url.pathname.startsWith("/exp-ui3/")) && url.pathname.endsWith(".woff2") ||
    url.pathname.startsWith("/sounds/")
  );
}

function isShellAsset(url) {
  return url.origin === self.location.origin && (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname === "/icon.svg"
  );
}

function isAsset(url) {
  return isShellAsset(url) || isMediaAsset(url);
}

function targetCacheFor(url) {
  return isMediaAsset(url)
    ? { name: mediaCacheName, limit: mediaLimit, prefix: mediaPrefix }
    : { name: shellCacheName, limit: shellLimit, prefix: shellPrefix };
}

async function remember(request, response) {
  if (!response.ok || response.type === "opaque") return;
  const url = new URL(request.url);
  const { name, limit } = targetCacheFor(url);
  const cache = await caches.open(name);
  await cache.put(request, response);
  const keys = (await cache.keys()).filter((key) => new URL(key.url).pathname !== "/offline.html");
  for (const key of keys.slice(0, Math.max(0, keys.length - limit))) await cache.delete(key);
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(shellCacheName).then((cache) => cache.addAll([
    "/offline.html", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png",
  ])));
  // Do not skipWaiting: an open lesson must keep its own build's chunks.
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const allKeys = await caches.keys();
    const previousShells = allKeys.filter(
      (key) => key.startsWith(shellPrefix) && key !== shellCacheName && key !== offlineCoursesCacheName
    );
    const previousMedia = allKeys.filter((key) => key.startsWith(mediaPrefix) && key !== mediaCacheName);
    // Keep the last usable build (shell + paired media); open tabs may still need older chunks.
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    if (clients.length === 0) {
      let usableVersion = null;
      for (const key of [...previousShells].reverse()) {
        const requests = await (await caches.open(key)).keys();
        if (requests.some((request) => {
          const url = new URL(request.url);
          return routes.has(url.pathname) && !url.search && request.headers.get("RSC") !== "1";
        })) {
          usableVersion = key.slice(shellPrefix.length);
          break;
        }
      }
      const keepShell = usableVersion ? `${shellPrefix}${usableVersion}` : null;
      const keepMedia = mediaCacheName;
      for (const key of previousShells) {
        if (key !== keepShell) await caches.delete(key);
      }
      for (const key of previousMedia) {
        if (key !== keepMedia) await caches.delete(key);
      }
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  const navigation = request.mode === "navigate" && isHandledRoute(url.pathname);
  const flight = request.headers.get("RSC") === "1" && isHandledRoute(url.pathname);
  const asset = isAsset(url);
  if (!navigation && !flight && !asset) return;

  event.respondWith((async () => {
    const { name: targetName, prefix: targetPrefix } = targetCacheFor(url);
    const cache = await caches.open(targetName);
    // An in-page lesson open rewrites the URL (/?lesson=1&lang=de) without a
    // document request, so only the bare route shell ("/") is in the cache.
    // A reload of that URL is still a navigation to the same JS app; match the
    // shell by path (exact URL first) instead of missing and showing the
    // "not saved offline" page. Never do this for RSC/asset requests: their
    // query is meaningful (?v= content version).
    const shellUrl = navigation ? new URL(url.pathname, url.origin).href : null;
    const current = await cache.match(request) ?? (shellUrl ? await cache.match(shellUrl) : undefined);
    let saved = current;
    let fromOfflineCourse = false;
    if (!saved && isMediaAsset(url)) {
      const courseCache = await caches.open(offlineCoursesCacheName);
      saved = await courseCache.match(request);
      if (saved) fromOfflineCourse = true;
    }
    if (!saved) {
      const allKeys = await caches.keys();
      const previous = allKeys.filter(
        (key) => key.startsWith(targetPrefix) && key !== targetName && key !== offlineCoursesCacheName
      ).reverse();
      // For media assets, also check pre-split shell caches as a fallback during upgrades.
      const fallbackKeys = targetPrefix === mediaPrefix
        ? [
            ...previous,
            ...allKeys
              .filter((key) => key.startsWith(shellPrefix) && key !== shellCacheName && key !== offlineCoursesCacheName)
              .reverse(),
          ]
        : previous;
      for (const key of fallbackKeys) {
        saved = await (await caches.open(key)).match(request);
        if (!saved && shellUrl) saved = await (await caches.open(key)).match(shellUrl);
        if (saved) break;
      }
    }
    if (asset && saved) {
      // Only promote into current cache if served from a previous build cache
      // (avoids redundant disk write + full cache.keys() scan on every warm hit
      // and avoids copying dedicated offline-course entries into the 200-item media cache).
      if (!current && !fromOfflineCourse) {
        event.waitUntil(remember(request, saved.clone()).catch(() => {}));
      }
      return saved;
    }
    try {
      const response = await fetch(request);
      if (response.status >= 500 && saved) return saved;
      event.waitUntil(remember(request, response.clone()).catch(() => {}));
      return response;
    } catch (error) {
      if (saved) return saved;
      if (navigation) {
        const shellCache = await caches.open(shellCacheName);
        const fallback = await shellCache.match("/offline.html");
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
    for (const value of event.data.urls.slice(0, shellLimit + mediaLimit)) {
      if (typeof value !== "string") continue;
      let url;
      try { url = new URL(value, self.location.origin); } catch { continue; }
      if (!isAsset(url) && !(url.origin === self.location.origin && routes.has(url.pathname) && !url.search)) continue;
      const request = new Request(url.href);
      const { name } = targetCacheFor(url);
      const cache = await caches.open(name);
      if (await cache.match(request)) continue;
      try { await remember(request, await fetch(request)); } catch { /* Still usable online when storage is full. */ }
    }
    event.ports[0]?.postMessage({ cached: true });
  })());
});
