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

export function normalizeSearch(value: string): string {
  return value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/ß/g, "ss").trim();
}

/** Built only after search opens; no language content is bundled with this module. */
export function buildSearchIndex(languageId: string, data: CompendiumData, lessons: SearchLessonSource[]): SearchEntry[] {
  const entities = buildWordEntityMaps(languageId, data, lessons).entities;
  const teaching = buildTeachingLessonMap(lessons);
  const refs = new Map(lessons.map((lesson) => [lesson.id, {
    id: lesson.id, title: lesson.title, href: lessonHref(languageId, lesson.id),
  }]));
  const words: SearchEntry[] = Object.values(entities)
    .filter((word) => !/^(article_|sentence_)/.test(word.id))
    .map((word) => ({
      kind: "word", id: word.id, title: word.target_word,
      description: word.english_meaning, languageId,
      lessons: (teaching.get(word.id) ?? []).map((id) => refs.get(id)!),
      fields: [word.target_word, word.english_meaning, word.english_cognate, word.domain ?? "", word.shift_rule]
        .map(normalizeSearch),
    }));
  return [...words, ...lessons.map((lesson): SearchEntry => ({
    kind: "lesson", id: String(lesson.id), title: lesson.title, description: lesson.subtitle,
    languageId, lessons: [refs.get(lesson.id)!],
    fields: [lesson.title, lesson.subtitle, lesson.summary.takeaway, `lesson ${lesson.id}`,
      ...lesson.shift_categories.flatMap((id) => [id, data.shifts[id]?.name ?? "", data.shifts[id]?.phonetic_rule ?? ""]),
      ...[...lesson.word_ids, ...lesson.table_word_ids].map((id) => data.words[id]?.domain ?? "")]
      .map(normalizeSearch),
  }))];
}

export function searchIndex(index: SearchEntry[], query: string, limit = 40): SearchEntry[] {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  const tokens = normalized.split(/\s+/);
  return index.filter((entry) => tokens.every((token) => entry.fields.some((field) => field.includes(token))))
    .map((entry) => ({ entry, rank: normalizeSearch(entry.title) === normalized ? 0 : normalizeSearch(entry.title).startsWith(normalized) ? 1 : 2 }))
    .sort((a, b) => a.rank - b.rank || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit).map(({ entry }) => entry);
}
