import { GERMAN_CHAPTERS, GERMAN_FINISH, GERMAN_WORLD, type GermanChapterId } from "@/data/german-trail";
import { followTrail, type TrailKey } from "./branching-trail-graph";
import type { NodeStatus, NodeView } from "./trail-map";
import type { LessonProgress, LessonStar } from "./types";

interface ChapterProgress {
  status: NodeStatus;
  count: number;
  total: number;
  skills: readonly boolean[];
  traversed: ReadonlySet<TrailKey>;
}

export interface GermanTrailProgress {
  nodes: Map<number, NodeView>;
  chapters: ReadonlyMap<GermanChapterId, ChapterProgress>;
  world: { reached: ReadonlySet<TrailKey>; traversed: ReadonlySet<TrailKey> };
  finished: boolean;
}

export function getGermanTrailProgress(completed: readonly number[], stars: Readonly<Record<number, LessonStar>> = {}): GermanTrailProgress {
  const done = new Set(completed);
  const nodes = new Map<number, NodeView>();
  const chapters = new Map<GermanChapterId, ChapterProgress>();
  const world = followTrail(GERMAN_WORLD, true, (id, reached) => {
    const chapter = GERMAN_CHAPTERS[id];
    const skills = chapter.skills.map((skill) => skill.lessons.some((lessonId) => done.has(lessonId)));
    // Saved completions keep their IDs. In an open chapter, a saved completion
    // can also open its own neighbours, even if its old route was different.
    const local = followTrail(chapter.map, reached, (lessonId) => done.has(lessonId));
    let count = 0;
    let total = 0;
    for (const { value } of chapter.map.stops) {
      if (value === null) continue;
      total++;
      const completed = done.has(value);
      if (completed) count++;
      nodes.set(value, {
        status: completed ? "completed" : local.reached.has(value) ? "available" : "locked",
        star: stars[value],
      });
    }
    const cleared = reached && count >= chapter.clearCount && skills.every(Boolean);
    chapters.set(id, {
      status: cleared ? "completed" : reached ? "available" : "locked",
      count, total, skills, traversed: local.traversed,
    });
    return cleared;
  });
  return { nodes, chapters, world, finished: world.reached.has(GERMAN_FINISH) };
}

export function focusGermanChapter(progress: GermanTrailProgress): GermanChapterId {
  if (progress.finished) return "bridge";
  let chosen: GermanChapterId = "first";
  let priority = -1;
  for (const { value, level } of GERMAN_WORLD.stops) {
    if (value === null) continue;
    const chapter = progress.chapters.get(value)!;
    if (chapter.status !== "available") continue;
    const score = level + chapter.count / 100;
    if (score > priority) {
      priority = score;
      chosen = value;
    }
  }
  return chosen;
}

export function recommendGermanLesson(
  progress: GermanTrailProgress,
  started: Readonly<Record<number, LessonProgress>>,
): number | null {
  if (progress.finished) return null;
  const id = focusGermanChapter(progress);
  const chapter = GERMAN_CHAPTERS[id];
  const needs = progress.chapters.get(id)!.skills;
  let selected: number | null = null;
  let priority = -1;
  for (const { value, level } of chapter.map.stops) {
    if (value === null || progress.nodes.get(value)?.status !== "available") continue;
    const score = (started[value] ? 100 : 0)
      + (chapter.skills.some((skill, i) => !needs[i] && skill.lessons.includes(value)) ? 30 : 0)
      + level;
    if (score > priority) {
      selected = value;
      priority = score;
    }
  }
  return selected;
}
