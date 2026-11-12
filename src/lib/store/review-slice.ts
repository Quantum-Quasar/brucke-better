import type { StoreSlice } from "./types";
import { saveState } from "./persistence";
import { createInitialCard, gradeCard, isMastered, isReviewable, localDateKey, needsRelearn } from "../srs";
import { failedSentenceCard, gradeSentenceCard, isSentenceProcess, sentenceCardId } from "../sentence-review";

export const createReviewSlice: StoreSlice<"recordReview" | "restoreSrsCard" | "flagGuessed" | "recordSentenceFailure" | "recordSentenceReview" | "suspendCard" | "buryCard" | "unburyCard" | "beginCardRelearn" | "resumeCardAfterRelearn"> = (set, get) => ({
  suspendCard: (wordId, suspended) => {
    const id = wordId.trim();
    if (!id) return;
    set((s) => {
      const card = s.srsCards[id] ?? createInitialCard(id);
      const next = { ...s, srsCards: { ...s.srsCards, [id]: { ...card, suspended } } };
      saveState(next);
      return next;
    });
  },
  buryCard: (wordId) => {
    const id = wordId.trim();
    if (!id) return;
    set((s) => {
      const card = s.srsCards[id] ?? createInitialCard(id);
      const next = { ...s, srsCards: { ...s.srsCards, [id]: { ...card, buriedUntil: localDateKey() } } };
      saveState(next);
      return next;
    });
  },
  unburyCard: (wordId) => {
    set((s) => {
      const card = s.srsCards[wordId];
      if (!card?.buriedUntil) return s;
      const { buriedUntil: _, ...rest } = card;
      const next = { ...s, srsCards: { ...s.srsCards, [wordId]: rest } };
      saveState(next);
      return next;
    });
  },
  beginCardRelearn: (wordId, lessonId) => {
    if (!Number.isInteger(lessonId) || lessonId < 0) return;
    set((s) => {
      const card = s.srsCards[wordId];
      if (!card || !needsRelearn(card)) return s;
      const next = {
        ...s,
        lessonProgress: lessonId > 0 ? {
          ...s.lessonProgress,
          [lessonId]: { segment: "hook" as const, practiceIndex: 0, completedSegments: [], everQueued: false, retryExerciseIds: [], inRetryPhase: false, retryIndex: 0 },
        } : s.lessonProgress,
        srsCards: { ...s.srsCards, [wordId]: { ...card, relearnRequired: true, relearnLessonId: lessonId, relearnLessonCompleted: false } },
      };
      saveState(next);
      return next;
    });
  },
  resumeCardAfterRelearn: (wordId) => {
    set((s) => {
      const card = s.srsCards[wordId];
      if (!card || !needsRelearn(card) || card.relearnLessonId === undefined ||
          (card.relearnLessonId !== 0 && !card.relearnLessonCompleted)) return s;
      const { relearnLessonId: _, relearnLessonCompleted: __, ...rest } = card;
      const resumed = { ...rest, relearnRequired: false, relearnLapses: card.lapses, repetitions: 0, interval: 1, due_date: localDateKey() };
      const next = { ...s, srsCards: { ...s.srsCards, [wordId]: resumed } };
      saveState(next);
      return next;
    });
  },
  recordSentenceFailure: (lessonId, exercise, languageId) => {
    if (!Number.isInteger(lessonId) || lessonId < 1 || !isSentenceProcess(exercise)) return;
    if (!exercise.id || exercise.id.length > 200) return;
    set((s) => {
      if (s.activeLanguageId !== languageId) return s;
      const id = sentenceCardId(lessonId, exercise.id);
      const card = failedSentenceCard(lessonId, exercise, s.sentenceCards[id]);
      const next = { ...s, sentenceCards: { ...s.sentenceCards, [id]: card } };
      saveState(next);
      return next;
    });
  },
  recordSentenceReview: (cardId, grade, languageId) => {
    if (![1, 3, 4, 5].includes(grade)) return;
    set((s) => {
      const current = s.sentenceCards[cardId];
      if (s.activeLanguageId !== languageId || !current) return s;
      const next = { ...s, sentenceCards: { ...s.sentenceCards, [cardId]: gradeSentenceCard(current, grade) } };
      saveState(next);
      return next;
    });
  },
  recordReview: (wordId, grade) => {
    const id = wordId.trim();
    set((s) => {
      const currentCard = s.srsCards[id] || createInitialCard(id);
      if (!isReviewable(currentCard)) return s;
      const updatedCard = gradeCard(currentCard, grade);
      if (needsRelearn(updatedCard)) updatedCard.relearnRequired = true;
      const srsCards = { ...s.srsCards, [id]: updatedCard };
      let wordMastery = { ...s.wordMastery };

      if (isMastered(updatedCard)) {
        wordMastery[id] = "mastered";
      } else if (!wordMastery[id] || wordMastery[id] === "unexplored") {
        wordMastery[id] = "encountered";
      }

      const next = { ...s, srsCards, wordMastery };
      saveState(next);
      return next;
    });
    get().logDailyActivity();
  },

  restoreSrsCard: (wordId, snapshot) => {
    const id = wordId.trim();
    if (!id || !snapshot || typeof snapshot !== "object" || !snapshot.card) return;
    const card = snapshot.card;
    const mastery = snapshot.mastery ?? null;
    set((s) => {
      // only restore a card this session actually graded — a stale snapshot must
      // not resurrect old scheduling
      if (!s.srsCards[id] || !isReviewable(s.srsCards[id])) return s;
      // A different version means another tab (or a later grade) moved this card
      // on since the session graded it. Restoring the stale snapshot would
      // clobber that newer scheduling, so only undo while the card is still
      // where this session left it. Snapshots without a version (legacy callers)
      // keep the existence-only behaviour.
      if (snapshot.version !== undefined && s.progressVersions.srsCards[id] !== snapshot.version) return s;
      const srsCards = { ...s.srsCards, [id]: card };
      const wordMastery = { ...s.wordMastery };
      if (mastery === null) delete wordMastery[id];
      else wordMastery[id] = mastery;
      const next = { ...s, srsCards, wordMastery };
      saveState(next);
      return next;
    });
  },

  // TM-6: a correct answer the learner did not trust. Re-grade as Hard (grade 3)
  // so the word returns soon, and record the guess so the guess rate is visible
  // anywhere cards are inspected. Nothing here touches completion or stars.
  flagGuessed: (wordIds) => {
    const ids = Array.from(new Set((wordIds || []).map((w) => w.trim()).filter(Boolean)));
    if (ids.length === 0) return;
    set((s) => {
      const srsCards = { ...s.srsCards };
      // Reconcile mastery exactly like recordReview: a guess re-grade is still a
      // successful review, so it can award (or confirm) mastery. Without this the
      // card and the mastery map disagreed after a guess.
      let wordMastery = { ...s.wordMastery };
      for (const id of ids) {
        const current = srsCards[id] || createInitialCard(id);
        if (!isReviewable(current)) continue;
        let updated = gradeCard(current, 3);
        updated = { ...updated, guessed: (updated.guessed ?? 0) + 1 };
        srsCards[id] = updated;
        if (isMastered(updated)) {
          wordMastery[id] = "mastered";
        } else if (!wordMastery[id] || wordMastery[id] === "unexplored") {
          wordMastery[id] = "encountered";
        }
      }
      const next = { ...s, srsCards, wordMastery };
      saveState(next);
      return next;
    });
  },
});
