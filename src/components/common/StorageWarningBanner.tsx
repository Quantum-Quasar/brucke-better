"use client";

import Link from "next/link";
import { Download, TriangleAlert } from "lucide-react";
import {
  dismissStorageCorruption,
  getQuarantinedStoragePayload,
  useStorageHealth,
} from "@/lib/storage-health";

/**
 * localStorage writes fail silently in private modes and when the quota is
 * full, and corrupt JSON can otherwise look like an empty profile. Surface
 * both states clearly and offer an immediate backup download.
 */
export function StorageWarningBanner() {
  const health = useStorageHealth();
  if (health === "ok") return null;

  if (health === "corrupt") {
    const handleDownloadRaw = () => {
      const payload = getQuarantinedStoragePayload();
      if (!payload || typeof document === "undefined") return;
      const blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "brucke-quarantined-storage.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    };

    return (
      <div
        role="alert"
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 border-b border-[var(--error-color)]/40 bg-[var(--error-color)]/10 px-4 py-2 font-mono text-[11px] text-[var(--error-color)]"
      >
        <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>saved browser data looked damaged and was quarantined before resetting.</span>
        <button
          type="button"
          onClick={handleDownloadRaw}
          className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:opacity-80 cursor-pointer"
        >
          <Download className="h-3 w-3" aria-hidden="true" />
          download raw copy
        </button>
        <button
          type="button"
          onClick={dismissStorageCorruption}
          className="rounded border border-[var(--error-color)]/40 px-2 py-0.5 font-bold hover:bg-[var(--error-color)]/15 cursor-pointer"
        >
          dismiss
        </button>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-b border-[var(--error-color)]/40 bg-[var(--error-color)]/10 px-4 py-1.5 font-mono text-[11px] text-[var(--error-color)]"
    >
      <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>progress isn&apos;t being saved in this browser.</span>
      <Link href="/settings#backup" className="font-bold underline underline-offset-2 hover:opacity-80">
        export a backup
      </Link>
    </div>
  );
}
