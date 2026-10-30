import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach, vi } from "vitest";
import {
  loadSavedState,
  isPlausibleStateObject,
  useAppStore,
  saveState,
  flushSave,
  STORAGE_KEY,
  STORAGE_COOKIE_KEY,
} from "../lib/store";
import { getStorageHealth } from "../lib/storage-health";
import { DEFAULT_LANGUAGE_ID } from "../data/languages";
import { getDueCards } from "../lib/srs";

// Persistence boundary contract:
// - a valid-but-incomplete localStorage payload must NOT bury recoverable
//   cookie data (field-level merge, localStorage wins for fields it has)
// - invalid JSON falls back to whichever store parses
// - pre-multi-language payloads migrate into the default language slice
// - importBackupState accepts partial backups and rejects non-objects

class LocalStorageMock {
  private store: Record<string, string> = {};
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const WEEK = [true, false, false, false, false, false, false];

/** A lean cookie payload in the exact shape saveState() writes. */
function leanCookie(overrides: Record<string, unknown> = {}) {
  return {
    activeLanguageId: "de",
    progressByLanguage: {
      de: {
        completedLessons: [1, 2, 3],
        currentLessonId: 4,
        lessonProgress: {},
        lessonStars: {},
        wordMastery: { haus: "mastered" },
        srsCards: {},
        weeklyActivity: WEEK,
        lastActivityWeek: undefined,
      },
    },
    completedLessons: [1, 2, 3],
    currentLessonId: 4,
    wordMastery: { haus: "mastered" },
    hasCompletedOnboarding: true,
    hasSeenGenderIntro: true,
    theme: "monokai",
    font: "jetbrains-mono",
    seenIntroLanguages: ["de"],
    ...overrides,
  };
}

describe("Persistence validation & dual-store fallback merging", () => {
  beforeAll(() => {
    const mockStorage = new LocalStorageMock();
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = mockStorage;
    (globalThis as any).document = { cookie: "" };
  });

  afterAll(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).localStorage;
    delete (globalThis as any).document;
  });

  beforeEach(() => {
    (globalThis as any).localStorage.clear();
    (globalThis as any).document.cookie = "";
    useAppStore.getState().resetProgress();
    // resetProgress preserves the active language by design; restore the
    // default so a language-importing test cannot leak into the next one
    useAppStore.getState().setActiveLanguage(DEFAULT_LANGUAGE_ID);
    // resetProgress persists an empty snapshot; these tests seed both stores by
    // hand, so start from a clean slate
    (globalThis as any).localStorage.clear();
    (globalThis as any).document.cookie = "";
  });

  describe("isPlausibleStateObject schema guard", () => {
    it("accepts plain objects only", () => {
      expect(isPlausibleStateObject({})).toBe(true);
      expect(isPlausibleStateObject({ completedLessons: [] })).toBe(true);
      expect(isPlausibleStateObject(null)).toBe(false);
      expect(isPlausibleStateObject(undefined)).toBe(false);
      expect(isPlausibleStateObject([])).toBe(false);
      expect(isPlausibleStateObject("state")).toBe(false);
      expect(isPlausibleStateObject(42)).toBe(false);
      expect(isPlausibleStateObject(true)).toBe(false);
    });
  });

  describe("cookie/localStorage fallback merging", () => {
    it("recovers progress from the cookie when localStorage is valid but incomplete", () => {
      // a truncated localStorage save: only appearance settings survived
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ theme: "nord", settings: { lazyMode: true } })
      );
      (globalThis as any).document.cookie = "";
      const cookieJson = JSON.stringify(leanCookie());
      (globalThis as any).document.cookie = `${STORAGE_COOKIE_KEY}=${encodeURIComponent(cookieJson)}`;

      const saved = loadSavedState();

      // cookie data recovered…
      expect(saved.completedLessons).toEqual([1, 2, 3]);
      expect(saved.currentLessonId).toBe(4);
      expect(saved.wordMastery?.["haus"]).toBe("mastered");
      expect(saved.progressByLanguage?.de?.completedLessons).toEqual([1, 2, 3]);
      expect(saved.hasCompletedOnboarding).toBe(true);
      // …and localStorage fields still win for what it actually has
      expect(saved.theme).toBe("nord");
      expect(saved.settings?.lazyMode).toBe(true);
    });

    it("lets localStorage win for fields it has; the cookie only fills gaps", () => {
      // a truncated localStorage save: only appearance settings survived
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ theme: "nord", settings: { lazyMode: true } })
      );
      const cookieJson = JSON.stringify(leanCookie());
      (globalThis as any).document.cookie = `${STORAGE_COOKIE_KEY}=${encodeURIComponent(cookieJson)}`;

      const saved = loadSavedState();
      // localStorage fields win…
      expect(saved.theme).toBe("nord");
      expect(saved.settings?.lazyMode).toBe(true);
      // …cookie fills the missing progress fields
      expect(saved.completedLessons).toEqual([1, 2, 3]);
      expect(saved.wordMastery?.["haus"]).toBe("mastered");
      expect(saved.hasCompletedOnboarding).toBe(true);
    });

    it("falls back to the cookie entirely when localStorage JSON is invalid", () => {
      localStorage.setItem(STORAGE_KEY, "{not valid json");
      const cookieJson = JSON.stringify(leanCookie());
      (globalThis as any).document.cookie = `${STORAGE_COOKIE_KEY}=${encodeURIComponent(cookieJson)}`;

      const saved = loadSavedState();
      expect(saved.completedLessons).toEqual([1, 2, 3]);
      expect(saved.theme).toBe("monokai");
    });

    it("returns an empty state (no throw) when both stores are unreadable", () => {
      localStorage.setItem(STORAGE_KEY, "{oops");
      (globalThis as any).document.cookie = `${STORAGE_COOKIE_KEY}=${encodeURIComponent("{also bad")}`;
      expect(loadSavedState()).toEqual({});
    });

    it("prefers the lean cookie when localStorage rejected the newer write", () => {
      useAppStore.getState().completeLesson(1);
      const staleLocal = localStorage.getItem(STORAGE_KEY);
      expect(staleLocal).toBeTruthy();

      // quota exceeded: the localStorage copy stays at lesson 1, while the
      // fallback cookie is written from the lesson-2 snapshot
      const setItem = vi.spyOn(globalThis.localStorage, "setItem").mockImplementation(() => {
        throw new Error("quota exceeded");
      });
      try {
        useAppStore.getState().completeLesson(2);
      } finally {
        setItem.mockRestore();
      }

      expect(localStorage.getItem(STORAGE_KEY)).toBe(staleLocal);
      expect(loadSavedState().completedLessons).toEqual([1, 2]);
    });
  });

  describe("partial migrations", () => {
    it("migrates a pre-multi-language payload into the default language slice", () => {
      // legacy saves kept progress on the top level with no language fields
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          completedLessons: [4, 5],
          currentLessonId: 6,
          lessonProgress: {},
          lessonStars: {},
          wordMastery: { tag: "encountered" },
          srsCards: {},
          weeklyActivity: WEEK,
        })
      );

      const saved = loadSavedState();
      expect(saved.activeLanguageId).toBe("de");
      expect(saved.progressByLanguage?.de?.completedLessons).toEqual([4, 5]);
      expect(saved.progressByLanguage?.de?.wordMastery).toEqual({ tag: "encountered" });
      // top level mirrors the active slice
      expect(saved.completedLessons).toEqual([4, 5]);
      expect(saved.currentLessonId).toBe(6);
    });

    it("repairs every missing field of a partial payload without throwing", () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: "nord" }));
      const saved = loadSavedState();
      expect(saved.completedLessons).toEqual([]);
      expect(saved.srsCards).toEqual({});
      expect(saved.wordMastery).toEqual({});
      expect(saved.weeklyActivity).toHaveLength(7);
      expect(saved.activeLanguageId).toBe("de");
      expect(saved.theme).toBe("nord");
    });

    it("drops null/partial SRS cards instead of crashing the review queue", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          srsCards: {
            good: { word_id: "good", interval: 1, repetitions: 0, ease_factor: 2.5, due_date: "2026-01-01", lapses: 0, last_reviewed: null },
            // three ways storage gets corrupted: a null value, a truncated
            // card, and a card with a non-numeric interval
            broken: null,
            partial: { word_id: "partial" },
            "also-broken": { word_id: "also-broken", interval: "soon", repetitions: 0, ease_factor: 2.5, due_date: "2026-01-01" },
            // legacy key that disagrees with its word_id: re-key by word_id
            legacy: { word_id: "haus", interval: 3, repetitions: 1, ease_factor: 2.6, due_date: "2026-01-02", lapses: 1, last_reviewed: "2026-01-01" },
          },
        })
      );

      const saved = loadSavedState();
      expect(Object.keys(saved.srsCards ?? {}).sort()).toEqual(["good", "haus"]);
      expect(saved.srsCards?.["haus"]?.word_id).toBe("haus");
      expect(saved.progressByLanguage?.de?.srsCards).toEqual(saved.srsCards);
      // the boot-time queue read no longer throws on the repaired map
      expect(() => getDueCards(saved.srsCards ?? {}, "2026-01-05")).not.toThrow();
      expect(getDueCards(saved.srsCards ?? {}, "2026-01-05").map((c) => c.word_id).sort()).toEqual(["good", "haus"]);
    });

    it("repairs a merged cookie+localStorage payload field by field", () => {
      // localStorage kept only srsCards; an older lean cookie kept only the
      // top-level lesson list — the merged payload assembles both halves
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ srsCards: { haus: { word_id: "haus", interval: 1, repetitions: 1, ease_factor: 2.5, due_date: "2026-01-01", lapses: 0, last_reviewed: null } } })
      );
      const { progressByLanguage: _slice, ...leanNoSlice } = leanCookie();
      const cookieJson = JSON.stringify(leanNoSlice);
      (globalThis as any).document.cookie = `${STORAGE_COOKIE_KEY}=${encodeURIComponent(cookieJson)}`;

      const saved = loadSavedState();
      expect(saved.completedLessons).toEqual([1, 2, 3]);
      expect(saved.srsCards?.["haus"]?.interval).toBe(1);
      // the migrated active slice assembles both halves
      expect(saved.progressByLanguage?.de?.srsCards["haus"]?.word_id).toBe("haus");
      expect(saved.progressByLanguage?.de?.completedLessons).toEqual([1, 2, 3]);
    });
  });

  describe("importBackupState partial-backup handling", () => {
    it("rejects non-object payloads", () => {
      expect(useAppStore.getState().importBackupState(null)).toBe(false);
      expect(useAppStore.getState().importBackupState("backup")).toBe(false);
      expect(useAppStore.getState().importBackupState(42)).toBe(false);
      expect(useAppStore.getState().importBackupState([1, 2])).toBe(false);
    });

    it("restores a partial backup's progress lists wholesale, coercing lesson strings", () => {
      const store = useAppStore.getState();
      store.completeLesson(1);
      expect(useAppStore.getState().completedLessons).toEqual([1]);

      // a backup carries its own progress snapshot — its list replaces the
      // current one (numeric strings are coerced, junk is dropped)
      expect(useAppStore.getState().importBackupState({ completedLessons: [2, "lesson 3", "no digits"] })).toBe(true);
      const state = useAppStore.getState();
      expect(state.completedLessons).toEqual([2, 3]);
      // untouched fields keep their previous values
      expect(state.settings.lazyMode).toBe(false);
      expect(state.theme).toBeTruthy();
    });

    it("applies a settings-only backup without touching progress", () => {
      const store = useAppStore.getState();
      store.completeLesson(7);
      const before = useAppStore.getState().completedLessons;

      expect(useAppStore.getState().importBackupState({ settings: { lazyMode: true } })).toBe(true);
      const state = useAppStore.getState();
      expect(state.settings.lazyMode).toBe(true);
      expect(state.tolerance.umlautTolerance).toBe(true);
      expect(state.completedLessons).toEqual(before);
    });

    it("does not switch to a language a settings-only backup carries no progress for", () => {
      const store = useAppStore.getState();
      store.setActiveLanguage("de");
      store.completeLesson(7);
      const before = useAppStore.getState().completedLessons;

      expect(
        useAppStore.getState().importBackupState({ activeLanguageId: "fr", settings: { lazyMode: true } })
      ).toBe(true);
      const state = useAppStore.getState();
      expect(state.activeLanguageId).toBe("de");
      expect(state.completedLessons).toEqual(before);
      expect(state.settings.lazyMode).toBe(true);
    });

    it("keeps onboarding flags in the size-guarded minimal cookie", () => {
      const state = useAppStore.getState();
      saveState({
        ...state,
        hasCompletedOnboarding: true,
        hasSeenGenderIntro: true,
        // force the lean cookie over its 2048-byte budget
        wordMastery: Object.fromEntries(
          Array.from({ length: 400 }, (_, i) => [`word_${i}`, "mastered" as const])
        ),
      });

      localStorage.clear();
      const restored = loadSavedState();
      expect(restored.hasCompletedOnboarding).toBe(true);
      expect(restored.hasSeenGenderIntro).toBe(true);
    });

    it("degrades to the cookie when localStorage access throws", () => {
      const original = localStorage.getItem.bind(localStorage);
      (localStorage as any).getItem = () => {
        throw new Error("storage blocked");
      };
      try {
        expect(() => loadSavedState()).not.toThrow();
      } finally {
        (localStorage as any).getItem = original;
      }
    });

    it("round-trips through saveState and rehydrates merged", () => {
      const store = useAppStore.getState();
      store.completeLesson(1);
      store.markWordEncountered("haus");
      saveState(useAppStore.getState());

      // slice-only writes keep the progress on the language slice; simulate a
      // payload that lost everything but the theme and the slices
      const full = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(full.completedLessons).toBeUndefined();
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ theme: full.theme, progressByLanguage: full.progressByLanguage })
      );

      const saved = loadSavedState();
      expect(saved.completedLessons).toEqual([1]);
      expect(saved.srsCards?.["haus"]).toBeDefined();
    });

    it("persists the imported slice for the backup's active language", () => {
      const store = useAppStore.getState();
      store.completeLesson(1);
      expect(useAppStore.getState().completedLessons).toEqual([1]);

      // the backup names French as active and carries only the fr slice — the
      // German mirror must not be written back over it
      expect(
        useAppStore.getState().importBackupState({
          activeLanguageId: "fr",
          progressByLanguage: {
            fr: {
              completedLessons: [1, 2, 3, 4, 5],
              currentLessonId: 6,
              lessonProgress: {},
              lessonStars: {},
              wordMastery: {},
              srsCards: {},
              weeklyActivity: WEEK,
            },
          },
        })
      ).toBe(true);

      const state = useAppStore.getState();
      expect(state.activeLanguageId).toBe("fr");
      expect(state.completedLessons).toEqual([1, 2, 3, 4, 5]);
      expect(state.currentLessonId).toBe(6);

      // saveState() re-derived the slice from the mirror — it must still be the
      // imported slice, not the previous language's progress
      const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(persisted.activeLanguageId).toBe("fr");
      expect(persisted.progressByLanguage.fr.completedLessons).toEqual([1, 2, 3, 4, 5]);
      expect(persisted.completedLessons).toBeUndefined();
    });

    it("drops malformed lessonProgress / lessonStars / wordMastery entries", () => {
      expect(
        useAppStore.getState().importBackupState({
          lessonProgress: {
            // no completedSegments — this is what made setLessonProgress throw
            12: { segment: "hook", practiceIndex: 0 },
            13: { segment: "not-a-segment", practiceIndex: 0, completedSegments: [] },
            14: { segment: "practice", practiceIndex: -1, completedSegments: ["hook"] },
            15: { segment: "practice", practiceIndex: 2, completedSegments: ["hook", "bogus"] },
            16: { segment: "practice", practiceIndex: 2, completedSegments: ["hook", "pattern"], everQueued: true },
          },
          lessonStars: { 1: "gold", 2: "silver", 3: "purple" },
          wordMastery: { haus: "mastered", kaputt: "banana", zahlen: 42 },
        })
      ).toBe(true);

      const state = useAppStore.getState();
      expect(state.lessonProgress[12]).toBeUndefined();
      expect(state.lessonProgress[13]).toBeUndefined();
      expect(state.lessonProgress[14]).toBeUndefined();
      expect(state.lessonProgress[15]).toBeUndefined();
      expect(state.lessonProgress[16]).toEqual({
        segment: "practice",
        practiceIndex: 2,
        completedSegments: ["hook", "pattern"],
        everQueued: true,
      });
      expect(state.lessonStars).toEqual({ 1: "gold", 3: "purple" });
      expect(state.wordMastery).toEqual({ haus: "mastered" });

      // even a malformed entry handed straight to the action is ignored now
      expect(() =>
        useAppStore.getState().setLessonProgress(99, { segment: "hook", practiceIndex: 0 } as any)
      ).not.toThrow();
    });
  });

  describe("initialisation & hydration", () => {
    it("starts the store from defaults and applies storage only on hydrate", async () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ completedLessons: [2, 3], currentLessonId: 4, hasCompletedOnboarding: true })
      );

      // a fresh module evaluation is what the client runs before hydration —
      // it must render the same defaults the server did
      vi.resetModules();
      const fresh = await import("../lib/store");
      expect(fresh.useAppStore.getState().completedLessons).toEqual([]);
      expect(fresh.useAppStore.getState().currentLessonId).toBe(1);
      expect(fresh.useAppStore.getState().hasCompletedOnboarding).toBe(false);

      fresh.useAppStore.getState().hydrateFromStorage();
      expect(fresh.useAppStore.getState().completedLessons).toEqual([2, 3]);
      expect(fresh.useAppStore.getState().currentLessonId).toBe(4);
      expect(fresh.useAppStore.getState().hasCompletedOnboarding).toBe(true);
    });
  });

  describe("slice-only persistence", () => {
    it("loads a legacy save that still carries the top-level mirrors", () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leanCookie()));
      const saved = loadSavedState();
      expect(saved.completedLessons).toEqual([1, 2, 3]);
      expect(saved.currentLessonId).toBe(4);
    });

    it("loads a save with only the slice", () => {
      const { completedLessons: _c, currentLessonId: _i, wordMastery: _w, ...sliceOnly } = leanCookie();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sliceOnly));
      const saved = loadSavedState();
      expect(saved.completedLessons).toEqual([1, 2, 3]);
      expect(saved.wordMastery?.haus).toBe("mastered");
    });

    it("writes the progress cookie only when localStorage rejects the write", () => {
      useAppStore.getState().completeLesson(1);
      const setItem = vi.spyOn(globalThis.localStorage, "setItem").mockImplementation(() => {
        throw new Error("denied");
      });
      try {
        saveState({ ...useAppStore.getState(), theme: "forced-change" });
      } finally {
        setItem.mockRestore();
      }
      const raw = (globalThis as any).document.cookie as string;
      const value = JSON.parse(decodeURIComponent(raw.split("=").slice(1).join("=").split(";")[0]));
      expect(value.progressByLanguage.de.completedLessons).toContain(1);
    });
  });

  describe("deferred writes", () => {
    afterEach(() => {
      flushSave();
      delete (globalThis as any).requestIdleCallback;
      delete (globalThis as any).cancelIdleCallback;
    });

    it("coalesces saves while idle and flushes the latest snapshot on demand", () => {
      let idleCallback: (() => void) | null = null;
      (globalThis as any).requestIdleCallback = (callback: () => void) => {
        idleCallback = callback;
        return 1;
      };
      (globalThis as any).cancelIdleCallback = () => {};

      const base = useAppStore.getState();
      saveState({ ...base, theme: "deferred-theme" });
      saveState({ ...base, theme: "latest-theme" });

      // Nothing is written until the browser is idle (or unload/navigation).
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
      expect(idleCallback).not.toBeNull();

      flushSave();
      const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(persisted.theme).toBe("latest-theme");
    });

    it("reports a failed localStorage write and clears it on the next success", () => {
      const setItem = vi.spyOn(globalThis.localStorage, "setItem").mockImplementation(() => {
        throw new Error("quota exceeded");
      });
      try {
        saveState({ ...useAppStore.getState(), theme: "quota-theme" });
      } finally {
        setItem.mockRestore();
      }
      expect(getStorageHealth()).toBe("failed");

      saveState({ ...useAppStore.getState(), theme: "recovered-theme" });
      expect(getStorageHealth()).toBe("ok");
    });

    it("drops a pending deferred snapshot when a cross-tab write is adopted", () => {
      const idleCallbacks: Array<() => void> = [];
      (globalThis as any).requestIdleCallback = (callback: () => void) => {
        idleCallbacks.push(callback);
        return 1;
      };
      (globalThis as any).cancelIdleCallback = () => {};

      useAppStore.getState().completeLesson(1);
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();

      // Another tab persisted a union that includes lesson 2 as well.
      const week = [true, false, false, false, false, false, false];
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          activeLanguageId: "de",
          progressByLanguage: {
            de: {
              completedLessons: [1, 2],
              currentLessonId: 3,
              lessonProgress: {},
              lessonStars: {},
              wordMastery: {},
              srsCards: {},
              weeklyActivity: week,
            },
          },
          hasCompletedOnboarding: true,
        })
      );
      (globalThis as any).document.cookie = "";

      useAppStore.getState().hydrateFromStorage({ reread: true });

      // the stale pending snapshot must not flush over the adopted union
      idleCallbacks.forEach((callback) => callback());
      const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(persisted.progressByLanguage.de.completedLessons).toEqual([1, 2]);
    });
  });
});
