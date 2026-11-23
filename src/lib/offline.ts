import { dataUrl } from "@/lib/content-client";

let registration: Promise<ServiceWorkerRegistration> | undefined;

export const OFFLINE_COURSES_CACHE = "brucke-offline-courses";
export const SHARED_COURSE_CACHE = OFFLINE_COURSES_CACHE;

export function registerOfflineSupport() {
  if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return null;
  registration ??= navigator.serviceWorker.register(
    `/sw.js?v=${process.env.NEXT_PUBLIC_APP_VERSION}`,
    { scope: "/", updateViaCache: "none" }
  ).catch((error: unknown) => {
    registration = undefined;
    throw error;
  });
  return registration;
}

export async function cacheCurrentVisit() {
  const registered = registerOfflineSupport();
  if (!registered) return;
  await registered;
  const ready = await navigator.serviceWorker.ready;
  const urls = [
    `${location.origin}${location.pathname}`,
    ...performance.getEntriesByType("resource").map((entry) => entry.name),
  ];
  ready.active?.postMessage({ type: "CACHE_VISIT", urls });
}

export interface OfflineCourseProgress {
  done: number;
  total: number;
  failed: number;
}

/**
 * Download and cache the entire active language course (index, compendium,
 * word details, and all lesson JSON payloads) into a dedicated non-evicted
 * cache using versioned dataUrl() paths so the course remains usable offline.
 */
export async function downloadCourseForOffline(
  languageId: string,
  onProgress?: (progress: OfflineCourseProgress) => void
): Promise<OfflineCourseProgress> {
  if (typeof window === "undefined" || !("caches" in window)) {
    throw new Error("Offline Cache API is not available in this browser.");
  }

  const baseUrls = [
    dataUrl(languageId, "lesson-index.json"),
    dataUrl(languageId, "compendium.json"),
    dataUrl(languageId, "word-details.json"),
  ];

  const indexRes = await fetch(baseUrls[0], { cache: "no-cache" });
  if (!indexRes.ok) {
    throw new Error(`Could not load ${languageId} lesson index (${indexRes.status}).`);
  }
  const indexData = (await indexRes.clone().json()) as Array<{ id: number }>;
  const lessonUrls = Array.isArray(indexData)
    ? indexData
        .filter((entry) => typeof entry?.id === "number")
        .map((entry) => dataUrl(languageId, `lessons/${entry.id}.json`))
    : [];

  const allUrls = [...baseUrls, ...lessonUrls];
  const cache = await window.caches.open(OFFLINE_COURSES_CACHE);
  await cache.put(baseUrls[0], indexRes);

  let done = 1;
  let failed = 0;
  const total = allUrls.length;
  onProgress?.({ done, total, failed });

  const remaining = allUrls.slice(1);
  const BATCH_SIZE = 8;
  for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
    const batch = remaining.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (url) => {
        try {
          const res = await fetch(url);
          if (res.ok) {
            await cache.put(url, res);
          } else {
            failed += 1;
          }
        } catch {
          failed += 1;
        } finally {
          done += 1;
          onProgress?.({ done, total, failed });
        }
      })
    );
  }

  return { done, total, failed };
}
