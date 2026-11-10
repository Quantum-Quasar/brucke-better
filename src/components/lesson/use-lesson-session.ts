"use client";

import React, { useState, useEffect, useRef } from "react";
import type { Lesson, ExerciseItem, LessonProgress } from "@/lib/types";
import type { LessonSegment } from "./ProgressBar5";
import { useAppStore } from "@/lib/store";
import { useAppNavigation } from "@/lib/app-navigation";
import { whisperCuesForLesson } from "@/data/posture-cues";
import { retryVariant } from "@/lib/retry-variation";
import { isListeningSkipped } from "@/lib/listening";
import { consciousnessLineFor } from "@/data/consciousness";
import { getSoundImportsForLanguage, type SoundImport } from "@/data/sound-imports";
import { getLanguageDefinition } from "@/data/languages";
import type { LessonReaderProps, LessonSession } from "./lesson-session-types";

function restoreRetries(lesson: Lesson, progress?: LessonProgress): ExerciseItem[] {
  const exercises = new Map(lesson.exercises.map((exercise) => [exercise.id, exercise]));
  return (progress?.retryExerciseIds ?? [])
    .map((id) => exercises.get(id))
    .filter((exercise): exercise is ExerciseItem => exercise !== undefined);
}


export const useLessonSession = ({
  lesson,
  languageId,
  compendium,
  nextLesson: nextLessonMeta,
  nextLessonId: nextLessonIdProp,
  totalTopics: totalTopicsProp,
  preview = false,
}: LessonReaderProps): LessonSession => {
  const { openLesson, closeLesson, openAtlasFamily, openAtlasIndex } = useAppNavigation();
  const storeLanguageId = useAppStore((s) => s.activeLanguageId);
  const activeLanguageId = languageId ?? storeLanguageId;
  const data = compendium;
  const totalTopics = totalTopicsProp || 30;
  const genderSystem = getLanguageDefinition(activeLanguageId).genderSystem;
  const nextLessonId = nextLessonIdProp ?? null;
  const isReading = lesson.slug.startsWith("story-");
  const goToNextLesson = React.useCallback(() => {
    if (nextLessonId) openLesson(activeLanguageId, nextLessonId);
    else closeLesson();
  }, [activeLanguageId, closeLesson, nextLessonId, openLesson]);
  const savedProgress = useAppStore((s) => s.lessonProgress[lesson.id]);
  const [currentSegment, setCurrentSegment] = useState<LessonSegment>(savedProgress?.segment || "hook");
  const [practiceIndex, setPracticeIndex] = useState(savedProgress?.practiceIndex || 0);
  const [retryQueue, setRetryQueue] = useState<ExerciseItem[]>(() => restoreRetries(lesson, savedProgress));
  const [retryIndex, setRetryIndex] = useState(() =>
    Math.min(savedProgress?.retryIndex ?? 0, Math.max(0, retryQueue.length - 1))
  );
  const [inRetryPhase, setInRetryPhase] = useState(() =>
    Boolean(savedProgress?.inRetryPhase && retryQueue.length)
  );
  const [completedSegments, setCompletedSegments] = useState<LessonSegment[]>(savedProgress?.completedSegments || []);
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
  const familyCount = data.shiftFamilyCount ?? Object.keys(data.shifts).length;

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
        const restoredQueue = restoreRetries(lesson, persisted);
        const restoredRetryPhase = Boolean(persisted.inRetryPhase && restoredQueue.length);
        const restoredRetryIndex = Math.min(persisted.retryIndex ?? 0, Math.max(0, restoredQueue.length - 1));
        const samePosition =
          persisted.segment === currentSegment &&
          persisted.practiceIndex === practiceIndex &&
          persisted.completedSegments.join("|") === completedSegments.join("|") &&
          (persisted.everQueued ?? false) === everQueued &&
          restoredRetryPhase === inRetryPhase &&
          restoredRetryIndex === retryIndex &&
          restoredQueue.length === retryQueue.length &&
          restoredQueue.every((exercise, index) => exercise.id === retryQueue[index].id);
        if (!samePosition) {
          setCurrentSegment(persisted.segment);
          setPracticeIndex(persisted.practiceIndex);
          setCompletedSegments(persisted.completedSegments);
          setEverQueued(persisted.everQueued ?? false);
          setRetryQueue(restoredQueue);
          setInRetryPhase(restoredRetryPhase);
          setRetryIndex(restoredRetryIndex);
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
      retryExerciseIds: retryQueue.map((exercise) => exercise.id),
      inRetryPhase,
      retryIndex,
    });
  }, [
    lesson,
    currentSegment,
    practiceIndex,
    completedSegments,
    everQueued,
    retryQueue,
    inRetryPhase,
    retryIndex,
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
        active?.tagName === "SUMMARY" ||
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
          startPractice();
        } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSegment("pattern");
        }
      } else if (currentSegment === "summary") {
        if (!preview && (retryQueue.length === 0 || isLessonFinished)) {
          if (e.key === "Enter" || e.key === " " || e.code === "Space") {
            e.preventDefault();
            handleCompleteAll();
            goToNextLesson();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSegment, retryQueue.length, isLessonFinished, lesson.id, nextLessonId, goToNextLesson, preview]);

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

  const practiceCompleted = completedSegments.includes("practice");
  // Mid-lesson practice is in progress if any work has been started but the
  // segment hasn't been completed. A detour to the table and back must resume
  // it, not restart it.
  const resumingPractice =
    !practiceCompleted &&
    (practiceIndex > 0 || inRetryPhase || retryQueue.length > 0 || everQueued || twistCompleted || twistPhase);

  const startPractice = () => {
    // Only a fresh start or a replay after completion resets the ledger. Wiping
    // the retry queue on a mid-lesson table detour laundered a missed exercise
    // into a flawless (purple) run and dropped the reinforcement the learner was
    // promised.
    if (!resumingPractice) {
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
    }
    markSegmentDone("table", "practice");
  };

  const stickyAction = (() => {
    if (preview) return null;
    // During the twist/retry the exercise widget drives progress — but only on
    // the practice segment. On the table (a mid-retry detour) the resume button
    // must stay visible so the learner can get back to the queue.
    if (currentSegment === "practice" && (twistPhase || inRetryPhase)) return null;
    if (currentSegment === "hook") {
      return { label: isReading ? "next: read the story" : "next: pattern", run: () => markSegmentDone("hook", "pattern") };
    }
    if (currentSegment === "pattern") {
      return { label: isReading ? "next: word bank" : "next: transformation table", run: () => markSegmentDone("pattern", "table") };
    }
    if (currentSegment === "table") {
      const noun = isReading ? "questions" : "exercises";
      return {
        label: resumingPractice ? `resume ${noun}` : `start ${noun} (${lesson.exercises.length})`,
        run: startPractice,
      };
    }
    if (currentSegment === "summary") {
      return {
        label: nextLesson ? `next: ${nextLesson.title}` : "back to the trail",
        run: () => {
          handleCompleteAll();
          goToNextLesson();
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

  return {
    lesson,
    data,
    activeLanguageId,
    totalTopics,
    genderSystem,
    nextLessonId,
    isReading,
    goToNextLesson,
    currentSegment,
    setCurrentSegment,
    practiceIndex,
    setPracticeIndex,
    retryQueue,
    retryIndex,
    setRetryIndex,
    inRetryPhase,
    setInRetryPhase,
    completedSegments,
    isLessonFinished,
    everQueued,
    setEverQueued,
    twistPhase,
    twistCompleted,
    twistMeetAgain,
    twistResurfaced,
    setTwistResurfaced,
    failCounts,
    mercyRevealFor,
    setMercyRevealFor,
    showPostureCues,
    listeningSkippedUntil,
    flagGuessed,
    detourFootnote,
    setDetourDismissed,
    soundImports,
    showDetour,
    consciousnessLine,
    listeningOff,
    whisperCues,
    primaryShift,
    familyCount,
    handleExerciseError,
    handleRetryError,
    handleTwistDone,
    handleResurfaceTwist,
    drainCurrentRetry,
    handlePracticeSuccess,
    handleCompleteAll,
    nextLesson,
    markSegmentDone,
    startPractice,
    resumingPractice,
    stickyAction,
    currentExercise,
    closeLesson,
    openAtlasFamily,
    openAtlasIndex,
    preview
  };
};

