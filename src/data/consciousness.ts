// ponytail: recurring learning-consciousness lines (guidebook §1.10 + §1.8)
//
// The posture primer teaches these once, properly. The guidebook wants them
// *re-whispered* — and warns just as firmly that doing it always "will irritate
// our learner rather than empower them". So: ONE line per lesson, on roughly one
// lesson in seven, chosen deterministically from the lesson id. Stable across
// renders, never random, and never twice in a row on the spine.

/** A lesson is a "consciousness stop" when its id is congruent to this mod 7. */
const STOP_MODULUS = 7;
const STOP_REMAINDER = 3;

/** Five lines, one per offset — all about the learner's process, none a grammar rule. */
const LINES: Record<number, string> = {
  0: "Your mind will want to answer that from memory. Don't. Find it again — memory fades, a law doesn't.",
  1: "If a word slips, it isn't gone. You know the shape it hides in — work backwards from the English.",
  2: "You are allowed not to know yet. Everything here comes back in Review; nothing is lost by moving on.",
  3: "The course will offer you a shorter way round. Take the long one once — that is where the rule lives.",
  4: "You don't have to hold on to any of this. Knowing how to rebuild a word beats remembering it.",
  5: "Slow is smooth. Think it through, then answer — the thinking is the exercise, not the answer.",
  6: "Nothing here is a test. A wrong answer is a rep, and the queue at the end is the second half of it.",
};

/** The one line for this lesson, or null when this lesson is not a stop. */
export function consciousnessLineFor(lessonId: number): string | null {
  if (lessonId % STOP_MODULUS !== STOP_REMAINDER) return null;
  return LINES[lessonId % (Object.keys(LINES).length + 1)] ?? LINES[0];
}

/** How often a lesson is a stop — exported so the tests can assert it stays sparse. */
export const CONSCIOUSNESS_EVERY = STOP_MODULUS;
