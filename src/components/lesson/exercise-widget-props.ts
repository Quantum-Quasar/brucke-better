import type { ExerciseItem } from "@/lib/types";

export interface ExerciseWidgetProps {
  exercise: ExerciseItem;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  isRetry?: boolean;
  /** Final sentence: start with typing; words and grammar help remain optional and free. */
  recallFirst?: boolean;
  onQueueRetry?: () => void;
  /** TM-6: the learner got it right but did not trust it (guidebook §1.8/§1.9) */
  onFlagGuessed?: () => void;
  /** Earlier production drills retain their authored cue penalty; final recall help is free. */
  onPurpleForfeit?: () => void;
}
