let registration: Promise<ServiceWorkerRegistration> | undefined;

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
