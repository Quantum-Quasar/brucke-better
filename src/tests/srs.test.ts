import { describe, it, expect } from "vitest";
import { createInitialCard, gradeCard, isMastered, getDueCards, localDateKey } from "../lib/srs";
import { rankWeakestCards } from "../lib/review-decks";

describe("SM-2 Spaced Repetition Engine", () => {
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

  it("calculates correct progression for successful reviews (Good / Easy)", () => {
    let card = createInitialCard("hoffen");
    const today = new Date("2026-09-05");

    // 1st review (Good = 4)
    card = gradeCard(card, 4, today);
    expect(card.repetitions).toBe(1);
    expect(card.interval).toBe(1);

    // 2nd review (Good = 4)
    const day2 = new Date("2026-09-06");
    card = gradeCard(card, 4, day2);
    expect(card.repetitions).toBe(2);
    expect(card.interval).toBe(6);

    // 3rd review (Good = 4)
    const day8 = new Date("2026-09-12");
    card = gradeCard(card, 4, day8);
    expect(card.repetitions).toBe(3);
    expect(card.interval).toBeGreaterThanOrEqual(14);
    expect(isMastered(card)).toBe(true);
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

    // Repeated Hard reviews (grade = 3) decrease ease factor by 0.14 each time
    for (let i = 0; i < 15; i++) {
      card = gradeCard(card, 3);
    }
    expect(card.ease_factor).toBe(1.3);
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

    // Rep 1: strict Hard < Good < Easy ordering
    const rep1Card = gradeCard(fresh, 4, today);
    const r1Hard = gradeCard(rep1Card, 3, today);
    const r1Good = gradeCard(rep1Card, 4, today);
    const r1Easy = gradeCard(rep1Card, 5, today);
    expect(r1Hard.interval).toBeLessThan(r1Good.interval);
    expect(r1Good.interval).toBeLessThan(r1Easy.interval);

    // Mature card (interval = 10, EF = 2.5): strict Hard < Good < Easy ordering
    const mature = { ...createInitialCard("haus"), repetitions: 2, interval: 10, ease_factor: 2.5 };
    const mHard = gradeCard(mature, 3, today);
    const mGood = gradeCard(mature, 4, today);
    const mEasy = gradeCard(mature, 5, today);
    expect(mHard.interval).toBe(12);
    expect(mGood.interval).toBe(25);
    expect(mEasy.interval).toBe(33);
    expect(mHard.interval).toBeLessThan(mGood.interval);
    expect(mGood.interval).toBeLessThan(mEasy.interval);
    expect(mHard.due_date < mGood.due_date && mGood.due_date < mEasy.due_date).toBe(true);

    // Mastery still requires repetitions >= 3 and interval >= 7
    let hardOnly = createInitialCard("tief");
    hardOnly = gradeCard(hardOnly, 3, today);
    hardOnly = gradeCard(hardOnly, 3, today);
    hardOnly = gradeCard(hardOnly, 3, today);
    expect(hardOnly.repetitions).toBe(3);
    expect(isMastered(hardOnly)).toBe(false);
  });
});
