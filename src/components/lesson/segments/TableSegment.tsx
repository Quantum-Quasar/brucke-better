"use client";

import Link from "next/link";
import { ArrowRight, Compass, Ear } from "lucide-react";
import { ShiftPair } from "@/components/common/ShiftPair";
import { GenderBadge } from "@/components/common/GenderBadge";
import { isModifiedClick } from "@/lib/app-navigation";

import { importLineFor } from "@/data/sound-imports";
import type { LessonSession } from "../lesson-session-types";

export default function TableSegment({ session }: { session: LessonSession }) {
  const { lesson, data, genderSystem, isReading, setCurrentSegment, soundImports, primaryShift, startPractice, resumingPractice, openAtlasFamily } = session;
  return (
            <div className="p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-6 shadow-md animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--sub-color)]/15">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--main-color)] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/25">
                    03 / {isReading ? "word bank" : "table"}
                  </span>
                  <h2 className="text-xl font-bold font-mono text-[var(--text-color)]">{isReading ? "word bank" : "transformation table"}</h2>
                </div>
                <span className="text-xs font-mono text-[var(--sub-color)]">tap word to inspect</span>
              </div>

              <p className="text-sm font-mono text-[var(--sub-color)]">
                {isReading
                  ? "key words from the story — tap one to inspect it:"
                  : "shifted consonants highlight historical transformations against english cognates:"}
              </p>

              {genderSystem && (
                <div className="space-y-1.5 text-xs font-mono text-[var(--sub-color)]">
                  <div className="uppercase tracking-wider text-[10px]">articles are colour-coded</div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    {genderSystem.articles.map((article, index) => (
                      <span key={article} className="inline-flex items-center gap-1.5">
                        <GenderBadge gender={article} size="sm" />
                        <span>{genderSystem.labels[index]}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {lesson.table_word_ids.map((wid) => {
                    const w = data.words[wid.toLowerCase()];
                    if (!w) return null;
                    return (
                      <ShiftPair
                        key={wid}
                        english={w.english_cognate}
                        german={w.target_word}
                        gender={w.gender}
                        rule={w.shift_rule}
                        wordId={w.id}
                        className="w-full justify-between py-2 px-3 bg-[var(--sub-alt-color)] hover:border-[var(--main-color)]/40 border-[var(--sub-color)]/20"
                      />
                    );
                  })}
                </div>
              </div>

              {/* TM-6: sound import — the English word that already contains this sound */}
              {soundImports.length > 0 && (
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--main-color)]/25 space-y-2 font-mono">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
                    <Ear className="w-3.5 h-3.5" /> you already make these sounds
                  </div>
                  <ul className="space-y-1.5">
                    {soundImports.map((imp) => (
                      <li key={imp.grapheme} className="text-xs text-[var(--sub-color)] leading-relaxed">
                        <strong className="text-[var(--main-color)] font-mono">{imp.grapheme}</strong>{" "}
                        <span className="text-[var(--text-color)]">{importLineFor(imp)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Atlas Constellation Bridge */}
              {primaryShift && (
                <div className="p-4 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-xs text-[var(--main-color)] font-semibold">
                      <Compass className="w-3.5 h-3.5" />
                      <span>atlas • {primaryShift.symbol}</span>
                    </div>
                    <p className="text-xs text-[var(--sub-color)]">
                      view all {primaryShift.word_ids.length} cognates in the sound shift atlas.
                    </p>
                  </div>
                  <Link
                    href={`/atlas/${primaryShift.id}`}
                    onClick={(event) => {
                      if (isModifiedClick(event)) return;
                      event.preventDefault();
                      openAtlasFamily(primaryShift.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-xs text-[var(--text-color)] hover:text-[var(--main-color)] transition whitespace-nowrap"
                  >
                    <span>open atlas</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

              <div className="pt-4 border-t border-[var(--sub-color)]/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentSegment("pattern")}
                  className="text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] transition cursor-pointer"
                >
                  ← Back to Pattern <span className="keycap ml-1">Backspace</span>
                </button>
                <button
                  type="button"
                  onClick={startPractice}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-medium text-sm transition cursor-pointer active:scale-95"
                >
                  <span>
                    {resumingPractice
                      ? isReading
                        ? "Resume Questions"
                        : "Resume Exercises"
                      : isReading
                        ? `Start Questions (${lesson.exercises.length})`
                        : `Start Exercises (${lesson.exercises.length} problems)`}
                  </span>
                  <span className="keycap bg-[var(--bg-color)]/20 text-inherit border-none text-[10px]">Enter</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
  );
}
