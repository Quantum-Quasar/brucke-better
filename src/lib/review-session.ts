"use client";

// In-progress review sessions survive tab switches. The session lives in
// sessionStorage because it is per-tab and disposable; progress/SRS data stays
// in the main durable store.

import type { MasteryState, ReviewMode, SRSCard } from "@/lib/types";
import type { ReviewSnapshot } from "@/lib/store";
import type { LearnedFilter, ReviewDeckType, SessionSize } from "@/lib/review-decks";

const STORAGE_PREFIX = "brucke_review_session_v1:";
const MAX_CARDS = 2000;
const MAX_TEXT = 200;

const DECK_IDS: ReadonlySet<string> = new Set([
  "due",
  "shift",
  "weakest",
  "recent",
  "compounds",
  "sentences",
  "articles",
  "domain",
  "everything",
]);
const LEARNED_FILTERS: ReadonlySet<string> = new Set(["all", "learned", "new"]);
const SESSION_SIZES: ReadonlySet<number> = new Set([10, 20, 50, 0]);
const REVIEW_MODES: ReadonlySet<string> = new Set(["flashcard", "mcq", "tiles", "typing"]);
const MASTERY_STATES: ReadonlySet<string> = new Set([
  "unexplored",
  "explored",
  "encountered",
  "mastered",
]);
const GRADES: ReadonlySet<number> = new Set([1, 3, 4, 5]);

export interface ReviewSessionSnapshot {
  activeDeck: ReviewDeckType;
  selectedShiftId: string;
  selectedDomainId: string;
  learnedFilter: LearnedFilter;
  sessionSize: SessionSize;
  shuffleSession: boolean;
  sessionCards: SRSCard[];
  sessionEpoch: number;
  currentIndex: number;
  isRevealed: boolean;
  sessionStats: {
    reviewed: number;
    correct: number;
    again: number;
    hard: number;
    easy: number;
  };
  sessionGrades: Array<1 | 3 | 4 | 5 | null>;
  preGradeSnapshots: Record<string, ReviewSnapshot>;
  reviewMode: ReviewMode;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function finite(value: unknown, min: number, max: number): number | null {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : null;
}

function integer(value: unknown, min: number, max: number, fallback: number): number {
  const parsed = finite(value, min, max);
  return parsed === null ? fallback : Math.floor(parsed);
}

function safeText(value: unknown): string {
  return typeof value === "string" ? value.slice(0, MAX_TEXT) : "";
}

function isSafeKey(key: string): boolean {
  return key.length > 0 && key.length <= MAX_TEXT && key !== "__proto__" && key !== "constructor" && key !== "prototype";
}

function parseCard(raw: unknown): SRSCard | null {
  if (!isRecord(raw)) return null;
  const wordId = safeText(raw.word_id);
  if (!wordId) return null;
  const interval = finite(raw.interval, 0, 36500);
  const repetitions = finite(raw.repetitions, 0, 10000);
  const ease = finite(raw.ease_factor, 1.3, 5);
  const dueDate = typeof raw.due_date === "string" && /^\d{4}-\d{2}-\d{2}/.test(raw.due_date) ? raw.due_date : null;
  const lastReviewed =
    raw.last_reviewed === null || typeof raw.last_reviewed === "string" ? raw.last_reviewed : null;
  if (interval === null || repetitions === null || ease === null || dueDate === null) return null;
  const card: SRSCard = {
    word_id: wordId,
    interval: Math.floor(interval),
    repetitions: Math.floor(repetitions),
    ease_factor: ease,
    due_date: dueDate,
    lapses: integer(raw.lapses, 0, 10000, 0),
    last_reviewed: lastReviewed,
  };
  const guessed = finite(raw.guessed, 0, 1_000_000);
  if (guessed !== null) card.guessed = Math.floor(guessed);
  return card;
}

function parseSnapshot(raw: unknown): ReviewSnapshot | null {
  if (!isRecord(raw)) return null;
  const card = parseCard(raw.card);
  if (!card) return null;
  const mastery =
    raw.mastery === null
      ? null
      : typeof raw.mastery === "string" && MASTERY_STATES.has(raw.mastery)
      ? (raw.mastery as MasteryState)
      : null;
  return { card, mastery };
}

/** Validate a raw sessionStorage payload; a bad snapshot is discarded whole. */
export function parseReviewSession(raw: string | null): ReviewSessionSnapshot | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(parsed)) return null;
  const activeDeck = typeof parsed.activeDeck === "string" && DECK_IDS.has(parsed.activeDeck)
    ? (parsed.activeDeck as ReviewDeckType)
    : null;
  if (!activeDeck) return null;
  if (!Array.isArray(parsed.sessionCards) || parsed.sessionCards.length === 0) return null;
  if (parsed.sessionCards.length > MAX_CARDS) return null;
  const sessionCards: SRSCard[] = [];
  for (const rawCard of parsed.sessionCards) {
    const card = parseCard(rawCard);
    if (!card) return null;
    sessionCards.push(card);
  }

  const currentIndex = integer(parsed.currentIndex, 0, sessionCards.length - 1, 0);
  const stats = isRecord(parsed.sessionStats) ? parsed.sessionStats : {};
  const rawGrades = Array.isArray(parsed.sessionGrades) ? parsed.sessionGrades : [];
  const sessionGrades = sessionCards.map((_, index) => {
    const grade = rawGrades[index];
    return typeof grade === "number" && GRADES.has(grade) ? (grade as 1 | 3 | 4 | 5) : null;
  });

  const preGradeSnapshots: Record<string, ReviewSnapshot> = {};
  if (isRecord(parsed.preGradeSnapshots)) {
    for (const [wordId, rawSnapshot] of Object.entries(parsed.preGradeSnapshots)) {
      if (!isSafeKey(wordId)) continue;
      const snapshot = parseSnapshot(rawSnapshot);
      if (snapshot) preGradeSnapshots[wordId] = snapshot;
    }
  }

  return {
    activeDeck,
    selectedShiftId: safeText(parsed.selectedShiftId),
    selectedDomainId: safeText(parsed.selectedDomainId),
    learnedFilter:
      typeof parsed.learnedFilter === "string" && LEARNED_FILTERS.has(parsed.learnedFilter)
        ? (parsed.learnedFilter as LearnedFilter)
        : "all",
    sessionSize:
      typeof parsed.sessionSize === "number" && SESSION_SIZES.has(parsed.sessionSize)
        ? (parsed.sessionSize as SessionSize)
        : 20,
    shuffleSession: typeof parsed.shuffleSession === "boolean" ? parsed.shuffleSession : true,
    sessionCards,
    sessionEpoch: integer(parsed.sessionEpoch, 0, 1_000_000, 0),
    currentIndex,
    isRevealed: Boolean(parsed.isRevealed),
    sessionStats: {
      reviewed: integer(stats.reviewed, 0, 100000, 0),
      correct: integer(stats.correct, 0, 100000, 0),
      again: integer(stats.again, 0, 100000, 0),
      hard: integer(stats.hard, 0, 100000, 0),
      easy: integer(stats.easy, 0, 100000, 0),
    },
    sessionGrades,
    preGradeSnapshots,
    reviewMode:
      typeof parsed.reviewMode === "string" && REVIEW_MODES.has(parsed.reviewMode)
        ? (parsed.reviewMode as ReviewMode)
        : "flashcard",
  };
}

function storageKey(languageId: string): string {
  return `${STORAGE_PREFIX}${languageId}`;
}

export function readReviewSession(languageId: string): ReviewSessionSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    return parseReviewSession(sessionStorage.getItem(storageKey(languageId)));
  } catch {
    return null;
  }
}

export function writeReviewSession(languageId: string, snapshot: ReviewSessionSnapshot): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(storageKey(languageId), JSON.stringify(snapshot));
  } catch {
    // ignore blocked/full storage
  }
}

export function clearReviewSession(languageId: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(storageKey(languageId));
  } catch {
    // ignore
  }
}
