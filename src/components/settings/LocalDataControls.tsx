"use client";

import { useEffect, useState } from "react";
import { Download, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { downloadCourseForOffline, type OfflineCourseProgress } from "@/lib/offline";

export function LocalDataControls() {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const [status, setStatus] = useState("Checking browser storage protection…");
  const [canRequest, setCanRequest] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<OfflineCourseProgress | null>(null);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

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

  const handleDownloadCourse = async () => {
    setDownloading(true);
    setDownloadMessage(null);
    setDownloadProgress({ done: 0, total: 1, failed: 0 });
    try {
      const result = await downloadCourseForOffline(activeLanguageId, (p) => setDownloadProgress(p));
      if (result.failed === 0) {
        setDownloadMessage(`Saved all ${result.total} ${language.name} course files for offline study.`);
      } else {
        setDownloadMessage(`Saved ${result.total - result.failed} of ${result.total} ${language.name} files (${result.failed} skipped).`);
      }
    } catch {
      setDownloadMessage("Could not download course files right now. Check your connection and try again.");
    } finally {
      setDownloading(false);
    }
  };

  const pct = downloadProgress && downloadProgress.total > 0
    ? Math.round((downloadProgress.done / downloadProgress.total) * 100)
    : 0;

  return (
    <div className="space-y-3 rounded-lg border border-[var(--sub-color)]/25 bg-[var(--sub-alt-color)] p-4 text-xs font-mono text-[var(--sub-color)]">
      <h3 className="font-bold text-[var(--text-color)]">offline app & progress safety</h3>
      <p>Install Brücke using your browser’s Install app or Add to Home Screen menu. You can also download all {language.name} course data (lessons, vocabulary, and the Atlas) for offline use. Open any lesson once while online so its interactive interface is cached too.</p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={downloading}
          onClick={() => void handleDownloadCourse()}
          className="inline-flex items-center gap-1.5 rounded bg-[var(--main-color)] px-3 py-2 text-[var(--bg-color)] font-bold cursor-pointer disabled:opacity-60 hover:opacity-90 transition"
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{downloading ? `downloading ${language.name.toLowerCase()}… ${pct}%` : `download ${language.name.toLowerCase()} course for offline`}</span>
        </button>

        {canRequest && (
          <button
            type="button"
            disabled={requesting}
            onClick={() => void requestProtection()}
            className="rounded border border-[var(--main-color)]/40 px-3 py-2 text-[var(--main-color)] cursor-pointer disabled:opacity-50"
          >
            {requesting ? "requesting protection…" : "protect storage from automatic eviction"}
          </button>
        )}
      </div>

      {downloading && downloadProgress && (
        <div className="space-y-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--sub-color)]/20">
            <div className="h-full bg-[var(--main-color)] transition-all duration-150" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[11px]">Cached {downloadProgress.done} / {downloadProgress.total} files…</p>
        </div>
      )}

      {downloadMessage && (
        <p role="status" className="flex items-center gap-1.5 text-[var(--main-color)] font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{downloadMessage}</span>
        </p>
      )}

      <p role="status">{status}</p>
      <p>Protection reduces automatic eviction; it does not prevent manual deletion, private-mode cleanup, or device loss. JSON backups are your recovery copy. There are no accounts or automatic cross-device sync.</p>
    </div>
  );
}
