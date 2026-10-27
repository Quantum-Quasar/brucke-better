import { describe, expect, it } from "vitest";
import { isChunkLoadError } from "@/lib/chunk-errors";

// Deploy races surface as failed dynamic imports. Those need a reload (the
// versioned chunk is gone), not a retry of the same import. Ordinary render
// errors must not be mistaken for them.

describe("chunk load error detection", () => {
  it("recognises the browser and bundler phrasings", () => {
    const cases: unknown[] = [
      Object.assign(new Error("Loading chunk 12 failed"), { name: "ChunkLoadError" }),
      new Error("Failed to fetch dynamically imported module: /_next/static/chunks/x.js"),
      new Error("error loading dynamically imported module"),
      new Error("Importing a module script failed."),
      "dynamically imported module",
    ];

    for (const error of cases) expect(isChunkLoadError(error), String(error)).toBe(true);
  });

  it("does not classify ordinary errors", () => {
    expect(isChunkLoadError(new Error("Cannot read properties of undefined"))).toBe(false);
    expect(isChunkLoadError(new Error("network request failed"))).toBe(false);
    expect(isChunkLoadError(null)).toBe(false);
    expect(isChunkLoadError(undefined)).toBe(false);
    expect(isChunkLoadError(42)).toBe(false);
  });
});
