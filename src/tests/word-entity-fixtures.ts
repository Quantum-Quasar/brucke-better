// Test-only accessors over the shared word-entity builder. The app imports
// word-entities-core directly; keeping this cache here keeps production free of
// a façade that nothing but tests exercised.

import { COMPOUND_IPA, FALSE_FRIEND_IPA } from "@/data/phonetics";
import { getLanguageContent } from "@/data/language-content";
import {
  buildWordEntityMaps,
  EMPTY_WORD_ENTITY_MAPS,
  lookupWordEntity,
  type WordEntityMaps,
} from "@/lib/word-entities-core";
import type { WordEntity } from "@/lib/types";

const GERMAN_IPA = { compound: COMPOUND_IPA, falseFriend: FALSE_FRIEND_IPA };
const cache: Record<string, WordEntityMaps> = {};

function getMaps(languageId: string): WordEntityMaps {
  const cached = cache[languageId];
  if (cached) return cached;
  const content = getLanguageContent(languageId);
  const maps = content.compendium
    ? buildWordEntityMaps(
        languageId,
        content.compendium,
        content.lessons,
        languageId === "de" ? GERMAN_IPA : undefined
      )
    : EMPTY_WORD_ENTITY_MAPS;
  cache[languageId] = maps;
  return maps;
}

export function getWordLessonMap(languageId: string): Record<string, number> {
  return getMaps(languageId).wordLesson;
}

export function getWordEntityMap(languageId: string): Record<string, WordEntity> {
  return getMaps(languageId).entities;
}

export function getSentenceEntities(languageId: string): WordEntity[] {
  return getMaps(languageId).sentences;
}

export function getArticleEntities(languageId: string): WordEntity[] {
  return getMaps(languageId).articles;
}

export function getWordEntity(id: string, languageId = "de"): WordEntity | undefined {
  return lookupWordEntity(getMaps(languageId), id);
}
