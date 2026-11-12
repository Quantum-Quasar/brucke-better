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
