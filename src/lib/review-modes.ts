// Review helpers use authored sentence MCQ choices, word-family distractors,
// fixed article options, and buildable answer tiles.

import type { WordEntity } from "./types";

type LanguageId = "de" | "fr" | "es" | "nl";

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

const STRUCTURAL_FOILS: Record<LanguageId, Record<string, string>> = {
  de: {
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
  },
  fr: {
    le: "lui",
    la: "le",
    lui: "le",
    leur: "les",
    au: "à la",
    du: "de la",
    ai: "suis",
    suis: "ai",
    est: "a",
  },
  nl: {
    de: "het",
    het: "de",
    heb: "ben",
    ben: "heb",
    hebben: "zijn",
    zijn: "hebben",
    niet: "geen",
    geen: "niet",
  },
  es: {
    lo: "le",
    está: "es",
    es: "está",
    estoy: "soy",
    soy: "estoy",
    he: "estoy",
    se: "le",
  },
};

const FALLBACK_DISTRACTORS: Record<LanguageId, readonly string[]> = {
  de: ["nicht", "heute", "immer"],
  fr: ["pas", "très", "toujours"],
  nl: ["niet", "vandaag", "altijd"],
  es: ["no", "hoy", "muy"],
};

function resolveLanguageId(languageId?: string): LanguageId {
  if (languageId === "fr" || languageId === "es" || languageId === "nl" || languageId === "de") {
    return languageId;
  }
  return "de";
}

/**
 * Generate 4 multiple-choice options for a given target word, article, or sentence.
 * - For article cards (`customMcqOptions`), returns the language's 3-4 article choices.
 * - Sentence cards require authored choices; unsupported MCQ cards return no options.
 * - For vocabulary words, prioritizes words from the same sound-shift family.
 */
export function generateMCQOptions(
  targetWord: WordEntity,
  allWords: WordEntity[],
  count: number = 4
): string[] {
  const isSentence = targetWord.id.startsWith("sentence_");
  if (targetWord.customMcqOptions && targetWord.customMcqOptions.length > 0) {
    const target = targetWord.target_word;
    const targetLower = target.toLowerCase();
    // The correct option goes first and the slice happens *before* the shuffle,
    // so it can never be truncated away — and never sits at a fixed index
    // (writing it into base[base.length - 1] pinned the answer to the last slot).
    const others = targetWord.customMcqOptions.filter(
      (o) => o.toLowerCase() !== targetLower
    );
    const options = [target, ...others].slice(0, count);
    return isSentence && options.length < 2 ? [] : shuffleArray(options);
  }
  if (isSentence) return [];

  const target = targetWord.target_word;
  const distractors: string[] = [];

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
  allWords?: WordEntity[],
  languageId: string = "de"
): {
  tiles: string[];
  targetChunks: string[];
  targetAnswer: string;
} {
  const word = targetWord.target_word;
  const lang = resolveLanguageId(languageId);
  const foils = STRUCTURAL_FOILS[lang];

  // Sentence-level SRS cards: split into word tiles + structural grammatical foils
  if (targetWord.id.startsWith("sentence_") || word.includes(" ")) {
    const cleanSentence = word.replace(/[.!?;:]+$/, "").trim();
    const targetChunks = cleanSentence
      .split(/\s+/)
      .map((t) => t.replace(/[,]+$/, ""))
      .filter(Boolean);
    const distractors: string[] = [];

    for (const chunk of targetChunks) {
      const foil = foils[chunk.toLowerCase()];
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
    const fallbackDistractors = FALLBACK_DISTRACTORS[lang];
    for (const d of fallbackDistractors) {
      if (distractors.length >= 2) break;
      if (
        !targetChunks.some((c) => c.toLowerCase() === d.toLowerCase()) &&
        !distractors.some((existing) => existing.toLowerCase() === d.toLowerCase())
      ) {
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
