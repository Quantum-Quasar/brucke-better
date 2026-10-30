// Deterministic shuffle helpers shared by the exercise engine and every widget
// that arranges tiles. Kept out of ExerciseWidgets.tsx on purpose: the lesson
// reader and the twist card import these, and importing them from the widget
// module pulled the whole exercise engine into the lesson route's initial chunk.

import { hashSeed, seededShuffle } from "@/lib/prng";

/**
 * Deterministically shuffle a tile or word bank so that pressing 1, 2, 3... in
 * left-to-right order never trivially reproduces the target answer.
 */
export function arrangeTilesDeterministically(
  items: string[],
  seedKey: string,
  targetAnswer: string
): string[] {
  if (items.length <= 1) return [...items];
  const targetClean = targetAnswer.replace(/[.,!?;:¿¡]+/g, "").trim().toLowerCase();
  const targetWords = targetClean.split(/\s+/).filter(Boolean);

  const isTrivialOrder = (candidate: string[]): boolean => {
    const candLower = candidate.map((c) => c.replace(/^-/, "").toLowerCase());
    if (
      targetWords.length >= 2 &&
      candLower.length >= targetWords.length &&
      candLower.slice(0, targetWords.length).join(" ") === targetWords.join(" ")
    ) {
      return true;
    }
    const joinedPrefix = candLower.join("");
    const targetNoSpace = targetClean.replace(/\s+/g, "");
    if (joinedPrefix.startsWith(targetNoSpace) && targetNoSpace.length >= 2) {
      return true;
    }
    return false;
  };

  const baseSeed = hashSeed(seedKey);
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = seededShuffle(items, baseSeed + attempt * 0x9e3779b9);
    if (!isTrivialOrder(candidate)) {
      return candidate;
    }
  }
  // Fallback swap of the first two distinct elements
  const fallback = [...items];
  for (let i = 1; i < fallback.length; i++) {
    if (fallback[i].toLowerCase() !== fallback[0].toLowerCase()) {
      [fallback[0], fallback[i]] = [fallback[i], fallback[0]];
      break;
    }
  }
  return fallback;
}
