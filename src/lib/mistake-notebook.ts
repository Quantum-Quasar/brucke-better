export type MistakeLanguageId = "de" | "fr" | "es" | "nl";
import { readStorageString, removeStorageKey, writeStorageString } from "./safe-storage";

export type MistakeErrorType =
  | "word_order"
  | "gender"
  | "spelling"
  | "umlaut"
  | "capitalization";

export const MISTAKE_ERROR_TYPES: readonly MistakeErrorType[] = [
  "word_order",
  "gender",
  "spelling",
  "umlaut",
  "capitalization",
] as const;

export const MISTAKE_ERROR_META: Record<
  MistakeErrorType,
  { label: string; description: string }
> = {
  word_order: {
    label: "Word order",
    description: "Right words, different sequence or verb placement.",
  },
  gender: {
    label: "Gender & articles",
    description: "Article or grammatical gender mismatch.",
  },
  spelling: {
    label: "Spelling & vocabulary",
    description: "Letter pattern, shift, or word choice slip.",
  },
  umlaut: {
    label: "Umlauts & accents",
    description: "Diacritic or sharp-s (ä, ö, ü, ß, accents) difference.",
  },
  capitalization: {
    label: "Capitalization",
    description: "Noun or sentence capitalization slip.",
  },
};

export interface MistakeEntry {
  id: string;
  languageId: string;
  errorType: MistakeErrorType;
  prompt: string;
  expected: string;
  attempt: string;
  note?: string;
  exerciseId?: string;
  count: number;
  lastSeenAt: string;
}

export interface RecordMistakeInput {
  languageId: string;
  prompt: string;
  expected: string;
  attempt: string;
  errorType?: MistakeErrorType;
  baseErrorType?: "spelling" | "umlaut" | "capitalization";
  diagnosisTitle?: string;
  diagnosisBody?: string;
  note?: string;
  exerciseId?: string;
  now?: Date;
}

export const MISTAKE_NOTEBOOK_STORAGE_KEY = "brucke.mistakeNotebook.v1";
export const MISTAKE_NOTEBOOK_EVENT = "brucke:mistakes-updated";
export const MAX_STORED_MISTAKES_PER_LANGUAGE = 200;

export const ARTICLES_BY_LANGUAGE: Record<MistakeLanguageId, ReadonlySet<string>> = {
  de: new Set([
    "der", "die", "das", "den", "dem", "des",
    "ein", "eine", "einen", "einem", "einer", "eines",
    "kein", "keine", "keinen", "keinem", "keiner",
  ]),
  fr: new Set([
    "le", "la", "les", "un", "une", "des", "du",
  ]),
  es: new Set([
    "el", "la", "los", "las", "un", "una", "unos", "unas",
  ]),
  nl: new Set([
    "de", "het", "een",
  ]),
};

const ALL_ARTICLES = new Set<string>([
  ...ARTICLES_BY_LANGUAGE.de,
  ...ARTICLES_BY_LANGUAGE.fr,
  ...ARTICLES_BY_LANGUAGE.es,
  ...ARTICLES_BY_LANGUAGE.nl,
]);

function articlesForLanguage(languageId?: string): ReadonlySet<string> {
  if (languageId && languageId in ARTICLES_BY_LANGUAGE) {
    return ARTICLES_BY_LANGUAGE[languageId as MistakeLanguageId];
  }
  return ALL_ARTICLES;
}

function readRawMistakes(storage?: Storage | null): string | null {
  if (storage === undefined) {
    return readStorageString(MISTAKE_NOTEBOOK_STORAGE_KEY);
  }
  if (!storage) return null;
  try {
    return storage.getItem(MISTAKE_NOTEBOOK_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeRawMistakes(serialized: string | null, storage?: Storage | null): boolean {
  if (storage === undefined) {
    return serialized === null
      ? removeStorageKey(MISTAKE_NOTEBOOK_STORAGE_KEY)
      : writeStorageString(MISTAKE_NOTEBOOK_STORAGE_KEY, serialized);
  }
  if (!storage) return false;
  try {
    if (serialized === null) {
      storage.removeItem(MISTAKE_NOTEBOOK_STORAGE_KEY);
    } else {
      storage.setItem(MISTAKE_NOTEBOOK_STORAGE_KEY, serialized);
    }
    return true;
  } catch {
    return false;
  }
}

function notifyMistakesUpdated() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent(MISTAKE_NOTEBOOK_EVENT));
  } catch {
    // Ignore environments without CustomEvent support
  }
}

function tokenizeLower(text: string): string[] {
  return text
    .trim()
    .toLocaleLowerCase()
    .replace(/[.,!?;:"'„“”‘’()]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function stripDiacritics(text: string): string {
  return text
    .toLocaleLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizePunctuation(text: string): string {
  return text.trim().replace(/[.,!?;:]+$/g, "").replace(/\s+/g, " ");
}

/** Classify a wrong attempt into one of the five Mistake Notebook error buckets. */
export function classifyMistakeType(params: {
  languageId?: string;
  baseErrorType?: "spelling" | "umlaut" | "capitalization";
  attempt: string;
  expected: string;
  diagnosisTitle?: string;
  diagnosisBody?: string;
}): MistakeErrorType {
  const {
    languageId,
    baseErrorType,
    attempt,
    expected,
    diagnosisTitle = "",
    diagnosisBody = "",
  } = params;
  if (baseErrorType === "umlaut") return "umlaut";
  if (baseErrorType === "capitalization") return "capitalization";

  const cleanAttempt = normalizePunctuation(attempt);
  const cleanExpected = normalizePunctuation(expected);
  const diagText = `${diagnosisTitle} ${diagnosisBody}`.toLocaleLowerCase();

  // 1. Capitalization-only difference
  if (
    cleanAttempt &&
    cleanExpected &&
    cleanAttempt !== cleanExpected &&
    cleanAttempt.toLocaleLowerCase() === cleanExpected.toLocaleLowerCase()
  ) {
    return "capitalization";
  }

  // 2. Umlaut / diacritic-only difference
  if (
    cleanAttempt &&
    cleanExpected &&
    cleanAttempt.toLocaleLowerCase() !== cleanExpected.toLocaleLowerCase() &&
    stripDiacritics(cleanAttempt) === stripDiacritics(cleanExpected)
  ) {
    return "umlaut";
  }

  const attemptTokens = tokenizeLower(cleanAttempt);
  const expectedTokens = tokenizeLower(cleanExpected);

  // 3. Word order (same multiset of tokens in a different sequence, or V2/order diagnosis)
  if (
    attemptTokens.length > 1 &&
    attemptTokens.length === expectedTokens.length &&
    attemptTokens.join(" ") !== expectedTokens.join(" ") &&
    [...attemptTokens].sort().join(" ") === [...expectedTokens].sort().join(" ")
  ) {
    return "word_order";
  }
  if (/\b(word order|verb[- ]second|v2|sentence order|order of words)\b/.test(diagText)) {
    return "word_order";
  }

  // 4. Gender / article mismatch (scoped to the active language's articles)
  const articles = articlesForLanguage(languageId);
  if (
    attemptTokens.length >= 1 &&
    attemptTokens.length === expectedTokens.length
  ) {
    let diffCount = 0;
    let articleDiffCount = 0;
    for (let i = 0; i < attemptTokens.length; i += 1) {
      if (attemptTokens[i] !== expectedTokens[i]) {
        diffCount += 1;
        if (articles.has(attemptTokens[i]) && articles.has(expectedTokens[i])) {
          articleDiffCount += 1;
        }
      }
    }
    if (diffCount > 0 && diffCount === articleDiffCount) {
      return "gender";
    }
  }
  if (/\b(gender|article|der\/die\/das|masculine|feminine|neuter)\b/.test(diagText)) {
    return "gender";
  }

  return "spelling";
}

function isMistakeEntry(value: unknown): value is MistakeEntry {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.languageId === "string" &&
    typeof candidate.errorType === "string" &&
    MISTAKE_ERROR_TYPES.includes(candidate.errorType as MistakeErrorType) &&
    typeof candidate.prompt === "string" &&
    typeof candidate.expected === "string" &&
    typeof candidate.attempt === "string" &&
    typeof candidate.count === "number" &&
    typeof candidate.lastSeenAt === "string"
  );
}

function capPerLanguage(entries: readonly MistakeEntry[]): MistakeEntry[] {
  const counts = new Map<string, number>();
  const kept: MistakeEntry[] = [];
  for (const entry of entries) {
    const lang = entry.languageId;
    const count = counts.get(lang) ?? 0;
    if (count >= MAX_STORED_MISTAKES_PER_LANGUAGE) continue;
    counts.set(lang, count + 1);
    kept.push(entry);
  }
  return kept;
}

export function loadMistakes(storage?: Storage | null): MistakeEntry[] {
  const raw = readRawMistakes(storage);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isMistakeEntry);
  } catch {
    return [];
  }
}

function saveMistakes(entries: MistakeEntry[], storage?: Storage | null): void {
  const capped = capPerLanguage(entries);
  const ok =
    capped.length === 0
      ? writeRawMistakes(null, storage)
      : writeRawMistakes(JSON.stringify(capped), storage);
  if (ok) {
    notifyMistakesUpdated();
  }
}

function buildEntryKey(
  languageId: string,
  errorType: MistakeErrorType,
  expected: string,
  attempt: string,
): string {
  return [
    languageId.trim().toLowerCase(),
    errorType,
    normalizePunctuation(expected).toLocaleLowerCase(),
    normalizePunctuation(attempt).toLocaleLowerCase(),
  ].join("|");
}

/** Record a wrong answer into the localStorage-backed Mistake Notebook. */
export function recordMistake(
  input: RecordMistakeInput,
  storage?: Storage | null,
): MistakeEntry | null {
  const attempt = input.attempt.trim();
  const expected = input.expected.trim();
  if (!attempt || !expected) return null;

  const errorType =
    input.errorType ??
    classifyMistakeType({
      languageId: input.languageId,
      baseErrorType: input.baseErrorType,
      attempt,
      expected,
      diagnosisTitle: input.diagnosisTitle,
      diagnosisBody: input.diagnosisBody,
    });

  const nowIso = (input.now ?? new Date()).toISOString();
  const key = buildEntryKey(input.languageId, errorType, expected, attempt);
  const existing = loadMistakes(storage);
  const matchIndex = existing.findIndex(
    (item) => buildEntryKey(item.languageId, item.errorType, item.expected, item.attempt) === key,
  );

  let updatedEntry: MistakeEntry;
  let nextEntries: MistakeEntry[];

  if (matchIndex >= 0) {
    const current = existing[matchIndex];
    updatedEntry = {
      ...current,
      prompt: input.prompt.trim() || current.prompt,
      note: input.note ?? current.note,
      count: current.count + 1,
      lastSeenAt: nowIso,
    };
    nextEntries = [
      updatedEntry,
      ...existing.slice(0, matchIndex),
      ...existing.slice(matchIndex + 1),
    ];
  } else {
    updatedEntry = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      languageId: input.languageId,
      errorType,
      prompt: input.prompt.trim(),
      expected,
      attempt,
      note: input.note,
      exerciseId: input.exerciseId,
      count: 1,
      lastSeenAt: nowIso,
    };
    nextEntries = [updatedEntry, ...existing];
  }

  saveMistakes(nextEntries, storage);
  return updatedEntry;
}

/** Group mistake entries by error type, optionally scoped to one language. */
export function groupMistakesByType(
  entries: readonly MistakeEntry[],
  languageId?: string,
): Record<MistakeErrorType, MistakeEntry[]> {
  const grouped: Record<MistakeErrorType, MistakeEntry[]> = {
    word_order: [],
    gender: [],
    spelling: [],
    umlaut: [],
    capitalization: [],
  };

  for (const entry of entries) {
    if (languageId && entry.languageId !== languageId) continue;
    grouped[entry.errorType].push(entry);
  }

  for (const type of MISTAKE_ERROR_TYPES) {
    grouped[type].sort((a, b) => b.lastSeenAt.localeCompare(a.lastSeenAt));
  }

  return grouped;
}

export function resolveMistake(id: string, storage?: Storage | null): MistakeEntry[] {
  const next = loadMistakes(storage).filter((entry) => entry.id !== id);
  saveMistakes(next, storage);
  return next;
}

export function clearMistakesByType(
  errorType: MistakeErrorType,
  languageId?: string,
  storage?: Storage | null,
): MistakeEntry[] {
  const next = loadMistakes(storage).filter((entry) => {
    if (entry.errorType !== errorType) return true;
    if (languageId && entry.languageId !== languageId) return true;
    return false;
  });
  saveMistakes(next, storage);
  return next;
}

export function clearAllMistakes(
  languageId?: string,
  storage?: Storage | null,
): MistakeEntry[] {
  const next = languageId
    ? loadMistakes(storage).filter((entry) => entry.languageId !== languageId)
    : [];
  saveMistakes(next, storage);
  return next;
}
