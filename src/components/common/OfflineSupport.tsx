"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cacheCurrentVisit } from "@/lib/offline";

export function OfflineSupport() {
  const pathname = usePathname();
  const [offline, setOffline] = useState(false);
  const [cacheFailed, setCacheFailed] = useState(false);

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

  if (!offline && !cacheFailed) return null;
  return (
    <div role="status" className="border-b border-[var(--sub-color)]/30 px-4 py-2 text-center text-xs font-mono text-[var(--sub-color)]">
      {offline
        ? "Offline — cached pages and lessons are available. Unopened content needs a connection."
        : "Offline caching is unavailable in this browser. Learning and JSON backups still work online."}
    </div>
  );
}
