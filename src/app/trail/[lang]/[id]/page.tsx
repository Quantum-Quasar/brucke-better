import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLanguageDefinition } from "@/data/languages";
import { getLanguageContent } from "@/data/language-content";
import { getPublishedLesson, getPublishedLessonRoutes, lessonLearningResource } from "@/lib/lesson-catalog";
import { getSiteUrl } from "@/lib/site-url";
import { lessonHref } from "@/lib/routes";
import { LessonPracticeLink } from "@/components/navigation/LessonPracticeLink";
import { LessonEffort } from "@/components/common/LessonEffort";

type Props = { params: Promise<{ lang: string; id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedLessonRoutes().map(({ lang, id }) => ({ lang, id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  const lesson = getPublishedLesson(lang, id);
  if (!lesson) notFound();
  const canonical = new URL(lessonHref(lang, lesson.id), getSiteUrl()).href;
  const title = `${lesson.title} — ${getLanguageDefinition(lang).name} lesson | Brücke`;
  return {
    title, description: lesson.subtitle, alternates: { canonical },
    openGraph: { title, description: lesson.subtitle, url: canonical, type: "article" },
  };
}

export default async function LessonPage({ params }: Props) {
  const { lang, id } = await params;
  const lesson = getPublishedLesson(lang, id);
  if (!lesson) notFound();
  const language = getLanguageDefinition(lang);
  const data = getLanguageContent(lang).compendium;
  const words = [...new Set([...lesson.word_ids, ...lesson.table_word_ids])].flatMap((wordId) => data?.words[wordId] ? [data.words[wordId]] : []);
  const url = new URL(lessonHref(lang, lesson.id), getSiteUrl()).href;
  return (
    <article className="mx-auto w-full max-w-3xl px-safe-page py-8 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lessonLearningResource(lesson, lang, url)).replace(/</g, "\\u003c") }} />
      <header className="space-y-3">
        <Link href="/" className="inline-flex min-h-11 items-center text-sm underline text-[var(--sub-color)]">Back to learning trail</Link>
        <p className="text-sm text-[var(--sub-color)]">{language.name} through English · Lesson {lesson.id}</p>
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="text-lg text-[var(--sub-color)]">{lesson.subtitle}</p>
        <LessonEffort exerciseCount={lesson.exercises.length} />
        <LessonPracticeLink languageId={lang} lessonId={lesson.id} />
      </header>
      {[lesson.hook, lesson.pattern].map((section, index) => <section key={index} className="space-y-3">
        <h2 className="text-xl font-bold">{section.title}</h2>
        <p className="whitespace-pre-line leading-relaxed">{section.content}</p>
      </section>)}
      {words.length > 0 && <section className="space-y-3">
        <h2 className="text-xl font-bold">Words in this lesson</h2>
        <dl className="grid gap-3 sm:grid-cols-2">{words.map((word) => <div key={word.id} className="rounded-lg border border-[var(--sub-color)]/20 p-3">
          <dt lang={lang} className="font-bold text-[var(--main-color)]">{word.target_word}</dt>
          <dd>{word.english_meaning}</dd>
        </div>)}</dl>
      </section>}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">What you will practise</h2>
        <p>{lesson.summary.outcome}</p>
        <p>{lesson.summary.takeaway}</p>
        <p lang={lang} className="font-bold">{lesson.summary.use_example.german}</p>
        <p>{lesson.summary.use_example.english}</p>
        <LessonPracticeLink languageId={lang} lessonId={lesson.id} />
      </section>
    </article>
  );
}
