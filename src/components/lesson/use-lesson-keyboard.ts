"use client";

import { useEffect } from "react";
import type { LessonSession } from "./lesson-session-types";
import { hasBlockingKeyboardDialog } from "@/lib/use-dialog-focus";

type KeyboardOptions = Pick<LessonSession, "currentSegment" | "retryQueue" | "isLessonFinished" | "goToNextLesson" | "preview" | "markSegmentDone" | "startPractice" | "handleCompleteAll" | "setCurrentSegment">;
export function useLessonKeyboard({ currentSegment, retryQueue, isLessonFinished, goToNextLesson, preview, markSegmentDone, startPractice, handleCompleteAll, setCurrentSegment }: KeyboardOptions) {
  // Global keyboard navigation across lesson reading segments (Hook, Pattern, Table, Summary)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing || e.ctrlKey || e.metaKey || e.altKey || hasBlockingKeyboardDialog()) return;
      const active = document.activeElement as HTMLElement | null;
      const isInput =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        Boolean(active?.isContentEditable);

      if (isInput) return;

      // A focused button/link keeps its native Enter/Space activation. Without
      // this guard the summary shortcut called preventDefault() on the focused
      // "mark lesson finished" button and navigated to the next lesson instead.
      const isActivationKey = e.key === "Enter" || e.key === " " || e.code === "Space";
      const isInteractive =
        active instanceof HTMLButtonElement ||
        active instanceof HTMLAnchorElement ||
        active instanceof HTMLSelectElement ||
        active?.tagName === "SUMMARY" ||
        active?.getAttribute("role") === "button" ||
        active?.getAttribute("role") === "link";
      if (isInteractive && isActivationKey) return;

      if (currentSegment === "hook") {
        if (e.key === "Enter" || e.key === " " || e.code === "Space") {
          e.preventDefault();
          markSegmentDone("hook", "pattern");
        }
      } else if (currentSegment === "pattern") {
        if (e.key === "Enter" || e.key === " " || e.code === "Space") {
          e.preventDefault();
          markSegmentDone("pattern", "table");
        } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSegment("hook");
        }
      } else if (currentSegment === "table") {
        if (e.key === "Enter" || e.key === " " || e.code === "Space") {
          e.preventDefault();
          startPractice();
        } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSegment("pattern");
        }
      } else if (currentSegment === "summary") {
        if (!preview && (retryQueue.length === 0 || isLessonFinished)) {
          if (e.key === "Enter" || e.key === " " || e.code === "Space") {
            e.preventDefault();
            handleCompleteAll();
            goToNextLesson();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSegment, retryQueue.length, isLessonFinished, goToNextLesson, preview, markSegmentDone, startPractice, handleCompleteAll, setCurrentSegment]);
}
