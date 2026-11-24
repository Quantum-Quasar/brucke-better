"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle2, ClipboardCheck, RotateCcw, Volume2, XCircle } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useCompendium, useLessonIndex } from "@/lib/content-client";
import { getLanguageDefinition } from "@/data/languages";
import { playTargetAudio } from "@/lib/audio";
import { hashSeed } from "@/lib/prng";
import { generateWeeklyMixedTest, getIsoWeekKey } from "@/lib/practice-quizzes";

interface AnswerRecord {
  questionId: string;
  wordId: string;
  prompt: string;
  chosen: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export const WeeklyMixedTest: React.FC = () => {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const completedLessons = useAppStore((s) => s.completedLessons);
  const recordReview = useAppStore((s) => s.recordReview);
  const markWordEncountered = useAppStore((s) => s.markWordEncountered);
  const openWordDrawer = useAppStore((s) => s.openWordDrawer);

  const language = getLanguageDefinition(activeLanguageId);
  const compendium = useCompendium(activeLanguageId);
  const lessonIndex = useLessonIndex(activeLanguageId);

  const [seedOffset, setSeedOffset] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [queuedMissed, setQueuedMissed] = useState(false);

  useEffect(() => {
    setSeedOffset(0);
    setCurrentIndex(0);
    setSelectedOption(null);
    setRecords([]);
    setQueuedMissed(false);
  }, [activeLanguageId]);

  const quiz = useMemo(() => {
    if (!compendium.data || !lessonIndex.data) return null;
    const weeklySeed = hashSeed(`${activeLanguageId}:${getIsoWeekKey()}:${seedOffset}`);
    return generateWeeklyMixedTest(compendium.data, lessonIndex.data, completedLessons, {
      count: 10,
      seed: weeklySeed,
      languageId: activeLanguageId,
    });
  }, [compendium.data, lessonIndex.data, completedLessons, activeLanguageId, seedOffset]);

  const startFresh = () => {
    setSeedOffset((s) => s + 1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setRecords([]);
    setQueuedMissed(false);
  };

  if (compendium.error || lessonIndex.error) {
    return (
      <div role="alert" className="p-4 rounded-xl bg-[var(--bg-color)] border border-[var(--error-color)]/40 text-xs font-mono text-[var(--error-color)] flex flex-wrap items-center justify-between gap-3">
        <span>Could not load quiz vocabulary for {language.name}.</span>
        <button
          type="button"
          onClick={() => { compendium.retry(); lessonIndex.retry(); }}
          className="px-3 py-1.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold cursor-pointer hover:opacity-90 transition"
        >
          retry
        </button>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="p-6 text-center text-xs font-mono text-[var(--sub-color)]" role="status">
        preparing your 10-question mixed quiz…
      </div>
    );
  }

  const questions = quiz.questions;
  const isFinished = currentIndex >= questions.length;
  const currentQuestion = questions[currentIndex];
  const correctCount = records.filter((r) => r.isCorrect).length;
  const missedRecords = records.filter((r) => !r.isCorrect);

  const handleSelectOption = (option: string) => {
    if (!currentQuestion || selectedOption !== null) return;
    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correctAnswer;
    setRecords((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        wordId: currentQuestion.wordId,
        prompt: currentQuestion.prompt,
        chosen: option,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setCurrentIndex((i) => i + 1);
  };

  const handleQueueMissed = () => {
    const uniqueIds = Array.from(new Set(missedRecords.map((m) => m.wordId)));
    for (const wordId of uniqueIds) {
      markWordEncountered(wordId);
      // Grade 1 ("Again") schedules the word immediately in SRS for relearning/review
      recordReview(wordId, 1);
    }
    setQueuedMissed(true);
  };

  const progressValue = currentIndex + (selectedOption ? 1 : 0);
  const canPlayAudio =
    currentQuestion &&
    (currentQuestion.kind === "target-to-english" || selectedOption !== null);
  const audioText = currentQuestion
    ? selectedOption !== null
      ? currentQuestion.revealedSpokenText || currentQuestion.spokenText
      : currentQuestion.spokenText
    : "";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-color)]">
            Weekly Mixed Test
          </h2>
          <p className="text-xs text-[var(--sub-color)] mt-0.5">
            {quiz.usedStarterTopics
              ? "10 mixed questions from starter topics (complete trail lessons to personalize this pool)."
              : `10 mixed questions drawn from your ${quiz.topicCount} completed lesson${quiz.topicCount === 1 ? "" : "s"}.`}
          </p>
        </div>
        <button
          type="button"
          onClick={startFresh}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>New 10-question set</span>
        </button>
      </div>

      {!isFinished && currentQuestion ? (
        <div className="p-6 rounded-xl bg-[var(--bg-color)] border border-[var(--sub-color)]/25 space-y-5">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--sub-color)]">
              <span>
                Question {currentIndex + 1} / {questions.length}
              </span>
              <span>
                Score: <strong className="text-[var(--main-color)]">{correctCount}</strong>
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={progressValue}
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-label="Weekly quiz progress"
              className="h-1.5 w-full rounded-full bg-[var(--sub-alt-color)] overflow-hidden"
            >
              <div
                className="h-full bg-[var(--main-color)] transition-all duration-300"
                style={{ width: `${(progressValue / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Prompt */}
          <div className="space-y-1.5">
            <div className="text-xs font-mono text-[var(--sub-color)]">
              {currentQuestion.subPrompt}
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-2xl font-bold text-[var(--text-color)]">
                {currentQuestion.prompt}
              </p>
              {canPlayAudio && audioText && (
                <button
                  type="button"
                  onClick={() => playTargetAudio(audioText, language.ttsLocale)}
                  aria-label="Play pronunciation"
                  className="p-2 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--main-color)] hover:border-[var(--main-color)] transition cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="grid sm:grid-cols-2 gap-2.5">
            {currentQuestion.options.map((opt) => {
              const isChosen = selectedOption === opt;
              const isCorrectOption = opt === currentQuestion.correctAnswer;
              let btnClass =
                "bg-[var(--sub-alt-color)] border-[var(--sub-color)]/25 text-[var(--text-color)] hover:border-[var(--main-color)]";

              if (selectedOption !== null) {
                if (isCorrectOption) {
                  btnClass =
                    "bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold";
                } else if (isChosen) {
                  btnClass =
                    "bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-200";
                } else {
                  btnClass =
                    "bg-[var(--sub-alt-color)]/60 border-[var(--sub-color)]/15 text-[var(--sub-color)] opacity-70";
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  disabled={selectedOption !== null}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-3.5 rounded-lg border text-left text-sm transition cursor-pointer disabled:cursor-default ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback + Next */}
          {selectedOption !== null && (
            <div className="pt-2 border-t border-[var(--sub-color)]/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[var(--text-color)]">
                {selectedOption === currentQuestion.correctAnswer ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
                )}
                <span>{currentQuestion.explanation}</span>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-[var(--main-color)] text-[var(--bg-color)] cursor-pointer"
              >
                {currentIndex + 1 === questions.length ? "View results" : "Next question"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Summary Screen */
        <div className="p-6 rounded-xl bg-[var(--bg-color)] border border-[var(--sub-color)]/25 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <ClipboardCheck className="w-6 h-6 text-[var(--main-color)]" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-bold text-[var(--text-color)]">
                  Quiz Complete: {correctCount} / {questions.length}
                </h3>
                <p className="text-xs text-[var(--sub-color)]">
                  {missedRecords.length === 0
                    ? "Clean sweep — every word came back immediately!"
                    : `${missedRecords.length} word${missedRecords.length === 1 ? "" : "s"} worth revisiting in spaced review.`}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={startFresh}
              className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-[var(--main-color)] text-[var(--bg-color)] cursor-pointer"
            >
              Take another quiz
            </button>
          </div>

          {missedRecords.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-[var(--sub-color)]/15">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--sub-color)]">
                  Missed Words
                </span>
                <button
                  type="button"
                  disabled={queuedMissed}
                  onClick={handleQueueMissed}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    queuedMissed
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/35"
                      : "bg-[var(--main-color)] text-[var(--bg-color)] hover:opacity-90"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {queuedMissed
                      ? "Queued for review"
                      : `Queue ${missedRecords.length} missed word${missedRecords.length === 1 ? "" : "s"} for review`}
                  </span>
                </button>
              </div>

              <ul className="divide-y divide-[var(--sub-color)]/15 rounded-lg border border-[var(--sub-color)]/20 overflow-hidden">
                {missedRecords.map((rec) => (
                  <li
                    key={rec.questionId}
                    className="p-3 bg-[var(--sub-alt-color)] flex flex-wrap items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-[var(--text-color)]">{rec.prompt}</span>
                      <span className="text-[var(--sub-color)] mx-2">→</span>
                      <span className="font-mono text-emerald-700 dark:text-emerald-300">
                        {rec.correctAnswer}
                      </span>
                      <span className="text-[var(--sub-color)] ml-2">
                        (you picked: {rec.chosen})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openWordDrawer(rec.wordId)}
                      className="font-mono text-[var(--main-color)] underline underline-offset-2 cursor-pointer"
                    >
                      inspect word
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
