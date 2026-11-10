"use client";

import type { ReviewController } from "./use-review-controller";

export function ReviewStyleDialog({ controller }: { controller: ReviewController }) {
  const { isModeSelectorOpen, modeDialogRef, selectReviewStyle, reviewMode, effectiveReviewMode, language, rememberPreference, setRememberPreference, setIsModeSelectorOpen } = controller;
  return <>
      {isModeSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-150">
          <div
            ref={modeDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-style-title"
            className="w-full max-w-xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 shadow-2xl p-6 sm:p-8 space-y-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-[var(--main-color)] uppercase tracking-widest font-semibold">
                review style
              </span>
              <h2 id="review-style-title" className="text-xl font-bold font-mono text-[var(--text-color)]">
                pick your review style
              </h2>
              <p className="text-sm font-mono text-[var(--sub-color)]">
                every style runs the same schedule, and you can switch mid-session at any time.
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: Free recall (flashcards) */}
              <button
                type="button"
                onClick={() => selectReviewStyle("flashcard")}
                className={`w-full text-left p-4 rounded-lg bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border transition cursor-pointer flex items-center justify-between group ${
                  reviewMode === "flashcard"
                    ? "border-[var(--main-color)] ring-1 ring-[var(--main-color)]/40"
                    : "border-[var(--sub-color)]/20"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-sm text-[var(--text-color)] group-hover:text-[var(--main-color)] transition">
                      recall (flashcard)
                    </span>
                    {reviewMode === "flashcard" ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                        active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[var(--sub-color)] bg-[var(--bg-color)] border border-[var(--sub-color)]/20">
                        recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-[var(--sub-color)]">
                    zero typing. recall in your mind, press space to reveal, rate 1–4.
                  </p>
                </div>
                <span className="keycap text-xs">
                  1
                </span>
              </button>

              {/* Option 2: Multiple Choice (MCQ) */}
              <button
                type="button"
                onClick={() => selectReviewStyle("mcq")}
                className={`w-full text-left p-4 rounded-lg bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border transition cursor-pointer flex items-center justify-between group ${
                  reviewMode === "mcq"
                    ? "border-[var(--main-color)] ring-1 ring-[var(--main-color)]/40"
                    : "border-[var(--sub-color)]/20"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-sm text-[var(--text-color)] group-hover:text-[var(--main-color)] transition">
                      multiple choice (mcq)
                    </span>
                    {effectiveReviewMode === "mcq" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                        active
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-[var(--sub-color)]">
                    pick the {language.name.toLowerCase()} word from 4 options. press 1–4 keys or click.
                  </p>
                </div>
                <span className="keycap text-xs">
                  2
                </span>
              </button>

              {/* Option 3: Tile Builder */}
              <button
                type="button"
                onClick={() => selectReviewStyle("tiles")}
                className={`w-full text-left p-4 rounded-lg bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border transition cursor-pointer flex items-center justify-between group ${
                  reviewMode === "tiles"
                    ? "border-[var(--main-color)] ring-1 ring-[var(--main-color)]/40"
                    : "border-[var(--sub-color)]/20"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-sm text-[var(--text-color)] group-hover:text-[var(--main-color)] transition">
                      tile builder
                    </span>
                    {effectiveReviewMode === "tiles" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                        active
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-[var(--sub-color)]">
                    tap letter and morpheme tiles into place to assemble the cognate.
                  </p>
                </div>
                <span className="keycap text-xs">
                  3
                </span>
              </button>

              {/* Option 4: Derivation Typing (Last) */}
              <button
                type="button"
                onClick={() => selectReviewStyle("typing")}
                className={`w-full text-left p-4 rounded-lg bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border transition cursor-pointer flex items-center justify-between group ${
                  reviewMode === "typing"
                    ? "border-[var(--main-color)] ring-1 ring-[var(--main-color)]/40"
                    : "border-[var(--sub-color)]/20"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-sm text-[var(--text-color)] group-hover:text-[var(--main-color)] transition">
                      derivation typing
                    </span>
                    {reviewMode === "typing" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                        active
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-[var(--sub-color)]">
                    type the {language.name.toLowerCase()} word letter-by-letter with diacritic shortcuts.
                  </p>
                </div>
                <span className="keycap text-xs">
                  4
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--sub-color)]/20">
              <label className="flex items-center gap-2 text-sm font-mono text-[var(--sub-color)] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberPreference}
                  onChange={(e) => setRememberPreference(e.target.checked)}
                  className="rounded border-[var(--sub-color)]/30 bg-[var(--bg-color)] text-[var(--main-color)] focus:ring-0"
                />
                remember as default style
              </label>

              <button
                type="button"
                onClick={() => {
                  setIsModeSelectorOpen(false);
                }}
                className="text-sm font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] px-3 py-1.5 rounded hover:bg-[var(--sub-alt-color)] transition cursor-pointer flex items-center gap-1.5"
              >
                <span>cancel</span>
                <span className="keycap text-[10px]">esc</span>
              </button>
            </div>
          </div>
        </div>
      )}
  </>;
}
