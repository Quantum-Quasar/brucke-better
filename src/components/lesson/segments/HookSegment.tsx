"use client";

import { ArrowRight, Sparkles, TriangleAlert } from "lucide-react";

import type { LessonSession } from "../lesson-session-types";


export default function HookSegment({ session }: { session: LessonSession }) {
  const { lesson, isReading, markSegmentDone } = session;
  return (
            <div className="p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-6 shadow-md animate-in fade-in duration-200">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--sub-color)]/15">
                <span className="text-[var(--main-color)] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/25">
                  01 / intro
                </span>
                <h2 className="text-xl font-bold font-mono text-[var(--text-color)]">{lesson.hook.title}</h2>
              </div>

              <p className="text-[var(--sub-color)] text-base leading-relaxed whitespace-pre-line">{lesson.hook.content}</p>

              {/* TM-6: preventative correction — name the shortcut before the mind takes it (§1.9/§1.10) */}
              {lesson.hook.trap_note && (
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-dashed border-[var(--main-color)]/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
                    <TriangleAlert className="w-3.5 h-3.5" /> the shortcut your mind will offer
                  </div>
                  <p className="text-sm text-[var(--sub-color)] leading-relaxed">{lesson.hook.trap_note}</p>
                </div>
              )}

              {/* TM-6: a reference made on purpose, resolved later (§1.6) */}
              {lesson.foreshadow && (
                <p className="text-xs font-mono italic text-[var(--main-color)] border-l-2 border-[var(--main-color)]/40 pl-2.5">
                  {lesson.foreshadow.line}
                </p>
              )}

              {/* TM-6: pays off a foreshadow planted by an earlier lesson */}
              {lesson.payoff && (
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--main-color)]/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" /> remember when this was left open
                  </div>
                  <p className="text-sm text-[var(--sub-color)] leading-relaxed">{lesson.payoff.text}</p>
                </div>
              )}

              {lesson.hook.footnotes && lesson.hook.footnotes.length > 0 && (
                <details className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-2 lg:hidden font-mono">
                  <summary className="min-h-11 cursor-pointer text-xs uppercase tracking-wider text-[var(--sub-color)]">historical notes · optional</summary>
                  {lesson.hook.footnotes.map((fn) => (
                    <div key={fn.marker} className="text-sm text-[var(--sub-color)]">
                      <span className="text-[var(--main-color)] font-bold">[{fn.marker}] {fn.title}:</span> {fn.content}
                      {fn.interest && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--sub-color)] uppercase tracking-wider">
                          for interest — not on the test
                        </span>
                      )}
                    </div>
                  ))}
                </details>
              )}

              <div className="pt-4 border-t border-[var(--sub-color)]/15 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => markSegmentDone("hook", "pattern")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-xs transition cursor-pointer"
                >
                  <span>{isReading ? "next: read the story" : "next: pattern"}</span>
                  <span className="keycap text-[10px]">enter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
  );
}
