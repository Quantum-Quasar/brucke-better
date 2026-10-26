// Pure helpers for building review decks: what counts as "learned", which words
// came from the lessons you actually finished, how to scope/size a session, and
// the declarative DECK_CAPABILITIES registry where each deck declares which
// ReviewModes it supports.

import type { CompendiumData, MasteryState, ReviewMode, SRSCard, WordEntity } from "./types";
import { shuffleArray } from "./review-modes";
import { getAtlasFamilies, getAtlasFamily } from "./atlas-families";

/** Sentinel select value meaning "every atlas family". */
export const ALL_FAMILIES_ID = "all";

/**
 * Word ids behind a shift-family deck. The atlas — not `data.shifts` — is the
 * source of truth, because it also carries the virtual `unshifted` family that
 * wraps every dictionary word outside the authored families. Reading
 * `data.shifts[shiftId]` made that family's deck permanently empty.
 */
export function getAtlasFamilyWordIds(data: CompendiumData, familyId: string): string[] {
  if (familyId === ALL_FAMILIES_ID) {
    return Array.from(new Set(getAtlasFamilies(data).flatMap((f) => f.word_ids)));
  }
  return Array.from(new Set(getAtlasFamily(data, familyId)?.word_ids ?? []));
}

/** Which words a scoped deck (shift family / domain) should include. */
export type LearnedFilter = "all" | "learned" | "new";

/** Session size choices; 0 = the whole deck. */
export const SESSION_SIZES = [10, 20, 50, 0] as const;
export type SessionSize = (typeof SESSION_SIZES)[number];

export type ReviewDeckType =
  | "due"
  | "shift"
  | "weakest"
  | "recent"
  | "compounds"
  | "sentences"
  | "articles"
  | "domain"
  | "everything";

export interface DeckCapabilitySpec {
  id: ReviewDeckType;
  label: string;
  /** Which review modes this deck supports. Single-mode decks skip the style picker modal. */
  supportedModes: ReviewMode[];
  defaultMode: ReviewMode;
}

export const ALL_REVIEW_MODES: ReviewMode[] = ["flashcard", "mcq", "tiles", "typing"];

export const DECK_CAPABILITIES: Record<ReviewDeckType, DeckCapabilitySpec> = {
  due: {
    id: "due",
    label: "due cards",
    supportedModes: ALL_REVIEW_MODES,
    defaultMode: "flashcard",
  },
  shift: {
    id: "shift",
    label: "shift family",
    supportedModes: ALL_REVIEW_MODES,
    defaultMode: "flashcard",
  },
  domain: {
    id: "domain",
    label: "domain",
    supportedModes: ALL_REVIEW_MODES,
    defaultMode: "flashcard",
  },
  weakest: {
    id: "weakest",
    label: "weakest words",
    supportedModes: ALL_REVIEW_MODES,
    defaultMode: "flashcard",
  },
  recent: {
    id: "recent",
    label: "recent lessons",
    supportedModes: ALL_REVIEW_MODES,
    defaultMode: "flashcard",
  },
  compounds: {
    id: "compounds",
    label: "compounds & traps",
    supportedModes: ALL_REVIEW_MODES,
    defaultMode: "flashcard",
  },
  sentences: {
    id: "sentences",
    label: "sentence patterns",
    supportedModes: ALL_REVIEW_MODES,
    defaultMode: "tiles",
  },
  articles: {
    id: "articles",
    label: "article & gender drill",
    supportedModes: ["mcq"],
    defaultMode: "mcq",
  },
  everything: {
    id: "everything",
    label: "everything",
    supportedModes: ALL_REVIEW_MODES,
    defaultMode: "flashcard",
  },
};

/**
 * Resolves the effective ReviewMode for a given card entity inside a deck.
 * If the card entity declares its own `supportedModes` (e.g. an Article card
 * which only supports `["mcq"]`), it automatically enforces a supported mode
 * even inside mixed decks like "Everything" or "Due Today".
 */
export function resolveCardReviewMode(
  entity: WordEntity | undefined,
  preferredMode: ReviewMode,
  deckId?: ReviewDeckType | null
): ReviewMode {
  const deckModes = deckId ? DECK_CAPABILITIES[deckId]?.supportedModes ?? ALL_REVIEW_MODES : ALL_REVIEW_MODES;
  const entityModes = entity?.supportedModes && entity.supportedModes.length > 0 ? entity.supportedModes : deckModes;
  const allowed = entityModes.filter((m) => deckModes.includes(m));
  const pool = allowed.length > 0 ? allowed : entityModes;
  if (pool.includes(preferredMode)) return preferredMode;
  return pool[0] ?? "mcq";
}

/**
 * A word is "learned" once a lesson showed it or you reviewed it.
 * `explored` (e.g. peeked at in the atlas) does not count as learned.
 */
export function isWordLearned(
  wordId: string,
  wordMastery: Record<string, MasteryState>,
  srsCards: Record<string, SRSCard>
): boolean {
  const m = wordMastery[wordId];
  return m === "encountered" || m === "mastered" || Boolean(srsCards[wordId]?.last_reviewed);
}

export function filterByLearned<T extends { id: string }>(
  words: T[],
  filter: LearnedFilter,
  wordMastery: Record<string, MasteryState>,
  srsCards: Record<string, SRSCard>
): T[] {
  if (filter === "all") return words;
  return words.filter((w) => isWordLearned(w.id, wordMastery, srsCards) === (filter === "learned"));
}

/**
 * Word ids taught by the most recently completed lessons (newest first).
 * `completedLessons` is in completion order, so the tail is the most recent.
 */
export function getRecentLessonWordIds(
  lessons: ReadonlyArray<{ id: number; word_ids: string[] }>,
  completedLessons: number[],
  lessonCount = 3,
  validIds?: Set<string>
): string[] {
  const byId = new Map(lessons.map((l) => [l.id, l]));
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const lessonId of completedLessons.slice(-lessonCount).reverse()) {
    for (const wid of byId.get(lessonId)?.word_ids ?? []) {
      if (seen.has(wid) || (validIds && !validIds.has(wid))) continue;
      seen.add(wid);
      ids.push(wid);
    }
  }
  return ids;
}

/** Most overdue first, then lowest ease (hardest) first. */
export function sortDueCards(cards: SRSCard[]): SRSCard[] {
  return [...cards].sort(
    (a, b) => a.due_date.localeCompare(b.due_date) || a.ease_factor - b.ease_factor
  );
}

/**
 * Words that are actually hard: lapses first, then "I guessed" answers,
 * then low ease. Includes guessed-but-never-lapsed words, which the plain
 * lapses filter missed.
 */
export function rankWeakestCards(cards: Record<string, SRSCard>, limit = 15): SRSCard[] {
  return Object.values(cards)
    .filter((c) => c.lapses > 0 || (c.guessed ?? 0) > 0)
    .sort(
      (a, b) =>
        b.lapses - a.lapses ||
        (b.guessed ?? 0) - (a.guessed ?? 0) ||
        a.ease_factor - b.ease_factor
    )
    .slice(0, limit);
}

/** Shuffle (optional) and cap a deck to the chosen session size. */
export function prepareSession<T>(cards: T[], size: SessionSize, shuffle: boolean): T[] {
  const ordered = shuffle ? shuffleArray(cards) : cards;
  return size > 0 ? ordered.slice(0, size) : ordered;
}
