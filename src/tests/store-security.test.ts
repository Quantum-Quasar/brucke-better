import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";
import { loadSavedState, saveState, useAppStore, STORAGE_KEY, STORAGE_COOKIE_KEY, getCookie } from "../lib/store";
import { DEFAULT_THEME } from "@/lib/theme-runtime";
import { DEFAULT_FONT } from "@/data/fonts";

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

describe("Store Persistence Security & Header Quota Bounds", () => {
  beforeAll(() => {
    const mockStorage = new LocalStorageMock();
    const mockElement = {
      style: { setProperty: () => {}, colorScheme: "" },
      classList: { add: () => {}, remove: () => {} },
      setAttribute: () => {},
      removeAttribute: () => {},
    };
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = mockStorage;
    (globalThis as any).document = { cookie: "", documentElement: mockElement };
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

  it("safely recovers from corrupted/poisoned localStorage without throwing", () => {
    const corruptedPayload = JSON.stringify({
      completedLessons: "not-an-array",
      wordMastery: null,
      srsCards: 12345,
      weeklyActivity: "invalid",
      settings: { playSoundOnClick: "../../etc/passwd" },
    });
    localStorage.setItem(STORAGE_KEY, corruptedPayload);

    const state = loadSavedState();
    expect(Array.isArray(state.completedLessons)).toBe(true);
    expect(state.completedLessons).toEqual([]);
    expect(typeof state.wordMastery).toBe("object");
    expect(state.wordMastery).not.toBeNull();
    expect(typeof state.srsCards).toBe("object");
    expect(Array.isArray(state.weeklyActivity)).toBe(true);
  });

  it("strictly enforces cookie URL-encoded byte size <= 2048 to prevent HTTP 431 errors", () => {
    const largeState = {
      ...useAppStore.getState(),
      wordMastery: Object.fromEntries(
        Array.from({ length: 300 }, (_, i) => [`long_german_compound_word_identifier_${i}`, "mastered"])
      ) as any,
    };
    // The full progress cookie is only written when localStorage fails; exercise
    // that path so the size guard is actually tested instead of the tiny prefs
    // cookie that normal writes produce.
    const setItem = vi.spyOn(globalThis.localStorage, "setItem").mockImplementation(() => {
      throw new Error("denied");
    });
    try {
      saveState(largeState);
    } finally {
      setItem.mockRestore();
    }

    const rawCookieVal = getCookie(STORAGE_COOKIE_KEY);
    expect(rawCookieVal).toBeTruthy();
    const encodedLength = encodeURIComponent(rawCookieVal!).length;
    // Cookie must be safely within RFC 6265 bounds (<= 2048 bytes)
    expect(encodedLength).toBeLessThanOrEqual(2048);
    // An oversized progress payload degrades to the minimal prefs cookie
    expect(JSON.parse(rawCookieVal!)).not.toHaveProperty("progressByLanguage");
  });

  it("repairs an oversized appearance id read from storage", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ theme: "x".repeat(5000), font: "é".repeat(5000) })
    );

    const saved = loadSavedState();
    expect(saved.theme).toBe(DEFAULT_THEME);
    expect(saved.font).toBe(DEFAULT_FONT);
  });  it("clamps a hostile backup's appearance id before it can bloat the cookie", () => {
    expect(
      useAppStore.getState().importBackupState({
        theme: "x".repeat(5000),
        font: "y".repeat(5000),
      })
    ).toBe(true);
    const state = useAppStore.getState();
    expect(state.theme).toBe(DEFAULT_THEME);
    expect(state.font).toBe(DEFAULT_FONT);

    // force a write even if the imported snapshot matches the last save
    saveState({ ...state, preferredReviewMode: "mcq" });
    const raw = getCookie(STORAGE_COOKIE_KEY);
    expect(raw).toBeTruthy();
    expect(encodeURIComponent(raw!).length).toBeLessThanOrEqual(2048);
  });

  it("rejects non-backup objects instead of reporting success", () => {
    const store = useAppStore.getState();
    expect(store.importBackupState({ foo: 1 })).toBe(false);
    expect(store.importBackupState([])).toBe(false);
    expect(store.importBackupState("invalid")).toBe(false);
    expect(store.importBackupState(null)).toBe(false);
  });

  it("ignores __proto__ keys and cards in imported backups", () => {
    const store = useAppStore.getState();
    // JSON.parse produces own "__proto__" data properties, unlike object literals
    const hostile = JSON.parse(
      JSON.stringify({
        wordMastery: {},
        srsCards: [
          { id: "card_ok", word_id: "w_ok", interval: 1, repetition: 1, efactor: 2.5, dueDate: "2026-01-01" },
        ],
      })
    );
    Object.defineProperty(hostile.wordMastery, "__proto__", {
      value: "mastered",
      enumerable: true,
      writable: true,
      configurable: true,
    });
    hostile.srsCards.unshift({
      id: "__proto__",
      word_id: "evil",
      interval: 999,
      repetition: 99,
      efactor: 9,
      dueDate: "1970-01-01",
    });

    expect(store.importBackupState(hostile)).toBe(true);

    const state = useAppStore.getState();
    // single-object prototypes must not have been swapped by the "__proto__" card id
    expect(Object.getPrototypeOf(state.srsCards)).toBe(Object.prototype);
    expect(Object.getPrototypeOf(state.wordMastery)).toBe(Object.prototype);
    expect(state.srsCards["card_ok"].word_id).toBe("w_ok");
    expect((state.srsCards as any).evil).toBeUndefined();
  });

  // --- TM-4: the posture settings keys round-trip through backup import/export ---

  it("round-trips posturePrimerSeen and showPostureCues through importBackupState", () => {
    const store = useAppStore.getState();
    expect(store.importBackupState({
      settings: { posturePrimerSeen: true, showPostureCues: false },
    })).toBe(true);

    const state = useAppStore.getState();
    expect(state.settings.posturePrimerSeen).toBe(true);
    expect(state.settings.showPostureCues).toBe(false);

    // the lean cookie fallback still excludes settings — the 2048 guard is untouched
    const lean = {
      theme: state.theme,
      font: state.font,
    };
    expect(encodeURIComponent(JSON.stringify(lean)).length).toBeLessThanOrEqual(2048);
  });

  it("marks the posture primer seen when onboarding completes or is skipped", () => {
    const store = useAppStore.getState();
    // resetProgress deliberately preserves settings; use resetSettings here to
    // get back to the "primer unseen" baseline this test asserts
    store.resetSettings();
    expect(useAppStore.getState().settings.posturePrimerSeen).toBe(false);

    useAppStore.getState().completeOnboarding();
    expect(useAppStore.getState().settings.posturePrimerSeen).toBe(true);
    expect(useAppStore.getState().hasCompletedOnboarding).toBe(true);
  });
});
