"use client";

import React, { useEffect, useRef } from "react";
import { alignShiftPair } from "@/lib/shift-annotator";
import type { LessonStar } from "@/lib/types";
import { estimateLessonEffort } from "@/lib/lesson-effort";

/** The trail takes its colours from the active theme; chapters do not recolour. */
export function chapterStyle(_topicId?: number | null): React.CSSProperties {
  return {};
}

/** Topic a lesson id belongs to (cores 1–30, sprigs N0x, branches 5xxx attach, stories 900x). */
export function topicOfLesson(id: number, attachForBranch?: (id: number) => number | undefined): number {
  if (id >= 9000) return attachForBranch?.(id) ?? 1;
  if (id >= 5000) return attachForBranch?.(id) ?? 1;
  if (id >= 100) return Math.floor(id / 100);
  return id;
}

/**
 * Staggered entrance: children with `.m-reveal` rise in once, as the container
 * enters the viewport. Content is visible without script (see exp.css).
 */
export function useReveal<T extends HTMLElement>(deps: React.DependencyList = []) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".m-reveal"));
    if (root.classList.contains("m-reveal")) items.unshift(root);
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.setAttribute("data-in", "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "true");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** The target word with the letters that changed from its English twin underlined. */
export function ShiftedWord({
  english,
  target,
  rule,
  lang,
  className,
}: {
  english: string;
  target: string;
  rule?: string;
  lang?: string;
  className?: string;
}) {
  const annotation = alignShiftPair(english, target, rule);
  return (
    <span lang={lang} className={className}>
      {annotation.germanSegments.map((segment, index) =>
        segment.isChanged ? (
          <span key={index} className="m-shifted">
            {segment.text}
          </span>
        ) : (
          <React.Fragment key={index}>{segment.text}</React.Fragment>
        )
      )}
    </span>
  );
}

/** Gold = completed, purple = flawless first run. Drawn, not an emoji. */
export function StarMark({ star, size = 22, title }: { star?: LessonStar | null; size?: number; title?: string }) {
  if (!star) return null;
  const fill = star === "purple" ? "#9a4dff" : "#f2b707";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={title ?? `${star} star`}>
      <path
        d="M12 1.8l3.1 6.6 7.1.8-5.3 4.9 1.4 7.1L12 17.6l-6.3 3.6 1.4-7.1L1.8 9.2l7.1-.8z"
        fill={fill}
        stroke="var(--m-ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true" className="m-arrow" {...props}>
      <path d="M4 12h15M13 5l7 7-7 7" strokeLinecap="square" />
    </svg>
  );
}

export function minutesLabel(exerciseCount: number | undefined): string | null {
  if (!exerciseCount) return null;
  return `${estimateLessonEffort(exerciseCount).minutes} min`;
}
