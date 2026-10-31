import { describe, expect, it } from "vitest";
import { parseReviewSession, type ReviewSessionSnapshot } from "@/lib/review-session";

const CARD = {
  word_id: "arm",
  interval: 1,
  repetitions: 0,
  ease_factor: 2.5,
  due_date: "2026-01-01",
  lapses: 0,
  last_reviewed: null,
};

const SNAPSHOT: ReviewSessionSnapshot = {
  activeDeck: "due",
  selectedShiftId: "th_to_d",
  selectedDomainId: "",
  learnedFilter: "all",
  sessionSize: 20,
  shuffleSession: true,
  sessionCards: [CARD],
  sessionEpoch: 1,
  currentIndex: 0,
  isRevealed: true,
  sessionStats: { reviewed: 0, correct: 0, again: 0, hard: 0, easy: 0 },
  sessionGrades: [null],
  preGradeSnapshots: { arm: { card: CARD, mastery: "explored" } },
  reviewMode: "flashcard",
};

describe("review session snapshots", () => {
  it("round-trips a valid session", () => {
    expect(parseReviewSession(JSON.stringify(SNAPSHOT))).toEqual(SNAPSHOT);
  });

  it("rejects junk, unknown decks and malformed cards", () => {
    expect(parseReviewSession(null)).toBeNull();
    expect(parseReviewSession("{not json")).toBeNull();
    expect(parseReviewSession(JSON.stringify({ ...SNAPSHOT, activeDeck: "nope" }))).toBeNull();
    expect(parseReviewSession(JSON.stringify({ ...SNAPSHOT, sessionCards: [] }))).toBeNull();
    expect(
      parseReviewSession(
        JSON.stringify({ ...SNAPSHOT, sessionCards: [{ ...CARD, due_date: "soon" }] })
      )
    ).toBeNull();
  });

  it("clamps indices/stats and sanitizes grades and modes", () => {
    const parsed = parseReviewSession(
      JSON.stringify({
        ...SNAPSHOT,
        currentIndex: 99,
        sessionGrades: [9, 3],
        learnedFilter: "bogus",
        sessionSize: 999,
        reviewMode: "bogus",
        sessionStats: { reviewed: -4, correct: 2.7, again: 1, hard: 3, easy: 5 },
      })
    );
    expect(parsed).not.toBeNull();
    expect(parsed!.currentIndex).toBe(0);
    expect(parsed!.sessionGrades).toEqual([null]);
    expect(parsed!.learnedFilter).toBe("all");
    expect(parsed!.sessionSize).toBe(20);
    expect(parsed!.reviewMode).toBe("flashcard");
    expect(parsed!.sessionStats.reviewed).toBe(0);
    expect(parsed!.sessionStats.correct).toBe(2);
  });

  it("drops unsafe snapshot keys", () => {
    const raw =
      '{"activeDeck":"due","sessionCards":[' +
      JSON.stringify(CARD) +
      '],"currentIndex":0,"preGradeSnapshots":{"__proto__":{"card":' +
      JSON.stringify(CARD) +
      ',"mastery":null},"arm":{"card":' +
      JSON.stringify(CARD) +
      ',"mastery":"encountered"}}}';
    const parsed = parseReviewSession(raw);
    expect(parsed).not.toBeNull();
    expect(Object.keys(parsed!.preGradeSnapshots)).toEqual(["arm"]);
  });
});
