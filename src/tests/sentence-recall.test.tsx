import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import lessonOne from "../data/lessons/1";
import lessonTwo from "../data/lessons/2";
import { finalSentenceExerciseId } from "../components/lesson/sentence-recall";
import { TranscribeExercise } from "../components/lesson/TranscribeExercise";
import type { ExerciseItem } from "../lib/types";

const task = (id: string, type: ExerciseItem["type"], target_answer: string): ExerciseItem => ({
  id, type, target_answer, prompt: "Write the sentence", meaning: "I am here",
  word_bank: ["Ich", "bin", "hier"],
});

describe("Final lesson sentence recall", () => {
  it("selects the last sentence task even when a different task closes the lesson", () => {
    const exercises = [
      task("earlier", "syntax_builder", "Ich bin hier"),
      task("final-sentence", "transcribe", "Ich komme morgen"),
      task("last-slot", "derive", "kommen"),
    ];
    expect(finalSentenceExerciseId(exercises)).toBe("final-sentence");
    expect(exercises.map((exercise) => exercise.id)).toEqual(["earlier", "final-sentence", "last-slot"]);
  });

  it("does not manufacture a sentence for an ineligible lesson or a single-word task", () => {
    expect(finalSentenceExerciseId([])).toBeUndefined();
    expect(finalSentenceExerciseId([task("word", "syntax_builder", "lernen"), task("other", "derive", "Ich lerne")])).toBeUndefined();
  });

  it.each([lessonOne, lessonTwo])("starts lesson $id with unhinted typing and on-demand clues/word bank", (lesson) => {
    const exercise = lesson.exercises.find((item) => item.id === finalSentenceExerciseId(lesson.exercises))!;
    const html = renderToStaticMarkup(<TranscribeExercise exercise={exercise} recallFirst onSuccess={() => {}} onError={() => {}} />);
    expect(html).toContain('type="text"');
    expect(html).toContain("Show words / help");
    expect(html).toContain('aria-expanded="false"');
    expect(html).toMatch(/hidden="" data-testid="sentence-word-bank"><\/div>/);
    if ((exercise.vocab_hints?.length ?? 0) > 0) {
      expect(html).toContain("Show vocabulary clues");
      for (const hint of exercise.vocab_hints ?? []) expect(html).not.toContain(hint.translation);
    }
    const retryHtml = renderToStaticMarkup(<TranscribeExercise exercise={exercise} recallFirst isRetry onSuccess={() => {}} onError={() => {}} />);
    for (const hint of exercise.vocab_hints ?? []) expect(retryHtml).toContain(hint.translation);
  });

  it("keeps the word bank available on retries and on earlier scaffolded tasks", () => {
    const exercise = task("sentence", "transcribe", "Ich bin hier");
    for (const props of [{ recallFirst: true, isRetry: true }, { recallFirst: false }]) {
      const html = renderToStaticMarkup(<TranscribeExercise exercise={exercise} {...props} onSuccess={() => {}} onError={() => {}} />);
      expect(html).not.toContain('hidden="" data-testid="sentence-word-bank"');
      expect(html).toContain('<span>hier</span>');
    }
  });
});
