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
export function getNextPlayableLessonIdIn(
  content: CurriculumData,
  currentId: number
): number | null {
  const owner = owningTopicId(content, currentId);
  if (owner === null) return null;
  for (const topic of content.topics) {
    if (topic.id > owner && topic.id <= content.totalTopics && topic.core.authored) {
      return topic.core.id;
    }
  }
  return null;
}
