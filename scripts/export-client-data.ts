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
import type { CompendiumData, Lesson, LessonIndexEntry, ShiftFamily } from "../src/lib/types";

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
  const json = JSON.stringify(value);
  fs.writeFileSync(file, `${json}\n`);
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

const shiftNames: Record<string, Array<{ id: string; symbol: string; name: string }>> = {};
let totalBytes = 0;
let lessonPayloads = 0;

for (const language of LANGUAGES) {
  // wordList is derived in the client; dailyInsights stays because the master
  // web uses it for expression nodes (French/Spanish carry an empty list).
  const { wordList: _wordList, ...payload } = language.compendium;
  totalBytes += writeJson(path.join(OUT_DIR, language.id, "compendium.json"), payload);
  totalBytes += writeJson(
    path.join(OUT_DIR, language.id, "lesson-index.json"),
    language.lessons.map(lessonIndexEntry)
  );
  // One small file per lesson: the in-page lesson view fetches exactly the
  // lesson it opens plus the words it can render.
  for (const lesson of language.lessons) {
    totalBytes += writeJson(
      path.join(OUT_DIR, language.id, "lessons", `${lesson.id}.json`),
      { lesson, compendium: trimCompendium(language.compendium, lesson) }
    );
    lessonPayloads += 1;
  }
  // Lesson ids can move (reading stories live on the spine now); drop payloads
  // for ids that no longer exist so a stale file is never shipped.
  const lessonDir = path.join(OUT_DIR, language.id, "lessons");
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

// Small enough to stay in the client graph; keeps diagnosis copy independent
// of the fetched compendium.
writeJson(SHIFT_NAMES_PATH, shiftNames);

console.log(
  `exported ${LANGUAGES.length} languages and ${lessonPayloads} lesson payloads to public/data (${(totalBytes / 1024).toFixed(0)} KB)`
);
