// Exports the heavy per-language content to static JSON under public/data/.
// The app fetches only what a view needs, so review/atlas/lessons never ship
// every lesson body and every language in the JS bundle.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compendium as germanCompendium } from "../src/data/compendium";
import { frenchCompendium } from "../src/data/french/compendium-fr";
import { spanishCompendium } from "../src/data/spanish/compendium-es";
import { dutchCompendium } from "../src/data/dutch/compendium-nl";
import { LESSONS } from "../src/data/lessons";
import { FR_LESSONS } from "../src/data/french/lessons-fr";
import { ES_LESSONS } from "../src/data/spanish/lessons-es";
import { NL_LESSONS } from "../src/data/dutch/lessons-nl";
import { trimCompendium } from "../src/lib/lesson-payload";
import { buildWordEntityMaps } from "../src/lib/word-entities-core";
import type { CompendiumData, Lesson, LessonIndexEntry, ShiftFamily } from "../src/lib/types";
import frequencyRanks from "../src/data/frequency-ranks.json";
import frequencyProvenance from "../src/data/frequency-provenance.json";
import { withFrequencyMetadata } from "./lib/frequency-payload";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "data");
const SHIFT_NAMES_PATH = path.join(ROOT, "src", "data", "shift-names.json");

interface LanguageSource {
  id: string;
  compendium: CompendiumData;
  lessons: Lesson[];
}

const LANGUAGES: LanguageSource[] = [
  { id: "de", compendium: germanCompendium, lessons: LESSONS },
  { id: "fr", compendium: frenchCompendium, lessons: FR_LESSONS },
  { id: "es", compendium: spanishCompendium, lessons: ES_LESSONS },
  { id: "nl", compendium: dutchCompendium, lessons: NL_LESSONS },
];

function writeJsonIfChanged(file: string, value: unknown): number {
  const json = JSON.stringify(value);
  const buf = Buffer.from(json);
  try {
    const existing = fs.readFileSync(file);
    if (existing.length === buf.length && existing.equals(buf)) {
      return buf.length;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  fs.writeFileSync(file, buf);
  return buf.length;
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
    exerciseCount: lesson.exercises.length,
    shift_categories: lesson.shift_categories,
    word_ids: lesson.word_ids,
    table_word_ids: lesson.table_word_ids,
    summary: {
      use_example: lesson.summary.use_example,
      takeaway: lesson.summary.takeaway,
    },
  };
}

function shiftNameEntries(compendium: CompendiumData) {
  return Object.values(compendium.shifts).map((family: ShiftFamily) => ({
    id: family.id,
    symbol: family.symbol,
    name: family.name,
  }));
}

export function exportClientData(
  outDir = OUT_DIR,
  shiftNamesPath = SHIFT_NAMES_PATH,
  exerciseCountsPath = path.join(path.dirname(shiftNamesPath), "lesson-exercise-counts.json")
) {
  const shiftNames: Record<string, Array<{ id: string; symbol: string; name: string }>> = {};
  const exerciseCounts: Record<string, Record<number, number>> = {};
  let totalBytes = 0;
  let lessonPayloads = 0;

  fs.mkdirSync(path.dirname(shiftNamesPath), { recursive: true });
  fs.mkdirSync(path.dirname(exerciseCountsPath), { recursive: true });

  for (const language of LANGUAGES) {
    const langDir = path.join(outDir, language.id);
    const lessonDir = path.join(langDir, "lessons");
    fs.mkdirSync(lessonDir, { recursive: true });

    const counts: Record<number, number> = {};
    const indexEntries: LessonIndexEntry[] = new Array(language.lessons.length);
    const wanted = new Set<string>();
    for (let i = 0; i < language.lessons.length; i++) {
      const lesson = language.lessons[i];
      counts[lesson.id] = lesson.exercises.length;
      indexEntries[i] = lessonIndexEntry(lesson);
      wanted.add(`${lesson.id}.json`);
    }
    exerciseCounts[language.id] = counts;

    const ranks = frequencyRanks[language.id as keyof typeof frequencyRanks];
    const compendium = withFrequencyMetadata(language.compendium, ranks);
    const entities = buildWordEntityMaps(language.id, compendium, language.lessons).entities;
    const { wordList: _wordList, ...payload } = compendium;

    totalBytes += writeJsonIfChanged(path.join(langDir, "compendium.json"), payload);
    totalBytes += writeJsonIfChanged(path.join(langDir, "lesson-index.json"), indexEntries);

    for (let i = 0; i < language.lessons.length; i++) {
      const lesson = language.lessons[i];
      totalBytes += writeJsonIfChanged(
        path.join(lessonDir, `${lesson.id}.json`),
        { lesson, compendium: trimCompendium(compendium, lesson, entities) }
      );
      lessonPayloads += 1;
    }

    for (const name of fs.readdirSync(lessonDir)) {
      if (name.endsWith(".json") && !wanted.has(name)) {
        fs.unlinkSync(path.join(lessonDir, name));
      }
    }
    shiftNames[language.id] = shiftNameEntries(language.compendium);
  }

  totalBytes += writeJsonIfChanged(path.join(outDir, "frequency-provenance.json"), frequencyProvenance);
  writeJsonIfChanged(shiftNamesPath, shiftNames);
  writeJsonIfChanged(exerciseCountsPath, exerciseCounts);
  return { languages: LANGUAGES.length, lessonPayloads, totalBytes };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { languages, lessonPayloads, totalBytes } = exportClientData();
  console.log(
    `exported ${languages} languages and ${lessonPayloads} lesson payloads to public/data (${(totalBytes / 1024).toFixed(0)} KB)`
  );
}
