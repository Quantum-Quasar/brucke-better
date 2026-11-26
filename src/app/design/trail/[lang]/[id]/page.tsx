import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLanguageDefinition } from "@/data/languages";
import { getLanguageContent } from "@/data/language-content";
import {
  getPublishedLesson,
  getPublishedLessonRoutes,
  lessonLearningResource,
} from "@/lib/lesson-catalog";
import { getSiteUrl } from "@/lib/site-url";
import { lessonHref } from "@/lib/routes";
import { LessonEffort } from "@/components/common/LessonEffort";
import { DesignLessonPracticeLink } from "@/components/design/DesignLessonPracticeLink";

type Props = { params: Promise<{ lang: string; id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedLessonRoutes().map(({ lang, id }) => ({ lang, id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  const lesson = getPublishedLesson(lang, id);
  if (!lesson) notFound();
  const canonical = new URL(lessonHref(lang, lesson.id, "/design"), getSiteUrl()).href;
  const title = `${lesson.title} — ${getLanguageDefinition(lang).name} lesson | Brücke Atelier`;
  return {
    title,
    description: lesson.subtitle,
    alternates: { canonical },
    openGraph: { title, description: lesson.subtitle, url: canonical, type: "article" },
  };
}

export default async function DesignLessonDetailPage({ params }: Props) {
  const { lang, id } = await params;
  const lesson = getPublishedLesson(lang, id);
  if (!lesson) notFound();
  const language = getLanguageDefinition(lang);
  const data = getLanguageContent(lang).compendium;
  const words = [...new Set([...lesson.word_ids, ...lesson.table_word_ids])].flatMap((wordId) =>
    data?.words[wordId] ? [data.words[wordId]] : []
  );
  const url = new URL(lessonHref(lang, lesson.id, "/design"), getSiteUrl()).href;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lessonLearningResource(lesson, lang, url)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <header className="design-hero-surface p-6 sm:p-8 space-y-4">
        <Link
          href="/design"
          className="min-h-11 inline-flex items-center gap-1.5 px-3 rounded-full bg-[var(--design-well)] border border-[var(--design-border)] text-xs font-semibold text-[var(--design-ink-muted)] hover:text-[var(--design-sapphire)] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to learning trail</span>
        </Link>

        <p className="design-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--design-sapphire)]">
          {language.flag} {language.name} through English · Lesson {lesson.id}
        </p>

        <h1 className="design-serif text-3xl sm:text-4xl font-bold text-[var(--design-ink)] leading-tight">
          {lesson.title}
        </h1>

        <p className="text-base sm:text-lg text-[var(--design-ink-muted)] leading-relaxed">
          {lesson.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <LessonEffort exerciseCount={lesson.exercises.length} />
          <DesignLessonPracticeLink languageId={lang} lessonId={lesson.id} />
        </div>
      </header>

      {[lesson.hook, lesson.pattern].map((section, index) => (
        <section key={index} className="design-card p-6 space-y-3">
          <h2 className="design-serif text-xl font-bold text-[var(--design-ink)]">
            {section.title}
          </h2>
          <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-[var(--design-ink)]">
            {section.content}
          </p>
        </section>
      ))}

      {words.length > 0 && (
        <section className="design-card p-6 space-y-4">
          <h2 className="design-serif text-xl font-bold text-[var(--design-ink)]">
            Words in this lesson
          </h2>
          <dl className="grid gap-3 sm:grid-cols-2">
            {words.map((word) => (
              <div key={word.id} className="design-well p-3.5 space-y-0.5">
                <dt lang={lang} className="font-bold text-[var(--design-sapphire)]">
                  {word.target_word}
                </dt>
                <dd className="text-sm text-[var(--design-ink)]">{word.english_meaning}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="design-card p-6 space-y-3">
        <h2 className="design-serif text-xl font-bold text-[var(--design-ink)]">
          What you will practice
        </h2>
        <p className="text-sm sm:text-base text-[var(--design-ink)] leading-relaxed">
          {lesson.summary.outcome}
        </p>
        <p className="text-sm text-[var(--design-ink-muted)] leading-relaxed">
          {lesson.summary.takeaway}
        </p>
        <div className="design-well p-4 space-y-1">
          <p lang={lang} className="font-bold text-[var(--design-ink)]">
            {lesson.summary.use_example.german}
          </p>
          <p className="text-sm text-[var(--design-ink-muted)]">
            {lesson.summary.use_example.english}
          </p>
        </div>
        <div className="pt-2">
          <DesignLessonPracticeLink languageId={lang} lessonId={lesson.id} />
        </div>
      </section>
    </article>
  );
}
