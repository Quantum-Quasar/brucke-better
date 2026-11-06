"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { BACKUP_STATUS_EVENT, downloadProgressBackup, isBackupReminderDue, readBackupReminder, snoozeBackupReminder } from "@/lib/progress-backup";

export function BackupReminder() {
  const hasProgress = useAppStore((state) => state.completedLessons.length > 0 ||
    Object.keys(state.srsCards).length > 0 || Object.values(state.progressByLanguage).some(
      (slice) => slice.completedLessons.length > 0 || Object.keys(slice.srsCards).length > 0
    ));
  const [due, setDue] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const update = () => setDue(isBackupReminderDue(hasProgress, readBackupReminder()));
    update();
    window.addEventListener(BACKUP_STATUS_EVENT, update);
    window.addEventListener("storage", update);
    window.addEventListener("focus", update);
    return () => {
      window.removeEventListener(BACKUP_STATUS_EVENT, update);
      window.removeEventListener("storage", update);
      window.removeEventListener("focus", update);
    };
  }, [hasProgress]);

  if (!due) return null;
  return (
    <aside aria-label="Protect your learning progress" className="border-b border-[var(--main-color)]/30 bg-[var(--sub-alt-color)] px-4 py-3 font-mono text-xs text-[var(--text-color)]">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3">
        <p className="flex-1 min-w-48">Your progress lives in this browser. Keep a backup outside it—even an installed app cannot survive a browser-data wipe.</p>
        <button type="button" onClick={() => {
          try { downloadProgressBackup(useAppStore.getState()); } catch { setError(true); }
        }} className="rounded bg-[var(--main-color)] px-3 py-2 font-bold text-[var(--bg-color)] cursor-pointer">download progress backup</button>
        <Link href="/settings#backup" className="underline underline-offset-2">backup & storage options</Link>
        <button type="button" onClick={() => { snoozeBackupReminder(); setDue(false); }} className="px-2 py-2 text-[var(--sub-color)] cursor-pointer">remind me tomorrow</button>
        {error && <p role="alert">Could not start the download. Try again or use Settings → backup.</p>}
      </div>
    </aside>
  );
}
