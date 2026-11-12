import type { ExerciseItem, SentenceCard } from "./types";
import { createInitialCard, gradeCard, localDateKey, type ReviewGrade } from "./srs";

const PROCESS_TYPES: Partial<Record<ExerciseItem["type"], true>> = {
  transcribe: true, literal_gloss: true, syntax_builder: true, dictation: true,
  variant_english: true, pronoun_compression: true, spoken_turn_reply: true,
};
export const SENTENCE_SESSION_LIMIT = 15;
export function isSentenceProcess(exercise: ExerciseItem): boolean {
  return Boolean(PROCESS_TYPES[exercise.type]) && Boolean(exercise.target_answer.trim());
}
export function sentenceCardId(lessonId: number, exerciseId: string): string {
  return `${lessonId}:${exerciseId}`;
}
export function gradeSentenceCard(card: SentenceCard, grade: ReviewGrade, now = new Date()): SentenceCard {
  const { word_id: _id, ...schedule } = gradeCard({ ...card, word_id: card.id }, grade, now);
  return { ...schedule, id: card.id, lessonId: card.lessonId, exerciseId: card.exerciseId };
}
export function failedSentenceCard(lessonId: number, exercise: ExerciseItem, current?: SentenceCard, now = new Date()): SentenceCard {
  const id = sentenceCardId(lessonId, exercise.id);
  const { word_id: _id, ...schedule } = createInitialCard(id);
  // First failure is immediately actionable. Later failures use the same SM-2
  // lapse step as review, never silently replacing an established schedule.
  if (current) return { ...gradeSentenceCard(current, 1, now), due_date: current.due_date < localDateKey(now) ? current.due_date : localDateKey(now) };
  return { ...schedule, id, lessonId, exerciseId: exercise.id, lapses: 1, due_date: localDateKey(now), last_reviewed: now.toISOString() };
}
export function dueSentenceCards(cards: Record<string, SentenceCard>, today = localDateKey()): SentenceCard[] {
  return Object.values(cards).filter((card) => card && card.due_date <= today)
    .sort((a, b) => a.due_date.localeCompare(b.due_date) || b.lapses - a.lapses || a.id.localeCompare(b.id));
}
export function prepareSentenceSession(cards: Record<string, SentenceCard>, today = localDateKey()): SentenceCard[] {
  return dueSentenceCards(cards, today).slice(0, SENTENCE_SESSION_LIMIT);
}
