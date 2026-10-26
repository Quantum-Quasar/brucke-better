import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";

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
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).progressByLanguage.de.completedLessons).toEqual([]);

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
