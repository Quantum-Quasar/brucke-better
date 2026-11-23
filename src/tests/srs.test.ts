import { describe, it, expect } from "vitest";
import {
  applyIntervalFuzz,
  createInitialCard,
  gradeCard,
  isMastered,
  getDueCards,
  localDateKey,
  MASTERY_INTERVAL_DAYS,
} from "../lib/srs";
import { rankWeakestCards } from "../lib/review-decks";

describe("FSRS-4.5 Spaced Repetition Engine", () => {
  it("initializes a card with a one-day grace (first review tomorrow)", () => {
    const card = createInitialCard("hoffen");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(card.word_id).toBe("hoffen");
    expect(card.interval).toBe(0);
    expect(card.repetitions).toBe(0);
    expect(card.ease_factor).toBe(2.5);
    expect(card.lapses).toBe(0);
    // First exposure today → earliest scheduled review is tomorrow, matching a
    // first "Good" grade, so finishing a lesson never floods today's queue.
    expect(card.due_date).toBe(localDateKey(tomorrow));
  });

  it("calculates FSRS progression for successful reviews and enforces 21-day mastery", () => {
    let card = createInitialCard("hoffen");
    const today = new Date("2026-09-05");

    // 1st review (Good = 4)
    card = gradeCard(card, 4, today);
    expect(card.repetitions).toBe(1);
    expect(card.interval).toBe(1);
    expect(card.stability).toBeGreaterThan(0);
    expect(card.difficulty).toBeGreaterThanOrEqual(1);
    expect(card.difficulty).toBeLessThanOrEqual(10);
    expect(isMastered(card)).toBe(false);

    // 2nd review (Good = 4)
    const day2 = new Date("2026-09-06");
    card = gradeCard(card, 4, day2);
    expect(card.repetitions).toBe(2);
    expect(card.interval).toBeGreaterThanOrEqual(4);
    expect(isMastered(card)).toBe(false);

    // 3rd review (Good = 4) — crosses 21-day mastery threshold
    const day9 = new Date("2026-09-13");
    card = gradeCard(card, 4, day9);
    expect(card.repetitions).toBe(3);
    expect(card.interval).toBeGreaterThanOrEqual(MASTERY_INTERVAL_DAYS);
    expect(isMastered(card)).toBe(true);
  });

  it("requires 21+ day interval (not 7 days) and 3+ repetitions for mastery", () => {
    const base = createInitialCard("meister");
    expect(isMastered({ ...base, repetitions: 3, interval: 7 })).toBe(false);
    expect(isMastered({ ...base, repetitions: 3, interval: 20 })).toBe(false);
    expect(isMastered({ ...base, repetitions: 2, interval: 30 })).toBe(false);
    expect(isMastered({ ...base, repetitions: 3, interval: 21 })).toBe(true);
    expect(isMastered({ ...base, repetitions: 4, interval: 45 })).toBe(true);
  });

  it("resets interval and increments lapses on failure (Again = 1)", () => {
    let card = createInitialCard("helfen");
    card = gradeCard(card, 4); // Rep 1
    card = gradeCard(card, 4); // Rep 2

    // Lapse
    card = gradeCard(card, 1);
    expect(card.repetitions).toBe(0);
    expect(card.interval).toBe(1);
    expect(card.lapses).toBe(1);
    expect(isMastered(card)).toBe(false);
  });

  it("filters due cards and weakest cards accurately", () => {
    const cards = {
      hoffen: { ...createInitialCard("hoffen"), due_date: "2026-09-04", lapses: 1 },
      helfen: { ...createInitialCard("helfen"), due_date: "2026-09-05", lapses: 3 },
      schlafen: { ...createInitialCard("schlafen"), due_date: "2026-09-10", lapses: 0 },
    };

    const dueToday = getDueCards(cards, "2026-09-05");
    expect(dueToday.length).toBe(2);
    expect(dueToday.map((c) => c.word_id)).toContain("hoffen");
    expect(dueToday.map((c) => c.word_id)).toContain("helfen");

    const weakest = rankWeakestCards(cards);
    expect(weakest[0].word_id).toBe("helfen");
    expect(weakest[1].word_id).toBe("hoffen");
  });

  it("decreases ease factor on Hard reviews and clamps at the SM-2 floor of 1.3", () => {
    let card = createInitialCard("schwer");
    expect(card.ease_factor).toBe(2.5);

    // Repeated Hard reviews (grade = 3) decrease ease factor down to 1.3 floor
    for (let i = 0; i < 15; i++) {
      card = gradeCard(card, 3);
    }
    expect(card.ease_factor).toBe(1.3);
    expect(card.difficulty).toBeGreaterThan(5);
  });

  it("schedules Hard sooner than Good and Easy later on learning and mature cards", () => {
    const today = new Date("2026-09-05");
    const fresh = createInitialCard("wasser");

    // Rep 0: Easy jumps ahead of Hard/Good
    const r0Hard = gradeCard(fresh, 3, today);
    const r0Good = gradeCard(fresh, 4, today);
    const r0Easy = gradeCard(fresh, 5, today);
    expect(r0Hard.interval).toBe(1);
    expect(r0Good.interval).toBe(1);
    expect(r0Easy.interval).toBeGreaterThan(r0Good.interval);

    // Rep 1 (reviewed next day): strict Hard < Good < Easy ordering
    const rep1Card = gradeCard(fresh, 4, today);
    const nextDay = new Date("2026-09-06");
    const r1Hard = gradeCard(rep1Card, 3, nextDay);
    const r1Good = gradeCard(rep1Card, 4, nextDay);
    const r1Easy = gradeCard(rep1Card, 5, nextDay);
    expect(r1Hard.interval).toBeLessThan(r1Good.interval);
    expect(r1Good.interval).toBeLessThan(r1Easy.interval);

    // Legacy mature card without FSRS fields (interval = 10, EF = 2.5): strict Hard < Good < Easy ordering
    const mature = { ...createInitialCard("haus"), repetitions: 2, interval: 10, ease_factor: 2.5 };
    const mHard = gradeCard(mature, 3, today);
    const mGood = gradeCard(mature, 4, today);
    const mEasy = gradeCard(mature, 5, today);
    expect(mHard.interval).toBeLessThan(mGood.interval);
    expect(mGood.interval).toBeLessThan(mEasy.interval);
    expect(mHard.due_date < mGood.due_date && mGood.due_date < mEasy.due_date).toBe(true);
    expect(mGood.stability).toBeGreaterThan(10);

    // Hard-only cards do not achieve 21-day mastery in 3 reviews
    let hardOnly = createInitialCard("tief");
    hardOnly = gradeCard(hardOnly, 3, today);
    hardOnly = gradeCard(hardOnly, 3, today);
    hardOnly = gradeCard(hardOnly, 3, today);
    expect(hardOnly.repetitions).toBe(3);
    expect(isMastered(hardOnly)).toBe(false);
  });

  it("applies deterministic ±5% interval fuzz for intervals >= 7 days", () => {
    // Below 7 days: no fuzz
    expect(applyIntervalFuzz(1, "wort-a")).toBe(1);
    expect(applyIntervalFuzz(6, "wort-a")).toBe(6);

    // Deterministic for the same seed
    const first = applyIntervalFuzz(40, "hoffen:3:0:4");
    const second = applyIntervalFuzz(40, "hoffen:3:0:4");
    expect(first).toBe(second);
    expect(Math.abs(first - 40)).toBeLessThanOrEqual(2); // ±5% of 40 = ±2

    // Spreads a cohort of 20 cards across multiple days instead of piling on one day
    const cohort = Array.from({ length: 20 }, (_, i) => applyIntervalFuzz(40, `word-${i}:3:0:4`));
    const uniqueDays = new Set(cohort);
    expect(uniqueDays.size).toBeGreaterThan(1);
    for (const days of cohort) {
      expect(days).toBeGreaterThanOrEqual(38);
      expect(days).toBeLessThanOrEqual(42);
    }
  });

  it("handles rapid back-to-back reviews without inflating intervals (fixes flagGuessed)", () => {
    const t0 = new Date("2026-09-05T10:00:00Z");
    const t1 = new Date("2026-09-06T10:00:00Z");
    const t2 = new Date("2026-09-12T10:00:00Z");
    const t2Plus1Min = new Date("2026-09-12T10:01:00Z");

    let card = createInitialCard("denken");
    card = gradeCard(card, 4, t0);
    card = gradeCard(card, 4, t1);
    card = gradeCard(card, 4, t2);
    const stabilityAfterGood = card.stability!;

    // Immediate Hard re-grade (like flagGuessed 1 minute later) must NOT inflate stability
    const afterImmediateHard = gradeCard(card, 3, t2Plus1Min);
    expect(afterImmediateHard.stability!).toBeLessThanOrEqual(stabilityAfterGood + 0.05);
  });

  it("strictly preserves Hard <= Good <= Easy after fuzzing on any card and handles non-finite fuzz input", () => {
    expect(applyIntervalFuzz(Number.NaN, "seed")).toBe(1);
    expect(applyIntervalFuzz(Number.POSITIVE_INFINITY, "seed")).toBe(1);

    const reviewDate = new Date("2026-10-15T12:00:00Z");
    for (let i = 0; i < 30; i++) {
      const card = {
        ...createInitialCard(`word_${i}`),
        repetitions: 2 + (i % 4),
        interval: 6 + i,
        stability: 6 + i,
        difficulty: 3 + (i % 6),
        lapses: i % 3,
        last_reviewed: new Date("2026-10-01T12:00:00Z").toISOString(),
      };
      const hard = gradeCard(card, 3, reviewDate);
      const good = gradeCard(card, 4, reviewDate);
      const easy = gradeCard(card, 5, reviewDate);
      expect(hard.interval).toBeLessThanOrEqual(good.interval);
      expect(good.interval).toBeLessThanOrEqual(easy.interval);
    }
  });

  it("migrates legacy SM-2 cards cleanly with real last_reviewed timestamps", () => {
    const legacy = {
      ...createInitialCard("legacy_wort"),
      repetitions: 3,
      interval: 10,
      ease_factor: 2.5,
      last_reviewed: new Date("2026-09-01T10:00:00Z").toISOString(),
    };
    const graded = gradeCard(legacy, 4, new Date("2026-09-11T10:00:00Z"));
    expect(graded.stability).toBeGreaterThan(10);
    expect(graded.stability).toBeLessThanOrEqual(36500);
    expect(graded.difficulty).toBeGreaterThanOrEqual(1);
    expect(graded.difficulty).toBeLessThanOrEqual(10);
  });
});
