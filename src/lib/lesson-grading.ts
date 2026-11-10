import { evaluateBestOf, type EvaluationOptions, type EvaluationResult } from "./letter-diff";

/** Grammar omissions never satisfy production; reinforcement must correct spelling. */
export function gradeLessonAnswer(
  answers: string[],
  targets: string[],
  options: EvaluationOptions,
  isRetry = false
): { result: EvaluationResult; answer: string; target: string } {
  const rank = { incorrect: 0, almost: 1, exact: 2 };
  const grade = (target: string) => {
    const best = evaluateBestOf(answers, target, options);
    const result = best.result;
    const requiresCorrection = result.accuracy === "almost" && (
      result.reason === "infinitive" || result.reason === "article" ||
      (isRetry && result.reason !== "case")
    );
    return { ...best, target, result: requiresCorrection ? { ...result, accuracy: "incorrect" as const } : result };
  };
  let best = grade(targets[0]);
  for (const target of targets.slice(1)) {
    const candidate = grade(target);
    if (rank[candidate.result.accuracy] > rank[best.result.accuracy]) best = candidate;
    if (best.result.accuracy === "exact") break;
  }
  return best;
}
