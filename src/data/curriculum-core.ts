// Pure curriculum shapes and lookups. No language data is imported here, so
// both the sync server registry and the lazy client loader can share it.

import type { TopicCluster, TrailBranch, TrailGate } from "@/lib/types";

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
