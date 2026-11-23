import { afterAll, beforeAll, describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { exportClientData } from "../../scripts/export-client-data";
import sourceProvenance from "@/data/frequency-provenance.json";
import ranks from "@/data/frequency-ranks.json";
import committedPanoramaMap from "@/data/panorama-lesson-map.json";
import { compendium } from "@/data/compendium";
import { frenchCompendium } from "@/data/french/compendium-fr";
import { spanishCompendium } from "@/data/spanish/compendium-es";
import { dutchCompendium } from "@/data/dutch/compendium-nl";
import { withFrequencyMetadata } from "../../scripts/lib/frequency-payload";
import { FREQUENCY_CHECKSUMS, FREQUENCY_REVISION, frequencySourceUrl } from "../../scripts/lib/frequency-manifest";
import type { CompendiumData, LessonIndexEntry, LessonPayload } from "@/lib/types";
import { getLessonExerciseCount } from "@/lib/lesson-effort";
import { getAtlasFamilies, getAtlasFamily, getFamilyOwnerLanguageIds, UNSHIFTED_FAMILY_ID } from "@/lib/atlas-families";

let outputRoot: string;
const LANGUAGES = ["de", "fr", "es", "nl"] as const;
const COMPENDIUMS = { de: compendium, fr: frenchCompendium, es: spanishCompendium, nl: dutchCompendium };

beforeAll(() => {
  outputRoot = fs.mkdtempSync(path.join(os.tmpdir(), "brucke-content-export-"));
  exportClientData(
    path.join(outputRoot, "data"),
    path.join(outputRoot, "shift-names.json"),
    path.join(outputRoot, "lesson-exercise-counts.json"),
    path.join(outputRoot, "panorama-lesson-map.json")
  );
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
      expect(entry.summary.use_example).toEqual(payload.lesson.summary.use_example);
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

  it("exports reviewed summary alternatives and foils without borrowing unrelated exercises", () => {
    const index = readJson<LessonIndexEntry[]>("data/de/lesson-index.json");
    const modal = index.find((lesson) => lesson.id === 2)!;
    expect(modal.summary.use_example.accepted_answers).toEqual(["Morgen kann ich kommen"]);
    expect(modal.summary.use_example.mcq_distractors).toEqual([
      "Ich morgen kann kommen",
      "Morgen ich kann kommen",
      "Ich kann morgen kommt",
    ]);
    const followUp = index.find((lesson) => lesson.id === 202)!;
    expect(followUp.summary.use_example.accepted_answers).toEqual(["Morgen will ich Deutsch lernen"]);
    expect(followUp.summary.use_example.accepted_answers).not.toContain("Der Kuchen kann teuer sein");
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
    const exportedCompendium = readJson<typeof expected>(`data/${language}/compendium.json`);
    const exportedDetails = readJson<Record<string, string>>(`data/${language}/word-details.json`);
    const rehydrated = {
      ...exportedCompendium,
      words: Object.fromEntries(
        Object.entries(exportedCompendium.words).map(([id, w]) => [
          id,
          { ...w, etymology_derivation: w.etymology_derivation || exportedDetails[id] || "" },
        ])
      ),
    };
    expect(rehydrated).toEqual(expected);
    const index = readJson<LessonIndexEntry[]>(`data/${language}/lesson-index.json`);
    expect(fs.readdirSync(path.join(outputRoot, "data", language, "lessons"))).toHaveLength(index.length);
  });

  it.each(LANGUAGES)("%s atlas families resolve and cover the exported vocabulary", (language) => {
    const payload = readJson<Omit<CompendiumData, "wordList">>(`data/${language}/compendium.json`);
    const data = { ...payload, wordList: Object.values(payload.words) };
    const families = getAtlasFamilies(data);
    const assigned = new Set(Object.values(data.shifts).flatMap((family) => family.word_ids));
    expect(families.map((family) => family.id).sort()).toEqual([...Object.keys(data.shifts), UNSHIFTED_FAMILY_ID].sort());
    for (const family of families) {
      const label = `${language}/${family.id}`;
      expect(getFamilyOwnerLanguageIds(family.id), label).toContain(language);
      expect(getAtlasFamily(data, family.id)?.word_ids, label).toEqual(family.word_ids);
      expect(family.word_ids.some((id) => Object.hasOwn(data.words, id)), label).toBe(true);
    }

    const unshifted = getAtlasFamily(data, UNSHIFTED_FAMILY_ID);
    expect(unshifted?.word_ids).toEqual(data.wordList.filter((word) => !assigned.has(word.id)).map((word) => word.id));
    for (const word of data.wordList) {
      const cells = [word.english_meaning, word.target_word, word.shift_rule, word.context_phrase, word.context_translation];
      expect(cells.every((cell) => cell.trim()), `${language}/${word.id}: incomplete atlas row`).toBe(true);
    }
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

  it("keeps committed panorama-lesson-map.json in sync with exported PANORAMA_LINKS", () => {
    const exportedPanoramaMap = readJson<typeof committedPanoramaMap>("panorama-lesson-map.json");
    expect(committedPanoramaMap).toEqual(exportedPanoramaMap);
  });
});
