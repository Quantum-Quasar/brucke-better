import { describe, expect, it } from "vitest";
import {
  arrangeTilesDeterministically,
  hashSeed,
  seededShuffle,
} from "@/components/lesson/exercise-tiles";

// These helpers moved out of ExerciseWidgets so the lesson route does not load
// the exercise engine before practice. They are deterministic and SSR-safe, so
// their exact output is part of the contract: a changed hash or shuffle would
// reorder every learner's tiles between renders.

describe("exercise tile helpers", () => {
  it("hashes to a stable uint32", () => {
    expect(hashSeed("arm")).toBe(946808757);
    expect(hashSeed("arm")).toBe(hashSeed("arm"));
    expect(hashSeed("arm")).not.toBe(hashSeed("hand"));
    expect(hashSeed("")).toBeGreaterThanOrEqual(0);
  });

  it("shuffles deterministically without mutating the input", () => {
    const input = ["a", "b", "c", "d", "e"];
    const shuffled = seededShuffle(input, 42);

    expect(input).toEqual(["a", "b", "c", "d", "e"]);
    expect(shuffled).toEqual(["a", "e", "c", "b", "d"]);
    expect(seededShuffle(input, 42)).toEqual(shuffled);
    expect([...shuffled].sort()).toEqual([...input].sort());
  });

  it("breaks a trivially correct tile order", () => {
    // pressing the tiles left to right would otherwise spell "danken"
    expect(arrangeTilesDeterministically(["dank", "en"], "x", "danken")).toEqual([
      "en",
      "dank",
    ]);
    expect(arrangeTilesDeterministically(["a"], "x", "a")).toEqual(["a"]);
  });

  it("breaks a trivially correct word order", () => {
    // the authored word bank starts in the target order
    expect(
      arrangeTilesDeterministically(["ich", "lerne", "deutsch"], "y", "ich lerne deutsch")
    ).toEqual(["ich", "deutsch", "lerne"]);
  });
});
