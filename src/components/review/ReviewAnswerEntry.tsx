"use client";

import { Check, X, AlertCircle } from "lucide-react";
import { GermanCharBar } from "@/components/common/GermanCharBar";
import type { ReviewController } from "./use-review-controller";

export function ReviewAnswerEntry({ controller }: { controller: ReviewController }) {
  const { effectiveReviewMode, isRevealed, language, setIsRevealed, settings, mcqOptions, currentWord, selectedOption, handleSelectMCQ, selectedTiles, handleUnpickTile, availableTiles, handlePickTile, handleResetTiles, handleCheckTiles, isCapsLock, inputRef, inputGuess, handleTypingInputChange, setIsCapsLock, setInputGuess, handleCheckTyping, currentFeedbackNote } = controller;
  if (!currentWord) return null;
  return <>
          {/* MODE 1: QUICK FLIP (FLASHCARD) */}
          {effectiveReviewMode === "flashcard" && !isRevealed && (
            <div className="space-y-4 max-w-md mx-auto text-center py-4">
              <p className="text-sm font-mono text-[var(--sub-color)]">
                recall the {language.name.toLowerCase()} twin in your mind, then reveal.
              </p>
              <button
                type="button"
                onClick={() => setIsRevealed(true)}
                className="w-full py-3.5 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>show answer</span>
                {settings.showKeyTips && (
                  <span className="keycap text-[11px]">space</span>
                )}
              </button>
            </div>
          )}

          {/* MODE 2: MULTIPLE CHOICE (MCQ) */}
          {effectiveReviewMode === "mcq" && (
            <div className="space-y-4 max-w-lg mx-auto py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {mcqOptions.map((opt, idx) => {
                  const isTarget = opt.toLowerCase() === currentWord.target_word.toLowerCase();
                  const isSelected = selectedOption === opt;

                  let buttonStyle = "bg-[var(--bg-color)] hover:border-[var(--main-color)]/50 border-[var(--sub-color)]/20 text-[var(--text-color)]";
                  if (isRevealed) {
                    if (isTarget) {
                      buttonStyle = "bg-[var(--main-color)]/15 border-[var(--main-color)] text-[var(--main-color)] font-bold";
                    } else if (isSelected && !isTarget) {
                      buttonStyle = "bg-[var(--error-color)]/15 border-[var(--error-color)] text-[var(--error-color)] line-through";
                    } else {
                      buttonStyle = "bg-[var(--bg-color)]/50 border-[var(--sub-color)]/10 text-[var(--sub-color)] opacity-40";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => handleSelectMCQ(opt)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between transition cursor-pointer font-mono ${buttonStyle}`}
                    >
                      <span className="font-semibold text-sm">{opt}</span>
                      <div className="flex items-center gap-1.5">
                        {isRevealed && isTarget && <Check className="w-4 h-4 text-[var(--main-color)]" />}
                        {isRevealed && isSelected && !isTarget && <X className="w-4 h-4 text-[var(--error-color)]" />}
                        {settings.showKeyTips && (
                          <span className="keycap text-[10px]">
                            {idx + 1}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {!isRevealed && settings.showKeyTips && (
                <div className="text-center text-[11px] font-mono text-[var(--sub-color)] pt-1 flex items-center justify-center gap-1">
                  <span>press</span>
                  {mcqOptions.map((option, index) => (
                    <span key={option} className="keycap text-[10px]">{index + 1}</span>
                  ))}
                  <span>to select</span>
                </div>
              )}
            </div>
          )}

          {/* MODE 3: TILE BUILDER */}
          {effectiveReviewMode === "tiles" && (
            <div className="space-y-4 max-w-lg mx-auto py-2">
              {/* Selected Tiles Assembly Rack */}
              <div className="p-3.5 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 min-h-[60px] flex flex-wrap items-center justify-center gap-2">
                {selectedTiles.length === 0 ? (
                  <span className="text-sm font-mono text-[var(--sub-color)]/60 italic">{currentWord.id.startsWith("sentence_") ? "tap word tiles below in sentence order (or press 1–9)..." : "tap tiles below to assemble word..."}</span>
                ) : (
                  selectedTiles.map((tile, idx) => (
                    <button
                      key={`${tile}-${idx}`}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => handleUnpickTile(tile, idx)}
                      className="px-3 py-1.5 rounded bg-[var(--main-color)]/15 hover:bg-[var(--error-color)]/20 border border-[var(--main-color)]/40 hover:border-[var(--error-color)]/40 text-[var(--main-color)] hover:text-[var(--error-color)] font-bold font-mono text-sm transition cursor-pointer"
                      title="Tap to remove"
                    >
                      {tile}
                    </button>
                  ))
                )}
              </div>

              {/* Available Tile Bank */}
              {!isRevealed && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {availableTiles.map((tile, idx) => (
                      <button
                        key={`${tile}-${idx}`}
                        type="button"
                        onClick={() => handlePickTile(tile, idx)}
                        className="px-3.5 py-2 rounded-lg bg-[var(--bg-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)] font-bold font-mono text-sm transition cursor-pointer active:scale-95"
                      >
                        {tile}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleResetTiles}
                      disabled={selectedTiles.length === 0}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--sub-color)]/10 border border-[var(--sub-color)]/20 text-sm font-mono text-[var(--sub-color)] transition cursor-pointer disabled:opacity-40"
                    >
                      reset
                    </button>

                    <button
                      type="button"
                      onClick={handleCheckTiles}
                      disabled={selectedTiles.length === 0}
                      className="px-5 py-1.5 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-bold text-xs font-mono transition cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
                    >
                      <span>check</span>
                      {settings.showKeyTips && (
                        <span className="keycap text-[10px]">enter</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsRevealed(true)}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--sub-color)]/10 border border-[var(--sub-color)]/20 text-sm font-mono text-[var(--sub-color)] transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>show</span>
                      {settings.showKeyTips && (
                        <span className="keycap text-[10px]">space</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE 4: DERIVATION TYPING (LAST) */}
          {effectiveReviewMode === "typing" && !isRevealed && (
            <div className="space-y-4 max-w-md mx-auto">
              {settings.capsLockWarning && isCapsLock && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--error-color)] font-mono animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>caps lock is on</span>
                </div>
              )}
              <input
                ref={inputRef}
                type="text"
                value={inputGuess}
                onChange={(e) => handleTypingInputChange(e.target.value)}
                lang={language.id}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                onKeyDown={(e) => {
                  if (e.getModifierState) {
                    setIsCapsLock(e.getModifierState("CapsLock"));
                  }
                  if (settings.confidenceMode === "on" && e.key === "Backspace") {
                    e.preventDefault();
                    return;
                  }
                  if (settings.quickRestart === "esc" && e.key === "Escape") {
                    e.preventDefault();
                    setInputGuess("");
                    return;
                  }
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCheckTyping();
                  }
                }}
                placeholder={`type ${language.name.toLowerCase()} derivation...`}
                className="w-full px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-[var(--main-color)] text-center font-mono font-bold text-lg outline-none focus:border-[var(--main-color)] placeholder:text-[var(--sub-color)]/40 transition"
              />
              {(settings.showCharBar === "always" || settings.showCharBar === "on_focus") && (
                <GermanCharBar inputRef={inputRef} value={inputGuess} onChange={handleTypingInputChange} />
              )}
              {currentFeedbackNote && (
                <p role="alert" className="text-center text-xs font-mono text-[var(--main-color)]">
                  {currentFeedbackNote}
                </p>
              )}
              <button
                type="button"
                onClick={handleCheckTyping}
                className="w-full py-3 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>check answer</span>
                {settings.showKeyTips && (
                  <span className="keycap text-[10px]">enter</span>
                )}
              </button>
            </div>
          )}
  </>;
}
