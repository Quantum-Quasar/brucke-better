"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { useStorageHealth } from "@/lib/storage-health";

/**
 * localStorage writes fail silently in private modes and when the quota is
 * full. Losing a review streak without any signal is the worst outcome for a
 * spaced-repetition learner, so surface it and point at the backup export.
 */
export function StorageWarningBanner() {
  const health = useStorageHealth();
  if (health !== "failed") return null;

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
