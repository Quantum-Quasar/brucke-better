import type { AppState } from "./store/types";
import { sliceFromMirrors } from "./store/progress-state";

const REMINDER_KEY = "brucke_backup_reminder_v1";
export const BACKUP_STATUS_EVENT = "brucke-backup-status";
const DAY = 24 * 60 * 60 * 1000;

export interface BackupReminderState {
  downloadedAt: number;
  remindAfter: number;
}

export function createProgressBackup(state: AppState, now = new Date()) {
  return {
    timestamp: now.toISOString(),
    version: 2,
    activeLanguageId: state.activeLanguageId,
    progressByLanguage: {
      ...state.progressByLanguage,
      [state.activeLanguageId]: sliceFromMirrors(state),
    },
    seenIntroLanguages: state.seenIntroLanguages,
    settings: state.settings,
    tolerance: state.tolerance,
    ...sliceFromMirrors(state),
    preferredReviewMode: state.preferredReviewMode,
    hasCompletedOnboarding: state.hasCompletedOnboarding,
    hasSeenGenderIntro: state.hasSeenGenderIntro,
    theme: state.theme,
    font: state.font,
  };
}

export function readBackupReminder(): BackupReminderState {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(REMINDER_KEY) || "null");
    if (parsed && typeof parsed === "object") {
      const value = parsed as Record<string, unknown>;
      return {
        downloadedAt: typeof value.downloadedAt === "number" && Number.isFinite(value.downloadedAt) && value.downloadedAt >= 0 ? value.downloadedAt : 0,
        remindAfter: typeof value.remindAfter === "number" && Number.isFinite(value.remindAfter) && value.remindAfter >= 0 ? value.remindAfter : 0,
      };
    }
  } catch { /* A blocked storage area must not block a downloadable backup. */ }
  return { downloadedAt: 0, remindAfter: 0 };
}

export function isBackupReminderDue(hasProgress: boolean, reminder: BackupReminderState, now = Date.now()) {
  return hasProgress && now >= reminder.remindAfter &&
    (reminder.downloadedAt === 0 || now - reminder.downloadedAt >= 7 * DAY);
}

export function snoozeBackupReminder(now = Date.now()) {
  saveReminder({ ...readBackupReminder(), remindAfter: now + DAY });
}

function saveReminder(value: BackupReminderState) {
  try { localStorage.setItem(REMINDER_KEY, JSON.stringify(value)); } catch { /* The download still works without reminder persistence. */ }
  window.dispatchEvent(new Event(BACKUP_STATUS_EVENT));
}

export function downloadProgressBackup(state: AppState) {
  const now = new Date();
  const blob = new Blob([JSON.stringify(createProgressBackup(state, now), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `brucke_backup_${now.toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  // A deferred revoke lets the browser finish starting the file download.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  saveReminder({ downloadedAt: now.getTime(), remindAfter: 0 });
}
