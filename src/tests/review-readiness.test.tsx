import type { SetStateAction } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import lessonOne from "../data/lessons/1";
import { DEFAULT_SETTINGS } from "../data/settings";
import { getLanguageDefinition } from "../data/languages";
import { completedVocabularyCoverage, recognitionFirstReason } from "../lib/review-readiness";
import { parseReviewSession } from "../lib/review-session";
import { resolveCardReviewMode, sortDueCards } from "../lib/review-decks";
import { createInitialCard, gradeCard, isReviewable } from "../lib/srs";
import { useAppStore } from "../lib/store";
import { loadSavedState, persistenceRuntime } from "../lib/store/persistence";
import type { ReviewSnapshot } from "../lib/store/types";
import type { ReviewMode, WordEntity } from "../lib/types";
import { createReviewGrading, EMPTY_SESSION_STATS, type SessionGrades } from "../components/review/review-grading";
import { ReviewSessionCard } from "../components/review/ReviewSessionCard";
import type { ReviewController } from "../components/review/use-review-controller";
import { MemoryStorage } from "./storage-fixture";

const coverage = completedVocabularyCoverage([lessonOne], [1]);
const word: WordEntity = {
  id: "decke", target_word: "Decke", english_cognate: "deck", english_meaning: "blanket",
  gender: "die", ipa: "/ˈdɛkə/", sound_shift_ids: [], shift_rule: "Direct Cognate",
  context_phrase: "Die Decke ist warm", context_translation: "The blanket is warm",
  etymology_derivation: "A familiar connection.",
};
const apply = <T,>(next: SetStateAction<T>, previous: T): T => typeof next === "function"
  ? (next as (value: T) => T)(previous) : next;

function gradingSession() {
  const store = useAppStore.getState();
  const cards = [createInitialCard("decke"), createInitialCard("hand")];
  store.seedSrsCards(cards.map((card) => card.word_id));
  const snapshots: { current: Record<string, ReviewSnapshot> } = { current: {} };
  let grades: SessionGrades = [null, null];
  let stats = { ...EMPTY_SESSION_STATS };
  let index = 0;
  const controller = () => createReviewGrading({
    currentCard: cards[index], isRevealed: true, settings: DEFAULT_SETTINGS,
    currentIndex: index, sessionStats: stats, wordMastery: useAppStore.getState().wordMastery,
    sessionCards: cards, activeDeck: "due", recognitionReason: "table-only",
    sessionGrades: grades, srsCards: useAppStore.getState().srsCards, preGradeSnapshots: snapshots,
    blankCard: createInitialCard, restoreSrsCard: store.restoreSrsCard, recordReview: store.recordReview,
    setSessionGrades: (next) => { grades = apply(next, grades); },
    setSessionStats: (next) => { stats = apply(next, stats); },
    setCurrentIndex: (next) => { index = apply(next, index); },
    setIsRevealed: vi.fn(), setInputGuess: vi.fn(), setSelectedOption: vi.fn(),
    setSelectedTiles: vi.fn(), setCurrentAutoGrade: vi.fn(), setCurrentFeedbackNote: vi.fn(),
    setCompletedDeck: vi.fn(), setSessionComplete: vi.fn(), setActiveDeck: vi.fn(),
  });
  return { controller, cards, getStats: () => stats, getGrades: () => grades };
}

function cardMarkup(isRevealed: boolean, languageId = "de") {
  const controller: Partial<ReviewController> = {
    currentCard: createInitialCard(word.id), currentWord: word, currentIndex: 0,
    sessionCards: [createInitialCard(word.id)], sessionRef: { current: null },
    supportedModesForCard: ["flashcard"], effectiveReviewMode: "flashcard",
    recognitionReason: "table-only", settings: DEFAULT_SETTINGS,
    language: getLanguageDefinition(languageId), wordMastery: {}, isRevealed,
    currentCloze: null, inputGuess: "", currentFeedbackNote: null,
    canGoBack: false, canGoForward: false, setIsRevealed: vi.fn(),
    handleGrade: vi.fn(),
  };
  return renderToStaticMarkup(<ReviewSessionCard controller={controller as ReviewController} />);
}

describe("recognition-first vocabulary readiness", () => {
  beforeAll(() => {
    vi.stubGlobal("window", globalThis);
    vi.stubGlobal("document", { cookie: "" });
    vi.stubGlobal("localStorage", new MemoryStorage());
    persistenceRuntime.bootSavedState = null;
    persistenceRuntime.hasHydratedFromStorage = true;
  });
  afterAll(() => vi.unstubAllGlobals());
  beforeEach(() => {
    useAppStore.getState().resetProgress();
    useAppStore.getState().setActiveLanguage("de");
  });

  it("distinguishes Lesson 1 focus words from its optional table extras", () => {
    for (const id of lessonOne.word_ids) {
      expect(recognitionFirstReason(id, coverage, createInitialCard(id), "encountered")).toBeNull();
    }
    const extras = lessonOne.table_word_ids.filter((id) => !lessonOne.word_ids.includes(id));
    expect(extras).toContain("decke");
    for (const id of extras) {
      expect(recognitionFirstReason(id, coverage, createInitialCard(id), "encountered")).toBe("table-only");
    }
    expect(recognitionFirstReason("atlas-only", coverage, undefined, "explored")).toBe("untaught");
    expect(recognitionFirstReason("lernen", completedVocabularyCoverage([lessonOne], []), undefined, undefined)).toBe("untaught");
  });

  it("uses a completed focus lesson even if the word was an extra elsewhere", () => {
    const later = { id: 2, word_ids: ["decke"], table_word_ids: ["decke"] };
    expect(recognitionFirstReason("decke", completedVocabularyCoverage([lessonOne, later], [1]), undefined, undefined)).toBe("table-only");
    expect(recognitionFirstReason("decke", completedVocabularyCoverage([lessonOne, later], [1, 2]), undefined, undefined)).toBeNull();
  });

  it.each<ReviewMode>(["typing", "tiles", "mcq", "flashcard"])("overrides %s only while recognition is needed", (mode) => {
    for (const deck of ["due", "learned", "shift", "weakest", "recent", "domain", "everything"] as const) {
      expect(resolveCardReviewMode(word, mode, deck, true)).toBe("flashcard");
      expect(resolveCardReviewMode(word, mode, deck, false)).toBe(mode);
    }
  });

  it("keeps failures and guessed-only exposure in recognition, but promotes Good/Easy", () => {
    const initial = createInitialCard("decke");
    const failed = gradeCard(initial, 1);
    expect(failed.last_reviewed).not.toBeNull();
    expect(recognitionFirstReason("decke", coverage, failed, "encountered")).toBe("table-only");
    const guessed = { ...gradeCard(initial, 3), guessed: 1 };
    expect(recognitionFirstReason("decke", coverage, guessed, "encountered")).toBe("table-only");
    for (const grade of [4, 5] as const) {
      const successful = gradeCard(initial, grade);
      expect(recognitionFirstReason("decke", coverage, successful, "encountered")).toBeNull();
      expect(successful.lapses).toBe(initial.lapses);
    }
  });

  it("does not downgrade mature or historically successful cards, including after a lapse", () => {
    let mature = createInitialCard("decke");
    for (let i = 0; i < 3; i++) mature = gradeCard(mature, 4);
    expect(recognitionFirstReason("decke", coverage, mature, undefined)).toBeNull();
    expect(recognitionFirstReason("decke", coverage, gradeCard(mature, 1), "mastered")).toBeNull();
    expect(recognitionFirstReason("decke", coverage, { ...mature, repetitions: 0 }, undefined)).toBeNull();
  });

  it("leaves sentence/article semantics and card controls untouched", () => {
    for (const id of ["sentence_1", "article_decke"]) {
      expect(recognitionFirstReason(id, coverage, undefined, undefined)).toBeNull();
    }
    const initial = createInitialCard("decke");
    const controlled = { ...initial, suspended: true, buriedUntil: "9999-01-01", relearnRequired: true };
    const before = { ...controlled };
    expect(recognitionFirstReason("decke", coverage, controlled, "encountered")).toBe("table-only");
    expect(controlled).toEqual(before);
    expect(isReviewable(controlled)).toBe(false);
    const overdue = { ...createInitialCard("hand"), due_date: "2000-01-01" };
    expect(sortDueCards([initial, overdue])).toEqual([overdue, initial]);
  });

  it("ignores Hard during recognition and immediately undoes promotion on Back", () => {
    const session = gradingSession();
    session.controller().handleGrade(3);
    expect(useAppStore.getState().srsCards.decke.repetitions).toBe(0);
    expect(session.getStats().reviewed).toBe(0);
    session.controller().handleGrade(4);
    expect(recognitionFirstReason("decke", coverage, useAppStore.getState().srsCards.decke, "encountered")).toBeNull();
    session.controller().goBack();
    expect(useAppStore.getState().srsCards.decke).toEqual(session.cards[0]);
    expect(recognitionFirstReason("decke", coverage, useAppStore.getState().srsCards.decke, "encountered")).toBe("table-only");
    expect(session.getStats().reviewed).toBe(0);
    expect(session.getGrades()).toEqual([null, null]);
    session.controller().handleGrade(1);
    expect(useAppStore.getState().srsCards.decke).toMatchObject({ repetitions: 0, lapses: 1 });
  });

  it("re-derives readiness from persisted history and isolates shared ids by language", () => {
    const store = useAppStore.getState();
    store.completeLesson(1);
    store.seedSrsCards(["decke"]);
    store.recordReview("decke", 4);
    const saved = loadSavedState();
    expect(recognitionFirstReason("decke", coverage, saved.srsCards?.decke, saved.wordMastery?.decke)).toBeNull();
    store.setActiveLanguage("fr");
    expect(recognitionFirstReason("decke", completedVocabularyCoverage([], useAppStore.getState().completedLessons), useAppStore.getState().srsCards.decke, useAppStore.getState().wordMastery.decke)).toBe("untaught");
    store.setActiveLanguage("de");
    expect(recognitionFirstReason("decke", coverage, useAppStore.getState().srsCards.decke, useAppStore.getState().wordMastery.decke)).toBeNull();
  });

  it("restores recognition direction and undo history without a persisted readiness flag", () => {
    const initial = createInitialCard("decke");
    const restored = parseReviewSession(JSON.stringify({
      progressResetAt: 0, progressResetActor: "", activeDeck: "due",
      selectedShiftId: "all", selectedDomainId: "", learnedFilter: "all",
      sessionSize: 10, shuffleSession: false,
      sessionCards: [initial, createInitialCard("hand")], sessionEpoch: 1,
      currentIndex: 1, isRevealed: false,
      sessionStats: { reviewed: 1, correct: 1, again: 0, hard: 0, easy: 0 },
      sessionGrades: [4, null],
      preGradeSnapshots: { decke: { card: initial, mastery: "encountered" } },
      reviewMode: "typing",
    }));
    expect(restored).not.toBeNull();
    const baseline = restored!.preGradeSnapshots.decke;
    const reason = recognitionFirstReason("decke", coverage, baseline.card, baseline.mastery ?? undefined);
    expect(reason).toBe("table-only");
    expect(resolveCardReviewMode(word, restored!.reviewMode, restored!.activeDeck, reason !== null)).toBe("flashcard");
    expect(restored!.sessionGrades).toEqual([4, null]);
  });

  it("shows the target word/audio first without leaking English or production inputs", () => {
    const front = cardMarkup(false);
    expect(front).toContain('lang="de-DE"');
    expect(front).toContain("die Decke");
    expect(front).toContain("Listen to the ");
    expect(front).toContain("German word");
    expect(front).toContain("optional table vocabulary");
    expect(front).not.toContain("blanket");
    expect(front).not.toContain("recall the");
    expect(front).not.toContain("<input");
    const answer = cardMarkup(true);
    expect(answer).toContain('lang="en"');
    expect(answer).toContain("blanket");
    expect(answer).toContain("Choose Good or Easy");
    expect(answer).not.toContain(">hard</span>");
  });
});
