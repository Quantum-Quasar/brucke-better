import { describe, it, expect } from "vitest";
import { LESSONS } from "@/data/lessons";
import { FR_LESSONS } from "@/data/french/lessons-fr";
import { ES_LESSONS } from "@/data/spanish/lessons-es";
import { NL_LESSONS } from "@/data/dutch/lessons-nl";
import type { Lesson } from "@/lib/types";

function assertUniqueExerciseIds(label: string, lessons: readonly Lesson[]) {
  const seen = new Map<string, number>();
  const duplicates: string[] = [];
  for (const lesson of lessons) {
    for (const ex of lesson.exercises) {
      const prev = seen.get(ex.id);
      if (prev !== undefined) {
        duplicates.push(`${ex.id} (lessons ${prev} and ${lesson.id})`);
      } else {
        seen.set(ex.id, lesson.id);
      }
    }
  }
  expect(duplicates, `${label} duplicate exercise IDs`).toEqual([]);
}

describe("Whole-course exercise.id uniqueness", () => {
  it("has no duplicate exercise IDs across German lessons", () => {
    assertUniqueExerciseIds("German", LESSONS);
  });

  it("has no duplicate exercise IDs across French, Spanish, and Dutch lessons", () => {
    assertUniqueExerciseIds("French", FR_LESSONS);
    assertUniqueExerciseIds("Spanish", ES_LESSONS);
    assertUniqueExerciseIds("Dutch", NL_LESSONS);
  });
});
