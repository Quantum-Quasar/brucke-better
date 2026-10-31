"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { X, Check } from "lucide-react";
import { ExerciseWidget } from "@/components/lesson/ExerciseWidgets";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { generateMCQOptions, generateWordTiles } from "@/lib/review-modes";
import type { CompendiumData, ShiftFamily, ExerciseItem } from "@/lib/types";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import { useBackDismiss } from "@/lib/use-back-dismiss";

interface BranchDrillModalProps {
  family: ShiftFamily;
  data: CompendiumData;
  isOpen: boolean;
  onClose: () => void;
}

export const BranchDrillModal: React.FC<BranchDrillModalProps> = ({ family, data, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentQuestionFailed, setCurrentQuestionFailed] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  useBackDismiss(isOpen, onClose);

  useDialogFocus({
    open: isOpen,
    containerRef: dialogRef,
    onEscape: onClose,
  });

  // The modal stays mounted between openings (it only returns null while
  // closed), so a fresh open must start a fresh run instead of resuming the
  // previous question index, score or finished screen.
  useEffect(() => {
    if (!isOpen) return;
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setCurrentQuestionFailed(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (isFinished) {
        if (e.key === "Enter" || e.key === " " || e.code === "Space") {
          e.preventDefault();
          onClose();
        } else if (e.key === "r" || e.key === "R") {
          e.preventDefault();
          handleRestart();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFinished, onClose]);

  const exercises: ExerciseItem[] = useMemo(() => {
    const words = family.word_ids
      .map((id) => data.words[id])
      .filter(Boolean)
      .slice(0, 5);

    return words.map((w, idx) => {
      if (idx === 0) {
        return {
          id: `drill_${w.id}_${idx}`,
          type: "shift_select",
          prompt: `Which ${language.name} word shifted from English "${w.english_cognate}" via ${family.symbol}?`,
          english_hint: `${w.english_cognate} (${family.symbol})`,
          shift_hint: family.symbol,
          target_answer: w.target_word,
          options: generateMCQOptions(w, data.wordList, 4),
          explanation: w.etymology_derivation,
        };
      }
      if (idx === 1) {
        const tileData = generateWordTiles(w);
        return {
          id: `drill_${w.id}_${idx}`,
          type: "morpheme_tiles",
          prompt: `Assemble the ${language.name} cognate for "${w.english_cognate}" using the tiles below:`,
          english_hint: `${w.english_cognate} (${family.symbol})`,
          shift_hint: family.symbol,
          target_answer: w.target_word,
          tile_options: tileData.tiles,
          explanation: w.etymology_derivation,
        };
      }
      if (idx === 3) {
        return {
          id: `drill_${w.id}_${idx}`,
          type: "shift_select",
          prompt: `Identify the shifted ${language.name} cognate for "${w.english_cognate}":`,
          english_hint: `${w.english_cognate} (${family.symbol})`,
          shift_hint: family.symbol,
          target_answer: w.target_word,
          options: generateMCQOptions(w, data.wordList, 4),
          explanation: w.etymology_derivation,
        };
      }
      return {
        id: `drill_${w.id}_${idx}`,
        type: "derive",
        prompt: `Apply the ${family.symbol} shift to derive the ${language.name} word for "${w.english_cognate}":`,
        english_hint: `${w.english_cognate} (${family.symbol})`,
        shift_hint: family.symbol,
        target_answer: w.target_word,
        explanation: w.etymology_derivation,
      };
    });
  }, [family, data, language.name]);

  if (!isOpen) return null;

  const currentExercise = exercises[currentIndex];

  const handleSuccess = () => {
    if (!currentQuestionFailed) {
      setScore((s) => s + 1);
    }
    setCurrentQuestionFailed(false);
    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setCurrentQuestionFailed(false);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="branch-drill-title"
        className="relative w-full max-w-lg max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain bg-[var(--bg-color)] border border-[var(--sub-color)]/30 rounded-lg shadow-2xl p-5 pb-safe space-y-5 font-sans text-[var(--text-color)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--sub-color)]/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[var(--main-color)] px-1.5 py-0.5 rounded bg-[var(--sub-alt-color)]">
              {family.symbol}
            </span>
            <h3 id="branch-drill-title" className="text-sm font-bold font-mono">
              Branch Practice: {family.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-11 w-11 items-center justify-center rounded text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drill Content */}
        {!isFinished && currentExercise ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--sub-color)]">
              <span>question {currentIndex + 1} of {exercises.length}</span>
              <span className="text-[var(--main-color)]">unpenalized sandbox</span>
            </div>

            <ExerciseWidget
              key={currentExercise.id}
              exercise={currentExercise}
              onSuccess={handleSuccess}
              onError={() => setCurrentQuestionFailed(true)}
            />
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[var(--sub-alt-color)] text-[var(--main-color)] flex items-center justify-center mx-auto border border-[var(--sub-color)]/20">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold">Practice Complete</h4>
            <p className="text-xs text-[var(--sub-color)] font-mono">
              Score: <span className="text-[var(--main-color)] font-bold">{score}</span> / {exercises.length} correct on {family.symbol}
            </p>
            <div className="flex items-center justify-center gap-2.5 pt-2 font-mono text-xs">
              <button
                type="button"
                onClick={handleRestart}
                className="px-3 py-1.5 rounded bg-[var(--sub-alt-color)] text-[var(--text-color)] hover:bg-[var(--sub-alt-color)]/80 transition cursor-pointer"
              >
                retry [r]
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold transition cursor-pointer hover:opacity-90"
              >
                back to atlas [enter]
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
