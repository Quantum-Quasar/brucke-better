import { gradeLessonAnswer } from "./lesson-grading";
import type { ExerciseItem } from "./types";

export interface GateQuestion {
  lesson: string;
  lessonId: number;
  prompt: string;
  options: string[];
  answer: string;
  acceptedAnswers?: string[];
  mode?: "choice" | "typed";
  sourceType?: ExerciseItem["type"];
  hint?: string;
}

export interface GateRemediationLesson {
  lessonId: number;
  title: string;
  missedCount: number;
}

export interface GateLessonSource {
  id: number;
  title: string;
  exercises: ExerciseItem[];
}

export interface SelectGateQuestionOptions {
  preferProduction?: boolean;
  avoidTypes?: ExerciseItem["type"][];
  attempt?: number;
}

const CHOICE_PRIORITY: Array<"literal_gloss" | "shift_select" | "matching_pairs"> = [
  "literal_gloss",
  "shift_select",
  "matching_pairs",
];

const PRODUCTION_PRIORITY: Array<"derive" | "reverse_cognate" | "literal_gloss" | "shift_select" | "matching_pairs"> = [
  "derive",
  "reverse_cognate",
  "literal_gloss",
  "shift_select",
  "matching_pairs",
];

function isCleanProductionTarget(target: string): boolean {
  const trimmed = target.trim();
  if (!trimmed || trimmed.length > 48) return false;
  if (/[/()|]/.test(trimmed)) return false;
  const words = trimmed.split(/\s+/);
  return words.length >= 1 && words.length <= 3;
}

function collectCandidatesForType(
  lesson: string,
  lessonId: number,
  exercises: ExerciseItem[],
  type: "derive" | "reverse_cognate" | "literal_gloss" | "shift_select" | "matching_pairs",
  attempt: number,
): GateQuestion[] {
  const out: GateQuestion[] = [];

  if (type === "derive" || type === "reverse_cognate") {
    for (const exercise of exercises) {
      if (exercise.type !== type || !exercise.target_answer?.trim() || !exercise.prompt?.trim()) continue;
      const target = exercise.target_answer.trim();
      if (!isCleanProductionTarget(target)) continue;
      if (exercise.prompt.toLocaleLowerCase().includes(target.toLocaleLowerCase())) continue;
      const acceptedAnswers = exercise.accepted_answers?.map((a) => a.trim()).filter(Boolean);
      out.push({
        lesson,
        lessonId,
        prompt: exercise.prompt.trim(),
        options: [],
        answer: target,
        ...(acceptedAnswers && acceptedAnswers.length > 0 ? { acceptedAnswers } : {}),
        mode: "typed",
        sourceType: type,
      });
    }
    return out;
  }

  if (type === "literal_gloss" || type === "shift_select") {
    for (const exercise of exercises) {
      if (exercise.type !== type || !exercise.target_answer?.trim() || !exercise.prompt?.trim()) continue;
      const source = type === "literal_gloss" ? exercise.german?.trim() : "";
      if (type === "literal_gloss" && !source) continue;
      const prompt = source ? `${exercise.prompt}\n${source}` : exercise.prompt;
      const options = exercise.options?.filter((option) => option.trim()) ?? [];
      if (options.length < 2 || new Set(options).size !== options.length || !options.includes(exercise.target_answer)) continue;
      if (prompt.toLocaleLowerCase().includes(exercise.target_answer.trim().toLocaleLowerCase())) continue;
      out.push({
        lesson,
        lessonId,
        prompt,
        options: rotate(options, lessonId + attempt),
        answer: exercise.target_answer,
        mode: "choice",
        sourceType: type,
      });
    }
    return out;
  }

  for (const exercise of exercises) {
    if (exercise.type !== "matching_pairs" || !exercise.matching_pairs) continue;
    const pairs = exercise.matching_pairs.filter((pair) => pair.english?.trim() && pair.german?.trim());
    for (const pair of pairs) {
      const options = [...new Set(pairs.map((item) => item.german))];
      if (options.length < 2 || pair.english.toLocaleLowerCase().includes(pair.german.toLocaleLowerCase())) continue;
      if (pairs.some((item) => item !== pair && item.english.toLocaleLowerCase() === pair.english.toLocaleLowerCase() && item.german !== pair.german)) continue;
      out.push({
        lesson,
        lessonId,
        prompt: `Choose the translation for: ${pair.english}`,
        options: rotate(options, lessonId + attempt),
        answer: pair.german,
        mode: "choice",
        sourceType: "matching_pairs",
      });
    }
  }

  return out;
}

/** Select a graded exercise without treating one possible free translation as the only answer. */
export function selectGateQuestion(
  lesson: string,
  lessonId: number,
  exercises: ExerciseItem[],
  options: SelectGateQuestionOptions = {},
): GateQuestion | null {
  const { preferProduction = false, avoidTypes = [], attempt = 0 } = options;
  const baseOrder = preferProduction ? PRODUCTION_PRIORITY : CHOICE_PRIORITY;
  const preferredOrder = [
    ...baseOrder.filter((type) => !avoidTypes.includes(type)),
    ...baseOrder.filter((type) => avoidTypes.includes(type)),
  ];

  for (const type of preferredOrder) {
    const candidates = collectCandidatesForType(lesson, lessonId, exercises, type, attempt);
    if (candidates.length > 0) {
      return candidates[attempt % candidates.length];
    }
  }
  return null;
}

/** Assemble varied gate questions across lessons, preferring active production items and avoiding monotony. */
export function assembleGateQuestions(lessons: GateLessonSource[], attempt = 0): GateQuestion[] {
  const questions: GateQuestion[] = [];
  let lastType: ExerciseItem["type"] | undefined;

  for (let index = 0; index < lessons.length; index += 1) {
    const lesson = lessons[index];
    const question = selectGateQuestion(lesson.title, lesson.id, lesson.exercises, {
      preferProduction: true,
      avoidTypes: lastType ? [lastType] : [],
      attempt: attempt + index,
    });
    if (question) {
      questions.push(question);
      lastType = question.sourceType;
    }
  }

  return questions;
}

function rotate(options: string[], seed: number): string[] {
  const offset = seed % options.length;
  return [...options.slice(offset), ...options.slice(0, offset)];
}

export function scoreGateAnswers(questions: GateQuestion[], answers: string[]): boolean[] {
  return questions.map((question, index) => {
    const given = (answers[index] ?? "").trim();
    if (question.mode === "typed") {
      if (!given) return false;
      const targets = [question.answer, ...(question.acceptedAnswers ?? [])];
      const graded = gradeLessonAnswer(
        [given],
        targets,
        {
          umlautTolerance: true,
          capitalizationTolerance: true,
          languageId: question.sourceType === "reverse_cognate" ? "en" : "de",
          allowGermanV2: false,
          allowGermanRegister: false,
        },
        false,
      );
      return graded.result.accuracy === "exact" || graded.result.accuracy === "almost";
    }
    return given === question.answer;
  });
}

export function hasPassedGateAssessment(results: boolean[]): boolean {
  return results.length > 0 && results.filter(Boolean).length >= Math.ceil(results.length * 0.8);
}

/** Map missed checkpoint questions back to up to `maxLessons` unique source lessons for targeted review. */
export function getMissedGateLessons(
  questions: GateQuestion[],
  results: boolean[],
  maxLessons = 3,
): GateRemediationLesson[] {
  const byLesson = new Map<number, GateRemediationLesson>();
  const order: number[] = [];

  for (let index = 0; index < questions.length; index += 1) {
    if (results[index]) continue;
    const question = questions[index];
    const existing = byLesson.get(question.lessonId);
    if (existing) {
      existing.missedCount += 1;
    } else {
      order.push(question.lessonId);
      byLesson.set(question.lessonId, {
        lessonId: question.lessonId,
        title: question.lesson,
        missedCount: 1,
      });
    }
  }

  return order
    .map((id) => byLesson.get(id)!)
    .sort((a, b) => b.missedCount - a.missedCount)
    .slice(0, Math.max(0, maxLessons));
}
