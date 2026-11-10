"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cacheCurrentVisit, registerOfflineSupport } from "@/lib/offline";

export function OfflineSupport() {
  const pathname = usePathname();
  const [offline, setOffline] = useState(false);
  const [cacheFailed, setCacheFailed] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    let current = true;
    void cacheCurrentVisit().catch(() => { if (current) setCacheFailed(true); });
    return () => { current = false; };
  }, [pathname]);

  // Surface a waiting service worker (a new build) so the learner can choose when
  // to reload into it, instead of silently running a stale app shell forever.
  useEffect(() => {
    let current = true;
    const registered = registerOfflineSupport();
    if (!registered) return;
    const watch = (worker: ServiceWorker | null) => {
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        // "installed" alongside a controlling worker means an update is waiting
        // (a first install has no controller yet).
        if (current && worker.state === "installed" && navigator.serviceWorker.controller) {
          setUpdateReady(true);
        }
      });
    };
    registered.then((reg) => {
      if (!current) return;
      if (reg.waiting && navigator.serviceWorker.controller) setUpdateReady(true);
      watch(reg.installing);
      reg.addEventListener("updatefound", () => watch(reg.installing));
    }).catch(() => {});
    return () => { current = false; };
  }, []);

  const applyUpdate = () => {
    navigator.serviceWorker.addEventListener("controllerchange", () => window.location.reload());
    void registerOfflineSupport()?.then((reg) => reg.waiting?.postMessage({ type: "SKIP_WAITING" }));
  };

  if (!offline && !cacheFailed && !updateReady) return null;
  return (
    <div role="status" className="border-b border-[var(--sub-color)]/30 px-4 py-2 text-center text-xs font-mono text-[var(--sub-color)]">
      {updateReady ? (
        <span>
          A new version of Brücke is ready.{" "}
          <button
            type="button"
            onClick={applyUpdate}
            className="font-bold underline underline-offset-2 hover:opacity-80 cursor-pointer"
          >
            reload to update
          </button>
        </span>
      ) : offline ? (
        "Offline — cached pages and lessons are available. Unopened content needs a connection."
      ) : (
        "Offline caching is unavailable in this browser. Learning and JSON backups still work online."
      )}
    </div>
  );
}
