// Pure word-entity construction. Safe for the client: this module carries no
// language data, so callers can feed it the compendium + lesson index they
// fetched instead of pulling every language's bundle.

import { displayArticle } from "@/lib/gender";
import { COMPOUND_IPA, FALSE_FRIEND_IPA } from "@/data/phonetics";
import type { CompendiumData, Gender, WordEntity } from "@/lib/types";
import { compoundFrequencyForm, frequencyRankFor } from "@/lib/frequency";

export interface WordEntityMaps {
  wordLesson: Record<string, number>;
  entities: Record<string, WordEntity>;
  sentences: WordEntity[];
  articles: WordEntity[];
  /** lowercase target_word/id index — avoids the O(n) scan on lookup misses */
  byLowerKey: Record<string, WordEntity>;
}

/** The lesson fields sentence entities and word→lesson mapping need. */
export interface LessonEntitySource {
  id: number;
  title: string;
  word_ids: string[];
  shift_categories?: string[];
  summary?: {
    use_example?: {
      german?: string;
      english?: string;
      accepted_answers?: string[];
      mcq_distractors?: string[];
    };
    takeaway?: string;
  };
}

export type WordEntityCompendium = Pick<CompendiumData, "words" | "compounds" | "falseFriends" | "frequencyRanks">;

export interface ArticleContextCloze {
  /** Sentence with the target article replaced by "___" (e.g. "___ Hund ist groß." or "Ich sehe ___ Hund."). */
  cloze: string;
  /** The exact lowercase article blanked from the sentence (e.g. "der", "den", "l'"). */
  article: string;
}

const ARTICLE_OPTIONS_BY_LANG: Record<string, string[]> = {
  de: ["der", "die", "das", "den"],
  fr: ["le", "la", "l'", "les"],
  es: ["el", "la", "los", "las"],
  nl: ["de", "het"],
};

const GERMAN_NON_ADJECTIVE_WORDS = new Set([
  "heute", "gestern", "morgen", "immer", "oft", "selten", "nie", "hier", "dort", "jetzt", "bald", "dann",
  "nicht", "auch", "noch", "schon", "sehr", "nur", "aber", "oder", "und", "denn", "weil", "dass", "wenn",
  "ist", "sind", "war", "waren", "hat", "haben", "kann", "können", "will", "wollen", "muss", "müssen",
  "wird", "werden", "gibt", "geht", "kommt", "macht", "sieht", "steht", "liegt", "sitzt", "bleibt",
  "ich", "du", "er", "sie", "es", "wir", "ihr", "man", "sich", "mich", "dich", "uns", "euch", "mir", "dir", "ihm",
  "in", "an", "auf", "mit", "von", "zu", "für", "bei", "nach", "aus", "über", "unter", "vor", "ohne", "gegen",
  "eine", "einen", "einem", "einer", "eines", "keine", "keinen", "meine", "deine", "seine", "ihre", "unsere", "eure",
]);

const GERMAN_IPA = { compound: COMPOUND_IPA, falseFriend: FALSE_FRIEND_IPA };
const NO_IPA = { compound: {}, falseFriend: {} };

export const EMPTY_WORD_ENTITY_MAPS: WordEntityMaps = {
  wordLesson: {},
  entities: {},
  sentences: [],
  articles: [],
  byLowerKey: {},
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Builds a sentence-context cloze for an Article & Gender review card when the
 * noun's `context_phrase` contains a matching definite article right before the
 * noun (or separated by a single lowercase German adjective).
 *
 * Returns `null` when the sentence uses an indefinite/possessive determiner,
 * a dative/contracted form outside the card's article option set, or a plural
 * form that would contradict the noun's singular grammatical gender.
 */
export function buildArticleContextCloze(
  contextPhrase: string | undefined,
  targetWord: string,
  gender: Gender | null | undefined,
  languageId: string,
): ArticleContextCloze | null {
  const phrase = contextPhrase?.trim();
  const noun = targetWord.trim();
  if (!phrase || !noun || !gender) return null;

  const baseArticle = displayArticle(gender, noun, languageId) ?? gender;
  const candidates = [baseArticle];
  // In German, masculine nouns in the accusative take "den", which is in the 4-choice article set.
  if (languageId === "de" && gender === "der" && !candidates.includes("den")) {
    candidates.push("den");
  }

  const escapedNoun = escapeRegExp(noun);
  const nonElided = candidates.filter((art) => !art.endsWith("'"));
  const hasElided = candidates.some((art) => art.endsWith("'"));

  // 1. Elided French article (e.g. "L'hôtel est vieux." or "L’hôtel est vieux." -> "___ hôtel est vieux.")
  if (hasElided) {
    const elidedRe = new RegExp(
      `(^|[\\s„"«(])(l['’])(${escapedNoun})(?=$|[\\s.,!?;:»"”)])`,
      "iu",
    );
    const match = phrase.match(elidedRe);
    if (match && match.index !== undefined) {
      const prefix = match[1];
      const start = match.index + prefix.length;
      const end = start + match[2].length;
      return {
        cloze: `${phrase.slice(0, start)}___ ${phrase.slice(end)}`,
        article: "l'",
      };
    }
  }

  if (nonElided.length === 0) return null;
  const artAlt = nonElided.map(escapeRegExp).join("|");
  const capArtAlt = nonElided
    .flatMap((a) => [a, a.charAt(0).toUpperCase() + a.slice(1)])
    .map(escapeRegExp)
    .join("|");

  // 2. Direct adjacency: "<article> <noun>" (e.g. "Der Fisch schwimmt...", "Ich höre den Donner.")
  // Use case-sensitive "u" for German so lowercase adverbs/verbs (e.g. "morgen") never match capitalized nouns.
  const directRe =
    languageId === "de"
      ? new RegExp(
          `(^|[\\s„"«(])(${capArtAlt})(\\s+)(${escapedNoun})(?=$|[\\s.,!?;:»"”)])`,
          "u",
        )
      : new RegExp(
          `(^|[\\s„"«(])(${artAlt})(\\s+)(${escapedNoun})(?=$|[\\s.,!?;:»"”)])`,
          "iu",
        );
  const directMatch = phrase.match(directRe);
  if (directMatch && directMatch.index !== undefined) {
    const prefix = directMatch[1];
    const start = directMatch.index + prefix.length;
    const end = start + directMatch[2].length;
    return {
      cloze: `${phrase.slice(0, start)}___${phrase.slice(end)}`,
      article: directMatch[2].toLowerCase(),
    };
  }

  // 3. German article + single lowercase adjective + noun (e.g. "Der goldene Ring ist schön.")
  // Guard against relative pronouns after commas (", der heute ...") and non-adjective intervening words.
  if (languageId === "de") {
    const germanAdjRe = new RegExp(
      `(^|[\\s„"«(])(${capArtAlt})(\\s+)([a-zäöüß][a-zäöüß-]*)(\\s+)(${escapedNoun})(?=$|[\\s.,!?;:»"”)])`,
      "u",
    );
    const adjMatch = phrase.match(germanAdjRe);
    if (adjMatch && adjMatch.index !== undefined) {
      const prefix = adjMatch[1];
      const start = adjMatch.index + prefix.length;
      const beforeStart = phrase.slice(0, start).trimEnd();
      const middleWord = adjMatch[4];
      const looksLikeAttributiveAdj =
        !beforeStart.endsWith(",") &&
        !GERMAN_NON_ADJECTIVE_WORDS.has(middleWord) &&
        /(?:e|en|er|es|em)$/.test(middleWord);
      if (looksLikeAttributiveAdj) {
        const end = start + adjMatch[2].length;
        return {
          cloze: `${phrase.slice(0, start)}___${phrase.slice(end)}`,
          article: adjMatch[2].toLowerCase(),
        };
      }
    }
  }

  return null;
}

export function buildWordEntityMaps(
  languageId: string,
  data: WordEntityCompendium,
  lessons: LessonEntitySource[],
  ipa: { compound: Record<string, string>; falseFriend: Record<string, string> } =
    languageId === "de" ? GERMAN_IPA : NO_IPA
): WordEntityMaps {
  const wordLesson: Record<string, number> = {};
  for (const lesson of lessons) {
    for (const wordId of lesson.word_ids) {
      if (!(wordId in wordLesson)) wordLesson[wordId] = lesson.id;
    }
  }

  const entities: Record<string, WordEntity> = {};
  for (const [id, word] of Object.entries(data.words)) {
    const rank = data.frequencyRanks
      ? frequencyRankFor(word.target_word, data.frequencyRanks)
      : word.frequencyRank ?? null;
    entities[id] = word.frequencyRank === rank ? word : { ...word, frequencyRank: rank };
  }
  const sentences: WordEntity[] = [];
  const articles: WordEntity[] = [];
  const articleOptions = ARTICLE_OPTIONS_BY_LANG[languageId] ?? ARTICLE_OPTIONS_BY_LANG.de;

  // Synthesize MCQ-only Article & Gender review entities for every gendered noun
  for (const word of Object.values(data.words)) {
    if (!word.gender) continue;
    const baseArticle = displayArticle(word.gender, word.target_word, languageId) ?? word.gender;
    const contextCloze = buildArticleContextCloze(word.context_phrase, word.target_word, word.gender, languageId);
    const correctArticle = contextCloze?.article ?? baseArticle;
    const id = `article_${word.id}`;
    const opts = articleOptions.includes(correctArticle)
      ? articleOptions
      : [correctArticle, ...articleOptions.slice(0, 3)];
    const anchorNote =
      contextCloze && correctArticle !== baseArticle
        ? `Accusative form of "${baseArticle} ${word.target_word}" → "${correctArticle} ${word.target_word}". ${word.etymology_derivation}`
        : `Gender anchor for "${word.target_word}": ${baseArticle} ${word.target_word}. ${word.etymology_derivation}`;
    const articleEntity: WordEntity = {
      id,
      target_word: correctArticle,
      english_cognate: `- ${word.target_word}`,
      english_meaning: `${word.english_meaning} (cognate: ${word.english_cognate})`,
      gender: word.gender,
      ipa: word.ipa,
      sound_shift_ids: word.sound_shift_ids,
      shift_rule: `Article & Gender · ${word.target_word}`,
      context_phrase: word.context_phrase,
      context_translation: word.context_translation,
      etymology_derivation: anchorNote,
      domain: word.domain,
      supportedModes: ["mcq"],
      customMcqOptions: opts,
      promptLabel: contextCloze ? "article in context" : "article & gender mcq",
      articleCloze: contextCloze?.cloze,
      frequencyRank: null,
    };
    entities[id] = articleEntity;
    articles.push(articleEntity);
    if (word.id in wordLesson) {
      wordLesson[id] = wordLesson[word.id];
    }
  }

  data.compounds.forEach((compound) => {
    const id = `compound_${compound.id}`;
    const cleanWord = compoundFrequencyForm(compound.compound);
    entities[id] = {
      id,
      target_word: cleanWord,
      english_cognate: compound.literal_morphemes,
      english_meaning: `${compound.real_meaning} (lit. "${compound.literal_morphemes}")`,
      gender: compound.gender,
      ipa: ipa.compound[compound.id] || "/kɔmˈpoːzɪtʊm/",
      sound_shift_ids: [],
      shift_rule: "Compound Calque",
      context_phrase: compound.example_sentence ?? compound.compound,
      context_translation:
        compound.example_translation ?? `${compound.english_counterpart} (${compound.literal_morphemes})`,
      etymology_derivation: compound.lore,
      frequencyRank: frequencyRankFor(cleanWord, data.frequencyRanks),
    };
  });

  data.falseFriends.forEach((falseFriend) => {
    const id = `trap_${falseFriend.id}`;
    entities[id] = {
      id,
      target_word: falseFriend.german_word,
      english_cognate: `≠ ${falseFriend.looks_like}`,
      english_meaning: falseFriend.actual_meaning,
      gender: null,
      ipa: ipa.falseFriend[falseFriend.id] || "/faɫʃɐ fʁɔʏ̯nt/",
      sound_shift_ids: [],
      shift_rule: "False Friend Trap",
      context_phrase: falseFriend.example_sentence ?? `${falseFriend.german_word} means "${falseFriend.actual_meaning}"`,
      context_translation: falseFriend.example_translation
        ? `${falseFriend.example_translation} (NOT English "${falseFriend.looks_like}")`
        : `NOT English "${falseFriend.looks_like}"!`,
      etymology_derivation: falseFriend.trap_note,
      frequencyRank: frequencyRankFor(falseFriend.german_word, data.frequencyRanks),
    };
  });

  // Sentence-level SRS entities synthesized from each authored lesson's capstone use_example
  for (const lesson of lessons) {
    const example = lesson.summary?.use_example;
    const targetSentence = example?.german?.trim();
    const englishSentence = example?.english?.trim();
    if (!example || !targetSentence || !englishSentence) continue;
    const id = `sentence_${lesson.id}`;
    const cleanTarget = targetSentence.replace(/[.!?;:]+$/, "").trim();
    const acceptedAnswers = example.accepted_answers?.map((answer) => answer.trim()).filter(Boolean);
    const answerKey = (answer: string) => answer.toLowerCase().replace(/[.,!?;:]+/g, " ").replace(/\s+/g, " ").trim();
    const validAnswers = new Set([cleanTarget, ...(acceptedAnswers ?? [])].map(answerKey));
    const seenFoils = new Set<string>();
    const distractors = (example.mcq_distractors ?? []).filter((foil) => {
      const key = answerKey(foil);
      if (!key || validAnswers.has(key) || seenFoils.has(key)) return false;
      seenFoils.add(key);
      return true;
    });
    const sentenceEntity: WordEntity = {
      id,
      target_word: cleanTarget,
      accepted_answers: acceptedAnswers,
      english_cognate: englishSentence,
      english_meaning: lesson.title,
      gender: null,
      ipa: "",
      sound_shift_ids: lesson.shift_categories ?? [],
      shift_rule: `Sentence Pattern · Lesson ${lesson.id}`,
      context_phrase: targetSentence,
      context_translation: englishSentence,
      etymology_derivation: lesson.summary?.takeaway ?? "",
      supportedModes: distractors.length > 0
        ? ["flashcard", "mcq", "tiles", "typing"]
        : ["flashcard", "tiles", "typing"],
      customMcqOptions: distractors.length > 0 ? [cleanTarget, ...distractors] : undefined,
      promptLabel: "sentence structure",
      frequencyRank: null,
    };
    entities[id] = sentenceEntity;
    sentences.push(sentenceEntity);
    wordLesson[id] = lesson.id;
  }

  const byLowerKey: Record<string, WordEntity> = {};
  for (const word of Object.values(entities)) {
    // Omit synthetic article_* entities from byLowerKey so looking up "den"/"der"
    // never resolves to an arbitrary noun's article card.
    if (word.id.startsWith("article_")) continue;
    const t = word.target_word.toLowerCase();
    if (!(t in byLowerKey)) byLowerKey[t] = word;
    const i = word.id.toLowerCase();
    if (!(i in byLowerKey)) byLowerKey[i] = word;
  }

  return { wordLesson, entities, sentences, articles, byLowerKey };
}

export function lookupWordEntity(
  maps: WordEntityMaps,
  id: string
): WordEntity | undefined {
  const normalized = id.trim().toLowerCase();
  return maps.entities[id] || maps.entities[normalized] || maps.byLowerKey[normalized];
}
