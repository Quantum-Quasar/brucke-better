import { SENTENCE_SESSION_LIMIT } from "./sentence-review";
import type { SentenceCard } from "./types";
import type { AppState } from "./store/types";
import type { ReviewGrade } from "./srs";

export interface SentenceSessionEntry { id: string; attempt: number; graded: boolean; neededHelp?: boolean; }
export interface SentenceReviewSession {
  resetAt: number;
  resetActor: string;
  entries: SentenceSessionEntry[];
  index: number;
}
const key = (languageId: string) => `brucke_sentence_review_v1:${languageId}`;
export function readSentenceReviewSession(languageId: string, resetAt: number, resetActor: string, cards: Record<string, SentenceCard>): SentenceReviewSession | null {
  try {
    const raw: unknown = JSON.parse(sessionStorage.getItem(key(languageId)) ?? "null");
    if (!raw || typeof raw !== "object") return null;
    const value = raw as Record<string, unknown>;
    if (value.resetAt !== resetAt || value.resetActor !== resetActor || !Array.isArray(value.entries) || !value.entries.length || value.entries.length > SENTENCE_SESSION_LIMIT) return null;
    if (!Number.isInteger(value.index) || (value.index as number) < 0 || (value.index as number) >= value.entries.length) return null;
    const ids = new Set<string>();
    const entries: SentenceSessionEntry[] = [];
    for (const rawEntry of value.entries) {
      if (!rawEntry || typeof rawEntry !== "object") return null;
      const entry = rawEntry as Record<string, unknown>;
      if (typeof entry.id !== "string" || !cards[entry.id] || ids.has(entry.id) || typeof entry.graded !== "boolean" || !Number.isInteger(entry.attempt) || (entry.attempt as number) < 1 || (entry.attempt as number) > 100000) return null;
      if (entry.neededHelp !== undefined && typeof entry.neededHelp !== "boolean") return null;
      ids.add(entry.id);
      entries.push({ id: entry.id, graded: entry.graded, attempt: entry.attempt as number, neededHelp: entry.neededHelp as boolean | undefined });
    }
    return { resetAt, resetActor, entries, index: value.index as number };
  } catch { return null; }
}
export function writeSentenceReviewSession(languageId: string, session: SentenceReviewSession | null) {
  try {
    if (session) sessionStorage.setItem(key(languageId), JSON.stringify(session));
    else sessionStorage.removeItem(key(languageId));
  } catch { /* Review still works when per-tab storage is blocked. */ }
}

/** One scheduling step per replay, even when wrong feedback later continues as success. */
export function gradeSentenceSessionEntry(session: SentenceReviewSession, languageId: string, grade: ReviewGrade, store: Pick<AppState, "activeLanguageId" | "progressResetAt" | "progressResetActor" | "sentenceCards" | "recordSentenceReview">): SentenceReviewSession {
  const entry = session.entries[session.index];
  if (!entry || entry.graded || !store.sentenceCards[entry.id] || store.activeLanguageId !== languageId ||
      store.progressResetAt !== session.resetAt || store.progressResetActor !== session.resetActor) return session;
  store.recordSentenceReview(entry.id, entry.neededHelp && grade > 3 ? 3 : grade, languageId);
  return { ...session, entries: session.entries.map((item, index) => index === session.index ? { ...item, graded: true } : item) };
}
