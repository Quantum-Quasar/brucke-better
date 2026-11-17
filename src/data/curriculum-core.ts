// Pure curriculum shapes and lookups. No language data is imported here, so
// both the sync server registry and the lazy client loader can share it.

import type { LessonShell, TopicCluster, TrailBranch, TrailGate } from "@/lib/types";

export interface CurriculumData {
  topics: TopicCluster[];
  trailBranches: TrailBranch[];
  trailGates: TrailGate[];
  totalTopics: number;
  /** Number of authored lessons in this language's trail. */
  lessonCount: number;
  /**
   * Label for the required region rendered below the final topic (the trail's
   * "Part 2"): required branches attached to the last topic. German-only data;
   * sibling courses leave it unset and have no required branches.
   */
  epilogueTitle?: string;
}

export const EMPTY_CURRICULUM: CurriculumData = {
  topics: [],
  trailBranches: [],
  trailGates: [],
  totalTopics: 0,
  lessonCount: 0,
};

/**
 * The authored spine in reading order: each core followed by its required
 * stories, then the next core. Sprigs and branches are deliberately excluded.
 */
export function spineNodeIds(topics: TopicCluster[]): number[] {
  const ids: number[] = [];
  for (const topic of topics) {
    ids.push(topic.core.id);
    for (const story of topic.stories ?? []) ids.push(story.id);
  }
  return ids;
}

/**
 * Every lesson that completes the trail requires: sprigs marked required plus
 * all lessons of branches marked required. Required lessons cannot be bypassed
 * and must be finished before the trail reports completion.
 */
export function requiredLessonIds(topics: TopicCluster[], branches: TrailBranch[]): Set<number> {
  const ids = new Set<number>();
  for (const topic of topics) {
    for (const sprig of topic.sprigs) {
      if (sprig.required) ids.add(sprig.id);
    }
  }
  for (const branch of branches) {
    if (branch.required) for (const lesson of branch.lessons) ids.add(lesson.id);
  }
  return ids;
}

/** Every map lesson, topic by topic: core, sprigs, support branches, then story. */
export function orderedTrailLessons(topics: TopicCluster[], branches: TrailBranch[]): LessonShell[] {
  const lessons: LessonShell[] = [];
  const includedBranches = new Set<number>();
  for (const topic of topics) {
    lessons.push(topic.core, ...topic.sprigs);
    const owners = new Set([topic.core.id, ...topic.sprigs.map((lesson) => lesson.id)]);
    for (const branch of branches) {
      if (!owners.has(branch.attach)) continue;
      lessons.push(...branch.lessons);
      includedBranches.add(branch.id);
    }
    lessons.push(...(topic.stories ?? []));
  }
  for (const branch of branches) {
    if (!includedBranches.has(branch.id)) lessons.push(...branch.lessons);
  }
  return lessons;
}
