"use client";

import Link from "next/link";
import { isModifiedClick, useAppNavigation } from "@/lib/app-navigation";

export function LessonPracticeLink({ languageId, lessonId }: { languageId: string; lessonId: number }) {
  const { openLesson } = useAppNavigation();
  return <Link href={`/?lesson=${lessonId}&lang=${encodeURIComponent(languageId)}`} onClick={(event) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    openLesson(languageId, lessonId);
  }} className="inline-flex min-h-11 items-center rounded-lg bg-[var(--main-color)] px-5 py-3 font-bold text-[var(--bg-color)]">Start lesson practice</Link>;
}
