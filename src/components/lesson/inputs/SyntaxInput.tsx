"use client";

import type { ClassicExerciseController } from "../classic-exercise-types";

export default function SyntaxInput({ controller }: { controller: ClassicExerciseController }) {
  const { selectedIndices, status, settings, language, sanitizedWordBank, pickTileIndex, unpickTilePosition } = controller;
  return (
        <div className="space-y-3">
          <p className="sr-only" role="status" aria-live="polite">
            {selectedIndices.length ? `Selected words: ${selectedIndices.map((index) => sanitizedWordBank[index]).join(" ")}` : "No words selected"}
          </p>
          <div className="min-h-[58px] p-3 rounded-lg bg-[var(--bg-color)] border border-dashed border-[var(--sub-color)]/30 flex flex-wrap gap-2 items-center">
            {selectedIndices.length === 0 ? (
              <span className="text-xs text-[var(--sub-color)]/60 italic pl-2">
                tap tiles or press 1–{sanitizedWordBank.length} in sentence sequence...
              </span>
            ) : (
              selectedIndices.map((tileIdx, pos) => (
                <button
                  key={`${sanitizedWordBank[tileIdx]}-${tileIdx}-${pos}`}
                  type="button"
                  aria-label={`Remove ${sanitizedWordBank[tileIdx]} from answer, position ${pos + 1}`}
                  disabled={status === "correct" || status === "almost"}
                  onClick={() => unpickTilePosition(pos)}
                  className="px-3 py-1.5 rounded bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/40 text-xs font-bold hover:bg-[var(--error-color)]/20 hover:text-[var(--error-color)] hover:border-[var(--error-color)]/40 transition flex items-center gap-1.5 cursor-pointer"
                  title="Click or press Backspace to unpick"
                >
                  <span lang={language.id}>{sanitizedWordBank[tileIdx]}</span>
                  <span className="text-[10px] opacity-60 font-normal">×</span>
                </button>
              ))
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {sanitizedWordBank.map((tile, i) => {
              const isUsed = selectedIndices.includes(i);
              return (
                <button
                  key={`${tile}-${i}`}
                  type="button"
                  aria-label={tile}
                  aria-pressed={isUsed}
                  onClick={() => pickTileIndex(i)}
                  disabled={isUsed || status === "correct" || status === "almost"}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition flex items-center gap-2 cursor-pointer ${
                    isUsed
                      ? "opacity-25 border-[var(--sub-color)]/10 bg-[var(--bg-color)] text-[var(--sub-color)] cursor-not-allowed"
                      : "border-[var(--sub-color)]/20 bg-[var(--bg-color)] hover:border-[var(--main-color)] text-[var(--text-color)]"
                  }`}
                >
                  {settings.showKeyTips && (
                    <span className="keycap text-[10px]" aria-hidden="true">
                      {i + 1}
                    </span>
                  )}
                  <span lang={language.id}>{tile}</span>
                </button>
              );
            })}
          </div>
        </div>
  );
}
