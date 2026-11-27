"use client";

import React, { useEffect, useRef } from "react";
import { alignShiftPair } from "@/lib/shift-annotator";
import type { LessonStar } from "@/lib/types";
import { estimateLessonEffort } from "@/lib/lesson-effort";

/** Chapter colours, in book order: each topic owns one flat field. */
export const CHAPTER_FIELDS = ["#ffd249", "#ffc4ef", "#a4f6f8", "#f9a21f", "#c6f27e"] as const;

export function chapterField(topicId: number | null | undefined): string {
  const n = Math.max(1, Math.floor(topicId ?? 1));
  return CHAPTER_FIELDS[(n - 1) % CHAPTER_FIELDS.length];
}

export function chapterStyle(topicId: number | null | undefined): React.CSSProperties {
  return { ["--x-field" as string]: chapterField(topicId), ["--x-field-ink" as string]: "#0a0a0a" };
}

/** Topic a lesson id belongs to (cores 1–30, sprigs N0x, branches 5xxx attach, stories 900x). */
export function topicOfLesson(id: number, attachForBranch?: (id: number) => number | undefined): number {
  if (id >= 9000) return attachForBranch?.(id) ?? 1;
  if (id >= 5000) return attachForBranch?.(id) ?? 1;
  if (id >= 100) return Math.floor(id / 100);
  return id;
}

/**
 * Staggered entrance: children with `.x-reveal` rise in once, as the container
 * enters the viewport. Content is visible without script (see exp.css).
 */
export function useReveal<T extends HTMLElement>(deps: React.DependencyList = []) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".x-reveal"));
    if (root.classList.contains("x-reveal")) items.unshift(root);
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
          <span key={index} className="x-shifted">
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
  const fill = star === "purple" ? "var(--x-purple)" : "var(--x-gold)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={title ?? `${star} star`}>
      <path
        d="M12 1.8l3.1 6.6 7.1.8-5.3 4.9 1.4 7.1L12 17.6l-6.3 3.6 1.4-7.1L1.8 9.2l7.1-.8z"
        fill={fill}
        stroke="#0a0a0a"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true" className="x-arrow" {...props}>
      <path d="M4 12h15M13 5l7 7-7 7" strokeLinecap="square" />
    </svg>
  );
}

export function minutesLabel(exerciseCount: number | undefined): string | null {
  if (!exerciseCount) return null;
  return `${estimateLessonEffort(exerciseCount).minutes} min`;
}
