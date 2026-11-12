import type { WordEntity } from "./types";

export const GERMAN_FUNCTION_WORDS = [
  "ich", "du", "er", "sie", "es", "wir", "ihr", "mich", "dich", "ihn", "dir", "mir", "ihm", "ihnen",
  "der", "die", "das", "den", "dem", "ein", "eine", "einen", "einem", "einer", "kein", "keine", "keinen",
  "mein", "meine", "meinen", "dein", "deine", "ist", "bin", "bist", "sind", "war", "waren", "hat", "habe", "haben", "hatte",
  "gibt", "und", "oder", "aber", "weil", "dass", "wenn", "als", "wie", "nicht", "ja", "nein", "bitte", "danke", "sehr", "gut", "hier",
  "in", "an", "auf", "aus", "bei", "mit", "nach", "von", "zu", "zum", "zur", "vor", "im", "am", "ins", "vom", "beim",
  "durch", "über", "unter", "ohne", "für", "morgen", "heute", "gestern", "früh", "drei", "zwei", "zwölf", "eins",
  "was", "wo", "wer", "wann", "warum", "wohin", "guten", "gute",
];
export function germanTokens(text: string): string[] {
  return text.toLocaleLowerCase("de").match(/[\p{L}]+(?:[-’'][\p{L}]+)*/gu) ?? [];
}
/** Exact taught surfaces only: runtime generation must not infer inflections. */
export function createTaughtTokenResolver(words: WordEntity[], taughtSurfaces: string[]) {
  const known = new Set([...GERMAN_FUNCTION_WORDS, ...words.flatMap((word) => germanTokens(word.target_word)), ...taughtSurfaces.flatMap(germanTokens)]);
  return (text: string) => germanTokens(text).every((token) => known.has(token));
}
