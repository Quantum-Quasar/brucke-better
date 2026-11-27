"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useViewStore } from "@/lib/view-store";
import { P4Home } from "@/components/exp4/P4Home";

const P4Lesson = dynamic(() => import("@/components/exp4/lesson/P4Lesson").then((m) => m.P4Lesson), {
  ssr: false,
  loading: () => (
    <p className="m-wrap m-lead" role="status" style={{ paddingBlock: 120 }}>
      Opening the lesson…
    </p>
  ),
});

export default function P4HomePage() {
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
    return <P4Lesson key={`${lesson.languageId}:${lesson.lessonId}`} languageId={lesson.languageId} lessonId={lesson.lessonId} />;
  }
  return <P4Home />;
}
