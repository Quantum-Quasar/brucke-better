import { afterAll, beforeAll, describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { exportClientData } from "../../scripts/export-client-data";
import sourceProvenance from "@/data/frequency-provenance.json";
import ranks from "@/data/frequency-ranks.json";
import { compendium } from "@/data/compendium";
import { frenchCompendium } from "@/data/french/compendium-fr";
import { spanishCompendium } from "@/data/spanish/compendium-es";
import { dutchCompendium } from "@/data/dutch/compendium-nl";
import { withFrequencyMetadata } from "../../scripts/lib/frequency-payload";
import { FREQUENCY_CHECKSUMS, FREQUENCY_REVISION, frequencySourceUrl } from "../../scripts/lib/frequency-manifest";
import type { LessonIndexEntry, LessonPayload } from "@/lib/types";
import { getLessonExerciseCount } from "@/lib/lesson-effort";

let outputRoot: string;
const LANGUAGES = ["de", "fr", "es", "nl"] as const;
const COMPENDIUMS = { de: compendium, fr: frenchCompendium, es: spanishCompendium, nl: dutchCompendium };

beforeAll(() => {
  outputRoot = fs.mkdtempSync(path.join(os.tmpdir(), "brucke-content-export-"));
  exportClientData(path.join(outputRoot, "data"), path.join(outputRoot, "shift-names.json"));
});

afterAll(() => {
  if (outputRoot) fs.rmSync(outputRoot, { recursive: true, force: true });
});

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(outputRoot, relativePath), "utf8")) as T;
}

describe("client content boundaries", () => {
  it.each(LANGUAGES)("%s advertised lessons resolve to the right payload and vocabulary", (language) => {
    const index = readJson<LessonIndexEntry[]>(`data/${language}/lesson-index.json`);
    // Every course must be able to start its introductory lesson.
    expect(index.find((entry) => entry.id === 1)).toBeDefined();
    expect(new Set(index.map((entry) => entry.id)).size).toBe(index.length);
    for (const entry of index) {
      const payload = readJson<LessonPayload>(`data/${language}/lessons/${entry.id}.json`);
      expect(payload.lesson.id).toBe(entry.id);
      expect(entry.exerciseCount).toBe(payload.lesson.exercises.length);
      for (const id of new Set([...payload.lesson.word_ids, ...payload.lesson.table_word_ids])) {
        expect(payload.compendium.words[id], `${language}/${entry.id}: unresolved ${id}`).toHaveProperty("id", id);
      }
      expect(payload.compendium).not.toHaveProperty("wordList");
    }
  });

  it.each(LANGUAGES)("%s navigation index excludes lesson prose and exercises", (language) => {
    const index = readJson<LessonIndexEntry[]>(`data/${language}/lesson-index.json`);
    for (const lesson of index) {
      expect(lesson).not.toHaveProperty("hook");
      expect(lesson).not.toHaveProperty("pattern");
      expect(lesson).not.toHaveProperty("exercises");
    }
  });

  it.each(LANGUAGES)("%s bundled effort counts match isolated authored lesson payloads", (language) => {
    const counts = readJson<Record<string, Record<string, number>>>("lesson-exercise-counts.json")[language];
    const index = readJson<LessonIndexEntry[]>(`data/${language}/lesson-index.json`);
    expect(Object.keys(counts).sort()).toEqual(index.map((entry) => String(entry.id)).sort());
    for (const entry of index) {
      const payload = readJson<LessonPayload>(`data/${language}/lessons/${entry.id}.json`);
      expect(counts[entry.id]).toBe(payload.lesson.exercises.length);
      expect(getLessonExerciseCount(language, entry.id)).toBe(counts[entry.id]);
    }
    expect(getLessonExerciseCount(language, 0)).toBeUndefined();
  });

  it.each(LANGUAGES)("%s derives the complete export from committed language sources", (language) => {
    const { wordList: _wordList, ...expected } = withFrequencyMetadata(COMPENDIUMS[language], ranks[language]);
    expect(readJson(`data/${language}/compendium.json`)).toEqual(expected);
    const index = readJson<LessonIndexEntry[]>(`data/${language}/lesson-index.json`);
    expect(fs.readdirSync(path.join(outputRoot, "data", language, "lessons"))).toHaveLength(index.length);
  });

  it("generates pinned frequency attribution on an empty output directory without a corpus download", () => {
    const provenance = readJson<typeof sourceProvenance>("data/frequency-provenance.json");
    expect(provenance).toEqual(sourceProvenance);
    expect(provenance.revision).toBe(FREQUENCY_REVISION);
    expect(provenance.license).toBe("CC-BY-SA-4.0");
    for (const language of LANGUAGES) {
      expect(provenance.sources[language]).toEqual({
        url: frequencySourceUrl(language),
        sha256: FREQUENCY_CHECKSUMS[language],
        forms: 50_000,
      });
    }
  });
});
