import { readStorageString, removeStorageKey, writeStorageString } from "./safe-storage";

export const WEEKLY_PRACTICE_STORAGE_KEY = "brucke.weeklyPractice.v1";
export const WEEKLY_PRACTICE_EVENT = "brucke:weekly-practice-updated";
const RETENTION_DAYS = 35;

export interface WeeklyPracticeSummary {
  daysPracticed: number;
  windowDays: 7;
  practicedToday: boolean;
  recentDates: string[];
}

function readRawPracticeDates(storage?: Storage | null): string | null {
  if (storage === undefined) {
    return readStorageString(WEEKLY_PRACTICE_STORAGE_KEY);
  }
  if (!storage) return null;
  try {
    return storage.getItem(WEEKLY_PRACTICE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeRawPracticeDates(serialized: string | null, storage?: Storage | null): boolean {
  if (storage === undefined) {
    return serialized === null
      ? removeStorageKey(WEEKLY_PRACTICE_STORAGE_KEY)
      : writeStorageString(WEEKLY_PRACTICE_STORAGE_KEY, serialized);
  }
  if (!storage) return false;
  try {
    if (serialized === null) {
      storage.removeItem(WEEKLY_PRACTICE_STORAGE_KEY);
    } else {
      storage.setItem(WEEKLY_PRACTICE_STORAGE_KEY, serialized);
    }
    return true;
  } catch {
    return false;
  }
}

function notifyWeeklyPracticeUpdated() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent(WEEKLY_PRACTICE_EVENT));
  } catch {
    // Ignore environments without CustomEvent support
  }
}

/** Format a Date as a local calendar date key (YYYY-MM-DD). */
export function toLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidDateKey(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** Build the inclusive rolling window of local date keys ending on `now` (e.g. last 7 days). */
export function getRollingWindowDateKeys(windowDays = 7, now: Date = new Date()): string[] {
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const keys: string[] = [];
  for (let offset = windowDays - 1; offset >= 0; offset -= 1) {
    const day = new Date(base.getFullYear(), base.getMonth(), base.getDate() - offset);
    keys.push(toLocalDateKey(day));
  }
  return keys;
}

export function loadPracticeDates(storage?: Storage | null): string[] {
  const raw = readRawPracticeDates(storage);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter(isValidDateKey))].sort();
  } catch {
    return [];
  }
}

function savePracticeDates(dates: string[], storage?: Storage | null): void {
  const ok =
    dates.length === 0
      ? writeRawPracticeDates(null, storage)
      : writeRawPracticeDates(JSON.stringify(dates), storage);
  if (ok) {
    notifyWeeklyPracticeUpdated();
  }
}

/** Clear all stored practice dates. */
export function clearPracticeDates(storage?: Storage | null): string[] {
  savePracticeDates([], storage);
  return [];
}

/** Record today's local calendar date as practiced (idempotent, zero-shame). */
export function recordPracticeDay(now: Date = new Date(), storage?: Storage | null): string[] {
  const todayKey = toLocalDateKey(now);
  const cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - RETENTION_DAYS);
  const cutoffKey = toLocalDateKey(cutoffDate);

  const existing = loadPracticeDates(storage).filter((dateKey) => dateKey >= cutoffKey);
  if (!existing.includes(todayKey)) {
    existing.push(todayKey);
    existing.sort();
    savePracticeDates(existing, storage);
  }
  return existing;
}

/** Count unique local calendar dates practiced within the last 7 days (inclusive of today). */
export function countPracticeDaysInLast7Days(
  dates: readonly string[],
  now: Date = new Date(),
): number {
  const windowSet = new Set(getRollingWindowDateKeys(7, now));
  const uniqueMatches = new Set<string>();
  for (const dateKey of dates) {
    if (windowSet.has(dateKey)) {
      uniqueMatches.add(dateKey);
    }
  }
  return uniqueMatches.size;
}

export function getWeeklyPracticeSummary(
  now: Date = new Date(),
  storage?: Storage | null,
): WeeklyPracticeSummary {
  const dates = loadPracticeDates(storage);
  const windowKeys = getRollingWindowDateKeys(7, now);
  const windowSet = new Set(windowKeys);
  const recentDates = dates.filter((key) => windowSet.has(key));
  const todayKey = toLocalDateKey(now);
  return {
    daysPracticed: recentDates.length,
    windowDays: 7,
    practicedToday: recentDates.includes(todayKey),
    recentDates,
  };
}
