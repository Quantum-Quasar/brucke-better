export type CefrBandId = "A1.1" | "A1.2" | "A2.1" | "A2.2";

export interface CefrBandMeta {
  id: CefrBandId;
  title: string;
  subtitle: string;
}

export interface CanDoGoal {
  /** Core topic id (1–30), matching the core lesson id on the trail. */
  topicId: number;
  band: CefrBandId;
  topicTitle: string;
  /** Concrete real-life "I can …" descriptor. */
  canDo: string;
  /** Short target-language illustration showing the skill in action. */
  examplePhrase: string;
  skillArea: "Vocabulary" | "Grammar" | "Conversation" | "Reading";
}

export const CEFR_BANDS: CefrBandMeta[] = [
  {
    id: "A1.1",
    title: "A1.1 — First Contact & Cognate Bridges",
    subtitle: "Decode everyday words through sound shifts and assemble your first modal sentences.",
  },
  {
    id: "A1.2",
    title: "A1.2 — Everyday Sentences & Questions",
    subtitle: "Ask questions, negate cleanly, handle objects, and link clauses in real conversations.",
  },
  {
    id: "A2.1",
    title: "A2.1 — Past Events, Routines & Nuance",
    subtitle: "Talk about yesterday, give and thank in the dative, tell time, and unpack long nouns.",
  },
  {
    id: "A2.2",
    title: "A2.2 — Connected Stories & Real-World Fluency",
    subtitle: "Compare options, describe locations, spot idioms and false friends, and read connected prose.",
  },
];

export const CANDO_GOALS: CanDoGoal[] = [
  // A1.1 (Topics 1–8)
  {
    topicId: 1,
    band: "A1.1",
    topicTitle: "The Germanic Core",
    canDo: "I can recognize everyday body, food, and home cognates and form my first simple statements.",
    examplePhrase: "Ich lerne Deutsch.",
    skillArea: "Vocabulary",
  },
  {
    topicId: 2,
    band: "A1.1",
    topicTitle: "Modal Auxiliaries & The Bracket",
    canDo: "I can express what I can, must, or want to do using the German verb bracket.",
    examplePhrase: "Ich kann morgen kommen.",
    skillArea: "Grammar",
  },
  {
    topicId: 3,
    band: "A1.1",
    topicTitle: "The P → F / FF Shift",
    canDo: "I can decode unfamiliar f/ff/pf words like Schiff, hoffen, and Apfel from their English twins.",
    examplePhrase: "Das Schiff ist offen.",
    skillArea: "Vocabulary",
  },
  {
    topicId: 4,
    band: "A1.1",
    topicTitle: "The Dental Hardening (TH → D)",
    canDo: "I can recognize and use core family and everyday words where English th became German d.",
    examplePhrase: "Danke, mein Bruder!",
    skillArea: "Vocabulary",
  },
  {
    topicId: 5,
    band: "A1.1",
    topicTitle: "The Sibilant Shift (T → S / SS / Z)",
    canDo: "I can order drinks, read street signs, and pronounce z (/ts/) and ß in common words.",
    examplePhrase: "Ein Glas Wasser, bitte.",
    skillArea: "Conversation",
  },
  {
    topicId: 6,
    band: "A1.1",
    topicTitle: "The Velar Shift (K → CH)",
    canDo: "I can talk about making, speaking, and reading while distinguishing Ach-Laut and Ich-Laut.",
    examplePhrase: "Ich suche ein Buch.",
    skillArea: "Vocabulary",
  },
  {
    topicId: 7,
    band: "A1.1",
    topicTitle: "The Stop Shift (D → T)",
    canDo: "I can understand everyday time, travel, and family words transformed by the d → t shift.",
    examplePhrase: "Guten Tag! Die Tür ist offen.",
    skillArea: "Vocabulary",
  },
  {
    topicId: 8,
    band: "A1.1",
    topicTitle: "The Latin Bridge (-ieren)",
    canDo: "I can talk about studying, organizing, and repairing things using international -ieren verbs.",
    examplePhrase: "Ich studiere und telefoniere.",
    skillArea: "Conversation",
  },

  // A1.2 (Topics 9–15)
  {
    topicId: 9,
    band: "A1.2",
    topicTitle: "Conjugation Roots & The Living Endings",
    canDo: "I can conjugate regular present-tense verbs accurately for ich, du, er/sie, and wir.",
    examplePhrase: "Du trinkst Kaffee, wir lernen.",
    skillArea: "Grammar",
  },
  {
    topicId: 10,
    band: "A1.2",
    topicTitle: "Pronouns as Case Anchors (The Him-Case)",
    canDo: "I can mark direct objects in the accusative case (den, einen, ihn) without hesitation.",
    examplePhrase: "Ich trinke den Kaffee.",
    skillArea: "Grammar",
  },
  {
    topicId: 11,
    band: "A1.2",
    topicTitle: "The Article Grid & the ein-Family",
    canDo: "I can refer to specific and owned items using der/die/das, dieser, and mein/dein.",
    examplePhrase: "Das ist mein Buch.",
    skillArea: "Grammar",
  },
  {
    topicId: 12,
    band: "A1.2",
    topicTitle: "Nicht & Kein",
    canDo: "I can say what I do not want or do not have by choosing cleanly between nicht and kein.",
    examplePhrase: "Ich habe keine Zeit.",
    skillArea: "Conversation",
  },
  {
    topicId: 13,
    band: "A1.2",
    topicTitle: "Asking Questions",
    canDo: "I can ask open W-questions and direct yes/no questions in shops, stations, and small talk.",
    examplePhrase: "Wo ist der Bahnhof?",
    skillArea: "Conversation",
  },
  {
    topicId: 14,
    band: "A1.2",
    topicTitle: "Word Order & Subordinate Clauses",
    canDo: "I can give reasons and link thoughts using verb-second order and verb-final weil/dass clauses.",
    examplePhrase: "Ich bleibe hier, weil es regnet.",
    skillArea: "Grammar",
  },
  {
    topicId: 15,
    band: "A1.2",
    topicTitle: "Separable Verbs & Spatial Prefixes",
    canDo: "I can describe everyday actions like calling, arriving, and waking up with separable prefixes.",
    examplePhrase: "Ich rufe dich morgen an.",
    skillArea: "Conversation",
  },

  // A2.1 (Topics 16–22)
  {
    topicId: 16,
    band: "A2.1",
    topicTitle: "Inseparable Prefixes (ver-, be-, er-)",
    canDo: "I can talk about daily routines and explain, remember, or forget things using bound prefixes and reflexives.",
    examplePhrase: "Ich vergesse das nie.",
    skillArea: "Conversation",
  },
  {
    topicId: 17,
    band: "A2.1",
    topicTitle: "Numbers, Time & gestern",
    canDo: "I can understand prices, phone numbers, weekdays, and tell the time to schedule plans.",
    examplePhrase: "Wir treffen uns am Donnerstag um zwölf.",
    skillArea: "Conversation",
  },
  {
    topicId: 18,
    band: "A2.1",
    topicTitle: "The Conversational Past (Perfekt)",
    canDo: "I can narrate what happened yesterday or over the weekend using haben/sein + past participle.",
    examplePhrase: "Gestern habe ich Brot gekauft.",
    skillArea: "Conversation",
  },
  {
    topicId: 19,
    band: "A2.1",
    topicTitle: "Strong Verbs & Ancient Ablaut",
    canDo: "I can recognize and use irregular past forms of core verbs like sein, haben, gehen, and modals.",
    examplePhrase: "Ich war müde und konnte nicht kommen.",
    skillArea: "Grammar",
  },
  {
    topicId: 20,
    band: "A2.1",
    topicTitle: "The Dative Case",
    canDo: "I can thank, help, and give things to people using dative pronouns and articles (mir, dir, dem).",
    examplePhrase: "Kannst du mir helfen?",
    skillArea: "Conversation",
  },
  {
    topicId: 21,
    band: "A2.1",
    topicTitle: "Compound Noun Engineering",
    canDo: "I can break down long German compound nouns into their parts and infer their gender from the head noun.",
    examplePhrase: "Der Handschuh liegt auf dem Tisch.",
    skillArea: "Reading",
  },
  {
    topicId: 22,
    band: "A2.1",
    topicTitle: "Gender Heuristics & Suffix Clues",
    canDo: "I can predict the article (der/die/das) of new nouns from high-signal endings like -ung, -heit, and -chen.",
    examplePhrase: "Die Rechnung, bitte!",
    skillArea: "Vocabulary",
  },

  // A2.2 (Topics 23–30)
  {
    topicId: 23,
    band: "A2.2",
    topicTitle: "Plurals & i-Mutation",
    canDo: "I can talk about multiple people or objects using German plural endings and umlaut patterns.",
    examplePhrase: "Die Bücher sind neu.",
    skillArea: "Grammar",
  },
  {
    topicId: 24,
    band: "A2.2",
    topicTitle: "Comparatives & Suppletion",
    canDo: "I can compare products, places, and plans using -er/-ste forms and natural adjective endings.",
    examplePhrase: "Das Fahrrad ist schneller als der Bus.",
    skillArea: "Conversation",
  },
  {
    topicId: 25,
    band: "A2.2",
    topicTitle: "Hidden Shifts I: V → B",
    canDo: "I can decode deeper cognate families like geben/give and über/over in spoken and written German.",
    examplePhrase: "Ich gebe dir das Buch über Berlin.",
    skillArea: "Reading",
  },
  {
    topicId: 26,
    band: "A2.2",
    topicTitle: "Hidden Shifts II: GH→CH & Y→G",
    canDo: "I can read words like Nacht, Licht, Tochter, and gestern effortlessly via consonant-shift patterns.",
    examplePhrase: "Gestern Nacht war das Licht hell.",
    skillArea: "Reading",
  },
  {
    topicId: 27,
    band: "A2.2",
    topicTitle: "Prepositions as Physical Metaphors",
    canDo: "I can describe locations and directions accurately using spatial prepositions and their cases.",
    examplePhrase: "Wir gehen durch den Park.",
    skillArea: "Conversation",
  },
  {
    topicId: 28,
    band: "A2.2",
    topicTitle: "Verb Families & Root Radiations",
    canDo: "I can deduce whole word families from a single verb root like fahren/Fahrt or ziehen/Zug.",
    examplePhrase: "Der Zug fährt pünktlich ab.",
    skillArea: "Reading",
  },
  {
    topicId: 29,
    band: "A2.2",
    topicTitle: "sein, Motion & the Idiomatic Mindset",
    canDo: "I can handle everyday greetings and express how I feel with natural German idioms.",
    examplePhrase: "Wie geht's? Mir ist ein bisschen kalt.",
    skillArea: "Conversation",
  },
  {
    topicId: 30,
    band: "A2.2",
    topicTitle: "Capstone: The Bridge Reading",
    canDo: "I can read a connected German short story, infer new vocabulary in context, and avoid false-friend traps.",
    examplePhrase: "Ich bekomme heute Besuch in Berlin.",
    skillArea: "Reading",
  },
];

export interface EvaluatedCanDoGoal extends CanDoGoal {
  completed: boolean;
}

export interface CefrBandProgress {
  band: CefrBandMeta;
  goals: EvaluatedCanDoGoal[];
  completedCount: number;
  totalCount: number;
  percent: number;
}

export interface CanDoProgressSummary {
  bands: CefrBandProgress[];
  completedCount: number;
  totalCount: number;
  percent: number;
  currentBand: CefrBandId;
}

/**
 * Evaluate CEFR Can-do checklist progress from the learner's completed lesson IDs.
 * A topic's Can-do goal is ticked off automatically once its core lesson (1–30) is completed.
 */
export function evaluateCanDoProgress(completedLessons: readonly number[]): CanDoProgressSummary {
  const completedSet = new Set(completedLessons);

  const bands: CefrBandProgress[] = CEFR_BANDS.map((band) => {
    const goals: EvaluatedCanDoGoal[] = CANDO_GOALS.filter((g) => g.band === band.id).map((g) => ({
      ...g,
      completed: completedSet.has(g.topicId),
    }));
    const completedCount = goals.filter((g) => g.completed).length;
    const totalCount = goals.length;
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return { band, goals, completedCount, totalCount, percent };
  });

  const totalCount = CANDO_GOALS.length;
  const completedCount = bands.reduce((sum, b) => sum + b.completedCount, 0);
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Determine the first band with remaining milestones (or A2.2 if all bands are complete).
  let currentBand: CefrBandId = "A1.1";
  for (const b of bands) {
    currentBand = b.band.id;
    if (b.completedCount < b.totalCount) break;
  }

  return { bands, completedCount, totalCount, percent, currentBand };
}
