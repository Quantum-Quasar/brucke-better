"use client";

import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { ExampleSentence } from "@/components/common/ExampleSentence";
import { ShiftPair } from "@/components/common/ShiftPair";
import { computeLetterDiff } from "@/lib/letter-diff";
import { playTargetAudio } from "@/lib/audio";
import type { ReviewMode } from "@/lib/types";
import type { ReviewController } from "./use-review-controller";
import { ReviewAnswerEntry } from "./ReviewAnswerEntry";

export function ReviewSessionCard({ controller }: { controller: ReviewController }) {
  const { sessionRef, currentIndex, sessionCards, supportedModesForCard, effectiveReviewMode, setReviewMode, setPreferredReviewMode, goBack, canGoBack, settings, goForward, canGoForward, exitDeck, currentWord, language, wordMastery, currentCard, isRevealed, currentCloze, inputGuess, currentFeedbackNote, handleGrade } = controller;
  if (!currentCard || !currentWord) return null;
  return (
        <div
          ref={sessionRef}
          tabIndex={-1}
          className="scroll-mt-20 p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 shadow-md space-y-6 animate-in fade-in duration-150 focus:outline-none"
        >
          {/* Card Header: Counter, Style Switcher, Exit */}
          <div className="sticky top-14 z-20 -mx-6 -mt-6 flex flex-wrap items-center justify-between gap-3 rounded-t-lg border-b border-[var(--sub-color)]/15 bg-[var(--sub-alt-color)] px-6 pb-4 pt-6 sm:-mx-8 sm:-mt-8 sm:px-8 sm:pt-8">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-[var(--sub-color)] uppercase tracking-wider">
                card {currentIndex + 1} / {sessionCards.length}
              </span>

              {/* Mid-Session Style Switcher (filtered by card/deck supportedModes) */}
              <div className="flex items-center gap-1.5 bg-[var(--bg-color)] border border-[var(--sub-color)]/25 px-2 py-0.5 rounded">
                <span className="text-[11px] font-mono text-[var(--sub-color)]">style:</span>
                {supportedModesForCard.length === 1 ? (
                  <span className="text-xs font-mono text-[var(--main-color)] font-bold">
                    {supportedModesForCard[0]} only
                  </span>
                ) : (
                  <select
                    value={effectiveReviewMode}
                    onChange={(e) => {
                      const mode = e.target.value as ReviewMode;
                      setReviewMode(mode);
                      setPreferredReviewMode(mode);
                    }}
                    className="min-h-11 bg-transparent px-1 font-mono text-[var(--main-color)] outline-none cursor-pointer"
                    title="Switch Review Style mid-session"
                  >
                    {supportedModesForCard.includes("flashcard") && (
                      <option value="flashcard" className="bg-[var(--bg-color)] text-[var(--text-color)]">
                        recall
                      </option>
                    )}
                    {supportedModesForCard.includes("mcq") && (
                      <option value="mcq" className="bg-[var(--bg-color)] text-[var(--text-color)]">
                        mcq
                      </option>
                    )}
                    {supportedModesForCard.includes("tiles") && (
                      <option value="tiles" className="bg-[var(--bg-color)] text-[var(--text-color)]">
                        tiles
                      </option>
                    )}
                    {supportedModesForCard.includes("typing") && (
                      <option value="typing" className="bg-[var(--bg-color)] text-[var(--text-color)]">
                        typing
                      </option>
                    )}
                  </select>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={controller.buryCurrent} className="min-h-11 px-3 text-sm text-[var(--sub-color)]" title="Hide through today; returns tomorrow">Bury today</button>
              <button type="button" onClick={controller.suspendCurrent} className="min-h-11 px-3 text-sm text-[var(--sub-color)]" title="Hide until you resume it in Manage cards">Suspend</button>
              <button
                type="button"
                tabIndex={-1}
                onClick={goBack}
                disabled={!canGoBack}
                className="min-h-11 text-sm font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] px-3 py-1 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 transition flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Previous card (←)"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>back</span>
                {settings.showKeyTips && <span className="keycap text-[10px]">←</span>}
              </button>

              <button
                type="button"
                tabIndex={-1}
                onClick={goForward}
                disabled={!canGoForward}
                className="min-h-11 text-sm font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] px-3 py-1 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 transition flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Next card (→)"
              >
                <span>next</span>
                {settings.showKeyTips && <span className="keycap text-[10px]">→</span>}
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                tabIndex={-1}
                onClick={exitDeck}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") e.preventDefault();
                }}
                className="min-h-11 text-sm font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] px-3 py-1 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 transition cursor-pointer flex items-center gap-1.5"
                title="Exit Session (Esc)"
              >
                <span>exit</span>
                <span className="keycap text-[10px]">esc</span>
              </button>
            </div>
          </div>

          {/* Front Prompt */}
          <div className="text-center space-y-2 py-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-mono text-[var(--sub-color)] uppercase tracking-widest">
                shift: {currentWord.shift_rule}
              </span>
              {currentWord.gender && language.genderSystem && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--sub-color)]/20 bg-[var(--bg-color)] text-[var(--sub-color)]">
                  gender: [ {language.genderSystem.articles.join(" / ")} ? ]
                </span>
              )}
              {!wordMastery[currentCard.word_id] && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--main-color)]/30 bg-[var(--main-color)]/10 text-[var(--main-color)]">
                  new word
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-color)]">
              {currentWord.id.startsWith("article_") ? (
                <>
                  <span className="sr-only">missing article </span>
                  <span aria-hidden="true" className="inline-block w-16 border-b-2 border-current align-baseline" />{" "}
                  {currentWord.english_cognate.slice(2)}
                </>
              ) : currentWord.english_cognate}
            </h2>
            <p className="text-sm font-mono text-[var(--sub-color)]">&quot;{currentWord.english_meaning}&quot;</p>
            {!isRevealed && currentCloze && (
              <div className="mx-auto max-w-md pt-2 text-sm font-mono text-[var(--sub-color)]">
                <p lang={language.ttsLocale} className="text-[var(--text-color)]">{currentCloze}</p>
                {currentWord.context_translation && <p>{currentWord.context_translation}</p>}
              </div>
            )}
          </div>

    <ReviewAnswerEntry controller={controller} />
          {/* REVEALED CARD CONTENT & SM-2 GRADING (COMMON TO ALL MODES) */}
          {isRevealed && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {currentFeedbackNote && (
                <p
                  role="status"
                  className="text-center text-xs font-mono text-[var(--main-color)] border border-[var(--main-color)]/30 bg-[var(--main-color)]/10 rounded px-3 py-2"
                >
                  {currentFeedbackNote}
                </p>
              )}
              <div className="p-5 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-center space-y-3">
                <ShiftPair
                  english={currentWord.english_cognate}
                  german={currentWord.target_word}
                  gender={currentWord.gender}
                  rule={currentWord.shift_rule}
                  wordId={currentWord.id}
                  className="text-lg px-4 py-2"
                />

                {/* Character-level Diff for Typing Mode */}
                {effectiveReviewMode === "typing" && inputGuess.trim().length > 0 && (
                  <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-center space-y-1 max-w-md mx-auto">
                    <span className="text-[11px] font-mono text-[var(--sub-color)] uppercase tracking-wider block">
                      your attempt:
                    </span>
                    <div className="text-base font-mono tracking-wide flex items-center justify-center gap-0.5">
                      {computeLetterDiff(inputGuess.trim(), currentWord.target_word).userChars.map((c, i) => (
                        <span
                          key={i}
                          className={
                            c.status === "correct"
                              ? "text-[var(--main-color)] font-bold"
                              : "text-[var(--error-color)] font-bold underline decoration-[var(--error-color)] decoration-2 bg-[var(--error-color)]/10 px-0.5 rounded"
                          }
                        >
                          {c.char}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const spoken = currentWord.gender ? `${currentWord.gender} ${currentWord.target_word}` : currentWord.target_word;
                      playTargetAudio(spoken, language.ttsLocale);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[var(--sub-alt-color)] hover:bg-[var(--main-color)]/10 text-[var(--main-color)] border border-[var(--sub-color)]/20 text-xs font-mono transition cursor-pointer"
                    title="Listen to pronunciation [R]"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>listen</span>
                    {settings.showKeyTips && (
                      <span className="keycap text-[10px]">r</span>
                    )}
                  </button>
                  <span className="text-sm font-mono text-[var(--sub-color)]">{currentWord.ipa}</span>
                </div>
                <p className="text-sm font-mono text-[var(--sub-color)] max-w-md mx-auto">{currentWord.etymology_derivation}</p>
                <div className="p-3 rounded bg-[var(--sub-alt-color)] font-mono max-w-md mx-auto border border-[var(--sub-color)]/15 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <ExampleSentence
                      sentence={currentWord.context_phrase}
                      translation={currentWord.context_translation}
                      word={currentWord.target_word}
                      lang={language.id}
                    />
                    <button
                      type="button"
                      onClick={() => playTargetAudio(currentWord.context_phrase, language.ttsLocale)}
                      className="shrink-0 p-1 rounded bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 text-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer"
                      title="Listen to the example sentence"
                      aria-label="Listen to the example sentence"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* SM-2 Grade Buttons — sticky on phones so “good” is always reachable */}
              <div className="space-y-2 pt-2 sticky bottom-20 z-20 -mx-2 px-2 pb-2 rounded-lg bg-[var(--sub-alt-color)]/95 backdrop-blur sm:static sm:mx-0 sm:px-0 sm:pb-0 sm:bg-transparent sm:backdrop-blur-none">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleGrade(1)}
                    className="p-3.5 rounded-lg bg-[var(--error-color)]/10 hover:bg-[var(--error-color)]/20 border border-[var(--error-color)]/30 text-[var(--error-color)] font-semibold text-xs flex flex-col items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="text-sm font-bold font-mono">again</span>
                    {settings.showKeyTips && (
                      <span className="keycap text-[10px]">1</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGrade(3)}
                    className="p-3.5 rounded-lg bg-[var(--sub-color)]/10 hover:bg-[var(--sub-color)]/20 border border-[var(--sub-color)]/30 text-[var(--sub-color)] font-semibold text-xs flex flex-col items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="text-sm font-bold font-mono">hard</span>
                    {settings.showKeyTips && (
                      <span className="keycap text-[10px]">2</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGrade(4)}
                    className="p-3.5 rounded-lg bg-[var(--main-color)]/15 hover:bg-[var(--main-color)]/25 border-2 border-[var(--main-color)] text-[var(--main-color)] font-semibold text-xs flex flex-col items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="text-sm font-bold font-mono">good</span>
                    {settings.showKeyTips && (
                      <span className="keycap text-[10px]">3 / space</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGrade(5)}
                    className="p-3.5 rounded-lg bg-[var(--text-color)]/10 hover:bg-[var(--text-color)]/20 border border-[var(--text-color)]/30 text-[var(--text-color)] font-semibold text-xs flex flex-col items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="text-sm font-bold font-mono">easy</span>
                    {settings.showKeyTips && (
                      <span className="keycap text-[10px]">4</span>
                    )}
                  </button>
                </div>
                {settings.showKeyTips && (
                  <div className="text-center text-[11px] font-mono text-[var(--sub-color)] flex items-center justify-center gap-1">
                    <span>shortcuts:</span>
                    <span className="keycap text-[10px]">1</span>
                    <span className="keycap text-[10px]">2</span>
                    <span className="keycap text-[10px]">3</span>
                    <span className="keycap text-[10px]">4</span>
                    <span>(or</span>
                    <span className="keycap text-[10px]">space</span>
                    <span>for good)</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
  );
}
