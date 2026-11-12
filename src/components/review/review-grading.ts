import type { Dispatch, SetStateAction, RefObject } from "react";
import { useAppStore } from "@/lib/store";
import { soundEngine } from "@/lib/sound";
import type { ReviewGrade } from "@/lib/srs";
import type { SRSCard } from "@/lib/types";
import type { ReviewSnapshot } from "@/lib/store/types";
import type { ReviewDeckType } from "@/lib/review-decks";
import type { ReviewController } from "./use-review-controller";

export interface ReviewSessionStats {
  reviewed: number;
  correct: number;
  again: number;
  hard: number;
  easy: number;
}

export const EMPTY_SESSION_STATS: ReviewSessionStats = {
  reviewed: 0,
  correct: 0,
  again: 0,
  hard: 0,
  easy: 0,
};

/**
 * Per-card log of the grades applied during this session, indexed by deck
 * position (null = not graded this session). SM-2 grading only moves a card in
 * one direction, so "back" restores the card's pre-session snapshot instead of
 * trying to invert the schedule math.
 */
export type SessionGrades = (ReviewGrade | null)[];

/** A session log with every card ungraded. */
export const blankSessionGrades = (length: number): SessionGrades => Array.from({ length }, () => null);

/** Session stats with one grade subtracted — the mirror of the increment in
 * handleGrade, used when a card is re-graded instead of graded for the first time. */
function undoGradeInStats(stats: ReviewSessionStats, grade: ReviewGrade): ReviewSessionStats {
  return {
    reviewed: Math.max(0, stats.reviewed - 1),
    correct: Math.max(0, stats.correct - (grade >= 3 ? 1 : 0)),
    again: Math.max(0, stats.again - (grade === 1 ? 1 : 0)),
    hard: Math.max(0, stats.hard - (grade === 3 ? 1 : 0)),
    easy: Math.max(0, stats.easy - (grade === 5 ? 1 : 0)),
  };
}
type Setter<T> = Dispatch<SetStateAction<T>>;
interface GradingOptions extends Pick<ReviewController, "currentCard" | "isRevealed" | "settings" | "currentIndex" | "sessionStats" | "wordMastery" | "sessionCards" | "activeDeck"> {
  sessionGrades: SessionGrades;
  srsCards: Record<string, SRSCard>;
  preGradeSnapshots: RefObject<Record<string, ReviewSnapshot>>;
  blankCard: (id: string) => SRSCard;
  restoreSrsCard: (id: string, snapshot: ReviewSnapshot) => void;
  recordReview: (id: string, grade: ReviewGrade) => void;
  setSessionGrades: Setter<SessionGrades>;
  setSessionStats: Setter<ReviewSessionStats>;
  setIsRevealed: Setter<boolean>;
  setInputGuess: Setter<string>;
  setSelectedOption: Setter<string | null>;
  setSelectedTiles: Setter<string[]>;
  setCurrentAutoGrade: Setter<ReviewGrade | null>;
  setCurrentFeedbackNote: Setter<string | null>;
  setCurrentIndex: Setter<number>;
  setCompletedDeck: Setter<ReviewDeckType | null>;
  setSessionComplete: Setter<boolean>;
  setActiveDeck: Setter<ReviewDeckType | null>;
}
export function createReviewGrading(options: GradingOptions) {
  const { currentCard, isRevealed, settings, currentIndex, sessionStats, wordMastery, sessionCards, activeDeck, sessionGrades, srsCards, preGradeSnapshots, blankCard, restoreSrsCard, recordReview, setSessionGrades, setSessionStats, setIsRevealed, setInputGuess, setSelectedOption, setSelectedTiles, setCurrentAutoGrade, setCurrentFeedbackNote, setCurrentIndex, setCompletedDeck, setSessionComplete, setActiveDeck } = options;
  // SM-2 Review Grade Handler
  const handleGrade = (grade: ReviewGrade) => {
    if (!currentCard || !isRevealed) return;

    if (grade === 1) {
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    } else {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    }

    // A card this session already graded has moved away from its pre-session
    // state; undo that first so the new grade schedules from where the session
    // started rather than compounding on top of the previous one.
    const previousGrade = sessionGrades[currentIndex] ?? null;
    if (previousGrade === null && !(currentCard.word_id in preGradeSnapshots.current)) {
      // first grade this session: remember where the card — and the word's
      // mastery entry — started, so "back" can restore them
      preGradeSnapshots.current[currentCard.word_id] = {
        card: srsCards[currentCard.word_id] ?? blankCard(currentCard.word_id),
        mastery: wordMastery[currentCard.word_id] ?? null,
      };
    }

    const stats: ReviewSessionStats = previousGrade === null ? { ...sessionStats } : undoGradeInStats(sessionStats, previousGrade);
    if (previousGrade !== null) {
      const snapshot = preGradeSnapshots.current[currentCard.word_id];
      if (snapshot) restoreSrsCard(currentCard.word_id, snapshot);
    }

    recordReview(currentCard.word_id, grade);
    // Remember the version this grade produced so a later "back" only undoes the
    // card while it is still where this session left it (not clobbering a newer
    // cross-tab grade).
    const gradedSnapshot = preGradeSnapshots.current[currentCard.word_id];
    if (gradedSnapshot) {
      gradedSnapshot.version = useAppStore.getState().progressVersions.srsCards[currentCard.word_id];
    }
    setSessionGrades((prev) => {
      const next = [...prev];
      next[currentIndex] = grade;
      return next;
    });

    stats.reviewed += 1;
    stats.correct += grade >= 3 ? 1 : 0;
    stats.again += grade === 1 ? 1 : 0;
    stats.hard += grade === 3 ? 1 : 0;
    stats.easy += grade === 5 ? 1 : 0;
    setSessionStats(stats);

    setIsRevealed(false);
    setInputGuess("");
    setSelectedOption(null);
    setSelectedTiles([]);
    setCurrentAutoGrade(null);
    setCurrentFeedbackNote(null);

    if (currentIndex + 1 < sessionCards.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCompletedDeck(activeDeck);
      setSessionComplete(true);
      setActiveDeck(null); // Finish session
    }
  };
  /**
   * Step back to the previous card in this session. The card's SM-2 state is
   * restored to what it was before the session graded it, so the learner sees
   * the word un-revealed and can answer again — the re-grade then lands as the
   * card's only graded step this session, not one stacked on the earlier one.
   * The session stats drop the previous grade so a re-graded card is counted once.
   */
  const goBack = () => {
    if (currentIndex <= 0 || sessionCards.length === 0) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);

    // Leaving the current card: undo the grade it may have received this session.
    const leavingGrade = sessionGrades[currentIndex] ?? null;
    if (leavingGrade !== null) {
      const leaving = sessionCards[currentIndex];
      const snapshot = preGradeSnapshots.current[leaving.word_id];
      if (snapshot) restoreSrsCard(leaving.word_id, snapshot);
      setSessionGrades((prev) => {
        const next = [...prev];
        next[currentIndex] = null;
        return next;
      });
      setSessionStats((prev) => undoGradeInStats(prev, leavingGrade));
    }

    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  /** Step forward again after going back (same behaviour as advancing). */
  const goForward = () => {
    if (currentIndex + 1 >= sessionCards.length) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setCurrentIndex((i) => Math.min(sessionCards.length - 1, i + 1));
  };

  const canGoBack = activeDeck !== null && currentIndex > 0;
  const canGoForward = activeDeck !== null && currentIndex < sessionCards.length - 1;
  return { handleGrade, goBack, goForward, canGoBack, canGoForward };
}
