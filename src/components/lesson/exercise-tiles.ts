// Deterministic shuffle helpers shared by the exercise engine and every widget
// that arranges tiles. Kept out of ExerciseWidgets.tsx on purpose: the lesson
// reader and the twist card import these, and importing them from the widget
// module pulled the whole exercise engine into the lesson route's initial chunk.

/** Deterministic 32-bit FNV-1a hash — SSR-safe and stable across renders. */
export function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Seeded Fisher-Yates shuffle returning a new array. */
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    const r = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    const j = Math.floor(r * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

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
