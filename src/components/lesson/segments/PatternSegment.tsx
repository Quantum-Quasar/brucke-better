"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Sparkles, TriangleAlert } from "lucide-react";
import panoramaLessonMap from "@/data/panorama-lesson-map.json";


import type { LessonSession } from "../lesson-session-types";

interface GuessWarmup {
  prompt: string;
  expected: string;
  accepted: string[];
  hint: string;
}

const GERMAN_CORE_GUESS_WARMUPS: Record<number, GuessWarmup> = {
  3: {
    prompt: "Guess the German twin of 'ship': ___",
    expected: "Schiff",
    accepted: ["schiff"],
    hint: "Try shifting the final 'p' to a softer breathy consonant.",
  },
  4: {
    prompt: "Guess 'thank' in German",
    expected: "danken",
    accepted: ["danken", "dank", "danke"],
    hint: "Try hardening the opening 'th' sound.",
  },
  5: {
    prompt: "Guess 'water' in German",
    expected: "Wasser",
    accepted: ["wasser"],
    hint: "Try shifting the middle 't' to a hissing sound.",
  },
  6: {
    prompt: "Guess 'book' in German",
    expected: "Buch",
    accepted: ["buch"],
    hint: "Try softening the final 'k' into a throatier sound.",
  },
  7: {
    prompt: "Guess 'day' in German",
    expected: "Tag",
    accepted: ["tag"],
    hint: "Try sharpening the opening 'd' sound.",
  },
};

function normalizeGuess(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase()
    .replace(/^(der|die|das|ein|eine|einen|einem|einer)\s+/i, "")
    .replace(/[.,!?;:]+$/g, "");
}

export default function PatternSegment({ session }: { session: LessonSession }) {
  const { lesson, activeLanguageId, isReading, completedSegments, setCurrentSegment, markSegmentDone } = session;
  const panoramaRef = (panoramaLessonMap as Record<string, Record<string, { desc: string; href: string }>>)[activeLanguageId]?.[String(lesson.id)] ?? null;

  const warmup =
    activeLanguageId === "de" && lesson.id >= 3 && lesson.id <= 7 && !isReading
      ? GERMAN_CORE_GUESS_WARMUPS[lesson.id] ?? null
      : null;
  const warmupKey = `${activeLanguageId}:${lesson.id}`;

  const [resolvedWarmupKey, setResolvedWarmupKey] = useState<string | null>(null);
  const [guessInput, setGuessInput] = useState("");
  const [submittedGuess, setSubmittedGuess] = useState<{
    key: string;
    value: string;
    matched: boolean;
  } | null>(null);

  useEffect(() => {
    setGuessInput("");
  }, [warmupKey]);

  const isWarmupActive =
    warmup !== null && !completedSegments.includes("pattern") && resolvedWarmupKey !== warmupKey;
  const activeFeedback =
    warmup && submittedGuess && submittedGuess.key === warmupKey ? submittedGuess : null;

  const handleGuessSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!warmup) return;
    const trimmed = guessInput.trim();
    if (trimmed) {
      const normalized = normalizeGuess(trimmed);
      setSubmittedGuess({
        key: warmupKey,
        value: trimmed,
        matched: warmup.accepted.includes(normalized),
      });
    } else {
      setSubmittedGuess(null);
    }
    setGuessInput("");
    setResolvedWarmupKey(warmupKey);
  };

  const handleSkipWarmup = () => {
    setSubmittedGuess(null);
    setGuessInput("");
    setResolvedWarmupKey(warmupKey);
  };

  if (isWarmupActive && warmup) {
    return (
      <div className="p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-6 shadow-md animate-in fade-in duration-200">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--sub-color)]/15">
          <span className="text-[var(--main-color)] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/25">
            02 / warm-up
          </span>
          <h2 className="text-xl font-bold font-mono text-[var(--text-color)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--main-color)]" aria-hidden="true" />
            <span>Predict before the rule</span>
          </h2>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-mono font-semibold text-[var(--text-color)]">
            {warmup.prompt}
          </p>
          <p className="text-xs font-mono text-[var(--sub-color)] leading-relaxed">
            {warmup.hint} Take a quick shot — no score, just priming your ear before the sound-shift rule appears.
          </p>
        </div>

        <form onSubmit={handleGuessSubmit} className="space-y-4">
          <input
            type="text"
            value={guessInput}
            onChange={(event) => setGuessInput(event.target.value)}
            placeholder="Type your German guess..."
            aria-label={warmup.prompt}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            autoFocus
            className="w-full px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 focus:border-[var(--main-color)] focus:outline-none text-base font-mono text-[var(--text-color)] placeholder:text-[var(--sub-color)]/60"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--sub-color)]/15">
            <button
              type="button"
              onClick={() => setCurrentSegment("hook")}
              className="text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3 h-3" aria-hidden="true" />
              <span>back</span>
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSkipWarmup}
                className="px-3.5 py-2 rounded-lg border border-[var(--sub-color)]/25 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] hover:border-[var(--sub-color)]/50 transition cursor-pointer"
              >
                Skip to pattern
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-xs transition cursor-pointer"
              >
                <span>Reveal pattern</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
            <div className="p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-6 shadow-md animate-in fade-in duration-200">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--sub-color)]/15">
                <span className="text-[var(--main-color)] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/25">
                  02 / {isReading ? "story" : "pattern"}
                </span>
                <h2 className="text-xl font-bold font-mono text-[var(--text-color)]">{lesson.pattern.title}</h2>
              </div>

              {activeFeedback && warmup && (
                <div role="status" className="p-3.5 rounded-lg bg-[var(--bg-color)] border border-[var(--main-color)]/30 flex items-start gap-2.5 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[var(--main-color)] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-[var(--text-color)] leading-relaxed">
                    {activeFeedback.matched ? (
                      <>
                        Spot on — <span className="font-bold text-[var(--main-color)]">{warmup.expected}</span>. Here is the pattern behind your instinct:
                      </>
                    ) : (
                      <>
                        You guessed <span className="text-[var(--sub-color)]">&ldquo;{activeFeedback.value}&rdquo;</span> — German has{" "}
                        <span className="font-bold text-[var(--main-color)]">{warmup.expected}</span>. Here is the sound-shift rule behind it:
                      </>
                    )}
                  </p>
                </div>
              )}

              <p className="text-[var(--sub-color)] text-base leading-relaxed whitespace-pre-line">{lesson.pattern.content}</p>

              {/* TM-6: the same preventative-correction slot on the pattern card */}
              {lesson.pattern.trap_note && (
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-dashed border-[var(--main-color)]/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
                    <TriangleAlert className="w-3.5 h-3.5" aria-hidden="true" /> the shortcut your mind will offer
                  </div>
                  <p className="text-xs text-[var(--sub-color)] leading-relaxed">{lesson.pattern.trap_note}</p>
                </div>
              )}

              {panoramaRef && (
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-xs font-mono">
                  <span className="text-[var(--sub-color)] inline-flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--main-color)]" aria-hidden="true" />
                    <span>Grammar reference: {panoramaRef.desc}</span>
                  </span>
                  <Link
                    href="/panorama"
                    className="text-[var(--main-color)] hover:underline font-semibold"
                  >
                    Open in Panorama →
                  </Link>
                </div>
              )}

              {lesson.pattern.linguist_note && (
                <details className="optional-notes p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1.5 text-xs font-mono">
                  <summary className="min-h-11 cursor-pointer uppercase tracking-wider text-[var(--main-color)] font-semibold">
                    optional background
                  </summary>
                  <p className="text-[var(--sub-color)] leading-relaxed">{lesson.pattern.linguist_note}</p>
                </details>
              )}

              <div className="pt-4 border-t border-[var(--sub-color)]/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentSegment("hook")}
                  className="text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                  <span>back</span>
                </button>
                <button
                  type="button"
                  onClick={() => markSegmentDone("pattern", "table")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-xs transition cursor-pointer"
                >
                  <span>{isReading ? "next: word bank" : "next: transformation table"}</span>
                  <span className="keycap text-[10px]">enter</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
  );
}
