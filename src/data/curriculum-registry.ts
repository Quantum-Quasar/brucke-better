// Lightweight curriculum access. Unlike language-content.ts this module never
// imports a lesson body, so the trail map and landing page stay small.

import { EMPTY_CURRICULUM, getNextPlayableLessonIdIn, type CurriculumData } from "./curriculum-core";
import {
  TOPICS,
  TRAIL_BRANCHES,
  TRAIL_GATES,
  TOTAL_TOPICS,
  AUTHORED_LESSON_COUNT,
} from "./curriculum";
import {
  FR_TOPICS,
  FR_TRAIL_BRANCHES,
  FR_TRAIL_GATES,
  FR_TOTAL_TOPICS,
  FR_AUTHORED_LESSON_COUNT,
} from "./french/curriculum-fr";
import {
  ES_TOPICS,
  ES_TRAIL_BRANCHES,
  ES_TRAIL_GATES,
  ES_TOTAL_TOPICS,
  ES_AUTHORED_LESSON_COUNT,
} from "./spanish/curriculum-es";

export type { CurriculumData } from "./curriculum-core";

const CURRICULUM_MAP: Record<string, CurriculumData> = {
  de: {
    topics: TOPICS,
    trailBranches: TRAIL_BRANCHES,
    trailGates: TRAIL_GATES,
    totalTopics: TOTAL_TOPICS,
    lessonCount: AUTHORED_LESSON_COUNT,
  },
  fr: {
    topics: FR_TOPICS,
    trailBranches: FR_TRAIL_BRANCHES,
    trailGates: FR_TRAIL_GATES,
    totalTopics: FR_TOTAL_TOPICS,
    lessonCount: FR_AUTHORED_LESSON_COUNT,
  },
  es: {
    topics: ES_TOPICS,
    trailBranches: ES_TRAIL_BRANCHES,
    trailGates: ES_TRAIL_GATES,
    totalTopics: ES_TOTAL_TOPICS,
    lessonCount: ES_AUTHORED_LESSON_COUNT,
  },
};

export function getCurriculum(languageId: string): CurriculumData {
  return CURRICULUM_MAP[languageId] ?? EMPTY_CURRICULUM;
}

export function getAuthoredLessonCount(languageId: string): number {
  return getCurriculum(languageId).lessonCount;
}

export function getNextPlayableLessonIdFor(
  languageId: string,
  currentId: number
): number | null {
  return getNextPlayableLessonIdIn(getCurriculum(languageId), currentId);
}
