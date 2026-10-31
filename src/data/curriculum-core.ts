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
 * The spine topic that owns a trail node — core, story, sprig or branch lesson.
 * Sprig ids follow `topicId * 100 + index`; branch lessons belong to the
 * topic their branch attaches to. Returns null for ids outside the trail.
 */
function owningTopicId(content: CurriculumData, nodeId: number): number | null {
  for (const topic of content.topics) {
    if (topic.core.id === nodeId) return topic.id;
    if ((topic.stories ?? []).some((story) => story.id === nodeId)) return topic.id;
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
 * Next authored spine node after the current one (null = caught up). A core or
 * story answers with the next spine node; a sprig or branch answers with the
 * first spine node after its owning core, so a story inserted after that core
 * is recommended before the next core.
 */
export function getNextPlayableLessonIdFrom(
  content: CurriculumData,
  currentId: number
): number | null {
  const owner = owningTopicId(content, currentId);
  if (owner === null) return null;

  const spine = spineNodeIds(content.topics);
  const shells = new Map<number, { authored?: boolean }>();
  for (const topic of content.topics) {
    shells.set(topic.core.id, topic.core);
    for (const story of topic.stories ?? []) shells.set(story.id, story);
  }
  const nextAuthored = (from: number): number | null => {
    for (let i = from; i < spine.length; i++) {
      if (shells.get(spine[i])?.authored) return spine[i];
    }
    return null;
  };

  const currentIndex = spine.indexOf(currentId);
  if (currentIndex >= 0) return nextAuthored(currentIndex + 1);

  const ownerIndex = spine.indexOf(owner);
  if (ownerIndex < 0) return null;
  return nextAuthored(ownerIndex + 1);
}
