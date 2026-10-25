import { describe, it, expect } from "vitest";
import { createInitialCard, gradeCard, isMastered, getDueCards, getWeakestCards, getCardsByShift, localDateKey } from "../lib/srs";

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

    const weakest = getWeakestCards(cards);
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

  it("filters cards by sound shift family correctly", () => {
    const cards = {
      hoffen: createInitialCard("hoffen"),
      denken: createInitialCard("denken"),
    };
    const mockWords: any = {
      hoffen: { id: "hoffen", sound_shift_ids: ["p_to_pf_f"] },
      denken: { id: "denken", sound_shift_ids: ["th_to_d"] },
    };

    const pCards = getCardsByShift(cards, mockWords, "p_to_pf_f");
    expect(pCards.length).toBe(1);
    expect(pCards[0].word_id).toBe("hoffen");

    const thCards = getCardsByShift(cards, mockWords, "th_to_d");
    expect(thCards.length).toBe(1);
    expect(thCards[0].word_id).toBe("denken");
  });
});
