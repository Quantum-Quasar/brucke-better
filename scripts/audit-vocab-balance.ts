// Vocabulary-balance audit.
//
// Complements scripts/audit-word-refs.ts (existence) and the assessed-retrieval
// recurrence test (per-word floor) with the ORDERING and BALANCE dimensions:
//   a. new-words-per-lesson within bands (classification printed for eyeballing)
//   b. no word required before its introduction lesson in trail order
//      (word_ids ordering is exact; German exercise-surface tokens are resolved
//      to candidate words and checked against first introduction, with a
//      documented PRE_EXISTING allowlist for drifts that predate this audit)
//   c. zero-new lessons ≤ 25% (enforced in --strict, reported otherwise)
//
// Modes:
//   bun scripts/audit-vocab-balance.ts           per-batch: reports over-band and
//       zero-new lessons, fails on real largest violations.
//   bun scripts/audit-vocab-balance.ts --strict  checkpoint: zero-new ≤ 25% and
//       exits 1 on any violation.

import { LESSONS } from "../src/data/lessons";
import { compendium } from "../src/data/compendium";
import { flattenTrailNodes } from "../src/data/curriculum";
import { GERMAN_FUNCTION_WORDS } from "../src/lib/word-token-resolver";

const STRICT = process.argv.includes("--strict");

// ---------------------------------------------------------------- classification
// pattern: single-rule exemplar sets (sound-shift cores & sprigs, prefix families)
const PATTERN = new Set([1, 3, 4, 5, 6, 7, 8, 15, 16, 25, 26, 3002, 101, 301, 302, 401, 402, 501, 502, 601, 602, 701, 801, 2601]);
const GRAMMAR_CORE = new Set([2, 9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 27, 28, 29]);
// Deliberate zero-new revision lessons (drill/gym/reading/review; never accidental).
const REVISION = new Set([30, 702, 902, 1002, 1003, 1101, 1201, 1302, 1401, 1501, 1803, 1901, 2002, 2202, 2501, 3001, 3003, 5012, 5041, 5052, 5061, 5062, 5063, 5361, 5362]);
const BANDS: Record<string, [number, number]> = {
  pattern: [4, 11], grammarCore: [3, 6], consolidation: [2, 4], revision: [0, 2], branch: [0, 8], story: [0, 8],
};
const roleOf = (id: number, kind: string) =>
  PATTERN.has(id) ? "pattern" : GRAMMAR_CORE.has(id) ? "grammarCore" : REVISION.has(id) ? "revision" : kind === "story" ? "story" : kind === "branch" ? "branch" : "consolidation";

// ---------------------------------------------------------------- deferrals
// Lesson-level: the reason below is the record. These lessons intentionally
// consolidate rather than introduce a full band of new words.
const LESSON_DEFERRALS: Record<number, string> = {
  2401: "Twin Suppletions: closed-class suppletion; no fitting untouched compendium words.",
  2801: "fahren & its Dynasty: the planned words (urlaub, meer) were hosted at l29, where the sea/vacation idioms belong; fahren, Fahrt and Zug are all taught earlier in full, so the lesson consolidates.",
};

// German exercise-surface tokens that referenced their word before its
// introduction. Documented drifts; shrink as batches reword them.
// Format: `${lessonId}:${token.toLowerCase()}`.
const PRE_EXISTING = new Set([
  "2:soll", "9:kaffee", "9:tee", "12:weiß", "13:weißt", "14:weiß", "22:lesen", "23:auto",
  "23:autos", "28:gift", "30:gabe", "30:rat", "30:gift", "1401:weiß", "1402:müde",
  "1604:ziehe", "1702:mittwoch", "1802:auto", "2401:film", "2403:wein", "2501:gabe",
  "2501:gift", "2901:gelesen", "3001:abend", "3001:gelesen", "1002:sehe",
  "21:zahnarzt", "21:zahn", "902:art", "1201:bekomme", "1403:vergesse", "602:kaffee",
  "602:kind", "302:schreiben", "1801:werden", "1802:werde",
  // Original prose that used the word before any lesson listed it.
  "1:deutsch", "1:brücke", "103:wander", "302:schlagen", "1101:kurz",
  "1201:weiß", "1501:fall", "1601:brücke", "1801:gewandert", "1803:gewandert",
  "2101:krankenhaus", "2101:spielen", "2201:wanderung", "2302:lehrer",
  // "weißt" is conjugated wissen; the stem resolver reads the adjective weiß.
  "1302:weißt", "1401:jetzt", "1703:viertel",
  // Compound tiles, surnames and other homographs whose word is taught later.
  "1701:bus", "21:schuh", "5052:sofa", "8:computer", "802:computer",
  "21:arzt", "5071:braun",
  "13:wohnst", "13:jetzt", "1301:dort",
]);

// ---------------------------------------------------------------- resolver
const compTargets = new Map<string, string[]>();
for (const [id, w] of Object.entries(compendium.words)) {
  const t = w.target_word.toLowerCase();
  (compTargets.get(t) ?? compTargets.set(t, []).get(t)!).push(id);
}
// Function words beyond the shared closed list (pronouns, future auxiliary).
const EXTRA_FUNCTION = new Set(["man", "wen", "uns", "werden", "werde"]);
const FUNCTION_WORDS = new Set(GERMAN_FUNCTION_WORDS);
const RESOLVED: Record<string, string> = {
  kannst: "können", kann: "können", willst: "wollen", hast: "haben", hilft: "helfen",
  hilf: "helfen", gefunden: "finden", fand: "finden", gegessen: "essen", stehe: "aufstehen",
  steht: "aufstehen", genommen: "nehmen", gibst: "geben", kaufe: "einkaufen",
  wachen: "aufwachen",
};
const stems = new Map<string, string[]>();
for (const id of Object.keys(compendium.words)) {
  const stem = id.length > 4 && id.endsWith("en") ? id.slice(0, -2) : id;
  (stems.get(stem) ?? stems.set(stem, []).get(stem)!).push(id);
}
const fold = (s: string) => s.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");

function candidates(rawToken: string): string[] {
  const raw = rawToken.toLowerCase().replace(/[.,!?;:)]+$/, "");
  if (!raw || FUNCTION_WORDS.has(raw) || EXTRA_FUNCTION.has(raw)) return [];
  const out = new Set<string>();
  if (RESOLVED[raw]) out.add(RESOLVED[raw]);
  for (const id of compTargets.get(raw) ?? []) out.add(id);
  const geStripped = raw.startsWith("ge") && raw.length > 4 ? raw.slice(2) : raw;
  for (const id of compTargets.get(fold(geStripped)) ?? []) out.add(id);
  // Stem matching is morphological, and only the sharp-s fold may apply:
  // folding umlauts made zähle (zählen) resolve to the unrelated noun zahl.
  if (geStripped.length >= 4) {
    for (const [stem, ids] of stems) {
      if (stem.length >= 4 && geStripped.startsWith(stem)) for (const id of ids) out.add(id);
    }
  }
  return [...out];
}

// ---------------------------------------------------------------- walk
type Node = { id: number; kind: "core" | "sprig" | "branch"; topicId: number };
const nodes = flattenTrailNodes() as unknown as Node[];
const byId = new Map(LESSONS.map((l) => [l.id, l]));

const firstIntro = new Map<string, number>();
const trail = nodes.filter((n) => byId.has(n.id)).map((n, i) => {
  const lesson = byId.get(n.id)!;
  const wids = [...new Set(lesson.word_ids)];
  const newW: string[] = [];
  for (const w of wids) if (!firstIntro.has(w)) { firstIntro.set(w, i); newW.push(w); }
  return { idx: i, id: n.id, kind: n.kind, title: lesson.title, wids, newW, role: roleOf(n.id, n.kind) };
});

// ---------------------------------------------------------------- checks
const fails: string[] = [], notes: string[] = [];

// b. legality — word_ids ordering (exact)
for (const l of trail) {
  for (const w of l.wids) {
    const intro = firstIntro.get(w) ?? Infinity;
    if (intro > l.idx) fails.push(`legality: l${l.id} word_ids entry "${w}" first introduced at trail ${intro}`);
  }
}
// b. legality — German exercise-surface tokens (allowlist for pre-existing drifts)
function surfaces(lesson: (typeof LESSONS)[number]): Array<{ where: string; text: string }> {
  const out: Array<{ where: string; text: string }> = [];
  for (const ex of lesson.exercises) {
    const w = `l${lesson.id}/${ex.id}`;
    if (ex.type === "morpheme_tiles") out.push({ where: w, text: [...(ex.tile_options ?? []), ex.target_answer].join(" ") });
    else if (ex.type === "matching_pairs") out.push({ where: w, text: (ex.matching_pairs ?? []).map((p) => p.german).join(" ") });
    else if (ex.type === "shift_select") {
      const choices = [...(ex.options ?? []), ex.target_answer];
      // Bilingual comparison choices put the assessed German after the arrow.
      const pairs = choices.every((choice) => choice.split(" → ").length === 2);
      out.push({ where: w, text: choices.map((choice) => (pairs ? choice.split(" → ")[1] : choice)).join(" ") });
    } else if (ex.type === "derive" || ex.type === "reverse_cognate") out.push({ where: w, text: ex.target_answer });
    else if (ex.type === "syntax_builder") out.push({ where: w, text: [...(ex.word_bank ?? []), ex.target_answer].join(" ") });
    else if (ex.type === "transcribe") out.push({ where: w, text: [ex.target_answer, ...(ex.accepted_answers ?? []), ...(ex.word_bank ?? [])].join(" ") });
    else if (ex.type === "literal_gloss") out.push({ where: w, text: [ex.german ?? "", ex.target_answer].join(" ") });
    else if (ex.type === "family_matrix") out.push({ where: w, text: (ex.cells ?? []).flat().map((c) => c.german).join(" ") });
    else if (ex.type === "dictation") out.push({ where: w, text: [ex.spoken ?? ex.target_answer, ex.target_answer].join(" ") });
    else if (ex.type === "variant_english") out.push({ where: w, text: ex.german ?? "" });
    else if (ex.type === "pronoun_compression") out.push({ where: w, text: [ex.full_sentence ?? "", ex.target_answer, ...(ex.word_bank ?? [])].join(" ") });
    else if (ex.type === "spoken_turn_reply") out.push({ where: w, text: [ex.spoken_question ?? "", ex.target_answer, ...(ex.word_bank ?? [])].join(" ") });
  }
  if (lesson.twist) out.push({ where: `l${lesson.id}/twist`, text: [lesson.twist.target_answer, ...(lesson.twist.word_bank ?? [])].join(" ") });
  return out;
}

let preExistingHits = 0;
for (const l of trail) {
  const lesson = byId.get(l.id)!;
  // A vocab hint is an in-place gloss: a word the lesson introduces right where
  // it uses it counts as introduced here, not as a future-word leak.
  const hinted = new Set(
    lesson.exercises.flatMap((ex) => (ex.vocab_hints ?? []).map((h) => h.word.toLowerCase()))
  );
  for (const surf of surfaces(lesson)) {
    for (const tok of surf.text.split(/[\s—]+/)) {
      if (hinted.has(tok.toLowerCase().replace(/[.,!?;:)]+$/, ""))) continue;
      const cands = candidates(tok);
      if (!cands.length) continue;
      const firsts = cands.map((c) => firstIntro.get(c)).filter((x): x is number => x !== undefined);
      if (!firsts.length) continue;
      if (Math.min(...firsts) > l.idx) {
        const key = `${l.id}:${tok.toLowerCase().replace(/[.,!?;:)]+$/, "")}`;
        if (PRE_EXISTING.has(key)) { preExistingHits++; continue; }
        fails.push(`legality: l${l.id} ${surf.where} token "${tok}" resolves to word(s) introduced later (trail ${Math.min(...firsts)})`);
      }
    }
  }
}

// a. bands
const bandFails: string[] = [];
for (const l of trail) {
  if (LESSON_DEFERRALS[l.id]) continue;
  const [lo, hi] = BANDS[l.role];
  const n = l.newW.length;
  if (n >= lo && n <= hi) continue;
  const msg = `band: l${l.id} (${l.role}, "${l.title}") has ${n} new words, band ${lo}-${hi}`;
  if (STRICT) bandFails.push(msg);
  else notes.push(`pending — ${msg}`);
}
for (const f of bandFails) fails.push(f);

// c. zero-new share
const zeroNew = trail.filter((l) => l.newW.length === 0);
const zeroPct = (zeroNew.length / trail.length) * 100;
if (STRICT && zeroPct > 25) fails.push(`zero-new lessons ${zeroNew.length}/${trail.length} (${zeroPct.toFixed(1)}%) exceed 25%`);
const zeroNewUnplanned = zeroNew.filter((l) => !REVISION.has(l.id) && !LESSON_DEFERRALS[l.id]).map((l) => l.id);

// ---------------------------------------------------------------- report
console.log(`=== vocab-balance audit ${STRICT ? "(strict)" : ""} ===`);
console.log(`unique taught words: ${firstIntro.size}`);
console.log(`histogram: ${JSON.stringify(trail.reduce((h: Record<number, number>, l) => { h[l.newW.length] = (h[l.newW.length] ?? 0) + 1; return h; }, {}))}`);
console.log(`zero-new: ${zeroNew.length}/${trail.length} (${zeroPct.toFixed(1)}%)`);
if (zeroNewUnplanned.length && (STRICT || zeroPct <= 25)) fails.push(`zero-new outside the deliberate revision set / deferrals: ${zeroNewUnplanned.join(", ")}`);
console.log(`pre-existing drift tokens honored from allowlist: ${preExistingHits}`);
for (const n of notes) console.log(`  · ${n}`);
if (fails.length) {
  console.log(`\n✗ ${fails.length} violation(s):`);
  for (const f of fails) console.log("  ✗ " + f);
  process.exit(1);
}
console.log(`\n✓ vocab balance checks pass`);
