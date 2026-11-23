// FSRS-4.5 spaced repetition scheduler with word-level isolation,
// backwards-compatible SM-2 fields, deterministic interval fuzz, and 21-day mastery.

import type { SRSCard } from "./types";

export type ReviewGrade = 1 | 3 | 4 | 5; // 1 = Again, 3 = Hard, 4 = Good, 5 = Easy

/** FSRS-4.5 default 17 parameters (w0..w16). */
export const FSRS_WEIGHTS = [
  0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474,
  0.1367, 1.0461, 2.1072, 0.0793, 0.3246, 1.587, 0.2272, 2.8755,
] as const;

const FSRS_DECAY = -0.5;
const FSRS_FACTOR = 19 / 81; // Ensures R(S, S) = 0.9

export const MASTERY_INTERVAL_DAYS = 21;
export const FUZZ_MIN_INTERVAL_DAYS = 7;
export const MAX_STABILITY_DAYS = 36500;

/** Calendar-day key (YYYY-MM-DD) in the machine's local timezone.
 * The SRS queue is keyed by local days — never mix this with UTC getters
 * like toISOString, which rolls over to the next day a few hours before
 * local midnight (west of UTC) and lags a day behind (east of UTC). */
export function localDateKey(date = new Date()): string {
  const yyyy = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${yyyy}-${m < 10 ? "0" : ""}${m}-${d < 10 ? "0" : ""}${d}`;
}

export const LEECH_LAPSES = 5;

export function needsRelearn(card: SRSCard): boolean {
  return card.relearnRequired === true || card.lapses - (card.relearnLapses ?? 0) >= LEECH_LAPSES;
}

export function isReviewable(card: SRSCard | undefined, today = localDateKey()): boolean {
  return !card || (!card.suspended && !(card.buriedUntil && card.buriedUntil >= today) && !needsRelearn(card));
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

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function gradeToFsrsRating(grade: ReviewGrade): 1 | 2 | 3 | 4 {
  switch (grade) {
    case 1: return 1; // Again
    case 3: return 2; // Hard
    case 4: return 3; // Good
    case 5: return 4; // Easy
  }
}

function initialDifficulty(rating: 1 | 2 | 3 | 4): number {
  return clamp(FSRS_WEIGHTS[4] - (rating - 3) * FSRS_WEIGHTS[5], 1, 10);
}

function nextDifficulty(d: number, rating: 1 | 2 | 3 | 4): number {
  const d0Good = initialDifficulty(3);
  const delta = d - FSRS_WEIGHTS[6] * (rating - 3);
  return clamp(FSRS_WEIGHTS[7] * d0Good + (1 - FSRS_WEIGHTS[7]) * delta, 1, 10);
}

export function retrievability(elapsedDays: number, stability: number): number {
  if (stability <= 0) return 0;
  if (elapsedDays <= 0) return 1;
  return Math.pow(1 + (FSRS_FACTOR * elapsedDays) / stability, FSRS_DECAY);
}

function nextRecallStability(d: number, s: number, r: number, rating: 2 | 3 | 4): number {
  const hardPenalty = rating === 2 ? FSRS_WEIGHTS[15] : 1;
  const easyBonus = rating === 4 ? FSRS_WEIGHTS[16] : 1;
  const growth =
    Math.exp(FSRS_WEIGHTS[8]) *
    (11 - d) *
    Math.pow(s, -FSRS_WEIGHTS[9]) *
    (Math.exp(FSRS_WEIGHTS[10] * (1 - r)) - 1) *
    hardPenalty *
    easyBonus;
  return clamp(s * (growth + 1), 0.1, MAX_STABILITY_DAYS);
}

function nextForgetStability(d: number, s: number, r: number): number {
  const sf =
    FSRS_WEIGHTS[11] *
    Math.pow(d, -FSRS_WEIGHTS[12]) *
    (Math.pow(s + 1, FSRS_WEIGHTS[13]) - 1) *
    Math.exp(FSRS_WEIGHTS[14] * (1 - r));
  return clamp(Math.min(s, sf), 0.1, MAX_STABILITY_DAYS);
}

/** Deterministic ±5% interval fuzz for intervals >= 7 days so cards learned in
 * the same lesson spread across neighboring days instead of piling up. */
export function applyIntervalFuzz(interval: number, seedKey: string): number {
  if (!Number.isFinite(interval)) {
    return 1;
  }
  if (interval < FUZZ_MIN_INTERVAL_DAYS) {
    return Math.max(1, Math.round(interval));
  }
  // FNV-1a 32-bit hash -> deterministic offset in [-maxFuzz, +maxFuzz]
  let hash = 2166136261;
  for (let i = 0; i < seedKey.length; i++) {
    hash ^= seedKey.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const normalized = ((hash >>> 0) / 0xffffffff) * 2 - 1; // [-1, 1]
  const maxFuzz = Math.max(1, Math.floor(interval * 0.05));
  const delta = Math.round(normalized * maxFuzz);
  return Math.max(FUZZ_MIN_INTERVAL_DAYS, interval + delta);
}

function deriveLegacyDifficulty(easeFactor: number): number {
  // Map legacy SM-2 ease_factor [1.3..3.5] into FSRS difficulty [1..10]
  return clamp(10 - ((easeFactor - 1.3) / 2.2) * 9, 1, 10);
}

export function gradeCard(card: SRSCard, grade: ReviewGrade, now = new Date()): SRSCard {
  let { interval, repetitions, ease_factor, lapses } = card;
  const rating = gradeToFsrsRating(grade);

  const hasPriorFsrs =
    typeof card.stability === "number" &&
    Number.isFinite(card.stability) &&
    card.stability > 0 &&
    typeof card.difficulty === "number" &&
    Number.isFinite(card.difficulty);

  let stability: number;
  let difficulty: number;
  let prevS = 0;
  let prevD: number = FSRS_WEIGHTS[4];
  let r = 1;
  const isFirstExposure = repetitions === 0 && !hasPriorFsrs;

  if (isFirstExposure) {
    // First graded exposure: initialize FSRS stability & difficulty
    stability = clamp(FSRS_WEIGHTS[rating - 1], 0.1, MAX_STABILITY_DAYS);
    difficulty = initialDifficulty(rating);
  } else {
    prevS = clamp(
      hasPriorFsrs
        ? (card.stability as number)
        : Math.max(0.4, interval > 0 ? interval : FSRS_WEIGHTS[2]),
      0.1,
      MAX_STABILITY_DAYS
    );
    prevD = clamp(
      hasPriorFsrs
        ? (card.difficulty as number)
        : deriveLegacyDifficulty(Number.isFinite(ease_factor) ? ease_factor : 2.5),
      1,
      10
    );

    let elapsedDays = Math.max(1, interval);
    if (card.last_reviewed) {
      const parsed = Date.parse(card.last_reviewed);
      if (Number.isFinite(parsed)) {
        const actual = (now.getTime() - parsed) / 86_400_000;
        if (actual >= 0) {
          elapsedDays = actual;
        }
      }
    }

    r = retrievability(elapsedDays, prevS);

    // Per FSRS-4.5 spec, compute next stability using prevD before updating difficulty.
    if (rating === 1) {
      stability = nextForgetStability(prevD, prevS, r);
    } else {
      stability = nextRecallStability(prevD, prevS, r, rating);
    }
    difficulty = nextDifficulty(prevD, rating);
  }

  if (grade < 3) {
    // Failure (Again)
    repetitions = 0;
    interval = 1;
    lapses += 1;
  } else {
    // Success (Hard = 3, Good = 4, Easy = 5)
    if (repetitions === 0) {
      // First learning step: Hard/Good return tomorrow (1 day); Easy jumps ahead.
      interval = grade === 5 ? Math.max(4, Math.round(stability)) : 1;
    } else {
      const fuzzSeed = `${card.word_id}:${repetitions + 1}:${lapses}`;
      const fuzzedForRating = (targetRating: 2 | 3 | 4): number => {
        const s = isFirstExposure
          ? clamp(FSRS_WEIGHTS[targetRating - 1], 0.1, MAX_STABILITY_DAYS)
          : nextRecallStability(prevD, prevS, r, targetRating);
        const raw = clamp(Math.round(s), 1, MAX_STABILITY_DAYS);
        return applyIntervalFuzz(raw, fuzzSeed);
      };

      // Strictly preserve Hard <= Good <= Easy after fuzzing on any card
      const hardInterval = Math.max(1, fuzzedForRating(2));
      const goodInterval = Math.max(hardInterval, repetitions === 1 ? 4 : 2, fuzzedForRating(3));
      const easyInterval = Math.max(goodInterval, repetitions === 1 ? 8 : 4, fuzzedForRating(4));

      if (grade === 3) {
        interval = hardInterval;
      } else if (grade === 4) {
        interval = goodInterval;
      } else {
        interval = easyInterval;
      }
    }
    repetitions += 1;

    // Maintain backwards-compatible SM-2 ease_factor alongside FSRS difficulty
    const diff = 5 - grade;
    ease_factor = ease_factor + (0.1 - diff * (0.08 + diff * 0.02));
    if (ease_factor < 1.3) ease_factor = 1.3;
  }

  // Sanitize fields against NaN and clamp bounds
  if (!Number.isFinite(ease_factor) || ease_factor < 1.3) {
    ease_factor = 1.3;
  }
  if (!Number.isFinite(interval) || interval < 1) {
    interval = 1;
  }
  interval = clamp(Math.round(interval), 1, MAX_STABILITY_DAYS);
  if (!Number.isFinite(stability)) {
    stability = 0.1;
  }
  stability = clamp(stability, 0.1, MAX_STABILITY_DAYS);
  if (!Number.isFinite(difficulty)) {
    difficulty = FSRS_WEIGHTS[4];
  }
  difficulty = clamp(difficulty, 1, 10);

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
    stability: Number(stability.toFixed(2)),
    difficulty: Number(difficulty.toFixed(2)),
  };
}

export function isMastered(card: SRSCard): boolean {
  // Mastery criteria: at least 3 successful consecutive reviews and 21+ day interval
  return card.repetitions >= 3 && card.interval >= MASTERY_INTERVAL_DAYS;
}

export function getDueCards(cards: Record<string, SRSCard>, today = localDateKey()): SRSCard[] {
  // defensive: a null/partial card (truncated store, legacy cookie) must never
  // break the review queue at boot — the store's normaliser drops them, but
  // state can also be seeded by callers/tests
  const out: SRSCard[] = [];
  for (const c of Object.values(cards)) {
    if (c && typeof c.due_date === "string" && c.due_date <= today && isReviewable(c, today)) {
      out.push(c);
    }
  }
  return out;
}
