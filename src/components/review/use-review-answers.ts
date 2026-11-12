"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { gradeLessonAnswer } from "@/lib/lesson-grading";
import { soundEngine } from "@/lib/sound";
import type { ReviewGrade } from "@/lib/srs";
import type { ReviewMode, WordEntity } from "@/lib/types";
import type { CustomizationSettings } from "@/data/settings";

interface Options {
  currentWord: WordEntity | undefined;
  currentCardId: string | undefined;
  currentIndex: number;
  sessionEpoch: number;
  tileData: { tiles: string[] };
  isRevealed: boolean;
  setIsRevealed: Dispatch<SetStateAction<boolean>>;
  settings: CustomizationSettings;
  activeDeck: string | null;
  effectiveReviewMode: ReviewMode;
}
export function useReviewAnswers({ currentWord, currentCardId, currentIndex, sessionEpoch, tileData, isRevealed, setIsRevealed, settings, activeDeck, effectiveReviewMode }: Options) {
  const [inputGuess, setInputGuess] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [availableTiles, setAvailableTiles] = useState<string[]>([]);
  const [currentAutoGrade, setCurrentAutoGrade] = useState<ReviewGrade | null>(null);
  const [currentFeedbackNote, setCurrentFeedbackNote] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Reset interactive state per card
  useEffect(() => {
    setIsRevealed(false);
    setInputGuess("");
    setSelectedOption(null);
    setSelectedTiles([]);
    setCurrentAutoGrade(null);
    setCurrentFeedbackNote(null);
    if (tileData) {
      setAvailableTiles(tileData.tiles);
    }
  }, [currentCardId, currentIndex, tileData, sessionEpoch, setIsRevealed]);
  // MCQ Selection Handler
  const handleSelectMCQ = (option: string) => {
    if (isRevealed || !currentWord) return;
    setSelectedOption(option);
    const isCorrect = option.toLowerCase() === currentWord.target_word.toLowerCase();
    if (isCorrect) {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    } else {
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    }
    setCurrentAutoGrade(isCorrect ? 4 : 1);
    setCurrentFeedbackNote(null);
    setIsRevealed(true);
  };

  // Tile Selection Handlers
  const handlePickTile = (tile: string, index: number) => {
    if (isRevealed) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    const nextAvailable = [...availableTiles];
    nextAvailable.splice(index, 1);
    setAvailableTiles(nextAvailable);
    setSelectedTiles((prev) => [...prev, tile]);
  };

  const handleUnpickTile = (tile: string, index: number) => {
    if (isRevealed) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    const nextSelected = [...selectedTiles];
    nextSelected.splice(index, 1);
    setSelectedTiles(nextSelected);
    setAvailableTiles((prev) => [...prev, tile]);
  };

  const handleResetTiles = () => {
    if (isRevealed || !tileData) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setSelectedTiles([]);
    setAvailableTiles(tileData.tiles);
  };

  const handleCheckTiles = () => {
    if (isRevealed || !currentWord) return;
    const isSentenceCard = currentWord.id.startsWith("sentence_") || currentWord.target_word.includes(" ");
    const assembled = isSentenceCard ? selectedTiles.join(" ") : selectedTiles.join("");
    const { result: evalResult } = gradeLessonAnswer([assembled], [currentWord.target_word], {
      umlautTolerance: Boolean(settings.lazyMode),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance),
    });
    const isCorrect = evalResult.accuracy === "exact" || evalResult.accuracy === "almost";
    if (isCorrect) {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    } else {
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    }
    setCurrentAutoGrade(evalResult.accuracy === "exact" ? 4 : evalResult.accuracy === "almost" ? 3 : 1);
    setCurrentFeedbackNote(evalResult.accuracy === "almost" ? evalResult.warningNote ?? "Almost right — review the standard spelling." : null);
    setIsRevealed(true);
  };

  const handleCheckTyping = () => {
    if (isRevealed || !currentWord) return;
    const guess = inputGuess.trim();
    if (!guess) {
      setCurrentFeedbackNote("Type an answer before checking.");
      return;
    }

    const evalOptions = {
      umlautTolerance: Boolean(settings.lazyMode),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance),
    };
    const { result: evaluation } = gradeLessonAnswer([guess], [currentWord.target_word], evalOptions);
    if (evaluation.accuracy === "exact") {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
      setCurrentAutoGrade(4);
      setCurrentFeedbackNote(null);
    } else if (evaluation.accuracy === "almost") {
      // A near miss should be corrected, not punished like a completely wrong answer.
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
      setCurrentAutoGrade(3);
      setCurrentFeedbackNote(evaluation.warningNote || "Almost right — review the standard spelling.");
    } else {
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
      setCurrentAutoGrade(1);
      setCurrentFeedbackNote(null);
    }
    setIsRevealed(true);
  };

  const handleTypingInputChange = (val: string) => {
    if (val.length > inputGuess.length) {
      if (settings.stopOnError === "letter" && currentWord) {
        const nextCharIndex = inputGuess.length;
        const expectedTarget = currentWord.target_word;
        if (nextCharIndex < expectedTarget.length) {
          const valChar = val[nextCharIndex].toLowerCase();
          const targetChar = expectedTarget[nextCharIndex].toLowerCase();
          const normalizeChar = (c: string) =>
            c.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "s");
          const isMatch =
            valChar === targetChar ||
            (settings.lazyMode && normalizeChar(valChar) === normalizeChar(targetChar));
          if (!isMatch) {
            void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
            return;
          }
        }
      }
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    } else if (val.length < inputGuess.length) {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    }
    setInputGuess(val);
    setCurrentFeedbackNote(null);
  };
  // Auto-focus input when in typing mode unrevealed
  useEffect(() => {
    if (activeDeck && !isRevealed && effectiveReviewMode === "typing") {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeDeck, currentIndex, isRevealed, effectiveReviewMode]);
  return {
    inputGuess, setInputGuess, selectedOption, setSelectedOption, selectedTiles, setSelectedTiles,
    availableTiles, setAvailableTiles, currentAutoGrade, setCurrentAutoGrade, currentFeedbackNote,
    setCurrentFeedbackNote, inputRef, handleSelectMCQ, handlePickTile, handleUnpickTile,
    handleResetTiles, handleCheckTiles, handleCheckTyping, handleTypingInputChange,
  };
}
