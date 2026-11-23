import { describe, expect, it } from "vitest";
import { DISCRIMINATION_SPRIG_IDS, getLessonMetadata } from "@/lib/lesson-metadata";

describe("getLessonMetadata", () => {
  it("classifies core lessons, sprigs, stories, and branches from IDs without guessing story/branch topicIds", () => {
    expect(getLessonMetadata(1)).toEqual({ kind: "core", topicId: 1, isDiscriminationSprig: false });
    expect(getLessonMetadata(14)).toEqual({ kind: "core", topicId: 14, isDiscriminationSprig: false });
    expect(getLessonMetadata(302)).toEqual({ kind: "sprig", topicId: 3, isDiscriminationSprig: true });
    expect(getLessonMetadata(1101)).toEqual({ kind: "sprig", topicId: 11, isDiscriminationSprig: false });
    expect(getLessonMetadata(9001)).toEqual({ kind: "story", topicId: null, isDiscriminationSprig: false });
    expect(getLessonMetadata(5012)).toEqual({ kind: "branch", topicId: null, isDiscriminationSprig: false });
    expect(getLessonMetadata(5281)).toEqual({ kind: "branch", topicId: null, isDiscriminationSprig: false });
  });

  it("prefers explicit kind, spineStory, and topicId fields when provided on a lesson object", () => {
    expect(getLessonMetadata({ id: 5012, kind: "sprig", topicId: 12 })).toEqual({
      kind: "sprig",
      topicId: 12,
      isDiscriminationSprig: false,
    });
    expect(getLessonMetadata({ id: 5192, spineStory: true, topicId: 19 })).toEqual({
      kind: "story",
      topicId: 19,
      isDiscriminationSprig: false,
    });
  });

  it("exports DISCRIMINATION_SPRIG_IDS for German discrimination sprigs", () => {
    expect(Array.from(DISCRIMINATION_SPRIG_IDS)).toEqual([302, 402, 502, 602, 702]);
  });
});
