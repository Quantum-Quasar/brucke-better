import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { soundEngine, SOUND_CLICK_OPTIONS, SOUND_ERROR_OPTIONS } from "../lib/sound";

describe("Mechanical Keyboard & Error Audio Engine", () => {
  it("registers all mechanical switch profiles from Monkeytype", () => {
    expect(SOUND_CLICK_OPTIONS.length).toBeGreaterThanOrEqual(18);
    const ids = SOUND_CLICK_OPTIONS.map((s) => s.id);
    expect(ids).toContain("off");
    expect(ids).toContain("4"); // NK Creams
    expect(ids).toContain("5"); // Typewriter
    expect(ids).toContain("17"); // Akko Lavenders
    expect(ids).toContain("18"); // Cherry MX Black ABS
    expect(ids).toContain("20"); // Cherry MX Blue ABS
    expect(ids).toContain("22"); // Cherry MX Brown PBT
    expect(ids).toContain("23"); // Kalih Box White
  });

  it("registers all error audio cue profiles from Monkeytype", () => {
    expect(SOUND_ERROR_OPTIONS.length).toBeGreaterThanOrEqual(5);
    const ids = SOUND_ERROR_OPTIONS.map((e) => e.id);
    expect(ids).toContain("off");
    expect(ids).toContain("1"); // Damage
    expect(ids).toContain("2"); // Triangle
    expect(ids).toContain("3"); // Pop
    expect(ids).toContain("4"); // Hit
  });

  it("handles playClick safely when sound is disabled or volume is 0", async () => {
    // Should resolve without error
    await expect(soundEngine.playClick("off", 0.5)).resolves.toBeUndefined();
    await expect(soundEngine.playClick("18", 0)).resolves.toBeUndefined();
    await expect(soundEngine.playClick("non_existent", 0.5)).resolves.toBeUndefined();
  });

  it("handles playError safely when error cue is disabled or volume is 0", async () => {
    // Should resolve without error
    await expect(soundEngine.playError("off", 0.5)).resolves.toBeUndefined();
    await expect(soundEngine.playError("1", 0)).resolves.toBeUndefined();
    await expect(soundEngine.playError("non_existent", 0.5)).resolves.toBeUndefined();
  });

  it("preloads click sounds without throwing in server/test environments", async () => {
    await expect(soundEngine.preloadClickSound("off")).resolves.toBeUndefined();
    await expect(soundEngine.preloadClickSound("18")).resolves.toBeUndefined();
  });
});

// The switch pack used to be fetched during hydration, i.e. a 34 KB request
// before the learner showed any intent. The preload now waits for the first
// pointer/key interaction; these tests pin the trigger and its one-shot nature.
describe("interaction-gated click preload", () => {
  type Listener = () => void;
  type Globals = { window?: unknown; fetch?: unknown };

  const globals = globalThis as unknown as Globals;
  let listeners: Record<string, Listener[]>;
  let fetches: string[];
  let originalWindow: unknown;
  let originalFetch: unknown;

  beforeEach(() => {
    listeners = { pointerdown: [], keydown: [], touchstart: [] };
    fetches = [];
    originalWindow = globals.window;
    originalFetch = globals.fetch;
    globals.window = {
      addEventListener(type: string, listener: Listener) {
        (listeners[type] ??= []).push(listener);
      },
      removeEventListener(type: string, listener: Listener) {
        listeners[type] = (listeners[type] ?? []).filter((entry) => entry !== listener);
      },
    };
    globals.fetch = async (url: string) => {
      fetches.push(url);
      return { ok: true };
    };
    // `await import()` (not a static import) is deliberate here: the module
    // keeps its listener state in module scope, so each case needs a fresh
    // evaluation to observe the un-attached starting state.
    vi.resetModules();
  });

  afterEach(() => {
    globals.window = originalWindow;
    globals.fetch = originalFetch;
  });

  it("does not fetch until the learner interacts", async () => {
    const { preloadClickSoundOnFirstInteraction } = await import("../lib/sound");
    preloadClickSoundOnFirstInteraction("18");
    expect(fetches).toEqual([]);
    expect(listeners.pointerdown.length).toBe(1);

    listeners.pointerdown[0]();
    await Promise.resolve();
    expect(fetches).toEqual(["/sounds/click18/1.wav"]);
  });

  it("fires once, on whichever interaction comes first, and re-arms for a new pack", async () => {
    const { preloadClickSoundOnFirstInteraction } = await import("../lib/sound");
    preloadClickSoundOnFirstInteraction("18");
    preloadClickSoundOnFirstInteraction("4"); // the newer choice wins

    listeners.keydown[0]();
    await Promise.resolve();
    expect(fetches).toEqual(["/sounds/click4/1.wav"]);

    // the other triggers were removed with the fired one
    expect(listeners.pointerdown).toEqual([]);
    expect(listeners.touchstart).toEqual([]);

    // a later pack choice re-arms the gate instead of being stranded
    preloadClickSoundOnFirstInteraction("18");
    expect(listeners.pointerdown.length).toBe(1);
    listeners.pointerdown[0]();
    await Promise.resolve();
    expect(fetches).toEqual(["/sounds/click4/1.wav", "/sounds/click18/1.wav"]);
  });

  it("is a no-op without a window (server render, node tests)", async () => {
    globals.window = undefined;
    const { preloadClickSoundOnFirstInteraction } = await import("../lib/sound");
    expect(() => preloadClickSoundOnFirstInteraction("18")).not.toThrow();
  });
});
