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
import type { ExerciseItem, WordEntity } from "./types";
import { createTaughtTokenResolver, germanTokens } from "./word-token-resolver";

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

export interface SentenceVariationContext {
  languageId: string;
  knownWords: WordEntity[];
  /** Surfaces actually taught in the failed exercise's lesson or already learned. */
  taughtSurfaces: string[];
}

/** Finite, attested conjugation pairs; never synthesize a stem or ending. */
const COPULAS: Record<string, { present: string; past: string }> = {
  ich: { present: "bin", past: "war" }, du: { present: "bist", past: "warst" },
  er: { present: "ist", past: "war" }, sie: { present: "ist", past: "war" },
  es: { present: "ist", past: "war" }, wir: { present: "sind", past: "waren" },
  ihr: { present: "seid", past: "wart" },
};
const SAFE_PREDICATES: Record<string, true> = { hier: true, gut: true, müde: true, bereit: true, krank: true, glücklich: true };

/**
 * Conservative German swings: front a final temporal adverb in a simple V2
 * clause, or transform a short copular clause using attested forms. No generic
 * inflection, subordinate-clause parsing, noun agreement or separable verbs.
 * Unsupported sentences keep their original answer and only shuffle the bank.
 */
export function sentenceReplayVariant(exercise: ExerciseItem, attempt: number, context: SentenceVariationContext): ExerciseItem {
  const fallback = retryVariant(exercise, Math.max(1, attempt));
  const resolves = createTaughtTokenResolver(context.knownWords, context.taughtSurfaces);
  const germanSurface = (item: ExerciseItem) => item.type === "literal_gloss" || item.type === "variant_english" ? item.german ?? "" : item.target_answer;
  const safe = (item: ExerciseItem) => item.type === exercise.type && Boolean(item.target_answer.trim()) &&
    Boolean(germanSurface(item).trim()) && resolves(germanSurface(item)) && (item.word_bank ?? []).every(resolves);
  const authored = (exercise.variants ?? []).filter(safe);
  if (authored.length) return retryVariant({ ...authored[(Math.max(1, attempt) - 1) % authored.length], id: exercise.id, variants: undefined }, attempt);
  if (context.languageId !== "de" || !["transcribe", "syntax_builder"].includes(exercise.type)) return fallback;
  const taught = new Set(context.taughtSurfaces.flatMap(germanTokens));
  const source = exercise.target_answer.trim().replace(/[.!?]$/, "");
  if (!/^[\p{L}\s]+$/u.test(source)) return fallback;
  const tokens = source.split(/\s+/);
  const lower = tokens.map((token) => token.toLocaleLowerCase("de"));
  const pronoun = lower[0];
  const copula = COPULAS[pronoun];
  const candidates: Array<{ answer: string; instruction: string }> = [];
  const capitalize = (value: string) => value.charAt(0).toLocaleUpperCase("de") + value.slice(1);
  if (copula && tokens.length === 3 && lower[1] === copula.present && SAFE_PREDICATES[lower[2]]) {
    for (const [person, forms] of Object.entries(COPULAS)) {
      if (person !== pronoun && taught.has(person) && taught.has(forms.present)) {
        candidates.push({ answer: `${capitalize(person)} ${forms.present} ${tokens[2]}`, instruction: `Express the same state with “${person}” as the subject.` });
      }
    }
    if (taught.has(copula.past)) candidates.push({ answer: `${tokens[0]} ${copula.past} ${tokens[2]}`, instruction: "Express this state in the simple past." });
    if (taught.has("nicht")) candidates.push({ answer: `${tokens[0]} ${tokens[1]} nicht ${tokens[2]}`, instruction: "Negate this state with nicht." });
    if (taught.has("dass")) candidates.push({ answer: `dass ${pronoun} ${tokens[2]} ${tokens[1]}`, instruction: "Make this a dass-clause fragment (put the finite verb last)." });
  }
  if (copula && tokens.length === 3 && ["trinke", "trinkst", "trinkt", "trinken"].includes(lower[1]) &&
      ["wasser", "milch", "tee", "kaffee"].includes(lower[2])) {
    for (const object of ["Wasser", "Milch", "Tee", "Kaffee"]) {
      if (object.toLowerCase() !== lower[2] && taught.has(object.toLowerCase())) {
        candidates.push({ answer: `${tokens[0]} ${tokens[1]} ${object}`, instruction: `Keep the subject and action; replace “${tokens[2]}” with “${object}”.` });
      }
    }
  }
  // Only known non-separable finite verbs and pronoun subjects. A single final
  // time adverb moves as a constituent, leaving verb position two intact.
  const finite: Record<string, true> = { bin: true, bist: true, ist: true, sind: true, habe: true, hast: true, hat: true, haben: true, trinke: true, trinkt: true, trinken: true, esse: true, isst: true, essen: true };
  if (copula && finite[lower[1]] && tokens.length >= 3 && tokens.length <= 6 &&
      ["heute", "morgen", "gestern"].includes(lower.at(-1) ?? "") &&
      !lower.some((token) => ["nicht", "weil", "dass", "wenn", "und", "oder", "auf", "an", "mit"].includes(token))) {
    candidates.push({ answer: `${capitalize(lower.at(-1)!)} ${tokens[1]} ${pronoun}${tokens.length > 3 ? ` ${tokens.slice(2, -1).join(" ")}` : ""}`, instruction: `Start with “${capitalize(lower.at(-1)!)}”; keep the finite verb second.` });
  }
  const valid = candidates.filter((candidate) => resolves(candidate.answer));
  if (!valid.length) return fallback;
  const selected = valid[(Math.max(1, attempt) - 1) % valid.length];
  const answer = selected.answer;
  return retryVariant({
    ...exercise, target_answer: answer, accepted_answers: undefined, variants: undefined,
    prompt: selected.instruction, idea: `${exercise.idea ?? exercise.english_hint ?? source}\n${selected.instruction}`,
    idea_parts: undefined, cues: undefined, english_hint: undefined, shift_hint: undefined, meaning: undefined,
    explanation: selected.instruction, affirmation: "You rebuilt the sentence pattern on a new surface.",
    diagnosis: undefined, word_bank: answer.split(/\s+/),
  }, attempt);
}
