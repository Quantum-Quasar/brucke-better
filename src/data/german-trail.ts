import { TRAIL_ENTRY, trailGraph, trailLegs, type BranchingGraph, type TrailStop } from "@/lib/branching-trail-graph";

const WORLD_ROWS = [
  [TRAIL_ENTRY], ["first"], ["@words-fork"], ["sounds", "words"], ["@words-join"],
  ["plans"], ["talk"], ["things"], ["join"], ["past"], ["describe"],
  ["@places-fork"], ["home", "travel"], ["@places-join"], ["complex"], ["bridge"], ["@finish"],
] as const;

export type GermanChapterId = Exclude<(typeof WORLD_ROWS)[number][number], `@${string}`>;
export const GERMAN_FINISH = "@finish";

const worldStops: TrailStop<GermanChapterId>[] = WORLD_ROWS.flatMap((row, level) =>
  row.map((key, column) => ({
    key, level, lane: row.length === 1 ? 0 : column === 0 ? -0.75 : 0.75,
    value: key.startsWith("@") ? null : key as GermanChapterId,
  })),
);
export const GERMAN_WORLD = trailGraph(worldStops, WORLD_ROWS.slice(1).flatMap((row, i) =>
  WORLD_ROWS[i].flatMap((from) => row.map((to) => [from, to] as const)),
));

interface SkillChoice {
  label: string;
  lessons: readonly number[];
}

interface GermanChapter {
  title: string;
  description: string;
  clearCount: number;
  map: BranchingGraph<number>;
  skills: readonly SkillChoice[];
}

const skill = (label: string, ...lessons: number[]): SkillChoice => ({ label, lessons });
const legs = trailLegs<number>;
const firstWords = trailGraph<number>([
  { key: TRAIL_ENTRY, value: null, level: 0, lane: 0 },
  { key: 1, value: 1, level: 1, lane: 0 },
  { key: 102, value: 102, level: 2, lane: -1 },
  { key: 2, value: 2, level: 2, lane: 0 },
  { key: 3, value: 3, level: 2, lane: 1 },
  { key: 201, value: 201, level: 3, lane: -1 },
  { key: 4, value: 4, level: 3, lane: 0 },
  { key: 5, value: 5, level: 3, lane: 1 },
  { key: "@fork", value: null, level: 4, lane: 0 },
  { key: 6, value: 6, level: 5, lane: -1 },
  { key: 202, value: 202, level: 5, lane: 0 },
  { key: 8, value: 8, level: 5, lane: 1 },
  { key: 7, value: 7, level: 6, lane: -1 },
  { key: 103, value: 103, level: 6, lane: 1 },
], [
  [TRAIL_ENTRY, 1], [1, 102], [1, 2], [1, 3], [102, 201], [2, 4], [2, 5], [3, 5],
  [201, "@fork"], [4, "@fork"], [5, "@fork"], ["@fork", 6], ["@fork", 202], ["@fork", 8], [6, 7], [8, 103],
]);

export const GERMAN_CHAPTERS: Readonly<Record<GermanChapterId, GermanChapter>> = {
  first: {
    title: "First words",
    description: "Make your first German sentences and discover the patterns hiding in familiar words.",
    clearCount: 7,
    map: firstWords,
    skills: [skill("Simple clauses", 1, 102, 103), skill("Modal + bare infinitive", 2, 201, 202)],
  },
  sounds: {
    title: "Sound workshop",
    description: "Use consonants, vowels and spelling to recognize new words. Either word workshop leads to Make plans.",
    clearCount: 6,
    map: legs([
      [[301, 302], [401, 402], [501, 502]],
      [[601, 602, 2601, 2602], [701, 702, 26, 2603], [5031, 801]],
      [[25, 2502], [5021]],
    ]),
    skills: [skill("Consonant correspondences", 301, 401, 501), skill("Decoding unfamiliar words", 602, 702, 801, 2502, 2601)],
  },
  words: {
    title: "Word builders",
    description: "Take compound nouns apart and use their endings as clues. Either word workshop leads to Make plans.",
    clearCount: 6,
    map: legs([[[21, 2101], [2102, 28], [101, 22]], [[2103, 5092], [2201, 2202]]]),
    skills: [skill("Reading compounds", 21, 2102, 2103, 5092), skill("Noun-gender clues", 22, 2201, 2202)],
  },
  plans: {
    title: "Make plans",
    description: "Count, tell the time and talk about when to meet or what to do.",
    clearCount: 8,
    map: legs([[[17, 1703], [1701, 5121], [5122, 1702]], [[5141, 5142, 5143], [5131, 5132, 5292], [5151, 5232, 5301]]]),
    skills: [skill("Numbers and clock time", 17, 1703, 1701, 5121), skill("Dates or appointments", 1702, 5141, 5151)],
  },
  talk: {
    title: "First conversations",
    description: "Introduce yourself, ask questions and adjust how you address people.",
    clearCount: 8,
    map: legs([
      [[9, 902], [901, 5011], [5071, 5072]],
      [[13, 1301], [1302, 2902], [5012, 5272]],
      [[5281, 5282], [5291, 5302]],
    ]),
    skills: [skill("Regular present-tense endings", 9, 901), skill("Question word order", 13, 1302), skill("Formal and informal address", 5011, 5012, 5071)],
  },
  things: {
    title: "Things and people",
    description: "Talk about what you see, own or don’t have, from clothes to family and food.",
    clearCount: 9,
    map: legs([
      [[10, 1002], [1001, 1003], [1101, 1102]],
      [[11, 1103], [12], [1201, 5091]],
      [[5191, 5241], [5221, 5231]],
    ]),
    skills: [skill("Masculine direct objects", 10, 1001, 1003), skill("Possessives", 11, 1103, 5091), skill("Kein or nicht", 12, 1201)],
  },
  join: {
    title: "Join your ideas",
    description: "Give reasons, describe a routine and choose how to give an instruction.",
    clearCount: 8,
    map: legs([[[14, 1202], [1402, 1401]], [[15], [1501, 1604], [1603]], [[16, 1601], [1602]], [[5061], [5062], [5063]]]),
    skills: [skill("Verb-final clauses", 14, 1402), skill("Separable verbs", 15, 1501, 1604), skill("Reflexive routines", 1603, 1604), skill("Commands for different audiences", 5062, 5063)],
  },
  past: {
    title: "Tell what happened",
    description: "Put yesterday’s events into German with the spoken past and common story verbs.",
    clearCount: 10,
    map: legs([
      [[18, 1802], [1801, 1803], [802, 1502]],
      [[19, 1902], [1901, 5041], [1903, 2802]],
      [[1904, 1905], [29, 2901], [2801, 2501]],
    ]),
    skills: [skill("Spoken past: auxiliary and participle", 18, 1801, 1803), skill("Strong past forms", 19, 1901, 1902, 5041, 2802, 2801), skill("Simple past of sein", 1904, 29, 2901)],
  },
  describe: {
    title: "Help and describe",
    description: "Say whom something is for, compare things, and describe them in the singular and plural.",
    clearCount: 9,
    map: legs([
      [[20, 2002], [2001, 2003], [2903]],
      [[23, 2301], [2302, 5311], [5312]],
      [[24, 2401], [2402, 2403], [2404, 5242]],
    ]),
    skills: [skill("Dative receivers", 20, 2001, 2002, 2003), skill("Plural patterns", 23, 2302), skill("Comparisons", 24, 2401, 2402), skill("Adjective agreement", 2403, 2404)],
  },
  home: {
    title: "At home",
    description: "Use rooms, furniture and everyday objects to practise where something is versus where it goes.",
    clearCount: 7,
    map: legs([[[5051], [5052], [5161, 5162]], [[5181, 5201, 5202], [5192, 5211, 5212], [5222]], [[5361]]]),
    skills: [skill("Location vs. destination case", 5051, 5052), skill("Placing objects and people", 5181, 5201, 5202, 5192, 5361)],
  },
  travel: {
    title: "Around town",
    description: "Use directions and travel plans to practise the same location and destination cases as At home.",
    clearCount: 7,
    map: legs([[[27, 2703], [2701, 5171], [2702, 5172]], [[5251, 5252, 5261], [5182, 5262, 5271]]]),
    skills: [skill("Location vs. destination case", 27, 2701, 2702), skill("Travel vocabulary in sentences", 5251, 5252, 5261, 5182, 5262, 5271)],
  },
  complex: {
    title: "Say it another way",
    description: "Ask more gently, describe someone with a relative clause and report a question or condition.",
    clearCount: 5,
    map: legs([[[5081], [5082]], [[5101], [5102]], [[5111], [5112], [1403]]]),
    skills: [skill("Hypothetical forms", 5081, 5082), skill("Relative clauses", 5101, 5102), skill("Embedded questions or conditions", 5111, 5112)],
  },
  bridge: {
    title: "Read the bridge",
    description: "Follow whole stories and put the grammar and vocabulary from your route together.",
    clearCount: 8,
    map: legs([[[9001, 5322], [9002, 5362], [5332, 9004]], [[9003, 5351], [9005, 30], [3001, 3002, 3003]]]),
    skills: [skill("Reading in the present", 9001, 5322, 5351), skill("Reading in the past", 9002, 5362, 5332, 9004, 9005, 30, 3001), skill("Putting the course together", 5351, 9005, 30, 3001, 3003)],
  },
};

export const GERMAN_LESSON_CHAPTER: ReadonlyMap<number, GermanChapterId> = new Map(
  GERMAN_WORLD.stops.flatMap(({ value: chapterId }) => chapterId === null ? [] :
    GERMAN_CHAPTERS[chapterId].map.stops.flatMap(({ value }) => value === null ? [] : [[value, chapterId] as const]),
  ),
);
