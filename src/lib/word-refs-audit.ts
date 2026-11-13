// Word-reference integrity check (AGENT_PRECAUTIONS §5.5, extended by the
// Thinking Method upgrade §8): every word_ids / table_word_ids entry must
// resolve against the compendium, and every German token in authored surfaces
// — transcribe (target_answer + word_bank), twist (target_answer + word_bank),
// literal_gloss (german), pronoun_compression, spoken_turn_reply — must resolve
// against the compendium, a vocab_hint, or the closed function-word list below.
//
// Shared by the Vitest integrity suite (src/tests/word-refs.test.ts) and the
// CLI pretty-printer (scripts/audit-word-refs.ts), so `bun run test` and the
// ad-hoc audit can never drift apart.

import { LESSONS } from "../data/lessons";
import { compendium } from "../data/compendium";
import { GERMAN_FUNCTION_WORDS, germanTokens } from "./word-token-resolver";

const compendiumIds = new Set(Object.keys(compendium.words));
const compendiumTargets = new Set(Object.values(compendium.words).map((w) => w.target_word.toLowerCase()));

// Closed-class function words + formula words the trail uses as glue (articles,
// pronouns, prepositions, contractions, greetings). Every entry is either a
// vocab_hint somewhere on the trail or a function word no lesson "teaches".
const FUNCTION_WORDS = new Set(GERMAN_FUNCTION_WORDS);

// vocab hints anywhere on the trail count as introduced words
const hintedWords = new Set<string>();
for (const lesson of LESSONS) {
  for (const ex of lesson.exercises) {
    for (const hint of ex.vocab_hints ?? []) hintedWords.add(hint.word.toLowerCase());
  }
}

function stemOf(id: string): string {
  // crude verb stem: trinken → trink, machen → mach, sagen → sag
  if (id.length > 4 && id.endsWith("en")) return id.slice(0, -2);
  if (id.length > 3 && id.endsWith("n")) return id.slice(0, -1);
  return id;
}

const stems = new Set<string>();
// derive stems from the displayed headword: an id may carry a "#noun" sense tag
for (const word of Object.values(compendium.words)) stems.add(stemOf(word.target_word.toLowerCase()));

// Inflected forms whose letters drift too far from the stem for prefix matching:
// du-forms with vowel change (kannst, willst, hilft, hast), ablaut participles
// (gefunden, fand), and the separable-prefix verb stehen (only aufstehen is on
// the trail). Each maps to a lemma that must itself resolve.
const RESOLVED_FORMS: Record<string, string> = {
  kannst: "können", kann: "können",
  willst: "wollen",
  hast: "haben",
  hilft: "helfen", hilf: "helfen",
  gefunden: "finden", fand: "finden",
  gegessen: "essen",
  stehe: "aufstehen", steht: "aufstehen",
  wachen: "aufwachen",
  genommen: "nehmen", gibst: "geben",
};

function resolveLemma(lemma: string): boolean {
  const l = lemma.toLowerCase();
  return compendiumIds.has(l) || compendiumTargets.has(l);
}

const foldUmlauts = (s: string) => s.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");

/** Single-token German resolution, shared with the naturalness extractor's
 * is-this-German test so both audits agree on what counts as German. */
export function resolves(token: string): boolean {
  const raw = token.toLowerCase().replace(/[.,!?;:]+$/, "");
  if (!raw) return true;
  if (FUNCTION_WORDS.has(raw)) return true;
  if (Object.hasOwn(RESOLVED_FORMS, raw)) return resolveLemma(RESOLVED_FORMS[raw]);
  if (compendiumIds.has(raw) || compendiumTargets.has(raw)) return true;
  if (hintedWords.has(raw)) return true;
  // past participles: ge- + stem + t/en (gelernt, gegessen, gekommen)
  const geStripped = raw.startsWith("ge") && raw.length > 4 ? raw.slice(2) : raw;
  if (geStripped !== raw && (compendiumIds.has(geStripped) || compendiumTargets.has(geStripped))) return true;
  // inflected form of a compendium word: trinke/machst contain the stem
  const t = foldUmlauts(raw);
  const foldedStems = new Set([...stems].map(foldUmlauts));
  const t2 = foldUmlauts(geStripped);
  if (t.length >= 3 && foldedStems.has(t)) return true;
  if (t2.length >= 3 && foldedStems.has(t2)) return true;
  for (const s of foldedStems) {
    if (s.length >= 3 && (t.startsWith(s) || t2.startsWith(s))) return true;
  }
  return false;
}


export interface WordRefMiss {
  lesson: number;
  where: string;
  token: string;
}

/** All unresolved German tokens / word ids across every authored lesson. */
export function findUnresolvedWordRefs(): WordRefMiss[] {
  const misses: WordRefMiss[] = [];

  for (const lesson of LESSONS) {
    for (const wid of [...lesson.word_ids, ...lesson.table_word_ids]) {
      if (!compendiumIds.has(wid.toLowerCase())) {
        misses.push({ lesson: lesson.id, where: "word_ids/table_word_ids", token: wid });
      }
    }
    for (const ex of lesson.exercises) {
      if (ex.type === "transcribe") {
        for (const t of germanTokens([ex.target_answer, ...(ex.accepted_answers ?? [])].join(" "))) {
          if (!resolves(t)) misses.push({ lesson: lesson.id, where: `transcribe ${ex.id} answers`, token: t });
        }
        for (const chip of ex.word_bank ?? []) {
          if (!resolves(chip)) misses.push({ lesson: lesson.id, where: `transcribe ${ex.id} bank`, token: chip });
        }
      }
      if (ex.type === "literal_gloss" && ex.german) {
        for (const t of germanTokens(ex.german)) {
          if (!resolves(t)) misses.push({ lesson: lesson.id, where: `literal_gloss ${ex.id} german`, token: t });
        }
      }
      // TM-6 dictation: the spoken string is the answer, in audio form
      if (ex.type === "dictation") {
        for (const t of germanTokens(ex.spoken ?? ex.target_answer)) {
          if (!resolves(t)) misses.push({ lesson: lesson.id, where: `dictation ${ex.id} spoken`, token: t });
        }
        for (const t of germanTokens(ex.target_answer)) {
          if (!resolves(t)) misses.push({ lesson: lesson.id, where: `dictation ${ex.id} answer`, token: t });
        }
      }
      // TM-6 family_matrix: every cell's German, plus the graded cell
      if (ex.type === "family_matrix") {
        for (const row of ex.cells ?? []) {
          for (const cell of row) {
            for (const t of germanTokens(cell.german)) {
              if (!resolves(t)) misses.push({ lesson: lesson.id, where: `family_matrix ${ex.id} cell`, token: t });
            }
          }
        }
        for (const t of germanTokens(ex.target_answer)) {
          if (!resolves(t)) misses.push({ lesson: lesson.id, where: `family_matrix ${ex.id} answer`, token: t });
        }
      }
      // TM-6 variant_english: the German sentence must be trail-legal
      if (ex.type === "variant_english" && ex.german) {
        for (const t of germanTokens(ex.german)) {
          if (!resolves(t)) misses.push({ lesson: lesson.id, where: `variant_english ${ex.id} german`, token: t });
        }
      }
      // pronoun_compression: full_sentence, target_answer, and word_bank must resolve
      if (ex.type === "pronoun_compression") {
        for (const t of germanTokens(ex.full_sentence ?? "")) {
          if (!resolves(t)) misses.push({ lesson: lesson.id, where: `pronoun_compression ${ex.id} full_sentence`, token: t });
        }
        for (const t of germanTokens(ex.target_answer)) {
          if (!resolves(t)) misses.push({ lesson: lesson.id, where: `pronoun_compression ${ex.id} answer`, token: t });
        }
        for (const chip of ex.word_bank ?? []) {
          if (!resolves(chip)) misses.push({ lesson: lesson.id, where: `pronoun_compression ${ex.id} bank`, token: chip });
        }
      }
      // spoken_turn_reply: spoken_question, target_answer, and word_bank must resolve
      if (ex.type === "spoken_turn_reply") {
        for (const t of germanTokens(ex.spoken_question ?? "")) {
          if (!resolves(t)) misses.push({ lesson: lesson.id, where: `spoken_turn_reply ${ex.id} question`, token: t });
        }
        for (const t of germanTokens(ex.target_answer)) {
          if (!resolves(t)) misses.push({ lesson: lesson.id, where: `spoken_turn_reply ${ex.id} answer`, token: t });
        }
        for (const chip of ex.word_bank ?? []) {
          if (!resolves(chip)) misses.push({ lesson: lesson.id, where: `spoken_turn_reply ${ex.id} bank`, token: chip });
        }
      }
    }
    if (lesson.twist) {
      for (const t of germanTokens(lesson.twist.target_answer)) {
        if (!resolves(t)) misses.push({ lesson: lesson.id, where: "twist answer", token: t });
      }
      for (const chip of lesson.twist.word_bank ?? []) {
        if (!resolves(chip)) misses.push({ lesson: lesson.id, where: "twist bank", token: chip });
      }
    }
  }

  return misses;
}
