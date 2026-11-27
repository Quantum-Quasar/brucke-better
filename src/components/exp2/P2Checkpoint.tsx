"use client";

import React, { useCallback, useState } from "react";
import { useAppStore } from "@/lib/store";
import { loadLesson } from "@/lib/content-client";
import { useAppNavigation } from "@/lib/app-navigation";
import {
  assembleGateQuestions,
  getMissedGateLessons,
  hasPassedGateAssessment,
  scoreGateAnswers,
  type GateLessonSource,
  type GateQuestion,
} from "@/lib/gate-assessment";
import type { GateView } from "@/lib/trail-map";
import type { TopicCluster, TrailGate } from "@/lib/types";
import { P2Sheet } from "./P2WordSheet";
import { ArrowRightIcon } from "./p2-kit";

export function P2Checkpoint({
  gate,
  view,
  languageId,
  topics,
  onClose,
}: {
  gate: TrailGate;
  view: GateView;
  languageId: string;
  topics: TopicCluster[];
  onClose: () => void;
}) {
  const completed = useAppStore((s) => s.completedLessons);
  const passGate = useAppStore((s) => s.passGate);
  const { openLesson } = useAppNavigation();
  const lessons = topics.flatMap((topic) => [topic.core, ...(topic.stories ?? [])]);
  const lastTopic = topics.find((topic) => topic.id === gate.afterTopic);
  const lastLesson = lastTopic?.stories?.[lastTopic.stories.length - 1] ?? lastTopic?.core;
  const reached = lastLesson ? completed.includes(lastLesson.id) : false;

  const [sources, setSources] = useState<GateLessonSource[]>([]);
  const [questions, setQuestions] = useState<GateQuestion[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<boolean[] | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const close = useCallback(() => onClose(), [onClose]);

  const start = async () => {
    if (!reached || view.passed || loading) return;
    setLoading(true);
    setError(null);
    try {
      const loaded: GateLessonSource[] = await Promise.all(
        lessons.map(async (lesson) => {
          const payload = await loadLesson(languageId, lesson.id);
          if (!payload?.lesson?.exercises) throw new Error(`Couldn’t load ${lesson.title}.`);
          return { id: lesson.id, title: lesson.title, exercises: payload.lesson.exercises };
        })
      );
      const selected = assembleGateQuestions(loaded, 0);
      if (selected.length !== loaded.length) throw new Error("This checkpoint is missing a question. Please try again later.");
      setSources(loaded);
      setQuestions(selected);
      setAnswers(selected.map(() => ""));
      setResult(null);
      setAttempt(0);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Couldn’t load the checkpoint.");
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    const next = attempt + 1;
    setAttempt(next);
    const fresh = sources.length ? assembleGateQuestions(sources, next) : questions;
    const usable = fresh.length === sources.length ? fresh : questions;
    setQuestions(usable);
    setAnswers(usable.map(() => ""));
    setResult(null);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!questions.length || answers.some((answer) => !answer.trim())) return;
    const scored = scoreGateAnswers(questions, answers, languageId);
    setResult(scored);
    if (hasPassedGateAssessment(scored)) passGate(gate.id);
  };

  const missed = result && !hasPassedGateAssessment(result) ? getMissedGateLessons(questions, result, 3) : [];
  const correct = result ? result.filter(Boolean).length : 0;

  return (
    <P2Sheet
      label={gate.title}
      onClose={close}
      head={
        <div style={{ display: "grid", gap: 8 }}>
          <p className="p-small p-strong">
            Checkpoint for topics {view.fromTopic}–{view.toTopic}
          </p>
          <h2 className="p-head" style={{ fontSize: "clamp(2rem, 1.4rem + 2.4vw, 3rem)" }}>
            {gate.title}
          </h2>
        </div>
      }
    >
      <p className="p-body">{gate.why}</p>
      <p className="p-lead-strong">
        {view.open
          ? "Passed. The next stretch is open."
          : view.passed
            ? "Passed. Finish the main lessons to open the next stretch."
            : reached
              ? "Ready when you are."
              : "Finish the main lessons of these topics first."}
      </p>
      {!view.passed && (
        <p className="p-body">
          One question from each main lesson ({lessons.length} in all). Get {Math.ceil(lessons.length * 0.8)} right to pass. You can retry as often as you like.
        </p>
      )}
      {error && (
        <p role="alert" className="p-body p-strong">
          {error}
        </p>
      )}
      {reached && !view.passed && questions.length === 0 && (
        <button type="button" className="p-btn p-btn--go" onClick={start} disabled={loading}>
          {loading ? "Loading…" : error ? "Try loading again" : "Start the checkpoint"}
          {!loading && <ArrowRightIcon />}
        </button>
      )}

      {questions.length > 0 && (
        <form onSubmit={submit} style={{ display: "grid", gap: 28 }}>
          {questions.map((question, index) => (
            <fieldset key={`${attempt}-${index}-${question.lessonId}`} style={{ border: 0, margin: 0, padding: 0, display: "grid", gap: 10 }}>
              <legend className="p-small p-strong" style={{ padding: 0, marginBottom: 6 }}>
                {question.lesson}
              </legend>
              <p className="p-lead p-prewrap">{question.prompt}</p>
              {question.mode === "typed" ? (
                <>
                  {question.hint && <p className="p-small">{question.hint}</p>}
                  <input
                    className="p-input"
                    style={{ background: "var(--p-soft)" }}
                    value={answers[index] ?? ""}
                    disabled={result !== null}
                    required
                    onChange={(event) => {
                      const value = event.target.value;
                      setAnswers((old) => old.map((current, i) => (i === index ? value : current)));
                    }}
                    aria-label={`Answer: ${question.lesson}`}
                    autoComplete="off"
                    spellCheck={false}
                    lang={question.sourceType === "reverse_cognate" ? "en" : languageId}
                  />
                </>
              ) : (
                <div className="p-choice-list" role="radiogroup" aria-label={question.lesson}>
                  {question.options.map((option) => {
                    const chosen = answers[index] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={chosen}
                        className="p-choice"
                        disabled={result !== null}
                        style={{ background: chosen ? "var(--p-ink)" : "var(--p-soft)", color: chosen ? "var(--p-paper)" : undefined, fontSize: "1.125rem" }}
                        onClick={() => setAnswers((old) => old.map((current, i) => (i === index ? option : current)))}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
              {result && (
                <p className="p-body p-strong">{result[index] ? "Right." : `Not quite — it’s ${question.answer}.`}</p>
              )}
            </fieldset>
          ))}

          {result ? (
            <div role="status" style={{ display: "grid", gap: 16 }}>
              <p className="p-lead-strong">
                {hasPassedGateAssessment(result) ? "Passed" : "Not yet"}: {correct} of {result.length} right.
              </p>
              {missed.length > 0 && (
                <div style={{ display: "grid", gap: 8 }}>
                  <p className="p-body">Worth another look:</p>
                  {missed.map((item) => (
                    <button
                      key={item.lessonId}
                      type="button"
                      className="p-btn p-btn--soft"
                      style={{ justifyContent: "space-between" }}
                      onClick={() => {
                        onClose();
                        openLesson(languageId, item.lessonId);
                      }}
                    >
                      {item.title} <ArrowRightIcon />
                    </button>
                  ))}
                </div>
              )}
              {!hasPassedGateAssessment(result) ? (
                <button type="button" className="p-btn p-btn--go" onClick={retry}>
                  Try again
                </button>
              ) : (
                <button type="button" className="p-btn" onClick={onClose}>
                  Back to the trail
                </button>
              )}
            </div>
          ) : (
            <button type="submit" className="p-btn p-btn--go" disabled={answers.some((answer) => !answer.trim())}>
              Check my answers
            </button>
          )}
        </form>
      )}
    </P2Sheet>
  );
}
