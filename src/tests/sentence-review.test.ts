import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "../lib/store";
import { createProgressBackup } from "../lib/progress-backup";
import { loadSavedState, persistenceRuntime } from "../lib/store/persistence";
import { normalizeLanguageSlice, normalizeSentenceCards } from "../lib/store/schema";
import { mergeLanguageSlice } from "../lib/store/progress-state";
import { failedSentenceCard, gradeSentenceCard, prepareSentenceSession } from "../lib/sentence-review";
import { gradeSentenceSessionEntry, readSentenceReviewSession, writeSentenceReviewSession, type SentenceReviewSession } from "../lib/sentence-review-session";
import { sentenceReplayVariant } from "../lib/retry-variation";
import { localDateKey } from "../lib/srs";
import type { ExerciseItem } from "../lib/types";

const exercise: ExerciseItem = { id: "process", type: "transcribe", prompt: "Build the thought", target_answer: "Ich bin hier", idea: "I am here", word_bank: ["Ich", "bin", "hier"], cues: ["Find the subject"], idea_parts: ["I", "am here"] };
class MemoryStorage {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, String(value)); }
  removeItem(key: string) { this.values.delete(key); }
  clear() { this.values.clear(); }
}
function session(): SentenceReviewSession {
  const state = useAppStore.getState();
  return { resetAt: state.progressResetAt, resetActor: state.progressResetActor, index: 0, entries: [{ id: "1:process", attempt: 2, graded: false }] };
}

describe("failed sentence process scheduling", () => {
  beforeAll(() => {
    vi.stubGlobal("window", globalThis);
    vi.stubGlobal("document", { cookie: "" });
    vi.stubGlobal("localStorage", new MemoryStorage());
    vi.stubGlobal("sessionStorage", new MemoryStorage());
    persistenceRuntime.bootSavedState = null;
    persistenceRuntime.hasHydratedFromStorage = true;
  });
  afterAll(() => vi.unstubAllGlobals());
  beforeEach(() => {
    useAppStore.getState().resetProgress();
    useAppStore.getState().setActiveLanguage("de");
    sessionStorage.clear();
  });
  it("creates only failed gradeable processes and persists them outside the word economy", () => {
    const before = useAppStore.getState();
    before.recordSentenceFailure(1, { ...exercise, type: "shift_select" }, "de");
    expect(useAppStore.getState().sentenceCards).toEqual({});
    before.recordSentenceFailure(1, exercise, "fr");
    expect(useAppStore.getState().sentenceCards).toEqual({});
    before.recordSentenceFailure(1, exercise, "de");
    const state = useAppStore.getState();
    expect(state.sentenceCards["1:process"].due_date).toBe(localDateKey());
    expect(loadSavedState().sentenceCards).toEqual(state.sentenceCards);
    expect(state.srsCards).toEqual(before.srsCards);
    expect(state.wordMastery).toEqual(before.wordMastery);
    expect(state.lessonStars).toEqual(before.lessonStars);
    expect(state.completedLessons).toEqual(before.completedLessons);
  });
  it("preserves the missed process after successful lesson completion; correct-only completion adds none", () => {
    useAppStore.getState().completeLesson(2, { perfect: true });
    expect(useAppStore.getState().sentenceCards).toEqual({});
    useAppStore.getState().recordSentenceFailure(1, exercise, "de");
    const failed = useAppStore.getState().sentenceCards["1:process"];
    useAppStore.getState().completeLesson(1, { perfect: false });
    expect(useAppStore.getState().sentenceCards["1:process"]).toEqual(failed);
    expect(prepareSentenceSession(useAppStore.getState().sentenceCards)).toHaveLength(1);
  });
  it("does not let an immediate lesson retry defer the failed process", () => {
    useAppStore.getState().recordSentenceFailure(1, exercise, "de");
    useAppStore.getState().recordSentenceFailure(1, exercise, "de");
    const card = useAppStore.getState().sentenceCards["1:process"];
    expect(card.lapses).toBe(2);
    expect(card.due_date).toBe(localDateKey());
    expect(prepareSentenceSession(useAppStore.getState().sentenceCards)).toHaveLength(1);
  });
  it("keeps an incorrect replay's Again grade when feedback later continues successfully", () => {
    useAppStore.getState().recordSentenceFailure(1, exercise, "de");
    const failed = gradeSentenceSessionEntry(session(), "de", 1, useAppStore.getState());
    const again = useAppStore.getState().sentenceCards["1:process"];
    writeSentenceReviewSession("de", failed);
    const restored = readSentenceReviewSession("de", failed.resetAt, failed.resetActor, useAppStore.getState().sentenceCards)!;
    expect(restored.entries[0].graded).toBe(true);
    expect(gradeSentenceSessionEntry(restored, "de", 4, useAppStore.getState())).toBe(restored);
    expect(useAppStore.getState().sentenceCards["1:process"]).toEqual(again);
    expect(again.repetitions).toBe(0);
    expect(again.lapses).toBe(2);
  });
  it("a correct replay schedules exactly one SM-2 step and never creates a correct-only process", () => {
    useAppStore.getState().recordSentenceReview("1:process", 4, "de");
    expect(useAppStore.getState().sentenceCards).toEqual({});
    useAppStore.getState().recordSentenceFailure(1, exercise, "de");
    const graded = gradeSentenceSessionEntry(session(), "de", 4, useAppStore.getState());
    gradeSentenceSessionEntry(graded, "de", 4, useAppStore.getState());
    expect(useAppStore.getState().sentenceCards["1:process"].repetitions).toBe(1);
    expect(prepareSentenceSession(useAppStore.getState().sentenceCards)).toHaveLength(0);
    expect(useAppStore.getState().wordMastery).toEqual({});
    expect(useAppStore.getState().srsCards).toEqual({});
  });
  it("isolates languages and rejects callbacks arriving after language switches or resets", () => {
    useAppStore.getState().recordSentenceFailure(1, exercise, "de");
    const old = session();
    useAppStore.getState().setActiveLanguage("fr");
    useAppStore.getState().recordSentenceFailure(1, exercise, "fr");
    const french = useAppStore.getState().sentenceCards;
    expect(gradeSentenceSessionEntry(old, "de", 4, useAppStore.getState())).toBe(old);
    expect(useAppStore.getState().sentenceCards).toEqual(french);
    useAppStore.getState().setActiveLanguage("de");
    expect(useAppStore.getState().sentenceCards["1:process"].repetitions).toBe(0);
    useAppStore.getState().resetProgress();
    useAppStore.getState().recordSentenceFailure(1, exercise, "de");
    expect(gradeSentenceSessionEntry(old, "de", 4, useAppStore.getState())).toBe(old);
    expect(useAppStore.getState().sentenceCards["1:process"].repetitions).toBe(0);
  });
  it("round trips backup cards, preserves them on legacy import, validates corruption and resets all languages", () => {
    useAppStore.getState().recordSentenceFailure(1, exercise, "de");
    const backup = createProgressBackup(useAppStore.getState());
    useAppStore.getState().resetProgress();
    expect(useAppStore.getState().importBackupState(backup)).toBe(true);
    expect(useAppStore.getState().sentenceCards["1:process"]).toEqual(backup.sentenceCards["1:process"]);
    expect(useAppStore.getState().importBackupState({ completedLessons: [1] })).toBe(true);
    expect(useAppStore.getState().sentenceCards["1:process"]).toBeDefined();
    expect(useAppStore.getState().importBackupState({ sentenceCards: { "1:process": { id: "1:process" } } })).toBe(false);
    expect(normalizeSentenceCards({ wrong: backup.sentenceCards["1:process"] })).toEqual({});
    expect(normalizeSentenceCards({ "1:process": { ...backup.sentenceCards["1:process"], due_date: "2026-02-31" } })).toEqual({});
    useAppStore.getState().setActiveLanguage("fr");
    useAppStore.getState().recordSentenceFailure(1, exercise, "fr");
    useAppStore.getState().resetProgress();
    useAppStore.getState().setActiveLanguage("de");
    expect(useAppStore.getState().sentenceCards).toEqual({});
  });
  it("merges sentence entries by per-card versions without dropping another tab's cards", () => {
    const one = failedSentenceCard(1, exercise);
    const two = failedSentenceCard(2, exercise);
    const newer = gradeSentenceCard(one, 4);
    const a = normalizeLanguageSlice({ sentenceCards: { [one.id]: one }, progressVersions: { sentenceCards: { [one.id]: "0000000000000001:a" } } });
    const b = normalizeLanguageSlice({ sentenceCards: { [one.id]: newer, [two.id]: two }, progressVersions: { sentenceCards: { [one.id]: "0000000000000002:b" } } });
    const merged = mergeLanguageSlice(a, b);
    expect(merged.sentenceCards[one.id]).toEqual(newer);
    expect(merged.sentenceCards[two.id]).toEqual(two);
  });
  it("caps due sessions at 15 and discards invalid, stale and cross-language session payloads", () => {
    for (let id = 1; id <= 20; id++) useAppStore.getState().recordSentenceFailure(id, exercise, "de");
    const cards = useAppStore.getState().sentenceCards;
    expect(prepareSentenceSession(cards)).toHaveLength(15);
    const valid = session();
    writeSentenceReviewSession("de", valid);
    expect(readSentenceReviewSession("fr", valid.resetAt, valid.resetActor, cards)).toBeNull();
    expect(readSentenceReviewSession("de", valid.resetAt + 1, valid.resetActor, cards)).toBeNull();
    expect(readSentenceReviewSession("de", valid.resetAt, valid.resetActor, {})).toBeNull();
    writeSentenceReviewSession("de", { ...valid, entries: Array(16).fill(valid.entries[0]) });
    expect(readSentenceReviewSession("de", valid.resetAt, valid.resetActor, cards)).toBeNull();
  });
  it("remembers replay assistance across reload and grades the eventual answer Hard, not Good", () => {
    const store = useAppStore.getState();
    store.recordSentenceFailure(1, exercise, "de");
    const pending = session();
    pending.entries[0].neededHelp = true;
    writeSentenceReviewSession("de", pending);
    const resumed = readSentenceReviewSession("de", pending.resetAt, pending.resetActor, useAppStore.getState().sentenceCards)!;
    gradeSentenceSessionEntry(resumed, "de", 4, useAppStore.getState());
    const scheduled = useAppStore.getState().sentenceCards["1:process"];
    expect(scheduled.ease_factor).toBeCloseTo(2.36);
    expect(scheduled.repetitions).toBe(1);
    expect(useAppStore.getState().srsCards).toEqual({});
    expect(useAppStore.getState().lessonStars).toEqual({});
  });
});

describe("sentence dates and conservative German swings", () => {
  const tz = process.env.TZ;
  afterAll(() => { if (tz === undefined) delete process.env.TZ; else process.env.TZ = tz; });
  it.each(["Etc/GMT+12", "Pacific/Kiritimati", "Europe/Berlin"])("schedules using the local calendar in %s", (timezone) => {
    process.env.TZ = timezone;
    const now = new Date(2026, 2, 28, 23, 40);
    const card = failedSentenceCard(1, exercise, undefined, now);
    expect(card.due_date).toBe("2026-03-28");
    expect(gradeSentenceCard(card, 4, now).due_date).toBe("2026-03-29");
    expect(gradeSentenceCard(card, 1, now).due_date).toBe("2026-03-29");
  });
  const context = { languageId: "de", knownWords: [], taughtSurfaces: ["Ich bin hier", "Du bist hier", "Ich war hier", "nicht", "dass"] };
  it("generates grammatical person, taught tense, negation and subordinate swings without mutating the original", () => {
    const answers = Array.from({ length: 12 }, (_, index) => sentenceReplayVariant(exercise, index + 1, context).target_answer);
    expect(answers).toContain("Du bist hier");
    expect(answers).toContain("Ich war hier");
    expect(answers).toContain("Ich bin nicht hier");
    expect(answers).toContain("dass ich hier bin");
    expect(exercise.target_answer).toBe("Ich bin hier");
    expect(exercise.cues).toEqual(["Find the subject"]);
  });
  it("fronts an existing temporal constituent and swaps only attested bare drink objects", () => {
    const drinking = { ...exercise, target_answer: "Ich trinke Wasser heute", word_bank: ["Ich", "trinke", "Wasser", "heute"] };
    expect(sentenceReplayVariant(drinking, 1, { ...context, taughtSurfaces: [drinking.target_answer] }).target_answer).toBe("Heute trinke ich Wasser");
    const bare = { ...drinking, target_answer: "Ich trinke Wasser" };
    expect(sentenceReplayVariant(bare, 1, { ...context, taughtSurfaces: [bare.target_answer, "Milch"] }).target_answer).toBe("Ich trinke Milch");
  });
  it("never guesses unknown inflections, tense, objects, or foreign-language grammar", () => {
    const unknown = { ...exercise, target_answer: "Ich bin unbekannt", word_bank: ["Ich", "bin", "unbekannt"] };
    expect(sentenceReplayVariant(unknown, 2, context).target_answer).toBe(unknown.target_answer);
    expect(sentenceReplayVariant(exercise, 1, { ...context, taughtSurfaces: [exercise.target_answer] }).target_answer).toBe(exercise.target_answer);
    expect(sentenceReplayVariant(exercise, 1, { ...context, languageId: "fr" }).target_answer).toBe(exercise.target_answer);
    const authored = { ...exercise, variants: [{ ...exercise, target_answer: "Du fliegst fremdwelt", word_bank: ["Du", "fliegst", "fremdwelt"] }] };
    expect(sentenceReplayVariant(authored, 1, { ...context, taughtSurfaces: [exercise.target_answer] }).target_answer).toBe(exercise.target_answer);
  });
});
