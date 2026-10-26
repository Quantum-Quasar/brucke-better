import { describe, it, expect } from "vitest";
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
