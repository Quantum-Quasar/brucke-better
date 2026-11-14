import { wordWithArticle } from "@/lib/gender";
import type {
  CompendiumData,
  ExerciseItem,
  Lesson,
  LessonSection,
  LessonTwist,
  MatchingPairItem,
  VocabHint,
} from "@/lib/types";

// The Dutch course is authored as compact lesson specs and expanded here.
// Every field the reader, reviews and tests consume is produced deterministically,
// so the 85 lessons cannot drift apart in shape or exercise integrity.

export interface DutchSentence {
  nl: string;
  en: string;
  /** word-for-word English, used by the literal_gloss exercise */
  literal?: string;
  /** two plausible wrong English readings for literal_gloss */
  literalWrong?: string;
  /** two plausible wrong Dutch sentences for the MCQ */
  wrong?: [string, string];
  note?: string;
}

export interface DutchLessonSpec {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  phase: number;
  categories: string[];
  words: string[];
  hookTitle: string;
  hook: string;
  patternTitle: string;
  pattern: string;
  trap?: string;
  linguist?: string;
  footnote?: { marker: string; title: string; content: string };
  sentences: DutchSentence[];
  twist: { nl: string; en: string; explanation?: string };
  outcome: string;
  takeaway: string;
  foreshadow?: { line: string; resolvedIn: number };
  payoff?: { ofLesson: number; text: string };
  /**
   * Optional per-lesson exercise plan. When absent the lesson keeps the default
   * five-slot layout (matching → select → transcribe → gloss → dictation), so
   * every pre-plan lesson is unchanged. `at` indexes into `sentences`. Every
   * plan must still yield five graded exercises whose first slot is a
   * recognition exercise (matching or select) — no lesson opens cold.
   */
  exercises?: DutchExerciseSpec[];
}

/** One slot of a lesson's exercise plan. `at` points into `spec.sentences`. */
export type DutchExerciseSpec =
  | { kind: "matching" }
  | { kind: "select"; at: number }
  | { kind: "transcribe"; at: number }
  | { kind: "gloss"; at: number }
  | { kind: "dictation"; at: number }
  /** syntax_builder: assemble the Dutch sentence from a word bank. */
  | { kind: "build"; at: number; bank?: string[]; vocab_hints?: VocabHint[] }
  /** derive: convert one English word through a correspondence bridge. */
  | {
      kind: "derive";
      english: string;
      target: string;
      meaning: string;
      english_hint: string;
      rule: string;
      explanation: string;
    }
  /** variant_english: pick every English shape that really says the Dutch sentence. */
  | {
      kind: "variants";
      at: number;
      renderings: string[];
      traps: string[];
      explanation: string;
    };

const DISTRACTORS = [
  "de",
  "het",
  "een",
  "niet",
  "geen",
  "en",
  "of",
  "maar",
  "ik",
  "jij",
  "hij",
  "zij",
  "wij",
  "is",
  "zijn",
  "heeft",
  "kan",
  "gaat",
  "komt",
  "wel",
  "toch",
];

function targetTokens(answer: string): string[] {
  return answer
    .replace(/[?,.!]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function withDistractors(answer: string, extra = 2): string[] {
  const tokens = targetTokens(answer);
  const used = new Set(tokens.map((token) => token.toLowerCase()));
  const bank = [...tokens];
  for (const candidate of DISTRACTORS) {
    if (bank.length >= tokens.length + extra) break;
    if (used.has(candidate)) continue;
    bank.push(candidate);
    used.add(candidate);
  }
  while (bank.length < tokens.length + 1) bank.push("wel");
  return bank;
}

function wrongSwap(sentence: string): string {
  if (/\bde\s/.test(sentence)) return sentence.replace(/\bde\s/, "het ");
  if (/\bhet\s/.test(sentence)) return sentence.replace(/\bhet\s/, "de ");
  if (/\bniet\b/.test(sentence)) return sentence.replace(/\bniet\b/, "geen");
  if (/\bgeen\b/.test(sentence)) return sentence.replace(/\bgeen\b/, "niet");
  return `niet ${sentence}`;
}

function altLiteral(sentence: DutchSentence): string {
  if (sentence.literalWrong) return sentence.literalWrong;
  const literal = sentence.literal ?? sentence.en;
  if (literal.startsWith("I ")) return `You ${literal.slice(2)}`;
  if (literal.startsWith("you ")) return `I ${literal.slice(4)}`;
  return `not ${literal}`;
}

function uniqueOptions(correct: string, others: string[]): string[] {
  const options = [correct];
  for (const candidate of others) {
    if (options.length >= 3) break;
    if (candidate && !options.includes(candidate)) options.push(candidate);
  }
  let filler = 1;
  while (options.length < 3) {
    const candidate = `${correct} (${filler})`;
    if (!options.includes(candidate)) options.push(candidate);
    filler += 1;
  }
  return options;
}

function section(title: string, content: string, extra?: Partial<LessonSection>): LessonSection {
  return { title, content, ...extra };
}

export function buildDutchLesson(
  spec: DutchLessonSpec,
  compendium: CompendiumData,
  nextTitle?: string
): Lesson {
  const words = spec.words.map((id) => {
    const word = compendium.words[id];
    if (!word) throw new Error(`Dutch lesson ${spec.id}: unknown word id "${id}"`);
    return word;
  });

  const pairs: MatchingPairItem[] = words.slice(0, 6).map((word, index) => ({
    id: `p${index + 1}`,
    english: word.english_meaning,
    german: wordWithArticle(word.gender, word.target_word, "nl"),
  }));

  const sentenceAt = (n: number): DutchSentence => {
    const sentence = spec.sentences[n];
    if (!sentence) {
      throw new Error(
        `Dutch lesson ${spec.id}: exercise references sentence #${n}, only ${spec.sentences.length} authored`
      );
    }
    return sentence;
  };

  const selectOptions = (sentence: DutchSentence): string[] =>
    uniqueOptions(sentence.nl, sentence.wrong ?? ([wrongSwap(sentence.nl), `niet ${sentence.nl}`] as [string, string]));

  const plan: DutchExerciseSpec[] = spec.exercises ?? [
    { kind: "matching" },
    { kind: "select", at: 0 },
    { kind: "transcribe", at: 1 },
    { kind: "gloss", at: 2 },
    { kind: "dictation", at: 3 },
  ];

  const exercises: ExerciseItem[] = plan.map((slot, index): ExerciseItem => {
    const id = `nl${spec.id}_e${index + 1}`;
    switch (slot.kind) {
      case "matching":
        return {
          id,
          type: "matching_pairs",
          prompt: `Match each English meaning with its Dutch twin (${spec.title}):`,
          matching_pairs: pairs,
          target_answer: pairs.map((pair) => pair.german).join(", "),
          meaning: pairs.map((pair) => pair.english).join(", "),
          explanation: `These are the anchors of "${spec.title}": read each Dutch form through the pattern, not as a new word.`,
        };
      case "select": {
        const sentence = sentenceAt(slot.at);
        return {
          id,
          type: "shift_select",
          prompt: `Which sentence says: “${sentence.en}”?`,
          options: selectOptions(sentence),
          target_answer: sentence.nl,
          meaning: sentence.en,
          explanation:
            sentence.note ?? `“${sentence.nl}” is the Dutch form; the other readings bend the pattern of “${spec.title}”.`,
        };
      }
      case "transcribe": {
        const sentence = sentenceAt(slot.at);
        return {
          id,
          type: "transcribe",
          prompt: "Build the thought in Dutch:",
          idea: sentence.en,
          cues: [
            `Start with “${targetTokens(sentence.nl)[0]}”`,
            `The pattern: ${spec.patternTitle}`,
            `It means: ${sentence.en}`,
          ],
          idea_parts: [sentence.en, `Dutch order starts: ${targetTokens(sentence.nl).slice(0, 2).join(" ")}`],
          target_answer: sentence.nl,
          meaning: sentence.en,
          word_bank: withDistractors(sentence.nl),
          explanation:
            sentence.note ?? `“${sentence.nl}” puts the thought together the Dutch way — ${spec.patternTitle}.`,
          diagnosis: spec.trap
            ? { slip: "an English-shaped word order slipped in", cue: spec.trap }
            : undefined,
        };
      }
      case "gloss": {
        const sentence = sentenceAt(slot.at);
        return {
          id,
          type: "literal_gloss",
          prompt: "Which English sentence is built the Dutch way?",
          german: sentence.nl,
          natural: sentence.en,
          options: uniqueOptions(sentence.literal ?? sentence.en, [sentence.en, altLiteral(sentence)]),
          target_answer: sentence.literal ?? sentence.en,
          meaning: sentence.en,
          explanation: `“${sentence.nl}” is word-for-word “${sentence.literal ?? sentence.en}”. The odd English is the lesson — never a model to produce. Pattern: ${spec.patternTitle}.`,
        };
      }
      case "dictation": {
        const sentence = sentenceAt(slot.at);
        return {
          id,
          type: "dictation",
          prompt: "Listen and write the whole sentence.",
          spoken: sentence.nl,
          replays: 2,
          target_answer: sentence.nl,
          meaning: sentence.en,
          cues: [`It means: ${sentence.en}`, `Starts with “${targetTokens(sentence.nl)[0]}”`],
          explanation:
            sentence.note ?? `“${sentence.nl}” reuses only material taught in “${spec.title}” — ${spec.patternTitle}.`,
          affirmation: `You heard “${sentence.nl}” — a sentence built from the lesson's own Dutch, practising ${spec.patternTitle}.`,
        };
      }
      case "build": {
        const sentence = sentenceAt(slot.at);
        const target = targetTokens(sentence.nl).join(" ");
        return {
          id,
          type: "syntax_builder",
          prompt: "Assemble the Dutch sentence:",
          target_answer: target,
          meaning: sentence.en,
          word_bank: slot.bank ?? withDistractors(target),
          vocab_hints: slot.vocab_hints,
          explanation:
            sentence.note ?? `"${sentence.nl}" assembles itself once you hold the Dutch order — ${spec.patternTitle}.`,
          affirmation: `You built "${sentence.nl}" word by word — the Dutch order, not the English one.`,
        };
      }
      case "derive":
        return {
          id,
          type: "derive",
          prompt: `Apply the bridge: English '${slot.english}' → Dutch:`,
          english_hint: slot.english_hint,
          shift_hint: slot.rule,
          target_answer: slot.target,
          meaning: slot.meaning,
          explanation: slot.explanation,
        };
      case "variants": {
        const sentence = sentenceAt(slot.at);
        return {
          id,
          type: "variant_english",
          prompt: `English for ${sentence.nl} — pick every shape that really says it:`,
          german: sentence.nl,
          renderings: slot.renderings,
          traps: slot.traps,
          target_answer: slot.renderings.join(", "),
          meaning: slot.renderings[0],
          explanation: slot.explanation,
        };
      }
    }
  });

  const twist: LessonTwist = {
    prompt: `One more, no safety net — say: “${spec.twist.en}”`,
    target_answer: spec.twist.nl,
    word_bank: withDistractors(spec.twist.nl),
    explanation:
      spec.twist.explanation ?? `“${spec.twist.nl}” is the whole thought, assembled from this lesson.`,
  };

  const summarySentence = spec.sentences[spec.sentences.length - 1];
  const teaser = nextTitle
    ? `Up next on De Brug: ${nextTitle}.`
    : "That is the whole Dutch trail — every core, sprig and branch is yours.";

  return {
    id: spec.id,
    slug: spec.slug,
    title: spec.title,
    subtitle: spec.subtitle,
    phase: spec.phase,
    shift_categories: spec.categories,
    word_ids: spec.words,
    table_word_ids: spec.words.slice(0, 6),
    hook: section(spec.hookTitle, spec.hook, {
      footnotes: spec.footnote ? [{ ...spec.footnote, interest: true }] : undefined,
    }),
    pattern: section(spec.patternTitle, spec.pattern, {
      linguist_note: spec.linguist,
      trap_note: spec.trap,
    }),
    exercises,
    twist,
    foreshadow: spec.foreshadow,
    payoff: spec.payoff,
    summary: {
      outcome: spec.outcome,
      use_example: { german: summarySentence.nl, english: summarySentence.en },
      takeaway: spec.takeaway,
      curiosity_teaser: teaser,
    },
  };
}
