import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { LocalStorageMock } from "./storage-fixture";
import { useAppStore } from "../lib/store";
import { loadSavedState } from "../lib/store/persistence";
import { STORAGE_KEY, STORAGE_COOKIE_KEY } from "../lib/storage-keys";

describe("backup import rejects entirely-corrupt progress instead of wiping it", () => {
  beforeAll(() => {
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = new LocalStorageMock();
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
  });

  it("rejects a top-level progress list that is all junk and keeps current progress", () => {
    const store = useAppStore.getState();
    store.completeLesson(1);
    store.completeLesson(2);
    expect(useAppStore.getState().completedLessons).toEqual([1, 2]);

    expect(useAppStore.getState().importBackupState({ completedLessons: ["junk", "more junk"] })).toBe(false);
    expect(useAppStore.getState().completedLessons).toEqual([1, 2]);
  });

  it("rejects a per-language slice whose progress is all junk", () => {
    const store = useAppStore.getState();
    store.completeLesson(1);
    expect(
      useAppStore.getState().importBackupState({ progressByLanguage: { de: { completedLessons: ["junk"] } } })
    ).toBe(false);
    expect(useAppStore.getState().completedLessons).toEqual([1]);
  });

  it("rejects an all-junk word-mastery map", () => {
    const store = useAppStore.getState();
    store.markWordMastered("haus");
    expect(useAppStore.getState().importBackupState({ wordMastery: { haus: "not-a-state" } })).toBe(false);
    expect(useAppStore.getState().wordMastery["haus"]).toBe("mastered");
  });

  it("still accepts a legitimately empty progress snapshot", () => {
    const store = useAppStore.getState();
    store.completeLesson(1);
    expect(useAppStore.getState().importBackupState({ completedLessons: [] })).toBe(true);
    expect(useAppStore.getState().completedLessons).toEqual([]);
  });

  it("still accepts a mix of valid and junk entries, dropping the junk", () => {
    expect(useAppStore.getState().importBackupState({ completedLessons: [2, "lesson 3", "no digits"] })).toBe(true);
    expect(useAppStore.getState().completedLessons).toEqual([2, 3]);
  });

  it.each(["completedLessons", "passedGateIds", "lessonProgress", "lessonStars", "wordMastery", "srsCards"])("rejects wrong-type nested %s before changing progress", (field) => {
    useAppStore.getState().completeLesson(1);
    useAppStore.getState().markWordMastered("haus");
    const before = useAppStore.getState();
    expect(before.importBackupState({ progressByLanguage: { de: { [field]: null } } })).toBe(false);
    expect(useAppStore.getState().completedLessons).toEqual([1]);
    expect(useAppStore.getState().wordMastery.haus).toBe("mastered");
    expect(useAppStore.getState().progressResetAt).toBe(before.progressResetAt);
  });
});

describe("loadSavedState merges a newer fallback cookie per language", () => {
  beforeAll(() => {
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = new LocalStorageMock();
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
  });

  const seedCookie = (payload: Record<string, unknown>) => {
    (globalThis as any).document.cookie = `${STORAGE_COOKIE_KEY}=${encodeURIComponent(JSON.stringify(payload))}`;
  };

  it("does not drop a language only the local snapshot holds", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeLanguageId: "de",
        savedAt: 100,
        progressByLanguage: { de: { completedLessons: [1] }, fr: { completedLessons: [5, 6] } },
      })
    );
    seedCookie({
      activeLanguageId: "de",
      savedAt: 200,
      progressByLanguage: { de: { completedLessons: [1, 2] } },
    });

    const saved = loadSavedState();
    expect(saved.progressByLanguage?.de?.completedLessons).toEqual([1, 2]);
    // French existed only in the local snapshot; the newer cookie must not bury it.
    expect(saved.progressByLanguage?.fr?.completedLessons).toEqual([5, 6]);
  });

  it("a newer cookie reset with progress still replaces stale local progress wholesale", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeLanguageId: "de",
        savedAt: 100,
        progressResetAt: 1,
        progressByLanguage: { de: { completedLessons: [1, 2, 3] } },
      })
    );
    seedCookie({
      activeLanguageId: "de",
      savedAt: 200,
      progressResetAt: 2,
      progressResetActor: "zz",
      progressByLanguage: { de: { completedLessons: [] } },
    });

    const saved = loadSavedState();
    expect(saved.progressByLanguage?.de?.completedLessons).toEqual([]);
    expect(saved.progressResetAt).toBe(2);
  });
});
