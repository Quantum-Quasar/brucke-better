import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SETTINGS } from "../data/settings";
import { useAppStore } from "../lib/store";
import { loadSavedState, persistenceRuntime } from "../lib/store/persistence";
import { normalizeLanguageSlice, normalizeSettings } from "../lib/store/schema";
import { emptyVersions, mergeLanguageSlice } from "../lib/store/progress-state";
import { createProgressBackup } from "../lib/progress-backup";
import { createInitialCard, getDueCards, isReviewable, localDateKey, needsRelearn } from "../lib/srs";
import { filterByLearned, rankWeakestCards, SESSION_SIZES, type ReviewDeckType } from "../lib/review-decks";
import { orderReviewDeck } from "../components/review/review-deck-ordering";
import { prepareSentenceSession } from "../lib/sentence-review";
import type { ExerciseItem, SRSCard } from "../lib/types";

class MemoryStorage {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, String(value)); }
  removeItem(key: string) { this.values.delete(key); }
  clear() { this.values.clear(); }
}

const originalTimezone = process.env.TZ;

describe("review controls and relearning", () => {
  beforeAll(() => {
    vi.stubGlobal("window", globalThis);
    vi.stubGlobal("document", { cookie: "" });
    vi.stubGlobal("localStorage", new MemoryStorage());
    persistenceRuntime.bootSavedState = null;
    persistenceRuntime.hasHydratedFromStorage = true;
  });
  afterAll(() => vi.unstubAllGlobals());
  afterEach(() => {
    vi.useRealTimers();
    if (originalTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = originalTimezone;
  });
  beforeEach(() => {
    useAppStore.getState().resetProgress();
    useAppStore.getState().setActiveLanguage("de");
    useAppStore.getState().resetSettings();
  });

  it("defaults to ten and normalizes only the supported shared preferences", () => {
    expect(SESSION_SIZES).toEqual([5, 10, 20, 0]);
    expect(DEFAULT_SETTINGS.reviewSessionLimit).toBe(10);
    const invalid = normalizeSettings({ reviewSessionLimit: 50, dailyMinutes: 7, placementTopic: -1, learningGoal: "other", microphonePractice: "yes", voiceGuidanceDismissed: ["de", "de", null] }, DEFAULT_SETTINGS);
    expect(invalid).toMatchObject({ reviewSessionLimit: 10, dailyMinutes: 10, placementTopic: 1, learningGoal: "fun", microphonePractice: false, voiceGuidanceDismissed: ["de"] });
    expect(normalizeSettings({ reviewSessionLimit: 0, dailyMinutes: 30, learningGoal: "exam", placementTopic: 4, microphonePractice: true }, DEFAULT_SETTINGS)).toMatchObject({ reviewSessionLimit: 0, dailyMinutes: 30, learningGoal: "exam", placementTopic: 4, microphonePractice: true });
  });

  it("moves the fifth lapse into Relearn and rejects stale grading, guesses and undo", () => {
    const store = useAppStore.getState();
    store.markWordMastered("hand");
    for (let lapse = 1; lapse <= 4; lapse++) {
      store.recordReview("hand", 1);
      expect(needsRelearn(useAppStore.getState().srsCards.hand)).toBe(false);
    }
    const beforeFifth = useAppStore.getState().srsCards.hand;
    store.recordReview("hand", 1);
    const leech = useAppStore.getState().srsCards.hand;
    expect(leech).toMatchObject({ lapses: 5, relearnRequired: true });
    expect(useAppStore.getState().wordMastery.hand).toBe("mastered");
    expect(getDueCards({ hand: leech }, "9999-12-31")).toEqual([]);
    expect(rankWeakestCards({ hand: leech })).toEqual([]);
    expect(filterByLearned([{ id: "hand" }], "all", {}, { hand: leech })).toEqual([]);
    store.recordReview("hand", 4);
    store.flagGuessed(["hand"]);
    store.restoreSrsCard("hand", { card: beforeFifth, mastery: "mastered" });
    expect(useAppStore.getState().srsCards.hand).toEqual(leech);
  });

  it("requires a new linked lesson completion and explicit resumption, preserving history and mastery", () => {
    const store = useAppStore.getState();
    store.completeLesson(1);
    store.markWordMastered("hand");
    for (let i = 0; i < 5; i++) store.recordReview("hand", 1);
    store.resumeCardAfterRelearn("hand");
    expect(needsRelearn(useAppStore.getState().srsCards.hand)).toBe(true);
    store.setLessonProgress(1, { segment: "summary", practiceIndex: 12, completedSegments: ["hook", "pattern", "table", "practice", "summary"], everQueued: true });
    const completedBefore = useAppStore.getState().completedLessons;
    const starsBefore = useAppStore.getState().lessonStars;
    store.beginCardRelearn("hand", 1);
    expect(useAppStore.getState().lessonProgress[1]).toMatchObject({ segment: "hook", practiceIndex: 0, completedSegments: [], everQueued: false });
    expect(useAppStore.getState().completedLessons).toEqual(completedBefore);
    expect(useAppStore.getState().lessonStars).toEqual(starsBefore);
    expect(useAppStore.getState().wordMastery.hand).toBe("mastered");
    expect(useAppStore.getState().srsCards.hand.relearnLessonCompleted).toBe(false);
    store.resumeCardAfterRelearn("hand");
    expect(needsRelearn(useAppStore.getState().srsCards.hand)).toBe(true);
    store.completeLesson(2);
    expect(useAppStore.getState().srsCards.hand.relearnLessonCompleted).toBe(false);
    store.completeLesson(1);
    expect(useAppStore.getState().srsCards.hand.relearnLessonCompleted).toBe(true);
    expect(isReviewable(useAppStore.getState().srsCards.hand)).toBe(false);
    store.resumeCardAfterRelearn("hand");
    expect(useAppStore.getState().srsCards.hand).toMatchObject({ lapses: 5, relearnLapses: 5, repetitions: 0, due_date: localDateKey() });
    expect(isReviewable(useAppStore.getState().srsCards.hand)).toBe(true);
    expect(useAppStore.getState().wordMastery.hand).toBe("mastered");
    store.recordReview("hand", 1);
    expect(needsRelearn(useAppStore.getState().srsCards.hand)).toBe(false);
    for (let i = 0; i < 4; i++) store.recordReview("hand", 1);
    expect(useAppStore.getState().srsCards.hand.lapses).toBe(10);
    expect(needsRelearn(useAppStore.getState().srsCards.hand)).toBe(true);
  });

  it("keeps mastered words scheduled and grows their intervals on later success", () => {
    const store = useAppStore.getState();
    for (let i = 0; i < 3; i++) store.recordReview("hand", 4);
    const mastered = useAppStore.getState().srsCards.hand;
    expect(useAppStore.getState().wordMastery.hand).toBe("mastered");
    expect(getDueCards({ hand: mastered }, mastered.due_date)).toEqual([mastered]);
    store.recordReview("hand", 4);
    expect(useAppStore.getState().srsCards.hand.interval).toBeGreaterThan(mastered.interval);
    store.recordReview("hand", 1);
    expect(useAppStore.getState().wordMastery.hand).toBe("mastered");
    expect(useAppStore.getState().srsCards.hand.interval).toBe(1);
  });

  it("round-trips suspend/bury through persistence and backup without modifying schedules", () => {
    const store = useAppStore.getState();
    store.recordReview("hand", 4);
    const schedule = useAppStore.getState().srsCards.hand;
    store.suspendCard("hand", true);
    store.buryCard("hand");
    const controlled = useAppStore.getState().srsCards.hand;
    expect(controlled).toMatchObject({ ...schedule, suspended: true, buriedUntil: localDateKey() });
    expect(loadSavedState().srsCards?.hand).toEqual(controlled);
    const backup = createProgressBackup(useAppStore.getState());
    store.resetProgress();
    expect(store.importBackupState(backup)).toBe(true);
    expect(useAppStore.getState().srsCards.hand).toEqual(controlled);
    store.suspendCard("hand", false);
    expect(isReviewable(useAppStore.getState().srsCards.hand)).toBe(false);
    store.unburyCard("hand");
    expect(isReviewable(useAppStore.getState().srsCards.hand)).toBe(true);
    expect(useAppStore.getState().srsCards.hand).toMatchObject(schedule);
  });


  it("prevents stale session undo or grades from unsuspending or unburying a card", () => {
    const store = useAppStore.getState();
    store.recordReview("hand", 4);
    const snapshot = { card: useAppStore.getState().srsCards.hand, mastery: "encountered" as const };
    store.suspendCard("hand", true);
    const suspended = useAppStore.getState().srsCards.hand;
    store.restoreSrsCard("hand", snapshot);
    store.recordReview("hand", 5);
    expect(useAppStore.getState().srsCards.hand).toEqual(suspended);
    store.suspendCard("hand", false);
    store.buryCard("hand");
    const buried = useAppStore.getState().srsCards.hand;
    store.restoreSrsCard("hand", snapshot);
    store.recordReview("hand", 5);
    expect(useAppStore.getState().srsCards.hand).toEqual(buried);
  });

  it("requires the explicit dictionary-card relearn step and retains separate suspension", () => {
    const store = useAppStore.getState();
    for (let i = 0; i < 5; i++) store.recordReview("dictionary-only", 1);
    store.suspendCard("dictionary-only", true);
    store.resumeCardAfterRelearn("dictionary-only");
    expect(needsRelearn(useAppStore.getState().srsCards["dictionary-only"])).toBe(true);
    store.beginCardRelearn("dictionary-only", 0);
    store.resumeCardAfterRelearn("dictionary-only");
    expect(needsRelearn(useAppStore.getState().srsCards["dictionary-only"])).toBe(false);
    expect(isReviewable(useAppStore.getState().srsCards["dictionary-only"])).toBe(false);
    store.suspendCard("dictionary-only", false);
    expect(isReviewable(useAppStore.getState().srsCards["dictionary-only"])).toBe(true);
  });
  it("normalizes leech metadata and preserves explicit resume against stale cross-tab state", () => {
    const card = { ...createInitialCard("hand"), lapses: 8, suspended: true, buriedUntil: "2026-11-12", relearnRequired: true, relearnLapses: 2, relearnLessonId: 3, relearnLessonCompleted: true };
    const slice = normalizeLanguageSlice({ srsCards: { hand: card } });
    expect(slice.srsCards.hand).toEqual(card);
    const resumed = { ...card, suspended: false, relearnRequired: false, relearnLapses: 8 };
    const newer = { ...slice, srsCards: { hand: resumed }, progressVersions: { ...emptyVersions(), srsCards: { hand: "0000000000000002:a" } } };
    const older = { ...slice, progressVersions: { ...emptyVersions(), srsCards: { hand: "0000000000000001:b" } } };
    expect(mergeLanguageSlice(newer, older).srsCards.hand).toEqual(resumed);
    expect(mergeLanguageSlice(older, newer).srsCards.hand).toEqual(resumed);
    expect(needsRelearn(normalizeLanguageSlice({ srsCards: { hand: { ...card, relearnRequired: undefined, relearnLapses: undefined } } }).srsCards.hand)).toBe(true);
  });

  it("isolates card controls by language and clears them on reset", () => {
    const store = useAppStore.getState();
    store.suspendCard("hand", true);
    store.buryCard("hand");
    const german = useAppStore.getState().srsCards.hand;
    store.setActiveLanguage("fr");
    expect(useAppStore.getState().srsCards.hand).toBeUndefined();
    store.recordReview("hand", 4);
    expect(isReviewable(useAppStore.getState().srsCards.hand)).toBe(true);
    store.setActiveLanguage("de");
    expect(useAppStore.getState().srsCards.hand).toEqual(german);
    store.resetProgress();
    expect(useAppStore.getState().srsCards).toEqual({});
    store.setActiveLanguage("fr");
    expect(useAppStore.getState().srsCards).toEqual({});
  });

  it.each<[string, number, number, number, number]>([
    ["spring forward", 2026, 2, 8, 23],
    ["fall back", 2026, 10, 1, 25],
  ])("unburies at local midnight on the %s day, not after 24 hours", (_, year, month, day, hours) => {
    process.env.TZ = "America/New_York";
    vi.useFakeTimers();
    const start = new Date(year, month, day, 0, 0);
    vi.setSystemTime(start);
    const store = useAppStore.getState();
    store.buryCard("hand");
    const card = useAppStore.getState().srsCards.hand;
    const end = new Date(year, month, day + 1, 0, 0);
    expect((end.getTime() - start.getTime()) / 3_600_000).toBe(hours);
    vi.setSystemTime(new Date(end.getTime() - 1));
    expect(isReviewable(card)).toBe(false);
    vi.setSystemTime(end);
    expect(isReviewable(card)).toBe(true);
  });

  it("keeps a UTC-tomorrow card buried through its actual local day", () => {
    process.env.TZ = "Etc/GMT+12";
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 23, 59));
    useAppStore.getState().buryCard("hand");
    const card = useAppStore.getState().srsCards.hand;
    expect(card.buriedUntil).toBe("2026-01-01");
    expect(new Date().toISOString().slice(0, 10)).toBe("2026-01-02");
    expect(isReviewable(card)).toBe(false);
    vi.setSystemTime(new Date(2026, 0, 2, 0, 0));
    expect(isReviewable(card)).toBe(true);
  });

  it("does not apply word leech controls to the independent failed-sentence process queue", () => {
    const exercise: ExerciseItem = { id: "process", type: "transcribe", prompt: "Build", target_answer: "Ich bin hier", word_bank: ["Ich", "bin", "hier"] };
    for (let i = 0; i < 8; i++) useAppStore.getState().recordSentenceFailure(1, exercise, "de");
    expect(useAppStore.getState().sentenceCards["1:process"].lapses).toBe(8);
    expect(prepareSentenceSession(useAppStore.getState().sentenceCards)).toHaveLength(1);
    expect(useAppStore.getState().srsCards).toEqual({});
  });
});

describe("every vocabulary deck shares the chosen session limit", () => {
  const cards: SRSCard[] = Array.from({ length: 30 }, (_, index) => ({ ...createInitialCard(`w${index}`), due_date: "2020-01-01" }));
  const ids = cards.map((card) => card.word_id);
  const blankCard = (id: string) => cards.find((card) => card.word_id === id)!;
  const sources = { dueCards: cards, weakestCards: cards, learnedCards: cards, recentWordIds: ids, scopedCompoundCards: cards, sentenceCards: cards, articleCards: cards, shiftIds: () => ids, domainIds: () => ids, everythingIds: () => ids, blankCard, sessionSize: 5 as const, shuffleSession: false };
  it.each<ReviewDeckType>(["due", "weakest", "learned", "shift", "recent", "compounds", "sentences", "articles", "domain", "everything"])("caps %s without a hidden 20-card learned limit", (deck) => {
    expect(orderReviewDeck(deck, sources)).toHaveLength(5);
    expect(orderReviewDeck(deck, { ...sources, sessionSize: 10 })).toHaveLength(10);
    expect(orderReviewDeck(deck, { ...sources, sessionSize: 20 })).toHaveLength(20);
    expect(orderReviewDeck(deck, { ...sources, sessionSize: 0 }).length).toBeGreaterThanOrEqual(30);
  });
  it("filters excluded cards before limiting, including custom retry decks", () => {
    const excluded = [{ ...cards[0], suspended: true }, { ...cards[1], buriedUntil: localDateKey() }, { ...cards[2], lapses: 5 }];
    const output = orderReviewDeck("learned", sources, [...excluded, ...cards.slice(3)]);
    expect(output).toHaveLength(5);
    expect(output.map((card) => card.word_id)).toEqual(ids.slice(3, 8));
  });
});
