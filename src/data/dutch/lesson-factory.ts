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

const DUTCH_PERTURBATION_SWAPS: Array<[RegExp, string]> = [
  [/\bde\s/, "het "],
  [/\bDe\s/, "Het "],
  [/\bhet\s/, "de "],
  [/\bHet\s/, "De "],
  [/\bniet\b/, "geen"],
  [/\bgeen\b/, "niet"],
  [/\bben\b/, "is"],
  [/\bis\b/, "zijn"],
  [/\bzijn\b/, "is"],
  [/\bheb\b/, "heeft"],
  [/\bheeft\b/, "hebben"],
  [/\bhebben\b/, "heeft"],
  [/\bkan\b/, "kunnen"],
  [/\bga\b/, "gaat"],
  [/\bgaat\b/, "gaan"],
  [/\bkom\b/, "komt"],
  [/\bkomt\b/, "komen"],
  [/\bwil\b/, "willen"],
  [/\bmoet\b/, "moeten"],
  [/\bMijn\b/, "Zijn"],
  [/\bmijn\b/, "zijn"],
  [/\bIk\b/, "Wij"],
  [/\bWij\b/, "Zij"],
  [/\bHij\b/, "Zij"],
  [/\bZij\b/, "Hij"],
  [/\been\s/, "het "],
  [/\bEen\s/, "Het "],
  [/\bdeze\b/, "dit"],
  [/\bdit\b/, "deze"],
  [/\bdie\b/, "dat"],
  [/\bdat\b/, "die"],
];

function dutchVerbOrderPerturbation(sentence: string): string | null {
  const punctMatch = sentence.match(/([.!?])$/);
  const punct = punctMatch ? punctMatch[1] : "";
  const body = punct ? sentence.slice(0, -1).trim() : sentence.trim();
  const words = body.split(/\s+/);
  if (words.length < 3) return null;
  // Move the finite verb (position 2) to the end to create a plausible word-order distractor.
  const moved = [words[0], ...words.slice(2), words[1]].join(" ") + punct;
  return moved !== sentence ? moved : null;
}

function dutchPerturbations(sentence: string): string[] {
  const candidates: string[] = [];
  const reordered = dutchVerbOrderPerturbation(sentence);
  if (reordered) candidates.push(reordered);
  for (const [pattern, replacement] of DUTCH_PERTURBATION_SWAPS) {
    if (pattern.test(sentence)) {
      const next = sentence.replace(pattern, replacement);
      if (next !== sentence && !candidates.includes(next)) {
        candidates.push(next);
      }
    }
    if (candidates.length >= 4) break;
  }
  return candidates;
}

const DUTCH_FALLBACK_POOL = [
  "Wij gaan vandaag naar huis.",
  "Zij drinkt koud water aan tafel.",
  "Hij leest morgen een klein boek.",
];

const ENGLISH_GLOSS_FALLBACK_POOL = [
  "We are not going home today.",
  "She drinks cold water at the table.",
  "They read the small book tomorrow.",
  "He speaks slowly with a friend.",
];

const COMMON_ENGLISH_OPENERS =
  /^(A|An|My|Our|Your|His|Her|Their|This|That|These|Those|Today|Tomorrow|Yesterday|Here|There|Now|Then|Always|Never|Sometimes|Often|Please|Good|Many|Some|All|Every)\b/;

function altLiteral(sentence: DutchSentence): string {
  if (sentence.literalWrong) return sentence.literalWrong;
  const literal = (sentence.literal ?? sentence.en).trim();
  if (/^I am\b/.test(literal)) return literal.replace(/^I am\b/, "We are");
  if (/^I'm\b/.test(literal)) return literal.replace(/^I'm\b/, "We're");
  if (/^I was\b/.test(literal)) return literal.replace(/^I was\b/, "We were");
  if (/^I\b/.test(literal)) return literal.replace(/^I\b/, "We");
  if (/^You are\b/i.test(literal)) return literal.replace(/^You are\b/i, "They are");
  if (/^You were\b/i.test(literal)) return literal.replace(/^You were\b/i, "They were");
  if (/^You\b/i.test(literal)) return literal.replace(/^You\b/i, "We");
  if (/^He is\b/.test(literal)) return literal.replace(/^He is\b/, "She is not");
  if (/^He was\b/.test(literal)) return literal.replace(/^He was\b/, "She was not");
  if (/^She is\b/.test(literal)) return literal.replace(/^She is\b/, "He is not");
  if (/^She was\b/.test(literal)) return literal.replace(/^She was\b/, "He was not");
  if (/^It is\b/.test(literal)) return literal.replace(/^It is\b/, "It is not");
  if (/^It was\b/.test(literal)) return literal.replace(/^It was\b/, "It was not");
  if (/^We are\b/.test(literal)) return literal.replace(/^We are\b/, "They are not");
  if (/^We were\b/.test(literal)) return literal.replace(/^We were\b/, "They were not");
  if (/^The\b/.test(literal)) return literal.replace(/^The\b/, "Another");
  if (literal.endsWith("?")) {
    if (/^Where\b/.test(literal)) return literal.replace(/^Where\b/, "When");
    if (/^When\b/.test(literal)) return literal.replace(/^When\b/, "Where");
    if (/^What\b/.test(literal)) return literal.replace(/^What\b/, "Who");
    if (/^Who\b/.test(literal)) return literal.replace(/^Who\b/, "What");
    if (/^How\b/.test(literal)) return literal.replace(/^How\b/, "Why");
    if (/^Why\b/.test(literal)) return literal.replace(/^Why\b/, "How");
    if (/^Do you\b/.test(literal)) return literal.replace(/^Do you\b/, "Does he");
    if (/^Are you\b/.test(literal)) return literal.replace(/^Are you\b/, "Is he");
    if (/^Can you\b/.test(literal)) return literal.replace(/^Can you\b/, "Can they");
    if (/^Is\b/.test(literal)) return literal.replace(/^Is\b/, "Was");
    return `Actually, ${literal}`;
  }
  if (COMMON_ENGLISH_OPENERS.test(literal)) {
    return `No, ${literal.charAt(0).toLowerCase()}${literal.slice(1)}`;
  }
  return `No, ${literal}`;
}

function uniqueOptions(correct: string, others: string[], fallbackPool: string[]): string[] {
  const options = [correct];
  for (const candidate of [...others, ...fallbackPool]) {
    if (options.length >= 3) break;
    if (candidate && !options.includes(candidate)) options.push(candidate);
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
    uniqueOptions(
      sentence.nl,
      sentence.wrong ?? dutchPerturbations(sentence.nl),
      DUTCH_FALLBACK_POOL
    );

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
          options: uniqueOptions(
            sentence.literal ?? sentence.en,
            [sentence.en, altLiteral(sentence)],
            ENGLISH_GLOSS_FALLBACK_POOL
          ),
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
