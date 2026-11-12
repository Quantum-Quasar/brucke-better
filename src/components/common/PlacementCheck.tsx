"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { getPlacementQuestions, PLACEMENT_SECONDS, recommendPlacementTopic } from "@/lib/placement";

export function PlacementCheck({ languageId }: { languageId: string }) {
  const updateSetting = useAppStore((s) => s.updateSetting);
  const questions = getPlacementQuestions(languageId);
  const [results, setResults] = useState<boolean[]>([]);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(PLACEMENT_SECONDS);
  const [finished, setFinished] = useState(false);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const question = questions[results.length];
  const running = deadline !== null && !finished;

  const finish = (answers: boolean[]) => {
    setFinished(true);
    updateSetting("placementTopic", recommendPlacementTopic(answers));
  };

  useEffect(() => {
    if (!running || deadline === null) return;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) {
        setFinished(true);
        updateSetting("placementTopic", recommendPlacementTopic(results));
      }
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [deadline, running, results, updateSetting]);

  useEffect(() => {
    if (finished) resultRef.current?.focus();
    else if (running) questionRef.current?.focus();
  }, [results.length, finished, running]);

  if (!questions.length) return <p>Placement is not available for this language. Start with topic 1.</p>;

  if (finished) return (
    <div className="space-y-2" data-testid="placement-result">
      <h3 ref={resultRef} tabIndex={-1} className="font-bold text-[var(--text-color)]">A starting suggestion, not a grade</h3>
      <p>{results.length} of {questions.length} items tried · {results.filter(Boolean).length} recognized. Suggested starting topic: {recommendPlacementTopic(results)}.</p>
      <p>Use the topic picker below to override this anytime. This short check does not complete lessons, award stars or unlock topics. Earlier lessons and checkpoints still apply.</p>
    </div>
  );

  if (!running) return (
    <div className="space-y-2">
      <p>Already know a little? Try 10 mixed-pattern items in up to 60 seconds. Guess, choose “not sure”, stop early or skip entirely. This only suggests a starting topic.</p>
      <button type="button" onClick={() => setDeadline(Date.now() + PLACEMENT_SECONDS * 1000)} className="min-h-11 px-3 rounded border border-[var(--main-color)] text-[var(--main-color)] cursor-pointer">Try optional 60-second placement</button>
    </div>
  );

  const answer = (value: string | null) => {
    if (deadline !== null && Date.now() >= deadline) {
      finish(results);
      return;
    }
    const next = [...results, value === question.answer];
    setResults(next);
    if (next.length === questions.length) finish(next);
  };

  return (
    <section className="space-y-3" aria-label="Optional placement" data-onboarding-local-keys>
      <p className="flex justify-between gap-2"><span>Item {results.length + 1} / {questions.length} · {question.pattern}</span><span role="timer" aria-label="Placement time remaining">{remaining}s left</span></p>
      <h3 ref={questionRef} tabIndex={-1} className="font-bold text-[var(--text-color)]">{question.prompt}</h3>
      <div className="grid gap-2">
        {question.options.map((option) => <button type="button" key={option} onClick={() => answer(option)} className="min-h-11 rounded border border-[var(--sub-color)]/30 px-3 py-2 text-left hover:border-[var(--main-color)] cursor-pointer">{option}</button>)}
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => answer(null)} className="min-h-11 underline cursor-pointer">Not sure — next item</button>
        <button type="button" onClick={() => finish(results)} className="min-h-11 underline cursor-pointer">Stop placement now</button>
      </div>
      <p>No pressure to beat the clock. Unanswered items do not mark any course work as done.</p>
    </section>
  );
}
