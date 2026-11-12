import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import type { LessonIndexEntry, LessonPayload } from "@/lib/types";

const ROOT = path.resolve(__dirname, "../..");
const LANGUAGES = ["de", "fr", "es", "nl"] as const;

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8")) as T;
}

describe("client content boundaries", () => {
  it.each(LANGUAGES)("%s advertised lessons resolve to the right payload and vocabulary", (language) => {
    const index = readJson<LessonIndexEntry[]>(`public/data/${language}/lesson-index.json`);
    // Every course must be able to start its introductory lesson.
    expect(index.find((entry) => entry.id === 1)).toBeDefined();
    expect(new Set(index.map((entry) => entry.id)).size).toBe(index.length);
    for (const entry of index) {
      const payload = readJson<LessonPayload>(`public/data/${language}/lessons/${entry.id}.json`);
      expect(payload.lesson.id).toBe(entry.id);
      for (const id of new Set([...payload.lesson.word_ids, ...payload.lesson.table_word_ids])) {
        expect(payload.compendium.words[id], `${language}/${entry.id}: unresolved ${id}`).toHaveProperty("id", id);
      }
      expect(payload.compendium).not.toHaveProperty("wordList");
    }
  });

  it.each(LANGUAGES)("%s navigation index excludes lesson prose and exercises", (language) => {
    const index = readJson<LessonIndexEntry[]>(`public/data/${language}/lesson-index.json`);
    for (const lesson of index) {
      expect(lesson).not.toHaveProperty("hook");
      expect(lesson).not.toHaveProperty("pattern");
      expect(lesson).not.toHaveProperty("exercises");
    }
  });
});
