// Native-speaker naturalness review extraction (spec:
// docs/ideas to add in future/native-speaker-naturalness-audit.md, Option B).
//
// Walks every learner-facing German surface in the German course and returns
// deduplicated rows with full provenance, an English meaning where the data
// provides one, and a structure bucket for the checker-facing review grids.
//
// The output is a *review packet* — suspects to discuss, never auto-fixes.
// Shared by the Vitest suite (src/tests/naturalness-extract.test.ts) and the
// CLI writer (scripts/export-naturalness-review.ts), so `bun run test` and the
// exported packet can never drift apart.

import { LESSONS } from "../data/lessons";
import { germanTokens } from "./word-token-resolver";
import { resolves } from "./word-refs-audit";

export interface NaturalnessOccurrence {
  lesson: number;
  /** surface label of the form "<type> · <field>", e.g. "dictation · spoken" */
  surface: string;
  german: string;
  /** English meaning paired by the data; "" when the surface carries none. */
  english: string;
}

export interface NaturalnessRow {
  id: string;
  bucket: string;
  /** first-seen original string (case and punctuation preserved) */
  german: string;
  /** every distinct original spelling behind this normalized key */
  originals: string[];
  english: string;
  /** provenance entries of the form "<lessonId> · <surface>", all occurrences */
  sources: string[];
}

export interface SurfaceStat {
  surface: string;
  occurrences: number;
  included: number;
  /** failed the is-German test (English by design, e.g. gloss answers) */
  excluded: number;
}

export interface NaturalnessStats {
  occurrences: number;
  included: number;
  excludedNotGerman: number;
  distinct: number;
  rowsWithoutEnglish: number;
  perBucket: Record<string, number>;
  perSurface: SurfaceStat[];
}

// ---------------------------------------------------------------------------
// Buckets — one reviewer skims one structure at a time. First match wins.
// ---------------------------------------------------------------------------

export const BUCKETS: Array<{ slug: string; name: string }> = [
  { slug: "relative-clauses", name: "Relative clauses" },
  { slug: "konjunktiv-ii", name: "Konjunktiv II" },
  { slug: "subordinate-clauses", name: "Subordinate clauses" },
  { slug: "questions-word-order", name: "Questions & word order" },
  { slug: "negation", name: "Negation" },
  { slug: "modals", name: "Modals" },
  { slug: "perfekt-praeteritum", name: "Perfekt & Präteritum" },
  { slug: "imperative", name: "Imperative" },
  { slug: "verb-bracket", name: "Verb bracket" },
  { slug: "two-way-prepositions", name: "Two-way prepositions" },
  { slug: "dative", name: "Dative" },
  { slug: "adjective-endings", name: "Adjective endings" },
  { slug: "single-words-phrases", name: "Single words & short phrases" },
  { slug: "mixed-prose", name: "Mixed prose (teaching text)" },
  { slug: "other", name: "Other" },
];

const BUCKET_NAMES = new Map(BUCKETS.map((b) => [b.slug, b.name]));

/** Authored mixed EN/DE prose — checked whole-field in its own bucket,
 * because a paragraph spans several laws and reads as English around the German. */
const PROSE_SURFACES = new Set(["hook · content", "pattern · content", "vocab_hints · note"]);

// ---------------------------------------------------------------------------
// Is this string German? (target_answer is authored English on some types)
// ---------------------------------------------------------------------------

// English function/content words with no German homograph. Homographs that are
// ordinary German words (die, was, war, hat, will, man, so, still, kind, fast,
// arm, also, am, in, see/See, form/Form) are deliberately absent — a German
// sentence may legitimately contain them.
const ENGLISH_MARKERS = new Set([
  "the", "and", "is", "are", "you", "your", "yours", "i", "we", "my", "me", "mine",
  "him", "his", "hers", "she", "they", "them", "their", "theirs", "her", "it", "its",
  "with", "for", "that", "this", "these", "those", "there", "here", "have", "has", "had",
  "be", "been", "being", "was", "were", "what", "when", "where", "why", "how",
  "who", "whom", "whose", "which", "not", "no", "yes", "of", "to", "on", "at",
  "from", "by", "or", "but", "if", "then", "than", "very", "can", "could", "would",
  "should", "must", "may", "might", "shall", "do", "does", "did", "done",
  "go", "goes", "went", "gone", "come", "comes", "came", "get", "gets", "got",
  "take", "takes", "took", "make", "makes", "made", "sees", "saw", "seen",
  "say", "says", "said", "know", "knows", "knew", "think", "thinks", "thought",
  "want", "wants", "wanted", "use", "uses", "used", "find", "finds", "found",
  "give", "gives", "gave", "tell", "tells", "told", "need", "needs", "feel",
  "feels", "felt", "seem", "seems", "let", "put", "puts", "mean", "means",
  "keep", "keeps", "kept", "help", "helps", "talk", "talks", "turn", "turns",
  "start", "starts", "just", "now", "only", "back", "even", "well", "way",
  "about", "after", "before", "again", "both", "each", "few", "more", "most",
  "other", "some", "such", "too", "our", "ours", "himself", "herself", "itself",
  "into", "over", "under", "out", "up", "down", "because", "while", "through",
  "between", "against", "without", "during", "always", "never", "often",
  "sometimes", "already", "yet", "yesterday", "today", "tomorrow", "week",
  "month", "year", "day", "night", "morning", "evening", "word", "words",
  "sentence", "verb", "verbs", "noun", "nouns", "article", "case", "cases",
  "tense", "forms", "english", "german", "enough", "church", "replaced",
  "honor", "motion", "ride", "ancient", "preposition", "demonstrative",
  "force", "carries", "points", "god", "hardened", "sibilant", "split",
  "old", "same", "little", "much", "many", "quite", "rather", "really",
]);

// German grammar words the word-ref resolver cannot reach (it resolves taught
// stems; these are function/inflection forms). Closed list — only extends what
// this extraction counts as German; it guards nothing else.
const GERMAN_SUPPLEMENT = new Set([
  // pronouns & demonstratives outside GERMAN_FUNCTION_WORDS
  "sich", "uns", "euch", "seid",
  "dieser", "diese", "dieses", "diesen", "diesem",
  "jener", "jene", "jenes", "jenem", "jenen",
  // Präteritum / Konjunktiv forms without umlauts
  "warst", "wart", "hattest", "hatten", "wurde", "wurdest", "wurden",
  "kam", "kamst", "kamen", "trat", "tratet",
  "brachte", "brachten", "dachte", "dachten",
  "wusste", "wusstest", "wussten", "konnte", "konntest", "konnten",
  "musste", "musstest", "mussten", "wollte", "wolltest", "wollten",
  "durfte", "durftest", "durften", "sollte", "solltest", "sollten",
  "gab", "gabst", "gaben", "nahm", "nahmst", "nahmen",
  "fand", "fanden", "ging", "gingst", "gingen", "sah", "sahen",
  "fuhr", "fuhren", "lief", "liefen", "trank", "tranken",
  "schlief", "sprach", "sprachen", "las",
  // ablaut participles the ge-strip + stem rule cannot reach
  "gesungen", "getrunken", "gesprochen", "gewesen", "gegangen", "abgefahren",
]);

const hasUmlaut = (s: string) => /[äöüß]/i.test(s);
const foldUmlauts = (s: string) => s.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");

const isEnglishMarker = (token: string) => ENGLISH_MARKERS.has(token.toLowerCase());
const isGermanMarker = (token: string) => GERMAN_SUPPLEMENT.has(token.toLowerCase()) || resolves(token);

/** Strip parenthesized English glosses ("Es scheint mir (it seems TO ME)"). */
function stripEnglishParens(text: string): string {
  return text.replace(/\([^)]*\)/g, (inner) => (germanTokens(inner).some(isEnglishMarker) ? " " : inner));
}

/**
 * Whether an authored German-surface string actually is German. Two-step:
 * an unambiguous English marker excludes it; then a German marker (or a bare
 * umlaut, or the authored-German default for multi-word answers) includes it.
 * Single unknown tokens (e.g. the gloss answer "yon") stay excluded.
 */
export function isGermanAuthored(text: string): boolean {
  const cleaned = stripEnglishParens(text);
  const tokens = germanTokens(cleaned);
  if (tokens.length === 0) return false;
  if (tokens.some(isEnglishMarker)) return false;
  if (tokens.some(isGermanMarker)) return true;
  if (hasUmlaut(cleaned)) return true;
  // authored German surface, multi-word — but only when at least one token has
  // real length, so serializations like "TH→D" are not waved through
  if (tokens.length >= 2 && tokens.some((t) => t.length >= 3)) return true;
  return resolves(tokens[0]);
}

// ---------------------------------------------------------------------------
// Deduplication & normalization
// ---------------------------------------------------------------------------

/** Trim, collapse whitespace, strip trailing punctuation — the dedupe key basis. */
export function normalizeKey(text: string): string {
  return text.trim().replace(/\s+/g, " ").replace(/[.,!?;:…]+$/, "").toLowerCase();
}

// ---------------------------------------------------------------------------
// Bucketing — keyword + pattern heuristics on the lowercased normalized text
// ---------------------------------------------------------------------------

const KONJUNKTIV = /\b(?:wäre|wären|würde|würden|könnte|könnten|müsste|müssten|hätte|hätten|dürfte|dürften|ginge|käme|wüsste)\b/;
const SUBORDINATION = /\b(?:weil|dass|wenn|obwohl|damit|ob)\b/;
const NEGATION = /\b(?:nicht|kein|keine|keinen|keinem|keiner|keines|nichts|nie|niemals)\b/;
const W_WORD = /^(?:was|wo|wer|wann|warum|wieso|weshalb|wohin|wie|welche|welcher|welches|welchen|welchem)\b/;
const W_WORD_ANY = /\b(?:was|wo|wer|wann|warum|wohin|wie)\b/;
const FRONTED_ADVERBIAL = /^(?:heute|gestern|morgen|jetzt|danach|dann|abends|morgens|nachmittags)\b/;
const VERB_FIRST_QUESTION = /^(?:ist|sind|bin|bist|haben|hast|hat|habe|habt|seid|war|waren|kannst|kann|könnt|willst|will|wollt|muss|musst|müssen|müsst|darf|darfst|dürfen|dürft|sollst|sollt|möchtest|möchten|mögt|wohnst|wohnt|kommst|kommt|gehst|geht)\s+(?:du|ihr|sie|er|es|wir|ich|man)\b/;
const MODALS = /\b(?:kann|kannst|können|könnt|muss|musst|müssen|müsst|darf|darfst|dürfen|dürft|will|willst|wollen|wollt|möchte|möchten|mag|magst|mögt)\b/;
const PARTICIPLE = /\bge[a-zäöüß]{2,}(?:t|en)\b/;
const PRAETERITUM = /\b(?:hatte|hatten|warst|wart|waren|war|kam|kamst|kamen|ging|gingst|gingen|fand|fanden|brachte|brachten|dachte|dachten|sah|sahen|fuhr|fuhren|lief|liefen|trank|tranken|schlief|sprach|sprachen|las|nahm|nahmst|nahmen|gab|gaben|wollte|wollten|konnte|konnten|musste|mussten|durfte|durften|wusste|wussten|sollte|sollten)\b/;
const IMPERATIVE_START = /^(?:komm|kommt|geh|geht|mach|macht|sag|sagt|nimm|nehmt|gib|gebt|sprich|sprecht|iss|esst|trink|trinkt|warte|wartet|ruf|ruft|sei|seid|fahr|fahrt|hilf|helft|lies|lest|denk|denkt|hol|holt|bring|bringt|zeig|zeigt|steh|steht|bleib|bleibt|schreib|schreibt|frag|fragt|leg|legt|stell|stellt|wähl|wählt|vergiss|drück|drückt|öffne|öffnet|setz|setzt|atme|atmet|probier|probiert|wasch|wascht|koch|kocht|such|sucht|glaub|glaube|merk|merke|pass)\b/;
const PRONOUN_AFTER_VERB = /^\S+\s+(?:du|ihr|sie|wir|ich)\b/;
const ZU_INFINITIVE = /\bzu\s+[a-zäöüß]+en\b/;
const TRAILING_PARTICLE = /\b(?:auf|an|aus|mit|ein|vor|ab|zurück|los|heraus|herein|hinein|drauf|dran|daran|darauf|runter|rauf|raus|rein|vorbei|weiter|herunter)$/;
const TWO_WAY_PREP = /\b(?:in|an|auf|über|unter|vor|hinter|neben|zwischen)\s+(?:den|die|das|dem|der|einen|eine|ein|einem|einer|im|am|ins|ans)\b/;
const DATIVE = /\b(?:dem|einem|einer|ihm|ihnen|mir|dir|zum|zur|vom)\b/;
// tested against folded text, so stems are written folded (heiss, gross, …)
const ADJECTIVE_ENDING = /\b(?:gut|neu|alt|gross|klein|heiss|kalt|warm|rot|blau|grun|gelb|lang|kurz|jung|schon|schnell|billig|teuer|gunstig|wichtig|fertig|mude|gesund|krank|stark|schwach|dunkel|hell|spaet|richtig|falsch|best|besser)(?:e|en|er|es|em)\b/;

export function bucketOf(surface: string, german: string): string {
  if (PROSE_SURFACES.has(surface)) return "mixed-prose";
  const l = normalizeKey(german).toLowerCase();
  const lf = foldUmlauts(l);
  const tokens = l.split(" ").filter(Boolean);
  if (/(?:,|;)\s*(?:der|die|das|den|dem|dessen|deren|wo)\b/.test(l) || /\b(?:dessen|deren)\b/.test(l)) return "relative-clauses";
  if (KONJUNKTIV.test(l)) return "konjunktiv-ii";
  if (SUBORDINATION.test(l)) return "subordinate-clauses";
  if (l.includes("?") || W_WORD.test(l) || W_WORD_ANY.test(l) || FRONTED_ADVERBIAL.test(l) || VERB_FIRST_QUESTION.test(l)) return "questions-word-order";
  if (NEGATION.test(l)) return "negation";
  if (MODALS.test(l)) return "modals";
  if (PARTICIPLE.test(l) || PRAETERITUM.test(l)) return "perfekt-praeteritum";
  if (IMPERATIVE_START.test(l) && !PRONOUN_AFTER_VERB.test(l)) return "imperative";
  if (ZU_INFINITIVE.test(l) || TRAILING_PARTICLE.test(l)) return "verb-bracket";
  if (TWO_WAY_PREP.test(l)) return "two-way-prepositions";
  if (DATIVE.test(l)) return "dative";
  if (ADJECTIVE_ENDING.test(lf)) return "adjective-endings";
  if (tokens.length <= 4) return "single-words-phrases";
  return "other";
}

// ---------------------------------------------------------------------------
// The walk
// ---------------------------------------------------------------------------

// target_answer is authored English on these (glosses, word-for-word renderings,
// English variants); their German lives on other fields captured below.
const ENGLISH_BY_DESIGN_TYPES = new Set(["reverse_cognate", "variant_english", "literal_gloss"]);

/** English meaning the data pairs with this exercise's German answer. */
function exerciseEnglish(ex: {
  meaning?: string; idea?: string; question_meaning?: string; english_hint?: string; prompt?: string;
}): string {
  return ex.meaning?.trim() || ex.idea?.trim() || ex.question_meaning?.trim() || ex.english_hint?.trim() || ex.prompt?.trim() || "";
}

/** Every learner-facing German occurrence on the surfaces of the spec's corpus table,
 * plus the typed German fields the table predates (matching cards, variant/turn/
 * compression German, accepted answers) — each tagged with its surface. */
export function collectNaturalnessOccurrences(): NaturalnessOccurrence[] {
  const occs: NaturalnessOccurrence[] = [];
  const add = (lesson: number, surface: string, german: string | undefined | null, english: string | undefined | null) => {
    if (!german || !german.trim()) return;
    occs.push({ lesson, surface, german, english: english?.trim() ?? "" });
  };

  for (const lesson of LESSONS) {
    add(lesson.id, "summary · use_example", lesson.summary.use_example.german, lesson.summary.use_example.english);
    if (lesson.twist) add(lesson.id, "twist · target_answer", lesson.twist.target_answer, lesson.twist.prompt);
    add(lesson.id, "hook · content", lesson.hook.content, "");
    add(lesson.id, "pattern · content", lesson.pattern.content, "");

    for (const ex of lesson.exercises) {
      // matching_pairs' target_answer is a comma-joined serialization of its cards
      // ("mein, dein, mein Bett…") — the cards below are the graded German surface,
      // so the joined list itself is not extracted as a review row
      if (ex.type !== "matching_pairs" && !ENGLISH_BY_DESIGN_TYPES.has(ex.type)) {
        add(lesson.id, `${ex.type} · target_answer`, ex.target_answer, exerciseEnglish(ex));
      }
      if (ex.type === "dictation") add(lesson.id, "dictation · spoken", ex.spoken, ex.meaning || ex.english_hint || ex.prompt);
      if (ex.type === "literal_gloss") add(lesson.id, "literal_gloss · german", ex.german, ex.natural);
      if (ex.type === "variant_english") add(lesson.id, "variant_english · german", ex.german, ex.target_answer);
      if (ex.type === "spoken_turn_reply") add(lesson.id, "spoken_turn_reply · spoken_question", ex.spoken_question, ex.question_meaning);
      if (ex.type === "pronoun_compression") add(lesson.id, "pronoun_compression · full_sentence", ex.full_sentence, ex.prompt);
      if (ex.type === "family_matrix") {
        for (const row of ex.cells ?? []) for (const cell of row) add(lesson.id, "family_matrix · cell", cell.german, cell.english);
      }
      if (ex.type === "matching_pairs") {
        for (const pair of ex.matching_pairs ?? []) add(lesson.id, "matching_pairs · card", pair.german, pair.english);
      }
      for (const accepted of ex.accepted_answers ?? []) add(lesson.id, `${ex.type} · accepted_answer`, accepted, exerciseEnglish(ex));
      for (const hint of ex.vocab_hints ?? []) add(lesson.id, "vocab_hints · note", hint.note, "");
    }
  }
  return occs;
}

/**
 * Deduplicated review rows: stable sort (bucket, normalized key, first seen),
 * stable ids ("<bucket-slug>-<n>"), all provenance and original spellings kept.
 */
export function extractNaturalnessRows(): { rows: NaturalnessRow[]; stats: NaturalnessStats } {
  const occs = collectNaturalnessOccurrences();

  const perSurface = new Map<string, SurfaceStat>();
  const byKey = new Map<string, { row: NaturalnessRow; order: number }>();
  let order = 0;

  for (const occ of occs) {
    const stat = perSurface.get(occ.surface) ?? { surface: occ.surface, occurrences: 0, included: 0, excluded: 0 };
    stat.occurrences++;
    perSurface.set(occ.surface, stat);

    if (!PROSE_SURFACES.has(occ.surface) && !isGermanAuthored(occ.german)) {
      stat.excluded++;
      continue;
    }
    stat.included++;

    const key = normalizeKey(occ.german);
    if (!key) continue;
    const source = `${occ.lesson} · ${occ.surface}`;
    const existing = byKey.get(key);
    if (existing) {
      if (!existing.row.originals.includes(occ.german)) existing.row.originals.push(occ.german);
      if (!existing.row.sources.includes(source)) existing.row.sources.push(source);
      if (!existing.row.english && occ.english) existing.row.english = occ.english;
    } else {
      byKey.set(key, {
        order: order++,
        row: {
          id: "", // assigned after the stable sort
          bucket: bucketOf(occ.surface, occ.german),
          german: occ.german,
          originals: [occ.german],
          english: occ.english,
          sources: [source],
        },
      });
    }
  }

  const bucketIndex = new Map(BUCKETS.map((b, i) => [b.slug, i]));
  const rows = [...byKey.values()]
    .sort((a, b) => {
      const bucketDelta = (bucketIndex.get(a.row.bucket) ?? BUCKETS.length) - (bucketIndex.get(b.row.bucket) ?? BUCKETS.length);
      if (bucketDelta !== 0) return bucketDelta;
      const keyDelta = a.row.german.toLowerCase() < b.row.german.toLowerCase() ? -1 : a.row.german.toLowerCase() > b.row.german.toLowerCase() ? 1 : 0;
      if (keyDelta !== 0) return keyDelta;
      return a.order - b.order;
    })
    .map((entry) => entry.row);

  const perBucket: Record<string, number> = {};
  for (const row of rows) {
    perBucket[row.bucket] = (perBucket[row.bucket] ?? 0) + 1;
    row.id = `${row.bucket}-${String(perBucket[row.bucket]).padStart(3, "0")}`;
  }

  const stats: NaturalnessStats = {
    occurrences: occs.length,
    included: [...perSurface.values()].reduce((n, s) => n + s.included, 0),
    excludedNotGerman: [...perSurface.values()].reduce((n, s) => n + s.excluded, 0),
    distinct: rows.length,
    rowsWithoutEnglish: rows.filter((r) => !r.english).length,
    perBucket,
    perSurface: [...perSurface.values()].sort((a, b) => (a.surface < b.surface ? -1 : a.surface > b.surface ? 1 : 0)),
  };

  return { rows, stats };
}

/** Display name for a bucket slug. */
export function bucketName(slug: string): string {
  return BUCKET_NAMES.get(slug) ?? slug;
}
