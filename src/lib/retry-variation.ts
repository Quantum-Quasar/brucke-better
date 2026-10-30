// ponytail: masked repetition for the retry queue (guidebook §1.7 + §1.9)
//
// The retry queue already re-asks a missed exercise. What it used to do was
// re-present the *identical* surface — same chips in the same order, same options
// in the same slots — which trains short-term memory ("where was the right chip?")
// instead of re-derivation ("what does the law say?"). The guidebook's self-correction
// move is explicit: "ask for the sentence again — not from memory, but thinking it
// through again."
//
// A deterministic shuffle keyed by the attempt number gives every retry a fresh
// surface while the graded answer stays byte-identical. Rotation state lives in
// the caller (the attempt count), never in the store, so a reload re-renders the
// same way it was first shown.

import { hashSeed, seededShuffle } from "@/lib/prng";

/**
 * The same exercise with a fresh surface: word banks, tile options, multiple-choice
 * options, matching pairs, and compressed noun parts are re-ordered deterministically
 * from the attempt number. The graded answer, the cues and the explanation are untouched.
 */
export function retryVariant<T extends { id: string }>(exercise: T, attempt: number): T {
  if (attempt <= 0) return exercise;
  const seed = hashSeed(`${exercise.id}#${attempt}`);
  const next: Record<string, unknown> = { ...exercise };

  if (Array.isArray((exercise as Record<string, unknown>).word_bank)) {
    next.word_bank = seededShuffle((exercise as Record<string, unknown>).word_bank as unknown[], seed);
  }
  if (Array.isArray((exercise as Record<string, unknown>).tile_options)) {
    next.tile_options = seededShuffle(
      (exercise as Record<string, unknown>).tile_options as unknown[],
      seed ^ 0x9e3779b9
    );
  }
  if (Array.isArray((exercise as Record<string, unknown>).options)) {
    next.options = seededShuffle((exercise as Record<string, unknown>).options as unknown[], seed ^ 0x85ebca6b);
  }
  if (Array.isArray((exercise as Record<string, unknown>).matching_pairs)) {
    next.matching_pairs = seededShuffle(
      (exercise as Record<string, unknown>).matching_pairs as unknown[],
      seed ^ 0xc2b2ae35
    );
  }
  if (Array.isArray((exercise as Record<string, unknown>).compressed_parts)) {
    next.compressed_parts = seededShuffle(
      (exercise as Record<string, unknown>).compressed_parts as unknown[],
      seed ^ 0x27d4eb2f
    );
  }
  return next as T;
}

/**
 * The line shown above a retry so the learner knows what is being asked of them.
 * Kept as one short instruction, in the guidebook's "not from memory" wording.
 */
export const RETRY_INTENT_LINE =
  "Same thought, new arrangement. Don't remember where the answer was — work it out again.";
