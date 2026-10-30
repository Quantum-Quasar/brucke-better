import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { useAppStore, loadSavedState, STORAGE_KEY, STORAGE_COOKIE_KEY, getCookie, setCookie } from "../lib/store";
import { DEFAULT_THEME } from "@/lib/theme-runtime";
import { DEFAULT_SETTINGS } from "../data/settings";

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

describe("App Store & User Progress State", () => {
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
    // resetProgress intentionally preserves preferences; restore the defaults
    // so every test starts from the same baseline
    useAppStore.getState().resetSettings();
    useAppStore.getState().setTheme(DEFAULT_THEME);
    // resetProgress also persists an empty progress snapshot — tests that seed
    // storage by hand start from a clean slate instead
    (globalThis as any).localStorage.clear();
    (globalThis as any).document.cookie = "";
  });

  it("initializes with default values", () => {
    const state = useAppStore.getState();
    expect(state.completedLessons).toEqual([]);
    expect(state.currentLessonId).toBe(1);
    expect(state.lessonProgress).toEqual({});
    expect(state.wordMastery).toEqual({});
    expect(state.tolerance.umlautTolerance).toBe(false);
    expect(state.tolerance.capitalizationTolerance).toBe(false);
  });

  it("transitions mastery states: unexplored -> explored -> encountered -> mastered", () => {
    const store = useAppStore.getState();

    // 1. Explored
    store.markWordExplored("hoffen");
    expect(useAppStore.getState().wordMastery["hoffen"]).toBe("explored");

    // 2. Encountered
    store.markWordEncountered("hoffen");
    expect(useAppStore.getState().wordMastery["hoffen"]).toBe("encountered");
    expect(useAppStore.getState().srsCards["hoffen"]).toBeDefined();

    // Explored should not downgrade encountered
    store.markWordExplored("hoffen");
    expect(useAppStore.getState().wordMastery["hoffen"]).toBe("encountered");

    // 3. Mastered
    store.markWordMastered("hoffen");
    expect(useAppStore.getState().wordMastery["hoffen"]).toBe("mastered");
  });

  it("advances lessons on completion", () => {
    const store = useAppStore.getState();
    store.completeLesson(1);
    expect(useAppStore.getState().completedLessons).toContain(1);
    expect(useAppStore.getState().currentLessonId).toBe(2);
  });

  it("persists the active lesson segment for resume", () => {
    const store = useAppStore.getState();
    store.setLessonProgress(3, {
      segment: "practice",
      practiceIndex: 2,
      completedSegments: ["hook", "pattern", "table"],
    });

    expect(useAppStore.getState().lessonProgress[3]).toEqual({
      segment: "practice",
      practiceIndex: 2,
      completedSegments: ["hook", "pattern", "table"],
    });
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).progressByLanguage.de.lessonProgress[3].segment).toBe("practice");
  });

  it("manages independent tolerance settings and dismissal thresholds", () => {
    const store = useAppStore.getState();

    store.setUmlautTolerance(true);
    expect(useAppStore.getState().tolerance.umlautTolerance).toBe(true);
    expect(useAppStore.getState().tolerance.capitalizationTolerance).toBe(false);

    store.dismissUmlautPrompt();
    expect(useAppStore.getState().tolerance.umlautDismissals).toBe(1);

    store.dismissUmlautPrompt();
    expect(useAppStore.getState().tolerance.umlautDismissals).toBe(2);
  });

  it("persists progress to localStorage and preferences to the cookie", () => {
    const store = useAppStore.getState();
    store.completeLesson(1);
    store.markWordMastered("Wasser");

    // Check localStorage
    const localRaw = localStorage.getItem(STORAGE_KEY);
    expect(localRaw).toBeTruthy();
    const parsedLocal = JSON.parse(localRaw!);
    expect(parsedLocal.progressByLanguage.de.completedLessons).toContain(1);
    expect(parsedLocal.progressByLanguage.de.wordMastery["Wasser"]).toBe("mastered");
    expect(parsedLocal.completedLessons).toBeUndefined();

    // Check cookie
    const cookieVal = getCookie(STORAGE_COOKIE_KEY);
    expect(cookieVal).toBeTruthy();
    const parsedCookie = JSON.parse(cookieVal!);
    // progress stays out of the cookie while localStorage works
    expect(parsedCookie.progressByLanguage).toBeUndefined();
    expect(parsedCookie.theme).toBe(parsedLocal.theme);
  });

  it("hydrates from cookie if localStorage is cleared", () => {
    const sampleState = {
      completedLessons: [1, 2],
      currentLessonId: 3,
      wordMastery: { Schiff: "mastered" },
      srsCards: {},
      weeklyActivity: [true, false, false, false, false, false, false],
      tolerance: {
        umlautTolerance: true,
        capitalizationTolerance: false,
        umlautDismissals: 0,
        capitalizationDismissals: 0,
      },
    };
    setCookie(STORAGE_COOKIE_KEY, JSON.stringify(sampleState));
    localStorage.removeItem(STORAGE_KEY);

    useAppStore.getState().hydrateFromStorage();

    const state = useAppStore.getState();
    expect(state.completedLessons).toEqual([1, 2]);
    expect(state.currentLessonId).toBe(3);
    expect(state.wordMastery["Schiff"]).toBe("mastered");
    expect(state.tolerance.umlautTolerance).toBe(true);
  });

  it("persists and updates preferred review mode", () => {
    const store = useAppStore.getState();
    expect(store.preferredReviewMode).toBe("flashcard");

    store.setPreferredReviewMode("mcq");
    expect(useAppStore.getState().preferredReviewMode).toBe("mcq");

    const localRaw = localStorage.getItem(STORAGE_KEY);
    expect(localRaw).toBeTruthy();
    expect(JSON.parse(localRaw!).preferredReviewMode).toBe("mcq");
  });

  it("manages and persists first-time onboarding completion", () => {
    const store = useAppStore.getState();

    // Default or after reset
    store.openOnboarding();
    expect(useAppStore.getState().isOnboardingOpen).toBe(true);

    store.closeOnboarding();
    expect(useAppStore.getState().isOnboardingOpen).toBe(false);

    // Complete onboarding (e.g. user finishes or clicks skip)
    store.completeOnboarding();
    const updated = useAppStore.getState();
    expect(updated.hasCompletedOnboarding).toBe(true);
    expect(updated.isOnboardingOpen).toBe(false);

    // Persisted to storage
    const localRaw = localStorage.getItem(STORAGE_KEY);
    expect(localRaw).toBeTruthy();
    expect(JSON.parse(localRaw!).hasCompletedOnboarding).toBe(true);
  });

  it("manages and persists gender introduction dismissal", () => {
    const store = useAppStore.getState();
    expect(store.hasSeenGenderIntro).toBe(false);

    store.dismissGenderIntro();
    expect(useAppStore.getState().hasSeenGenderIntro).toBe(true);

    const localRaw = localStorage.getItem(STORAGE_KEY);
    expect(localRaw).toBeTruthy();
    expect(JSON.parse(localRaw!).hasSeenGenderIntro).toBe(true);
  });

  it("resets progress, persists the cleared state, and preserves settings/appearance", () => {
    const store = useAppStore.getState();
    store.setTheme("carbon");
    store.updateSetting("soundVolume", 0.8);
    store.completeLesson(1);
    store.markWordMastered("Wasser");

    // Verify written
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy();
    expect(getCookie(STORAGE_COOKIE_KEY)).toBeTruthy();

    // Reset: progress is wiped, preferences are not.
    store.resetProgress();
    const state = useAppStore.getState();
    expect(state.completedLessons).toEqual([]);
    expect(state.wordMastery).toEqual({});
    expect(state.srsCards).toEqual({});
    expect(state.currentLessonId).toBe(1);
    expect(state.theme).toBe("carbon");
    expect(state.settings.soundVolume).toBe(0.8);

    // The cleared progress is persisted immediately, so a reload cannot
    // resurrect what was just reset — while the preserved preferences survive.
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(persisted.progressByLanguage.de.completedLessons).toEqual([]);
    expect(persisted.progressByLanguage.de.wordMastery).toEqual({});
    expect(persisted.theme).toBe("carbon");
    expect(persisted.settings.soundVolume).toBe(0.8);

    // Perform action again after reset to ensure lastSerialized didn't block saving
    store.completeLesson(1);
    const postResetLocal = localStorage.getItem(STORAGE_KEY);
    expect(postResetLocal).toBeTruthy();
    expect(JSON.parse(postResetLocal!).progressByLanguage.de.completedLessons).toContain(1);
  });

  it("manages and persists Monkeytype color scheme themes", () => {
    const store = useAppStore.getState();
    expect(store.theme).toBe("alduin");

    store.setTheme("carbon");
    expect(useAppStore.getState().theme).toBe("carbon");

    const localRaw = localStorage.getItem(STORAGE_KEY);
    expect(localRaw).toBeTruthy();
    expect(JSON.parse(localRaw!).theme).toBe("carbon");

    store.setTheme("nord");
    expect(useAppStore.getState().theme).toBe("nord");
  });

  it("hydrates every persisted field that used to seed the store at import time", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeLanguageId: "es",
        progressByLanguage: {
          es: {
            completedLessons: [1, 2],
            currentLessonId: 3,
            lessonProgress: {
              1: { segment: "practice", practiceIndex: 1, completedSegments: ["hook", "pattern", "table"] },
            },
            lessonStars: { 1: "gold" },
            wordMastery: { familia: "encountered" },
            srsCards: {},
            weeklyActivity: [true, false, false, false, false, false, false],
            lastActivityWeek: "2026-W10-05",
          },
        },
        seenIntroLanguages: ["de"],
        preferredReviewMode: "typing",
        hasCompletedOnboarding: true,
        hasSeenGenderIntro: true,
        theme: "nord",
        font: "JetBrains_Mono",
        settings: { soundVolume: 0.9 },
        tolerance: {
          umlautTolerance: true,
          capitalizationTolerance: true,
          umlautDismissals: 2,
          capitalizationDismissals: 1,
        },
      })
    );

    useAppStore.getState().hydrateFromStorage({ reread: true });
    const state = useAppStore.getState();

    expect(state.activeLanguageId).toBe("es");
    expect(state.completedLessons).toEqual([1, 2]);
    expect(state.currentLessonId).toBe(3);
    expect(state.lessonProgress[1]?.practiceIndex).toBe(1);
    expect(state.lessonStars[1]).toBe("gold");
    expect(state.wordMastery["familia"]).toBe("encountered");
    expect(state.weeklyActivity).toEqual([true, false, false, false, false, false, false]);
    expect(state.lastActivityWeek).toBe("2026-W10-05");
    expect(state.seenIntroLanguages).toContain("de");
    expect(state.preferredReviewMode).toBe("typing");
    expect(state.hasCompletedOnboarding).toBe(true);
    expect(state.hasSeenGenderIntro).toBe(true);
    expect(state.theme).toBe("nord");
    expect(state.font).toBe("JetBrains_Mono");
    // settings merge over defaults rather than replacing them wholesale
    expect(state.settings.soundVolume).toBe(0.9);
    expect(state.settings.showKeyTips).toBe(DEFAULT_SETTINGS.showKeyTips);
    expect(state.tolerance).toEqual({
      umlautTolerance: true,
      capitalizationTolerance: true,
      umlautDismissals: 2,
      capitalizationDismissals: 1,
    });
  });

  it("does not throw on a cookie value containing a stray percent sign", () => {
    (globalThis as any).document.cookie = `${STORAGE_COOKIE_KEY}=%E0%A4%A; path=/`;
    expect(() => getCookie(STORAGE_COOKIE_KEY)).not.toThrow();
    expect(getCookie(STORAGE_COOKIE_KEY)).toBe("%E0%A4%A");
    // this path runs at module load through loadSavedState — it must survive too
    expect(() => loadSavedState()).not.toThrow();
  });
});
