import type { CompendiumData, Gender, LessonIndexEntry, WordEntity } from "./types";
import { spokenWordEntity, wordWithArticle } from "./gender";
import { hashSeed, seededShuffle } from "./prng";

// ---------------------------------------------------------------------------
// #47 — Weekly Mixed Test generator
// ---------------------------------------------------------------------------

export type WeeklyQuestionKind = "target-to-english" | "english-to-target" | "article";

export interface WeeklyQuizQuestion {
  id: string;
  wordId: string;
  kind: WeeklyQuestionKind;
  prompt: string;
  subPrompt?: string;
  /** Safe audio to play before answering (never leaks the answer). */
  spokenText: string;
  /** Full audio to play after the learner has answered. */
  revealedSpokenText?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface WeeklyQuizResult {
  questions: WeeklyQuizQuestion[];
  usedStarterTopics: boolean;
  topicCount: number;
}

const STARTER_TOPIC_IDS = new Set([1, 2, 3, 4, 5]);

/** Compute an ISO-8601 week key (e.g. "2026-W48") for deterministic weekly quiz seeds. */
export function getIsoWeekKey(date: Date = new Date()): string {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function pickDistractors(
  pool: readonly WordEntity[],
  target: WordEntity,
  extractor: (w: WordEntity) => string,
  seed: number
): string[] {
  const correct = extractor(target).trim();
  const seen = new Set<string>([correct.toLocaleLowerCase()]);
  const distractors: string[] = [];

  for (const candidate of seededShuffle([...pool], seed)) {
    if (candidate.id === target.id) continue;
    const val = extractor(candidate).trim();
    const key = val.toLocaleLowerCase();
    if (!val || seen.has(key)) continue;
    seen.add(key);
    distractors.push(val);
    if (distractors.length === 3) break;
  }
  return distractors;
}

export function articlesForGender(gender: Gender, languageId?: string): string[] {
  if (languageId === "es") return ["el", "la"];
  if (languageId === "fr") return ["le", "la"];
  if (languageId === "nl") return ["de", "het"];
  if (languageId === "de") return ["der", "die", "das"];

  if (gender === "der" || gender === "die" || gender === "das") {
    return ["der", "die", "das"];
  }
  if (gender === "el") return ["el", "la"];
  if (gender === "le" || gender === "la") return ["le", "la"];
  if (gender === "de" || gender === "het") return ["de", "het"];
  return ["der", "die", "das"];
}

/**
 * Generates a 10-question mixed quiz drawn from the learner's completed topics,
 * falling back to starter topics (1–5) when no lessons are completed yet.
 */
export function generateWeeklyMixedTest(
  compendium: CompendiumData,
  lessonIndex: readonly LessonIndexEntry[],
  completedLessons: readonly number[],
  options: { count?: number; seed?: number; languageId?: string } = {}
): WeeklyQuizResult {
  const count = options.count ?? 10;
  const languageId = options.languageId ?? "de";
  const seed = options.seed ?? hashSeed(`${languageId}:${getIsoWeekKey()}`);

  const completedSet = new Set(completedLessons);
  const completedEntries = lessonIndex.filter((l) => completedSet.has(l.id));
  const usedStarterTopics = completedEntries.length === 0;

  const activeEntries = usedStarterTopics
    ? lessonIndex.filter((l) => STARTER_TOPIC_IDS.has(l.id))
    : completedEntries;

  const candidateIds = new Set<string>();
  for (const entry of activeEntries) {
    for (const wordId of entry.word_ids) {
      if (!/^(article_|sentence_|compound_|trap_)/.test(wordId)) {
        candidateIds.add(wordId);
      }
    }
  }

  const candidateWords = Array.from(candidateIds)
    .map((id) => compendium.words[id])
    .filter((w): w is WordEntity => Boolean(w && w.target_word && w.english_meaning));

  // Fallback to real compendium words if the selected lessons have fewer than `count` words
  const allRealWords = compendium.wordList.filter(
    (w) => !/^(article_|sentence_|compound_|trap_)/.test(w.id) && w.target_word && w.english_meaning
  );

  if (candidateWords.length < count) {
    const existing = new Set(candidateWords.map((w) => w.id));
    for (const w of allRealWords) {
      if (!existing.has(w.id)) {
        candidateWords.push(w);
        existing.add(w.id);
      }
      if (candidateWords.length >= count * 2) break;
    }
  }

  const chosen = seededShuffle(candidateWords, seed).slice(0, count);
  const distractorPool = candidateWords.length >= 12 ? candidateWords : allRealWords;

  const questions: WeeklyQuizQuestion[] = chosen.map((word, idx) => {
    const canAskArticle = Boolean(word.gender);
    let kind: WeeklyQuestionKind;
    if (canAskArticle && idx % 3 === 2) {
      kind = "article";
    } else if (idx % 2 === 0) {
      kind = "target-to-english";
    } else {
      kind = "english-to-target";
    }

    const qSeed = hashSeed(`${seed}:${idx}:${word.id}`);
    const fullDisplay = wordWithArticle(word.gender, word.target_word, languageId);
    const fullSpoken = spokenWordEntity(word, languageId);

    if (kind === "article" && word.gender) {
      const articleChoices = articlesForGender(word.gender, languageId);
      return {
        id: `weekly-${idx}-${word.id}-article`,
        wordId: word.id,
        kind,
        prompt: `___ ${word.target_word}`,
        subPrompt: `Pick the article for "${word.target_word}" (${word.english_meaning})`,
        spokenText: word.target_word,
        revealedSpokenText: fullSpoken,
        options: articleChoices,
        correctAnswer: word.gender,
        explanation: `${fullDisplay} = ${word.english_meaning}${
          word.shift_rule ? ` · ${word.shift_rule}` : ""
        }`,
      };
    }

    if (kind === "english-to-target") {
      const distractors = pickDistractors(
        distractorPool,
        word,
        (w) => w.target_word,
        qSeed
      );
      const opts = seededShuffle([word.target_word, ...distractors], qSeed + 13);
      return {
        id: `weekly-${idx}-${word.id}-e2t`,
        wordId: word.id,
        kind,
        prompt: word.english_meaning,
        subPrompt: "Choose the matching target-language word",
        spokenText: "",
        revealedSpokenText: fullSpoken,
        options: opts,
        correctAnswer: word.target_word,
        explanation: `${fullDisplay} — cognate: ${
          word.english_cognate || word.english_meaning
        }${word.shift_rule ? ` (${word.shift_rule})` : ""}`,
      };
    }

    const distractors = pickDistractors(
      distractorPool,
      word,
      (w) => w.english_meaning,
      qSeed
    );
    const opts = seededShuffle([word.english_meaning, ...distractors], qSeed + 29);
    return {
      id: `weekly-${idx}-${word.id}-t2e`,
      wordId: word.id,
      kind: "target-to-english",
      prompt: fullDisplay,
      subPrompt: "Choose the English meaning",
      spokenText: fullSpoken,
      revealedSpokenText: fullSpoken,
      options: opts,
      correctAnswer: word.english_meaning,
      explanation: `${fullDisplay} → ${word.english_meaning}${
        word.shift_rule ? ` · ${word.shift_rule}` : ""
      }`,
    };
  });

  return {
    questions,
    usedStarterTopics,
    topicCount: activeEntries.length,
  };
}

// ---------------------------------------------------------------------------
// #48 — Gender-Guess Lab (German suffix heuristics)
// ---------------------------------------------------------------------------

export type GermanArticle = "der" | "die" | "das";

export interface GenderSuffixRule {
  suffix: string;
  /** Qualified display label for cheat-sheet tiles (defaults to `-${suffix}`). */
  tileLabel?: string;
  article: GermanArticle;
  reliability: "always" | "almost always" | "very common";
  explanation: string;
}

/** Ordered longest-suffix-first so specific endings match before shorter ones. */
export const GENDER_SUFFIX_RULES: GenderSuffixRule[] = [
  {
    suffix: "schaft",
    article: "die",
    reliability: "always",
    explanation: "Nouns ending in -schaft (like English -ship: Freundschaft/friendship) are always feminine (die).",
  },
  {
    suffix: "ismus",
    article: "der",
    reliability: "always",
    explanation: "Nouns ending in -ismus (like English -ism) are always masculine (der).",
  },
  {
    suffix: "heit",
    article: "die",
    reliability: "always",
    explanation: "Abstract nouns ending in -heit (like English -hood) are always feminine (die).",
  },
  {
    suffix: "keit",
    article: "die",
    reliability: "always",
    explanation: "Abstract nouns ending in -keit (sister to -heit) are always feminine (die).",
  },
  {
    suffix: "tion",
    article: "die",
    reliability: "always",
    explanation: "International Latin nouns ending in -tion are always feminine (die).",
  },
  {
    suffix: "chen",
    article: "das",
    reliability: "almost always",
    explanation: "Diminutives ending in -chen (Mädchen, Brötchen) are neuter (das) — even for people!",
  },
  {
    suffix: "lein",
    article: "das",
    reliability: "always",
    explanation: "Diminutives ending in -lein (Büchlein, Fräulein) are always neuter (das).",
  },
  {
    suffix: "ment",
    article: "das",
    reliability: "almost always",
    explanation: "Loan nouns ending in -ment (Dokument, Instrument) are almost always neuter (das).",
  },
  {
    suffix: "ling",
    article: "der",
    reliability: "always",
    explanation: "Nouns ending in -ling (Frühling, Zwilling, Liebling) are always masculine (der).",
  },
  {
    suffix: "ung",
    article: "die",
    reliability: "always",
    explanation: "Nouns ending in -ung (Zeitung, Rechnung, Entschuldigung) are always feminine (die).",
  },
  {
    suffix: "tät",
    article: "die",
    reliability: "always",
    explanation: "Nouns ending in -tät (English -ty: Universität, Qualität) are always feminine (die).",
  },
  {
    suffix: "ik",
    article: "die",
    reliability: "almost always",
    explanation: "Nouns ending in -ik (Musik, Fabrik, Klinik) are almost always feminine (die).",
  },
  {
    suffix: "um",
    tileLabel: "Latin -um",
    article: "das",
    reliability: "almost always",
    explanation: "Latin nouns ending in -um (Museum, Gymnasium, Datum) are almost always neuter (das).",
  },
  {
    suffix: "or",
    article: "der",
    reliability: "almost always",
    explanation: "Agent and technical nouns ending in -or (Professor, Motor, Autor) are almost always masculine (der).",
  },
  {
    suffix: "er",
    tileLabel: "-er (person/tool from verb)",
    article: "der",
    reliability: "very common",
    explanation: "Agent and tool nouns ending in -er (Lehrer, Fahrer, Computer) are predominantly masculine (der).",
  },
];

/** Detect the strongest suffix heuristic for a German noun. */
export function detectGenderSuffixRule(noun: string): GenderSuffixRule | null {
  const lower = noun.trim().toLocaleLowerCase("de");
  for (const rule of GENDER_SUFFIX_RULES) {
    if (lower.endsWith(rule.suffix) && lower.length > rule.suffix.length + 1) {
      return rule;
    }
  }
  return null;
}

export interface GenderLabItem {
  id: string;
  noun: string;
  article: GermanArticle;
  english: string;
  suffix: string;
  rule: GenderSuffixRule;
}

const CURATED_GENDER_NOUNS: Array<{ noun: string; article: GermanArticle; english: string }> = [
  { noun: "Rechnung", article: "die", english: "bill / invoice" },
  { noun: "Entschuldigung", article: "die", english: "apology / excuse me" },
  { noun: "Zeitung", article: "die", english: "newspaper" },
  { noun: "Wohnung", article: "die", english: "apartment" },
  { noun: "Gesundheit", article: "die", english: "health" },
  { noun: "Freiheit", article: "die", english: "freedom" },
  { noun: "Möglichkeit", article: "die", english: "possibility" },
  { noun: "Freundlichkeit", article: "die", english: "friendliness" },
  { noun: "Freundschaft", article: "die", english: "friendship" },
  { noun: "Landschaft", article: "die", english: "landscape" },
  { noun: "Rezeption", article: "die", english: "reception desk" },
  { noun: "Station", article: "die", english: "station" },
  { noun: "Universität", article: "die", english: "university" },
  { noun: "Qualität", article: "die", english: "quality" },
  { noun: "Musik", article: "die", english: "music" },
  { noun: "Fabrik", article: "die", english: "factory" },
  { noun: "Mädchen", article: "das", english: "girl" },
  { noun: "Brötchen", article: "das", english: "bread roll" },
  { noun: "Büchlein", article: "das", english: "little book" },
  { noun: "Tischlein", article: "das", english: "little table" },
  { noun: "Dokument", article: "das", english: "document" },
  { noun: "Instrument", article: "das", english: "instrument" },
  { noun: "Museum", article: "das", english: "museum" },
  { noun: "Gymnasium", article: "das", english: "academic high school" },
  { noun: "Lehrer", article: "der", english: "teacher" },
  { noun: "Fahrer", article: "der", english: "driver" },
  { noun: "Frühling", article: "der", english: "spring (season)" },
  { noun: "Zwilling", article: "der", english: "twin" },
  { noun: "Tourismus", article: "der", english: "tourism" },
  { noun: "Optimismus", article: "der", english: "optimism" },
  { noun: "Professor", article: "der", english: "professor" },
  { noun: "Motor", article: "der", english: "engine / motor" },
];

/**
 * Build a balanced, deterministically shuffled deck of German nouns whose articles
 * follow suffix heuristics, combining curated exemplars with matching compendium nouns.
 */
export function buildGenderLabDeck(
  compendium?: CompendiumData | null,
  seed?: number
): GenderLabItem[] {
  const byNoun = new Map<string, GenderLabItem>();

  for (const entry of CURATED_GENDER_NOUNS) {
    const rule = detectGenderSuffixRule(entry.noun);
    if (!rule || rule.article !== entry.article) continue;
    byNoun.set(entry.noun.toLocaleLowerCase("de"), {
      id: `curated-${entry.noun.toLocaleLowerCase("de")}`,
      noun: entry.noun,
      article: entry.article,
      english: entry.english,
      suffix: `-${rule.suffix}`,
      rule,
    });
  }

  if (compendium) {
    for (const word of compendium.wordList) {
      if (word.gender !== "der" && word.gender !== "die" && word.gender !== "das") continue;
      if (word.target_word.includes(" ")) continue;
      const key = word.target_word.toLocaleLowerCase("de");
      if (byNoun.has(key)) continue;
      const rule = detectGenderSuffixRule(word.target_word);
      if (!rule || rule.article !== word.gender) continue;
      byNoun.set(key, {
        id: word.id,
        noun: word.target_word,
        article: word.gender,
        english: word.english_meaning,
        suffix: `-${rule.suffix}`,
        rule,
      });
    }
  }

  return seededShuffle(Array.from(byNoun.values()), seed ?? hashSeed("gender-lab-deck-v1"));
}
