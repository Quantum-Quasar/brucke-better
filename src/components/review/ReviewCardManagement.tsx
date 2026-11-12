"use client";

import { useAppStore } from "@/lib/store";
import { localDateKey, needsRelearn } from "@/lib/srs";
import type { ReviewController } from "./use-review-controller";

export function ReviewCardManagement({ controller }: { controller: ReviewController }) {
  const { managedCards, allWordsMap, wordLesson, lessons, openLesson, activeLanguageId } = controller;
  const suspendCard = useAppStore((s) => s.suspendCard);
  const unburyCard = useAppStore((s) => s.unburyCard);
  const beginRelearn = useAppStore((s) => s.beginCardRelearn);
  const resumeRelearn = useAppStore((s) => s.resumeCardAfterRelearn);
  const leeches = managedCards.filter(needsRelearn);
  const paused = managedCards.filter((card) => card.suspended || (card.buriedUntil && card.buriedUntil >= localDateKey()));
  const buttonClass = "min-h-11 rounded border border-[var(--sub-color)]/30 px-3 text-sm text-[var(--text-color)]";
  const cardLabel = (id: string) => {
    const word = allWordsMap[id];
    if (!word) return id;
    const noun = id.startsWith("article_") ? allWordsMap[id.slice("article_".length)] : undefined;
    return noun ? `${word.target_word} ${noun.target_word} · article` : word.target_word;
  };
  return <section aria-label="Manage review cards" className="space-y-4">
    <details open={leeches.length > 0} className="rounded-lg border border-[var(--sub-color)]/20 p-4">
      <summary className="min-h-11 cursor-pointer font-semibold">Relearn deck ({leeches.length})</summary>
      <p className="mb-4 text-sm text-[var(--sub-color)]">After five lapses, a card leaves all regular decks. Revisit its teaching, then explicitly resume it. Mastery and lifetime review history are kept.</p>
      <ul className="space-y-4">{leeches.map((card) => {
        const word = allWordsMap[card.word_id];
        const lessonId = wordLesson.get(card.word_id)?.[0];
        const lesson = lessons.find((entry) => entry.id === lessonId);
        const started = card.relearnLessonId !== undefined;
        return <li key={card.word_id} className="space-y-2 rounded bg-[var(--sub-alt-color)] p-3">
          <h3 className="font-semibold">{cardLabel(card.word_id)} · {card.lapses} lapses</h3>
          {lesson ? <>
            <p className="text-sm text-[var(--sub-color)]">Teaching lesson: {lesson.title}</p>
            <button type="button" className={buttonClass} onClick={() => { if (card.relearnLessonId !== lesson.id || card.relearnLessonCompleted) beginRelearn(card.word_id, lesson.id); openLesson(activeLanguageId, lesson.id); }}>{started && !card.relearnLessonCompleted ? "Continue teaching lesson" : "Restart teaching lesson to relearn"}</button>
            {started && <p className="text-sm text-[var(--sub-color)]">{card.relearnLessonCompleted ? "Lesson revisited. Ready to resume." : "Finish the linked lesson, then return here to resume this card."}</p>}
            <button type="button" disabled={!card.relearnLessonCompleted} className={`${buttonClass} ml-2 disabled:opacity-40`} onClick={() => resumeRelearn(card.word_id)}>Resume regular reviews</button>
          </> : <>
            <p className="text-sm text-[var(--sub-color)]">This dictionary card has no teaching lesson. Relearn from its meaning and example instead.</p>
            {!started ? <button type="button" className={buttonClass} onClick={() => beginRelearn(card.word_id, 0)}>Relearn this card</button> : <div className="space-y-2">
              <p>{word?.english_meaning}</p>
              <p>{word?.context_phrase}</p>
              <p className="text-sm text-[var(--sub-color)]">{word?.context_translation}</p>
              <button type="button" className={buttonClass} onClick={() => resumeRelearn(card.word_id)}>I reviewed the meaning and example — resume</button>
            </div>}
          </>}
          {card.suspended && <p className="text-sm text-[var(--sub-color)]">Also suspended — unsuspend below when ready.</p>}
        </li>;
      })}</ul>
      {!leeches.length && <p className="text-sm text-[var(--sub-color)]">No cards need relearning.</p>}
    </details>
    <details className="rounded-lg border border-[var(--sub-color)]/20 p-4">
      <summary className="min-h-11 cursor-pointer font-semibold">Suspended &amp; buried cards ({paused.length})</summary>
      <p className="mb-3 text-sm text-[var(--sub-color)]">Suspended cards stay hidden until you unsuspend them. Buried cards return after local midnight, not after 24 hours.</p>
      <ul className="space-y-2">{paused.map((card) => <li key={card.word_id} className="flex flex-wrap items-center gap-3">
        <span>{cardLabel(card.word_id)}</span>
        {card.suspended && <button type="button" className={buttonClass} onClick={() => suspendCard(card.word_id, false)}>Unsuspend</button>}
        {card.buriedUntil && card.buriedUntil >= localDateKey() && <button type="button" className={buttonClass} onClick={() => unburyCard(card.word_id)}>Unbury now</button>}
        {needsRelearn(card) && <span className="text-sm text-[var(--sub-color)]">Still in Relearn deck</span>}
      </li>)}</ul>
      {!paused.length && <p className="text-sm text-[var(--sub-color)]">No suspended or buried cards.</p>}
    </details>
  </section>;
}
