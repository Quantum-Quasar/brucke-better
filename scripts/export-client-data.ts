// Exports the heavy per-language content to static JSON under public/data/.
// The app fetches only what a view needs, so review/atlas/lessons never ship
// every lesson body and every language in the JS bundle.
//
// Each lesson gets its own payload (the lesson plus the words it can render),
// which is what the in-page lesson reader fetches. The compendium and compact
// lesson index serve review decks, sentences, the word drawer and the atlas.

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

function writeJson(file: string, value: unknown): number {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const json = `${JSON.stringify(value)}\n`;
  fs.writeFileSync(file, json);
  return Buffer.byteLength(json);
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
      use_example: {
        german: lesson.summary.use_example.german,
        english: lesson.summary.use_example.english,
      },
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

  for (const language of LANGUAGES) {
    exerciseCounts[language.id] = Object.fromEntries(
      language.lessons.map((lesson) => [lesson.id, lesson.exercises.length])
    );
    const ranks = frequencyRanks[language.id as keyof typeof frequencyRanks];
    const compendium = withFrequencyMetadata(language.compendium, ranks);
    const entities = buildWordEntityMaps(language.id, compendium, language.lessons).entities;
    // wordList is derived in the client; dailyInsights stays for expression nodes.
    const { wordList: _wordList, ...payload } = compendium;
    totalBytes += writeJson(path.join(outDir, language.id, "compendium.json"), payload);
    totalBytes += writeJson(
      path.join(outDir, language.id, "lesson-index.json"),
      language.lessons.map(lessonIndexEntry)
    );
    for (const lesson of language.lessons) {
      totalBytes += writeJson(
        path.join(outDir, language.id, "lessons", `${lesson.id}.json`),
        { lesson, compendium: trimCompendium(compendium, lesson, entities) }
      );
      lessonPayloads += 1;
    }
    // Remove obsolete lesson ids rather than shipping stale course payloads.
    const lessonDir = path.join(outDir, language.id, "lessons");
    const wanted = new Set(language.lessons.map((lesson) => `${lesson.id}.json`));
    if (fs.existsSync(lessonDir)) {
      for (const name of fs.readdirSync(lessonDir)) {
        if (name.endsWith(".json") && !wanted.has(name)) {
          fs.unlinkSync(path.join(lessonDir, name));
        }
      }
    }
    shiftNames[language.id] = shiftNameEntries(language.compendium);
  }

  totalBytes += writeJson(path.join(outDir, "frequency-provenance.json"), frequencyProvenance);
  writeJson(shiftNamesPath, shiftNames);
  writeJson(exerciseCountsPath, exerciseCounts);
  return { languages: LANGUAGES.length, lessonPayloads, totalBytes };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { languages, lessonPayloads, totalBytes } = exportClientData();
  console.log(
    `exported ${languages} languages and ${lessonPayloads} lesson payloads to public/data (${(totalBytes / 1024).toFixed(0)} KB)`
  );
}
