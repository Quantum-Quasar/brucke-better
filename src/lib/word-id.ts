// Word ids are the lowercased German headword, with an optional part-of-speech
// tag when one lowercased form names two senses:
//   essen           -> to eat (verb)
//   Essen#noun      -> food (noun), id essen#noun
//
// The id is a key in compendium.json, in lesson word_ids, and in saved learner
// state (wordMastery, srsCards, article_<id>). It is never displayed. The
// target_word field carries the display form and its capitalization.

export const WORD_ID_SUFFIXES = ["noun", "verb", "adj", "adv"] as const;
export type WordIdSuffix = (typeof WORD_ID_SUFFIXES)[number];

export const WORD_ID_HINT = `#${WORD_ID_SUFFIXES.join(", #")}`;

export type WordIdCell =
  | { ok: true; headword: string; suffix: WordIdSuffix | null }
  | { ok: false; problem: string };

/** Split a section-2 German cell such as `Essen#noun` into headword and id suffix. */
export function parseWordIdCell(cell: string): WordIdCell {
  const trimmed = cell.trim();
  const parts = trimmed.split("#");
  if (parts.length === 1) {
    if (!trimmed) return { ok: false, problem: "empty word cell" };
    return { ok: true, headword: trimmed, suffix: null };
  }
  if (parts.length > 2) return { ok: false, problem: `expected at most one id suffix in "${trimmed}"` };
  const headword = parts[0].trim();
  const suffix = parts[1].trim();
  if (!headword) return { ok: false, problem: `missing headword before "#${suffix}"` };
  if (!(WORD_ID_SUFFIXES as readonly string[]).includes(suffix)) {
    return { ok: false, problem: `unknown id suffix "#${suffix}" (expected one of ${WORD_ID_HINT})` };
  }
  return { ok: true, headword, suffix: suffix as WordIdSuffix };
}
