"use client";

import { Check } from "lucide-react";
import type { ClassicExerciseController } from "../classic-exercise-types";

export default function MatchingInput({ controller }: { controller: ClassicExerciseController }) {
  const { exercise, selectedEnglish, matchedPairs, settings, language, displayGermanPairs, handleSelectEnglish, handleSelectGerman } = controller;
  return exercise.matching_pairs && (
        <div className="grid grid-cols-2 gap-4 pt-1">
          <p className="sr-only" role="status" aria-live="polite">
            {matchedPairs.length} of {exercise.matching_pairs.length} pairs matched.
            {selectedEnglish ? ` Selected ${selectedEnglish}; choose its ${language.name} match.` : " Choose an English word."}
          </p>
          {/* Left Column: English Cognates */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[var(--sub-color)] uppercase tracking-wider block">
                english cognates
              </span>
              {!selectedEnglish && (
                <span className="text-[10px] text-[var(--sub-color)]">
                  1–{exercise.matching_pairs.length}
                </span>
              )}
            </div>
            {exercise.matching_pairs.map((pair, index) => {
              const isMatched = matchedPairs.includes(pair.id);
              const isSelected = selectedEnglish === pair.english;
              return (
                <button
                  key={`en_${pair.id}`}
                  type="button"
                  onClick={() => handleSelectEnglish(pair.english)}
                  disabled={isMatched}
                  aria-label={`${pair.english}${isMatched ? ", matched" : ""}`}
                  aria-pressed={isSelected}
                  className={`w-full p-3 rounded-lg border text-xs font-mono transition text-left flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? "bg-[var(--main-color)]/10 border-[var(--main-color)]/30 text-[var(--main-color)] opacity-60"
                      : isSelected
                      ? "bg-[var(--main-color)]/20 border-[var(--main-color)] text-[var(--main-color)] ring-1 ring-[var(--main-color)]/40 font-bold"
                      : "bg-[var(--bg-color)] border-[var(--sub-color)]/20 hover:border-[var(--sub-color)]/50 text-[var(--text-color)]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {settings.showKeyTips && !isMatched && (
                      <span className="keycap text-[10px]" aria-hidden="true">
                        {index + 1}
                      </span>
                    )}
                    <span>{pair.english}</span>
                  </span>
                  {isMatched && <Check className="w-4 h-4 text-[var(--main-color)]" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Shifted Target Words */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[var(--sub-color)] uppercase tracking-wider block">
                {language.name.toLowerCase()} shifted
              </span>
              {selectedEnglish && (
                <span className="text-[10px] text-[var(--main-color)]">
                  1–{displayGermanPairs.length} · esc
                </span>
              )}
            </div>
            {displayGermanPairs.map((pair, index) => {
              const isMatched = matchedPairs.includes(pair.id);
              return (
                <button
                  key={`de_${pair.id}`}
                  type="button"
                  onClick={() => handleSelectGerman(pair.german, pair.id, pair.english)}
                  disabled={isMatched}
                  aria-label={`${pair.german}${isMatched ? ", matched" : ""}`}
                  aria-pressed={isMatched}
                  className={`w-full p-3 rounded-lg border text-xs font-mono transition text-left flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? "bg-[var(--main-color)]/10 border-[var(--main-color)]/30 text-[var(--main-color)] opacity-60"
                      : "bg-[var(--bg-color)] border-[var(--sub-color)]/20 hover:border-[var(--main-color)] text-[var(--main-color)] font-bold"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {settings.showKeyTips && selectedEnglish && !isMatched && (
                      <span className="keycap text-[10px]" aria-hidden="true">
                        {index + 1}
                      </span>
                    )}
                    <span lang={language.id}>{pair.german}</span>
                  </span>
                  {isMatched && <Check className="w-4 h-4 text-[var(--main-color)]" />}
                </button>
              );
            })}
          </div>
        </div>
  );
}
