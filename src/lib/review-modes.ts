// ponytail: lean, deterministic review helpers for MCQ distractors and tile morphemes
// including structural word-order distractors for Sentence-Level SRS cards and
// fixed article options for Article & Gender SRS cards.

import type { WordEntity } from "./types";

/**
 * In-place Fisher-Yates array shuffle returning a new shuffled array copy.
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function normalizeSentenceCase(tokens: string[]): string {
  if (tokens.length === 0) return "";
  const copy = [...tokens];
  const first = copy[0];
  if (first && first[0]) {
    copy[0] = first[0].toUpperCase() + first.slice(1);
  }
  return copy.join(" ");
}

/**
 * Generates plausible word-order / syntax permutations of the SAME sentence so
 * that MCQ mode on a sentence card tests sentence structure (e.g. verb-second,
 * Satzklammer, pre-verbal clitic pronouns, ne...pas placement) rather than
 * vocabulary spotting across unrelated sentences.
 */
function generateSentenceStructureDistractors(target: string, count: number): string[] {
  const clean = target.replace(/[.!?;:]+$/, "").replace(/,/g, "").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length < 3) return [];

  const lowerWords = [...words];
  const LOWER_IF_MOVED = new Set([
    "ich", "du", "er", "sie", "es", "wir", "ihr", "der", "die", "das", "den", "dem", "ein", "eine",
    "wie", "wo", "was", "wann", "warum", "ja", "nein", "heute", "morgen", "gestern",
    "je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles", "le", "la", "les", "un", "une", "ne", "non", "oui",
    "yo", "tú", "él", "ella", "nosotros", "ellos", "ellas", "el", "los", "las", "lo", "se", "no", "sí", "hoy",
  ]);
  if (LOWER_IF_MOVED.has(lowerWords[0].toLowerCase())) {
    lowerWords[0] = lowerWords[0].toLowerCase();
  }

  const candidates: string[] = [];

  // 1. Unclosed bracket / English-order trap: pull the final word into slot 2
  if (lowerWords.length >= 4) {
    const englishOrder = [
      lowerWords[0],
      lowerWords[1],
      lowerWords[lowerWords.length - 1],
      ...lowerWords.slice(2, -1),
    ];
    candidates.push(normalizeSentenceCase(englishOrder));
  }

  // 2. Swap slot 1 and slot 2 (violates V2 or pre-verbal clitic pronoun slot)
  if (lowerWords.length >= 3) {
    const swapMid = [...lowerWords];
    [swapMid[1], swapMid[2]] = [swapMid[2], swapMid[1]];
    candidates.push(normalizeSentenceCase(swapMid));
  }

  // 3. Swap the last two words (breaks participle/infinitive/negation tail)
  if (lowerWords.length >= 4) {
    const swapTail = [...lowerWords];
    const n = swapTail.length;
    [swapTail[n - 2], swapTail[n - 1]] = [swapTail[n - 1], swapTail[n - 2]];
    candidates.push(normalizeSentenceCase(swapTail));
  }

  // 4. Swap slot 0 and slot 1 (post-verbal clitic / V1 swap for 3-word clauses)
  if (lowerWords.length >= 3) {
    const swapFront = [...lowerWords];
    [swapFront[0], swapFront[1]] = [swapFront[1], swapFront[0]];
    candidates.push(normalizeSentenceCase(swapFront));
  }

  // 5. Move slot 1 to the end (verb-final main clause error)
  if (lowerWords.length >= 3) {
    const verbEnd = [lowerWords[0], ...lowerWords.slice(2), lowerWords[1]];
    candidates.push(normalizeSentenceCase(verbEnd));
  }

  const unique: string[] = [];
  const targetLower = target.toLowerCase().replace(/,/g, "");
  for (const c of candidates) {
    const cNorm = c.toLowerCase().replace(/,/g, "");
    if (cNorm !== targetLower && !unique.some((u) => u.toLowerCase() === cNorm)) {
      unique.push(c);
      if (unique.length >= count) break;
    }
  }
  return unique;
}

const STRUCTURAL_FOILS: Record<string, string> = {
  // German case/pronoun/auxiliary foils
  den: "der",
  dem: "den",
  der: "den",
  das: "die",
  die: "das",
  ihm: "ihn",
  ihn: "ihm",
  mir: "mich",
  mich: "mir",
  habe: "bin",
  bin: "habe",
  ist: "sind",
  // French clitic/auxiliary/article foils
  le: "lui",
  la: "le",
  lui: "le",
  leur: "les",
  au: "à la",
  du: "de la",
  ai: "suis",
  suis: "ai",
  est: "a",
  // Spanish ser/estar & clitic foils
  lo: "le",
  está: "es",
  es: "está",
  estoy: "soy",
  soy: "estoy",
  he: "estoy",
  se: "le",
};

/**
 * Generate 4 multiple-choice options for a given target word, article, or sentence.
 * - For article cards (`customMcqOptions`), returns the language's 3-4 article choices.
 * - For sentence cards, generates word-order / syntax permutations of the same sentence.
 * - For vocabulary words, prioritizes words from the same sound-shift family.
 */
export function generateMCQOptions(
  targetWord: WordEntity,
  allWords: WordEntity[],
  count: number = 4
): string[] {
  if (targetWord.customMcqOptions && targetWord.customMcqOptions.length > 0) {
    const target = targetWord.target_word;
    const targetLower = target.toLowerCase();
    // The correct option goes first and the slice happens *before* the shuffle,
    // so it can never be truncated away — and never sits at a fixed index
    // (writing it into base[base.length - 1] pinned the answer to the last slot).
    const others = targetWord.customMcqOptions.filter(
      (o) => o.toLowerCase() !== targetLower
    );
    return shuffleArray([target, ...others].slice(0, count));
  }

  const target = targetWord.target_word;
  const distractors: string[] = [];

  if (targetWord.id.startsWith("sentence_") || target.includes(" ")) {
    for (const d of generateSentenceStructureDistractors(target, count - 1)) {
      distractors.push(d);
    }
  }

  // 1. Same sound shift family words first (best linguistic distractors)
  if (distractors.length < count - 1) {
    const sameShift = allWords.filter(
      (w) =>
        w.target_word.toLowerCase() !== target.toLowerCase() &&
        w.sound_shift_ids &&
        targetWord.sound_shift_ids &&
        w.sound_shift_ids.some((id) => targetWord.sound_shift_ids.includes(id))
    );

    for (const w of shuffleArray(sameShift)) {
      if (!distractors.includes(w.target_word)) {
        distractors.push(w.target_word);
        if (distractors.length >= count - 1) break;
      }
    }
  }

  // 2. Fill with other words if we don't have enough same-shift words
  if (distractors.length < count - 1) {
    const remaining = allWords.filter(
      (w) =>
        w.target_word.toLowerCase() !== target.toLowerCase() &&
        !distractors.includes(w.target_word)
    );
    for (const w of shuffleArray(remaining)) {
      distractors.push(w.target_word);
      if (distractors.length >= count - 1) break;
    }
  }

  return shuffleArray([target, ...distractors.slice(0, count - 1)]);
}

/**
 * Splits a word into 2-3 morpheme/syllable tiles (or splits a sentence into word
 * tiles with structural grammatical foils when reviewing sentence-level SRS cards).
 */
export function generateWordTiles(
  targetWord: WordEntity,
  allWords?: WordEntity[]
): {
  tiles: string[];
  targetChunks: string[];
  targetAnswer: string;
} {
  const word = targetWord.target_word;

  // Sentence-level SRS cards: split into word tiles + structural grammatical foils
  if (targetWord.id.startsWith("sentence_") || word.includes(" ")) {
    const cleanSentence = word.replace(/[.!?;:]+$/, "").trim();
    const targetChunks = cleanSentence
      .split(/\s+/)
      .map((t) => t.replace(/[,]+$/, ""))
      .filter(Boolean);
    const distractors: string[] = [];

    for (const chunk of targetChunks) {
      const foil = STRUCTURAL_FOILS[chunk.toLowerCase()];
      if (
        foil &&
        !targetChunks.some((c) => c.toLowerCase() === foil.toLowerCase()) &&
        !distractors.some((d) => d.toLowerCase() === foil.toLowerCase())
      ) {
        distractors.push(foil);
        if (distractors.length >= 2) break;
      }
    }

    const candidateWords = shuffleArray(allWords ?? []);
    for (const w of candidateWords) {
      if (distractors.length >= 2) break;
      const token = w.target_word.split(/\s+/)[0]?.replace(/[.,!?;:]+$/, "");
      if (
        token &&
        !targetChunks.some((c) => c.toLowerCase() === token.toLowerCase()) &&
        !distractors.some((d) => d.toLowerCase() === token.toLowerCase())
      ) {
        distractors.push(token);
      }
    }
    const fallbackDistractors = ["nicht", "heute", "immer", "niet", "vandaag", "altijd", "pas", "très", "hoy", "muy"];
    for (const d of fallbackDistractors) {
      if (distractors.length >= 2) break;
      if (!targetChunks.includes(d) && !distractors.includes(d)) {
        distractors.push(d);
      }
    }
    return {
      tiles: shuffleArray([...targetChunks, ...distractors.slice(0, 2)]),
      targetChunks,
      targetAnswer: cleanSentence,
    };
  }

  let targetChunks: string[] = [];

  // Syllable / morpheme splitting tailored to phonotactics
  if (word.length <= 3) {
    targetChunks = [word.slice(0, 1), word.slice(1)];
  } else if (word.endsWith("en") && word.length >= 5) {
    targetChunks = [word.slice(0, -2), "en"];
  } else if (word.endsWith("el") && word.length >= 5) {
    targetChunks = [word.slice(0, -2), "el"];
  } else if (word.endsWith("er") && word.length >= 5) {
    targetChunks = [word.slice(0, -2), "er"];
  } else if (word.length >= 8) {
    const p1 = Math.floor(word.length / 3);
    const p2 = Math.floor((2 * word.length) / 3);
    targetChunks = [word.slice(0, p1), word.slice(p1, p2), word.slice(p2)];
  } else {
    const mid = Math.ceil(word.length / 2);
    targetChunks = [word.slice(0, mid), word.slice(mid)];
  }

  // Plausible distractors (linguistic suffixes and cognate fragments)
  const distractors: string[] = [];
  const cognate = targetWord.english_cognate ? targetWord.english_cognate.toLowerCase() : "";
  if (cognate && cognate !== word.toLowerCase() && cognate.length >= 3) {
    distractors.push(cognate.slice(-2));
  }

  const commonDistractors = ["st", "ung", "te", "heit", "isch", "ig", "keit"];
  for (const d of commonDistractors) {
    if (!targetChunks.includes(d) && !distractors.includes(d)) {
      distractors.push(d);
      if (distractors.length >= 2) break;
    }
  }

  const allTiles = shuffleArray([...targetChunks, ...distractors.slice(0, 2)]);
  return {
    tiles: allTiles,
    targetChunks,
    targetAnswer: word,
  };
}
