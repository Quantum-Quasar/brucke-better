import { hashSeed, seededShuffle } from "./prng";

export const PLACEMENT_SECONDS = 90;
export const PLACEMENT_ITEM_COUNT = 15;

export type PlacementPhase = "early" | "intermediate" | "advanced";

export interface PlacementQuestion {
  pattern: string;
  prompt: string;
  options: readonly [string, string, string];
  answer: string;
  /** Approximate curriculum topic (1–30) this item probes. */
  topic: number;
  phase: PlacementPhase;
}

const question = (
  topic: number,
  phase: PlacementPhase,
  pattern: string,
  prompt: string,
  answer: string,
  second: string,
  third: string
): PlacementQuestion => ({
  topic,
  phase,
  pattern,
  prompt,
  options: [answer, second, third],
  answer,
});

// Language-specific placement items spanning the full 30-topic course:
// 5 early (Topics 1–10), 5 intermediate (Topics 10–19), 5 advanced (Topics 19–29).
const QUESTIONS: Record<string, readonly PlacementQuestion[]> = {
  de: [
    // Early (Topics 1–10)
    question(1, "early", "sound pattern", "Which German word means ‘water’?", "Wasser", "Wetter", "Woche"),
    question(2, "early", "modal", "‘I can come’ in German?", "Ich kann kommen", "Ich können komme", "Ich komme kann"),
    question(4, "early", "consonant shift", "Which German word means ‘brother’ (th → d)?", "Bruder", "Brot", "Brücke"),
    question(6, "early", "velar shift", "Which German word means ‘book’ (k → ch)?", "Buch", "Bauch", "Bach"),
    question(9, "early", "verb", "Complete: Ich ___ hier. (I live here.)", "wohne", "wohnt", "wohnen"),
    // Intermediate (Topics 11–18)
    question(11, "intermediate", "article", "Choose the usual article: ___ Buch", "das", "der", "die"),
    question(12, "intermediate", "negation", "‘I have no time’ in German?", "Ich habe keine Zeit", "Ich habe nicht Zeit", "Ich kein habe Zeit"),
    question(14, "intermediate", "subordinate clause", "‘…because I live here’ in German?", "…, weil ich hier wohne", "…, weil wohne ich hier", "…, weil ich wohne hier"),
    question(15, "intermediate", "separable verb", "‘I get up early’ (aufstehen) in German?", "Ich stehe früh auf", "Ich aufstehe früh", "Ich stehe auf früh"),
    question(18, "intermediate", "perfect tense", "‘I bought a book’ (Perfekt) in German?", "Ich habe ein Buch gekauft", "Ich bin ein Buch gekauft", "Ich habe gekauft ein Buch"),
    // Advanced (Topics 20–29)
    question(20, "advanced", "dative case", "Complete: Ich helfe ___ Mann. (the man, dative)", "dem", "den", "der"),
    question(22, "advanced", "gender suffix", "Which article always goes with nouns ending in -ung (e.g. Zeitung)?", "die", "der", "das"),
    question(24, "advanced", "comparative", "‘Better than yesterday’ in German?", "besser als gestern", "mehr gut wie gestern", "besser wie gestern"),
    question(27, "advanced", "two-way preposition", "‘The book is lying on the table’ (location, dative)?", "Das Buch liegt auf dem Tisch", "Das Buch liegt auf den Tisch", "Das Buch liegt auf der Tisch"),
    question(29, "advanced", "motion perfect", "‘She drove to Berlin’ (Perfekt with motion)?", "Sie ist nach Berlin gefahren", "Sie hat nach Berlin gefahren", "Sie ist nach Berlin gefahrt"),
  ],
  nl: [
    // Early (Topics 1–10)
    question(1, "early", "cognate", "Which Dutch word means ‘book’?", "boek", "boom", "broek"),
    question(2, "early", "spelling bridge", "Which Dutch word means ‘ship’ (sh → sch)?", "schip", "schaap", "schoen"),
    question(3, "early", "consonant shift", "Which Dutch word means ‘think’ (th → d)?", "denken", "drinken", "danken"),
    question(9, "early", "article", "Choose the usual article: ___ huis", "het", "de", "een paar"),
    question(10, "early", "verb", "Complete: Ik ___ hier. (I live here.)", "woon", "woont", "wonen"),
    // Intermediate (Topics 11–19)
    question(11, "intermediate", "negation", "‘I have no time’ in Dutch?", "Ik heb geen tijd", "Ik heb niet tijd", "Ik geen heb tijd"),
    question(12, "intermediate", "sentence order", "‘Today I am coming’ in Dutch?", "Vandaag kom ik", "Vandaag ik kom", "Ik vandaag kom"),
    question(13, "intermediate", "modal", "‘I can come’ in Dutch?", "Ik kan komen", "Ik kunnen kom", "Ik kom kan"),
    question(14, "intermediate", "separable verb", "‘I get up early’ (opstaan) in Dutch?", "Ik sta vroeg op", "Ik opsta vroeg", "Ik sta op vroeg"),
    question(19, "intermediate", "perfect tense", "‘I have worked’ in Dutch?", "Ik heb gewerkt", "Ik ben gewerkt", "Ik heb werken"),
    // Advanced (Topics 21–29)
    question(21, "advanced", "comparative", "‘Bigger than the house’ in Dutch?", "groter dan het huis", "meer groot als het huis", "groter als het huis"),
    question(24, "advanced", "er-construction", "‘There is a book on the table’ in Dutch?", "Er ligt een boek op tafel", "Het ligt een boek op tafel", "Daar is liggen een boek"),
    question(25, "advanced", "subordinate clause", "‘…because I live here’ in Dutch?", "…, omdat ik hier woon", "…, omdat woon ik hier", "…, omdat ik woon hier"),
    question(26, "advanced", "relative clause", "Complete: Het huis ___ ik zie. (The house that I see.)", "dat", "die", "wie"),
    question(29, "advanced", "diminutive", "What is the diminutive of ‘huis’ (little house)?", "huisje", "huistje", "huisken"),
  ],
  es: [
    // Early (Topics 1–7)
    question(1, "early", "cognate", "Which Spanish word means ‘important’?", "importante", "imposible", "interesante"),
    question(2, "early", "word pattern", "Which Spanish word means ‘nation’ (-tion → -ción)?", "nación", "noche", "nombre"),
    question(4, "early", "negation", "‘I do not know’ in Spanish?", "No sé", "Ya sé", "Sí sé"),
    question(5, "early", "ser vs estar", "‘Madrid is in Spain’ (location) in Spanish?", "Madrid está en España", "Madrid es en España", "Madrid son en España"),
    question(7, "early", "question", "‘Where do you live?’ in Spanish?", "¿Dónde vives?", "¿Quién vive aquí?", "¿Cuándo vienes?"),
    // Intermediate (Topics 10–18)
    question(10, "intermediate", "tener & hay", "‘There are three books’ in Spanish?", "Hay tres libros", "Tiene tres libros", "Están tres libros"),
    question(11, "intermediate", "agreement", "‘The red house’ in Spanish?", "La casa roja", "La casa rojo", "El casa roja"),
    question(12, "intermediate", "near future", "‘I am going to eat’ in Spanish?", "Voy a comer", "Voy comer", "Vengo a comer"),
    question(13, "intermediate", "por vs para", "Complete: Este regalo es ___ ti. (This gift is for you.)", "para", "por", "desde"),
    question(18, "intermediate", "preterite", "‘Yesterday I spoke with Ana’ (preterite)?", "Ayer hablé con Ana", "Ayer hablo con Ana", "Ayer hablaba con Ana"),
    // Advanced (Topics 19–28)
    question(19, "advanced", "imperfect", "‘When I was a child, I used to read a lot’?", "De niño leía mucho", "De niño leí mucho", "De niño leeré mucho"),
    question(23, "advanced", "object pronoun", "‘I see her’ (direct object pronoun) in Spanish?", "La veo", "Le veo", "Veo la"),
    question(25, "advanced", "gustar", "‘I like the books’ in Spanish?", "Me gustan los libros", "Me gusta los libros", "Yo gusto los libros"),
    question(26, "advanced", "subjunctive", "Complete: Espero que ___ pronto. (I hope you come soon.)", "vengas", "vienes", "vendrás"),
    question(28, "advanced", "relative pronoun", "Complete: El libro ___ leí era bueno. (The book that I read…)", "que", "quien", "donde"),
  ],
  fr: [
    // Early (Topics 1–7)
    question(1, "early", "cognate", "Which French word means ‘important’?", "important", "impossible", "intéressant"),
    question(2, "early", "word pattern", "Which French word means ‘nation’?", "nation", "nuit", "nom"),
    question(4, "early", "negation", "‘I do not know’ in French?", "Je ne sais pas", "Je sais déjà", "Je sais aussi"),
    question(5, "early", "verb", "Complete: Nous ___ prêts. (We are ready.)", "sommes", "êtes", "sont"),
    question(7, "early", "question", "‘Where do you live?’ in French?", "Où habites-tu ?", "Qui habite ici ?", "Quand viens-tu ?"),
    // Intermediate (Topics 11–18)
    question(11, "intermediate", "agreement", "‘The red house’ in French?", "La maison rouge", "Le maison rouge", "La maison rouges"),
    question(12, "intermediate", "near future", "‘I am going to leave’ in French?", "Je vais partir", "Je vais pars", "J’allais partir"),
    question(13, "intermediate", "preposition", "‘I am going to Paul’s place’ in French?", "Je vais chez Paul", "Je vais à Paul", "Je vais de Paul"),
    question(17, "intermediate", "passé composé", "‘I spoke with Marie’ (passé composé)?", "J’ai parlé avec Marie", "Je suis parlé avec Marie", "J’ai parler avec Marie"),
    question(18, "intermediate", "motion past", "‘She went to Paris’ (passé composé with être)?", "Elle est allée à Paris", "Elle a allé à Paris", "Elle est allé à Paris"),
    // Advanced (Topics 20–28)
    question(20, "advanced", "duration", "‘I have lived here for three years’ in French?", "J’habite ici depuis trois ans", "J’ai habité ici pendant trois ans", "J’habite ici pour trois ans"),
    question(22, "advanced", "en & y", "‘I am going there’ (replacing ‘à Paris’) in French?", "J’y vais", "J’en vais", "Je vais y"),
    question(23, "advanced", "object pronoun", "‘I see him’ in French?", "Je le vois", "Je vois le", "Je lui vois"),
    question(26, "advanced", "conditional", "‘I would like a coffee’ in French?", "Je voudrais un café", "Je veux un café", "Je voulais un café"),
    question(28, "advanced", "relative pronoun", "Complete: Le livre ___ j’ai lu. (The book that I read.)", "que", "qui", "dont"),
  ],
};

function shuffleQuestionOptions(
  languageId: string,
  items: readonly PlacementQuestion[],
  seed: number
): readonly PlacementQuestion[] {
  return items.map((item, index) => {
    const itemSeed = hashSeed(`${languageId}:${index}:${item.pattern}:${item.prompt}:${seed}`);
    const shuffled = seededShuffle([...item.options], itemSeed) as [string, string, string];
    return { ...item, options: shuffled };
  });
}

const DEFAULT_SHUFFLED_QUESTIONS: Record<string, readonly PlacementQuestion[]> = Object.fromEntries(
  Object.entries(QUESTIONS).map(([language, items]) => [
    language,
    shuffleQuestionOptions(language, items, 0),
  ])
);

/**
 * Returns the language's placement questions with shuffled answer options.
 * Pass a per-session numeric `seed` to randomize option positions per run;
 * omit `seed` for deterministic shuffling (SSR-safe and test-friendly).
 */
export function getPlacementQuestions(languageId: string, seed?: number): readonly PlacementQuestion[] {
  // Never substitute German questions for an unsupported language.
  const base = QUESTIONS[languageId];
  if (!base) return [];
  if (seed === undefined || seed === 0) return DEFAULT_SHUFFLED_QUESTIONS[languageId] ?? [];
  return shuffleQuestionOptions(languageId, base, seed);
}

/**
 * Maps placement recognition results (up to PLACEMENT_ITEM_COUNT items across
 * early [0..4], intermediate [5..9], and advanced [10..14] bands) to a starting
 * topic (1–28). Requires >=4/5 on the early band before placing past Topic 1,
 * and >=4/5 on intermediate before placing into the advanced phase.
 */
export function recommendPlacementTopic(results: readonly boolean[]): number {
  const attempted = results.slice(0, PLACEMENT_ITEM_COUNT);
  if (attempted.length < 8) return 1;

  const earlyCorrect = attempted.slice(0, 5).filter(Boolean).length;
  const intermediateCorrect = attempted.slice(5, 10).filter(Boolean).length;
  const advancedCorrect = attempted.slice(10, 15).filter(Boolean).length;

  // Must demonstrate mastery of the early band (>=4/5) before skipping Topic 1
  if (earlyCorrect < 4) return 1;

  // Must demonstrate mastery of the intermediate band (>=4/5) before entering advanced topics
  if (intermediateCorrect < 4) {
    if (intermediateCorrect <= 1) return 4;
    if (intermediateCorrect === 2) return 8;
    return 10;
  }

  // Passed both early and intermediate bands: place by advanced-band performance
  if (advancedCorrect === 0) return 14;
  if (advancedCorrect === 1) return 16;
  if (advancedCorrect === 2) return 20;
  if (advancedCorrect === 3) return 23;
  if (advancedCorrect === 4) return 26;
  return 28;
}

export function suggestedReviewLimit(minutes: 5 | 10 | 20 | 30): 5 | 10 | 20 {
  return minutes === 5 ? 5 : minutes === 10 ? 10 : 20;
}
