import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "../lib/store";
import { createProgressBackup, isBackupReminderDue, readBackupReminder } from "../lib/progress-backup";
import { createInitialCard } from "../lib/srs";

const initial = useAppStore.getState();

beforeEach(() => useAppStore.setState(initial, true));
afterEach(() => vi.unstubAllGlobals());

describe("portable progress backups", () => {
  it("restores current active progress, parked courses, retries, gates and preferences", () => {
    const card = createInitialCard("haus");
    const state = {
      ...initial,
      completedLessons: [1, 2],
      lessonStars: { 1: "purple" as const, 2: "gold" as const },
      passedGateIds: [1],
      lessonProgress: { 3: { segment: "practice" as const, practiceIndex: 4, completedSegments: ["hook", "pattern", "table"] as ("hook" | "pattern" | "table")[], retryExerciseIds: ["l3_e2"], inRetryPhase: true, retryIndex: 0, everQueued: true } },
      srsCards: { haus: card },
      wordMastery: { haus: "encountered" as const },
      settings: { ...initial.settings, lazyMode: true },
      tolerance: { ...initial.tolerance, umlautTolerance: true, umlautDismissals: 2 },
      progressByLanguage: {
        de: { completedLessons: [1], currentLessonId: 1, lessonProgress: {}, lessonStars: {}, passedGateIds: [], wordMastery: {}, srsCards: {}, sentenceCards: {}, weeklyActivity: [false, false, false, false, false, false, false] },
        fr: { completedLessons: [1, 2, 3], currentLessonId: 4, lessonProgress: {}, lessonStars: { 1: "purple" as const }, passedGateIds: [1], wordMastery: {}, srsCards: {}, sentenceCards: {}, weeklyActivity: [true, false, false, false, false, false, false] },
      },
    };
    const backup = JSON.parse(JSON.stringify(createProgressBackup(state, new Date("2026-11-06T12:00:00Z"))));
    expect(backup.progressByLanguage.de.completedLessons).toEqual([1, 2]);
    expect(backup.timestamp).toBe("2026-11-06T12:00:00.000Z");
    expect(useAppStore.getState().importBackupState(backup)).toBe(true);
    const restored = useAppStore.getState();
    expect(restored.completedLessons).toEqual([1, 2]);
    expect(restored.lessonStars).toEqual(state.lessonStars);
    expect(restored.passedGateIds).toEqual([1]);
    expect(restored.lessonProgress[3]).toEqual(state.lessonProgress[3]);
    expect(restored.srsCards.haus).toEqual(card);
    expect(restored.tolerance.umlautDismissals).toBe(2);
    expect(restored.settings.lazyMode).toBe(true);
    restored.setActiveLanguage("fr");
    expect(useAppStore.getState().completedLessons).toEqual([1, 2, 3]);
    expect(useAppStore.getState().lessonStars[1]).toBe("purple");
  });

  it("restores an empty SRS snapshot without retaining later cards", () => {
    const backup = createProgressBackup(initial);
    useAppStore.setState({ srsCards: { haus: createInitialCard("haus") } });
    expect(useAppStore.getState().importBackupState(backup)).toBe(true);
    expect(useAppStore.getState().srsCards).toEqual({});
  });

  it("does not import the active course's cards into a different backup language", () => {
    const backup = createProgressBackup({ ...initial, srsCards: { haus: createInitialCard("haus") } });
    useAppStore.setState({ activeLanguageId: "fr", srsCards: { maison: createInitialCard("maison") } });
    expect(useAppStore.getState().importBackupState(backup)).toBe(true);
    expect(useAppStore.getState().activeLanguageId).toBe("de");
    expect(Object.keys(useAppStore.getState().srsCards)).toEqual(["haus"]);
    useAppStore.getState().setActiveLanguage("fr");
    expect(Object.keys(useAppStore.getState().srsCards)).toEqual(["maison"]);
  });
});

describe("backup reminder timing", () => {
  const day = 86_400_000;
  const now = 10 * day;

  it("waits for learning progress, then offers the first backup", () => {
    expect(isBackupReminderDue(false, { downloadedAt: 0, remindAfter: 0 }, now)).toBe(false);
    expect(isBackupReminderDue(true, { downloadedAt: 0, remindAfter: 0 }, now)).toBe(true);
  });

  it("waits a week after download and reappears at the exact boundary", () => {
    const reminder = { downloadedAt: now, remindAfter: 0 };
    expect(isBackupReminderDue(true, reminder, now + 7 * day - 1)).toBe(false);
    expect(isBackupReminderDue(true, reminder, now + 7 * day)).toBe(true);
  });

  it("respects snooze even when no backup has ever been downloaded", () => {
    const reminder = { downloadedAt: 0, remindAfter: now + day };
    expect(isBackupReminderDue(true, reminder, now + day - 1)).toBe(false);
    expect(isBackupReminderDue(true, reminder, now + day)).toBe(true);
  });

  it("repairs invalid reminder fields without suppressing backups forever", () => {
    vi.stubGlobal("localStorage", { getItem: () => '{"downloadedAt":"tomorrow","remindAfter":-1}' });
    expect(readBackupReminder()).toEqual({ downloadedAt: 0, remindAfter: 0 });
  });

  it("still offers backups when browser storage access is blocked", () => {
    vi.stubGlobal("localStorage", { getItem: () => { throw new Error("blocked"); } });
    expect(isBackupReminderDue(true, readBackupReminder(), now)).toBe(true);
  });
});
