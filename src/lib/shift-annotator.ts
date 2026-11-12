// ponytail: direct consonant & suffix shift letter alignment without heavy diff dependencies

export interface TextSegment {
  text: string;
  isChanged: boolean;
}

export interface AnnotatedShiftPair {
  englishSegments: TextSegment[];
  germanSegments: TextSegment[];
  shiftRule: string;
}

// Known consonant and suffix replacement rules across German, French, and Spanish
const SHIFT_RULES_PATTERNS = [
  // German High German Consonant Shift patterns
  { en: "th", de: "d", label: "TH → D" },
  { en: "pp", de: "pf", label: "P → PF" },
  { en: "pp", de: "ff", label: "P → FF" },
  { en: "p", de: "pf", label: "P → PF" },
  { en: "p", de: "ff", label: "P → FF" },
  { en: "p", de: "f", label: "P → F" },
  { en: "t", de: "ss", label: "T → SS" },
  { en: "t", de: "s", label: "T → S" },
  { en: "t", de: "z", label: "T → Z" },
  { en: "t", de: "ß", label: "T → ß" },
  { en: "k", de: "ch", label: "K → CH" },
  { en: "c", de: "ch", label: "C → CH" },
  { en: "d", de: "t", label: "D → T" },
  { en: "v", de: "b", label: "V → B" },
  { en: "f", de: "b", label: "F → B" },
  { en: "y", de: "g", label: "Y → G" },
  { en: "gh", de: "ch", label: "GH → CH" },
  // Spanish Romance & Castilian Shift patterns
  { en: "tion", de: "ción", label: "-TION → -CIÓN" },
  { en: "ty", de: "dad", label: "-TY → -DAD" },
  { en: "ty", de: "tad", label: "-TY → -TAD" },
  { en: "ous", de: "oso", label: "-OUS → -OSO" },
  { en: "ct", de: "ch", label: "-CT- → -CH-" },
  { en: "pl", de: "ll", label: "PL → LL" },
  { en: "cl", de: "ll", label: "CL → LL" },
  { en: "fl", de: "ll", label: "FL → LL" },
  { en: "f", de: "h", label: "F → H" },
  { en: "li", de: "j", label: "LI → J" },
  // French Norman & Francien Shift patterns
  { en: "ty", de: "ité", label: "-TY → -ITÉ" },
  { en: "ty", de: "té", label: "-TY → -TÉ" },
  { en: "or", de: "eur", label: "-OR → -EUR" },
  { en: "our", de: "eur", label: "-OUR → -EUR" },
  { en: "ous", de: "eux", label: "-OUS → -EUX" },
  { en: "st", de: "êt", label: "ST → ÊT" },
  { en: "st", de: "ôt", label: "ST → ÔT" },
  { en: "st", de: "ît", label: "ST → ÎT" },
  { en: "st", de: "ât", label: "ST → ÂT" },
  { en: "w", de: "gu", label: "W → GU" },
  { en: "ca", de: "cha", label: "CA → CHA" },
];

const MAX_ALIGN_CACHE = 500;
const alignCache = new Map<string, AnnotatedShiftPair>();

// ponytail: inspectable cache bounds
export function getAlignCacheSize(): number {
  return alignCache.size;
}

interface AlignmentStep {
  enStart: number;
  deStart: number;
  enLength: number;
  deLength: number;
  rule?: (typeof SHIFT_RULES_PATTERNS)[number];
}

function segmentsFromSteps(word: string, steps: AlignmentStep[], side: "en" | "de"): TextSegment[] {
  const segments: TextSegment[] = [];
  for (const step of steps) {
    const length = side === "en" ? step.enLength : step.deLength;
    if (!length) continue;
    const start = side === "en" ? step.enStart : step.deStart;
    const text = word.slice(start, start + length);
    const isChanged = Boolean(step.rule);
    const last = segments.at(-1);
    if (last && last.isChanged === isChanged) last.text += text;
    else segments.push({ text, isChanged });
  }
  return segments.length ? segments : [{ text: word, isChanged: false }];
}

export function alignShiftPair(english: string, german: string, fallbackRule?: string): AnnotatedShiftPair {
  const cacheKey = JSON.stringify([english, german, fallbackRule ?? ""]);
  const cached = alignCache.get(cacheKey);
  if (cached) return cached;

  const en = english.toLowerCase();
  const de = german.toLowerCase();
  const width = de.length + 1;
  const costs = new Float64Array((en.length + 1) * width).fill(Infinity);
  const previous: (AlignmentStep | undefined)[] = new Array(costs.length);
  costs[0] = 0;

  // Align the whole pair before highlighting: finding two substrings anywhere
  // can attach a correspondence to unrelated positions, or miss a second shift.
  for (let i = 0; i <= en.length; i++) {
    for (let j = 0; j <= de.length; j++) {
      const cost = costs[i * width + j];
      const offer = (enLength: number, deLength: number, extra: number, rule?: AlignmentStep["rule"]) => {
        const destination = (i + enLength) * width + j + deLength;
        if (cost + extra < costs[destination]) {
          costs[destination] = cost + extra;
          previous[destination] = { enStart: i, deStart: j, enLength, deLength, rule };
        }
      };
      if (i < en.length && j < de.length) offer(1, 1, en[i] === de[j] ? 0 : 3);
      if (i < en.length) offer(1, 0, 3);
      if (j < de.length) offer(0, 1, 3);
      for (const rule of SHIFT_RULES_PATTERNS) {
        if (!en.startsWith(rule.en, i) || !de.startsWith(rule.de, j)) continue;
        const suffix = ["tion", "ty", "ous", "or", "our"].includes(rule.en);
        if (suffix && (i + rule.en.length !== en.length || j + rule.de.length !== de.length)) continue;
        offer(rule.en.length, rule.de.length, 1, rule);
      }
    }
  }

  const steps: AlignmentStep[] = [];
  let i = en.length;
  let j = de.length;
  while (i || j) {
    const step = previous[i * width + j]!;
    steps.push(step);
    i = step.enStart;
    j = step.deStart;
  }
  steps.reverse();
  // Without any shared anchor, a spelling resemblance is not useful evidence.
  const anchored = steps.some((step) => !step.rule && step.enLength === 1 && step.deLength === 1 &&
    en[step.enStart] === de[step.deStart]);
  if (!anchored) for (const step of steps) step.rule = undefined;
  const labels = [...new Set(steps.flatMap((step) => step.rule ? [step.rule.label] : []))];
  const result: AnnotatedShiftPair = {
    englishSegments: segmentsFromSteps(english, steps, "en"),
    germanSegments: segmentsFromSteps(german, steps, "de"),
    shiftRule: fallbackRule || labels.join(" · ") || "Cognate",
  };
  if (alignCache.size >= MAX_ALIGN_CACHE) {
    const oldestKey = alignCache.keys().next().value;
    if (oldestKey) alignCache.delete(oldestKey);
  }
  alignCache.set(cacheKey, result);
  return result;
}
