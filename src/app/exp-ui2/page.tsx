"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useViewStore } from "@/lib/view-store";
import { P2Home } from "@/components/exp2/P2Home";

const P2Lesson = dynamic(() => import("@/components/exp2/lesson/P2Lesson").then((m) => m.P2Lesson), {
  ssr: false,
  loading: () => (
    <p className="p-wrap p-lead" role="status" style={{ paddingBlock: 120 }}>
      Opening the lesson…
    </p>
  ),
});

export default function P2HomePage() {
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
    return <P2Lesson key={`${lesson.languageId}:${lesson.lessonId}`} languageId={lesson.languageId} lessonId={lesson.lessonId} />;
  }
  return <P2Home />;
}
