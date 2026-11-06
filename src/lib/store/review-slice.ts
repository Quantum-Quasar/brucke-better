import type { StoreSlice } from "./types";
import { saveState } from "./persistence";
import { createInitialCard, gradeCard, isMastered } from "../srs";

export const createReviewSlice: StoreSlice<"recordReview" | "restoreSrsCard" | "flagGuessed"> = (set, get) => ({
  recordReview: (wordId, grade) => {
    const id = wordId.trim();
    set((s) => {
      const currentCard = s.srsCards[id] || createInitialCard(id);
      const updatedCard = gradeCard(currentCard, grade);
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
      if (!s.srsCards[id]) return s;
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
      for (const id of ids) {
        const current = srsCards[id] || createInitialCard(id);
        srsCards[id] = gradeCard(current, 3);
        srsCards[id] = { ...srsCards[id], guessed: (srsCards[id].guessed ?? 0) + 1 };
      }
      const next = { ...s, srsCards };
      saveState(next);
      return next;
    });
  },
});
