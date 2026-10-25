import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { useAppStore } from "../lib/store";
import { compendium } from "../data/compendium";
import { createInitialCard, gradeCard, isMastered, getDueCards, getWeakestCards, getCardsByShift, localDateKey } from "../lib/srs";
import type { ReviewGrade } from "../lib/srs";
import type { WordEntity } from "../lib/types";

class LocalStorageMock {
  private store: Record<string, string> = {};
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

describe("Full Review Session Lifecycle Integration", () => {
  beforeAll(() => {
    const mockStorage = new LocalStorageMock();
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = mockStorage;
    (globalThis as any).document = { cookie: "" };
  });

  afterAll(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).localStorage;
    delete (globalThis as any).document;
  });

  beforeEach(() => {
    (globalThis as any).localStorage.clear();
    (globalThis as any).document.cookie = "";
    useAppStore.getState().resetProgress();
  });

  it("assembles review decks by category and links each card to a valid Compendium entity", () => {
    const store = useAppStore.getState();

    // Seed cards for multiple words across different shift families
    const seedWords = ["hand", "wasser", "bruder", "hoffen", "machen"];
    for (const id of seedWords) {
      store.markWordEncountered(id);
    }

    const currentState = useAppStore.getState();
    const cards = currentState.srsCards;
    expect(Object.keys(cards)).toHaveLength(5);

    // 1. Newly met words carry a one-day grace: none are due today…
    expect(getDueCards(cards)).toHaveLength(0);
    // …but they all join the due queue on the same tomorrow key.
    const tomorrowKey = cards.hand?.due_date;
    expect(tomorrowKey).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Object.values(cards).every((c) => c.due_date === tomorrowKey)).toBe(true);

    // 2. A day later the whole cohort is due — the due deck assembles from it.
    const agedCards = Object.fromEntries(
      Object.entries(cards).map(([id, card]) => [id, { ...card, due_date: "2026-01-01" }])
    );
    const dueCards = getDueCards(agedCards, "2026-01-01");
    expect(dueCards.length).toBe(5);
    for (const card of dueCards) {
      const entity = compendium.words[card.word_id];
      expect(entity).toBeDefined();
      expect(entity.target_word).toBeTruthy();
    }

    // 3. Sound Shift Deck: Filter by th_to_d (should include Bruder)
    const dentalShiftCards = getCardsByShift(cards, compendium.words, "th_to_d");
    expect(dentalShiftCards.length).toBeGreaterThanOrEqual(1);
    expect(dentalShiftCards.some((c) => c.word_id === "bruder")).toBe(true);

    // 4. Weakest Deck: Seed a lapse and verify sorting
    store.recordReview("wasser", 1); // Grade 1 = Again (failure)
    const afterLapseState = useAppStore.getState();
    const weakestCards = getWeakestCards(afterLapseState.srsCards);
    expect(weakestCards.length).toBeGreaterThanOrEqual(1);
    expect(weakestCards[0].word_id).toBe("wasser");
    expect(weakestCards[0].lapses).toBe(1);
  });

  it("simulates a multi-card session tracking grade effects, intervals, and mastery transitions", () => {
    const store = useAppStore.getState();
    const wordId = "apfel";

    // Start with an unexplored word
    expect(store.wordMastery[wordId] || "unexplored").toBe("unexplored");

    // Card 1 Review: Grade 1 (Again/Fail)
    store.recordReview(wordId, 1);
    let state = useAppStore.getState();
    let card = state.srsCards[wordId];
    expect(card).toBeDefined();
    expect(card.repetitions).toBe(0);
    expect(card.lapses).toBe(1);
    expect(card.interval).toBe(1);
    expect(state.wordMastery[wordId]).toBe("encountered");
    expect(isMastered(card)).toBe(false);

    // Card 2 Review: Grade 3 (Hard)
    store.recordReview(wordId, 3);
    state = useAppStore.getState();
    card = state.srsCards[wordId];
    expect(card.repetitions).toBe(1);
    expect(card.interval).toBe(1);
    expect(card.ease_factor).toBeLessThan(2.5); // Ease decreases on Hard
    expect(state.wordMastery[wordId]).toBe("encountered");
    expect(isMastered(card)).toBe(false);

    // Card 3 Review: Grade 4 (Good)
    store.recordReview(wordId, 4);
    state = useAppStore.getState();
    card = state.srsCards[wordId];
    expect(card.repetitions).toBe(2);
    expect(card.interval).toBe(6); // Second successful interval is 6 days
    expect(state.wordMastery[wordId]).toBe("encountered");
    expect(isMastered(card)).toBe(false);

    // Card 4 Review: Grade 5 (Easy) -> Triggers Mastery
    store.recordReview(wordId, 5);
    state = useAppStore.getState();
    card = state.srsCards[wordId];
    expect(card.repetitions).toBe(3);
    expect(card.interval).toBeGreaterThanOrEqual(7);
    expect(isMastered(card)).toBe(true);
    expect(state.wordMastery[wordId]).toBe("mastered");
  });

  it("calculates session statistics and persists daily activity marks", () => {
    const store = useAppStore.getState();
    const sessionWords = ["tag", "zeit", "buch", "trinken", "besser"];

    // Seed session words
    for (const id of sessionWords) {
      store.markWordEncountered(id);
    }

    const grades: ReviewGrade[] = [4, 4, 1, 5, 4]; // 4 success, 1 failure
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < sessionWords.length; i++) {
      const grade = grades[i];
      store.recordReview(sessionWords[i], grade);
      if (grade >= 3) {
        successCount++;
      } else {
        failCount++;
      }
    }

    expect(successCount).toBe(4);
    expect(failCount).toBe(1);
    const accuracy = Math.round((successCount / sessionWords.length) * 100);
    expect(accuracy).toBe(80);

    // Verify weekly activity logged
    const finalState = useAppStore.getState();
    const todayDay = new Date().getDay();
    const activeDayIdx = todayDay === 0 ? 6 : todayDay - 1;
    expect(finalState.weeklyActivity[activeDayIdx]).toBe(true);
  });

  it("handles empty decks and full queue completion gracefully", () => {
    const store = useAppStore.getState();
    // Empty state: no cards scheduled
    const emptyCards = store.srsCards;
    const due = getDueCards(emptyCards);
    expect(due).toEqual([]);

    // Single card queue completion: a fresh encounter sits in its grace day…
    store.markWordEncountered("nacht");
    const graceQueue = getDueCards(useAppStore.getState().srsCards);
    expect(graceQueue).toHaveLength(0);
    // …and joins the due queue tomorrow.
    const dayAfterGrace = new Date();
    dayAfterGrace.setDate(dayAfterGrace.getDate() + 1);
    const singleQueue = getDueCards(useAppStore.getState().srsCards, localDateKey(dayAfterGrace));
    expect(singleQueue).toHaveLength(1);

    // Process and push due date into future
    store.recordReview("nacht", 4);
    const todayStr = new Date().toISOString().split("T")[0];

    const remainingDue = getDueCards(useAppStore.getState().srsCards, todayStr);
    expect(remainingDue).toHaveLength(0); // Deck is now 100% complete for today
  });

  // "back" in the review hub. Stepping back after grading a card must undo that
  // grade's SM-2 effects, so the learner can re-answer and the re-grade lands as
  // the card's only graded step this session — not a second step stacked on the
  // first (which would double every interval and count the card twice).
  it("restores the pre-session card when stepping back, so a re-grade is not double-counted", () => {
    const store = useAppStore.getState();
    const wordId = "winter";
    store.markWordEncountered(wordId);
    const before = { ...useAppStore.getState().srsCards[wordId] };
    const wordMasteryBefore = useAppStore.getState().wordMastery[wordId] ?? null;

    // grade the card once, as the session's first pass does
    store.recordReview(wordId, 5);
    const graded = useAppStore.getState().srsCards[wordId];
    expect(graded.repetitions).toBe(before.repetitions + 1);

    // stepping back restores the card to where the session found it
    store.restoreSrsCard(wordId, { card: before, mastery: wordMasteryBefore });
    const restored = useAppStore.getState().srsCards[wordId];
    expect(restored).toEqual(before);
    expect(restored.due_date).toBe(before.due_date);

    // re-grading on the way back forward schedules from the restored state
    store.recordReview(wordId, 5);
    const reGraded = useAppStore.getState().srsCards[wordId];
    // last_reviewed is a wall-clock timestamp, so compare the schedule fields
    expect(reGraded).toEqual({ ...graded, last_reviewed: reGraded.last_reviewed });
    expect(reGraded.interval).toBe(graded.interval);
    expect(reGraded.ease_factor).toBe(graded.ease_factor);
    expect(reGraded.lapses).toBe(graded.lapses);
  });

  it("restoring a card rolls back the mastery a too-generous grade had awarded", () => {
    const store = useAppStore.getState();
    store.markWordEncountered("milch");
    const before = { ...useAppStore.getState().srsCards["milch"] };
    const masteryBefore = useAppStore.getState().wordMastery["milch"] ?? null;

    // drive the word to mastery with the session's grades
    store.recordReview("milch", 4);
    store.recordReview("milch", 4);
    store.recordReview("milch", 4);
    store.recordReview("milch", 5);
    expect(isMastered(useAppStore.getState().srsCards["milch"])).toBe(true);
    expect(useAppStore.getState().wordMastery["milch"]).toBe("mastered");

    // the word is no longer graded in the session after "back", so the card
    // must go back to its pre-session state instead of staying mastered
    store.restoreSrsCard("milch", { card: before, mastery: masteryBefore });
    const card = useAppStore.getState().srsCards["milch"];
    expect(card.repetitions).toBe(before.repetitions);
    expect(isMastered(card)).toBe(false);
    expect(useAppStore.getState().wordMastery["milch"]).toBe(masteryBefore);
  });
});
