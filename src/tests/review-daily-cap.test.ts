import { describe, it, expect } from "vitest";
import {
  dailyReviewCapForMinutes,
  countReviewedToday,
  getDailyReviewBudget,
} from "../lib/review-decks";
import { createInitialCard } from "../lib/srs";

describe("Daily review cap & new-card budget", () => {
  it("maps dailyMinutes goal to daily review cap and new-card budget", () => {
    expect(dailyReviewCapForMinutes(5)).toEqual({ dailyCap: 15, newCardBudget: 5 });
    expect(dailyReviewCapForMinutes(10)).toEqual({ dailyCap: 30, newCardBudget: 10 });
    expect(dailyReviewCapForMinutes(15)).toEqual({ dailyCap: 45, newCardBudget: 15 });
    expect(dailyReviewCapForMinutes(20)).toEqual({ dailyCap: 60, newCardBudget: 20 });
    expect(dailyReviewCapForMinutes(30)).toEqual({ dailyCap: 60, newCardBudget: 20 });
  });

  it("counts only cards reviewed on the local calendar day and flags when cap is reached", () => {
    const today = "2026-11-23";
    const todayNoon = new Date(2026, 10, 23, 12, 0, 0).toISOString();
    const yesterdayNoon = new Date(2026, 10, 22, 12, 0, 0).toISOString();

    const cards: Record<string, ReturnType<typeof createInitialCard>> = {};
    for (let i = 0; i < 15; i++) {
      cards[`w${i}`] = { ...createInitialCard(`w${i}`), last_reviewed: todayNoon };
    }
    cards["old"] = { ...createInitialCard("old"), last_reviewed: yesterdayNoon };

    expect(countReviewedToday(cards, today)).toBe(15);

    const budget5 = getDailyReviewBudget(5, cards, today);
    expect(budget5.dailyCap).toBe(15);
    expect(budget5.reviewedToday).toBe(15);
    expect(budget5.remainingToday).toBe(0);
    expect(budget5.capReached).toBe(true);

    const budget10 = getDailyReviewBudget(10, cards, today);
    expect(budget10.dailyCap).toBe(30);
    expect(budget10.remainingToday).toBe(15);
    expect(budget10.capReached).toBe(false);
  });
});
