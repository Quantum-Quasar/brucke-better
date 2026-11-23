import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  readStorageString,
  writeStorageString,
  removeStorageKey,
  readStorageJson,
  writeStorageJson,
} from "@/lib/safe-storage";

function createMemoryStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => { map.set(k, v); },
    removeItem: (k: string) => { map.delete(k); },
    clear: () => map.clear(),
  };
}

describe("safe-storage", () => {
  const origWindow = globalThis.window;

  beforeEach(() => {
    const storage = createMemoryStorage();
    Object.defineProperty(globalThis, "window", {
      value: { localStorage: storage },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    if (origWindow === undefined) {
      Reflect.deleteProperty(globalThis, "window");
    } else {
      Object.defineProperty(globalThis, "window", {
        value: origWindow,
        configurable: true,
        writable: true,
      });
    }
  });

  it("reads, writes, and removes string values safely", () => {
    expect(readStorageString("k1")).toBeNull();
    expect(writeStorageString("k1", "hello")).toBe(true);
    expect(readStorageString("k1")).toBe("hello");
    expect(removeStorageKey("k1")).toBe(true);
    expect(readStorageString("k1")).toBeNull();
  });

  it("reads and writes JSON values and falls back on invalid JSON", () => {
    expect(writeStorageJson("obj", { a: 1, b: "two" })).toBe(true);
    expect(readStorageJson("obj", { a: 0, b: "" })).toEqual({ a: 1, b: "two" });

    window.localStorage.setItem("broken", "{not-json");
    expect(readStorageJson("broken", { ok: false })).toEqual({ ok: false });
  });

  it("returns fallback instead of throwing when storage throws or window is absent", () => {
    Object.defineProperty(globalThis, "window", {
      value: {
        localStorage: {
          getItem: () => { throw new Error("SecurityError"); },
          setItem: () => { throw new Error("QuotaExceededError"); },
          removeItem: () => { throw new Error("SecurityError"); },
        },
      },
      configurable: true,
      writable: true,
    });
    expect(readStorageString("k2")).toBeNull();
    expect(writeStorageString("k2", "val")).toBe(false);
    expect(removeStorageKey("k2")).toBe(false);

    Reflect.deleteProperty(globalThis, "window");
    expect(readStorageString("k2")).toBeNull();
    expect(writeStorageString("k2", "val")).toBe(false);
  });
});
