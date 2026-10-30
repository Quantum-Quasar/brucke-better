// ponytail: standard SM-2 algorithm with word-level isolation

import type { SRSCard, WordEntity } from "./types";

export type ReviewGrade = 1 | 3 | 4 | 5; // 1 = Again, 3 = Hard, 4 = Good, 5 = Easy

/** Calendar-day key (YYYY-MM-DD) in the machine's local timezone.
 * The SM-2 queue is keyed by local days — never mix this with UTC getters
 * like toISOString, which rolls over to the next day a few hours before
 * local midnight (west of UTC) and lags a day behind (east of UTC). */
export function localDateKey(date = new Date()): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function createInitialCard(word_id: string): SRSCard {
  // Meeting a word in a lesson is its first exposure, so — like a first
  // "Good" grade (interval 1) — its earliest scheduled review is tomorrow.
  // This keeps finishing a lesson from dumping its whole word cohort into
  // today's due queue the moment it ends.
  const firstDue = new Date();
  firstDue.setDate(firstDue.getDate() + 1);
  return {
    word_id,
    interval: 0,
    repetitions: 0,
    ease_factor: 2.5,
    due_date: localDateKey(firstDue),
    lapses: 0,
    last_reviewed: null,
  };
}

export function gradeCard(card: SRSCard, grade: ReviewGrade, now = new Date()): SRSCard {
  let { interval, repetitions, ease_factor, lapses } = card;

  if (grade < 3) {
    // Failure (Again)
    repetitions = 0;
    interval = 1;
    lapses += 1;
  } else {
    // Success (Hard, Good, Easy)
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      const base = interval > 0 ? interval : 6;
      interval = Math.max(1, Math.round(base * ease_factor));
    }
    repetitions += 1;

    // SM-2 Ease Factor formula
    ease_factor = ease_factor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (ease_factor < 1.3) ease_factor = 1.3;
  }
  // Sanitize ease_factor and interval against NaN: ensure ease_factor is a finite number >= 1.3, and interval is a finite number >= 1.
  if (!Number.isFinite(ease_factor) || ease_factor < 1.3) {
    ease_factor = 1.3;
  }
  if (!Number.isFinite(interval) || interval < 1) {
    interval = 1;
  }

  // Calculate next due date — local arithmetic + local key, so a review at
  // 23:40 local with interval 1 is due tomorrow local (not the day after)
  const nextDue = new Date(now.getTime());
  nextDue.setDate(nextDue.getDate() + interval);
  const due_date = localDateKey(nextDue);

  return {
    ...card,
    interval,
    repetitions,
    ease_factor: Number(ease_factor.toFixed(2)),
    due_date,
    lapses,
    last_reviewed: now.toISOString(),
  };
}

export function isMastered(card: SRSCard): boolean {
  // Mastery criteria: at least 3 successful consecutive reviews without current lapse
  return card.repetitions >= 3 && card.interval >= 7;
}

export function getDueCards(cards: Record<string, SRSCard>, today = localDateKey()): SRSCard[] {
  // defensive: a null/partial card (truncated store, legacy cookie) must never
  // break the review queue at boot — the store's normaliser drops them, but
  // state can also be seeded by callers/tests
  return Object.values(cards).filter(
    (c) => c && typeof c.due_date === "string" && c.due_date <= today
  );
}

export function getWeakestCards(cards: Record<string, SRSCard>, limit = 15): SRSCard[] {
  return Object.values(cards)
    .filter((c) => c && typeof c.lapses === "number" && c.lapses > 0)
    .sort((a, b) => b.lapses - a.lapses)
    .slice(0, limit);
}

export function getCardsByShift(
  cards: Record<string, SRSCard>,
  words: Record<string, WordEntity>,
  shiftId: string
): SRSCard[] {
  return Object.values(cards).filter((c) => {
    const word = words[c.word_id];
    return word && word.sound_shift_ids.includes(shiftId);
  });
}
