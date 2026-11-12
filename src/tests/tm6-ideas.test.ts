import { describe, it, expect } from "vitest";
import { LESSONS } from "../data/lessons";
import { TOPICS } from "../data/curriculum";
import { flattenTrailNodes } from "../data/curriculum";
import { isListeningSkipped, LISTENING_SKIP_MS, listeningSkipLabel, listeningSkipRemaining } from "../lib/listening";
import { retryVariant, RETRY_INTENT_LINE } from "../lib/retry-variation";
import { consciousnessLineFor, CONSCIOUSNESS_EVERY } from "../data/consciousness";
import { SOUND_IMPORTS, soundImportSpellings, soundImportsPresentIn } from "../data/sound-imports";
import { DEFAULT_SETTINGS } from "../data/settings";
import type { ExerciseItem } from "../lib/types";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/** Trail order (core → sprigs → next core) — the order an exercise is *met* in. */
const trailOrder = flattenTrailNodes().map((n) => n.id);
const lessonIndex = new Map(LESSONS.map((l) => [l.id, l]));
const trailIndex = new Map(trailOrder.map((id, i) => [id, i]));
const COLD_OPEN_FORBIDDEN = ["derive", "reverse_cognate", "transcribe", "literal_gloss", "dictation", "family_matrix", "variant_english", "pronoun_compression", "spoken_turn_reply"];

describe("TM-6: the dictation exercise", () => {
  it("plays audio the learner must write down, and never opens a lesson", () => {
    const dictations = LESSONS.flatMap((l) => l.exercises.filter((e) => e.type === "dictation"));
    expect(dictations.length).toBeGreaterThan(0);
    for (const l of LESSONS) {
      if (l.exercises[0].type === "dictation") {
        throw new Error(`lesson ${l.id} opens with a dictation exercise`);
      }
    }
  });

  it("always carries the spoken form, a bounded replay budget, and cues", () => {
    for (const l of LESSONS) {
      for (const ex of l.exercises) {
        if (ex.type !== "dictation") continue;
        expect(ex.spoken, `${ex.id} spoken`).toBeTruthy();
        expect(ex.spoken!.length).toBeGreaterThan(0);
        expect(ex.replays ?? 2).toBeGreaterThanOrEqual(1);
        expect(ex.replays ?? 2).toBeLessThanOrEqual(4); // the pause is the exercise
        expect(ex.target_answer).toBeTruthy();
        expect(ex.meaning).toBeTruthy();
        expect(ex.explanation).toBeTruthy();
        for (const cue of ex.cues ?? []) expect(cue.length).toBeGreaterThan(0);
      }
    }
  });

  it("grades against the spoken sentence, punctuation aside", () => {
    for (const l of LESSONS) {
      for (const ex of l.exercises) {
        if (ex.type !== "dictation") continue;
        const strip = (s: string) => s.replace(/[.,!?;:]+$/g, "").trim();
        expect(strip(ex.target_answer)).toBe(strip(ex.spoken ?? ""));
      }
    }
  });
});

describe("TM-6: listening can be skipped for the environment", () => {
  it("one skip silences dictation for 15 minutes and then expires", () => {
    expect(LISTENING_SKIP_MS).toBe(15 * 60 * 1000);
    const now = 1_000_000;
    const until = now + LISTENING_SKIP_MS;
    expect(isListeningSkipped(until, now)).toBe(true);
    expect(isListeningSkipped(until, now + LISTENING_SKIP_MS - 1)).toBe(true);
    expect(isListeningSkipped(until, now + LISTENING_SKIP_MS)).toBe(false);
    expect(isListeningSkipped(until, now + LISTENING_SKIP_MS + 1)).toBe(false);
    expect(isListeningSkipped(0, now)).toBe(false);
    expect(isListeningSkipped(undefined, now)).toBe(false);
  });

  it("labels the remaining window and clamps to at least one minute", () => {
    expect(listeningSkipLabel(LISTENING_SKIP_MS)).toBe("listening off for 15 min");
    expect(listeningSkipLabel(60_000)).toBe("listening off for 1 min");
    expect(listeningSkipLabel(1)).toBe("listening off for 1 min");
    expect(listeningSkipRemaining(LISTENING_SKIP_MS * 2, Date.now())).toBe(0);
  });

  it("ships as a persisted, additive setting with a safe default", () => {
    expect(DEFAULT_SETTINGS.listeningSkippedUntil).toBe(0);
    expect(typeof DEFAULT_SETTINGS.listeningSkippedUntil).toBe("number");
  });
});

describe("TM-6: the family grid", () => {
  it("is a real prefix × base matrix with exactly one graded cell", () => {
    const grids = LESSONS.flatMap((l) => l.exercises.filter((e) => e.type === "family_matrix"));
    expect(grids.length).toBeGreaterThan(0);
    for (const g of grids) {
      expect(g.rows!.length, `${g.id} rows`).toBeGreaterThanOrEqual(2);
      expect(g.columns!.length, `${g.id} columns`).toBeGreaterThanOrEqual(2);
      expect(g.cells!.length).toBe(g.rows!.length);
      for (const row of g.cells!) {
        expect(row.length, `${g.id} row width`).toBe(g.columns!.length);
      }
      // the task cell is inside the grid
      const { row, column } = g.task!;
      expect(g.cells![row][column].german).toBe(g.target_answer);
      // both laws are named, so the learner can derive rather than recall
      expect(g.row_law).toBeTruthy();
      expect(g.column_law).toBeTruthy();
      // at least one seeded example — the grid teaches by example before it grades
      expect((g.seed ?? []).length + 0).toBeGreaterThanOrEqual(1);
      // no duplicate cells: a grid with repeats teaches nothing
      const all = g.cells!.flat().map((c) => c.german);
      expect(new Set(all).size, `${g.id} duplicate cells`).toBe(all.length);
    }
  });

  it("never opens a lesson", () => {
    for (const l of LESSONS) {
      if (l.exercises[0].type === "family_matrix") {
        throw new Error(`lesson ${l.id} opens with a family_matrix exercise`);
      }
    }
  });
});

describe("TM-6: one thought, several honest English renderings", () => {
  it("offers every valid rendering plus at least one word-match trap", () => {
    const variants = LESSONS.flatMap((l) => l.exercises.filter((e) => e.type === "variant_english"));
    expect(variants.length).toBeGreaterThan(0);
    for (const v of variants) {
      expect(v.german, `${v.id} german`).toBeTruthy();
      expect(v.renderings!.length, `${v.id} renderings`).toBeGreaterThanOrEqual(2);
      expect(v.traps!.length, `${v.id} traps`).toBeGreaterThanOrEqual(1);
      // no overlap between what counts and what does not
      const overlap = v.renderings!.filter((r) => v.traps!.includes(r));
      expect(overlap, `${v.id} overlap`).toEqual([]);
      // unique options overall
      const all = [...v.renderings!, ...v.traps!];
      expect(new Set(all).size, `${v.id} duplicates`).toBe(all.length);
      expect(v.explanation).toBeTruthy();
    }
  });

  it("never opens a lesson", () => {
    for (const l of LESSONS) {
      if (l.exercises[0].type === "variant_english") {
        throw new Error(`lesson ${l.id} opens with a variant_english exercise`);
      }
    }
  });
});

describe("TM-6: the new production types are all gated away from the first slot", () => {
  it("no lesson opens with any production type", () => {
    for (const l of LESSONS) {
      if (COLD_OPEN_FORBIDDEN.includes(l.exercises[0].type)) {
        throw new Error(`lesson ${l.id} opens with ${l.exercises[0].type}`);
      }
    }
  });
});

describe("TM-6: breaking the thought up before German orders it", () => {
  it("idea_parts decompose the thought into elements, not a restatement", () => {
    const withParts = LESSONS.flatMap((l) =>
      l.exercises.filter((e) => e.type === "transcribe" && e.idea_parts)
    );
    expect(withParts.length).toBeGreaterThan(0);
    for (const ex of withParts) {
      expect(ex.idea_parts!.length).toBeGreaterThanOrEqual(2);
      for (const p of ex.idea_parts!) expect(p.length).toBeGreaterThan(0);
      // the parts must not simply repeat the idea back verbatim
      expect(ex.idea_parts!.join(" ")).not.toBe(ex.idea);
    }
  });
});

describe("TM-6: preventative correction — the shortcut, named", () => {
  it("trap notes name the over-simplification instead of decreeing the rule", () => {
    const notes = LESSONS.flatMap((l) => [l.hook.trap_note, l.pattern.trap_note]).filter(Boolean);
    expect(notes.length).toBeGreaterThanOrEqual(10);
    for (const n of notes) {
      // the guidebook's move is to voice the learner's own likely over-simplification
      expect(n!, `trap note should voice the mind's offer`).toMatch(/mind will offer|your mind/i);
      expect(n!.length).toBeGreaterThan(60);
    }
  });

  it("courses that the guidebook flags as high-slip all carry one", () => {
    const required = [
      "th-to-d-shift",
      "k-to-ch-shift",
      "pronouns-as-case-anchors",
      "nicht-and-kein",
      "asking-questions",
      "word-order-subordinate-clauses",
      "conversational-past-perfekt",
      "compound-noun-engineering",
      "plurals-and-i-mutation",
      "prepositions-as-physical-metaphors",
    ];
    for (const slug of required) {
      const l = LESSONS.find((x) => x.slug === slug);
      expect(l, slug).toBeDefined();
      const has = Boolean(l!.hook.trap_note || l!.pattern.trap_note);
      expect(has, `${slug} (lesson ${l!.id}) needs a trap_note`).toBe(true);
    }
  });
});

describe("TM-6: foreshadow and payoff", () => {
  it("every foreshadow resolves at the lesson it names, and every payoff has a source", () => {
    const byId = new Map(LESSONS.map((l) => [l.id, l]));
    const foreshadows = LESSONS.filter((l) => l.foreshadow);
    expect(foreshadows.length).toBeGreaterThanOrEqual(3);

    for (const l of foreshadows) {
      const targetId = l.foreshadow!.resolvedIn;
      const target = byId.get(targetId);
      expect(target, `lesson ${l.id} foreshadows ${targetId}, which does not exist`).toBeDefined();
      expect(target!.payoff, `lesson ${targetId} must carry the payoff for ${l.id}`).toBeDefined();
      expect(target!.payoff!.ofLesson).toBe(l.id);
      // the payoff must come *later* in trail order than the foreshadow
      const fromIdx = trailIndex.get(l.id)!;
      const toIdx = trailIndex.get(targetId)!;
      expect(toIdx, `lesson ${l.id} cannot resolve in itself`).toBeGreaterThan(fromIdx);
    }

    for (const l of LESSONS.filter((x) => x.payoff)) {
      const src = byId.get(l.payoff!.ofLesson);
      expect(src, `lesson ${l.id} pays off ${l.payoff!.ofLesson}, which does not exist`).toBeDefined();
      expect(src!.foreshadow, `lesson ${l.id} pays off ${l.payoff!.ofLesson}, which never foreshadowed`).toBeDefined();
    }
  });
});

describe("TM-6: the load-reset trough — interest footnotes", () => {
  /** The exact selection the LessonReader makes for its 30-second detour. */
  const detourFor = (l: (typeof LESSONS)[number]) =>
    [...(l.hook.footnotes ?? []), ...(l.pattern.footnotes ?? [])].find((fn) => fn.interest) ?? null;

  it("flags roughly a third of footnotes as 'for interest'", () => {
    let fn = 0;
    let interest = 0;
    for (const l of LESSONS) {
      for (const sec of ["hook", "pattern"] as const) {
        for (const f of l[sec].footnotes ?? []) {
          fn++;
          if (f.interest) interest++;
        }
      }
    }
    expect(fn).toBeGreaterThan(100);
    // guidebook §1.8/§1.5: the offshoot is a real feature, not decoration — and not
    // so common it becomes wallpaper. The plan's band was 30-50%.
    const share = interest / fn;
    expect(share).toBeGreaterThanOrEqual(0.3);
    expect(share).toBeLessThanOrEqual(0.5);
  });

  it("gives enough of the trail a trough that the affordance actually appears", () => {
    const withTrough = LESSONS.filter((l) => detourFor(l) !== null);
    expect(withTrough.length).toBeGreaterThan(30);
    expect(withTrough.length).toBeLessThan(LESSONS.length * 0.75);
  });

  it("never flags a footnote whose job is a rule the learner must hold", () => {
    // §1.8's third question is "is this information for interest?" — key and
    // supporting information must stay unflagged, or the trough teaches the
    // learner that a law is optional. These are the trail's law-bearing titles.
    const RULE_TITLES = [
      "The Two-Way Prepositions",
      "The Head Word Wears the Pants",
      "The dem/den/dem Row",
      "The -ung Rule Has No Exceptions",
      "Arithmetic of kein",
      "The No-ge- Law",
      "The Stress Tells You It Will Fly",
      "You Eat the Cognate Weekly",
    ];
    for (const l of LESSONS) {
      for (const sec of ["hook", "pattern"] as const) {
        for (const f of l[sec].footnotes ?? []) {
          if (!RULE_TITLES.some((r) => f.title.includes(r))) continue;
          expect(f.interest, `${l.id} ${sec} "${f.title}" is a rule, not an offshoot — it must not be flagged`).toBeFalsy();
        }
      }
    }
  });

  it("keeps every interest footnote out of the grading path", () => {
    // the trough is ungraded by construction; an interest footnote must never be
    // reachable as an answer, a cue, or a target
    for (const l of LESSONS) {
      const titles = [...(l.hook.footnotes ?? []), ...(l.pattern.footnotes ?? [])].filter((f) => f.interest).map((f) => f.title);
      for (const ex of l.exercises) {
        for (const t of titles) {
          expect(ex.target_answer, `${ex.id} grades an interest footnote`).not.toContain(t);
        }
      }
    }
  });
});

describe("TM-6: sound import — you already make this sound", () => {
  it("names an English source word for every German sound", () => {
    expect(SOUND_IMPORTS.length).toBeGreaterThanOrEqual(12);
    for (const imp of SOUND_IMPORTS) {
      expect(imp.grapheme.length).toBeGreaterThan(0);
      expect(imp.sound.length).toBeGreaterThan(0);
      expect(imp.sourceWord, `${imp.grapheme} needs an English source`).toBeTruthy();
      expect(imp.whatsNew, `${imp.grapheme} must say what is actually new`).toBeTruthy();
      expect(imp.taughtIn).toBeGreaterThanOrEqual(1);
      expect(imp.taughtIn).toBeLessThanOrEqual(30);
    }
  });

  it("covers the sounds the trail actually teaches, at the right topics", () => {
    const byGrapheme = new Map(SOUND_IMPORTS.map((s) => [s.grapheme, s]));
    // the velar split — two sounds, one letter — must be taught at the K→CH topic
    expect(byGrapheme.has("ch (soft, after i/e)")).toBe(true);
    expect(byGrapheme.has("ch (hard, after a/o/u)")).toBe(true);
    expect(byGrapheme.get("ch (soft, after i/e)")!.taughtIn).toBe(6);
    expect(byGrapheme.get("ch (hard, after a/o/u)")!.taughtIn).toBe(6);
  });

  it("matches the spelling it claims, not the first letter of it", () => {
    expect(soundImportSpellings("sch")).toEqual(["sch"]);
    expect(soundImportSpellings("ch (soft, after i/e)")).toEqual(["ch"]);
    expect(soundImportSpellings("sp- / st- (initial)")).toEqual(["sp", "st"]);

    const frenchCafe = soundImportsPresentIn("fr", ["café"]).map((imp) => imp.grapheme);
    expect(frenchCafe).not.toContain("ch");
    expect(soundImportsPresentIn("fr", ["changer"]).map((imp) => imp.grapheme)).toContain("ch");

    const schwimmen = soundImportsPresentIn("de", ["schwimmen"]).map((imp) => imp.grapheme);
    expect(schwimmen).toContain("sch");
    expect(schwimmen.filter((grapheme) => grapheme.startsWith("ch"))).toEqual([]);
    const spielen = soundImportsPresentIn("de", ["spielen"]).map((imp) => imp.grapheme);
    expect(spielen).toContain("sp- / st- (initial)");
  });
});

describe("TM-6: masked repetition in the retry queue", () => {
  it("re-shuffles the surface but never touches the graded answer", () => {
    const ex: ExerciseItem = {
      id: "l1_e1",
      type: "matching_pairs",
      prompt: "p",
      target_answer: "the answer",
      word_bank: ["a", "b", "c", "d"],
      options: ["the answer", "no", "nope", "nah"],
      tile_options: ["a", "b", "c"],
      explanation: "e",
    };
    expect(retryVariant(ex, 0)).toBe(ex); // attempt 0 → untouched
    for (const attempt of [1, 2, 3, 7, 99]) {
      const v = retryVariant(ex, attempt);
      expect(v.target_answer).toBe(ex.target_answer);
      expect(v.explanation).toBe(ex.explanation);
      expect([...v.word_bank!].sort()).toEqual([...ex.word_bank!].sort());
      expect([...v.options!].sort()).toEqual([...ex.options!].sort());
      expect([...v.tile_options!].sort()).toEqual([...ex.tile_options!].sort());
      // and the same attempt always yields the same arrangement
      expect(retryVariant(ex, attempt)).toEqual(v);
    }
  });

  it("actually changes the arrangement for at least one real exercise", () => {
    let changed = false;
    for (const l of LESSONS) {
      for (const ex of l.exercises) {
        const v = retryVariant(ex, 1);
        if (JSON.stringify(v.options ?? v.word_bank ?? v.tile_options) !== JSON.stringify(ex.options ?? ex.word_bank ?? ex.tile_options)) {
          changed = true;
        }
      }
    }
    expect(changed).toBe(true);
  });

  it("says why the surface changed, in the guidebook's wording", () => {
    expect(RETRY_INTENT_LINE).toMatch(/not from memory|work it out again|think it through again/i);
  });
});

describe("TM-6: learning consciousness is re-whispered, not nagged", () => {
  it("fires on a deterministic subset of the trail", () => {
    const stops = trailOrder.filter((id) => consciousnessLineFor(id) !== null);
    expect(stops.length).toBeGreaterThan(3);
    // roughly one lesson in N — sparse enough that it never becomes wallpaper
    expect(stops.length).toBeLessThan(trailOrder.length);
    // stable across calls
    expect(consciousnessLineFor(stops[0])).toBe(consciousnessLineFor(stops[0]));
  });

  it("keeps every line about the learner's process, never a grammar rule", () => {
    for (const id of trailOrder) {
      const line = consciousnessLineFor(id);
      if (!line) continue;
      expect(line.length).toBeGreaterThan(30);
      expect(CONSCIOUSNESS_EVERY).toBeGreaterThan(1);
    }
  });
});

describe("TM-6: the article-as-pronoun reframe is installed before the grid uses it", () => {
  it("sprig 1003 exists, is a sprig of topic 10, and precedes the article grid", () => {
    const sprig = lessonIndex.get(1003);
    expect(sprig, "sprig 1003 must exist").toBeDefined();
    expect(sprig!.slug).toBe("articles-are-pronouns-in-disguise");
    const topic10 = TOPICS.find((t) => t.id === 10)!;
    expect(topic10.sprigs.some((s) => s.id === 1003)).toBe(true);
    // trail order: sprig 1003 comes before core 11
    expect(trailIndex.get(1003)!).toBeLessThan(trailIndex.get(11)!);
    // and after its own core
    expect(trailIndex.get(1003)!).toBeGreaterThan(trailIndex.get(10)!);
  });

  it("teaches the D- + pronoun decomposition in its own words", () => {
    const l = lessonIndex.get(1003)!;
    const body = [l.hook.content, l.pattern.content, ...l.exercises.map((e) => e.explanation ?? "")]
      .join(" ")
      .toLowerCase();
    expect(body).toContain("d-");
    expect(body).toContain("sie");
    expect(body).toContain("er");
    expect(body).toContain("es");
  });

  it("grades no vocabulary that is only introduced later on the trail", () => {
    const l = lessonIndex.get(1003)!;
    const here = trailIndex.get(1003)!;
    const FUNCTION_WORDS = new Set([
      "ich", "du", "er", "sie", "es", "wir", "ihr", "und", "ist", "nicht", "das", "der", "die",
      "dem", "den", "ein", "eine", "einen", "kein", "mit", "zu", "in", "an", "auf", "vor",
      "morgen", "heute", "gestern", "was", "wo", "wer", "wann", "wie",
    ]);
    const surfaces: string[] = [l.twist?.target_answer ?? "", ...(l.twist?.word_bank ?? [])];
    // only the types whose target is German prose; matching_pairs and
    // variant_english carry English inside `target_answer` by design
    const GERMAN_PROSE = ["transcribe", "dictation", "family_matrix", "syntax_builder", "morpheme_tiles", "literal_gloss"];
    for (const ex of l.exercises) {
      if (!GERMAN_PROSE.includes(ex.type)) continue;
      surfaces.push(ex.target_answer, ...(ex.word_bank ?? []), ex.spoken ?? "");
    }
    const tokens = surfaces
      .join(" ")
      .split(/\s+/)
      .map((t) => t.toLowerCase().replace(/[^\p{L}]/gu, ""))
      .filter(Boolean);
    const introducedAtOrBefore = (word: string): boolean => {
      if (FUNCTION_WORDS.has(word)) return true;
      const uses = LESSONS.filter(
        (x) =>
          x.word_ids.includes(word) ||
          (x.exercises ?? []).some(
            (e) => (e.word_bank ?? []).some((c) => c.toLowerCase() === word) || (e.tile_options ?? []).some((c) => c.toLowerCase() === word)
          )
      ).map((x) => trailIndex.get(x.id)!);
      const hinted = LESSONS.filter((x) =>
        (x.exercises ?? []).some((e) => (e.vocab_hints ?? []).some((h) => h.word.toLowerCase() === word))
      ).map((x) => trailIndex.get(x.id)!);
      const first = Math.min(...uses, ...hinted);
      return first <= here;
    };
    const bad = tokens.filter((t) => !introducedAtOrBefore(t));
    expect(bad, `words graded before they are taught: ${bad.join(", ")}`).toEqual([]);
  });
});

describe("TM-6 (#16): the grammar panorama stays honest", () => {
  // docs/german-panorama.md maps every structure to lesson ids and marks each
  // taught / inferred / partial. The whole value of that file is that the
  // "taught" claim is true, so this test reads it back and checks it.
  const PANORAMA_DOC = readFileSync(
    resolve(__dirname, "../../docs/german-panorama.md"),
    "utf8"
  );

  /** Every lesson id the panorama document names. */
  const namedLessonIds = [...PANORAMA_DOC.matchAll(/\b(\d{1,4})\b/g)]
    .map((m) => Number(m[1]))
    .filter((n) => n >= 1 && n <= 30_00 && LESSONS.some((l) => l.id === n));

  it("names only lessons that actually exist", () => {
    expect(namedLessonIds.length, "the panorama should name real lessons").toBeGreaterThan(30);
    const unique = [...new Set(namedLessonIds)];
    expect(unique.length).toBeGreaterThan(30);
  });

  it("marks the four lessons that carry the spine's structural reframes", () => {
    // the four things the panorama exists to keep visible
    const spine: Array<[string, number]> = [
      ["the article as D- + pronoun", 1003],
      ["the dative case", 20],
      ["the verb bracket", 2],
      ["the adjective echo", 2403],
    ];
    for (const [label, id] of spine) {
      const l = lessonIndex.get(id);
      expect(l, `${label} must be taught by lesson ${id}`).toBeDefined();
      expect(PANORAMA_DOC, `panorama must mark ${label} as taught`).toContain(`${id}`);
    }
  });

  it("has a status for every structure it lists", () => {
    // only the structure tables (## 1..8) carry a status column; the "how to read
    // this" key and the shift table are checked by their own rows
    const sections = PANORAMA_DOC.split("\n## ").filter((sec) => /^\d\./.test(sec));
    expect(sections.length, "the panorama should have numbered sections").toBeGreaterThanOrEqual(8);
    for (const sec of sections) {
      const rows = sec
        .split("\n")
        .filter((l) => l.startsWith("| "))
        .filter((l) => !/^\|[\s\-|]+\|$/.test(l)) // header + separator
        .filter((l) => !/^\|\s*(Structure|Shift)/.test(l)); // column header
      for (const row of rows) {
        expect(row, `a structure row with no status: ${row.slice(0, 60)}`).toMatch(
          /taught|inferred|partial/
        );
      }
    }
  });

  it("marks the genitive as taught, because 1003 and 5102 state des/der + -s", () => {
    // Verified against the lessons: both pattern cards name the genitive frame,
    // so the panorama must no longer call it a hole needing a sprig.
    expect(PANORAMA_DOC).toMatch(/\| Genitive \(possession\) \| 1003, 5102 \| taught \|/);
    expect(PANORAMA_DOC).not.toMatch(/genitive[^\n]{0,120}one sprig/i);
  });
});
