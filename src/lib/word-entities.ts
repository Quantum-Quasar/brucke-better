import { compendium as germanCompendium } from "@/data/compendium";
import { COMPOUND_IPA, FALSE_FRIEND_IPA } from "@/data/phonetics";
import { LESSONS as GERMAN_LESSONS } from "@/data/lessons";
import { getLanguageContent } from "@/data/language-content";
import {
  buildWordEntityMaps,
  EMPTY_WORD_ENTITY_MAPS,
  lookupWordEntity,
  type WordEntityMaps,
} from "./word-entities-core";
import type { WordEntity } from "@/lib/types";

const GERMAN_IPA = { compound: COMPOUND_IPA, falseFriend: FALSE_FRIEND_IPA };

const germanMaps = buildWordEntityMaps("de", germanCompendium, GERMAN_LESSONS, GERMAN_IPA);

const mapsByLanguage: Record<string, WordEntityMaps> = { de: germanMaps };

/**
 * Word id → the trail lesson that actually teaches it, derived from the
 * lesson data itself (the parser's lesson_index is a compendium-table
 * position bucket, not a lesson id). Language-scoped; falls back to an
 * empty map for languages without content.
 */
export function getWordLessonMap(languageId: string): Record<string, number> {
  return getMaps(languageId).wordLesson;
}

/** Legacy German-only export — prefer getWordLessonMap(activeLanguageId). */
export const WORD_LESSON_MAP: Record<string, number> = germanMaps.wordLesson;

/**
 * One lookup for every entity that can appear in a lesson or review session.
 * Compound, false-friend, sentence, and article cards use synthetic IDs, so
 * they share the same detail path as core vocabulary cards. Language-scoped.
 */
export function getWordEntityMap(languageId: string): Record<string, WordEntity> {
  return getMaps(languageId).entities;
}

/**
 * All sentence-level SRS entities for a language (one per authored trail lesson).
 */
export function getSentenceEntities(languageId: string): WordEntity[] {
  return getMaps(languageId).sentences;
}

/**
 * All MCQ-only Article & Gender drill entities for a language (one per gendered noun).
 */
export function getArticleEntities(languageId: string): WordEntity[] {
  return getMaps(languageId).articles;
}

function getMaps(languageId: string): WordEntityMaps {
  const cached = mapsByLanguage[languageId];
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
  mapsByLanguage[languageId] = maps;
  return maps;
}

export function getWordEntity(id: string, languageId = "de"): WordEntity | undefined {
  return lookupWordEntity(getMaps(languageId), id);
}
