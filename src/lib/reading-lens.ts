import type { CompendiumData, FalseFriend, MasteryState, WordEntity } from "./types";
import { GERMAN_FUNCTION_WORDS } from "./word-token-resolver";

export type ReadingTokenStatus = "mastered" | "encountered" | "in-course" | "unknown";

export interface ReadingToken {
  index: number;
  kind: "word" | "separator";
  raw: string;
  normalized: string;
  status: ReadingTokenStatus;
  word: WordEntity | null;
  falseFriend: FalseFriend | null;
}

export interface ReadingAnalysis {
  tokens: ReadingToken[];
  totalWords: number;
  masteredCount: number;
  encounteredCount: number;
  inCourseCount: number;
  unknownCount: number;
  falseFriendCount: number;
  /** Percentage (0–100) of content word tokens that are mastered or encountered by the learner. */
  coveragePercent: number;
  /** Percentage (0–100) of content word tokens recognized in the active language's compendium. */
  courseMatchPercent: number;
  /** Unique false friends detected in the passage, in order of appearance. */
  detectedFalseFriends: FalseFriend[];
}

export interface ReadingSample {
  id: string;
  languageId: string;
  title: string;
  level: string;
  text: string;
}

export const READING_SAMPLES: Record<string, ReadingSample[]> = {
  de: [
    {
      id: "de-cafe",
      languageId: "de",
      title: "Ein Morgen im Café",
      level: "A1",
      text: "Guten Morgen! Ich trinke heute Kaffee und ein Glas Wasser mit meinem Bruder. Wir essen warmes Brot und lernen Deutsch. Aktuell bekomme ich viele Nachrichten auf mein Handy, weil mein Chef heute früh fragt.",
    },
    {
      id: "de-berlin",
      languageId: "de",
      title: "Unterwegs in Berlin",
      level: "A2",
      text: "Am Montag nehme ich den Zug in die Stadt. Ich lese ein Buch über eine alte Fabrik neben dem Gymnasium. Ein Freund gibt mir einen guten Rat: Vorsicht vor Gift in alten Geschichten!",
    },
    {
      id: "de-alltag",
      languageId: "de",
      title: "Pläne für morgen",
      level: "A1–A2",
      text: "Morgen kann ich früh kommen und mit dir sprechen. Mein Hund ist sehr brav und wartet vor der Tür. Nach der Arbeit gehen wir durch die Straße nach Hause.",
    },
  ],
  fr: [
    {
      id: "fr-cafe",
      languageId: "fr",
      title: "Un matin au café",
      level: "A1",
      text: "Bonjour! Je veux un café et un peu de gâteau. Actuellement, je dois attendre mon ami avant de demander la confirmation de notre réservation.",
    },
    {
      id: "fr-tradition",
      languageId: "fr",
      title: "Une grande tradition",
      level: "A2",
      text: "Dans cette organisation, la tradition et la collection ont une grande importance. Tu peux assister à la présentation et donner ton opinion sans complication.",
    },
  ],
  es: [
    {
      id: "es-cafe",
      languageId: "es",
      title: "Una mañana en el café",
      level: "A1",
      text: "¡Hola! Yo quiero un café y un poco de pastel. Actualmente busco un libro en la librería y espero tener éxito con mi reservación.",
    },
    {
      id: "es-ciudad",
      languageId: "es",
      title: "La confirmación",
      level: "A2",
      text: "La organización mantiene una tradición importante. Tú puedes asistir a la presentación, revisar la confirmación y compartir tu opinión.",
    },
  ],
  nl: [
    {
      id: "nl-cafe",
      languageId: "nl",
      title: "Koffie en brood",
      level: "A1",
      text: "Ik drink water en eet brood met een kop koffie en een beetje room. Mijn broer gaat mij morgen bellen over het boek.",
    },
    {
      id: "nl-wandeling",
      languageId: "nl",
      title: "Bij het water",
      level: "A1–A2",
      text: "Wij zien een groot schip op het water en een klein dier bij het huis. Hij heeft een boek in zijn hand, maar het is niet zwaar.",
    },
  ],
};

export function getReadingSamples(languageId: string): ReadingSample[] {
  return READING_SAMPLES[languageId] ?? READING_SAMPLES.de;
}

const LEADING_ARTICLE_RE = /^(?:der|die|das|den|dem|des|ein|eine|le|la|les|un|une|el|los|las|de|het|een)\s+/i;
export const FRENCH_ELISION_RE = /^(?:l|d|j|m|t|s|n|c|qu|jusqu|lorsqu|puisqu|quelqu)['’](.+)$/i;
const TOKEN_SPLIT_RE = /([\p{L}]+(?:['’-][\p{L}]+)*)/gu;
const FUNCTION_WORD_SET = new Set(GERMAN_FUNCTION_WORDS);

/** Normalize a surface word for case-insensitive matching. */
export function normalizeReadingToken(raw: string): string {
  return raw.normalize("NFC").trim().toLocaleLowerCase();
}

function stripLeadingArticle(phrase: string): string {
  return phrase.normalize("NFC").trim().replace(LEADING_ARTICLE_RE, "").trim();
}

function stripElision(token: string): string {
  const match = FRENCH_ELISION_RE.exec(token);
  return match ? match[1] : token;
}

/** Generate candidate lookup keys for a single token (exact match first, then light inflectional fallbacks). */
function candidateKeys(normalized: string): string[] {
  const base = stripElision(normalized);
  const candidates: string[] = [normalized];
  if (base !== normalized) candidates.push(base);

  if (base.length >= 4) {
    // Simple inflected verb/noun fallbacks (e.g., trinke -> trinken, lerne -> lernen, komme -> kommen)
    if (base.endsWith("e")) {
      candidates.push(`${base}n`);
      candidates.push(base.slice(0, -1));
    } else if (base.endsWith("st") && base.length >= 5) {
      candidates.push(`${base.slice(0, -2)}en`);
    } else if (base.endsWith("t") && base.length >= 4) {
      candidates.push(`${base.slice(0, -1)}en`);
    } else if (base.endsWith("s") && base.length >= 4) {
      candidates.push(base.slice(0, -1));
    } else if (base.endsWith("en") && base.length >= 5) {
      candidates.push(base.slice(0, -2));
      candidates.push(base.slice(0, -1));
    } else if (base.endsWith("n") && base.length >= 4) {
      candidates.push(base.slice(0, -1));
    }
  }

  return Array.from(new Set(candidates));
}

interface LookupMaps {
  wordByExactCase: Map<string, WordEntity>;
  wordByKey: Map<string, WordEntity>;
  falseFriendByExactCase: Map<string, FalseFriend>;
  falseFriendByKey: Map<string, FalseFriend>;
}

const lookupMapsCache = new WeakMap<CompendiumData, LookupMaps>();

function buildLookupMaps(compendium: CompendiumData): LookupMaps {
  const cached = lookupMapsCache.get(compendium);
  if (cached) return cached;

  const wordByExactCase = new Map<string, WordEntity>();
  const wordByKey = new Map<string, WordEntity>();
  for (const word of compendium.wordList) {
    // Skip synthetic article/sentence drill entities so real vocabulary wins.
    if (/^(article_|sentence_|compound_|trap_)/.test(word.id)) continue;
    const exactRaw = word.target_word.normalize("NFC").trim();
    if (exactRaw && !wordByExactCase.has(exactRaw)) {
      wordByExactCase.set(exactRaw, word);
    }
    const exactStripped = stripLeadingArticle(word.target_word);
    if (exactStripped && !wordByExactCase.has(exactStripped)) {
      wordByExactCase.set(exactStripped, word);
    }
    const raw = normalizeReadingToken(word.target_word);
    if (raw && !wordByKey.has(raw)) {
      wordByKey.set(raw, word);
    }
    const stripped = normalizeReadingToken(stripLeadingArticle(word.target_word));
    if (stripped && !wordByKey.has(stripped)) {
      wordByKey.set(stripped, word);
    }
    // Also index single-word accepted alternatives if present.
    for (const alt of word.accepted_answers ?? []) {
      const altExact = stripLeadingArticle(alt);
      if (altExact && !altExact.includes(" ") && !wordByExactCase.has(altExact)) {
        wordByExactCase.set(altExact, word);
      }
      const altNorm = normalizeReadingToken(stripLeadingArticle(alt));
      if (altNorm && !altNorm.includes(" ") && !wordByKey.has(altNorm)) {
        wordByKey.set(altNorm, word);
      }
    }
  }

  const falseFriendByExactCase = new Map<string, FalseFriend>();
  const falseFriendByKey = new Map<string, FalseFriend>();
  for (const ff of compendium.falseFriends) {
    const exactRaw = ff.german_word.normalize("NFC").trim();
    const exactStripped = stripLeadingArticle(ff.german_word);
    const exactHead = exactStripped.split(/\s+/)[0] ?? "";
    for (const key of [exactRaw, exactStripped, exactHead]) {
      if (key && !falseFriendByExactCase.has(key)) {
        falseFriendByExactCase.set(key, ff);
      }
    }
    const raw = normalizeReadingToken(ff.german_word);
    const stripped = normalizeReadingToken(stripLeadingArticle(ff.german_word));
    // For multi-word false friends like "assister à", also index the head word.
    const headWord = stripped.split(/\s+/)[0] ?? "";
    for (const key of [raw, stripped, headWord]) {
      if (key && !falseFriendByKey.has(key)) {
        falseFriendByKey.set(key, ff);
      }
    }
  }

  const maps: LookupMaps = {
    wordByExactCase,
    wordByKey,
    falseFriendByExactCase,
    falseFriendByKey,
  };
  lookupMapsCache.set(compendium, maps);
  return maps;
}

function lookupWord(
  maps: LookupMaps,
  raw: string,
  normalized: string,
  isSentenceStart: boolean
): WordEntity | null {
  const exactTrimmed = raw.normalize("NFC").trim();
  const exactBase = stripElision(exactTrimmed);
  // Try case-sensitive lookup first (e.g., German noun vs adverb distinction).
  const exactMatch =
    maps.wordByExactCase.get(exactTrimmed) ??
    (exactBase !== exactTrimmed ? maps.wordByExactCase.get(exactBase) : undefined);
  if (exactMatch) return exactMatch;

  // For mid-sentence capitalized tokens in German (e.g. "Guten Morgen"), avoid matching
  // a strictly lowercase adverb/function entry when no capitalized noun entry exists.
  const isCapitalizedMidSentence =
    !isSentenceStart &&
    exactTrimmed.length > 0 &&
    exactTrimmed[0] !== exactTrimmed[0].toLocaleLowerCase() &&
    exactTrimmed.slice(1) === exactTrimmed.slice(1).toLocaleLowerCase();

  for (const key of candidateKeys(normalized)) {
    const found = maps.wordByKey.get(key);
    if (!found) continue;
    if (isCapitalizedMidSentence) {
      const targetStripped = stripLeadingArticle(found.target_word);
      const targetIsLower =
        targetStripped.length > 0 &&
        targetStripped[0] === targetStripped[0].toLocaleLowerCase();
      if (targetIsLower) continue;
    }
    return found;
  }
  return null;
}

function lookupFalseFriend(maps: LookupMaps, raw: string, normalized: string): FalseFriend | null {
  // Exact/authored keys only — never apply loose suffix-stripping fallbacks to false friends
  // (prevents false positives like Fasten -> fast or raten -> rat).
  const exactTrimmed = raw.normalize("NFC").trim();
  const exactBase = stripElision(exactTrimmed);
  const exactMatch =
    maps.falseFriendByExactCase.get(exactTrimmed) ??
    (exactBase !== exactTrimmed ? maps.falseFriendByExactCase.get(exactBase) : undefined);
  if (exactMatch) return exactMatch;

  const base = stripElision(normalized);
  return (
    maps.falseFriendByKey.get(normalized) ??
    (base !== normalized ? maps.falseFriendByKey.get(base) : undefined) ??
    null
  );
}

/**
 * Tokenize a target-language passage and classify each word against the active
 * language's compendium and the learner's mastery state.
 */
export function analyzeReadingText(
  text: string,
  compendium: CompendiumData,
  wordMastery: Record<string, MasteryState>
): ReadingAnalysis {
  if (!text) {
    return {
      tokens: [],
      totalWords: 0,
      masteredCount: 0,
      encounteredCount: 0,
      inCourseCount: 0,
      unknownCount: 0,
      falseFriendCount: 0,
      coveragePercent: 0,
      courseMatchPercent: 0,
      detectedFalseFriends: [],
    };
  }

  const maps = buildLookupMaps(compendium);
  const normalizedText = text.normalize("NFC");
  const parts = normalizedText.split(TOKEN_SPLIT_RE);
  const tokens: ReadingToken[] = [];

  let totalWords = 0;
  let masteredCount = 0;
  let encounteredCount = 0;
  let inCourseCount = 0;
  let unknownCount = 0;
  let falseFriendCount = 0;
  let isSentenceStart = true;
  const seenFalseFriendIds = new Set<string>();
  const detectedFalseFriends: FalseFriend[] = [];

  parts.forEach((part, index) => {
    if (!part) return;
    const isWord = /[\p{L}]/u.test(part);
    if (!isWord) {
      if (/[.!?\n]/.test(part)) {
        isSentenceStart = true;
      }
      tokens.push({
        index,
        kind: "separator",
        raw: part,
        normalized: "",
        status: "unknown",
        word: null,
        falseFriend: null,
      });
      return;
    }

    totalWords += 1;
    const normalized = normalizeReadingToken(part);
    const word = lookupWord(maps, part, normalized, isSentenceStart);
    const falseFriend = lookupFalseFriend(maps, part, normalized);
    isSentenceStart = false;

    let status: ReadingTokenStatus = "unknown";
    if (word) {
      const mastery = wordMastery[word.id];
      if (mastery === "mastered") {
        status = "mastered";
        masteredCount += 1;
      } else if (mastery === "encountered" || mastery === "explored") {
        status = "encountered";
        encounteredCount += 1;
      } else {
        status = "in-course";
        inCourseCount += 1;
      }
    } else if (!FUNCTION_WORD_SET.has(normalized)) {
      unknownCount += 1;
    }

    if (falseFriend) {
      falseFriendCount += 1;
      if (!seenFalseFriendIds.has(falseFriend.id)) {
        seenFalseFriendIds.add(falseFriend.id);
        detectedFalseFriends.push(falseFriend);
      }
    }

    tokens.push({
      index,
      kind: "word",
      raw: part,
      normalized,
      status,
      word,
      falseFriend,
    });
  });

  const knownCount = masteredCount + encounteredCount;
  const courseMatchedCount = knownCount + inCourseCount;
  const denominator = courseMatchedCount + unknownCount;
  const coveragePercent = denominator > 0 ? Math.round((knownCount / denominator) * 100) : 0;
  const courseMatchPercent = denominator > 0 ? Math.round((courseMatchedCount / denominator) * 100) : 0;

  return {
    tokens,
    totalWords,
    masteredCount,
    encounteredCount,
    inCourseCount,
    unknownCount,
    falseFriendCount,
    coveragePercent,
    courseMatchPercent,
    detectedFalseFriends,
  };
}
