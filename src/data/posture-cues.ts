// TM-4b whisper-cues: posture micro-lines rendered above the Practice header.
// P4/P8 law: teach posture once (the primer), whisper it sparsely — at most twice
// per lesson, deterministic per lesson (no churn between renders), never twice the
// same line, never graded. Cues are pacing and framing instructions, not teacher
// energy (§1.8, §2.3).

import type { ExerciseType } from "@/lib/types";
import { hashSeed } from "@/lib/prng";

export type PostureCueSlot =
  | "derive"
  | "transcribe"
  | "matching_pairs"
  | "syntax_builder"
  | "literal_gloss"
  | "default";

export const POSTURE_CUES: Record<PostureCueSlot, string[]> = {
  transcribe: [
    "Build the thought first: who, what, when — then let the language order them.",
    "Say it out loud before you type. Your mouth is a second editor.",
  ],
  derive: ["Hear the shift before you spell it — p? t? th? Let the English word tell you."],
  matching_pairs: ["Don't memorize pairs — read each target word through its pattern."],
  syntax_builder: ["Find the verb's seat first. Everything else pours around it."],
  literal_gloss: ["The odd English is the lesson. Ask why it's odd."],
  default: ["Slow is smooth. Think it through, then answer."],
};

const WHISPER_SLOT_POSITIONS = [0, 3];

/** Stable across renders and sessions, no randomness. */
function hashLessonId(lessonId: number): number {
  return hashSeed(`lesson-${lessonId}`);
}

function poolFor(slot: PostureCueSlot): string[] {
  return POSTURE_CUES[slot] ?? POSTURE_CUES.default;
}

/**
 * Deterministic whisper-cue plan for one lesson: at most two lines, rendered before
 * exercise index 0 and (for lessons with ≥ 4 exercises) before index 3. The cue is
 * chosen from the pool of the exercise type at that position; a line never appears
 * twice in one lesson (collisions fall through to the default pool, then to no cue).
 * Returns a map of exercise index → cue text.
 */
export function whisperCuesForLesson(
  lessonId: number,
  exerciseTypes: ExerciseType[],
  enabled: boolean
): Record<number, string> {
  if (!enabled) return {};
  const hash = hashLessonId(lessonId);
  const used = new Set<string>();
  const plan: Record<number, string> = {};

  for (let slotNumber = 0; slotNumber < WHISPER_SLOT_POSITIONS.length; slotNumber++) {
    const position = WHISPER_SLOT_POSITIONS[slotNumber];
    const type = exerciseTypes[position];
    if (!type) continue;

    const pools: PostureCueSlot[] = [
      type as PostureCueSlot,
      ...((type as PostureCueSlot) !== "default" ? ["default" as PostureCueSlot] : []),
    ];

    let chosen: string | null = null;
    for (const pool of pools) {
      const candidates = poolFor(pool);
      for (let attempt = 0; attempt < candidates.length; attempt++) {
        const candidate = candidates[(hash + slotNumber + attempt) % candidates.length];
        if (!used.has(candidate)) {
          chosen = candidate;
          break;
        }
      }
      if (chosen) break;
    }
    if (chosen) {
      used.add(chosen);
      plan[position] = chosen;
    }
  }
  return plan;
}
