"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useViewStore } from "@/lib/view-store";
import { E5Home } from "@/components/exp5/E5Home";

const E5Lesson = dynamic(() => import("@/components/exp5/lesson/E5Lesson").then((m) => m.E5Lesson), {
  ssr: false,
  loading: () => (
    <p className="v-wrap v-lead" role="status" style={{ paddingBlock: 120 }}>
      Opening the lesson…
    </p>
  ),
});

export default function E5HomePage() {
  const subView = useViewStore((s) => s.subView);
  const lesson = subView?.kind === "lesson" ? subView : null;
  const homeScroll = useRef(0);
  const wasInLesson = useRef(false);

  // The lesson replaces the trail in place; coming back lands where you were.
  useEffect(() => {
    if (lesson && !wasInLesson.current) {
      homeScroll.current = window.scrollY;
      window.scrollTo(0, 0);
    } else if (!lesson && wasInLesson.current) {
      requestAnimationFrame(() => window.scrollTo(0, homeScroll.current));
    }
    wasInLesson.current = Boolean(lesson);
  }, [lesson]);

  if (lesson) {
    return <E5Lesson key={`${lesson.languageId}:${lesson.lessonId}`} languageId={lesson.languageId} lessonId={lesson.lessonId} />;
  }
  return <E5Home />;
}
