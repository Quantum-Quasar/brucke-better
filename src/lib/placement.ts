export const PLACEMENT_SECONDS = 60;
export const PLACEMENT_ITEM_COUNT = 10;

export interface PlacementQuestion {
  pattern: string;
  prompt: string;
  options: readonly [string, string, string];
  answer: string;
}

const question = (pattern: string, prompt: string, answer: string, second: string, third: string): PlacementQuestion => ({
  pattern, prompt, options: [second, answer, third], answer,
});

// Short, language-specific equivalents: recognition, meaning and sentence patterns.
// These are a rough starting suggestion, not a test of mastery or a gate assessment.
const QUESTIONS: Record<string, readonly PlacementQuestion[]> = {
  de: [
    question("sound pattern", "Which German word means ‘water’?", "Wasser", "Wetter", "Woche"),
    question("cognate", "Which German word means ‘house’?", "Haus", "Haut", "Hut"),
    question("pronoun", "‘We’ in German?", "wir", "ihr", "sie"),
    question("verb", "Complete: Ich ___ hier. (I live here.)", "wohne", "wohnt", "wohnen"),
    question("negation", "‘I do not know’ in German?", "Ich weiß nicht", "Ich weiß schon", "Ich weiß auch"),
    question("article", "Choose the usual article: ___ Buch", "das", "der", "die"),
    question("sentence order", "‘Today I am coming’ in German?", "Heute komme ich", "Heute ich komme", "Ich heute komme"),
    question("plural", "The plural of ‘Kind’ (child)?", "Kinder", "Kindes", "Kinds"),
    question("modal", "‘I can come’ in German?", "Ich kann kommen", "Ich können komme", "Ich komme kann"),
    question("question", "‘Where do you live?’ in German?", "Wo wohnst du?", "Wer wohnt hier?", "Wann kommst du?"),
  ],
  nl: [
    question("sound pattern", "Which Dutch word means ‘house’?", "huis", "huid", "hoed"),
    question("cognate", "Which Dutch word means ‘book’?", "boek", "boom", "broek"),
    question("pronoun", "‘We’ in Dutch?", "wij", "jij", "zij"),
    question("verb", "Complete: Ik ___ hier. (I live here.)", "woon", "woont", "wonen"),
    question("negation", "‘I do not know’ in Dutch?", "Ik weet het niet", "Ik weet het al", "Ik weet het ook"),
    question("article", "Choose the usual article: ___ huis", "het", "de", "een paar"),
    question("sentence order", "‘Today I am coming’ in Dutch?", "Vandaag kom ik", "Vandaag ik kom", "Ik vandaag kom"),
    question("plural", "The plural of ‘boek’ (book)?", "boeken", "boeks", "boekje"),
    question("modal", "‘I can come’ in Dutch?", "Ik kan komen", "Ik kunnen kom", "Ik kom kan"),
    question("question", "‘Where do you live?’ in Dutch?", "Waar woon je?", "Wie woont hier?", "Wanneer kom je?"),
  ],
  es: [
    question("word pattern", "Which Spanish word means ‘nation’?", "nación", "noche", "nombre"),
    question("cognate", "Which Spanish word means ‘important’?", "importante", "imposible", "interesante"),
    question("pronoun", "‘We’ in Spanish?", "nosotros", "vosotros", "ellos"),
    question("verb", "Complete: Yo ___ aquí. (I live here.)", "vivo", "vive", "viven"),
    question("negation", "‘I do not know’ in Spanish?", "No sé", "Ya sé", "Sí sé"),
    question("article", "Choose the usual article: ___ libro", "el", "la", "las"),
    question("agreement", "‘The red house’ in Spanish?", "La casa roja", "La casa rojo", "El casa roja"),
    question("plural", "The plural of ‘ciudad’ (city)?", "ciudades", "ciudads", "ciudadas"),
    question("modal", "‘I can come’ in Spanish?", "Puedo venir", "Puedo vengo", "Puede venir"),
    question("question", "‘Where do you live?’ in Spanish?", "¿Dónde vives?", "¿Quién vive aquí?", "¿Cuándo vienes?"),
  ],
  fr: [
    question("word pattern", "Which French word means ‘nation’?", "nation", "nuit", "nom"),
    question("cognate", "Which French word means ‘important’?", "important", "impossible", "intéressant"),
    question("pronoun", "‘We’ in French?", "nous", "vous", "ils"),
    question("verb", "Complete: Je ___ ici. (I live here.)", "vis", "vit", "vivent"),
    question("negation", "‘I do not know’ in French?", "Je ne sais pas", "Je sais déjà", "Je sais aussi"),
    question("article", "Choose the usual article: ___ livre (book)", "le", "la", "les"),
    question("agreement", "‘The red house’ in French?", "La maison rouge", "Le maison rouge", "La maison rouges"),
    question("plural", "The plural of ‘cheval’ (horse)?", "chevaux", "chevals", "chevales"),
    question("modal", "‘I can come’ in French?", "Je peux venir", "Je peux viens", "Je peut venir"),
    question("question", "‘Where do you live?’ in French?", "Où habites-tu ?", "Qui habite ici ?", "Quand viens-tu ?"),
  ],
};
const MIXED_QUESTIONS: Record<string, readonly PlacementQuestion[]> = Object.fromEntries(Object.entries(QUESTIONS).map(([language, items]) => [
  language,
  items.map((item, index) => {
    const offset = index % item.options.length;
    return { ...item, options: [...item.options.slice(offset), ...item.options.slice(0, offset)] as [string, string, string] };
  }),
]));


export function getPlacementQuestions(languageId: string): readonly PlacementQuestion[] {
  // Never substitute German questions for an unsupported language.
  return MIXED_QUESTIONS[languageId] ?? [];
}

export function recommendPlacementTopic(results: readonly boolean[]): number {
  const correct = results.slice(0, PLACEMENT_ITEM_COUNT).filter(Boolean).length;
  // Sparse attempts are not enough evidence to suggest skipping early material.
  if (results.length < 8 || correct < 6) return 1;
  if (correct < 8) return 2;
  if (correct < 10) return 3;
  return 5;
}

export function suggestedReviewLimit(minutes: 5 | 10 | 20 | 30): 5 | 10 | 20 {
  return minutes === 5 ? 5 : minutes === 10 ? 10 : 20;
}
