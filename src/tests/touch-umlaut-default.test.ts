import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { shouldDefaultTouchUmlautTolerance } from "@/lib/store/hydration-slice";
import { useAppStore } from "@/lib/store";
import { persistenceRuntime } from "@/lib/store/persistence";
import { STORAGE_KEY } from "@/lib/storage-keys";

describe("touch-device first-visit umlaut tolerance default", () => {
  it("returns true for first-time visitors on coarse-pointer touch devices", () => {
    const coarseMatchMedia = (query: string) => ({ matches: query === "(pointer: coarse)" });
    expect(shouldDefaultTouchUmlautTolerance(false, coarseMatchMedia)).toBe(true);
  });

  it("returns false for desktop / fine-pointer devices or missing matchMedia", () => {
    const fineMatchMedia = () => ({ matches: false });
    expect(shouldDefaultTouchUmlautTolerance(false, fineMatchMedia)).toBe(false);
    expect(shouldDefaultTouchUmlautTolerance(false, null)).toBe(false);
  });

  it("never overrides returning users who already have saved progress", () => {
    const coarseMatchMedia = () => ({ matches: true });
    expect(shouldDefaultTouchUmlautTolerance(true, coarseMatchMedia)).toBe(false);
  });

  it("handles matchMedia throwing gracefully", () => {
    const throwingMatchMedia = () => {
      throw new Error("matchMedia unsupported");
    };
    expect(shouldDefaultTouchUmlautTolerance(false, throwingMatchMedia)).toBe(false);
  });

  describe("hydrateFromStorage integration", () => {
    const originalWindow = globalThis.window;
    const originalLocalStorage = globalThis.localStorage;

    beforeEach(() => {
      useAppStore.getState().resetSettings();
      persistenceRuntime.hasHydratedFromStorage = false;
      persistenceRuntime.hasAutoOpenedOnboarding = false;
      persistenceRuntime.bootSavedState = null;
      persistenceRuntime.lastSerialized = "";
    });

    afterEach(() => {
      if (originalWindow === undefined) {
        // @ts-expect-error restoring undefined window in node test env
        delete globalThis.window;
      } else {
        globalThis.window = originalWindow;
      }
      if (originalLocalStorage === undefined) {
        // @ts-expect-error restoring undefined localStorage in node test env
        delete globalThis.localStorage;
      } else {
        globalThis.localStorage = originalLocalStorage;
      }
      useAppStore.getState().resetSettings();
      persistenceRuntime.hasHydratedFromStorage = false;
      persistenceRuntime.hasAutoOpenedOnboarding = false;
      persistenceRuntime.bootSavedState = null;
    });

    it("enables lazyMode and umlautTolerance on first visit on a coarse-pointer device", () => {
      const storage = new Map<string, string>();
      const fakeWindow = {
        matchMedia: (query: string) => ({ matches: query === "(pointer: coarse)" }),
        localStorage: {
          getItem: (k: string) => storage.get(k) ?? null,
          setItem: (k: string, v: string) => {
            storage.set(k, v);
          },
          removeItem: (k: string) => {
            storage.delete(k);
          },
        },
        document: {
          cookie: "",
          documentElement: {
            style: { setProperty: () => {} },
            setAttribute: () => {},
            removeAttribute: () => {},
            classList: { add: () => {}, remove: () => {}, toggle: () => {} },
          },
          querySelector: () => null,
        },
      };
      // @ts-expect-error minimal browser stub for node environment
      globalThis.window = fakeWindow;
      // @ts-expect-error minimal localStorage stub for node environment
      globalThis.localStorage = fakeWindow.localStorage;

      useAppStore.getState().hydrateFromStorage();
      expect(useAppStore.getState().settings.lazyMode).toBe(true);
      expect(useAppStore.getState().tolerance.umlautTolerance).toBe(true);
    });

    it("preserves saved lazyMode: false on a coarse-pointer device", () => {
      const storage = new Map<string, string>();
      storage.set(
        STORAGE_KEY,
        JSON.stringify({
          settings: { lazyMode: false },
          tolerance: { umlautTolerance: false },
        })
      );
      const fakeWindow = {
        matchMedia: (query: string) => ({ matches: query === "(pointer: coarse)" }),
        localStorage: {
          getItem: (k: string) => storage.get(k) ?? null,
          setItem: (k: string, v: string) => {
            storage.set(k, v);
          },
          removeItem: (k: string) => {
            storage.delete(k);
          },
        },
        document: {
          cookie: "",
          documentElement: {
            style: { setProperty: () => {} },
            setAttribute: () => {},
            removeAttribute: () => {},
            classList: { add: () => {}, remove: () => {}, toggle: () => {} },
          },
          querySelector: () => null,
        },
      };
      // @ts-expect-error minimal browser stub for node environment
      globalThis.window = fakeWindow;
      // @ts-expect-error minimal localStorage stub for node environment
      globalThis.localStorage = fakeWindow.localStorage;

      useAppStore.getState().hydrateFromStorage();
      expect(useAppStore.getState().settings.lazyMode).toBe(false);
      expect(useAppStore.getState().tolerance.umlautTolerance).toBe(false);
    });
  });
});
