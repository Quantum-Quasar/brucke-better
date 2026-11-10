import { describe, it, expect } from "vitest";
import { LESSONS } from "../data/lessons";
import { compendium } from "../data/compendium";
import { evaluateAnswerAccuracy } from "../lib/letter-diff";

describe("Progressive Bite-Sized Exercise Architecture", () => {
  it("provides 10 fully interactive foundational lessons", () => {
    expect(LESSONS.length).toBeGreaterThanOrEqual(10);
  });

  it("scaffolds exercises so initial problems are never cold typing", () => {
    for (const lesson of LESSONS) {
      const firstExercise = lesson.exercises[0];
      expect(firstExercise).toBeDefined();
      // First exercise must be playful tile assembly, matching cards, or multiple choice
      expect(["morpheme_tiles", "matching_pairs", "shift_select"]).toContain(firstExercise.type);
    }
  });

  it("validates that morpheme_tiles exercises have necessary tiles to form the answer", () => {
    for (const lesson of LESSONS) {
      const tileExercises = lesson.exercises.filter((e) => e.type === "morpheme_tiles");
      for (const ex of tileExercises) {
        expect(ex.tile_options).toBeDefined();
        expect(ex.tile_options!.length).toBeGreaterThanOrEqual(3);

        // Check that pieces of target_answer exist in tile_options
        const target = ex.target_answer;
        const matchingTiles = ex.tile_options!.filter((t) => target.includes(t.replace(/^-/, "")));
        expect(matchingTiles.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("validates that matching_pairs exercises have valid pairs and targets", () => {
    for (const lesson of LESSONS) {
      const matchExercises = lesson.exercises.filter((e) => e.type === "matching_pairs");
      for (const ex of matchExercises) {
        expect(ex.matching_pairs).toBeDefined();
        expect(ex.matching_pairs!.length).toBeGreaterThanOrEqual(3);
        for (const pair of ex.matching_pairs!) {
          expect(pair.id).toBeTruthy();
          expect(pair.english).toBeTruthy();
          expect(pair.german).toBeTruthy();
        }
      }
    }
  });

  it("validates that shift_select options always include the target answer", () => {
    for (const lesson of LESSONS) {
      const selectExercises = lesson.exercises.filter((e) => e.type === "shift_select");
      for (const ex of selectExercises) {
        expect(ex.options).toBeDefined();
        expect(ex.options).toContain(ex.target_answer);
      }
    }
  });

  it("validates that syntax_builder word banks contain all required words", () => {
    for (const lesson of LESSONS) {
      const syntaxExercises = lesson.exercises.filter((e) => e.type === "syntax_builder");
      for (const ex of syntaxExercises) {
        expect(ex.word_bank).toBeDefined();
        const wordsInTarget = ex.target_answer.split(" ");
        for (const word of wordsInTarget) {
          expect(ex.word_bank).toContain(word);
        }
      }
    }
  });

  it("validates that exercises include translation meanings for confirmation", () => {
    for (const lesson of LESSONS) {
      for (const ex of lesson.exercises) {
        expect(ex.meaning).toBeDefined();
        expect(ex.meaning!.length).toBeGreaterThan(0);
      }
    }
  });

  it("validates that helper words like 'mit' contain explicit vocab_hints", () => {
    const l1Syntax = LESSONS.find((l) => l.id === 1)?.exercises.find((e) => e.id === "l1_e5");
    expect(l1Syntax).toBeDefined();
    expect(l1Syntax?.vocab_hints).toBeDefined();
    const mitHint = l1Syntax?.vocab_hints?.find((h) => h.word === "mit");
    expect(mitHint).toBeDefined();
    expect(mitHint?.translation).toBe("with");
  });

  it("guarantees no syntax_builder tiles or answers have trailing periods or punctuation spoilers", () => {
    for (const lesson of LESSONS) {
      const syntaxExercises = lesson.exercises.filter((e) => e.type === "syntax_builder");
      for (const ex of syntaxExercises) {
        expect(ex.word_bank).toBeDefined();
        for (const tile of ex.word_bank!) {
          expect(tile).not.toMatch(/[.,!?;:]$/);
        }
        expect(ex.target_answer).not.toMatch(/[.,!?;:]$/);
      }
      const morphemeExercises = lesson.exercises.filter((e) => e.type === "morpheme_tiles");
      for (const ex of morphemeExercises) {
        if (ex.tile_options) {
          for (const tile of ex.tile_options) {
            expect(tile).not.toMatch(/[.,!?;:]$/);
          }
        }
      }
    }
  });


  // --- TM-1: transcribe — production from a thought, with a cue ladder ---

  it("validates transcribe exercises: bank covers the answer, carries distractors, and cues stay within the ladder cap", () => {
    for (const lesson of LESSONS) {
      const transcribeExercises = lesson.exercises.filter((e) => e.type === "transcribe");
      for (const ex of transcribeExercises) {
        // the thought and the solicitation both exist
        expect(ex.idea).toBeDefined();
        expect(ex.idea!.length).toBeGreaterThan(0);
        expect(ex.prompt.length).toBeGreaterThan(0);

        // word_bank ⊇ every word of the target answer (kept from syntax_builder)…
        expect(ex.word_bank).toBeDefined();
        const targetWords = ex.target_answer.split(" ");
        for (const word of targetWords) {
          expect(ex.word_bank).toContain(word);
        }
        // …and ≥ 1 plausible distractor — a transcribe without distractors is a syntax_builder in disguise
        expect(ex.word_bank!.length).toBeGreaterThan(targetWords.length);

        // cue ladder: 1–3 scaled prompts
        expect(ex.cues).toBeDefined();
        expect(ex.cues!.length).toBeGreaterThanOrEqual(1);
        expect(ex.cues!.length).toBeLessThanOrEqual(3);
        for (const cue of ex.cues!) {
          expect(cue.length).toBeGreaterThan(0);
        }

        // no trailing punctuation in the answer, none on the bank chips
        expect(ex.target_answer).not.toMatch(/[.,!?;:]$/);
        const answers = [ex.target_answer, ...(ex.accepted_answers ?? [])];
        expect(new Set(answers.map((answer) => answer.trim().toLowerCase())).size).toBe(answers.length);
        for (const alternative of ex.accepted_answers ?? []) {
          expect(alternative.trim()).not.toBe("");
          expect(alternative).not.toMatch(/[.,!?;:]$/);
        }
        for (const chip of ex.word_bank!) {
          expect(chip).not.toMatch(/[.,!?;:]$/);
        }
      }

      // production drills never open a lesson (recognition first — don't open at peak load)
      if (lesson.exercises[0].type === "transcribe") {
        throw new Error(`lesson ${lesson.id} opens with a transcribe exercise`);
      }
    }
  });

  // --- TM-2: literal_gloss — the word-for-word English is the lesson ---

  it("validates literal_gloss exercises: unique options, exactly one literal rendering, german and natural present", () => {
    for (const lesson of LESSONS) {
      const glossExercises = lesson.exercises.filter((e) => e.type === "literal_gloss");
      for (const ex of glossExercises) {
        expect(ex.options).toBeDefined();
        expect(ex.options!.length).toBeGreaterThanOrEqual(3);
        expect(ex.options!.length).toBeLessThanOrEqual(4);
        expect(new Set(ex.options).size).toBe(ex.options!.length);
        expect(ex.options).toContain(ex.target_answer);
        expect(ex.german).toBeDefined();
        expect(ex.german!.length).toBeGreaterThan(0);
        expect(ex.natural).toBeDefined();
        expect(ex.natural!.length).toBeGreaterThan(0);
        expect(ex.explanation).toBeDefined();
        expect(ex.explanation!.length).toBeGreaterThan(0);
      }

      if (lesson.exercises[0].type === "literal_gloss") {
        throw new Error(`lesson ${lesson.id} opens with a literal_gloss exercise`);
      }
    }
  });

  // --- TM-5a: the twist — one per lesson, outside the 5-exercise contract ---

  it("keeps the twist outside the 5-exercise contract and well-formed when authored", () => {
    for (const lesson of LESSONS) {
      // exactly 5 exercises, twist not counted
      expect(lesson.exercises.length).toBe(5);
      if (!lesson.twist) continue;

      expect(lesson.twist.prompt.length).toBeGreaterThan(0);
      expect(lesson.twist.target_answer.length).toBeGreaterThan(0);
      expect(lesson.twist.target_answer).not.toMatch(/[.,!?;:]$/);
      expect(lesson.twist.explanation.length).toBeGreaterThan(0);

      if (lesson.twist.word_bank) {
        const targetWords = lesson.twist.target_answer.split(" ");
        for (const word of targetWords) {
          expect(lesson.twist.word_bank).toContain(word);
        }
        for (const chip of lesson.twist.word_bank) {
          expect(chip).not.toMatch(/[.,!?;:]$/);
        }
      }
    }
  });

  // --- TM-3: affirmations and authored diagnoses ride on the exercises ---

  it("keeps authored affirmations short and diagnoses paired", () => {
    for (const lesson of LESSONS) {
      for (const ex of lesson.exercises) {
        if (ex.affirmation !== undefined) {
          expect(ex.affirmation.length).toBeGreaterThan(0);
          expect(ex.affirmation.length).toBeLessThanOrEqual(140);
        }
        if (ex.diagnosis !== undefined) {
          expect(ex.diagnosis.slip.length).toBeGreaterThan(0);
          expect(ex.diagnosis.cue.length).toBeGreaterThan(0);
        }
      }
    }
  });

  // --- TM-1/TM-2: word-order errors must never sneak through the tiered grader ---

  it("grades transcribed word-order swaps as incorrect, not exact", () => {
    expect(evaluateAnswerAccuracy("Ich will lernen Deutsch", "Ich will Deutsch lernen").accuracy).toBe("incorrect");
    expect(evaluateAnswerAccuracy("Ich will Deutsch lernen", "Ich will Deutsch lernen").accuracy).toBe("exact");
  });
  it("is solvable: single-use tiles can actually spell the target (duplicates need duplicate tiles)", () => {
    const stripEnd = (t: string) => t.replace(/[.,!?;:]+$/, "");
    // can `word` be spelled by gluing tiles from the pool, each used once?
    const segment = (word: string, pool: string[]): boolean => {
      if (!word) return true;
      return pool.some((tile, i) => {
        const bare = tile.replace(/^-/, "");
        return bare && word.startsWith(bare) && segment(word.slice(bare.length), pool.filter((_, j) => j !== i));
      });
    };
    const problems: string[] = [];
    for (const lesson of LESSONS) {
      for (const ex of lesson.exercises) {
        const single = ex.type === "syntax_builder" ? ex.word_bank : ex.type === "morpheme_tiles" ? ex.tile_options : undefined;
        if (!single || (ex.type === "morpheme_tiles" && !ex.target_answer.includes(" "))) continue;
        const pool = single.map(stripEnd);
        const tokens = ex.target_answer.replace(/,/g, "").trim().split(/\s+/);
        const left = [...pool];
        const missing: string[] = [];
        for (const tok of tokens) {
          const i = left.indexOf(tok);
          if (i < 0) missing.push(tok);
          else left.splice(i, 1);
        }
        if (missing.length === 0) continue;
        // word-assembly tiles: "das" + "Wass" + "er" -> "das Wasser"
        const [first, ...rest] = tokens;
        const fragmentsOk =
          ex.type === "morpheme_tiles" &&
          pool.includes(first) &&
          segment(rest.join(""), pool.filter((_, i) => i !== pool.indexOf(first)));
        if (!fragmentsOk) problems.push(`${ex.id}: no tile for ${JSON.stringify(missing)}`);
      }
    }
    expect(problems).toEqual([]);
  });
  it("keeps matching exercises playable: at most 12 pairs (the corpus median is 6)", () => {
    const tooBig: string[] = [];
    for (const lesson of LESSONS) {
      for (const ex of lesson.exercises) {
        if (ex.type === "matching_pairs" && (ex.matching_pairs?.length ?? 0) > 12) {
          tooBig.push(`${ex.id}: ${ex.matching_pairs!.length} pairs`);
        }
      }
    }
    expect(tooBig).toEqual([]);
  });

});

describe("Prefix × base family grids teach the prefix law", () => {
  const allFamilyMatrices = LESSONS.flatMap((l) =>
    l.exercises.filter((e) => e.type === "family_matrix").map((e) => ({ lessonId: l.id, ex: e }))
  );

  it("l15_e4 is a real separable-verb grid (prefix column, base row)", () => {
    const l15 = LESSONS.find((l) => l.id === 15);
    expect(l15).toBeDefined();
    const matrix = l15!.exercises.find((e) => e.id === "l15_e4");
    expect(matrix).toBeDefined();
    const ex = matrix!;

    const prefixes = ex.columns!.map((c) => c.replace(/-$/, ""));
    const bases = ex.rows!;
    expect(prefixes).toEqual(["auf", "an", "mit"]);
    expect(bases).toEqual(["machen", "nehmen", "kommen"]);

    // every cell is prefix + base: the column prefix leads, the row base closes
    ex.cells!.forEach((row, i) => {
      expect(row.length, `row ${i} width`).toBe(prefixes.length);
      row.forEach((cell, j) => {
        expect(cell.german.startsWith(prefixes[j]), `${cell.german} must start with ${prefixes[j]}-`).toBe(true);
        expect(cell.german.endsWith(bases[i]), `${cell.german} must end with ${bases[i]}`).toBe(true);
        expect(cell.english.length).toBeGreaterThan(0);
      });
    });

    // no duplicates, no non-words from the old grid
    const cells = ex.cells!.flat().map((c) => c.german);
    expect(new Set(cells).size).toBe(cells.length);
    expect(cells).not.toContain("mitsehen");

    // the graded cell is the cell the task points at
    const { row, column } = ex.task!;
    expect(ex.cells![row][column].german).toBe(ex.target_answer);
  });

  it("every prefix-column grid (columns ending in -, bare-verb rows) prefixes its cells", () => {
    const prefixGrids = allFamilyMatrices
      .filter(({ ex }) => ex.columns!.every((c) => c.endsWith("-")) && ex.rows!.every((r) => /^[a-zäöüß]+$/.test(r)))
      .map(({ ex }) => ex);
    expect(prefixGrids.map((g) => g.id)).toContain("l15_e4");
    for (const ex of prefixGrids) {
      const prefixes = ex.columns!.map((c) => c.replace(/-$/, ""));
      ex.rows!.forEach((base, i) => {
        ex.cells![i].forEach((cell, j) => {
          expect(cell.german, `${ex.id} cell`).toBe(`${prefixes[j]}${base}`);
        });
      });
      const cells = ex.cells!.flat().map((c) => c.german);
      expect(new Set(cells).size, `${ex.id} duplicate cells`).toBe(cells.length);
      // A single-word cell must be a real compendium word or be glossed by this
      // exercise's own vocab_hints — otherwise the grid invents a form the rest
      // of the trail never teaches (the `mitmachen` case).
      const known = new Set([
        ...Object.keys(compendium.words),
        ...Object.values(compendium.words).map((w) => w.target_word.toLowerCase()),
      ]);
      const hinted = new Set((ex.vocab_hints ?? []).map((h) => h.word.toLowerCase()));
      for (const cell of cells) {
        if (cell.includes(" ")) continue;
        expect(
          known.has(cell.toLowerCase()) || hinted.has(cell.toLowerCase()),
          `${ex.id} cell "${cell}" must be a compendium word or introduced in vocab_hints`
        ).toBe(true);
      }
    }
  });
});
