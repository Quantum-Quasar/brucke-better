import { LessonDetailClient } from "@/components/lesson/LessonDetailClient";
import { LegacyLessonRedirect } from "@/components/lesson/LegacyLessonRedirect";
import { getCompendium, getLanguageContent } from "@/data/language-content";
import { getCurriculum, getNextPlayableLessonIdFor } from "@/data/curriculum-registry";
import { LANGUAGES, isValidLanguageId } from "@/data/languages";
import { notFound } from "next/navigation";
import type { CompendiumData, Lesson, WordEntity } from "@/lib/types";
import type { Metadata } from "next";

export const dynamicParams = false;

const AVAILABLE_LANGUAGES = LANGUAGES.filter((language) => language.status === "available");

export function generateStaticParams() {
  const params: Array<{ slug: string[] }> = [];
  const legacyIds = new Set<number>();
  for (const language of AVAILABLE_LANGUAGES) {
    for (const lesson of getLanguageContent(language.id).lessons) {
      legacyIds.add(lesson.id);
      params.push({ slug: [language.id, String(lesson.id)] });
    }
  }
  for (const id of legacyIds) params.push({ slug: [String(id)] });
  return params;
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

function resolveLesson(slug: string[]) {
  if (slug.length === 1) {
    const id = Number.parseInt(slug[0], 10);
    if (Number.isNaN(id)) return null;
    return { lessonId: id, languageId: undefined as string | undefined };
  }
  if (slug.length === 2) {
    const [lang, rawId] = slug;
    const id = Number.parseInt(rawId, 10);
    if (!isValidLanguageId(lang) || Number.isNaN(id)) return null;
    return { lessonId: id, languageId: lang };
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveLesson(slug);
  if (!resolved) return { title: `Lesson — Brücke` };
  const languageId = resolved.languageId ?? "de";
  const lesson = getLanguageContent(languageId).lessons.find(
    (entry) => entry.id === resolved.lessonId
  );
  if (!lesson) return { title: `Lesson ${resolved.lessonId} — Brücke` };
  return {
    title: `${lesson.title} — Brücke`,
    description: lesson.subtitle,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = resolveLesson(slug);
  if (!resolved) notFound();

  // Legacy /trail/<id> links resolve the course on the client, where the
  // learner's active language is known. Redirect there instead of rendering a
  // second copy of the lesson (and loading every language's content).
  if (!resolved.languageId) {
    return <LegacyLessonRedirect lessonId={resolved.lessonId} />;
  }

  const languageId = resolved.languageId;
  const content = getLanguageContent(languageId);
  const lesson = content.lessons.find((entry) => entry.id === resolved.lessonId) ?? null;
  const curriculum = getCurriculum(languageId);
  const nextLessonId = lesson ? getNextPlayableLessonIdFor(languageId, lesson.id) : null;
  const nextLesson = nextLessonId
    ? content.lessons.find((entry) => entry.id === nextLessonId)
    : undefined;

  const lessonTitles: Record<number, string> = {};
  for (const entry of content.lessons) lessonTitles[entry.id] = entry.title;

  return (
    <LessonDetailClient
      lessonId={resolved.lessonId}
      languageId={languageId}
      lesson={lesson}
      lessonCount={content.lessons.length}
      compendium={lessonCompendium(languageId, lesson)}
      curriculum={{
        topics: curriculum.topics,
        trailBranches: curriculum.trailBranches,
        trailGates: curriculum.trailGates,
        totalTopics: curriculum.totalTopics,
      }}
      lessonTitles={lessonTitles}
      nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title } : undefined}
      nextLessonId={nextLessonId}
    />
  );
}

/**
 * Only the words this lesson can render (plus the language's shift families).
 * The full compendium is fetched separately by review/atlas/the word drawer,
 * so a lesson page never pays for the whole dictionary.
 */
function lessonCompendium(languageId: string, lesson: Lesson | null): CompendiumData {
  if (!lesson) {
    return {
      words: {},
      wordList: [],
      shifts: getCompendium(languageId).shifts,
      compounds: [],
      falseFriends: [],
      dailyInsights: [],
    };
  }
  const full = getCompendium(languageId);
  const words: Record<string, WordEntity> = {};
  for (const rawId of new Set([...lesson.word_ids, ...(lesson.table_word_ids ?? [])])) {
    const key = rawId.toLowerCase();
    const word = full.words[key];
    if (word) words[key] = word;
  }
  return {
    words,
    wordList: Object.values(words),
    shifts: full.shifts,
    compounds: [],
    falseFriends: [],
    dailyInsights: [],
  };
}
