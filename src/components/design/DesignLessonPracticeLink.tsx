"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isModifiedClick, useAppNavigation } from "@/lib/app-navigation";

export function DesignLessonPracticeLink({
  languageId,
  lessonId,
}: {
  languageId: string;
  lessonId: number;
}) {
  const { openLesson } = useAppNavigation();

  return (
    <Link
      href={`/design/?lesson=${lessonId}&lang=${encodeURIComponent(languageId)}`}
      onClick={(event) => {
        if (isModifiedClick(event)) return;
        event.preventDefault();
        openLesson(languageId, lessonId);
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-xs hover:opacity-95 transition"
      style={{
        backgroundColor: "var(--design-sapphire)",
        color: "var(--design-on-accent)",
      }}
    >
      <span>Start lesson practice</span>
      <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </Link>
  );
}
