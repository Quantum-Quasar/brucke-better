"use client";

import { AlertCircle } from "lucide-react";
import { GermanCharBar } from "@/components/common/GermanCharBar";
import type { ClassicExerciseController } from "../classic-exercise-types";

export default function TypingInput({ controller }: { controller: ClassicExerciseController }) {
  const { exercise, userInput, status, isCapsLock, setIsCapsLock, isInputFocused, setIsInputFocused, inputRef, settings, language, isReverseCognate, resetCurrentExercise, handleInputChange, handleVerify } = controller;
  return (
        <div
          className="space-y-3"
          onFocusCapture={() => setIsInputFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsInputFocused(false);
          }}
        >
          {/* Caps Lock warning indicator */}
          {settings.capsLockWarning && isCapsLock && (
            <div role="status" aria-live="polite" className="flex items-center gap-1.5 text-xs text-[var(--error-color)] font-mono animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>caps lock is on</span>
            </div>
          )}

          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              aria-label={
                exercise.prompt ||
                (isReverseCognate ? "Enter English cognate" : `Enter ${language.name} translation`)
              }
              lang={isReverseCognate ? "en" : language.id}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return;
                if (e.getModifierState) {
                  setIsCapsLock(e.getModifierState("CapsLock"));
                }
                if (settings.confidenceMode === "on" && e.key === "Backspace") {
                  e.preventDefault();
                  return;
                }
                if (settings.quickRestart === "esc" && e.key === "Escape") {
                  e.preventDefault();
                  e.stopPropagation();
                  resetCurrentExercise();
                  return;
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleVerify();
                }
              }}
              readOnly={status === "correct" || status === "almost"}
              placeholder={
                isReverseCognate
                  ? exercise.english_hint
                    ? `type english cognate (${exercise.english_hint})`
                    : "type english cognate..."
                  : exercise.english_hint
                  ? `type ${language.name.toLowerCase()} (e.g. ${exercise.english_hint})`
                  : "type answer..."
              }
              className="w-full px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-[var(--main-color)] text-lg font-bold font-mono outline-none focus:border-[var(--main-color)] transition placeholder:text-[var(--sub-color)]/40"
            />
          </div>

          {!isReverseCognate &&
            (settings.showCharBar === "always" || (settings.showCharBar === "on_focus" && isInputFocused)) && (
              <GermanCharBar inputRef={inputRef} value={userInput} onChange={handleInputChange} />
            )}
        </div>
  );
}
