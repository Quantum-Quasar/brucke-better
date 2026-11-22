import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from "vitest";
import { SoundEngine } from "../lib/sound";

describe("SoundEngine Cache Bounds & Memory Protection", () => {
  let engine: SoundEngine;

  beforeAll(() => {
    (globalThis as any).window = globalThis;
  });

  afterAll(() => {
    delete (globalThis as any).window;
  });

  beforeEach(() => {
    engine = new SoundEngine();
  });

  it("enforces maximum buffer cache limit of 24 and evicts oldest buffers", async () => {
    // Mock decodeAudioData on fake context
    const mockCtx = {
      decodeAudioData: vi.fn().mockResolvedValue({ length: 100, duration: 0.1 } as unknown as AudioBuffer),
    };
    (engine as any).audioCtx = mockCtx;

    // Mock fetch
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(10)),
    } as unknown as Response);

    // Load 30 sound buffers
    for (let i = 1; i <= 30; i++) {
      await engine.loadBuffer(`/sounds/click1/${i}.mp3`);
    }

    expect(engine.getCacheSize()).toBeLessThanOrEqual(24);
    // Buffer 1 should have been evicted
    expect(engine.hasBuffer(`/sounds/click1/1.mp3`)).toBe(false);
    // Buffer 30 must be present
    expect(engine.hasBuffer(`/sounds/click1/30.mp3`)).toBe(true);
  });

  it("negatively caches failed URLs to prevent repeated network fetch storms on typing", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } as unknown as Response);
    globalThis.fetch = fetchSpy;

    const mockCtx = {
      decodeAudioData: vi.fn(),
    };
    (engine as any).audioCtx = mockCtx;

    // Trigger 10 rapid keystroke buffer loads on missing sound
    for (let i = 0; i < 10; i++) {
      await engine.loadBuffer("/sounds/missing.mp3");
    }

    // Should only attempt fetch once due to negative caching
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
