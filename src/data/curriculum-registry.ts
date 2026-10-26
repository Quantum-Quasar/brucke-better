// Lightweight curriculum access. Unlike language-content.ts this module never
// imports a lesson body, so the trail map and landing page stay small.

import type { TopicCluster, TrailBranch, TrailGate } from "@/lib/types";
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

export interface CurriculumData {
  topics: TopicCluster[];
  trailBranches: TrailBranch[];
  trailGates: TrailGate[];
  totalTopics: number;
  /** Number of authored lessons in this language's trail. */
  lessonCount: number;
}

const EMPTY_CURRICULUM: CurriculumData = {
  topics: [],
  trailBranches: [],
  trailGates: [],
  totalTopics: 0,
  lessonCount: 0,
};

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

/**
 * The spine topic that owns a trail node — core, sprig or branch lesson.
 * Sprig ids follow `topicId * 100 + index`; branch lessons belong to the
 * topic their branch attaches to. Returns null for ids outside the trail.
 */
function owningTopicId(content: CurriculumData, nodeId: number): number | null {
  for (const topic of content.topics) {
    if (topic.core.id === nodeId) return topic.id;
    if (topic.sprigs.some((sprig) => sprig.id === nodeId)) return topic.id;
  }
  for (const branch of content.trailBranches) {
    if (branch.lessons.some((lesson) => lesson.id === nodeId)) {
      const attachTopic = content.topics.find((topic) => topic.core.id === branch.attach);
      return attachTopic ? attachTopic.id : null;
    }
  }
  // Unlisted sprig ids still decode arithmetically (index 0 is not a node).
  const series = Math.floor(nodeId / 100);
  if (series >= 1 && series <= content.totalTopics && nodeId % 100 !== 0) return series;
  return null;
}

/**
 * Next authored spine core after the node, in the active language's own
 * curriculum (null = caught up). A sprig or branch lesson answers with the
 * core of the *following* topic; a core answers with the next core; only the
 * last topic returns null.
 */
export function getNextPlayableLessonIdFor(
  languageId: string,
  currentId: number
): number | null {
  const content = getCurriculum(languageId);
  const owner = owningTopicId(content, currentId);
  if (owner === null) return null;
  for (const topic of content.topics) {
    if (topic.id > owner && topic.id <= content.totalTopics && topic.core.authored) {
      return topic.core.id;
    }
  }
  return null;
}
