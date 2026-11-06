import type { ExerciseItem } from "@/lib/types";

export interface ExerciseWidgetProps {
  exercise: ExerciseItem;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  isRetry?: boolean;
  onQueueRetry?: () => void;
  /** TM-6: the learner got it right but did not trust it (guidebook §1.8/§1.9) */
  onFlagGuessed?: () => void;
  /** TM-1: using a transcribe cue ladder forfeits the purple star (help is honest) */
  onPurpleForfeit?: () => void;
}
