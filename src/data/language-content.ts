// ponytail: per-language content registry. Only languages with authored
// curriculum are "available"; everything else gets an empty bundle so pages
// can render graceful coming-soon states.
//
// German content stays in its existing modules (compendium.ts, curriculum.ts,
// lessons.ts, phonetics.ts, insights.json) — this file just scopes it behind
// the active language id. Adding content for a new language means authoring a
// bundle here and flipping its status to "available" in languages.ts.

import { compendium as germanCompendium } from "./compendium";
import { LESSONS as GERMAN_LESSONS } from "./lessons";
import { frenchCompendium } from "./french/compendium-fr";
import { FR_LESSONS } from "./french/lessons-fr";
import { spanishCompendium } from "./spanish/compendium-es";
import { ES_LESSONS } from "./spanish/lessons-es";
import { dutchCompendium } from "./dutch/compendium-nl";
import { NL_LESSONS } from "./dutch/lessons-nl";
import { getCurriculum } from "./curriculum-registry";
import { getInsights } from "./insights-registry";
import { EMPTY_COMPENDIUM } from "./empty-compendium";
import type { CompendiumData, DailyInsight, Lesson } from "@/lib/types";
import type { TrailBranch, TrailGate, TopicCluster } from "@/lib/types";
import { DEFAULT_LANGUAGE_ID } from "./languages";

/** A compendium-shaped bundle with nothing in it (for coming-soon languages). */
export { EMPTY_COMPENDIUM } from "./empty-compendium";

export interface LanguageContent {
  compendium: CompendiumData | null;
  topics: TopicCluster[];
  trailBranches: TrailBranch[];
  trailGates: TrailGate[];
  totalTopics: number;
  lessons: Lesson[];
  insights: DailyInsight[];
}

const EMPTY_CONTENT: LanguageContent = {
  compendium: null,
  topics: [],
  trailBranches: [],
  trailGates: [],
  totalTopics: 0,
  lessons: [],
  insights: [],
};

function buildContent(
  languageId: string,
  compendium: CompendiumData | null,
  lessons: Lesson[]
): LanguageContent {
  const curriculum = getCurriculum(languageId);
  return {
    compendium,
    topics: curriculum.topics,
    trailBranches: curriculum.trailBranches,
    trailGates: curriculum.trailGates,
    totalTopics: curriculum.totalTopics,
    lessons,
    insights: getInsights(languageId),
  };
}

const GERMAN_CONTENT = buildContent("de", germanCompendium, GERMAN_LESSONS);
const FRENCH_CONTENT = buildContent("fr", frenchCompendium, FR_LESSONS);
const SPANISH_CONTENT = buildContent("es", spanishCompendium, ES_LESSONS);
const DUTCH_CONTENT = buildContent("nl", dutchCompendium, NL_LESSONS);

const CONTENT_MAP: Record<string, LanguageContent> = {
  de: GERMAN_CONTENT,
  es: SPANISH_CONTENT,
  fr: FRENCH_CONTENT,
  nl: DUTCH_CONTENT,
};

/** Content bundle for a language id — empty bundle when nothing is authored yet. */
export function getLanguageContent(languageId: string): LanguageContent {
  return CONTENT_MAP[languageId] ?? EMPTY_CONTENT;
}

/**
 * Compendium bundle for a language id — the empty bundle when nothing is authored.
 * Thin accessor over getLanguageContent() for tools that only need word/shift data.
 */
export function getCompendium(languageId: string): CompendiumData {
  const content = getLanguageContent(languageId);
  return content.compendium ?? EMPTY_COMPENDIUM;
}

/** Total vocabulary words across the language's compendium (0 when unavailable). */
export function getTotalWordCount(languageId: string): number {
  const content = getLanguageContent(languageId);
  if (!content.compendium) return 0;
  return Object.keys(content.compendium.words).length;
}

/** Convenience for the default (German) content, for German-specific tooling. */
export const DEFAULT_CONTENT: LanguageContent = getLanguageContent(DEFAULT_LANGUAGE_ID);

export { getNextPlayableLessonIdFor } from "./curriculum-registry";
