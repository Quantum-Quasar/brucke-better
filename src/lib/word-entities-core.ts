// Pure word-entity construction. Safe for the client: this module carries no
// language data, so callers can feed it the compendium + lesson index they
// fetched instead of pulling every language's bundle.

import { displayArticle } from "@/lib/gender";
import { COMPOUND_IPA, FALSE_FRIEND_IPA } from "@/data/phonetics";
import type { CompendiumData, WordEntity } from "@/lib/types";

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
    use_example?: { german?: string; english?: string };
    takeaway?: string;
  };
}

export type WordEntityCompendium = Pick<CompendiumData, "words" | "compounds" | "falseFriends">;

const ARTICLE_OPTIONS_BY_LANG: Record<string, string[]> = {
  de: ["der", "die", "das", "den"],
  fr: ["le", "la", "l'", "les"],
  es: ["el", "la", "los", "las"],
};

const GERMAN_IPA = { compound: COMPOUND_IPA, falseFriend: FALSE_FRIEND_IPA };
const NO_IPA = { compound: {}, falseFriend: {} };

export const EMPTY_WORD_ENTITY_MAPS: WordEntityMaps = {
  wordLesson: {},
  entities: {},
  sentences: [],
  articles: [],
  byLowerKey: {},
};

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

  const entities: Record<string, WordEntity> = { ...data.words };
  const sentences: WordEntity[] = [];
  const articles: WordEntity[] = [];
  const articleOptions = ARTICLE_OPTIONS_BY_LANG[languageId] ?? ARTICLE_OPTIONS_BY_LANG.de;

  // Synthesize MCQ-only Article & Gender review entities for every gendered noun
  for (const word of Object.values(data.words)) {
    if (!word.gender) continue;
    const correctArticle = displayArticle(word.gender, word.target_word, languageId) ?? word.gender;
    const id = `article_${word.id}`;
    const opts = articleOptions.includes(correctArticle)
      ? articleOptions
      : [correctArticle, ...articleOptions.slice(0, 3)];
    const articleEntity: WordEntity = {
      id,
      target_word: correctArticle,
      english_cognate: `___ ${word.target_word}`,
      english_meaning: `${word.english_meaning} (cognate: ${word.english_cognate})`,
      gender: word.gender,
      ipa: word.ipa,
      sound_shift_ids: word.sound_shift_ids,
      shift_rule: `Article & Gender · ${word.target_word}`,
      context_phrase: word.context_phrase,
      context_translation: word.context_translation,
      etymology_derivation: `Gender anchor for "${word.target_word}": ${correctArticle} ${word.target_word}. ${word.etymology_derivation}`,
      domain: word.domain,
      supportedModes: ["mcq"],
      customMcqOptions: opts,
      promptLabel: "article & gender mcq",
    };
    entities[id] = articleEntity;
    articles.push(articleEntity);
    if (word.id in wordLesson) {
      wordLesson[id] = wordLesson[word.id];
    }
  }

  data.compounds.forEach((compound) => {
    const id = `compound_${compound.id}`;
    const cleanWord = compound.compound.replace(/^(der|die|das|le|la|el)\s+/i, "");
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
    };
  });

  // Sentence-level SRS entities synthesized from each authored lesson's capstone use_example
  for (const lesson of lessons) {
    const targetSentence = lesson.summary?.use_example?.german?.trim();
    const englishSentence = lesson.summary?.use_example?.english?.trim();
    if (!targetSentence || !englishSentence) continue;
    const id = `sentence_${lesson.id}`;
    const cleanTarget = targetSentence.replace(/[.!?;:]+$/, "").trim();
    const sentenceEntity: WordEntity = {
      id,
      target_word: cleanTarget,
      english_cognate: englishSentence,
      english_meaning: lesson.title,
      gender: null,
      ipa: "",
      sound_shift_ids: lesson.shift_categories ?? [],
      shift_rule: `Sentence Pattern · Lesson ${lesson.id}`,
      context_phrase: targetSentence,
      context_translation: englishSentence,
      etymology_derivation: lesson.summary?.takeaway ?? "",
      supportedModes: ["flashcard", "mcq", "tiles", "typing"],
      promptLabel: "sentence structure",
    };
    entities[id] = sentenceEntity;
    sentences.push(sentenceEntity);
    wordLesson[id] = lesson.id;
  }

  const byLowerKey: Record<string, WordEntity> = {};
  for (const word of Object.values(entities)) {
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
