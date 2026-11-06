"use client";

import type { ClassicExerciseController } from "../classic-exercise-types";

export default function MorphemeInput({ controller }: { controller: ClassicExerciseController }) {
  const { selectedIndices, status, settings, language, sanitizedTileOptions, pickTileIndex, unpickTilePosition } = controller;
  return (
        <div className="space-y-4">
          {/* Target Assembly Slot */}
          <div className="min-h-[58px] p-3 rounded-lg bg-[var(--bg-color)] border border-dashed border-[var(--sub-color)]/30 flex flex-wrap gap-2 items-center justify-center">
            {selectedIndices.length === 0 ? (
              <span className="text-xs text-[var(--sub-color)]/60 italic">
                tap tiles or press 1–{sanitizedTileOptions.length} to assemble word...
              </span>
            ) : (
              selectedIndices.map((tileIdx, pos) => (
                <button
                  key={`${sanitizedTileOptions[tileIdx]}-${tileIdx}-${pos}`}
                  onClick={() => unpickTilePosition(pos)}
                  className="px-3 py-1.5 rounded bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/40 text-sm font-bold hover:bg-[var(--error-color)]/20 hover:text-[var(--error-color)] hover:border-[var(--error-color)]/40 transition flex items-center gap-1.5 cursor-pointer"
                  title="Click or press Backspace to unpick"
                >
                  <span lang={language.id}>{sanitizedTileOptions[tileIdx]}</span>
                  <span className="text-[10px] opacity-60 font-normal">×</span>
                </button>
              ))
            )}
          </div>

          {/* Tile Options Bank */}
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {sanitizedTileOptions.map((tile, i) => {
              const isUsed = selectedIndices.includes(i);
              return (
                <button
                  key={`${tile}-${i}`}
                  type="button"
                  onClick={() => pickTileIndex(i)}
                  disabled={isUsed || status === "correct" || status === "almost"}
                  className={`px-3.5 py-2 rounded-lg border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    isUsed
                      ? "opacity-25 border-[var(--sub-color)]/10 bg-[var(--bg-color)] text-[var(--sub-color)] cursor-not-allowed"
                      : "border-[var(--sub-color)]/20 bg-[var(--bg-color)] hover:border-[var(--main-color)] text-[var(--text-color)] shadow-sm"
                  }`}
                >
                  {settings.showKeyTips && (
                    <span className="keycap text-[10px]">
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
