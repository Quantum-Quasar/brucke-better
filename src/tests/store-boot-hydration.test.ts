import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { STORAGE_COOKIE_KEY } from "../lib/storage-keys";

// Regression guard for a boot-order bug that only exists in a real browser:
//
// The store deliberately starts from deterministic defaults (so the client's
// first render matches the server HTML) and hydrates from localStorage in the
// root layout's mount effect. But React runs CHILD effects before the parent's,
// and LessonReader's mount effect persisted the current segment. That write
// landed on the not-yet-hydrated defaults and overwrote the saved state, so
// hydration re-read the clobbered copy: progress vanished, and a returning
// learner got the onboarding modal again.
//
// The fix is `bootSavedState`: the store reads storage once at module load and
// the FIRST hydrate consumes that snapshot instead of re-reading the (possibly
// clobbered) storage. React Strict Mode's second mount effect must not re-read
// storage at all — a real cross-tab event asks for `{ reread: true }`.

const STORAGE_KEY = "brucke_app_state_v1";

class LocalStorageMock {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  get length(): number {
    return this.store.size;
  }
}

describe("boot hydration snapshot", () => {
  beforeAll(() => {
    // store.ts only hydrates when `window` exists, and the suite runs in node
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = new LocalStorageMock();
    (globalThis as any).document = { cookie: "" };
  });

  afterAll(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).localStorage;
    delete (globalThis as any).document;
  });

  it("keeps the boot snapshot, ignores a strict-mode re-read, and honours explicit re-reads", async () => {
    localStorage.clear();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeLanguageId: "de",
        completedLessons: [1, 2, 3],
        currentLessonId: 4,
        lessonProgress: {
          2: { segment: "practice", practiceIndex: 1, completedSegments: ["hook", "pattern", "table"] },
        },
        lessonStars: { 1: "gold" },
        seenIntroLanguages: ["de"],
        hasCompletedOnboarding: true,
        isOnboardingOpen: false,
      })
    );

    // A fresh module instance so `bootSavedState` is captured from the seed.
    vi.resetModules();
    const store = await import("../lib/store");
    expect(store.useAppStore.getState().storeHydrated).toBe(false);

    // LessonReader's mount effect runs before the layout's hydration effect.
    store.useAppStore.getState().setLessonProgress(2, {
      segment: "hook",
      practiceIndex: 0,
      completedSegments: ["hook"],
    });
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).completedLessons).toEqual([1, 2, 3]);

    store.useAppStore.getState().hydrateFromStorage();

    const state = store.useAppStore.getState();
    expect(state.completedLessons).toEqual([1, 2, 3]);
    expect(state.lessonProgress[2].segment).toBe("practice");
    expect(state.hasCompletedOnboarding).toBe(true);
    expect(state.isOnboardingOpen).toBe(false);
    expect(state.storeHydrated).toBe(true);

    // The storage the clobbering write damaged must be repaired, otherwise the
    // next reload hydrates from the defaults.
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(persisted.progressByLanguage.de.completedLessons).toEqual([1, 2, 3]);
    expect(persisted.progressByLanguage.de.lessonProgress["2"].segment).toBe("practice");
    expect(persisted.hasCompletedOnboarding).toBe(true);

    // Strict Mode runs the layout's mount effect twice. A clobbered storage
    // copy must not be re-read by the second call...
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeLanguageId: "de",
        completedLessons: [],
        lessonProgress: { 2: { segment: "hook", practiceIndex: 0, completedSegments: [] } },
        hasCompletedOnboarding: false,
      })
    );
    store.useAppStore.getState().hydrateFromStorage();
    expect(store.useAppStore.getState().lessonProgress[2].segment).toBe("practice");
    expect(store.useAppStore.getState().hasCompletedOnboarding).toBe(true);

    // ...while a genuine cross-tab event still re-reads and merges. Another tab
    // writes both stores, so clear the stale cookie this tab received.
    (document as any).cookie = "";
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeLanguageId: "de",
        progressByLanguage: { de: { completedLessons: [4, 5] } },
        seenIntroLanguages: ["de"],
        hasCompletedOnboarding: true,
      })
    );
    store.useAppStore.getState().hydrateFromStorage({ reread: true });
    expect(store.useAppStore.getState().completedLessons).toEqual([1, 2, 3, 4, 5]);
  });

  it("adopts a cross-tab reset instead of union-resurrecting the deleted progress", async () => {
    localStorage.clear();
    (document as any).cookie = "";
    const week = [false, false, false, false, false, false, false];
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeLanguageId: "de",
        progressByLanguage: {
          de: {
            completedLessons: [1, 2, 3],
            currentLessonId: 4,
            lessonProgress: {},
            lessonStars: {},
            wordMastery: { haus: "mastered" },
            srsCards: {},
            weeklyActivity: week,
          },
        },
        completedLessons: [1, 2, 3],
        currentLessonId: 4,
        wordMastery: { haus: "mastered" },
        hasCompletedOnboarding: true,
      })
    );
    vi.resetModules();
    const store = await import("../lib/store");
    store.useAppStore.getState().hydrateFromStorage();
    expect(store.useAppStore.getState().completedLessons).toEqual([1, 2, 3]);

    // Another tab pressed "reset all progress": same shape, empty slices, and a
    // newer reset marker that tells this tab this is a deletion, not an addition.
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeLanguageId: "de",
        progressByLanguage: {
          de: {
            completedLessons: [],
            currentLessonId: 1,
            lessonProgress: {},
            lessonStars: {},
            wordMastery: {},
            srsCards: {},
            weeklyActivity: week,
          },
        },
        completedLessons: [],
        currentLessonId: 1,
        wordMastery: {},
        progressResetAt: Date.now() + 1000,
        hasCompletedOnboarding: true,
      })
    );
    store.useAppStore.getState().hydrateFromStorage({ reread: true });
    expect(store.useAppStore.getState().completedLessons).toEqual([]);
    expect(store.useAppStore.getState().wordMastery).toEqual({});

    // The next ordinary save in this tab must not write the stale list back.
    store.useAppStore.getState().setPreferredReviewMode("mcq");
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(persisted.completedLessons).toBeUndefined(); // schema v2: slice only
    expect(persisted.progressByLanguage.de.completedLessons).toEqual([]);
  });

  it("keeps new progress when another tab echoes this tab's reset", async () => {
    localStorage.clear();
    (document as any).cookie = "";
    vi.resetModules();
    const store = await import("../lib/store");
    store.useAppStore.getState().hydrateFromStorage();
    store.useAppStore.getState().resetProgress();
    const resetSnapshot = localStorage.getItem(STORAGE_KEY)!;
    store.useAppStore.getState().completeLesson(1);
    localStorage.setItem(STORAGE_KEY, resetSnapshot);
    store.useAppStore.getState().hydrateFromStorage({ reread: true });
    expect(store.useAppStore.getState().completedLessons).toContain(1);
  });

  it("preserves the best star and combines activity from the same week across tabs", async () => {
    localStorage.clear();
    (document as any).cookie = "";
    vi.resetModules();
    const store = await import("../lib/store");
    store.useAppStore.getState().hydrateFromStorage();
    store.useAppStore.setState({ lessonStars: { 1: "purple" }, lastActivityWeek: "2026-W10-26", weeklyActivity: [true, false, false, false, false, false, false] });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeLanguageId: "de", progressByLanguage: { de: {
      lessonStars: { 1: "gold" }, lastActivityWeek: "2026-W10-26", weeklyActivity: [false, true, false, false, false, false, false],
    } } }));
    store.useAppStore.getState().hydrateFromStorage({ reread: true });
    expect(store.useAppStore.getState().lessonStars[1]).toBe("purple");
    expect(store.useAppStore.getState().weeklyActivity).toEqual([true, true, false, false, false, false, false]);
  });

  it("does not restore the boot snapshot after a reset before hydration", async () => {
    localStorage.clear();
    (document as any).cookie = "";
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeLanguageId: "de", completedLessons: [1] }));
    vi.resetModules();
    const store = await import("../lib/store");
    store.useAppStore.getState().resetProgress();
    store.useAppStore.getState().hydrateFromStorage();
    expect(store.useAppStore.getState().completedLessons).toEqual([]);
  });

  it("persists an import made before hydration while keeping saved preferences", async () => {
    localStorage.clear();
    (document as any).cookie = "";
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeLanguageId: "de", completedLessons: [1], preferredReviewMode: "mcq" }));
    vi.resetModules();
    const store = await import("../lib/store");
    expect(store.useAppStore.getState().importBackupState({ completedLessons: [2] })).toBe(true);
    store.useAppStore.getState().hydrateFromStorage();
    expect(store.useAppStore.getState().completedLessons).toEqual([2]);
    expect(store.useAppStore.getState().preferredReviewMode).toBe("mcq");
    const { loadSavedState } = await import("../lib/store/persistence");
    expect(loadSavedState().completedLessons).toEqual([2]);
  });

  it("keeps a newer reset epoch from a minimal cookie over stale local progress", async () => {
    localStorage.clear();
    (document as any).cookie = "";
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeLanguageId: "de", savedAt: 100, progressResetAt: 1, progressByLanguage: { de: { completedLessons: [1] } } }));
    vi.resetModules();
    await import("../lib/store");
    const { setCookie, loadSavedState } = await import("../lib/store/persistence");
    setCookie(STORAGE_COOKIE_KEY, JSON.stringify({ activeLanguageId: "de", savedAt: 200, progressResetAt: 2, progressResetActor: "abc", storageFailed: true }));
    const restored = loadSavedState();
    expect(restored.completedLessons).toEqual([]);
    expect(restored.progressResetAt).toBe(2);
    expect(restored.progressResetActor).toBe("abc");
  });

  it("keeps another tab's update that arrives before boot hydration", async () => {
    localStorage.clear();
    (document as any).cookie = "";
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeLanguageId: "de", completedLessons: [1] }));
    vi.resetModules();
    const a = await import("../lib/store");
    vi.resetModules();
    const b = await import("../lib/store");
    b.useAppStore.getState().hydrateFromStorage();
    b.useAppStore.getState().markWordMastered("haus");
    a.useAppStore.getState().setLessonProgress(1, { segment: "hook", practiceIndex: 0, completedSegments: [] });
    a.useAppStore.getState().hydrateFromStorage();
    expect(a.useAppStore.getState().completedLessons).toContain(1);
    expect(a.useAppStore.getState().wordMastery.haus).toBe("mastered");
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).progressByLanguage.de.wordMastery.haus).toBe("mastered");
  });

  it("merges concurrent tab snapshots and rejects stale events after an undo or reset", async () => {
    localStorage.clear();
    (document as any).cookie = "";
    vi.resetModules();
    const a = await import("../lib/store");
    a.useAppStore.getState().hydrateFromStorage();
    vi.resetModules();
    const b = await import("../lib/store");
    b.useAppStore.getState().hydrateFromStorage();

    a.useAppStore.getState().markWordEncountered("haus");
    a.useAppStore.getState().setLessonProgress(1, { segment: "practice", practiceIndex: 2, completedSegments: ["hook"] });
    const snapshotA = localStorage.getItem(STORAGE_KEY)!;
    b.useAppStore.getState().markWordEncountered("boot");
    const snapshotB = localStorage.getItem(STORAGE_KEY)!;
    a.useAppStore.getState().hydrateFromStorage({ reread: true, snapshot: snapshotB });
    b.useAppStore.getState().hydrateFromStorage({ reread: true, snapshot: snapshotA });
    expect(b.useAppStore.getState().wordMastery).toMatchObject({ haus: "encountered", boot: "encountered" });
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).progressByLanguage.de.lessonProgress[1].practiceIndex).toBe(2);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).progressByLanguage.de.wordMastery).toMatchObject({ haus: "encountered", boot: "encountered" });

    const original = b.useAppStore.getState().srsCards.haus;
    b.useAppStore.getState().recordReview("haus", 5);
    const graded = localStorage.getItem(STORAGE_KEY)!;
    b.useAppStore.getState().restoreSrsCard("haus", { card: original, mastery: null });
    const undone = localStorage.getItem(STORAGE_KEY)!;
    a.useAppStore.getState().hydrateFromStorage({ reread: true, snapshot: undone });
    a.useAppStore.getState().hydrateFromStorage({ reread: true, snapshot: graded });
    expect(a.useAppStore.getState().wordMastery.haus).toBeUndefined();
    expect(a.useAppStore.getState().srsCards.haus).toEqual(original);

    a.useAppStore.getState().resetProgress();
    a.useAppStore.getState().hydrateFromStorage({ reread: true, snapshot: snapshotA });
    expect(a.useAppStore.getState().wordMastery).toEqual({});
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).progressByLanguage.de.wordMastery).toEqual({});

    const now = vi.spyOn(Date, "now").mockReturnValue(Date.now() + 10000);
    try {
      a.useAppStore.getState().resetProgress();
      const resetA = localStorage.getItem(STORAGE_KEY)!;
      b.useAppStore.getState().resetProgress();
      const resetB = localStorage.getItem(STORAGE_KEY)!;
      a.useAppStore.getState().hydrateFromStorage({ reread: true, snapshot: resetB });
      b.useAppStore.getState().hydrateFromStorage({ reread: true, snapshot: resetA });
      expect(a.useAppStore.getState().progressResetAt).toBe(b.useAppStore.getState().progressResetAt);
      expect(a.useAppStore.getState().progressResetActor).toBe(b.useAppStore.getState().progressResetActor);
    } finally {
      now.mockRestore();
    }
  });

  it("unions a parked slice when another tab switches language", async () => {
    localStorage.clear();
    (document as any).cookie = "";
    const week = [false, false, false, false, false, false, false];
    const slice = (completedLessons: number[], currentLessonId: number) => ({
      completedLessons,
      currentLessonId,
      lessonProgress: {},
      lessonStars: {},
      wordMastery: {},
      srsCards: {},
      weeklyActivity: week,
    });
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeLanguageId: "de",
        progressByLanguage: {
          de: slice([1], 2),
          fr: slice([1, 2], 3),
        },
        completedLessons: [1],
        currentLessonId: 2,
        hasCompletedOnboarding: true,
      })
    );
    vi.resetModules();
    const store = await import("../lib/store");
    store.useAppStore.getState().hydrateFromStorage();
    expect(store.useAppStore.getState().activeLanguageId).toBe("de");

    // The other tab switches to French and saves its own older French slice.
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeLanguageId: "fr",
        progressByLanguage: { fr: slice([3], 4) },
        completedLessons: [3],
        currentLessonId: 4,
        hasCompletedOnboarding: true,
      })
    );
    store.useAppStore.getState().hydrateFromStorage({ reread: true });
    expect(store.useAppStore.getState().activeLanguageId).toBe("fr");
    // this tab's fresher [1,2] must survive the other tab's [3]
    expect(store.useAppStore.getState().completedLessons).toEqual([1, 2, 3]);
  });
});
