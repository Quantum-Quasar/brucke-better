"use client";

import { useEffect, useState } from "react";

export function LocalDataControls() {
  const [status, setStatus] = useState("Checking browser storage protection…");
  const [canRequest, setCanRequest] = useState(false);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    let current = true;
    if (!navigator.storage?.persisted || !navigator.storage?.persist) {
      setStatus("This browser does not offer persistent-storage protection. Keep a JSON backup.");
      return;
    }
    void navigator.storage.persisted().then((persisted) => {
      if (!current) return;
      setStatus(persisted ? "Persistent storage is enabled." : "Storage can be evicted when this device runs low on space.");
      setCanRequest(!persisted);
    }).catch(() => { if (current) setStatus("Could not check storage protection. Keep a JSON backup."); });
    return () => { current = false; };
  }, []);

  const requestProtection = async () => {
    setRequesting(true);
    try {
      const granted = await navigator.storage.persist();
      setStatus(granted ? "Persistent storage is enabled." : "The browser did not grant protection. Keep downloading backups.");
      setCanRequest(!granted);
    } catch {
      setStatus("This browser could not enable storage protection. Keep a JSON backup.");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="space-y-3 rounded-lg border border-[var(--sub-color)]/25 bg-[var(--sub-alt-color)] p-4 text-xs font-mono text-[var(--sub-color)]">
      <h3 className="font-bold text-[var(--text-color)]">offline app & progress safety</h3>
      <p>Install Brücke using your browser’s Install app or Add to Home Screen menu. In production over HTTPS, recently visited pages, lesson segments and exercises are cached as you use them—not the whole course. Open each segment online before relying on it offline. Browser-native pronunciation depends on your device’s installed voices.</p>
      <p role="status">{status}</p>
      {canRequest && <button type="button" disabled={requesting} onClick={() => void requestProtection()} className="rounded border border-[var(--main-color)]/40 px-3 py-2 text-[var(--main-color)] cursor-pointer disabled:opacity-50">{requesting ? "requesting protection…" : "protect storage from automatic eviction"}</button>}
      <p>Protection reduces automatic eviction; it does not prevent manual deletion, private-mode cleanup, or device loss. JSON backups are your recovery copy. There are no accounts or automatic cross-device sync.</p>
    </div>
  );
}
