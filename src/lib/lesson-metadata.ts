export type LessonKind = "core" | "sprig" | "story" | "branch";

export interface LessonMetadata {
  kind: LessonKind;
  topicId: number | null;
  isDiscriminationSprig: boolean;
}

/** Discrimination sprigs that support audio-first prompt playback (German). */
export const DISCRIMINATION_SPRIG_IDS: ReadonlySet<number> = new Set([302, 402, 502, 602, 702]);

/**
 * Derive explicit semantic lesson metadata (`kind`, `topicId`) from a lesson
 * object or numeric ID so callers do not need ad-hoc ID-range arithmetic.
 * If the lesson already carries explicit `kind` / `topicId` fields (or
 * `spineStory: true`), those take precedence over ID conventions.
 */
export function getLessonMetadata(
  lessonOrId: number | { id: number; kind?: LessonKind; topicId?: number; spineStory?: boolean }
): LessonMetadata {
  const id = typeof lessonOrId === "number" ? lessonOrId : lessonOrId.id;
  const explicitKind = typeof lessonOrId === "object" ? lessonOrId.kind : undefined;
  const explicitTopic = typeof lessonOrId === "object" ? lessonOrId.topicId : undefined;
  const isSpineStory = typeof lessonOrId === "object" && lessonOrId.spineStory === true;

  let inferredKind: LessonKind;
  let inferredTopic: number | null = null;

  if (id >= 1 && id <= 99) {
    inferredKind = "core";
    inferredTopic = id;
  } else if (id >= 9000 && id < 10000) {
    inferredKind = "story";
    inferredTopic = null;
  } else if (id >= 5000 && id < 9000) {
    inferredKind = "branch";
    inferredTopic = null;
  } else if (id >= 100 && id < 5000) {
    inferredKind = "sprig";
    inferredTopic = Math.floor(id / 100);
  } else {
    inferredKind = "branch";
    inferredTopic = null;
  }

  return {
    kind: explicitKind ?? (isSpineStory ? "story" : inferredKind),
    topicId: explicitTopic ?? inferredTopic,
    isDiscriminationSprig: DISCRIMINATION_SPRIG_IDS.has(id),
  };
}
