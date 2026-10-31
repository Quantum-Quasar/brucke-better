// Lightweight curriculum access. Unlike language-content.ts this module never
// imports a lesson body, so the trail map and landing page stay small.

import {
  EMPTY_CURRICULUM,
  getNextPlayableLessonIdFrom,
  type CurriculumData,
} from "./curriculum-core";
import { GERMAN_CURRICULUM } from "./curriculum";
import { FRENCH_CURRICULUM } from "./french/curriculum-fr";
import { SPANISH_CURRICULUM } from "./spanish/curriculum-es";
import { DUTCH_CURRICULUM } from "./dutch/curriculum-nl";

export type { CurriculumData } from "./curriculum-core";

const CURRICULUM_MAP: Record<string, CurriculumData> = {
  de: GERMAN_CURRICULUM,
  fr: FRENCH_CURRICULUM,
  es: SPANISH_CURRICULUM,
  nl: DUTCH_CURRICULUM,
};

export function getCurriculum(languageId: string): CurriculumData {
  return CURRICULUM_MAP[languageId] ?? EMPTY_CURRICULUM;
}

export function getNextPlayableLessonIdFor(
  languageId: string,
  currentId: number
): number | null {
  return getNextPlayableLessonIdFrom(getCurriculum(languageId), currentId);
}
