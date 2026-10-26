"use client";

// TM-6 (guidebook §1.10): one thought, several valid English renderings. The
// guidebook's move is to show the learner that the *idea* can be phrased several
// ways in English ("I'll pick him up" / "I'll collect him") so that they stop
// matching words and start matching meaning. This exercise is the inverse of
// literal_gloss: there the odd word-for-word English was the answer; here the
// odd-but-tempting English is the trap, and *every* natural rendering counts.
//
// Deliberate design constraint: nothing is marked wrong for being "less literal".
// A rendering is only a trap when it changes the thought (wrong person, wrong
// tense, wrong object) or smuggles in a word the target language never said.

import React, { useState, useEffect } from "react";
import { Languages, Check, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { soundEngine } from "@/lib/sound";
import { affirmationFor } from "@/lib/shift-diagnosis";
import { getLanguageDefinition } from "@/data/languages";
import type { ExerciseItem } from "@/lib/types";

interface VariantEnglishExerciseProps {
  exercise: ExerciseItem;
  isRetry?: boolean;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  onQueueRetry?: () => void;
  /** TM-6: the learner got it right but did not trust it (§1.8/§1.9) */
  onFlagGuessed?: () => void;
}

const shuffleDeterministic = <T,>(arr: T[], salt: string): T[] => {
  let h = 0;
  for (let i = 0; i < salt.length; i++) h = (h * 31 + salt.charCodeAt(i)) | 0;
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

export const VariantEnglishExercise: React.FC<VariantEnglishExerciseProps> = ({
  exercise,
  isRetry = false,
  onSuccess,
  onError,
  onQueueRetry,
  onFlagGuessed,
}) => {
  const [picked, setPicked] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");
  const settings = useAppStore((s) => s.settings);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  const renderings = exercise.renderings ?? [];
  const traps = exercise.traps ?? [];
  const options = React.useMemo(
    () => shuffleDeterministic([...renderings, ...traps], exercise.id),
    [exercise.id]
  );
  const affirmation = affirmationFor(exercise.affirmation, exercise.shift_hint);

  useEffect(() => {
    setPicked([]);
    setState("idle");
  }, [exercise.id]);

  const toggle = (opt: string) => {
    if (state !== "idle") return;
    setPicked((prev) => (prev.includes(opt) ? prev.filter((p) => p !== opt) : [...prev, opt]));
  };

  const submit = () => {
    const valid = new Set(renderings);
    const exact = picked.length === valid.size && picked.every((p) => valid.has(p));
    if (exact) {
      setState("correct");
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    } else {
      setState("wrong");
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
      onError("spelling");
      onQueueRetry?.();
    }
  };

  return (
    <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/25 space-y-5 shadow-lg font-mono">
      <div className="flex items-center justify-between border-b border-[var(--sub-color)]/15 pb-3">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-[var(--main-color)]" />
          <span className="text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
            {isRetry ? "retry exercise" : "every way to say it"}
          </span>
        </div>
      </div>

      <p className="text-base text-[var(--text-color)] font-bold leading-snug">{exercise.prompt}</p>

      <div className="p-4 rounded-lg bg-[var(--bg-color)] border-l-4 border-[var(--main-color)]">
        <p className="text-lg text-[var(--main-color)] font-bold">{exercise.german}</p>
        {exercise.meaning && (
          <p className="text-xs text-[var(--sub-color)] mt-1">a natural English: {exercise.meaning}</p>
        )}
      </div>

      <div className="space-y-2">
        {options.map((opt, i) => {
          const isPicked = picked.includes(opt);
          const isTrap = traps.includes(opt);
          const revealed = state !== "idle";
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              disabled={revealed}
              className={[
                "w-full text-left px-4 py-3 rounded border flex items-start gap-3 transition",
                isPicked
                  ? "border-[var(--main-color)] bg-[var(--main-color)]/10"
                  : "border-[var(--sub-color)]/25 bg-[var(--bg-color)] hover:border-[var(--main-color)]/40",
                revealed && isTrap ? "opacity-50" : "",
              ].join(" ")}
            >
              <span className="text-[var(--sub-color)] font-mono text-xs pt-0.5">{i + 1}</span>
              <span className="flex-1 text-[var(--text-color)]">{opt}</span>
              {revealed && (
                isTrap ? (
                  <X className="w-4 h-4 text-[var(--error-color)] shrink-0" />
                ) : (
                  <Check className="w-4 h-4 text-[var(--main-color)] shrink-0" />
                )
              )}
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-[var(--sub-color)]">
        Select <strong className="text-[var(--main-color)]">every</strong> English that says the same thing.
        {state === "idle" && " Nothing is wrong for being less literal — only for saying something else."}
      </p>

      {picked.length > 0 && state === "idle" && (
        <button
          onClick={submit}
          className="w-full py-3 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-semibold"
        >
          Check
        </button>
      )}

      {state === "correct" && (
        <div className="space-y-2" aria-live="polite" role="status">
          <p className="text-sm text-[var(--main-color)] font-semibold">
            {affirmation || `Every one of those is the same thought. ${language.name} has one shape for all of them.`}
          </p>
          {exercise.explanation && (
            <p className="text-xs text-[var(--sub-color)] leading-relaxed">{exercise.explanation}</p>
          )}
          {!isRetry && onFlagGuessed && (
            <button
              type="button"
              onClick={() => {
                onFlagGuessed();
                setState("idle");
                setPicked([]);
                onSuccess();
              }}
              className="w-full py-2 rounded border border-[var(--sub-color)]/30 text-[var(--sub-color)] hover:text-[var(--text-color)] hover:border-[var(--main-color)]/40 font-mono text-[11px] transition cursor-pointer"
            >
              I guessed — bring this one back sooner
            </button>
          )}
          <button
            onClick={() => {
              setState("idle");
              setPicked([]);
              onSuccess();
            }}
            className="w-full py-3 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-semibold"
          >
            Continue
          </button>
        </div>
      )}

      {state === "wrong" && (
        <div className="space-y-2">
          <p className="text-sm text-[var(--text-color)]">
            The ones that say the same thing: {renderings.join(" · ")}
          </p>
          {exercise.explanation && (
            <p className="text-xs text-[var(--sub-color)] leading-relaxed">{exercise.explanation}</p>
          )}
          <button
            onClick={() => {
              setState("idle");
              setPicked([]);
              if (!isRetry) {
                onSuccess();
              }
            }}
            className="w-full py-3 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-semibold"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
