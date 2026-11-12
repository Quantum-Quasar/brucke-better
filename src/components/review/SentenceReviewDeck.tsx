"use client";

import { useMemo, useRef, useState } from "react";
import { ExerciseWidget } from "@/components/lesson/ExerciseWidgets";
import { useLesson } from "@/lib/content-client";
import { useAppStore } from "@/lib/store";
import { dueSentenceCards, isSentenceProcess, prepareSentenceSession } from "@/lib/sentence-review";
import { gradeSentenceSessionEntry, readSentenceReviewSession, writeSentenceReviewSession, type SentenceReviewSession } from "@/lib/sentence-review-session";
import { sentenceReplayVariant } from "@/lib/retry-variation";
import { assessedGermanSurfaces } from "@/lib/curriculum-recurrence";
import type { CompendiumData, ExerciseItem, Lesson, SentenceCard } from "@/lib/types";

interface Props { languageId: string; resetAt: number; resetActor: string; data: CompendiumData; }
export function SentenceReviewDeck({ languageId, resetAt, resetActor, data }: Props) {
  const cards = useAppStore((state) => state.sentenceCards);
  const [session, setSession] = useState(() => readSentenceReviewSession(languageId, resetAt, resetActor, cards));
  const [complete, setComplete] = useState(false);
  const sessionRef = useRef(session);
  const due = dueSentenceCards(cards);
  const commit = (next: SentenceReviewSession | null) => {
    sessionRef.current = next;
    writeSentenceReviewSession(languageId, next);
    setSession(next);
  };
  const advance = () => {
    const current = sessionRef.current;
    if (!current) return;
    if (current.index + 1 >= current.entries.length) { commit(null); setComplete(true); }
    else commit({ ...current, index: current.index + 1 });
  };
  const markHelp = () => {
    const current = sessionRef.current;
    const entry = current?.entries[current.index];
    if (!current || !entry || entry.graded || entry.neededHelp) return;
    commit({ ...current, entries: current.entries.map((item, index) => index === current.index ? { ...item, neededHelp: true } : item) });
  };
  const grade = (incorrect: boolean) => {
    const current = sessionRef.current;
    const entry = current?.entries[current.index];
    if (!current || !entry || entry.graded) return;
    const next = gradeSentenceSessionEntry(current, languageId, incorrect ? 1 : 4, useAppStore.getState());
    if (next !== current) commit(next);
  };
  if (!Object.keys(cards).length && !session) return null;
  const entry = session?.entries[session.index];
  const card = entry ? cards[entry.id] : undefined;
  return <section aria-label="Sentence process review" className="p-5 rounded-lg border border-[var(--sub-color)]/25 bg-[var(--sub-alt-color)] space-y-4">
    <div className="flex justify-between gap-3 items-center">
      <div><h2 className="font-mono font-bold text-[var(--text-color)]">sentence process review</h2>
        <p className="text-xs text-[var(--sub-color)]">{due.length} due · up to 15 processes per session · no stars or word mastery</p></div>
      {session && <button type="button" className="text-sm underline min-h-11" onClick={() => commit(null)}>exit process review</button>}
    </div>
    {complete && !session && <p role="status">Process review complete. Your next intervals are saved.</p>}
    {!session ? <button type="button" disabled={!due.length} className="px-4 py-3 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-mono disabled:opacity-40" onClick={() => {
      const entries = prepareSentenceSession(cards).map((item) => ({ id: item.id, attempt: item.lapses + item.repetitions + 1, graded: false }));
      if (entries.length) { setComplete(false); commit({ resetAt, resetActor, entries, index: 0 }); }
    }}>review sentence processes</button> : <>
      <p className="text-xs font-mono">process {session.index + 1} of {session.entries.length}</p>
      {card && entry ? <SentenceReplay key={`${card.id}:${entry.attempt}`} card={card} attempt={entry.attempt} languageId={languageId} data={data}
        onError={() => grade(true)} onHelp={markHelp} onSuccess={() => { grade(false); advance(); }} onUnavailable={advance} /> : <button type="button" onClick={advance}>This process is no longer available. Skip without grading.</button>}
    </>}
  </section>;
}

function taughtSurfaces(lesson: Lesson): string[] {
  return lesson.exercises.flatMap((exercise) => [
    ...assessedGermanSurfaces(exercise),
    ...(exercise.word_bank ?? []), ...(exercise.vocab_hints ?? []).map((hint) => hint.word),
  ]);
}
function SentenceReplay({ card, attempt, languageId, data, onError, onHelp, onSuccess, onUnavailable }: {
  card: SentenceCard; attempt: number; languageId: string; data: CompendiumData;
  onError: () => void; onHelp: () => void; onSuccess: () => void; onUnavailable: () => void;
}) {
  const resource = useLesson(languageId, card.lessonId);
  const mastery = useAppStore((state) => state.wordMastery);
  const exercise = useMemo<ExerciseItem | undefined>(() => {
    const lesson = resource.data?.lesson;
    const original = lesson?.exercises.find((item) => item.id === card.exerciseId);
    if (!lesson || lesson.id !== card.lessonId || !original || !isSentenceProcess(original)) return undefined;
    const knownWords = data.wordList.filter((word) => mastery[word.id] === "encountered" || mastery[word.id] === "mastered" || lesson.word_ids.includes(word.id) || lesson.table_word_ids.includes(word.id));
    return sentenceReplayVariant(original, attempt, { languageId, knownWords, taughtSurfaces: taughtSurfaces(lesson) });
  }, [resource.data, card.lessonId, card.exerciseId, attempt, languageId, data, mastery]);
  if (resource.error) return <div role="alert" className="space-y-3"><p>This lesson could not be loaded. No progress has changed.</p><button type="button" onClick={resource.retry}>retry loading</button><button type="button" className="ml-4 underline" onClick={onUnavailable}>skip without grading</button></div>;
  if (resource.loading) return <p role="status">loading sentence process…</p>;
  if (!exercise) return <div className="space-y-3"><p>This exercise is no longer available. Its saved schedule is unchanged.</p><button type="button" onClick={onUnavailable}>skip without grading</button></div>;
  return <ExerciseWidget key={`${card.id}:${attempt}:${exercise.target_answer}`} exercise={exercise} onError={onError} onSuccess={onSuccess}
    onQueueRetry={onHelp} onPurpleForfeit={onHelp} onFlagGuessed={onHelp} />;
}
