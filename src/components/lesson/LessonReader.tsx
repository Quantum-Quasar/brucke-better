"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Info,
  Compass,
  HeartHandshake,
  Zap,
  Ear,
  TriangleAlert,
  Compass as CompassIcon,
  Brain,
} from "lucide-react";
import { ProgressBar5, type LessonSegment } from "./ProgressBar5";
import { ShiftPair } from "@/components/common/ShiftPair";
import { GenderBadge } from "@/components/common/GenderBadge";
import { ExerciseWidget } from "./ExerciseWidgets";
import { TwistCard } from "./TwistCard";
import { useAppStore } from "@/lib/store";
import { whisperCuesForLesson } from "@/data/posture-cues";
import { RETRY_INTENT_LINE, retryVariant } from "@/lib/retry-variation";
import { isListeningSkipped, listeningSkipLabel } from "@/lib/listening";
import { consciousnessLineFor } from "@/data/consciousness";
import { getSoundImportsForLanguage, importLineFor, type SoundImport } from "@/data/sound-imports";
import { getCurriculum, getNextPlayableLessonIdFor } from "@/data/curriculum-registry";
import { getLanguageDefinition } from "@/data/languages";
import { lessonHref } from "@/lib/routes";
import type { CompendiumData, Lesson, ExerciseItem } from "@/lib/types";

interface LessonReaderProps {
  lesson: Lesson;
  /** Language of a language-scoped URL; falls back to the active course. */
  languageId?: string;
  /** The lesson's words + the language's shift families, sliced on the server. */
  compendium: CompendiumData;
  /** Metadata for the next authored lesson, resolved on the server. */
  nextLesson?: { id: number; title: string };
  /** Locked deep links can be walked as a preview, but must not change progress. */
  preview?: boolean;
}

export const LessonReader: React.FC<LessonReaderProps> = ({
  lesson,
  languageId,
  compendium,
  nextLesson: nextLessonMeta,
  preview = false,
}) => {
  const router = useRouter();
  const storeLanguageId = useAppStore((s) => s.activeLanguageId);
  const activeLanguageId = languageId ?? storeLanguageId;
  const data = compendium;
  const totalTopics = getCurriculum(activeLanguageId).totalTopics || 30;
  const genderSystem = getLanguageDefinition(activeLanguageId).genderSystem;
  const nextLessonId = React.useMemo(
    () => getNextPlayableLessonIdFor(activeLanguageId, lesson.id),
    [activeLanguageId, lesson.id]
  );
  const savedProgress = useAppStore((s) => s.lessonProgress[lesson.id]);
  const [currentSegment, setCurrentSegment] = useState<LessonSegment>(savedProgress?.segment || "hook");
  const [practiceIndex, setPracticeIndex] = useState(savedProgress?.practiceIndex || 0);
  const [retryIndex, setRetryIndex] = useState(0);
  const [inRetryPhase, setInRetryPhase] = useState(false);
  const [completedSegments, setCompletedSegments] = useState<LessonSegment[]>(savedProgress?.completedSegments || []);
  const [retryQueue, setRetryQueue] = useState<ExerciseItem[]>([]);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  // purple star ledger: stays false only when the retry queue was never touched all lesson
  const [everQueued, setEverQueued] = useState(savedProgress?.everQueued ?? false);
  // TM-5a: the twist card runs after the last exercise, before the reinforcement queue
  const [twistPhase, setTwistPhase] = useState(false);
  const [twistCompleted, setTwistCompleted] = useState(false);
  // TM-5a: "not yet" re-surfaces the twist at the end of the session (in-memory only)
  const [twistMeetAgain, setTwistMeetAgain] = useState(false);
  const [twistResurfaced, setTwistResurfaced] = useState(false);
  // TM-4c queue mercy: failed attempts per exercise id in the reinforcement phase
  const [failCounts, setFailCounts] = useState<Record<string, number>>({});
  const [mercyRevealFor, setMercyRevealFor] = useState<string | null>(null);

  const showPostureCues = useAppStore((s) => s.settings.showPostureCues);
  const listeningSkippedUntil = useAppStore((s) => s.settings.listeningSkippedUntil);
  const flagGuessed = useAppStore((s) => s.flagGuessed);
  // TM-6: rotating retry surfaces — attempt number per exercise id, in memory only
  const [retryAttempts, setRetryAttempts] = useState<Record<string, number>>({});
  // TM-6: the offshoot trough — one genuine tangent, shown once, never grading anything
  const [detourDismissed, setDetourDismissed] = useState(false);
  const detourFootnote = React.useMemo(
    () =>
      [...(lesson.hook.footnotes ?? []), ...(lesson.pattern.footnotes ?? [])].find((fn) => fn.interest) ?? null,
    [lesson.id]
  );
  // TM-6 (guidebook §1.4): "you already make this sound" — only the imports whose
  // grapheme actually appears in this lesson's table words, so it never lectures
  // about a sound the learner is not meeting right now.
  const soundImports = React.useMemo<SoundImport[]>(() => {
    if (currentSegment !== "table") return [];
    const onPage = new Set(
      lesson.table_word_ids
        .map((wid) => data.words[wid.toLowerCase()]?.target_word.toLowerCase() ?? "")
        .join(" ")
    );
    return getSoundImportsForLanguage(activeLanguageId).filter((imp) =>
      onPage.has(imp.grapheme[0].toLowerCase()) || [...onPage].some((w) => w.includes(imp.grapheme[0].toLowerCase()))
    ).slice(0, 3);
  }, [currentSegment, lesson.id, data.words, activeLanguageId]);

  const showDetour = Boolean(detourFootnote) && !detourDismissed && practiceIndex === 2 && !inRetryPhase && !twistPhase;
  // TM-6: re-whisper learning consciousness on a deterministic subset of the trail
  const consciousnessLine = React.useMemo(() => consciousnessLineFor(lesson.id), [lesson.id]);
  const listeningOff = isListeningSkipped(listeningSkippedUntil);
  const whisperCues = React.useMemo(
    () => whisperCuesForLesson(lesson.id, lesson.exercises.map((e) => e.type), showPostureCues),
    [lesson.id, lesson.exercises, showPostureCues]
  );

  const primaryShiftId = lesson.shift_categories && lesson.shift_categories[0];
  const primaryShift = primaryShiftId ? data.shifts[primaryShiftId] : null;
  const isFrench = activeLanguageId === "fr";
  const familyCount = Object.keys(data.shifts).length;

  const completeLesson = useAppStore((s) => s.completeLesson);
  const seedSrsCards = useAppStore((s) => s.seedSrsCards);
  const setLessonProgress = useAppStore((s) => s.setLessonProgress);

  const storeHydrated = useAppStore((s) => s.storeHydrated);
  const hydrateEpoch = useAppStore((s) => s.hydrateEpoch);
  // Epoch of the hydration this component last adopted from. `-1` means the
  // first pass has not seen a hydrated store yet.
  const adoptedEpochRef = useRef(-1);

  useEffect(() => {
    // The store starts from defaults and applies localStorage only after mount,
    // and child effects run before the root layout's hydration effect (Strict
    // Mode even re-runs them after it). So on a reload this effect first sees
    // the initial "hook" position. Before persisting that over the saved state,
    // adopt the position the store just restored; only then write. The epoch
    // also makes an open lesson adopt a cross-tab save instead of overwriting it.
    if (preview || (languageId && storeLanguageId !== languageId)) return;
    if (!storeHydrated) return;
    if (adoptedEpochRef.current !== hydrateEpoch) {
      const isRehydration = adoptedEpochRef.current !== -1;
      adoptedEpochRef.current = hydrateEpoch;
      const persisted = useAppStore.getState().lessonProgress[lesson.id];
      if (persisted) {
        const samePosition =
          persisted.segment === currentSegment &&
          persisted.practiceIndex === practiceIndex &&
          persisted.completedSegments.join("|") === completedSegments.join("|") &&
          (persisted.everQueued ?? false) === everQueued;
        if (!samePosition) {
          setCurrentSegment(persisted.segment);
          setPracticeIndex(persisted.practiceIndex);
          setCompletedSegments(persisted.completedSegments);
          setEverQueued(persisted.everQueued ?? false);
          return;
        }
      } else if (isRehydration) {
        // Another tab reset/imported progress and this lesson's entry is gone:
        // restart it rather than immediately writing the stale local position back.
        setCurrentSegment("hook");
        setPracticeIndex(0);
        setCompletedSegments([]);
        setEverQueued(false);
        setRetryQueue([]);
        setInRetryPhase(false);
        setRetryIndex(0);
        setIsLessonFinished(false);
        return;
      }
    }
    setLessonProgress(lesson.id, {
      segment: currentSegment,
      practiceIndex,
      completedSegments,
      everQueued,
    });
  }, [
    lesson.id,
    currentSegment,
    practiceIndex,
    completedSegments,
    everQueued,
    storeHydrated,
    hydrateEpoch,
    setLessonProgress,
    preview,
    languageId,
    storeLanguageId,
  ]);

  // Global keyboard navigation across lesson reading segments (Hook, Pattern, Table, Summary)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      const isInput =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        Boolean(active?.isContentEditable);

      if (isInput) return;

      // A focused button/link keeps its native Enter/Space activation. Without
      // this guard the summary shortcut called preventDefault() on the focused
      // "mark lesson finished" button and navigated to the next lesson instead.
      const isActivationKey = e.key === "Enter" || e.key === " " || e.code === "Space";
      const isInteractive =
        active instanceof HTMLButtonElement ||
        active instanceof HTMLAnchorElement ||
        active instanceof HTMLSelectElement ||
        active?.getAttribute("role") === "button" ||
        active?.getAttribute("role") === "link";
      if (isInteractive && isActivationKey) return;

      if (currentSegment === "hook") {
        if (e.key === "Enter" || e.key === " " || e.code === "Space") {
          e.preventDefault();
          markSegmentDone("hook", "pattern");
        }
      } else if (currentSegment === "pattern") {
        if (e.key === "Enter" || e.key === " " || e.code === "Space") {
          e.preventDefault();
          markSegmentDone("pattern", "table");
        } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSegment("hook");
        }
      } else if (currentSegment === "table") {
        if (e.key === "Enter" || e.key === " " || e.code === "Space") {
          e.preventDefault();
          setPracticeIndex(0);
          setRetryIndex(0);
          setInRetryPhase(false);
          setRetryQueue([]);
          setEverQueued(false);
          setTwistPhase(false);
          setTwistCompleted(false);
          setTwistMeetAgain(false);
          setTwistResurfaced(false);
          setFailCounts({});
          setMercyRevealFor(null);
          setRetryAttempts({});
          markSegmentDone("table", "practice");
        } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSegment("pattern");
        }
      } else if (currentSegment === "summary") {
        if (!preview && (retryQueue.length === 0 || isLessonFinished)) {
          if (e.key === "Enter" || e.key === " " || e.code === "Space") {
            e.preventDefault();
            handleCompleteAll();
            router.push(nextLessonId ? lessonHref(activeLanguageId, nextLessonId) : "/trail");
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSegment, retryQueue.length, isLessonFinished, lesson.id, nextLessonId, router, preview]);

  // Opening a lesson must not seed the review queue. Cards are created when the
  // lesson is actually finished (handleCompleteAll), so Review stays honest.

  const handleExerciseError = (exercise: ExerciseItem) => {
    setEverQueued(true);
    setRetryQueue((prev) => {
      if (prev.some((e) => e.id === exercise.id)) return prev;
      return [...prev, exercise];
    });
  };

  // TM-4c: count misses per item during reinforcement so "Walk me through it" can appear
  const handleRetryError = (exercise: ExerciseItem) => {
    setFailCounts((prev) => ({ ...prev, [exercise.id]: (prev[exercise.id] ?? 0) + 1 }));
    // TM-6: the next presentation of this item gets a fresh surface (§1.7/§1.9)
    setRetryAttempts((prev) => ({ ...prev, [exercise.id]: (prev[exercise.id] ?? 0) + 1 }));
    handleExerciseError(exercise);
  };

  /** TM-5a / retry hand-off after the initial run (and after the twist) completes. */
  const advanceAfterInitialRun = () => {
    if (retryQueue.length > 0) {
      setInRetryPhase(true);
      setRetryIndex(0);
    } else {
      markSegmentDone("practice", "summary");
    }
  };

  const handleTwistDone = (meetAgain: boolean) => {
    setTwistPhase(false);
    setTwistCompleted(true);
    if (meetAgain) setTwistMeetAgain(true);
    advanceAfterInitialRun();
  };

  const handleResurfaceTwist = () => {
    setTwistMeetAgain(false);
    setTwistResurfaced(true);
  };

  /** TM-4c: drain the current item after a guided re-learn; it returns in Review. */
  const drainCurrentRetry = () => {
    setMercyRevealFor(null);
    const nextQueue = retryQueue.filter((e) => e.id !== currentExercise?.id);
    if (nextQueue.length === 0) {
      setRetryQueue([]);
      setInRetryPhase(false);
      markSegmentDone("practice", "summary");
    } else {
      setRetryQueue(nextQueue);
      setRetryIndex((prev) => Math.min(prev, nextQueue.length - 1));
    }
  };

  const handlePracticeSuccess = () => {
    if (!inRetryPhase) {
      if (practiceIndex + 1 < lesson.exercises.length) {
        setPracticeIndex((prev) => prev + 1);
      } else {
        // Initial run complete. The twist (if authored) comes first, then reinforcement.
        if (lesson.twist && !twistCompleted && !twistPhase) {
          setTwistPhase(true);
          return;
        }
        advanceAfterInitialRun();
      }
    } else {
      // In retry phase
      if (retryIndex + 1 < retryQueue.length) {
        setRetryIndex((prev) => prev + 1);
      } else {
        // All retries cleared!
        setRetryQueue([]);
        setInRetryPhase(false);
        markSegmentDone("practice", "summary");
      }
    }
  };

  const handleCompleteAll = () => {
    if (preview) return;
    if (!completedSegments.includes("practice")) return;
    completeLesson(lesson.id, { perfect: !everQueued, nextLessonId });
    // Finished-lesson words enter the SM-2 queue so "due today" isn't empty for new learners.
    const allWords = Array.from(new Set([...lesson.word_ids, ...(lesson.table_word_ids ?? [])]));
    const toSeed = allWords.filter((id) => id in data.words);
    if (lesson.summary?.use_example?.german) toSeed.push(`sentence_${lesson.id}`);
    seedSrsCards(toSeed);
    setIsLessonFinished(true);
    setCompletedSegments(["hook", "pattern", "table", "practice", "summary"]);
  };

  // Reaching the summary is the completion point. Persist it immediately so
  // Back to Trail / the Trail tab cannot silently discard a finished lesson.
  const autoCompletedRef = useRef(false);
  React.useEffect(() => {
    if (preview || autoCompletedRef.current) return;
    if (languageId && storeLanguageId !== languageId) return;
    if (currentSegment !== "summary" || retryQueue.length > 0) return;
    // Do not award completion if the learner jumped straight to summary via
    // the segment bar without finishing the practice.
    if (!completedSegments.includes("practice")) return;
    autoCompletedRef.current = true;
    handleCompleteAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, currentSegment, retryQueue.length, completedSegments, languageId, storeLanguageId]);

  const nextLesson = nextLessonId ? nextLessonMeta : undefined;

  const markSegmentDone = (seg: LessonSegment, nextSeg: LessonSegment) => {
    setCompletedSegments((prev) => Array.from(new Set([...prev, seg])));
    setCurrentSegment(nextSeg);
  };

  const startPractice = () => {
    setPracticeIndex(0);
    setRetryIndex(0);
    setInRetryPhase(false);
    setRetryQueue([]);
    setEverQueued(false);
    setTwistPhase(false);
    setTwistCompleted(false);
    setTwistMeetAgain(false);
    setTwistResurfaced(false);
    setFailCounts({});
    setMercyRevealFor(null);
    setRetryAttempts({});
    markSegmentDone("table", "practice");
  };

  const stickyAction = (() => {
    if (preview || twistPhase || inRetryPhase) return null;
    if (currentSegment === "hook") {
      return { label: "next: pattern", run: () => markSegmentDone("hook", "pattern") };
    }
    if (currentSegment === "pattern") {
      return { label: "next: transformation table", run: () => markSegmentDone("pattern", "table") };
    }
    if (currentSegment === "table") {
      return { label: `start exercises (${lesson.exercises.length})`, run: startPractice };
    }
    if (currentSegment === "summary") {
      return {
        label: nextLesson ? `next: ${nextLesson.title}` : "back to the trail",
        run: () => {
          handleCompleteAll();
          router.push(nextLessonId ? lessonHref(activeLanguageId, nextLessonId) : "/trail");
        },
      };
    }
    return null;
  })();

  const currentExercise = React.useMemo(() => {
    if (!inRetryPhase) return lesson.exercises[practiceIndex];
    const queued = retryQueue[retryIndex] as ExerciseItem;
    return retryVariant(queued, queued ? retryAttempts[queued.id] ?? 0 : 0);
  }, [inRetryPhase, retryQueue, retryIndex, retryAttempts, practiceIndex, lesson.exercises]);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header & Navigation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Link
            href="/trail"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] transition px-2.5 py-1.5 rounded border border-[var(--sub-color)]/20 hover:border-[var(--main-color)]/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Trail
          </Link>
          <span className="text-xs font-mono text-[var(--main-color)] font-medium px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/20">
            {lesson.id <= 30
              ? `Topic ${lesson.id} of ${totalTopics} · Core`
              : lesson.id >= 5000
              ? `Branch Track · ${lesson.id}`
              : `Topic ${Math.floor(lesson.id / 100)} · Sprig ${lesson.id % 100}`}
          </span>
        </div>

        {/* 5-segment Progress bar */}
        <ProgressBar5
          currentSegment={currentSegment}
          completedSegments={completedSegments}
          onSelectSegment={(seg) => setCurrentSegment(seg)}
        />

        {/* Lesson Title */}
        <div className="pt-2">
          <span className="text-xs font-mono text-[var(--main-color)] uppercase tracking-wider font-semibold">
            Phase {lesson.phase} ·{" "}
            {lesson.id <= 30
              ? activeLanguageId === "de"
                ? "Core Shift"
                : "Core"
              : lesson.id >= 5000
              ? "Support Track"
              : "Practice Sprig"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[var(--text-color)] tracking-tight mt-1">
            {lesson.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--sub-color)] mt-2 font-normal leading-relaxed">
            {lesson.subtitle}
          </p>

          {/* TM-6: hearing is off for now — said once, plainly, never as an error */}
          {listeningOff && (
            <p className="mt-3 text-xs font-mono text-[var(--sub-color)] inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20">
              <Brain className="w-3.5 h-3.5" /> {listeningSkipLabel(
                (listeningSkippedUntil ?? 0) - Date.now()
              )} — listening exercises read from the page instead
            </p>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Step Card Column */}
        <div className="lg:col-span-8 space-y-6 text-[var(--text-color)] text-base leading-relaxed font-mono">
          {/* STEP 1: The Hook Card */}
          {currentSegment === "hook" && (
            <div className="p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-6 shadow-md animate-in fade-in duration-200">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--sub-color)]/15">
                <span className="text-[var(--main-color)] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/25">
                  01 / intro
                </span>
                <h2 className="text-xl font-bold font-mono text-[var(--text-color)]">{lesson.hook.title}</h2>
              </div>

              <p className="text-[var(--sub-color)] text-sm leading-relaxed">{lesson.hook.content}</p>

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
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-2 lg:hidden font-mono">
                  <span className="text-xs uppercase tracking-wider text-[var(--sub-color)] block">historical notes</span>
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
                </div>
              )}

              <div className="pt-4 border-t border-[var(--sub-color)]/15 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => markSegmentDone("hook", "pattern")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-xs transition cursor-pointer"
                >
                  <span>next: pattern</span>
                  <span className="keycap text-[10px]">enter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: The Pattern Card */}
          {currentSegment === "pattern" && (
            <div className="p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-6 shadow-md animate-in fade-in duration-200">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--sub-color)]/15">
                <span className="text-[var(--main-color)] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/25">
                  02 / pattern
                </span>
                <h2 className="text-xl font-bold font-mono text-[var(--text-color)]">{lesson.pattern.title}</h2>
              </div>

              <p className="text-[var(--sub-color)] text-sm leading-relaxed">{lesson.pattern.content}</p>

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
                  <span>next: transformation table</span>
                  <span className="keycap text-[10px]">enter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Transformation Table Card */}
          {currentSegment === "table" && (
            <div className="p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-6 shadow-md animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--sub-color)]/15">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--main-color)] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/25">
                    03 / table
                  </span>
                  <h2 className="text-xl font-bold font-mono text-[var(--text-color)]">transformation table</h2>
                </div>
                <span className="text-xs font-mono text-[var(--sub-color)]">tap word to inspect</span>
              </div>

              <p className="text-sm font-mono text-[var(--sub-color)]">
                shifted consonants highlight historical transformations against english cognates:
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
                  <span>Start Exercises ({lesson.exercises.length} problems)</span>
                  <span className="keycap bg-[var(--bg-color)]/20 text-inherit border-none text-[10px]">Enter</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Interactive Practice Card (ONE AT A TIME + TWIST + SEAMLESS RETRY QUEUE) */}
          {currentSegment === "practice" && (twistPhase ? lesson.twist : currentExercise) && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* TM-4b whisper-cue: pacing/framing micro-line, at most twice per lesson */}
              {!inRetryPhase &&
                !twistPhase &&
                whisperCues[practiceIndex] &&
                (practiceIndex === 0 || practiceIndex === 3) && (
                  <p className="text-xs italic text-[var(--sub-color)] font-mono pl-1 border-l-2 border-[var(--main-color)]/40">
                    {whisperCues[practiceIndex]}
                  </p>
                )}

              {/* TM-6 (guidebook §1.10): one re-whispered line, on this lesson only if it is a stop */}
              {!inRetryPhase && !twistPhase && practiceIndex === 0 && showPostureCues && consciousnessLine && (
                <p className="text-xs italic text-[var(--sub-color)] font-mono pl-2.5 border-l-2 border-[var(--main-color)]/30">
                  {consciousnessLine}
                </p>
              )}

              {/* TM-6 (guidebook §1.3): the load-reset trough — a 30-second detour, skippable,
                  ungraded, never inside the queue, at the lesson's natural mid-point */}
              {showDetour && detourFootnote && (
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 space-y-2 font-mono animate-in fade-in duration-200">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
                      <CompassIcon className="w-3.5 h-3.5" /> 30-second detour
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--sub-color)] uppercase tracking-wider">
                      for interest — not on the test
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[var(--text-color)]">{detourFootnote.title}</p>
                  <p className="text-xs text-[var(--sub-color)] leading-relaxed">{detourFootnote.content}</p>
                  <button
                    type="button"
                    onClick={() => setDetourDismissed(true)}
                    className="w-full py-2 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--sub-color)] hover:text-[var(--main-color)] text-xs font-mono transition cursor-pointer"
                  >
                    back to the exercise
                  </button>
                </div>
              )}

              {/* Exercise Step Tracker */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  {twistPhase ? (
                    <>
                      <Zap className="w-3.5 h-3.5 text-[var(--main-color)]" />
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--main-color)] font-medium">
                        twist · ungraded
                      </span>
                    </>
                  ) : inRetryPhase ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[var(--main-color)] animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--main-color)] font-medium">
                        reinforcement · problem {retryIndex + 1} of {retryQueue.length}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--main-color)] font-medium">
                      problem {practiceIndex + 1} of {lesson.exercises.length}
                    </span>
                  )}
                </div>

                {/* Duolingo-style mini step dots */}
                <div className="flex items-center gap-1.5">
                  {inRetryPhase
                    ? retryQueue.map((ex, idx) => (
                        <span
                          key={`retry-dot-${ex.id}-${idx}`}
                          className={`h-1 rounded transition-all duration-200 ${
                            idx === retryIndex
                              ? "w-6 bg-[var(--main-color)]"
                              : idx < retryIndex
                              ? "w-3 bg-[var(--main-color)]/50"
                              : "w-3 bg-[var(--sub-color)]/20"
                          }`}
                        />
                      ))
                    : (
                      <>
                        {lesson.exercises.map((ex, idx) => (
                          <span
                            key={ex.id}
                            className={`h-1 rounded transition-all duration-200 ${
                              idx === practiceIndex && !twistPhase
                                ? "w-6 bg-[var(--main-color)]"
                                : idx < practiceIndex || twistPhase
                                ? "w-3 bg-[var(--main-color)]/50"
                                : "w-3 bg-[var(--sub-color)]/20"
                            }`}
                          />
                        ))}
                        {lesson.twist && (
                          <span
                            className={`h-1 rounded transition-all duration-200 ${
                              twistPhase
                                ? "w-6 bg-[var(--main-color)]"
                                : twistCompleted
                                ? "w-3 bg-[var(--main-color)]/50"
                                : "w-3 bg-[var(--sub-color)]/20"
                            }`}
                          />
                        )}
                      </>
                    )}
                </div>
              </div>

              {/* TM-5a: the Twist card — its own step, outside the queue entirely */}
              {twistPhase && lesson.twist && (
                <TwistCard twist={lesson.twist} onDone={handleTwistDone} />
              )}

              {!twistPhase && (
                <>
              {/* Informative Reinforcement Banner when in Retry Phase */}
              {inRetryPhase && (
                <div className="p-3 rounded bg-[var(--sub-alt-color)] border border-[var(--main-color)]/30 space-y-1 text-xs text-[var(--main-color)] font-mono">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>
                        reinforcing {retryQueue.length} exercise{retryQueue.length > 1 ? "s" : ""}
                      </span>
                    </div>
                    <span className="hidden sm:inline">
                      step {retryIndex + 1}/{retryQueue.length}
                    </span>
                  </div>
                  <p className="text-[var(--sub-color)]">
                    These come back in Review either way — you can&apos;t lose them.
                  </p>
                  <p className="text-[var(--sub-color)]/80 italic">{RETRY_INTENT_LINE}</p>
                </div>
              )}

              {/* The Single Bite-Sized Exercise */}
              <ExerciseWidget
                key={inRetryPhase ? `retry_${currentExercise.id}_${retryIndex}` : `init_${currentExercise.id}_${practiceIndex}`}
                exercise={currentExercise}
                isRetry={inRetryPhase}
                onSuccess={handlePracticeSuccess}
                onError={() =>
                  inRetryPhase ? handleRetryError(currentExercise) : handleExerciseError(currentExercise)
                }
                onQueueRetry={() => handleExerciseError(currentExercise)}
                onPurpleForfeit={() => setEverQueued(true)}
                onFlagGuessed={() => flagGuessed(lesson.word_ids)}
              />

              {/* TM-4c queue mercy: after a second miss on the same item, offer a guided re-learn */}
              {inRetryPhase && !mercyRevealFor && (failCounts[currentExercise.id] ?? 0) >= 2 && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setMercyRevealFor(currentExercise.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] hover:border-[var(--main-color)]/40 transition cursor-pointer"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Walk me through it</span>
                  </button>
                </div>
              )}

              {inRetryPhase && mercyRevealFor === currentExercise.id && currentExercise && (
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--main-color)]/30 space-y-2 font-mono">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>re-learned — this one comes back in review</span>
                  </div>
                  <div className="text-sm font-bold text-[var(--main-color)]">{currentExercise.target_answer}</div>
                  {currentExercise.explanation && (
                    <p className="text-xs text-[var(--sub-color)] leading-relaxed">{currentExercise.explanation}</p>
                  )}
                  <button
                    type="button"
                    onClick={drainCurrentRetry}
                    className="w-full py-2 rounded bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-bold text-xs transition cursor-pointer"
                  >
                    continue
                  </button>
                </div>
              )}
                </>
              )}

              <div className="flex items-center justify-between px-1 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setInRetryPhase(false);
                    setRetryIndex(0);
                    setCurrentSegment("table");
                  }}
                  className="text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] transition cursor-pointer"
                >
                  ← Review Transformation Table
                </button>
                {!inRetryPhase && practiceIndex > 0 && !twistPhase && (
                  <button
                    type="button"
                    onClick={() => setPracticeIndex((prev) => Math.max(0, prev - 1))}
                    className="text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] transition cursor-pointer"
                  >
                    Previous Problem
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Summary & Retries */}
          {currentSegment === "summary" && (
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
                          : activeLanguageId === "es"
                          ? "sound shift atlas"
                          : "sound shift atlas bridge"}
                      </div>
                      <p className="text-sm text-[var(--sub-color)] leading-relaxed">
                        {primaryShift
                          ? `explore all ${primaryShift.word_ids.length} cognates governed by ${primaryShift.symbol} ${
                              activeLanguageId === "fr"
                                ? "across the norman conversion bridges."
                                : activeLanguageId === "es"
                                ? "across castilian sound history."
                                : "across high german history."
                            }`
                          : activeLanguageId === "fr"
                          ? `explore all ${familyCount} conversion bridge families connecting english and french.`
                          : activeLanguageId === "es"
                          ? `explore all ${familyCount} historical shift families connecting english and spanish.`
                          : `explore all ${familyCount} historical shift families connecting english and german.`}
                      </p>
                    </div>
                    <Link
                      href={primaryShift ? `/atlas/${primaryShift.id}` : "/atlas"}
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
                          href={nextLessonId ? lessonHref(activeLanguageId, nextLessonId) : "/trail"}
                          onClick={(event) => {
                            event.preventDefault();
                            handleCompleteAll();
                            router.push(nextLessonId ? lessonHref(activeLanguageId, nextLessonId) : "/trail");
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
            )}
        </div>

        {/* Right Margin Column: Desktop Side Notes */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4 font-mono">
          <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[var(--main-color)] flex items-center gap-1.5 font-semibold">
              <BookOpen className="w-3.5 h-3.5" /> margin notes
            </span>
            <div className="space-y-2.5 text-[13px] text-[var(--sub-color)] leading-relaxed">
              {lesson.hook.footnotes?.map((fn) => (
                <div key={fn.marker} className="p-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
                  <span className="text-[var(--main-color)] font-bold">[{fn.marker}] {fn.title}</span>
                  <p>{fn.content}</p>
                  {fn.interest && (
                    <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--sub-color)] uppercase tracking-wider">
                      for interest — not on the test
                    </span>
                  )}
                </div>
              ))}
              {lesson.pattern.footnotes?.map((fn) => (
                <div key={fn.marker} className="p-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
                  <span className="text-[var(--main-color)] font-bold">[{fn.marker}] {fn.title}</span>
                  <p>{fn.content}</p>
                  {fn.interest && (
                    <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--sub-color)] uppercase tracking-wider">
                      for interest — not on the test
                    </span>
                  )}
                </div>
              ))}
              <div className="p-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
                <span className="text-[var(--main-color)] font-bold">cognate clue</span>
                <p>
                  {activeLanguageId === "fr"
                    ? "in 1066 norman french crossed the channel — thousands of cognates entered english and never left."
                    : activeLanguageId === "es"
                    ? "spanish and english share thousands of latin roots — castilian melted initial f- to silent h-, -ct- to -ch-, and -tion to -ción."
                    : "high german shifted consonants 1,300 years ago, leaving english as a living time capsule of ancestral germanic roots."}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {stickyAction && (
        <div className="sm:hidden fixed bottom-3 left-3 right-3 z-30">
          <button
            type="button"
            onClick={stickyAction.run}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-sm font-mono shadow-lg shadow-black/20 hover:opacity-90 transition cursor-pointer"
          >
            <span className="truncate">{stickyAction.label}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      )}
    </article>
  );
};
