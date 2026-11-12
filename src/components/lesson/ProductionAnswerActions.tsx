import { AlertCircle, Check, Sparkles } from "lucide-react";
import type { ExerciseStatus } from "./classic-exercise-types";

export function ProductionAnswerActions({ status, feedback, onVerify, action, showKeyTips = false }: {
  status: ExerciseStatus;
  feedback: string | null;
  onVerify: () => void;
  action: string;
  showKeyTips?: boolean;
}) {
  const complete = status === "correct" || status === "almost";
  return (
    <div className="pt-3 border-t border-[var(--sub-color)]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div role="status" aria-live="polite" aria-atomic="true">
        {feedback && (
          <p className={`text-xs font-mono flex items-center gap-1.5 ${status === "correct" ? "text-[var(--main-color)]" : status === "incorrect" ? "text-[var(--error-color)]" : "text-[var(--sub-color)]"}`}>
            {status === "correct" ? <Check aria-hidden="true" className="w-4 h-4" />
              : status === "almost" ? <Sparkles aria-hidden="true" className="w-4 h-4" />
                : <AlertCircle aria-hidden="true" className="w-4 h-4" />}
            <span>{feedback}</span>
          </p>
        )}
      </div>
      {!complete && (
        <button type="button" onClick={onVerify} className="px-5 py-2 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-xs transition cursor-pointer ml-auto flex items-center gap-1.5">
          <span>{action}</span>
          {showKeyTips && <span aria-hidden="true" className="keycap text-[10px]">enter</span>}
        </button>
      )}
    </div>
  );
}
