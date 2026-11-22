import type { CompendiumData, LessonIndexEntry } from "@/lib/types";
import { buildWordEntityMaps } from "@/lib/word-entities-core";
import { lessonHref } from "@/lib/routes";
import { buildTeachingLessonMap } from "@/lib/teaching-lessons";

export interface SearchLesson {
  id: number;
  title: string;
  href: string;
}

export interface SearchEntry {
  kind: "word" | "lesson";
  id: string;
  title: string;
  description: string;
  languageId: string;
  lessons: SearchLesson[];
  fields: string[];
}

type SearchLessonSource = Pick<LessonIndexEntry,
  "id" | "title" | "subtitle" | "summary" | "shift_categories" | "word_ids" | "table_word_ids">;

const NON_ASCII_RE = /[\u0080-\uFFFF]/;
const DIACRITICS_RE = /\p{M}/gu;
const ESZETT_RE = /ß/g;
const WS_RE = /\s+/;

export function normalizeSearch(value: string): string {
  if (!value) return "";
  if (!NON_ASCII_RE.test(value)) {
    return value.toLowerCase().trim();
  }
  return value.normalize("NFKD").replace(DIACRITICS_RE, "").toLowerCase().replace(ESZETT_RE, "ss").trim();
}

/** Built only after search opens; no language content is bundled with this module. */
export function buildSearchIndex(languageId: string, data: CompendiumData, lessons: SearchLessonSource[]): SearchEntry[] {
  const entities = buildWordEntityMaps(languageId, data, lessons).entities;
  const teaching = buildTeachingLessonMap(lessons);
  const refs = new Map<number, SearchLesson>();
  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    refs.set(lesson.id, {
      id: lesson.id,
      title: lesson.title,
      href: lessonHref(languageId, lesson.id),
    });
  }

  const out: SearchEntry[] = [];
  const entityValues = Object.values(entities);
  for (let i = 0; i < entityValues.length; i++) {
    const word = entityValues[i];
    if (word.id.startsWith("article_") || word.id.startsWith("sentence_")) continue;
    const lessonIds = teaching.get(word.id);
    const wordLessons: SearchLesson[] = [];
    if (lessonIds) {
      for (let j = 0; j < lessonIds.length; j++) {
        wordLessons.push(refs.get(lessonIds[j])!);
      }
    }
    out.push({
      kind: "word",
      id: word.id,
      title: word.target_word,
      description: word.english_meaning,
      languageId,
      lessons: wordLessons,
      fields: [
        normalizeSearch(word.target_word),
        normalizeSearch(word.english_meaning),
        normalizeSearch(word.english_cognate),
        word.domain ? normalizeSearch(word.domain) : "",
        normalizeSearch(word.shift_rule),
      ],
    });
  }

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const fields: string[] = [
      normalizeSearch(lesson.title),
      normalizeSearch(lesson.subtitle),
      normalizeSearch(lesson.summary.takeaway),
      `lesson ${lesson.id}`,
    ];
    for (let j = 0; j < lesson.shift_categories.length; j++) {
      const id = lesson.shift_categories[j];
      const shift = data.shifts[id];
      fields.push(normalizeSearch(id));
      if (shift) {
        if (shift.name) fields.push(normalizeSearch(shift.name));
        if (shift.phonetic_rule) fields.push(normalizeSearch(shift.phonetic_rule));
      }
    }
    const seenDomains = new Set<string>();
    for (let j = 0; j < lesson.word_ids.length; j++) {
      const dom = data.words[lesson.word_ids[j]]?.domain;
      if (dom && !seenDomains.has(dom)) {
        seenDomains.add(dom);
        fields.push(normalizeSearch(dom));
      }
    }
    for (let j = 0; j < lesson.table_word_ids.length; j++) {
      const dom = data.words[lesson.table_word_ids[j]]?.domain;
      if (dom && !seenDomains.has(dom)) {
        seenDomains.add(dom);
        fields.push(normalizeSearch(dom));
      }
    }
    out.push({
      kind: "lesson",
      id: String(lesson.id),
      title: lesson.title,
      description: lesson.subtitle,
      languageId,
      lessons: [refs.get(lesson.id)!],
      fields,
    });
  }

  return out;
}

export function searchIndex(index: SearchEntry[], query: string, limit = 40): SearchEntry[] {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  const tokens = normalized.split(WS_RE);
  const tLen = tokens.length;
  const matched: { entry: SearchEntry; rank: number }[] = [];

  for (let i = 0; i < index.length; i++) {
    const entry = index[i];
    const fields = entry.fields;
    const fLen = fields.length;
    let allMatch = true;
    for (let t = 0; t < tLen; t++) {
      const tok = tokens[t];
      let found = false;
      for (let f = 0; f < fLen; f++) {
        if (fields[f].includes(tok)) {
          found = true;
          break;
        }
      }
      if (!found) {
        allMatch = false;
        break;
      }
    }
    if (!allMatch) continue;
    // fields[0] is always the pre-normalized title (word.target_word or lesson.title)
    const normTitle = fields[0];
    const rank = normTitle === normalized ? 0 : normTitle.startsWith(normalized) ? 1 : 2;
    matched.push({ entry, rank });
  }

  matched.sort((a, b) => a.rank - b.rank || a.entry.title.localeCompare(b.entry.title));
  return matched.slice(0, limit).map(({ entry }) => entry);
}
