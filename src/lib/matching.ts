/**
 * Stable numeric shortcuts for matching-card exercises.
 *
 * A card keeps the number of its position for the whole exercise. Matching a
 * pair only disables that card's number; the remaining cards never renumber,
 * so a learner who has learned "4 is Pfeife" can keep pressing 4 after 1 and 2
 * are gone.
 */
export interface MatchingPairLike {
  id: string;
}

export function matchingPairForKey<T extends MatchingPairLike>(
  pairs: readonly T[],
  matchedIds: readonly string[],
  numKey: number
): T | null {
  if (!Number.isInteger(numKey) || numKey < 1 || numKey > pairs.length) return null;
  const pair = pairs[numKey - 1];
  return pair && !matchedIds.includes(pair.id) ? pair : null;
}
