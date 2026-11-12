"use client";

import React, { useState, useRef } from "react";
import type { ExerciseItem } from "@/lib/types";
import type { LessonSegment } from "./ProgressBar5";
import { useAppStore } from "@/lib/store";
import { useAppNavigation } from "@/lib/app-navigation";
import { whisperCuesForLesson } from "@/data/posture-cues";
import { retryVariant } from "@/lib/retry-variation";
import { isListeningSkipped } from "@/lib/listening";
import { consciousnessLineFor } from "@/data/consciousness";
import { soundImportsPresentIn, type SoundImport } from "@/data/sound-imports";
import { getLanguageDefinition } from "@/data/languages";
import type { LessonReaderProps, LessonSession } from "./lesson-session-types";
import { restoreRetries, useLessonProgress } from "./use-lesson-progress";
import { useLessonKeyboard } from "./use-lesson-keyboard";



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
    const tableWords = lesson.table_word_ids
      .map((wid) => data.words[wid.toLowerCase()]?.target_word ?? "");
    return soundImportsPresentIn(activeLanguageId, tableWords);
  }, [currentSegment, lesson.id, lesson.table_word_ids, data.words, activeLanguageId]);

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
  useLessonProgress({
    lesson, preview, languageId, storeLanguageId, currentSegment, practiceIndex,
    completedSegments, everQueued, retryQueue, inRetryPhase, retryIndex,
    setCurrentSegment, setPracticeIndex, setCompletedSegments, setEverQueued,
    setRetryQueue, setInRetryPhase, setRetryIndex, setIsLessonFinished,
  });



  // Opening a lesson must not seed the review queue. Cards are created when the
  // lesson is actually finished (handleCompleteAll), so Review stays honest.

  const queueExerciseRetry = (exercise: ExerciseItem) => {
    setEverQueued(true);
    setRetryQueue((prev) => {
      if (prev.some((e) => e.id === exercise.id)) return prev;
      return [...prev, exercise];
    });
  };

  const handleExerciseError = (exercise: ExerciseItem) => {
    if (!preview) useAppStore.getState().recordSentenceFailure(lesson.id, exercise, activeLanguageId);
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
      // A replay is not a finished run. Leaving the old practice/summary marks in
      // place let a learner skip straight to summary from the table and mint a
      // purple star without answering anything.
      setCompletedSegments((prev) => prev.filter((segment) => segment !== "practice" && segment !== "summary"));
      setIsLessonFinished(false);
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
  useLessonKeyboard({
    currentSegment, retryQueue, isLessonFinished, goToNextLesson, preview,
    markSegmentDone, startPractice, handleCompleteAll, setCurrentSegment,
  });

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
    queueExerciseRetry,
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

