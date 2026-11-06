"use client";

import { ArrowLeft, ArrowRight, Info, TriangleAlert } from "lucide-react";


import type { LessonSession } from "../lesson-session-types";

export default function PatternSegment({ session }: { session: LessonSession }) {
  const { lesson, isReading, setCurrentSegment, markSegmentDone } = session;
  return (
            <div className="p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-6 shadow-md animate-in fade-in duration-200">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--sub-color)]/15">
                <span className="text-[var(--main-color)] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/25">
                  02 / {isReading ? "story" : "pattern"}
                </span>
                <h2 className="text-xl font-bold font-mono text-[var(--text-color)]">{lesson.pattern.title}</h2>
              </div>

              <p className="text-[var(--sub-color)] text-base leading-relaxed whitespace-pre-line">{lesson.pattern.content}</p>

              {/* TM-6: the same preventative-correction slot on the pattern card */}
              {lesson.pattern.trap_note && (
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-dashed border-[var(--main-color)]/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
                    <TriangleAlert className="w-3.5 h-3.5" /> the shortcut your mind will offer
                  </div>
                  <p className="text-xs text-[var(--sub-color)] leading-relaxed">{lesson.pattern.trap_note}</p>
                </div>
              )}

              {lesson.pattern.linguist_note && (
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1.5 text-xs font-mono">
                  <div className="flex items-center gap-1.5 uppercase tracking-wider text-[var(--main-color)] font-semibold">
                    <Info className="w-3.5 h-3.5" /> sound shift rule
                  </div>
                  <p className="text-[var(--sub-color)] leading-relaxed">{lesson.pattern.linguist_note}</p>
                </div>
              )}

              <div className="pt-4 border-t border-[var(--sub-color)]/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentSegment("hook")}
                  className="text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>back</span>
                </button>
                <button
                  type="button"
                  onClick={() => markSegmentDone("pattern", "table")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-xs transition cursor-pointer"
                >
                  <span>{isReading ? "next: word bank" : "next: transformation table"}</span>
                  <span className="keycap text-[10px]">enter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
  );
}
