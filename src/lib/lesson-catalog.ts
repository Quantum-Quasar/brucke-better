import { LANGUAGES } from "@/data/languages";
import { getLanguageContent } from "@/data/language-content";
import { lessonHref } from "@/lib/routes";
import type { Lesson } from "@/lib/types";

export function getPublishedLesson(languageId: string, rawId: string): Lesson | null {
  if (!LANGUAGES.some((language) => language.id === languageId && language.status === "available") || !/^[1-9]\d*$/.test(rawId)) return null;
  const id = Number(rawId);
  if (!Number.isSafeInteger(id)) return null;
  return getLanguageContent(languageId).lessons.find((lesson) => lesson.id === id) ?? null;
}

export function getPublishedLessonRoutes() {
  return LANGUAGES.filter((language) => language.status === "available").flatMap((language) =>
    getLanguageContent(language.id).lessons.map((lesson) => ({
      lang: language.id, id: String(lesson.id), href: lessonHref(language.id, lesson.id),
    })));
}

export function lessonLearningResource(lesson: Lesson, languageId: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${url}#lesson`,
    url,
    name: lesson.title,
    description: lesson.subtitle,
    learningResourceType: "Lesson",
    inLanguage: ["en", languageId],
    teaches: [lesson.summary.outcome, lesson.summary.takeaway],
    isAccessibleForFree: true,
  };
}
