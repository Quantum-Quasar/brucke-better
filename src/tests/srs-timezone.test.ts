import { describe, it, expect, afterAll } from "vitest";
import { createInitialCard, gradeCard, localDateKey, getDueCards } from "../lib/srs";

// The SM-2 queue is keyed by LOCAL calendar days. The old implementation
// formatted due dates with toISOString() (UTC) while doing the +interval
// arithmetic with local setters, so near local midnight cards became due on
// the wrong calendar day. These tests pin both sides of the boundary by
// running the scheduler inside fixed timezones where local and UTC dates
// disagree for most of the day.

describe("SRS timezone boundary handling", () => {
  const ORIGINAL_TZ = process.env.TZ;

  afterAll(() => {
    if (ORIGINAL_TZ === undefined) delete process.env.TZ;
    else process.env.TZ = ORIGINAL_TZ;
  });

  it("localDateKey returns the local calendar day, not the UTC day", () => {
    // UTC-12: local midnight lags UTC by half a day, so a late local evening
    // is already "tomorrow" in UTC
    process.env.TZ = "Etc/GMT+12";
    const lateLocalEvening = new Date(2026, 0, 1, 23, 30); // = 2026-01-02 11:30 UTC
    expect(lateLocalEvening.toISOString().startsWith("2026-01-02")).toBe(true);
    expect(localDateKey(lateLocalEvening)).toBe("2026-01-01");

    // UTC+14: local midnight leads UTC, so an early local morning is still
    // "yesterday" in UTC
    process.env.TZ = "Pacific/Kiritimati";
    const earlyLocalMorning = new Date(2026, 0, 1, 0, 30); // = 2025-12-31 10:30 UTC
    expect(earlyLocalMorning.toISOString().startsWith("2025-12-31")).toBe(true);
    expect(localDateKey(earlyLocalMorning)).toBe("2026-01-01");
  });

  it("a Good review late on the local evening is due tomorrow LOCAL (UTC-12)", () => {
    process.env.TZ = "Etc/GMT+12";
    const reviewedAt = new Date(2026, 0, 1, 23, 30); // local Jan 1, UTC Jan 2

    const card = gradeCard(createInitialCard("hoffen"), 4, reviewedAt);

    // interval 1 → tomorrow local = Jan 2. The old UTC formatting produced
    // Jan 3 here (UTC had already rolled over twice).
    expect(card.interval).toBe(1);
    expect(card.due_date).toBe("2026-01-02");
    expect(card.last_reviewed).toBe(reviewedAt.toISOString());
  });

  it("a Good review early on the local morning is due tomorrow LOCAL (UTC+14)", () => {
    process.env.TZ = "Pacific/Kiritimati";
    const reviewedAt = new Date(2026, 0, 1, 0, 30); // local Jan 1, UTC Dec 31

    const card = gradeCard(createInitialCard("hoffen"), 4, reviewedAt);

    // interval 1 → tomorrow local = Jan 2. The old UTC formatting produced
    // Jan 1, making the card due a full day early.
    expect(card.due_date).toBe("2026-01-02");
  });

  it("a card created near local midnight is due tomorrow LOCAL, not a UTC day off (UTC-12)", () => {
    process.env.TZ = "Etc/GMT+12";
    // createInitialCard uses the real clock; with the TZ pinned we assert the
    // invariant that matters: the +1-day grace lands on tomorrow's LOCAL key
    // (local arithmetic + local formatting, never toISOString).
    const card = createInitialCard("hoffen");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(card.due_date).toBe(localDateKey(tomorrow));
    expect(card.due_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("getDueCards compares against the local day so same-day cards stay due", () => {
    process.env.TZ = "Etc/GMT+12";
    const dueToday = { ...createInitialCard("hoffen"), due_date: "2026-01-01" };
    const dueTomorrow = { ...createInitialCard("helfen"), due_date: "2026-01-02" };

    const due = getDueCards({ hoffen: dueToday, helfen: dueTomorrow }, "2026-01-01");
    expect(due.map((c) => c.word_id)).toEqual(["hoffen"]);
  });
});
