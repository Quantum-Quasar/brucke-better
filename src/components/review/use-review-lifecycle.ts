"use client";

import { useEffect, type RefObject } from "react";
import { clearReviewSession, writeReviewSession, type ReviewSessionSnapshot } from "@/lib/review-session";
import type { ReviewDeckType } from "@/lib/review-decks";

type Session = Omit<ReviewSessionSnapshot, "activeDeck"> & { activeDeck: ReviewDeckType | null };
export function useReviewLifecycle(languageId: string, snapshot: Session, sessionRef: RefObject<HTMLDivElement | null>) {
  const { activeDeck, progressResetAt, progressResetActor, selectedShiftId, selectedDomainId,
    learnedFilter, sessionSize, shuffleSession, sessionCards, sessionEpoch, currentIndex,
    isRevealed, sessionStats, sessionGrades, preGradeSnapshots, reviewMode } = snapshot;
  const active = activeDeck !== null;
  useEffect(() => {
    if (!active) return;
    document.documentElement.dataset.reviewSession = "true";
    return () => { delete document.documentElement.dataset.reviewSession; };
  }, [active]);
  useEffect(() => {
    if (!activeDeck) return;
    const id = window.requestAnimationFrame(() => sessionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    return () => window.cancelAnimationFrame(id);
  }, [activeDeck, sessionRef]);
  useEffect(() => {
    if (!activeDeck) clearReviewSession(languageId);
    else writeReviewSession(languageId, {
      activeDeck, progressResetAt, progressResetActor, selectedShiftId, selectedDomainId,
      learnedFilter, sessionSize, shuffleSession, sessionCards, sessionEpoch, currentIndex,
      isRevealed, sessionStats, sessionGrades, preGradeSnapshots, reviewMode,
    });
  }, [languageId, activeDeck, progressResetAt, progressResetActor, selectedShiftId,
    selectedDomainId, learnedFilter, sessionSize, shuffleSession, sessionCards, sessionEpoch,
    currentIndex, isRevealed, sessionStats, sessionGrades, preGradeSnapshots, reviewMode]);
}
