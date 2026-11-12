"use client";

import { useEffect } from "react";
import { matchingPairForKey } from "@/lib/matching";
import type { ClassicExerciseController } from "./classic-exercise-types";

export function useClassicKeyboard(controller: ClassicExerciseController, onDeselect: () => void) {
  useEffect(() => {
    const {
      exercise, settings, inputRef, showErrorSheet, showSuccessSheet, status,
      setIsCapsLock, resetCurrentExercise, handleVerify, displayOptions,
      handleShiftOptionSelect, sanitizedTileOptions, sanitizedWordBank, selectedIndices,
      unpickTilePosition, pickTileIndex, selectedEnglish, matchedPairs,
      handleSelectEnglish, handleSelectGerman, displayGermanPairs,
    } = controller;
    const handleKeyDown = (event: KeyboardEvent) => {
      setIsCapsLock(event.getModifierState("CapsLock"));
      if (event.isComposing || event.ctrlKey || event.metaKey || event.altKey) return;
      if (settings.quickRestart === "esc" && event.key === "Escape") {
        event.preventDefault();
        resetCurrentExercise();
        return;
      }
      if (showErrorSheet || showSuccessSheet) return;
      const active = document.activeElement;
      if (event.key === "Enter") {
        if (active instanceof HTMLElement && (
          active.tagName === "BUTTON" || active.tagName === "A" || active.getAttribute("role") === "button"
        )) return;
        event.preventDefault();
        handleVerify();
        return;
      }
      if (active === inputRef.current) {
        if (settings.confidenceMode === "on" && event.key === "Backspace") event.preventDefault();
        return;
      }
      if (active instanceof HTMLElement && (active.isContentEditable || active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT")) return;
      if (status !== "idle") return;
      const number = /^[1-9]$/.test(event.key) ? Number(event.key) : 0;
      if (exercise.type === "shift_select" && number && number <= displayOptions.length) {
        event.preventDefault();
        handleShiftOptionSelect(displayOptions[number - 1]);
      } else if (exercise.type === "morpheme_tiles" || exercise.type === "syntax_builder") {
        const options = exercise.type === "morpheme_tiles" ? sanitizedTileOptions : sanitizedWordBank;
        if (event.key === "Backspace") {
          event.preventDefault();
          if (selectedIndices.length) unpickTilePosition(selectedIndices.length - 1);
        } else if (number && number <= options.length) {
          event.preventDefault();
          if (!selectedIndices.includes(number - 1)) pickTileIndex(number - 1);
        }
      } else if (exercise.type === "matching_pairs" && exercise.matching_pairs) {
        if (event.key === "Escape") {
          event.preventDefault();
          onDeselect();
        } else if (number) {
          const chosen = matchingPairForKey(selectedEnglish ? displayGermanPairs : exercise.matching_pairs, matchedPairs, number);
          if (!chosen) return;
          event.preventDefault();
          if (selectedEnglish) handleSelectGerman(chosen.german, chosen.id, chosen.english);
          else handleSelectEnglish(chosen.english);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [controller, onDeselect]);
}
