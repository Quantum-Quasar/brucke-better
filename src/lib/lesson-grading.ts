import { expandGermanTargets } from "./german-alternatives";
import { evaluateBestOf, type EvaluationOptions, type EvaluationResult } from "./letter-diff";
import { useAppStore } from "./store";

export interface LessonGradingOptions extends EvaluationOptions {
  /** Enable automatic German V2 time/place-adverb inversion equivalence (default: true for German). */
  allowGermanV2?: boolean;
  /** Enable automatic German `du`/`ihr`/`Sie` register equivalence for unspecified-"you" prompts. */
  allowGermanRegister?: boolean;
}

function isGermanGrading(options: LessonGradingOptions): boolean {
  const activeId =
    options.languageId ??
    (typeof useAppStore?.getState === "function" ? useAppStore.getState().activeLanguageId : "de") ??
    "de";
  return activeId === "de";
}

/** Grammar omissions never satisfy production; reinforcement must correct spelling. */
export function gradeLessonAnswer(
  answers: string[],
  targets: string[],
  options: LessonGradingOptions,
  isRetry = false
): { result: EvaluationResult; answer: string; target: string } {
  const authoredTargets = new Set(targets.map((t) => t.trim()).filter(Boolean));
  const effectiveTargets = isGermanGrading(options)
    ? expandGermanTargets(targets, {
        allowV2: options.allowGermanV2 ?? true,
        allowRegister: options.allowGermanRegister ?? false,
      })
    : targets;
  const rank = { incorrect: 0, almost: 1, exact: 2 };
  const grade = (target: string, isGenerated: boolean) => {
    const best = evaluateBestOf(answers, target, options);
    const result = best.result;
    if (isGenerated) {
      // Generated alternatives only accept exact or case-only matches (never typo/umlaut tolerance)
      // and never quote a generated string in warningNote.
      if (result.accuracy === "almost" && result.reason !== "case") {
        return { ...best, target, result: { ...result, accuracy: "incorrect" as const, warningNote: undefined } };
      }
      if (result.accuracy === "almost" && result.reason === "case") {
        return {
          ...best,
          target,
          result: {
            ...result,
            warningNote: "Almost right! Watch German capitalization at sentence starts and on nouns.",
          },
        };
      }
      return { ...best, target, result };
    }
    const requiresCorrection = result.accuracy === "almost" && (
      result.reason === "infinitive" || result.reason === "article" ||
      (isRetry && result.reason !== "case")
    );
    return { ...best, target, result: requiresCorrection ? { ...result, accuracy: "incorrect" as const } : result };
  };
  let best = grade(effectiveTargets[0], !authoredTargets.has(effectiveTargets[0]?.trim() ?? ""));
  for (const target of effectiveTargets.slice(1)) {
    const isGenerated = !authoredTargets.has(target.trim());
    const candidate = grade(target, isGenerated);
    if (rank[candidate.result.accuracy] > rank[best.result.accuracy]) best = candidate;
    if (best.result.accuracy === "exact") break;
  }
  return best;
}
