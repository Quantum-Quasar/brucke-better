import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { compendium as de } from "@/data/compendium";
import { frenchCompendium as fr } from "@/data/french/compendium-fr";
import { spanishCompendium as es } from "@/data/spanish/compendium-es";
import { dutchCompendium as nl } from "@/data/dutch/compendium-nl";
import { LESSONS } from "@/data/lessons";
import { FR_LESSONS } from "@/data/french/lessons-fr";
import { ES_LESSONS } from "@/data/spanish/lessons-es";
import { NL_LESSONS } from "@/data/dutch/lessons-nl";
import SHIFT_NAMES from "@/data/shift-names.json";
import { trimCompendium } from "@/lib/lesson-payload";
import type { CompendiumData, Lesson, LessonIndexEntry, LessonPayload } from "@/lib/types";

const ROOT = path.resolve(__dirname, "../..");

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8")) as T;
}

function lessonIndexEntry(lesson: Lesson): LessonIndexEntry {
  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    subtitle: lesson.subtitle,
    phase: lesson.phase,
    spineStory: lesson.spineStory,
    label: lesson.label,
    shift_categories: lesson.shift_categories,
    word_ids: lesson.word_ids,
    table_word_ids: lesson.table_word_ids,
    summary: {
      use_example: {
        german: lesson.summary.use_example.german,
        english: lesson.summary.use_example.english,
      },
      takeaway: lesson.summary.takeaway,
    },
  };
}

const LANGUAGES = [
  { id: "de", compendium: de, lessons: LESSONS },
  { id: "fr", compendium: fr, lessons: FR_LESSONS },
  { id: "es", compendium: es, lessons: ES_LESSONS },
  { id: "nl", compendium: nl, lessons: NL_LESSONS },
];

describe("generated client content", () => {
  for (const language of LANGUAGES) {
    it(`keeps ${language.id} compendium payload in sync`, () => {
      const payload = readJson<Omit<CompendiumData, "wordList">>(
        `public/data/${language.id}/compendium.json`
      );
      expect(payload.words).toEqual(language.compendium.words);
      expect(payload.shifts).toEqual(language.compendium.shifts);
      expect(payload.compounds).toEqual(language.compendium.compounds);
      expect(payload.falseFriends).toEqual(language.compendium.falseFriends);
      expect(payload.dailyInsights).toEqual(language.compendium.dailyInsights);
      expect(payload).not.toHaveProperty("wordList");
    });

    it(`keeps ${language.id} lesson index in sync`, () => {
      const payload = readJson<LessonIndexEntry[]>(`public/data/${language.id}/lesson-index.json`);
      expect(payload).toEqual(language.lessons.map(lessonIndexEntry));
    });

    it(`keeps ${language.id} per-lesson payloads in sync`, () => {
      for (const lesson of language.lessons) {
        const payload = readJson<LessonPayload>(
          `public/data/${language.id}/lessons/${lesson.id}.json`
        );
        expect(payload.lesson).toEqual(lesson);
        expect(payload.compendium).toEqual(trimCompendium(language.compendium, lesson));
        expect(payload.compendium).not.toHaveProperty("wordList");
      }
    });

    it(`keeps ${language.id} shift names in sync`, () => {
      const expected = Object.values(language.compendium.shifts).map((family) => ({
        id: family.id,
        symbol: family.symbol,
        name: family.name,
      }));
      expect(
        (SHIFT_NAMES as Record<string, typeof expected>)[language.id]
      ).toEqual(expected);
    });
  }

  it("does not ship lesson prose in the compact lesson index", () => {
    for (const language of LANGUAGES) {
      const payload = readJson<LessonIndexEntry[]>(`public/data/${language.id}/lesson-index.json`);
      for (const lesson of payload) {
        expect(lesson).not.toHaveProperty("hook");
        expect(lesson).not.toHaveProperty("pattern");
        expect(lesson).not.toHaveProperty("exercises");
      }
    }
  });
});
