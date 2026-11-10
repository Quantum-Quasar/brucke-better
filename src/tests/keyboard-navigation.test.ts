import { describe, it, expect } from "vitest";
import { matchingPairForKey } from "../lib/matching";

describe("Matching keyboard slots", () => {
  it("keeps unmatched pairs on their original keys after an earlier match", () => {
    const pairs = [
      { id: "p1", english: "water", german: "Wasser" },
      { id: "p2", english: "foot", german: "Fuß" },
      { id: "p3", english: "pipe", german: "Pfeife" },
    ];
    expect(matchingPairForKey(pairs, ["p1"], 1)).toBeNull();
    expect(matchingPairForKey(pairs, ["p1"], 2)).toEqual(pairs[1]);
    expect(matchingPairForKey(pairs, ["p1"], 3)).toEqual(pairs[2]);
    expect(matchingPairForKey(pairs, [], 0)).toBeNull();
    expect(matchingPairForKey(pairs, [], 4)).toBeNull();
  });
});
