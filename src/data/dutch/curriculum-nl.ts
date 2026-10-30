import type { LessonShell, TopicCluster, TrailBranch, TrailGate } from "@/lib/types";
import type { CurriculumData } from "../curriculum-core";

// ---------------------------------------------------------------------------
// De Brug — the Dutch trail. 30 topics on one spine, one cluster sprig per
// topic and 15 support branches. Dutch is Low Franconian: it skipped the High
// German consonant shift, so the course spends its early lessons on the
// correspondences English and Dutch still share, then moves to the word-order
// machine English lost. Every core, sprig and branch lesson is authored in
// data/dutch/lessons-nl.ts.
// ---------------------------------------------------------------------------

const NL_TOTAL_TOPICS = 30;

const nlSprigId = (topicId: number, index: number) => topicId * 100 + index;

const shell = (id: number, title: string, plan: string): LessonShell => ({
  id,
  title,
  plan,
  authored: true,
});

const authoredCore = (id: number, title: string): LessonShell => ({
  id,
  title,
  plan: "Authored — full content lives in data/dutch/lessons-nl.ts.",
  authored: true,
});

export const NL_TOPICS: TopicCluster[] = [
  {
    id: 1,
    title: "The Dutch Inside Your English",
    blurb: "Dutch skipped the High German shift: water stays water, ship becomes schip, and the twins are everywhere.",
    core: authoredCore(1, "The Dutch Inside Your English"),
    sprigs: [
      shell(nlSprigId(1, 1), "Hidden Twins: Body & Home", "arm, hand, vinger, huis, boek, brood: direct-cognate recognition with de/het colours."),
    ],
  },
  {
    id: 2,
    title: "The SCH Bridge",
    blurb: "English sh is Dutch sch: ship→schip, shoe→schoen, sheep→schaap.",
    core: authoredCore(2, "The SCH Bridge"),
    sprigs: [
      shell(nlSprigId(2, 1), "SCH Spelling Gym", "shell, sharp, shoulder, shadow: read sch as one sound and keep the English twin in view."),
    ],
  },
  {
    id: 3,
    title: "The TH → D Bridge",
    blurb: "English th becomes Dutch d: brother→broeder, three→drie, think→denken.",
    core: authoredCore(3, "The TH → D Bridge"),
    sprigs: [
      shell(nlSprigId(3, 1), "TH → D Discrimination", "Separate th→d twins from words that merely look alike; drill brother, mother, father, thing."),
    ],
  },
  {
    id: 4,
    title: "The F → V & S → Z Bridges",
    blurb: "Dutch voices the old f and s: father→vader, foot→voet, sun→zon, sea→zee.",
    core: authoredCore(4, "The F → V & S → Z Bridges"),
    sprigs: [
      shell(nlSprigId(4, 1), "Voicing Gym", "Mixed f/v and s/z drills: fish/vis, fire/vuur, salt/zout, seven/zeven."),
    ],
  },
  {
    id: 5,
    title: "The GH → CH Bridge",
    blurb: "English gh answers to Dutch ch or g: night→nacht, light→licht, right→recht.",
    core: authoredCore(5, "The GH → CH Bridge"),
    sprigs: [
      shell(nlSprigId(5, 1), "CH & G Clinic", "The two throat sounds: nacht, licht, recht versus goed, groen, geven."),
    ],
  },
  {
    id: 6,
    title: "The Vowel Bridges",
    blurb: "The real Dutch work: ij, ui, oe and eu turn English vowels into Dutch words.",
    core: authoredCore(6, "The Vowel Bridges"),
    sprigs: [
      shell(nlSprigId(6, 1), "IJ / UI / OE Gym", "ice→ijs, house→huis, book→boek: three vowel families, one sound at a time."),
    ],
  },
  {
    id: 7,
    title: "G, CH & Dutch Spelling",
    blurb: "yellow→geel, good→goed, and why Dutch writes t for d at the end of a word.",
    core: authoredCore(7, "G, CH & Dutch Spelling"),
    sprigs: [
      shell(nlSprigId(7, 1), "Final Devoicing Gym", "hond→hond, but honden; huis→huizen: hear the consonant change when the word grows."),
    ],
  },
  {
    id: 8,
    title: "Zijn & Hebben",
    blurb: "to be, to have, and the Dutch way to say your age: ik ben twintig.",
    core: authoredCore(8, "Zijn & Hebben"),
    sprigs: [
      shell(nlSprigId(8, 1), "Zijn & Have Gym", "ben/bent/is, heb/hebt/heeft: build identity, possession and age sentences."),
    ],
  },
  {
    id: 9,
    title: "De & Het: Gender Without Case",
    blurb: "Two articles, no case system: decode de/het from compounds, endings and diminutives.",
    core: authoredCore(9, "De & Het: Gender Without Case"),
    sprigs: [
      shell(nlSprigId(9, 1), "De/Het Decoder", "huis, boek, tafel, stoel: article drills that read the noun's ending and compound head."),
    ],
  },
  {
    id: 10,
    title: "The Present Tense",
    blurb: "One stem, two endings: ik werk, jij werkt, wij werken — and the t that disappears in inversion.",
    core: authoredCore(10, "The Present Tense"),
    sprigs: [
      shell(nlSprigId(10, 1), "Present Tense Drill", "werk/werkt/werken, maak/maakt/maken: conjugate the stem and invert without losing the t."),
    ],
  },
  {
    id: 11,
    title: "Niet & Geen",
    blurb: "Dutch splits negation in two: niet for the sentence, geen for an indefinite noun.",
    core: authoredCore(11, "Niet & Geen"),
    sprigs: [
      shell(nlSprigId(11, 1), "Niet/Geen Drill", "ik werk niet, ik heb geen tijd: choose the negator by what follows."),
    ],
  },
  {
    id: 12,
    title: "Word Order: The Dutch Bracket",
    blurb: "The verb takes second place; front something else and it steps around the subject.",
    core: authoredCore(12, "Word Order: The Dutch Bracket"),
    sprigs: [
      shell(nlSprigId(12, 1), "Inversion Gym", "Vandaag werk ik, morgen kom jij: front a time word and invert every time."),
    ],
  },
  {
    id: 13,
    title: "Modals & the Final Infinitive",
    blurb: "kan, moet, mag, wil, zal — the second verb waits at the end.",
    core: authoredCore(13, "Modals & the Final Infinitive"),
    sprigs: [
      shell(nlSprigId(13, 1), "Modal Gym", "ik kan komen, jij moet werken: one modal, one infinitive, no exceptions yet."),
    ],
  },
  {
    id: 14,
    title: "Separable Verbs",
    blurb: "opbellen, meebrengen, aankomen: the prefix walks to the end of the sentence.",
    core: authoredCore(14, "Separable Verbs"),
    sprigs: [
      shell(nlSprigId(14, 1), "Separable Verb Gym", "ik bel je op, ik breng het mee: split the verb and park the prefix."),
    ],
  },
  {
    id: 15,
    title: "Numbers & Time",
    blurb: "een, twee, drie; half drie means half past two — Dutch counts toward the next hour.",
    core: authoredCore(15, "Numbers & Time"),
    sprigs: [
      shell(nlSprigId(15, 1), "Clock & Numbers Gym", "tien, twintig, honderd; hoe laat is het? — numbers and the Dutch clock."),
    ],
  },
  {
    id: 16,
    title: "Days, Months & Dates",
    blurb: "maandag, januari, vandaag: the calendar words English and Dutch share.",
    core: authoredCore(16, "Days, Months & Dates"),
    sprigs: [
      shell(nlSprigId(16, 1), "Calendar Gym", "gisteren, vandaag, morgen; op maandag, in januari: time prepositions."),
    ],
  },
  {
    id: 17,
    title: "The Weak Past",
    blurb: "werk→werkte, maak→maakte: the past tense is a small ending, not a new word.",
    core: authoredCore(17, "The Weak Past"),
    sprigs: [
      shell(nlSprigId(17, 1), "Weak Past Gym", "-te or -de? Read the stem's last sound and choose the ending."),
    ],
  },
  {
    id: 18,
    title: "The Strong Past",
    blurb: "kom→kwam, zie→zag, geef→gaf: the old vowel dance English still knows as sing/sang.",
    core: authoredCore(18, "The Strong Past"),
    sprigs: [
      shell(nlSprigId(18, 1), "Strong Verb Gym", "kwam, zag, gaf, nam: the highest-frequency strong pasts, one family at a time."),
    ],
  },
  {
    id: 19,
    title: "The Perfect Tense",
    blurb: "ik heb gewerkt, ik ben gekomen: hebben or zijn, plus the ge- participle.",
    core: authoredCore(19, "The Perfect Tense"),
    sprigs: [
      shell(nlSprigId(19, 1), "Perfect Tense Gym", "gewerkt, gemaakt, gekomen, gegaan: build the participle and choose the helper."),
    ],
  },
  {
    id: 20,
    title: "The Future & the Would-World",
    blurb: "gaan + infinitive for plans, zou for the polite conditional.",
    core: authoredCore(20, "The Future & the Would-World"),
    sprigs: [
      shell(nlSprigId(20, 1), "Future & Would Gym", "ik ga werken, ik zou graag willen: plans, predictions and politeness."),
    ],
  },
  {
    id: 21,
    title: "Comparatives & Superlatives",
    blurb: "groot→groter→grootst; goed→beter→best — the same suppletion English owns.",
    core: authoredCore(21, "Comparatives & Superlatives"),
    sprigs: [
      shell(nlSprigId(21, 1), "Comparison Gym", "groter dan, even groot als, het grootst: compare without translating 'than'."),
    ],
  },
  {
    id: 22,
    title: "Pronouns & Possessives",
    blurb: "mij/me, jou/je, hem, haar; mijn, jouw, zijn — the pronoun system with a polite u.",
    core: authoredCore(22, "Pronouns & Possessives"),
    sprigs: [
      shell(nlSprigId(22, 1), "Pronoun Gym", "ik zie hem, zij ziet mij, mijn broer en jouw zus: pronoun and possessive swaps."),
    ],
  },
  {
    id: 23,
    title: "Reflexives & Daily Routine",
    blurb: "ik was me, ik voel me — Dutch often uses a reflexive where English uses nothing.",
    core: authoredCore(23, "Reflexives & Daily Routine"),
    sprigs: [
      shell(nlSprigId(23, 1), "Reflexive Gym", "zich wassen, zich voelen, zich vergissen: a day told through reflexives."),
    ],
  },
  {
    id: 24,
    title: "Er: The Little Word That Does Everything",
    blurb: "er is, er zijn, ik heb er twee: existence, place and 'of it' in one word.",
    core: authoredCore(24, "Er: The Little Word That Does Everything"),
    sprigs: [
      shell(nlSprigId(24, 1), "Er Gym", "er is, er zijn, er van, er mee: the four jobs of er in one drill."),
    ],
  },
  {
    id: 25,
    title: "Subordinate Clauses",
    blurb: "omdat, dat, als — the verb leaves second place and waits at the end.",
    core: authoredCore(25, "Subordinate Clauses"),
    sprigs: [
      shell(nlSprigId(25, 1), "Verb-Final Gym", "ik denk dat hij komt, omdat ik werk: move the verb to the end."),
    ],
  },
  {
    id: 26,
    title: "Relative Clauses & Connectors",
    blurb: "die, dat, wie, wat — and the connectors that hold a Dutch argument together.",
    core: authoredCore(26, "Relative Clauses & Connectors"),
    sprigs: [
      shell(nlSprigId(26, 1), "Relative Clause Gym", "de man die komt, het boek dat ik lees: choose die or dat by the noun."),
    ],
  },
  {
    id: 27,
    title: "The Continuous & Position Verbs",
    blurb: "aan het werken, zitten te lezen: Dutch builds 'is doing' with a posture verb.",
    core: authoredCore(27, "The Continuous & Position Verbs"),
    sprigs: [
      shell(nlSprigId(27, 1), "Continuous Gym", "ik ben aan het werken, zij zit te lezen: the Dutch -ing."),
    ],
  },
  {
    id: 28,
    title: "Dutch Idioms & Directness",
    blurb: "lekker, gezellig, doe normaal, graag: the words that make Dutch sound Dutch.",
    core: authoredCore(28, "Dutch Idioms & Directness"),
    sprigs: [
      shell(nlSprigId(28, 1), "Idiom Gym", "zin hebben, trek hebben, het naar je zin hebben: desire and comfort the Dutch way."),
    ],
  },
  {
    id: 29,
    title: "Diminutives & Word Formation",
    blurb: "-je, -tje, -pje, -etje: the diminutive is Dutch's favourite word-building machine.",
    core: authoredCore(29, "Diminutives & Word Formation"),
    sprigs: [
      shell(nlSprigId(29, 1), "Diminutive Gym", "broodje, kopje, huisje, appeltje: shrink a noun and change its article to het."),
    ],
  },
  {
    id: 30,
    title: "Capstone: De Brug Reading",
    blurb: "One connected Dutch story with every bridge, tense and connector in plain sight.",
    core: authoredCore(30, "Capstone: De Brug Reading"),
    sprigs: [
      shell(nlSprigId(30, 1), "De Brug Review", "A final mixed drill across the whole trail: read, build and say the story."),
    ],
  },
];

export const NL_TRAIL_BRANCHES: TrailBranch[] = [
  {
    id: 5010,
    attach: 1,
    title: "First Words, First Spoken",
    blurb: "Greetings, thanks, please and the Dutch alphabet.",
    lessons: [shell(5011, "Hallo, Dag & Alsjeblieft", "hallo, dag, goedemorgen, dank je, alsjeblieft — the politeness set in dialogue.")],
  },
  {
    id: 5020,
    attach: 2,
    title: "The Sound Gym",
    blurb: "Dutch vowels, diphthongs and the sch/g/ch trio.",
    lessons: [shell(5021, "Vowels & Diphthongs", "aa/ee/oo/uu, ij/ui/oe/eu: hear the length and the glide before spelling them.")],
  },
  {
    id: 5030,
    attach: 3,
    title: "False Friends Preview",
    blurb: "room, brood, bellen: the traps that look like English.",
    lessons: [shell(5031, "Room, Brood & Bellen", "room = cream, brood = bread, bellen = to call: the first trap deck in the wild.")],
  },
  {
    id: 5040,
    attach: 9,
    title: "The T–V Line",
    blurb: "jij or u, and the culture of Dutch directness.",
    lessons: [shell(5041, "Jij, U & Doe Normaal", "Informal jij versus polite u; when Dutch drops the formal register.")],
  },
  {
    id: 5050,
    attach: 12,
    title: "In de Stad",
    blurb: "Directions, trams and the words on every Dutch corner.",
    lessons: [shell(5051, "Links, Rechts & Rechtdoor", "links, rechts, rechtdoor, de tram, het station: ask and give directions.")],
  },
  {
    id: 5060,
    attach: 15,
    title: "Shopping & Euros",
    blurb: "Prices, paying and the Dutch pin machine.",
    lessons: [shell(5061, "Hoeveel Kost Het?", "hoeveel kost het, betalen, pinnen, contant: shopping in euros.")],
  },
  {
    id: 5070,
    attach: 17,
    title: "The Past in the Wild",
    blurb: "Negation and questions inside the past tense.",
    lessons: [shell(5071, "Werkte Je Niet?", "Flip past-tense statements into negatives and questions without changing the tense.")],
  },
  {
    id: 5080,
    attach: 23,
    title: "De Hele Dag",
    blurb: "A full day told through reflexive verbs.",
    lessons: [shell(5081, "Opstaan, Wassen & Slapen", "zich aankleden, zich wassen, zich voorbereiden: a reflexive morning-to-night chain.")],
  },
  {
    id: 5090,
    attach: 26,
    title: "Connectors",
    blurb: "omdat, maar, hoewel, als — joining two Dutch thoughts.",
    lessons: [shell(5091, "Omdat, Maar & Hoewel", "Cause, contrast and condition: the connectors that change verb order.")],
  },
  {
    id: 5100,
    attach: 20,
    title: "The Would-World",
    blurb: "Polite requests and hypotheticals with zou.",
    lessons: [shell(5101, "Ik Zou Graag…", "zou willen, zou kunnen, zou moeten: the politeness escalator.")],
  },
  {
    id: 5110,
    attach: 8,
    title: "Have & Hunger",
    blurb: "Dutch says you 'have' hunger and thirst.",
    lessons: [shell(5111, "Honger, Dorst & Leeftijd", "ik heb honger, ik heb dorst, ik ben twintig: possession where English uses 'be'.")],
  },
  {
    id: 5120,
    attach: 13,
    title: "Eten & Drinken",
    blurb: "Ordering at a Dutch table.",
    lessons: [shell(5121, "Koffie, Brood & De Rekening", "een kopje koffie, een broodje, de rekening: café Dutch.")],
  },
  {
    id: 5130,
    attach: 14,
    title: "Reizen",
    blurb: "Trains, tickets and Dutch stations.",
    lessons: [shell(5131, "De Trein & Het Ticket", "het station, de trein, het ticket, overstappen: rail travel.")],
  },
  {
    id: 5140,
    attach: 22,
    title: "Familie & Beroepen",
    blurb: "Family words and what people do.",
    lessons: [shell(5141, "Moeder, Vader & Leraar", "moeder, vader, broer, zus; leraar, arts, bakker: family and work.")],
  },
  {
    id: 5150,
    attach: 30,
    title: "Lichaam & Kleding",
    blurb: "Body parts, clothing and colours.",
    lessons: [shell(5151, "Hand, Voet & Het Blauwe Shirt", "hand, voet, hoofd; het shirt, de broek: body and clothes with adjective -e.")],
  },
];

export const NL_TRAIL_GATES: TrailGate[] = [
  {
    id: 1,
    afterTopic: 7,
    requiredStars: 8,
    title: "The Twin Gate",
    why: "Topics 1–7 install the English↔Dutch decode engine: sch, th→d, f→v, s→z, gh→ch, the vowels and Dutch spelling. Everything ahead assumes you can read a Dutch word through its pattern — bank 8 stars in this stretch.",
  },
  {
    id: 2,
    afterTopic: 14,
    requiredStars: 9,
    title: "The Sentence Gate",
    why: "Topics 8–14 build the sentence machine: zijn/hebben, de/het, the present tense, negation, V2 order, modals and separable verbs. Time travel ahead reuses all of it — earn 9 stars here.",
  },
  {
    id: 3,
    afterTopic: 21,
    requiredStars: 8,
    title: "The Past Gate",
    why: "Topics 15–21 give you numbers, time, both past tenses, the perfect, the future and comparison. The deep engine ahead assumes you can move a sentence through time — carry 8 stars forward.",
  },
  {
    id: 4,
    afterTopic: 26,
    requiredStars: 6,
    title: "The Engine Gate",
    why: "Topics 22–26 install pronouns, reflexives, er, subordinate clauses and relative clauses. The synthesis stretch is pure recall across them — bring 6 stars.",
  },
  {
    id: 5,
    afterTopic: 29,
    requiredStars: 3,
    title: "The Capstone Gate",
    why: "Topics 27–29 add the continuous, idioms and diminutives. The capstone reading assumes the whole trail is available — earn 3 stars in this last stretch.",
  },
];

const NL_AUTHORED_SHELLS = new Map<number, LessonShell>();
for (const topic of NL_TOPICS) {
  if (topic.core.authored) NL_AUTHORED_SHELLS.set(topic.core.id, topic.core);
  for (const sprig of topic.sprigs) {
    if (sprig.authored) NL_AUTHORED_SHELLS.set(sprig.id, sprig);
  }
}
for (const branch of NL_TRAIL_BRANCHES) {
  for (const lesson of branch.lessons) {
    if (lesson.authored) NL_AUTHORED_SHELLS.set(lesson.id, lesson);
  }
}

export const DUTCH_CURRICULUM: CurriculumData = {
  topics: NL_TOPICS,
  trailBranches: NL_TRAIL_BRANCHES,
  trailGates: NL_TRAIL_GATES,
  totalTopics: NL_TOTAL_TOPICS,
  lessonCount: NL_AUTHORED_SHELLS.size,
};
