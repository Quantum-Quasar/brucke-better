// Deterministic shuffle helpers shared by the exercise engine and every widget
// that arranges tiles. Kept out of ExerciseWidgets.tsx on purpose: the lesson
// reader and the twist card import these, and importing them from the widget
// module pulled the whole exercise engine into the lesson route's initial chunk.

import { hashSeed, seededShuffle } from "@/lib/prng";

type LanguageId = "de" | "fr" | "es" | "nl";

/**
 * Common non-noun sentence starters scoped by language whose capitalization
 * only marks sentence position. Lowercasing them in word banks prevents the
 * opening tile from giving itself away while leaving German nouns (e.g. Morgen,
 * Dank, Haar) and formal Ihr capitalized.
 */
const SENTENCE_STARTER_LOWERCASE: Record<LanguageId, ReadonlySet<string>> = {
  de: new Set([
    "ich", "wir", "du", "er", "es", "man",
    "der", "die", "das", "den", "dem", "des",
    "ein", "eine", "einen", "einem", "einer", "eines",
    "mein", "meine", "meinen", "dein", "deine", "unser", "unsere",
    "heute", "gestern", "jetzt", "hier", "dort", "dann", "bald", "oft", "immer", "schon", "noch",
    "wann", "wo", "warum", "wie", "was", "wer", "welcher", "welche",
    "ja", "nein", "bitte", "danke", "hallo", "guten", "sehr", "zu",
    "kann", "können", "will", "wollen", "muss", "müssen", "soll", "sollen", "mag", "mögen", "möchte", "möchten",
    "bin", "bist", "ist", "sind", "seid", "war", "waren", "habe", "hast", "hat", "haben", "habt",
    "nicht", "kein", "keine", "keinen", "auch", "aber", "oder", "und", "denn", "weil", "wenn", "dass", "ob",
    "auf", "in", "im", "am", "an", "mit", "für", "von", "vom", "nach", "bei", "seit", "vor", "über", "unter",
  ]),
  fr: new Set([
    "je", "j'ai", "j'aime", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles",
    "le", "la", "les", "l'", "un", "une", "des", "ce", "c'est", "mon", "ma", "mes", "ton", "ta", "tes",
    "oui", "non", "merci", "bonjour", "salut", "pourquoi", "quand", "où", "comment", "qui", "que", "qu'est-ce",
    "aujourd'hui", "demain", "hier", "maintenant", "ici", "là", "très", "ne", "n'", "pas", "et", "ou", "mais",
  ]),
  es: new Set([
    "yo", "tú", "él", "ella", "usted", "nosotros", "nosotras", "vosotros", "ellos", "ellas", "ustedes",
    "el", "la", "los", "las", "mi", "mis", "su", "sus", "este", "esta", "esto",
    "sí", "no", "hola", "gracias", "por", "para", "con", "sin", "hoy", "mañana", "ayer", "ahora", "aquí",
    "qué", "quién", "dónde", "cuándo", "cómo", "cuánto", "porque", "pero", "y",
  ]),
  nl: new Set([
    "ik", "jij", "je", "u", "hij", "zij", "ze", "wij", "we", "jullie",
    "het", "de", "een", "dit", "dat", "deze", "mijn", "jouw", "zijn", "haar", "ons", "onze",
    "ja", "nee", "hallo", "dank", "vandaag", "morgen", "gisteren", "nu", "hier", "daar",
    "wie", "wat", "waar", "wanneer", "waarom", "hoe", "niet", "geen", "en", "of", "maar", "omdat", "als",
  ]),
};

function resolveLanguageId(languageId?: string): LanguageId {
  if (languageId === "fr" || languageId === "es" || languageId === "nl" || languageId === "de") {
    return languageId;
  }
  return "de";
}

export function lowercaseSentenceStarterTiles(items: string[], languageId: string = "de"): string[] {
  const starters = SENTENCE_STARTER_LOWERCASE[resolveLanguageId(languageId)];
  return items.map((item) => {
    const lower = item.toLowerCase();
    if (item !== lower && starters.has(lower)) {
      return lower;
    }
    return item;
  });
}

/**
 * Capitalize the first character of an assembled tile answer when the target
 * sentence starts with an uppercase letter, so lowercased sentence-starter tiles
 * grade "exact" rather than "almost".
 */
export function capitalizeAssembledTileAnswer(answer: string, target: string): string {
  const trimmedTarget = target.trim();
  if (!answer || !trimmedTarget) return answer;
  const targetFirst = trimmedTarget[0];
  if (targetFirst === targetFirst.toUpperCase() && targetFirst !== targetFirst.toLowerCase()) {
    return answer[0].toUpperCase() + answer.slice(1);
  }
  return answer;
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
