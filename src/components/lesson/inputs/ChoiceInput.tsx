"use client";

import type { ClassicExerciseController } from "../classic-exercise-types";

export default function ChoiceInput({ controller }: { controller: ClassicExerciseController }) {
  const { status, verifiedAttemptText, failedAttemptText, settings, language, displayOptions, handleShiftOptionSelect } = controller;
  return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {displayOptions.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleShiftOptionSelect(opt)}
              disabled={status !== "idle"}
              aria-label={opt}
              aria-pressed={status !== "idle" && (verifiedAttemptText || failedAttemptText) === opt}
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--text-color)] transition text-left group cursor-pointer"
            >
              <span className="group-hover:text-[var(--main-color)] font-bold" lang={language.id}>{opt}</span>
              {settings.showKeyTips && (
                <span className="keycap text-[10px]" aria-hidden="true">
                  {i + 1}
                </span>
              )}
            </button>
          ))}
        </div>
  );
}
