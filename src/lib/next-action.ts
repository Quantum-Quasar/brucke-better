import { getDailyReviewBudget } from "./review-decks";
import { getDueCards, localDateKey } from "./srs";
import type { LessonProgress, SRSCard, TrailGate } from "./types";

export const DEFAULT_REVIEW_PRIORITY_THRESHOLD = 5;
export const DEFAULT_MISTAKE_NUDGE_THRESHOLD = 5;

export type NextActionKind = "resume" | "review" | "checkpoint" | "lesson";

export interface NextActionSecondary {
  kind: "lesson" | "review" | "mistakes" | "forward";
  label: string;
  title: string;
  lessonId?: number;
}

export interface NextActionRecommendation {
  kind: NextActionKind;
  eyebrow: string;
  title: string;
  actionLabel: string;
  ariaLabel: string;
  lessonId?: number;
  gateId?: number;
  dueCount: number;
  mistakeCount: number;
  dailyCapReached: boolean;
  secondary?: NextActionSecondary;
}

export interface NextActionInput {
  nextLesson: { id: number; title: string } | null;
  forwardLesson?: { id: number; title: string } | null;
  checkpoint?: Pick<TrailGate, "id" | "title"> | null;
  completedCount: number;
  lessonProgress: Readonly<Record<number, LessonProgress>>;
  missedIds: readonly number[];
  requiredIds: ReadonlySet<number>;
  srsCards: Readonly<Record<string, SRSCard>>;
  dailyMinutes: number;
  mistakeCount?: number;
  today?: string;
  reviewThreshold?: number;
  mistakeThreshold?: number;
}

/**
 * Unified "What's next" decision engine combining in-progress lessons,
 * FSRS due reviews (respecting the learner's daily review cap), checkpoint
 * gates, unresolved mistakes, and the next trail lesson.
 */
export function resolveNextAction(input: NextActionInput): NextActionRecommendation | null {
  const {
    nextLesson,
    forwardLesson = null,
    checkpoint = null,
    completedCount,
    lessonProgress,
    missedIds,
    requiredIds,
    srsCards,
    dailyMinutes,
    mistakeCount = 0,
    today = localDateKey(),
    reviewThreshold = DEFAULT_REVIEW_PRIORITY_THRESHOLD,
    mistakeThreshold = DEFAULT_MISTAKE_NUDGE_THRESHOLD,
  } = input;

  const dueCards = getDueCards(srsCards as Record<string, SRSCard>, today);
  const dueCount = dueCards.length;
  const budget = getDailyReviewBudget(dailyMinutes, srsCards, today);
  const dailyCapReached = budget.capReached;

  const hasInProgressLesson = Boolean(nextLesson && lessonProgress[nextLesson.id]);

  // 1. Always finish an in-progress lesson first (including unfinished retries).
  if (nextLesson && hasInProgressLesson) {
    const progress = lessonProgress[nextLesson.id];
    const hasRetries = Boolean(progress?.inRetryPhase || (progress?.retryExerciseIds?.length ?? 0) > 0);
    return {
      kind: "resume",
      eyebrow: hasRetries ? "Finish retries" : "In progress",
      title: nextLesson.title,
      actionLabel: "Resume",
      ariaLabel: `Resume next recommended lesson: ${nextLesson.title}`,
      lessonId: nextLesson.id,
      dueCount,
      mistakeCount,
      dailyCapReached,
      secondary:
        dueCount > 0 && !dailyCapReached
          ? {
              kind: "review",
              label: `Review (${dueCount})`,
              title: `Review ${dueCount} due ${dueCount === 1 ? "card" : "cards"}`,
            }
          : undefined,
    };
  }

  // 2. Clear due FSRS reviews when above threshold and daily review cap isn't reached.
  if (dueCount >= reviewThreshold && !dailyCapReached) {
    const batchCount = Math.min(dueCount, budget.remainingToday);
    const title = `${batchCount} ${batchCount === 1 ? "card" : "cards"} ready for review`;
    return {
      kind: "review",
      eyebrow: "Due review",
      title,
      actionLabel: "Review",
      ariaLabel: `Review ${batchCount} due ${batchCount === 1 ? "card" : "cards"}`,
      dueCount,
      mistakeCount,
      dailyCapReached,
      secondary: nextLesson
        ? {
            kind: "lesson",
            label: "Skip to lesson",
            title: `Skip review for now and open ${nextLesson.title}`,
            lessonId: nextLesson.id,
          }
        : undefined,
    };
  }

  // 3. Open an unlocked checkpoint gate blocking the next stretch.
  if (!nextLesson && checkpoint) {
    return {
      kind: "checkpoint",
      eyebrow: "Checkpoint unlocked",
      title: checkpoint.title,
      actionLabel: "Open checkpoint",
      ariaLabel: `Open checkpoint next recommended checkpoint: ${checkpoint.title}`,
      gateId: checkpoint.id,
      dueCount,
      mistakeCount,
      dailyCapReached,
    };
  }

  // 4. Start or continue the next trail lesson.
  if (!nextLesson) return null;

  const missed = missedIds.includes(nextLesson.id);
  const required = requiredIds.has(nextLesson.id);
  const actionLabel = completedCount > 0 ? "Continue" : "Start";
  const eyebrow = missed
    ? "Pick up a missed lesson"
    : required
      ? "Required grammar"
      : dailyCapReached && dueCount > 0
        ? "Daily review goal met · Up next"
        : "Up next";

  let secondary: NextActionSecondary | undefined;
  if (missed && forwardLesson) {
    secondary = {
      kind: "forward",
      label: "Continue ahead",
      title: `Keep earlier lessons skipped and open ${forwardLesson.title}`,
      lessonId: forwardLesson.id,
    };
  } else if (dueCount > 0 && !dailyCapReached) {
    secondary = {
      kind: "review",
      label: `Review (${dueCount})`,
      title: `Review ${dueCount} due ${dueCount === 1 ? "card" : "cards"}`,
    };
  } else if (mistakeCount >= mistakeThreshold) {
    secondary = {
      kind: "mistakes",
      label: `Mistakes (${mistakeCount})`,
      title: `Revisit ${mistakeCount} unresolved mistakes`,
    };
  }

  return {
    kind: "lesson",
    eyebrow,
    title: nextLesson.title,
    actionLabel,
    ariaLabel: `${actionLabel} next recommended lesson: ${nextLesson.title}`,
    lessonId: nextLesson.id,
    dueCount,
    mistakeCount,
    dailyCapReached,
    secondary,
  };
}
