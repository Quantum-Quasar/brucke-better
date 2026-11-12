import hookWordData from "../data/english-hook-words.json";
import { normalizeFrequencyForm } from "./frequency";

/**
 * The hook slot may only name an English twin the learner already owns, and the
 * pinned list of forms that count as "already owns" is decided by
 * `scripts/generate-english-hook-words.ts` — see `docs/content-agent-prompt.md`.
 */
export const ENGLISH_HOOK_WORD_LIMIT: number = hookWordData.limit;

const KNOWN_HOOK_WORDS: ReadonlySet<string> = new Set(hookWordData.words);

/**
 * Qualifiers that admit the twin is not modern English. An annotation carrying one
 * of these says "this word is a footnote", so it belongs in the derivation.
 */
const NON_MODERN_QUALIFIERS = ["archaic", "obsolete", "dialect", "dialectal", "rare", "literary", "poetic"] as const;

/** A `(twin: …)` annotation exactly as the corpus writes it: `(archaic twin: welkin)`. */
export interface TwinAnnotation {
  /** The English word(s) the annotation names as the twin, lowercased. */
  twins: string[];
  /** The qualifier in front of `twin:` (archaic, dialect, …) — null when there is none. */
  qualifier: string | null;
}

/**
 * Only the parenthesized `twin:` form reserves the hook slot, and only a bare word
 * list is a twin list: prose that merely discusses a twin is not an annotation.
 */
const TWIN_ANNOTATION = new RegExp(
  `\\(\\s*(?:(${NON_MODERN_QUALIFIERS.join("|")})\\s+)?twin:\\s*([A-Za-z][A-Za-z'-]*(?:\\s*[,/;]\\s*[A-Za-z][A-Za-z'-]*)*)\\s*\\)`,
  "gi"
);

/** Every explicitly annotated twin claim in a string. */
export function parseTwinAnnotations(text: string): TwinAnnotation[] {
  return Array.from(text.matchAll(TWIN_ANNOTATION), (match) => ({
    twins: match[2].split(/[,/;]/).map((word) => word.trim().toLowerCase()),
    qualifier: match[1]?.toLowerCase() ?? null,
  }));
}

/** Is this a form inside the pinned top-N list of spoken English? */
export function isModernHookWord(word: string): boolean {
  return KNOWN_HOOK_WORDS.has(normalizeFrequencyForm(word));
}

/** What an author must do about a reported problem — shared by the parser and the test. */
export const HOOK_PROBLEM_HINT = "teach the twin in the derivation, keep the hook to a word the learner already owns";

/**
 * Why a string may not keep the twin annotations it carries; empty when it is
 * hook-safe. Used by the compendium parser (source-line diagnostics) and by
 * `english-hooks.test.ts` (whole-corpus sweep).
 */
export function twinHookProblems(text: string): string[] {
  return parseTwinAnnotations(text).flatMap(({ twins, qualifier }) =>
    twins
      .filter((twin) => qualifier !== null || !isModernHookWord(twin))
      .map((twin) =>
        qualifier ? `twin "${twin}" is ${qualifier} English` : `twin "${twin}" is outside the top ${ENGLISH_HOOK_WORD_LIMIT} English forms`
      )
  );
}
