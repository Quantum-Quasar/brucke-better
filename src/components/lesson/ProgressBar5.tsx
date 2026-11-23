"use client";

import React from "react";
import type { LessonSegment } from "@/lib/types";

export type { LessonSegment } from "@/lib/types";

interface ProgressBar5Props {
  currentSegment: LessonSegment;
  completedSegments: LessonSegment[];
  onSelectSegment?: (seg: LessonSegment) => void;
}

const SEGMENTS: Array<{ id: LessonSegment; label: string }> = [
  { id: "hook", label: "Hook" },
  { id: "pattern", label: "Pattern" },
  { id: "table", label: "Table" },
  { id: "practice", label: "Practice" },
  { id: "summary", label: "Summary" },
];

export const ProgressBar5: React.FC<ProgressBar5Props> = ({
  currentSegment,
  completedSegments,
  onSelectSegment,
}) => {
  const currentIdx = Math.max(0, SEGMENTS.findIndex((s) => s.id === currentSegment));
  const progressPercent = ((currentIdx + 1) / SEGMENTS.length) * 100;
  const hasCompletedAny = completedSegments.length > 0;

  return (
    <div className="w-full space-y-1.5">
      {/* Continuous linear progress bar */}
      <div
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--sub-color)]/20"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={SEGMENTS.length}
        aria-valuenow={currentIdx + 1}
        aria-label={`Lesson progress: step ${currentIdx + 1} of ${SEGMENTS.length}, ${SEGMENTS[currentIdx]?.label}`}
      >
        <div
          className="h-full rounded-full bg-[var(--main-color)] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Labels + clickable revisit links only for already-completed steps */}
      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[var(--sub-color)]">
        <span>
          Step {currentIdx + 1} of {SEGMENTS.length}
        </span>
        {hasCompletedAny ? (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {SEGMENTS.map((seg) => {
              const isCurrent = seg.id === currentSegment;
              const isDone = completedSegments.includes(seg.id);
              if (!isDone && !isCurrent) return null;
              return (
                <button
                  key={seg.id}
                  type="button"
                  disabled={!isDone || isCurrent}
                  onClick={() => onSelectSegment?.(seg.id)}
                  className={`rounded px-1.5 py-0.5 transition ${
                    isCurrent
                      ? "text-[var(--main-color)] font-semibold cursor-default"
                      : "text-[var(--sub-color)] hover:text-[var(--main-color)] underline underline-offset-2 cursor-pointer"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {seg.label}
                </button>
              );
            })}
          </div>
        ) : (
          <span className="text-[var(--main-color)] font-medium">
            {SEGMENTS[currentIdx]?.label}
          </span>
        )}
      </div>
    </div>
  );
};
