import { describe, it, expect } from "vitest";
import {
  isWordLearned,
  filterByLearned,
  getRecentLessonWordIds,
  sortDueCards,
  rankWeakestCards,
  prepareSession,
} from "../lib/review-decks";
import { createInitialCard } from "../lib/srs";
import type { Lesson } from "../lib/types";

const lesson = (id: number, word_ids: string[]) => ({ id, word_ids }) as unknown as Lesson;

describe("review decks", () => {
  it("treats encountered, mastered and reviewed words as learned; explored/unknown as not", () => {
    const reviewed = { ...createInitialCard("c"), last_reviewed: "2026-01-01" };
    expect(isWordLearned("a", { a: "encountered" }, {})).toBe(true);
    expect(isWordLearned("b", { b: "explored" }, {})).toBe(false);
    expect(isWordLearned("c", {}, { c: reviewed })).toBe(true);
    expect(isWordLearned("d", {}, {})).toBe(false);
  });

  it("filters words by learned / new", () => {
    const words = [{ id: "a" }, { id: "b" }];
    const m = { a: "encountered" as const };
    expect(filterByLearned(words, "learned", m, {}).map((w) => w.id)).toEqual(["a"]);
    expect(filterByLearned(words, "new", m, {}).map((w) => w.id)).toEqual(["b"]);
    expect(filterByLearned(words, "all", m, {})).toHaveLength(2);
  });

  it("recent words come from the last completed lessons, newest first, de-duplicated", () => {
    const lessons = [lesson(1, ["a", "b"]), lesson(2, ["b", "c"]), lesson(3, ["d"]), lesson(4, ["e"])];
    expect(getRecentLessonWordIds(lessons, [1, 2, 3], 2)).toEqual(["d", "b", "c"]);
    expect(getRecentLessonWordIds(lessons, [], 3)).toEqual([]);
    expect(getRecentLessonWordIds(lessons, [1], 3, new Set(["b"]))).toEqual(["b"]);
  });

  it("sorts due cards most overdue first", () => {
    const a = { ...createInitialCard("a"), due_date: "2026-02-02" };
    const b = { ...createInitialCard("b"), due_date: "2026-01-01" };
    expect(sortDueCards([a, b]).map((c) => c.word_id)).toEqual(["b", "a"]);
  });

  it("ranks weakest by lapses then guesses, including guessed-only words", () => {
    const mk = (id: string, lapses: number, guessed = 0) => ({ ...createInitialCard(id), lapses, guessed });
    const out = rankWeakestCards({ a: mk("a", 1), b: mk("b", 3), c: mk("c", 0, 2), d: mk("d", 0) });
    expect(out.map((c) => c.word_id)).toEqual(["b", "a", "c"]);
  });

  it("caps and keeps all cards when shuffling", () => {
    const cards = [1, 2, 3, 4, 5];
    expect(prepareSession(cards, 0, false)).toEqual(cards);
    expect(prepareSession([...cards, 6, 7, 8, 9, 10, 11], 10, false)).toHaveLength(10);
    expect(prepareSession(cards, 10, false)).toHaveLength(5);
    expect(prepareSession(cards, 0, true).sort()).toEqual(cards);
  });
});

describe("seedSrsCards", () => {
  it("creates cards with a one-day grace for new words only, leaving existing cards untouched", async () => {
    const { useAppStore } = await import("../lib/store");
    const { localDateKey } = await import("../lib/srs");
    const st = useAppStore.getState();
    st.resetProgress();
    st.recordReview("hand", 5);
    const before = useAppStore.getState().srsCards["hand"];
    useAppStore.getState().seedSrsCards(["hand", "arm", "arm", " "]);
    const cards = useAppStore.getState().srsCards;
    expect(cards["hand"]).toEqual(before);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(cards["arm"].due_date).toBe(localDateKey(tomorrow));
    expect(Object.keys(cards).sort()).toEqual(["arm", "hand"]);
  });
});
