"use client";

import Link from "next/link";
import { ArrowRight, Compass, Zap } from "lucide-react";
import { TwistCard } from "../TwistCard";
import { isModifiedClick } from "@/lib/app-navigation";


import type { LessonSession } from "../lesson-session-types";

export default function SummarySegment({ session }: { session: LessonSession }) {
  const { lesson, activeLanguageId, nextLessonId, goToNextLesson, completedSegments, isLessonFinished, everQueued, twistMeetAgain, twistResurfaced, setTwistResurfaced, primaryShift, familyCount, handleResurfaceTwist, handleCompleteAll, nextLesson, openAtlasFamily, openAtlasIndex, preview } = session;
  return (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* End-of-Lesson Summary */}
              <div className="p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-5 shadow-lg font-mono">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--main-color)] font-semibold">
                    <span>lesson complete</span>
                  </div>

                  {/* TM-4e: the star is a posture reward, not a perfection badge */}
                  {isLessonFinished && (
                    <p className="text-xs font-mono italic text-[var(--main-color)]">
                      {everQueued
                        ? "Not a test — a rep."
                        : "Purple means you built every answer by thinking it through, first try."}
                    </p>
                  )}

                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-[var(--main-color)]">after this lesson, you can</div>
                    <p className="text-sm font-semibold text-[var(--text-color)]">{lesson.summary.outcome}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
                    <div className="text-xs uppercase tracking-wider text-[var(--main-color)]">put it to use</div>
                    <p className="text-sm text-[var(--text-color)]">{lesson.summary.use_example.german}</p>
                    <p className="text-xs text-[var(--sub-color)]">{lesson.summary.use_example.english}</p>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-color)]">key takeaway</h3>
                  <p className="text-[var(--sub-color)] text-xs leading-relaxed">{lesson.summary.takeaway}</p>

                  <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
                    <div className="text-xs uppercase tracking-wider text-[var(--main-color)]">curiosity teaser</div>
                    <p className="text-xs text-[var(--sub-color)] italic">{lesson.summary.curiosity_teaser}</p>
                  </div>

                  {/* TM-5a: "not yet" promises the twist returns at the end of the session */}
                  {twistMeetAgain && lesson.twist && !twistResurfaced && (
                    <button
                      type="button"
                      onClick={handleResurfaceTwist}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-color)] border border-[var(--main-color)]/30 text-xs font-mono text-[var(--main-color)] hover:border-[var(--main-color)] transition cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>meet the twist again — think it through once more</span>
                    </button>
                  )}
                  {twistResurfaced && lesson.twist && (
                    <TwistCard twist={lesson.twist} onDone={() => setTwistResurfaced(false)} />
                  )}

                  {/* Atlas Deep-Dive Trail Bridge — the detail route emits every
                      language's family ids, so French lessons bridge into the
                      conversion-bridge atlas the same way. */}
                  <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="text-xs uppercase tracking-wider flex items-center gap-1.5 font-semibold text-[var(--main-color)]">
                        <Compass className="w-3.5 h-3.5" />{" "}
                        {activeLanguageId === "fr"
                          ? "conversion bridge atlas"
                          : activeLanguageId === "nl"
                          ? "correspondence atlas"
                          : activeLanguageId === "es"
                          ? "sound shift atlas"
                          : "sound shift atlas bridge"}
                      </div>
                      <p className="text-sm text-[var(--sub-color)] leading-relaxed">
                        {primaryShift
                          ? `explore all ${primaryShift.word_ids.length} cognates governed by ${primaryShift.symbol} ${
                              activeLanguageId === "fr"
                                ? "across the norman conversion bridges."
                                : activeLanguageId === "nl"
                                ? "across the english–dutch correspondences."
                                : activeLanguageId === "es"
                                ? "across castilian sound history."
                                : "across high german history."
                            }`
                          : activeLanguageId === "fr"
                          ? `explore all ${familyCount} conversion bridge families connecting english and french.`
                          : activeLanguageId === "nl"
                          ? `explore all ${familyCount} correspondence families connecting english and dutch.`
                          : activeLanguageId === "es"
                          ? `explore all ${familyCount} historical shift families connecting english and spanish.`
                          : `explore all ${familyCount} historical shift families connecting english and german.`}
                      </p>
                    </div>
                    <Link
                      href={primaryShift ? `/atlas/${primaryShift.id}` : "/atlas"}
                      onClick={(event) => {
                        if (isModifiedClick(event)) return;
                        event.preventDefault();
                        if (primaryShift) openAtlasFamily(primaryShift.id);
                        else openAtlasIndex();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-xs text-[var(--text-color)] hover:text-[var(--main-color)] transition whitespace-nowrap"
                    >
                      <span>open atlas</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {preview ? (
                      <div className="w-full p-3.5 rounded-lg bg-[var(--bg-color)] border border-dashed border-[var(--main-color)]/40 space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--main-color)] font-semibold">
                          preview mode
                        </div>
                        <p className="text-sm text-[var(--sub-color)] font-sans leading-relaxed">
                          This lesson is ahead of your trail, so finishing it here will not mark it
                          complete or unlock later topics. Return to the earlier topics to count it.
                        </p>
                      </div>
                    ) : (
                      <>
                        {isLessonFinished ? (
                          <span className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[var(--bg-color)] border border-[var(--main-color)]/30 text-[var(--main-color)] font-bold text-xs">
                            lesson mastered ✓
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleCompleteAll}
                            disabled={!completedSegments.includes("practice")}
                            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[var(--bg-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-[var(--text-color)] font-bold text-xs transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            mark lesson finished ✓
                          </button>
                        )}

                        <Link
                          href={nextLessonId ? `/trail/${activeLanguageId}/${nextLessonId}` : "/trail"}
                          onClick={(event) => {
                            if (isModifiedClick(event)) return;
                            event.preventDefault();
                            handleCompleteAll();
                            goToNextLesson();
                          }}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-bold text-xs transition cursor-pointer"
                        >
                          <span>
                            {nextLesson
                              ? `next: ${nextLesson.title}`
                              : nextLessonId
                              ? `next lesson (${nextLessonId})`
                              : "back to the trail"}
                          </span>
                          <span className="keycap text-[10px]">enter</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
  );
}
