import type {
  CompendiumData,
  ExerciseItem,
  Lesson,
  LessonSection,
  LessonTwist,
  MatchingPairItem,
} from "@/lib/types";

// The Dutch course is authored as compact lesson specs and expanded here.
// Every field the reader, reviews and tests consume is produced deterministically,
// so the 75 lessons cannot drift apart in shape or exercise integrity.

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
}

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

function displayWord(word: CompendiumData["words"][string]): string {
  return word.gender ? `${word.gender} ${word.target_word}` : word.target_word;
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
    german: displayWord(word),
  }));

  const [first, second, third, fourth = spec.sentences[0]] = spec.sentences;
  const firstWrong = first.wrong ?? ([wrongSwap(first.nl), `niet ${first.nl}`] as [string, string]);

  const exercises: ExerciseItem[] = [
    {
      id: `nl${spec.id}_e1`,
      type: "matching_pairs",
      prompt: `Match each English meaning with its Dutch twin (${spec.title}):`,
      matching_pairs: pairs,
      target_answer: pairs.map((pair) => pair.german).join(", "),
      meaning: pairs.map((pair) => pair.english).join(", "),
      explanation: `These are the anchors of "${spec.title}": read each Dutch form through the pattern, not as a new word.`,
    },
    {
      id: `nl${spec.id}_e2`,
      type: "shift_select",
      prompt: `Which sentence says: “${first.en}”?`,
      options: uniqueOptions(first.nl, firstWrong),
      target_answer: first.nl,
      meaning: first.en,
      explanation: first.note ?? `“${first.nl}” is the Dutch form; the other readings bend the pattern of “${spec.title}”.`,
    },
    {
      id: `nl${spec.id}_e3`,
      type: "transcribe",
      prompt: "Build the thought in Dutch:",
      idea: second.en,
      cues: [
        `Start with “${targetTokens(second.nl)[0]}”`,
        `The pattern: ${spec.patternTitle}`,
        `It means: ${second.en}`,
      ],
      idea_parts: [second.en, `Dutch order starts: ${targetTokens(second.nl).slice(0, 2).join(" ")}`],
      target_answer: second.nl,
      meaning: second.en,
      word_bank: withDistractors(second.nl),
      explanation: second.note ?? `“${second.nl}” puts the thought together the Dutch way — ${spec.patternTitle}.`,
      diagnosis: spec.trap
        ? { slip: "an English-shaped word order slipped in", cue: spec.trap }
        : undefined,
    },
    {
      id: `nl${spec.id}_e4`,
      type: "literal_gloss",
      prompt: "Which English sentence is built the Dutch way?",
      german: third.nl,
      natural: third.en,
      options: uniqueOptions(third.literal ?? third.en, [third.en, altLiteral(third)]),
      target_answer: third.literal ?? third.en,
      meaning: third.en,
      explanation: `“${third.nl}” is word-for-word “${third.literal ?? third.en}”. The odd English is the lesson — never a model to produce. Pattern: ${spec.patternTitle}.`,
    },
    {
      id: `nl${spec.id}_e5`,
      type: "dictation",
      prompt: "Listen and write the whole sentence.",
      spoken: fourth.nl,
      replays: 2,
      target_answer: fourth.nl,
      meaning: fourth.en,
      cues: [`It means: ${fourth.en}`, `Starts with “${targetTokens(fourth.nl)[0]}”`],
      explanation: fourth.note ?? `“${fourth.nl}” reuses only material taught in “${spec.title}” — ${spec.patternTitle}.`,
      affirmation: `You heard “${fourth.nl}” — a sentence built from the lesson's own Dutch, practising ${spec.patternTitle}.`,
    },
  ];

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
