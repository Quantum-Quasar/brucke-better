// ponytail: concise character-level diff comparing user input against expected target
// with LCS alignment and automatic active-language grading rules (de / es / fr / en)

import { useAppStore } from "./store";

export interface DiffChar {
  char: string;
  status: "correct" | "incorrect" | "missing";
}

export function computeLetterDiff(userInput: string, expected: string): {
  userChars: DiffChar[];
  expectedChars: DiffChar[];
  isMatch: boolean;
} {
  const user = userInput.trim();
  const target = expected.trim();

  if (user === target) {
    return {
      userChars: user.split("").map((c) => ({ char: c, status: "correct" })),
      expectedChars: target.split("").map((c) => ({ char: c, status: "correct" })),
      isMatch: true,
    };
  }

  const m = user.length;
  const n = target.length;

  // Guard for very long inputs: fall back to positional comparison
  if (m > 200 || n > 200) {
    const maxLen = Math.max(m, n);
    const userChars: DiffChar[] = [];
    const expectedChars: DiffChar[] = [];
    for (let i = 0; i < maxLen; i++) {
      const u = user[i];
      const t = target[i];
      if (u !== undefined && t !== undefined) {
        const status = u === t ? "correct" : "incorrect";
        userChars.push({ char: u, status });
        expectedChars.push({ char: t, status });
      } else if (u !== undefined) {
        userChars.push({ char: u, status: "incorrect" });
      } else if (t !== undefined) {
        expectedChars.push({ char: t, status: "missing" });
      }
    }
    return { userChars, expectedChars, isMatch: false };
  }

  // LCS dynamic programming table so a single missing or extra letter early in a
  // sentence doesn't shift and mark the rest of the sentence incorrect.
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (user[i - 1] === target[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const userCharsRev: DiffChar[] = [];
  const expectedCharsRev: DiffChar[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && user[i - 1] === target[j - 1]) {
      userCharsRev.push({ char: user[i - 1], status: "correct" });
      expectedCharsRev.push({ char: target[j - 1], status: "correct" });
      i--;
      j--;
    } else if (
      i > 0 &&
      j > 0 &&
      dp[i][j - 1] === dp[i - 1][j] &&
      dp[i - 1][j - 1] === dp[i][j - 1]
    ) {
      // 1-for-1 character substitution at the same aligned slot
      userCharsRev.push({ char: user[i - 1], status: "incorrect" });
      expectedCharsRev.push({ char: target[j - 1], status: "incorrect" });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      expectedCharsRev.push({ char: target[j - 1], status: "missing" });
      j--;
    } else {
      userCharsRev.push({ char: user[i - 1], status: "incorrect" });
      i--;
    }
  }

  return {
    userChars: userCharsRev.reverse(),
    expectedChars: expectedCharsRev.reverse(),
    isMatch: false,
  };
}

export function getLevenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // ponytail: length difference upper bound guard
  const lenDiff = Math.abs(a.length - b.length);
  if (lenDiff > 20) return lenDiff;

  // ponytail: O(N) space using two rolling rows instead of full O(M*N) 2D matrix
  let prev = Array.from({ length: a.length + 1 }, (_, i) => i);
  let curr = new Array(a.length + 1);

  for (let i = 1; i <= b.length; i++) {
    curr[0] = i;
    const bChar = b.charAt(i - 1);
    for (let j = 1; j <= a.length; j++) {
      if (bChar === a.charAt(j - 1)) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = Math.min(
          prev[j - 1] + 1, // substitution
          curr[j - 1] + 1, // insertion
          prev[j] + 1      // deletion
        );
      }
    }
    const temp = prev;
    prev = curr;
    curr = temp;
  }
  return prev[a.length];
}

export type AnswerAccuracy = "exact" | "almost" | "incorrect";

export interface EvaluationResult {
  accuracy: AnswerAccuracy;
  warningNote?: string;
  // "sharp-s" is deliberately separate from "umlaut": ß/ss is a different
  // spelling law from ä/ö/ü (and must not inflate the umlaut counter).
  reason?: "case" | "umlaut" | "sharp-s" | "typo" | "infinitive" | "article";
}

export interface EvaluationOptions {
  umlautTolerance?: boolean;
  capitalizationTolerance?: boolean;
  /** Optional explicit override; otherwise auto-detected from activeLanguageId in store. */
  languageId?: string;
}

interface LanguageGradingSpec {
  id: "de" | "es" | "fr" | "nl" | "en";
  name: string;
  nounsCapitalized: boolean;
  diacriticWarningLabel: string;
  stripLeadingPunctuation: (s: string) => string;
  normalizeDiacritics: (s: string) => string;
  matchesDiacritics: (userLower: string, targetLower: string) => boolean;
  infinitiveEndings: string[];
  stripArticle: (s: string) => string;
}

const normalizeGermanUmlauts = (s: string) =>
  s.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");

const normalizeGermanDigraphs = (s: string) =>
  s.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");

// ß → ss with the umlauts left alone, so an error that is *only* about the
// sharp s (Strasse / Straße) can be told apart from a real umlaut error.
const foldGermanSharpS = (s: string) => s.replace(/ß/g, "ss");

// Rich-text sources (iOS smart punctuation, Word, web copy) hand us U+2019
// where the learner's keyboard produces ASCII '. Fold them before grading so
// an apostrophe style can never turn a correct answer into a "typo".
const normalizeTypographicQuotes = (s: string) =>
  s.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D\u00AB\u00BB]/g, '"');

const normalizeSpanishDiacritics = (s: string) =>
  s
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .replace(/ü/g, "u")
    .replace(/ñ/g, "n");

const normalizeFrenchDiacritics = (s: string) =>
  s
    .replace(/[éèêë]/g, "e")
    .replace(/[àâ]/g, "a")
    .replace(/[ùûü]/g, "u")
    .replace(/[îï]/g, "i")
    .replace(/ô/g, "o")
    .replace(/ç/g, "c")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae");

const normalizeDutchDiacritics = (s: string) =>
  s
    .replace(/[éèêë]/g, "e")
    .replace(/[áàâä]/g, "a")
    .replace(/[íìîï]/g, "i")
    .replace(/[óòôö]/g, "o")
    .replace(/[úùûü]/g, "u")
    .replace(/ç/g, "c")
    .replace(/ñ/g, "n");

const normalizeEnglishDiacritics = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const LANGUAGE_GRADING_SPECS: Record<string, LanguageGradingSpec> = {
  de: {
    id: "de",
    name: "German",
    nounsCapitalized: true,
    diacriticWarningLabel: "umlauts",
    stripLeadingPunctuation: (s) => s,
    normalizeDiacritics: normalizeGermanUmlauts,
    matchesDiacritics: (userLower, targetLower) =>
      normalizeGermanUmlauts(userLower) === normalizeGermanUmlauts(targetLower) ||
      normalizeGermanDigraphs(userLower) === normalizeGermanDigraphs(targetLower) ||
      normalizeGermanUmlauts(userLower.replace(/ae/g, "a").replace(/oe/g, "o").replace(/ue/g, "u")) ===
        normalizeGermanUmlauts(targetLower.replace(/ae/g, "a").replace(/oe/g, "o").replace(/ue/g, "u")),
    infinitiveEndings: ["en", "n"],
    stripArticle: (s) =>
      s
        .replace(
          /^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines|kein|keine|keinen|keinem|keiner|keines)\s+/i,
          ""
        )
        .trim(),
  },
  es: {
    id: "es",
    name: "Spanish",
    nounsCapitalized: false,
    diacriticWarningLabel: "accents and ñ",
    stripLeadingPunctuation: (s) => s.replace(/^[¿¡\s]+/, ""),
    normalizeDiacritics: normalizeSpanishDiacritics,
    matchesDiacritics: (userLower, targetLower) =>
      normalizeSpanishDiacritics(userLower) === normalizeSpanishDiacritics(targetLower),
    infinitiveEndings: ["ar", "er", "ir"],
    stripArticle: (s) =>
      s.replace(/^(el|la|los|las|un|una|unos|unas)\s+/i, "").trim(),
  },
  fr: {
    id: "fr",
    name: "French",
    nounsCapitalized: false,
    diacriticWarningLabel: "accents",
    stripLeadingPunctuation: (s) => s,
    normalizeDiacritics: normalizeFrenchDiacritics,
    matchesDiacritics: (userLower, targetLower) =>
      normalizeFrenchDiacritics(userLower) === normalizeFrenchDiacritics(targetLower),
    infinitiveEndings: ["er", "ir", "re"],
    stripArticle: (s) =>
      s
        .replace(/^(de\s+l['’]|de\s+la\s+|du\s+|des\s+|le\s+|la\s+|les\s+|un\s+|une\s+|l['’])/i, "")
        .trim(),
  },
  nl: {
    id: "nl",
    name: "Dutch",
    nounsCapitalized: false,
    diacriticWarningLabel: "accents",
    stripLeadingPunctuation: (s) => s,
    normalizeDiacritics: normalizeDutchDiacritics,
    matchesDiacritics: (userLower, targetLower) =>
      normalizeDutchDiacritics(userLower) === normalizeDutchDiacritics(targetLower),
    infinitiveEndings: ["en"],
    stripArticle: (s) => s.replace(/^(de|het|een)\s+/i, "").trim(),
  },
  en: {
    id: "en",
    name: "English",
    nounsCapitalized: false,
    diacriticWarningLabel: "accents",
    stripLeadingPunctuation: (s) => s,
    normalizeDiacritics: normalizeEnglishDiacritics,
    matchesDiacritics: (userLower, targetLower) =>
      normalizeEnglishDiacritics(userLower) === normalizeEnglishDiacritics(targetLower),
    infinitiveEndings: [],
    stripArticle: (s) => s.replace(/^(to|the|a|an)\s+/i, "").trim(),
  },
};

function resolveActiveGradingSpec(options?: EvaluationOptions): LanguageGradingSpec {
  const activeId =
    options?.languageId ??
    (typeof useAppStore?.getState === "function" ? useAppStore.getState().activeLanguageId : "de") ??
    "de";
  return LANGUAGE_GRADING_SPECS[activeId] ?? LANGUAGE_GRADING_SPECS.de;
}

const stripTrailingPunctuation = (s: string) => s.replace(/[.,!?;:]+$/, "").trim();

// Commas inside a sentence are punctuation, not spelling. Tile exercises cannot
// produce them (tiles drop trailing punctuation) and a learner who types a
// sentence without them has still said the sentence correctly, so they are
// ignored when comparing — the learner still sees the target with its commas.
const foldCommas = (s: string, spec: LanguageGradingSpec) =>
  spec
    .stripLeadingPunctuation(stripTrailingPunctuation(normalizeTypographicQuotes(s)))
    .replace(/\s*,\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

export function evaluateAnswerAccuracy(
  userInput: string,
  expected: string,
  options?: EvaluationOptions
): EvaluationResult {
  const spec = resolveActiveGradingSpec(options);
  const foldedUser = foldCommas(userInput, spec);
  const foldedTarget = foldCommas(expected, spec);
  const result = evaluateFolded(foldedUser, foldedTarget, spec, options);
  if (result.warningNote) {
    // keep the commas visible when we quote the target back to the learner
    const shown = spec.stripLeadingPunctuation(
      stripTrailingPunctuation(normalizeTypographicQuotes(expected))
    );
    if (foldedTarget !== shown) {
      return {
        ...result,
        warningNote: result.warningNote.split(`"${foldedTarget}"`).join(`"${shown}"`),
      };
    }
  }
  return result;
}

const ACCURACY_RANK: Record<AnswerAccuracy, number> = { exact: 2, almost: 1, incorrect: 0 };

/**
 * Grade several equivalent readings of the same answer and keep the best one.
 * Used by tile exercises, where a learner who builds "das" + "Wass" + "er" has
 * assembled one word, not four.
 */
export function evaluateBestOf(
  candidates: string[],
  expected: string,
  options?: EvaluationOptions
): { result: EvaluationResult; answer: string } {
  let best = {
    result: evaluateAnswerAccuracy(candidates[0] ?? "", expected, options),
    answer: candidates[0] ?? "",
  };
  for (const candidate of candidates.slice(1)) {
    const result = evaluateAnswerAccuracy(candidate, expected, options);
    if (ACCURACY_RANK[result.accuracy] > ACCURACY_RANK[best.result.accuracy]) {
      best = { result, answer: candidate };
    }
  }
  return best;
}

function evaluateFolded(
  user: string,
  target: string,
  spec: LanguageGradingSpec,
  options?: EvaluationOptions
): EvaluationResult {
  // ponytail: guard against huge pasted text
  if (Math.abs(user.length - target.length) > 10 || user.length > 200) {
    return { accuracy: "incorrect" };
  }

  // 1. Exact match -> Spot on! (Green)
  if (user === target) {
    return { accuracy: "exact" };
  }

  const userLower = user.toLowerCase();
  const targetLower = target.toLowerCase();

  // 2. Case difference:
  // - In French, Spanish & English (nounsCapitalized === false), case differences are always accepted as exact.
  // - In German (nounsCapitalized === true), case differences are accepted without retry as "almost"
  //   (or "exact" when capitalizationTolerance is on).
  if (userLower === targetLower) {
    if (!spec.nounsCapitalized || options?.capitalizationTolerance) {
      return { accuracy: "exact" };
    }
    return {
      accuracy: "almost",
      reason: "case",
      warningNote: `Almost right! Note that German nouns are capitalized: "${target}"`,
    };
  }

  // 3. Diacritic / umlaut difference (language-specific normalization)
  if (spec.matchesDiacritics(userLower, targetLower)) {
    if (options?.umlautTolerance) {
      if (!spec.nounsCapitalized || options.capitalizationTolerance) {
        return { accuracy: "exact" };
      }
      const lettersOf = (s: string) => s.replace(/[^\p{L}]/gu, "");
      const caseStyle = (s: string) => {
        const l = lettersOf(s);
        if (!l) return "lower";
        if (l === l.toLowerCase()) return "lower";
        if (l[0] === l[0].toUpperCase() && l.slice(1) === l.slice(1).toLowerCase()) return "capitalized";
        return "other";
      };
      const caseMatches = caseStyle(user) === caseStyle(target);
      if (caseMatches) {
        return { accuracy: "exact" };
      }
      return {
        accuracy: "almost",
        reason: "case",
        warningNote: `Almost right! Note that German nouns are capitalized: "${target}"`,
      };
    }
    // German alone distinguishes the sharp s from a plain double s. If the
    // ONLY difference is ß ↔ ss, report that law instead of the umlaut one.
    const sharpSOnly =
      spec.id === "de" && foldGermanSharpS(userLower) === foldGermanSharpS(targetLower);
    if (sharpSOnly) {
      return {
        accuracy: "almost",
        reason: "sharp-s",
        warningNote: `Almost right! ß is the sharp s — German keeps it distinct from ss: "${target}" (you typed: "${user}")`,
      };
    }
    return {
      accuracy: "almost",
      reason: "umlaut",
      warningNote: `Almost right! Note that standard ${spec.name} spelling uses ${spec.diacriticWarningLabel}: "${target}"`,
    };
  }

  // 4. Language-specific verb infinitive ending check
  for (const ending of spec.infinitiveEndings) {
    if (targetLower.endsWith(ending) && targetLower.length > ending.length + 1) {
      const stem = targetLower.slice(0, -ending.length);
      if (
        userLower === stem ||
        spec.normalizeDiacritics(userLower) === spec.normalizeDiacritics(stem)
      ) {
        return {
          accuracy: "almost",
          reason: "infinitive",
          warningNote: `Almost right! ${spec.name} verbs use the infinitive ending "-${ending}": "${target}" (you wrote the stem "${user}")`,
        };
      }
      if (ending.length === 2) {
        const conjugatedShort = targetLower.slice(0, -1); // e.g. "trinke" vs "trinken", "habla" vs "hablar", "parle" vs "parler"
        if (
          userLower === conjugatedShort ||
          spec.normalizeDiacritics(userLower) === spec.normalizeDiacritics(conjugatedShort)
        ) {
          return {
            accuracy: "almost",
            reason: "infinitive",
            warningNote: `Almost right! Note the infinitive ending is "-${ending}": "${target}" (you wrote "${user}")`,
          };
        }
      }
      break;
    }
  }

  // Also check if user typed an infinitive ending when target was bare stem
  for (const ending of spec.infinitiveEndings) {
    if (userLower.endsWith(ending) && userLower.slice(0, -ending.length) === targetLower) {
      return {
        accuracy: "almost",
        reason: "infinitive",
        warningNote: `Almost right! The prompt called for the bare stem: "${target}"`,
      };
    }
  }

  // 5. Language-specific gender article inclusion or omission
  const targetStripped = spec.stripArticle(targetLower);
  const userStripped = spec.stripArticle(userLower);

  if (userLower === targetStripped && userLower !== targetLower) {
    return {
      accuracy: "almost",
      reason: "article",
      warningNote: `Almost right! Remember the gender article: "${target}"`,
    };
  }
  if (userStripped === targetLower && userStripped !== userLower) {
    return {
      accuracy: "almost",
      reason: "article",
      warningNote: `Almost right! The prompt only required the word: "${target}"`,
    };
  }

  // 6. Minor single-character typo for words with length >= 4 -> Yellow
  if (target.length >= 4 && getLevenshteinDistance(userLower, targetLower) === 1) {
    return {
      accuracy: "almost",
      reason: "typo",
      warningNote: `Almost right! Watch out for minor typos: "${target}" (you typed: "${user}")`,
    };
  }

  // 7. Otherwise incorrect -> Red
  return { accuracy: "incorrect" };
}
