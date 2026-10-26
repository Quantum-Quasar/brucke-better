// TM-3 slip diagnosis: map an incorrect attempt back to the sound-shift law the
// learner violated, so the error sheet can say WHY and not just WHERE (guidebook §1.9).
// Automatically detects the active language from the store (or accepts an explicit
// languageId / table override) so German, Spanish, and French each run their own
// philological slip rules.

import { getLevenshteinDistance } from "./letter-diff";
import {
  DIAGNOSIS_BY_LANGUAGE,
  GERMAN_DIAGNOSIS,
  type DiagnosisRow,
} from "@/data/shift-diagnosis-table";
import shiftNamesJson from "@/data/shift-names.json";
import { useAppStore } from "./store";
import type { ExerciseDiagnosis } from "./types";

type ShiftName = { id: string; symbol: string; name: string };
const SHIFT_NAMES = shiftNamesJson as Record<string, ShiftName[]>;

export type DiagnosisTable = Record<string, DiagnosisRow>;
export type Diagnosis = ExerciseDiagnosis;

const LENGTH_DIFF_GUARD = 10;

const stripPunctuation = (s: string) =>
  s
    .trim()
    .replace(/^[¿¡\s]+/, "")
    .replace(/[.,!?;:]+$/, "");
const lowercase = (s: string) => stripPunctuation(s).toLowerCase();

interface LetterLaw {
  family: string;
  from: string;
  to: string[];
  tolerance: number;
}

// German High German Consonant Shift laws
const GERMAN_LETTER_LAWS: LetterLaw[] = [
  { family: "th_to_d", from: "th", to: ["d"], tolerance: 1 },
  { family: "y_gh_to_g_ch", from: "gh", to: ["ch"], tolerance: 1 },
  { family: "sch_spelling", from: "s", to: ["sch"], tolerance: 1 },
  { family: "p_to_pf_f", from: "p", to: ["pf", "ff", "f"], tolerance: 1 },
  { family: "t_to_s_ss_z", from: "t", to: ["ss", "s", "ß", "z"], tolerance: 1 },
  { family: "k_to_ch", from: "k", to: ["ch"], tolerance: 1 },
  { family: "d_to_t", from: "d", to: ["t"], tolerance: 1 },
  { family: "v_to_b", from: "v", to: ["b"], tolerance: 1 },
  { family: "v_to_b", from: "f", to: ["b"], tolerance: 1 },
  { family: "y_gh_to_g_ch", from: "y", to: ["g"], tolerance: 1 },
];

// Spanish Romance palatalization & consonant evolution laws
const SPANISH_LETTER_LAWS: LetterLaw[] = [
  { family: "tion_to_cion", from: "tion", to: ["ción", "cion"], tolerance: 1 },
  { family: "ty_to_dad", from: "ty", to: ["dad", "tad"], tolerance: 1 },
  { family: "ty_to_dad", from: "idad", to: ["ad"], tolerance: 1 },
  { family: "ct_to_ch", from: "ct", to: ["ch"], tolerance: 1 },
  { family: "pl_cl_to_ll", from: "pl", to: ["ll"], tolerance: 1 },
  { family: "pl_cl_to_ll", from: "cl", to: ["ll"], tolerance: 1 },
  { family: "pl_cl_to_ll", from: "fl", to: ["ll"], tolerance: 1 },
  { family: "f_to_h", from: "f", to: ["h"], tolerance: 1 },
  { family: "li_to_j", from: "li", to: ["j"], tolerance: 1 },
];

// French lenition, circumflex S-drop, and Frankish W -> GU laws
const FRENCH_LETTER_LAWS: LetterLaw[] = [
  { family: "ty_to_ite", from: "ty", to: ["ité", "ite", "té", "te"], tolerance: 1 },
  { family: "or_to_eur", from: "or", to: ["eur"], tolerance: 1 },
  { family: "s_drop_circumflex", from: "es", to: ["ê", "e"], tolerance: 1 },
  { family: "s_drop_circumflex", from: "os", to: ["ô", "o"], tolerance: 1 },
  { family: "s_drop_circumflex", from: "is", to: ["î", "i"], tolerance: 1 },
  { family: "s_drop_circumflex", from: "as", to: ["â", "a"], tolerance: 1 },
  { family: "w_to_gu_g", from: "w", to: ["gu", "g"], tolerance: 1 },
  { family: "c_to_ch", from: "ca", to: ["cha", "ch"], tolerance: 1 },
];

const LETTER_LAWS_BY_LANGUAGE: Record<string, LetterLaw[]> = {
  de: GERMAN_LETTER_LAWS,
  es: SPANISH_LETTER_LAWS,
  fr: FRENCH_LETTER_LAWS,
};

const VOWELS = /[aeiouäöüáéíóúàâèêëîïôùû]/g;

function resolveActiveLanguageId(languageId?: string): string {
  if (languageId) return languageId;
  return (
    (typeof useAppStore?.getState === "function" ? useAppStore.getState().activeLanguageId : "de") ??
    "de"
  );
}

function diagnoseAblaut(target: string, attempt: string, table: DiagnosisTable): Diagnosis | null {
  const targetSkeleton = target.replace(VOWELS, "");
  const attemptSkeleton = attempt.replace(VOWELS, "");
  if (!targetSkeleton || targetSkeleton !== attemptSkeleton) return null;
  const targetVowels = target.match(VOWELS)?.join("") ?? "";
  const attemptVowels = attempt.match(VOWELS)?.join("") ?? "";
  if (targetVowels === attemptVowels) return null;
  return table.strong_verbs_ablaut ?? null;
}

function diagnoseIeren(target: string, attempt: string, table: DiagnosisTable): Diagnosis | null {
  if (!target.endsWith("ieren") || attempt.endsWith("ieren")) return null;
  if (getLevenshteinDistance(attempt, target) > 3) return null;
  return table.latin_ieren ?? null;
}

function diagnoseSpanishAtStem(
  target: string,
  attempt: string,
  table: DiagnosisTable
): Diagnosis | null {
  // e.g. target "celebrar" vs attempt "celebratar", or "crear" vs "creatar"
  if (!target.endsWith("ar") || !attempt.includes("at")) return null;
  const collapsed = attempt.replace(/at(?=ar$|a$|an$|as$|amos$)/, "");
  if (collapsed === target || getLevenshteinDistance(collapsed, target) <= 1) {
    return table.no_at_in_ar ?? null;
  }
  return null;
}

function diagnoseFrenchAtionVerb(
  target: string,
  attempt: string,
  table: DiagnosisTable
): Diagnosis | null {
  // e.g. target "préparer" vs attempt "préparationer" or "preparater"
  if (!target.endsWith("er") || (!attempt.includes("at") && !attempt.includes("ation"))) {
    return null;
  }
  const collapsed = attempt
    .replace(/ation(?=er$|e$|es$|ons$|ez$|ent$)/, "")
    .replace(/at(?=er$|e$|es$|ons$|ez$|ent$)/, "");
  if (getLevenshteinDistance(collapsed, target) <= 1) {
    return table.ation_to_er ?? null;
  }
  return null;
}

/**
 * Diagnose an incorrect attempt against its target. Automatically selects the active
 * language's shift laws and diagnosis table unless an explicit `table` or `languageId`
 * is provided.
 */
export function diagnoseAttempt(
  target: string,
  attempt: string,
  _shiftHint?: string,
  table?: DiagnosisTable,
  languageId?: string
): Diagnosis | null {
  const langId = resolveActiveLanguageId(languageId);
  const activeTable = table ?? DIAGNOSIS_BY_LANGUAGE[langId] ?? GERMAN_DIAGNOSIS;
  const laws = LETTER_LAWS_BY_LANGUAGE[langId] ?? GERMAN_LETTER_LAWS;

  const t = lowercase(target);
  const a = lowercase(attempt);
  if (!t || !a || t === a) return null;
  if (Math.abs(t.length - a.length) > LENGTH_DIFF_GUARD) return null;

  const rawDistance = getLevenshteinDistance(a, t);

  for (const law of laws) {
    if (!a.includes(law.from)) continue;
    for (const to of law.to) {
      const transformed = a.split(law.from).join(to);
      const transformedDistance = getLevenshteinDistance(transformed, t);
      if (transformedDistance <= law.tolerance && transformedDistance < rawDistance) {
        return activeTable[law.family] ?? null;
      }
    }
  }

  if (langId === "es") {
    return diagnoseSpanishAtStem(t, a, activeTable);
  }
  if (langId === "fr") {
    return diagnoseFrenchAtionVerb(t, a, activeTable);
  }
  return diagnoseIeren(t, a, activeTable) ?? diagnoseAblaut(t, a, activeTable);
}

/**
 * TM-3 affirmation: the authored process-affirmation, or the auto-fallback
 * "{family name} again — you're starting to hear it everywhere." when the exercise
 * carries a shift_hint. Undefined when neither exists.
 */
export function affirmationFor(
  affirmation: string | undefined,
  shiftHint: string | undefined,
  languageId?: string
): string | undefined {
  if (affirmation) return affirmation;
  if (!shiftHint) return undefined;
  return `${resolveShiftFamilyName(shiftHint, languageId)} again — you're starting to hear it everywhere.`;
}

/**
 * Resolve a free-text shift_hint ("P → F", "TH → D", "F → H", "S → ˆ") to the
 * active language's Atlas family display name. Matches the full symbol, then the
 * left-hand side of the arrow. Falls back to the hint text itself for non-family hints.
 */
export function resolveShiftFamilyName(shiftHint: string, languageId?: string): string {
  const langId = resolveActiveLanguageId(languageId);
  const families = SHIFT_NAMES[langId] ?? SHIFT_NAMES.de ?? [];
  const hint = shiftHint.trim();
  const hintLhs = hint.split("→")[0]?.trim().toUpperCase();
  let lhsMatch: string | null = null;
  for (const family of families) {
    if (family.symbol.toUpperCase() === hint.toUpperCase()) return family.name;
    if (hintLhs && family.symbol.split("→")[0]?.trim().toUpperCase() === hintLhs) {
      lhsMatch = family.name;
    }
  }
  return lhsMatch ?? hint;
}
