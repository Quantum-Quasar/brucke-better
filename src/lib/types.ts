export const TOTAL_COMPENDIUM_WORDS = 1226;

export type Gender = "der" | "die" | "das" | "le" | "la" | "el" | "de" | "het";

export type MasteryState = "unexplored" | "explored" | "encountered" | "mastered";

export type ReviewMode = "flashcard" | "mcq" | "tiles" | "typing";

export type LessonSegment = "hook" | "pattern" | "table" | "practice" | "summary";

export interface LessonProgress {
  segment: LessonSegment;
  practiceIndex: number;
  completedSegments: LessonSegment[];
  /** true once any exercise was queued for retry this lesson — a purple star requires it to stay false */
  everQueued?: boolean;
}

export interface WordEntity {
  id: string;
  target_word: string;
  english_cognate: string;
  english_meaning: string;
  gender: Gender | null;
  ipa: string;
  sound_shift_ids: string[];
  shift_rule: string;
  context_phrase: string;
  context_translation: string;
  etymology_derivation: string;
  /** Thematic domain (family, colors, food, …) used by the Review Hub domain decks. */
  domain?: string;
  /**
   * Declarative capability list: which review modes this entity supports.
   * Standard words support all 4 modes; article-drill entities declare ["mcq"].
   */
  supportedModes?: ReviewMode[];
  /** Fixed MCQ option set (e.g. ["der", "die", "das", "den"] for article review). */
  customMcqOptions?: string[];
  /** Optional custom prompt badge shown on the review card (e.g. "pick the article"). */
  promptLabel?: string;
}

export interface ShiftFamily {
  id: string;
  name: string;
  symbol: string;
  phonetic_rule: string;
  historical_linguistics: string;
  philological_note: string;
  literature_source: string;
  word_ids: string[];
}

export interface CompoundCalque {
  id: string;
  compound: string;
  gender: Gender | null;
  literal_morphemes: string;
  real_meaning: string;
  english_counterpart: string;
  lore: string;
  /** A full German sentence using the compound, with its English translation. */
  example_sentence?: string;
  example_translation?: string;
}

export interface FalseFriend {
  id: string;
  german_word: string;
  looks_like: string;
  actual_meaning: string;
  trap_note: string;
  /** A full German sentence using the word in its real meaning, with its English translation. */
  example_sentence?: string;
  example_translation?: string;
}

export interface DailyInsight {
  day: number;
  german_expression: string;
  english_meaning: string;
  cultural_etymology: string;
  takeaway_principle: string;
}

export interface SRSCard {
  word_id: string;
  interval: number; // days
  repetitions: number;
  ease_factor: number; // default 2.5
  due_date: string; // ISO date
  lapses: number;
  last_reviewed: string | null;
  /** TM-6: how many times the learner answered correctly but flagged "I guessed" */
  guessed?: number;
}

export type ExerciseType =
  | "morpheme_tiles"
  | "matching_pairs"
  | "shift_select"
  | "syntax_builder"
  | "derive"
  | "reverse_cognate"
  | "transcribe"
  | "literal_gloss"
  | "dictation"
  | "family_matrix"
  | "variant_english"
  | "pronoun_compression"
  | "spoken_turn_reply";

export interface ExerciseCapabilitySpec {
  type: ExerciseType;
  label: string;
  /** Which review modes correspond to or can practice this exercise's skill */
  supportedReviewModes: ReviewMode[];
  /** Whether this exercise type is allowed as exercise[0] (cold open) of a lesson */
  allowColdOpen: boolean;
  /** Whether this exercise demands active target-language production */
  isProduction: boolean;
  /** Whether this exercise plays spoken audio as part of its prompt */
  hasAudio: boolean;
  /** Whether retryVariant can shuffle its options/tiles/chips on retry */
  supportsRetryShuffle: boolean;
}

/**
 * Single declarative registry where every exercise type declares its supported
 * modes, cold-open eligibility, production status, and audio/retry behavior.
 */
export const EXERCISE_CAPABILITIES: Record<ExerciseType, ExerciseCapabilitySpec> = {
  morpheme_tiles: {
    type: "morpheme_tiles",
    label: "morpheme assembly",
    supportedReviewModes: ["tiles", "flashcard"],
    allowColdOpen: true,
    isProduction: false,
    hasAudio: false,
    supportsRetryShuffle: true,
  },
  matching_pairs: {
    type: "matching_pairs",
    label: "cognate matching",
    supportedReviewModes: ["mcq", "flashcard"],
    allowColdOpen: true,
    isProduction: false,
    hasAudio: false,
    supportsRetryShuffle: true,
  },
  shift_select: {
    type: "shift_select",
    label: "shift recognition",
    supportedReviewModes: ["mcq", "flashcard"],
    allowColdOpen: true,
    isProduction: false,
    hasAudio: false,
    supportsRetryShuffle: true,
  },
  syntax_builder: {
    type: "syntax_builder",
    label: "sentence builder",
    supportedReviewModes: ["tiles", "mcq", "typing"],
    allowColdOpen: true,
    isProduction: false,
    hasAudio: false,
    supportsRetryShuffle: true,
  },
  derive: {
    type: "derive",
    label: "rule application",
    supportedReviewModes: ["typing", "tiles", "mcq", "flashcard"],
    allowColdOpen: false,
    isProduction: true,
    hasAudio: false,
    supportsRetryShuffle: false,
  },
  reverse_cognate: {
    type: "reverse_cognate",
    label: "reverse cognate",
    supportedReviewModes: ["typing", "mcq", "flashcard"],
    allowColdOpen: false,
    isProduction: true,
    hasAudio: false,
    supportsRetryShuffle: false,
  },
  transcribe: {
    type: "transcribe",
    label: "transcribe the thought",
    supportedReviewModes: ["typing", "tiles", "mcq", "flashcard"],
    allowColdOpen: false,
    isProduction: true,
    hasAudio: false,
    supportsRetryShuffle: true,
  },
  literal_gloss: {
    type: "literal_gloss",
    label: "direct translation",
    supportedReviewModes: ["mcq"],
    allowColdOpen: false,
    isProduction: false,
    hasAudio: false,
    supportsRetryShuffle: true,
  },
  dictation: {
    type: "dictation",
    label: "listen and write",
    supportedReviewModes: ["typing", "tiles"],
    allowColdOpen: false,
    isProduction: true,
    hasAudio: true,
    supportsRetryShuffle: false,
  },
  family_matrix: {
    type: "family_matrix",
    label: "the family grid",
    supportedReviewModes: ["typing", "mcq"],
    allowColdOpen: false,
    isProduction: true,
    hasAudio: false,
    supportsRetryShuffle: false,
  },
  variant_english: {
    type: "variant_english",
    label: "every way to say it",
    supportedReviewModes: ["mcq"],
    allowColdOpen: false,
    isProduction: false,
    hasAudio: false,
    supportsRetryShuffle: true,
  },
  pronoun_compression: {
    type: "pronoun_compression",
    label: "compress the clause",
    supportedReviewModes: ["tiles", "typing", "mcq"],
    allowColdOpen: false,
    isProduction: true,
    hasAudio: false,
    supportsRetryShuffle: true,
  },
  spoken_turn_reply: {
    type: "spoken_turn_reply",
    label: "question & answer turn",
    supportedReviewModes: ["typing", "tiles", "mcq"],
    allowColdOpen: false,
    isProduction: true,
    hasAudio: true,
    supportsRetryShuffle: true,
  },
};

export const PRODUCTION_TYPES: ExerciseType[] = (
  Object.values(EXERCISE_CAPABILITIES) as ExerciseCapabilitySpec[]
)
  .filter((spec) => spec.isProduction)
  .map((spec) => spec.type);

/** Types that must never open a lesson — derived directly from EXERCISE_CAPABILITIES. */
export const COLD_OPEN_FORBIDDEN: ExerciseType[] = (
  Object.values(EXERCISE_CAPABILITIES) as ExerciseCapabilitySpec[]
)
  .filter((spec) => !spec.allowColdOpen)
  .map((spec) => spec.type);

export interface MatchingPairItem {
  id: string;
  english: string;
  german: string;
}

export interface VocabHint {
  word: string;
  translation: string;
  note?: string;
}

/** TM-3: process affirmation shown on success; authored override for the common wrong answer. */
export interface ExerciseDiagnosis {
  slip: string;
  cue: string;
}

export interface CompressedNounPart {
  /** The full noun phrase in the unfolded sentence (e.g., "das Haus", "le livre", "la carta") */
  noun: string;
  /** The compact pronoun it folds into (e.g., "es", "le", "la") */
  pronoun: string;
  /** Short grammatical role label (e.g., "direct object", "indirect object") */
  role: string;
}

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  prompt: string;
  english_hint?: string;
  shift_hint?: string;
  target_answer: string;
  meaning?: string;
  vocab_hints?: VocabHint[];
  options?: string[]; // For shift_select, literal_gloss, or multiple choice
  tile_options?: string[]; // For morpheme_tiles
  target_tiles?: string[]; // For morpheme_tiles assembly
  matching_pairs?: MatchingPairItem[]; // For matching_pairs cards
  word_bank?: string[]; // For syntax_builder / transcribe chips
  explanation?: string;
  /** TM-3: restates the process on a correct answer (≤ 140 chars), instead of "Spot on!". */
  affirmation?: string;
  /** TM-3: authored override for the common wrong answer on this exercise. */
  diagnosis?: ExerciseDiagnosis;
  /** Optional per-exercise declaration overriding which review modes it supports */
  supportedModes?: ReviewMode[];
  // --- transcribe (TM-1): the thought the learner must render into German ---
  idea?: string;
  cues?: string[]; // 1–3 scaled prompts, ordered easy→late, revealed on demand or on failure
  // --- TM-6: break the thought up before German orders it (guidebook §0.3) ---
  /** The elements of the thought, one per line. Taught skill, not decoration. */
  idea_parts?: string[];
  // --- literal_gloss (TM-2): the German sentence and its natural English ---
  german?: string;
  natural?: string;
  // --- variant_english (TM-6): one thought, several valid English renderings ---
  renderings?: string[];
  traps?: string[];
  // --- dictation (TM-6): the only form the learner gets before answering ---
  spoken?: string;
  replays?: number;
  // --- family_matrix (TM-6): prefix × base families ---
  rows?: string[];
  columns?: string[];
  cells?: Array<Array<{ german: string; english: string }>>;
  seed?: Array<[number, number]>;
  task?: { row: number; column: number };
  row_law?: string;
  column_law?: string;
  // --- pronoun_compression: visual, numeral-free noun-to-pronoun clause folding ---
  full_sentence?: string;
  compressed_parts?: CompressedNounPart[];
  // --- spoken_turn_reply: conversational question & answer turn ---
  spoken_question?: string;
  question_meaning?: string;
  reply_idea?: string;
}

/**
 * TM-1 production drill: idea in, elements chosen, order decided, German out.
 * `word_bank` must contain every word of `target_answer` plus 1–3 plausible distractors —
 * a transcribe without distractors is a syntax_builder in disguise.
 */
export interface TranscribeExercise extends ExerciseItem {
  type: "transcribe";
  idea: string;
  cues: string[];
  word_bank: string[];
}

/**
 * TM-2 direct translation: pick the English rendering that is built the German way.
 * Exactly one option is the word-for-word one (`target_answer`); the rest are natural
 * or differently-wrong. The odd English is the lesson — never a model to produce.
 */
export interface LiteralGlossExercise extends ExerciseItem {
  type: "literal_gloss";
  german: string;
  natural: string;
  options: string[];
}

/** TM-5a: one deliberate, ungraded friction point at the end of a lesson's practice. */
export interface LessonTwist {
  prompt: string;
  target_answer: string;
  word_bank?: string[];
  explanation: string;
}

export interface Footnote {
  marker: string;
  title: string;
  content: string;
  /** TM-5b: a genuine tangent — cued as such so the learner knows it is not key material. */
  interest?: boolean;
}

export interface LessonSection {
  title: string;
  content: string;
  footnotes?: Footnote[];
  linguist_note?: string;
  /**
   * TM-6 (guidebook §1.9/§1.10): name the over-simplification the mind will reach for,
   * *before* the learner reaches for it — preventative correction, not reactive diagnosis.
   */
  trap_note?: string;
}

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  phase: number;
  shift_categories: string[];
  word_ids: string[];
  hook: LessonSection;
  pattern: LessonSection;
  table_word_ids: string[];
  exercises: ExerciseItem[];
  /** TM-5a: rendered after the last exercise, before the reinforcement queue. Ungraded, skippable. */
  twist?: LessonTwist;
  /**
   * TM-6 (guidebook §1.6): an unresolved reference made on purpose. `resolvedIn` is the id
   * of the lesson that carries the matching `payoff`. Unresolved tension is a contour tool.
   */
  foreshadow?: { line: string; resolvedIn: number };
  /** TM-6: resolves a `foreshadow` planted by `ofLesson`. `ofLesson` is that lesson's id. */
  payoff?: { ofLesson: number; text: string };
  summary: {
    outcome: string;
    use_example: { german: string; english: string };
    takeaway: string;
    curiosity_teaser: string;
  };
}

/**
 * The lesson metadata the client needs for review decks, sentence cards and
 * the word drawer. Excludes prose and exercises, which the lesson route
 * renders from the server instead.
 */
export interface LessonIndexEntry {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  phase: number;
  shift_categories: string[];
  word_ids: string[];
  table_word_ids: string[];
  summary: {
    use_example: { german: string; english: string };
    takeaway: string;
  };
}

// ---------------------------------------------------------------------------
// Baba-style Trail Map — curriculum shells & node graph
// ---------------------------------------------------------------------------

/** One shell lesson on the map. Hollow shells carry only a title + authoring plan. */
export interface LessonShell {
  /** Globally unique node id. Cores reuse the topic id (1–30); sprigs & branches use offset series. */
  id: number;
  title: string;
  /** One-line plan of what the future content should cover (for the content author). */
  plan: string;
  /** true when a fully authored Lesson exists for this shell in data/lessons.ts */
  authored?: boolean;
}

/** A topic = one cluster ("bunch") on the trail. The spine passes through every core. */
export interface TopicCluster {
  /** 1–30. Equals the core lesson id. */
  id: number;
  title: string;
  /** One-line description shown on the map signpost and in the node drawer. */
  blurb: string;
  /** The main-line lesson of the topic (id === topic id). */
  core: LessonShell;
  /** Optional side lessons of the same topic; all attach to the core (individually skippable). */
  sprigs: LessonShell[];
}

/** A support-material branch: a mini path of 1–3 optional lessons hanging off an attach node. */
export interface TrailBranch {
  /** 5000-series unique id of the branch (lessons get branchId+1, +2, …). */
  id: number;
  /** Node id the branch hangs from (usually a core). */
  attach: number;
  title: string;
  blurb: string;
  /** Ordered mini path; lesson i unlocks the next. */
  lessons: LessonShell[];
}

/** Golden star for a completed lesson; purple for a flawless run (retry queue untouched, including a clean replay). */
export type LessonStar = "gold" | "purple";

/**
 * A star gate between topic families. It sits after `afterTopic`'s core and blocks
 * every later topic until `requiredStars` have been earned within the stretch the
 * gate closes (topics after the previous gate up to and including `afterTopic`).
 * Thresholds sit deliberately between the minimum (all cores) and the maximum
 * (every lesson in the stretch) so learners must also clear side lessons.
 */
export interface TrailGate {
  id: number;
  afterTopic: number;
  requiredStars: number;
  title: string;
  /** why the gate sits exactly here — shown in the gate drawer */
  why: string;
}

export interface CompendiumData {
  words: Record<string, WordEntity>;
  wordList: WordEntity[];
  shifts: Record<string, ShiftFamily>;
  compounds: CompoundCalque[];
  falseFriends: FalseFriend[];
  dailyInsights: DailyInsight[];
}
