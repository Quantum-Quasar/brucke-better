"use client";

import React, { useEffect, useRef } from "react";
import { Volume2 } from "lucide-react";
import { useClassicExercise } from "@/components/lesson/use-classic-exercise";
import type { ExerciseWidgetProps } from "@/components/lesson/exercise-widget-props";
import type { ClassicExerciseController } from "@/components/lesson/classic-exercise-types";
import { affirmationFor } from "@/lib/shift-diagnosis";
import { computeLetterDiff } from "@/lib/letter-diff";
import { playTargetAudio } from "@/lib/audio";
import { getLanguageDefinition } from "@/data/languages";
import { useAppStore } from "@/lib/store";
import { ArrowRightIcon } from "../exp-kit";

const TYPE_LABEL: Record<string, string> = {
  morpheme_tiles: "Build the word",
  matching_pairs: "Match the twins",
  shift_select: "Pick the German",
  syntax_builder: "Build the sentence",
  reverse_cognate: "Find the English twin",
  derive: "Write it in German",
};

function firstSentence(text: string): string {
  const match = /^(.{24,}?[.!?])\s+\S/.exec(text.trim());
  return match ? match[1] : text.trim();
}

/** Accent keys for the course language, inserted at the caret. */
export function ExpCharBar({
  inputRef,
  value,
  onChange,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
}) {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  if (!language.specialChars.length) return null;
  const insert = (char: string) => {
    const el = inputRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? start;
    onChange(value.slice(0, start) + char + value.slice(end));
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus({ preventScroll: true });
      el.setSelectionRange(start + char.length, start + char.length);
    });
  };
  return (
    <div className="x-chars" aria-label={language.charBarLabel}>
      {language.specialChars.map(([char, digraph]) => (
        <button
          key={char}
          type="button"
          onPointerDown={(event) => event.preventDefault()}
          onClick={() => insert(char)}
          aria-label={`Insert ${char}`}
          title={digraph ? `or type “${digraph}”` : undefined}
        >
          {char}
        </button>
      ))}
    </div>
  );
}

function TileInput({ c, bank }: { c: ClassicExerciseController; bank: string[] }) {
  const locked = c.status === "correct" || c.status === "almost";
  const sentence = c.exercise.type === "syntax_builder";
  return (
    <div className="x-ex-input">
      <p className="sr-only" role="status" aria-live="polite">
        {c.selectedIndices.length ? `Your answer: ${c.selectedIndices.map((i) => bank[i]).join(sentence ? " " : "")}` : "Nothing placed yet"}
      </p>
      <div className={`x-slot ${c.status === "incorrect" ? "x-shake" : ""}`}>
        {c.selectedIndices.length === 0 ? (
          <span className="x-slot-empty">
            {sentence ? "Tap the words in order" : "Tap the pieces in order"}
            {c.settings.showKeyTips ? ` — or press 1–${bank.length}` : ""}
          </span>
        ) : (
          c.selectedIndices.map((tileIndex, position) => (
            <button
              key={`${bank[tileIndex]}-${tileIndex}-${position}`}
              type="button"
              className="x-tile"
              data-picked="true"
              disabled={locked}
              onClick={() => c.unpickTilePosition(position)}
              aria-label={`Remove ${bank[tileIndex]}`}
              lang={c.language.id}
            >
              {bank[tileIndex]}
            </button>
          ))
        )}
      </div>
      <div className="x-tiles" style={{ marginTop: 16 }}>
        {bank.map((tile, index) => {
          const used = c.selectedIndices.includes(index);
          return (
            <button
              key={`${tile}-${index}`}
              type="button"
              className="x-tile"
              data-used={used || undefined}
              disabled={used || locked}
              aria-pressed={used}
              onClick={() => c.pickTileIndex(index)}
              lang={c.language.id}
            >
              {c.settings.showKeyTips && <span className="x-tile-key" aria-hidden="true">{index + 1}</span>}
              {tile}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MatchInput({ c }: { c: ClassicExerciseController }) {
  const pairs = c.exercise.matching_pairs ?? [];
  return (
    <div className="x-ex-input">
      <p className="sr-only" role="status" aria-live="polite">
        {c.matchedPairs.length} of {pairs.length} matched.
        {c.selectedEnglish ? ` ${c.selectedEnglish} selected; choose its ${c.language.name} twin.` : " Choose an English word."}
      </p>
      <div className="x-match">
        <div className="x-match-col">
          <span className="x-match-head">English</span>
          {pairs.map((pair, index) => {
            const matched = c.matchedPairs.includes(pair.id);
            return (
              <button
                key={pair.id}
                type="button"
                className="x-tile"
                data-matched={matched || undefined}
                data-selected={c.selectedEnglish === pair.english || undefined}
                disabled={matched}
                aria-pressed={c.selectedEnglish === pair.english}
                onClick={() => c.handleSelectEnglish(pair.english)}
              >
                <span>{pair.english}</span>
                {c.settings.showKeyTips && !matched && !c.selectedEnglish && (
                  <span className="x-tile-key" aria-hidden="true">{index + 1}</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="x-match-col">
          <span className="x-match-head">{c.language.name}</span>
          {c.displayGermanPairs.map((pair, index) => {
            const matched = c.matchedPairs.includes(pair.id);
            return (
              <button
                key={pair.id}
                type="button"
                className="x-tile"
                data-matched={matched || undefined}
                disabled={matched}
                onClick={() => c.handleSelectGerman(pair.german, pair.id, pair.english)}
                lang={c.language.id}
              >
                <span>{pair.german}</span>
                {c.settings.showKeyTips && !matched && c.selectedEnglish && (
                  <span className="x-tile-key" aria-hidden="true">{index + 1}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TypeInput({ c }: { c: ClassicExerciseController }) {
  const english = c.isReverseCognate;
  return (
    <div className="x-ex-input">
      {c.settings.capsLockWarning && c.isCapsLock && (
        <p role="status" className="x-small x-strong" style={{ marginBottom: 8 }}>
          Caps Lock is on
        </p>
      )}
      <input
        ref={c.inputRef}
        type="text"
        className={`x-input ${c.status === "incorrect" ? "x-shake" : ""}`}
        value={c.userInput}
        aria-label={c.exercise.prompt || (english ? "English twin" : `${c.language.name} answer`)}
        lang={english ? "en" : c.language.id}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        onChange={(event) => c.handleInputChange(event.target.value)}
        onFocus={() => c.setIsInputFocused(true)}
        onBlur={() => c.setIsInputFocused(false)}
        onKeyDown={(event) => {
          if (event.nativeEvent.isComposing) return;
          c.setIsCapsLock(event.getModifierState?.("CapsLock") ?? false);
          if (c.settings.confidenceMode === "on" && event.key === "Backspace") {
            event.preventDefault();
            return;
          }
          if (c.settings.quickRestart === "esc" && event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            c.resetCurrentExercise();
            return;
          }
          if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            c.handleVerify();
          }
        }}
        readOnly={c.status === "correct" || c.status === "almost"}
        placeholder={
          english
            ? c.exercise.english_hint
              ? `English word (${c.exercise.english_hint})`
              : "Type the English word"
            : c.exercise.english_hint
              ? `${c.language.name} for “${c.exercise.english_hint}”`
              : `Type in ${c.language.name}`
        }
      />
      {!english && c.settings.showCharBar !== "off" && (
        <ExpCharBar inputRef={c.inputRef} value={c.userInput} onChange={c.handleInputChange} />
      )}
    </div>
  );
}

function ChoiceInput({ c }: { c: ClassicExerciseController }) {
  const chosen = c.verifiedAttemptText || c.failedAttemptText;
  return (
    <div className="x-ex-input x-choice-list">
      {c.displayOptions.map((option, index) => {
        const state =
          c.status === "idle"
            ? undefined
            : option === c.exercise.target_answer && (c.status === "correct" || c.status === "almost")
              ? "right"
              : option === chosen && c.status === "incorrect"
                ? "wrong"
                : "dim";
        return (
          <button
            key={option}
            type="button"
            className="x-choice"
            data-state={state}
            disabled={c.status !== "idle"}
            onClick={() => c.handleShiftOptionSelect(option)}
            lang={c.language.id}
          >
            <span>{option}</span>
            {c.settings.showKeyTips && <span className="x-tile-key" aria-hidden="true">{index + 1}</span>}
          </button>
        );
      })}
    </div>
  );
}

/** Enter (outside a control) continues; the continue button also takes focus. */
function useContinueKey(active: boolean, onContinue: () => void) {
  const ref = useRef<HTMLButtonElement>(null);
  const latest = useRef(onContinue);
  latest.current = onContinue;
  useEffect(() => {
    if (!active) return;
    const focusTimer = window.setTimeout(() => ref.current?.focus({ preventScroll: true }), 30);
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;
      if (event.key !== "Enter") return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "BUTTON" || target.tagName === "A")) return;
      event.preventDefault();
      latest.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);
  return ref;
}

export function ExpFeedback({
  kind,
  title,
  answerLabel,
  answer,
  answerLang,
  audioText,
  audioLocale,
  attempt,
  lines,
  onGuessed,
  onContinue,
  continueLabel = "Continue",
}: {
  kind: "right" | "almost" | "wrong";
  title: string;
  answerLabel: string;
  answer: string;
  answerLang?: string;
  audioText?: string;
  audioLocale?: string;
  attempt?: string;
  lines: Array<string | null | undefined>;
  onGuessed?: () => void;
  onContinue: () => void;
  continueLabel?: string;
}) {
  const continueRef = useContinueKey(true, onContinue);
  const diff = attempt && kind === "wrong" ? computeLetterDiff(attempt, answer) : null;
  return (
    <section className="x-feedback" data-kind={kind} role="status" aria-live="assertive" aria-label={title}>
      <div className="x-feedback-inner">
        <div style={{ display: "grid", gap: 12 }}>
          <h3 className="x-head">{title}</h3>
          {diff && (
            <p className="x-body">
              <span className="x-strong">You wrote </span>
              <span className="x-strong" lang={answerLang}>
                {diff.userChars.map((ch, index) =>
                  ch.status === "correct" ? (
                    <React.Fragment key={index}>{ch.char}</React.Fragment>
                  ) : (
                    <span key={index} className="x-diff-bad">
                      {ch.char}
                    </span>
                  )
                )}
              </span>
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <p className="x-lead">
              <span className="x-strong">{answerLabel} </span>
              <span className="x-lead-strong" lang={answerLang}>
                {answer}
              </span>
            </p>
            {audioText && (
              <button
                type="button"
                className="x-icon-btn"
                style={{ background: "rgba(255,255,255,.6)" }}
                onClick={() => playTargetAudio(audioText, audioLocale)}
                aria-label="Listen"
              >
                <Volume2 />
              </button>
            )}
          </div>
          {lines.filter(Boolean).map((line, index) => (
            <p key={index} className="x-body">
              {line}
            </p>
          ))}
        </div>
        <div style={{ display: "grid", gap: 8, justifyItems: "stretch", minWidth: 220 }}>
          <button ref={continueRef} type="button" className="x-btn" onClick={onContinue}>
            {continueLabel}
            <ArrowRightIcon />
          </button>
          {onGuessed && (
            <button
              type="button"
              className="x-btn x-btn--ghost x-btn--small"
              onClick={() => {
                onGuessed();
                onContinue();
              }}
            >
              I guessed — bring it back sooner
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export function ExpExercise(props: ExerciseWidgetProps) {
  const c = useClassicExercise(props);
  const { exercise, status } = c;
  const needsCheck = exercise.type !== "shift_select" && exercise.type !== "matching_pairs";
  const showFeedback = c.showErrorSheet || c.showSuccessSheet;
  const foreignAudio = c.isReverseCognate ? c.reverseCognateForeignWord ?? exercise.target_answer : exercise.target_answer;
  const audioLocale = c.isReverseCognate ? (c.reverseCognateForeignWord ? c.language.ttsLocale : "en-US") : c.language.ttsLocale;

  const continueAfterSuccess = React.useCallback(() => {
    c.setShowSuccessSheet(false);
    c.setStatus("idle");
    c.setFeedbackNote(null);
    c.onSuccess();
  }, [c]);

  const continueAfterError = React.useCallback(() => {
    c.setShowErrorSheet(false);
    c.setStatus("idle");
    c.setFeedbackNote(null);
    if (c.isRetry) {
      c.setUserInput("");
      c.setSelectedIndices([]);
      window.setTimeout(() => c.inputRef.current?.focus({ preventScroll: true }), 50);
    } else {
      c.onSuccess();
    }
  }, [c]);

  return (
    <div className="x-ex">
      <div className="x-ex-body">
        <p className="x-small x-strong">
          {c.isRetry ? "One more go" : TYPE_LABEL[exercise.type] ?? "Practice"}
          {exercise.shift_hint ? ` · ${exercise.shift_hint}` : ""}
        </p>

        {c.isAudioFirstSprig ? (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button type="button" className="x-btn" onClick={c.replaySprigAudio} disabled={!c.sprigAudioText}>
                <Volume2 /> Play the word
              </button>
              <button type="button" className="x-btn x-btn--ghost" onClick={() => c.setPromptTextRevealed((v) => !v)}>
                {c.promptTextRevealed ? "Hide the written prompt" : "Show the written prompt"}
              </button>
            </div>
            {(c.promptTextRevealed || status === "correct" || status === "almost") ? (
              <h2 className="x-head x-ex-prompt">{exercise.prompt}</h2>
            ) : (
              <h2 className="x-head x-ex-prompt">Listen, then choose what you heard.</h2>
            )}
          </div>
        ) : (
          <h2 className="x-head x-ex-prompt">{exercise.prompt}</h2>
        )}

        {exercise.vocab_hints && exercise.vocab_hints.length > 0 && (
          <ul className="x-hints" aria-label="Clues">
            {exercise.vocab_hints.map((hint) => (
              <li key={hint.word}>
                <span className="x-strong" lang={c.language.id}>
                  {hint.word}
                </span>{" "}
                = {hint.translation}
                {hint.note ? <span className="x-muted"> ({hint.note})</span> : null}
              </li>
            ))}
          </ul>
        )}

        {exercise.type === "morpheme_tiles" && c.sanitizedTileOptions.length > 0 && <TileInput c={c} bank={c.sanitizedTileOptions} />}
        {exercise.type === "syntax_builder" && c.sanitizedWordBank.length > 0 && <TileInput c={c} bank={c.sanitizedWordBank} />}
        {exercise.type === "matching_pairs" && exercise.matching_pairs && <MatchInput c={c} />}
        {(exercise.type === "derive" || exercise.type === "reverse_cognate") && <TypeInput c={c} />}
        {exercise.type === "shift_select" && c.displayOptions.length > 0 && <ChoiceInput c={c} />}

        <div aria-live="polite" role="status" className="x-ex-note">
          {c.feedbackNote && !showFeedback && <p className="x-body x-strong">{c.feedbackNote}</p>}
        </div>
      </div>

      {!showFeedback && needsCheck && status !== "correct" && status !== "almost" && (
        <div className="x-ex-actions">
          <button type="button" className="x-btn x-btn--go" onClick={c.handleVerify}>
            Check
            {c.settings.showKeyTips && <span className="x-small" aria-hidden="true">Enter</span>}
          </button>
          {(exercise.type === "morpheme_tiles" || exercise.type === "syntax_builder") && c.selectedIndices.length > 0 && (
            <button type="button" className="x-btn x-btn--ghost" onClick={() => c.setSelectedIndices([])}>
              Clear
            </button>
          )}
        </div>
      )}

      {c.showSuccessSheet && (
        <ExpFeedback
          kind={c.sheetVariant === "almost" ? "almost" : "right"}
          title={c.sheetVariant === "almost" ? "Almost — counted." : "Right."}
          answerLabel={c.isReverseCognate ? "English twin:" : "Answer:"}
          answer={exercise.target_answer}
          answerLang={c.isReverseCognate ? "en" : c.language.id}
          audioText={foreignAudio}
          audioLocale={audioLocale}
          lines={[
            exercise.meaning ? `Means “${exercise.meaning}”.` : null,
            c.sheetVariant === "almost" ? c.almostWarningNote : null,
            affirmationFor(exercise.affirmation, exercise.shift_hint) ?? (exercise.explanation ? firstSentence(exercise.explanation) : null),
          ]}
          onGuessed={!c.isRetry ? c.onFlagGuessed : undefined}
          onContinue={continueAfterSuccess}
        />
      )}

      {c.showErrorSheet && (
        <ExpFeedback
          kind="wrong"
          title="Not quite."
          answerLabel={c.isReverseCognate ? "The English twin is" : "It’s"}
          answer={exercise.target_answer}
          answerLang={c.isReverseCognate ? "en" : c.language.id}
          audioText={foreignAudio}
          audioLocale={audioLocale}
          attempt={c.failedAttemptText}
          lines={[
            c.failedDiagnosis ? `${c.failedDiagnosis.slip} — ${c.failedDiagnosis.cue}` : null,
            exercise.explanation ? firstSentence(exercise.explanation) : null,
            c.isRetry ? null : "It comes back at the end of the lesson.",
          ]}
          continueLabel={c.isRetry ? "Try again" : "Continue"}
          onContinue={continueAfterError}
        />
      )}
    </div>
  );
}
