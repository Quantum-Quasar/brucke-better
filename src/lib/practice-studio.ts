import type { LessonIndexEntry } from "./types";
import { hashSeed, seededShuffle } from "./prng";

// ---------------------------------------------------------------------------
// #44 — Shadowing Lab helpers
// ---------------------------------------------------------------------------

export interface ShadowingPhrase {
  id: string;
  target: string;
  english: string;
  sourceLabel: string;
}

export const STARTER_SHADOWING_PHRASES: Record<string, ShadowingPhrase[]> = {
  de: [
    {
      id: "starter-de-1",
      target: "Guten Morgen, ich hätte gern einen Kaffee.",
      english: "Good morning, I would like a coffee.",
      sourceLabel: "Starter · Café",
    },
    {
      id: "starter-de-2",
      target: "Ich lerne Deutsch und verstehe schon viel.",
      english: "I am learning German and already understand a lot.",
      sourceLabel: "Starter · Introductions",
    },
    {
      id: "starter-de-3",
      target: "Entschuldigung, wo ist der Bahnhof?",
      english: "Excuse me, where is the train station?",
      sourceLabel: "Starter · Directions",
    },
    {
      id: "starter-de-4",
      target: "Ich kann morgen früh kommen.",
      english: "I can come early tomorrow.",
      sourceLabel: "Starter · Modals",
    },
    {
      id: "starter-de-5",
      target: "Ein Glas Wasser und warmes Brot, bitte.",
      english: "A glass of water and warm bread, please.",
      sourceLabel: "Starter · Food",
    },
    {
      id: "starter-de-6",
      target: "Die Rechnung, bitte. Vielen Dank!",
      english: "The bill, please. Thank you very much!",
      sourceLabel: "Starter · Café",
    },
  ],
  fr: [
    {
      id: "starter-fr-1",
      target: "Bonjour, je voudrais un café s'il vous plaît.",
      english: "Hello, I would like a coffee please.",
      sourceLabel: "Starter · Café",
    },
    {
      id: "starter-fr-2",
      target: "Où est la gare, s'il vous plaît ?",
      english: "Where is the train station, please?",
      sourceLabel: "Starter · Travel",
    },
    {
      id: "starter-fr-3",
      target: "J'ai une réservation pour ce soir.",
      english: "I have a reservation for this evening.",
      sourceLabel: "Starter · Plans",
    },
  ],
  es: [
    {
      id: "starter-es-1",
      target: "Buenos días, quiero un café por favor.",
      english: "Good morning, I want a coffee please.",
      sourceLabel: "Starter · Café",
    },
    {
      id: "starter-es-2",
      target: "Perdón, ¿dónde está la estación?",
      english: "Excuse me, where is the station?",
      sourceLabel: "Starter · Travel",
    },
    {
      id: "starter-es-3",
      target: "Tengo una reservación para hoy.",
      english: "I have a reservation for today.",
      sourceLabel: "Starter · Plans",
    },
  ],
  nl: [
    {
      id: "starter-nl-1",
      target: "Goedemorgen, ik wil graag een kop koffie.",
      english: "Good morning, I would like a cup of coffee.",
      sourceLabel: "Starter · Café",
    },
    {
      id: "starter-nl-2",
      target: "Waar is het station, alstublieft?",
      english: "Where is the station, please?",
      sourceLabel: "Starter · Travel",
    },
    {
      id: "starter-nl-3",
      target: "Ik leer Nederlands met mijn boek.",
      english: "I am learning Dutch with my book.",
      sourceLabel: "Starter · Study",
    },
  ],
};

/**
 * Build a list of shadowing phrases from the learner's completed lessons,
 * falling back to curated starter phrases when none are completed yet.
 */
export function buildShadowingPhrases(
  lessonIndex: readonly LessonIndexEntry[],
  completedLessons: readonly number[],
  languageId = "de"
): ShadowingPhrase[] {
  const completedSet = new Set(completedLessons);
  const fromCompleted: ShadowingPhrase[] = [];

  for (const lesson of lessonIndex) {
    if (!completedSet.has(lesson.id)) continue;
    const example = lesson.summary?.use_example;
    if (!example?.german?.trim()) continue;
    fromCompleted.push({
      id: `lesson-${lesson.id}`,
      target: example.german.trim(),
      english: example.english.trim(),
      sourceLabel: `Lesson ${lesson.id} · ${lesson.title}`,
    });
  }

  if (fromCompleted.length > 0) return fromCompleted;
  return STARTER_SHADOWING_PHRASES[languageId] ?? STARTER_SHADOWING_PHRASES.de;
}

export interface ShadowingOverlapResult {
  overlapPercent: number;
  matchedWords: string[];
  missedWords: string[];
  tier: "great" | "good" | "keep-going";
  encouragement: string;
}

function normalizeSingleToken(word: string): string {
  return word
    .normalize("NFC")
    .toLocaleLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]/gu, "");
}

function extractTokenPairs(text: string): Array<{ display: string; norm: string }> {
  const rawWords = text
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}'’\-\s]/gu, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^['’-]+|['’-]+$/g, ""))
    .filter(Boolean);

  const pairs: Array<{ display: string; norm: string }> = [];
  for (const display of rawWords) {
    const norm = normalizeSingleToken(display);
    if (norm) pairs.push({ display, norm });
  }
  return pairs;
}

function normalizeForOverlap(text: string): string[] {
  return extractTokenPairs(text).map((p) => p.norm);
}

/**
 * Lenient word-overlap feedback for shadowing practice.
 * Always encouraging — never harsh red grading.
 */
export function scoreShadowingAttempt(
  transcript: string,
  target: string
): ShadowingOverlapResult {
  const targetPairs = extractTokenPairs(target);
  const heardTokens = normalizeForOverlap(transcript);

  if (targetPairs.length === 0) {
    return {
      overlapPercent: 0,
      matchedWords: [],
      missedWords: [],
      tier: "keep-going",
      encouragement: "Listen once more and give it another relaxed try.",
    };
  }

  const heardBag = new Map<string, number>();
  for (const token of heardTokens) {
    heardBag.set(token, (heardBag.get(token) ?? 0) + 1);
  }

  const matchedWords: string[] = [];
  const missedWords: string[] = [];

  for (const { display, norm: expected } of targetPairs) {
    const exactCount = heardBag.get(expected) ?? 0;
    if (exactCount > 0) {
      matchedWords.push(display);
      heardBag.set(expected, exactCount - 1);
      continue;
    }
    // Lenient prefix/near match (e.g., 1-char ASR slip on 4+ letter words)
    let nearKey: string | null = null;
    for (const [heard, count] of heardBag.entries()) {
      if (count <= 0) continue;
      if (
        expected.length >= 4 &&
        heard.length >= 4 &&
        (heard.startsWith(expected.slice(0, 3)) || expected.startsWith(heard.slice(0, 3))) &&
        Math.abs(heard.length - expected.length) <= 2
      ) {
        nearKey = heard;
        break;
      }
    }
    if (nearKey) {
      matchedWords.push(display);
      heardBag.set(nearKey, (heardBag.get(nearKey) ?? 1) - 1);
    } else {
      missedWords.push(display);
    }
  }

  const overlapPercent = Math.round((matchedWords.length / targetPairs.length) * 100);

  if (overlapPercent >= 80) {
    return {
      overlapPercent,
      matchedWords,
      missedWords,
      tier: "great",
      encouragement: "Smooth rhythm! Nearly every word came through clearly.",
    };
  }
  if (overlapPercent >= 50) {
    return {
      overlapPercent,
      matchedWords,
      missedWords,
      tier: "good",
      encouragement: "Solid flow — try shadowing once more for the remaining words.",
    };
  }
  return {
    overlapPercent,
    matchedWords,
    missedWords,
    tier: "keep-going",
    encouragement: "Good warmup! Play the audio again and echo it in small chunks.",
  };
}

// ---------------------------------------------------------------------------
// #45 — Situational Dialogues data & turn evaluator
// ---------------------------------------------------------------------------

export interface DialogueOption {
  text: string;
  english: string;
  isBest: boolean;
  feedback: string;
}

export interface DialogueTurn {
  id: string;
  speaker: "npc" | "learner";
  speakerName: string;
  text: string;
  english: string;
  /** Learner cue shown before picking/typing a reply. */
  prompt?: string;
  options?: DialogueOption[];
  acceptedVariants?: string[];
}

export interface SituationalDialogue {
  id: string;
  title: string;
  setting: string;
  level: string;
  summary: string;
  turns: DialogueTurn[];
}

export const SITUATIONAL_DIALOGUES: SituationalDialogue[] = [
  {
    id: "cafe",
    title: "Im Café",
    setting: "Café",
    level: "A1",
    summary: "Order a coffee and cake, ask for water, and settle the bill politely.",
    turns: [
      {
        id: "cafe-1",
        speaker: "npc",
        speakerName: "Kellnerin",
        text: "Guten Tag! Was möchten Sie trinken?",
        english: "Good day! What would you like to drink?",
      },
      {
        id: "cafe-2",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Order a coffee, please.",
        text: "Ich möchte einen Kaffee, bitte.",
        english: "I would like a coffee, please.",
        acceptedVariants: [
          "Einen Kaffee, bitte.",
          "Ich hätte gern einen Kaffee, bitte.",
          "Ich hätte gerne einen Kaffee.",
        ],
        options: [
          {
            text: "Ich möchte einen Kaffee, bitte.",
            english: "I would like a coffee, please.",
            isBest: true,
            feedback: "Natural and polite — 'einen Kaffee' uses the accusative case cleanly.",
          },
          {
            text: "Ich habe einen Bahnhof, bitte.",
            english: "I have a train station, please.",
            isBest: false,
            feedback: "Close structure, but 'Bahnhof' means train station rather than a drink.",
          },
          {
            text: "Guten Abend, auf Wiedersehen.",
            english: "Good evening, goodbye.",
            isBest: false,
            feedback: "That says goodbye before ordering! Try asking for a coffee.",
          },
        ],
      },
      {
        id: "cafe-3",
        speaker: "npc",
        speakerName: "Kellnerin",
        text: "Sehr gern. Möchten Sie auch etwas essen?",
        english: "Gladly. Would you also like something to eat?",
      },
      {
        id: "cafe-4",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Yes, a piece of cake and a glass of water, please.",
        text: "Ja, ein Stück Kuchen und ein Glas Wasser, bitte.",
        english: "Yes, a piece of cake and a glass of water, please.",
        acceptedVariants: [
          "Ja, Kuchen und ein Glas Wasser, bitte.",
          "Ein Stück Kuchen und Wasser, bitte.",
        ],
        options: [
          {
            text: "Ja, ein Stück Kuchen und ein Glas Wasser, bitte.",
            english: "Yes, a piece of cake and a glass of water, please.",
            isBest: true,
            feedback: "Great order! 'ein Glas Wasser' needs no 'of' in German.",
          },
          {
            text: "Nein, ich suche das Buch.",
            english: "No, I am looking for the book.",
            isBest: false,
            feedback: "That talks about looking for a book instead of ordering food.",
          },
          {
            text: "Wo ist mein Bruder?",
            english: "Where is my brother?",
            isBest: false,
            feedback: "Try responding to the food offer with cake and water.",
          },
        ],
      },
      {
        id: "cafe-5",
        speaker: "npc",
        speakerName: "Kellnerin",
        text: "Hier bitte! Lassen Sie es sich schmecken.",
        english: "Here you go! Enjoy your meal.",
      },
      {
        id: "cafe-6",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Thank her and ask for the bill later.",
        text: "Vielen Dank! Die Rechnung, bitte.",
        english: "Thank you very much! The bill, please.",
        acceptedVariants: [
          "Danke! Die Rechnung, bitte.",
          "Ich möchte zahlen, bitte.",
          "Zahlen, bitte.",
        ],
        options: [
          {
            text: "Vielen Dank! Die Rechnung, bitte.",
            english: "Thank you very much! The bill, please.",
            isBest: true,
            feedback: "Classic German café phrasing — 'die Rechnung' (-ung = feminine!).",
          },
          {
            text: "Vielen Dank! Der Zug, bitte.",
            english: "Thank you! The train, please.",
            isBest: false,
            feedback: "'der Zug' is the train — for the bill, ask for 'die Rechnung'.",
          },
          {
            text: "Ich bin müde, bitte.",
            english: "I am tired, please.",
            isBest: false,
            feedback: "To pay, ask for 'die Rechnung, bitte'.",
          },
        ],
      },
      {
        id: "cafe-7",
        speaker: "npc",
        speakerName: "Kellnerin",
        text: "Das macht zusammen sieben Euro fünfzig. Vielen Dank und einen schönen Tag!",
        english: "That comes to seven euros fifty altogether. Thank you and have a lovely day!",
      },
    ],
  },
  {
    id: "train-station",
    title: "Am Bahnhof",
    setting: "Train Station",
    level: "A1–A2",
    summary: "Buy a ticket to Berlin, check the platform, and confirm the departure time.",
    turns: [
      {
        id: "train-1",
        speaker: "npc",
        speakerName: "Mitarbeiter",
        text: "Guten Tag! Wohin möchten Sie fahren?",
        english: "Good day! Where would you like to travel?",
      },
      {
        id: "train-2",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Ask for a ticket to Berlin, please.",
        text: "Eine Fahrkarte nach Berlin, bitte.",
        english: "A ticket to Berlin, please.",
        acceptedVariants: [
          "Ich möchte nach Berlin fahren.",
          "Ein Ticket nach Berlin, bitte.",
        ],
        options: [
          {
            text: "Eine Fahrkarte nach Berlin, bitte.",
            english: "A ticket to Berlin, please.",
            isBest: true,
            feedback: "Spot on — 'nach' is the standard preposition for cities and countries.",
          },
          {
            text: "Ich trinke Kaffee in Berlin.",
            english: "I drink coffee in Berlin.",
            isBest: false,
            feedback: "Ask for a ticket ('eine Fahrkarte') or say you want to travel to Berlin.",
          },
          {
            text: "Das Brot ist sehr gut.",
            english: "The bread is very good.",
            isBest: false,
            feedback: "We're at the ticket counter! Try asking for a ticket to Berlin.",
          },
        ],
      },
      {
        id: "train-3",
        speaker: "npc",
        speakerName: "Mitarbeiter",
        text: "Einfach oder hin und zurück?",
        english: "One-way or round trip?",
      },
      {
        id: "train-4",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Say one-way, please, and ask which platform the train leaves from.",
        text: "Einfach, bitte. Von welchem Gleis fährt der Zug ab?",
        english: "One-way, please. From which platform does the train depart?",
        acceptedVariants: [
          "Einfach, bitte. Welches Gleis?",
          "Einfach, bitte. Wo fährt der Zug ab?",
        ],
        options: [
          {
            text: "Einfach, bitte. Von welchem Gleis fährt der Zug ab?",
            english: "One-way, please. From which platform does the train depart?",
            isBest: true,
            feedback: "Notice the separable verb 'abfahren' splitting with 'ab' at the end!",
          },
          {
            text: "Zwei Äpfel, bitte.",
            english: "Two apples, please.",
            isBest: false,
            feedback: "Answer 'einfach' (one-way) and ask about the platform ('Gleis').",
          },
          {
            text: "Ich habe keine Zeit.",
            english: "I have no time.",
            isBest: false,
            feedback: "Answer whether you want 'einfach' or 'hin und zurück'.",
          },
        ],
      },
      {
        id: "train-5",
        speaker: "npc",
        speakerName: "Mitarbeiter",
        text: "Der Zug fährt von Gleis vier ab, um zwölf Uhr fünfzehn.",
        english: "The train departs from platform four at 12:15.",
      },
      {
        id: "train-6",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Confirm platform four and thank him.",
        text: "Gleis vier um zwölf Uhr fünfzehn. Vielen Dank!",
        english: "Platform four at 12:15. Thank you very much!",
        acceptedVariants: [
          "Danke schön! Gleis vier.",
          "Vielen Dank!",
        ],
        options: [
          {
            text: "Gleis vier um zwölf Uhr fünfzehn. Vielen Dank!",
            english: "Platform four at 12:15. Thank you very much!",
            isBest: true,
            feedback: "Repeating back key travel details is a great real-world habit.",
          },
          {
            text: "Gleis neun, guten Morgen.",
            english: "Platform nine, good morning.",
            isBest: false,
            feedback: "Careful — the clerk said 'Gleis vier' (platform 4)!",
          },
          {
            text: "Das Wetter ist kalt.",
            english: "The weather is cold.",
            isBest: false,
            feedback: "Try confirming platform four and thanking the clerk.",
          },
        ],
      },
      {
        id: "train-7",
        speaker: "npc",
        speakerName: "Mitarbeiter",
        text: "Gute Reise!",
        english: "Have a good trip!",
      },
    ],
  },
  {
    id: "introductions",
    title: "Kennenlernen",
    setting: "Introductions",
    level: "A1",
    summary: "Meet someone new, share your name, where you are from, and why you learn German.",
    turns: [
      {
        id: "intro-1",
        speaker: "npc",
        speakerName: "Lena",
        text: "Hallo! Ich bin Lena. Wie heißt du?",
        english: "Hello! I am Lena. What is your name?",
      },
      {
        id: "intro-2",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Greet Lena and say your name (e.g., Alex), nice to meet you.",
        text: "Hallo Lena! Ich heiße Alex. Freut mich!",
        english: "Hello Lena! My name is Alex. Nice to meet you!",
        acceptedVariants: [
          "Hallo, ich bin Alex. Freut mich!",
          "Hi Lena, ich heiße Alex.",
        ],
        options: [
          {
            text: "Hallo Lena! Ich heiße Alex. Freut mich!",
            english: "Hello Lena! My name is Alex. Nice to meet you!",
            isBest: true,
            feedback: "Warm and natural! 'Freut mich' is the everyday way to say nice to meet you.",
          },
          {
            text: "Die Rechnung, bitte.",
            english: "The bill, please.",
            isBest: false,
            feedback: "That's for a café — here Lena just asked for your name.",
          },
          {
            text: "Ich wohne nicht hier, tschüss.",
            english: "I don't live here, bye.",
            isBest: false,
            feedback: "Introduce yourself with 'Ich heiße …' or 'Ich bin …'.",
          },
        ],
      },
      {
        id: "intro-3",
        speaker: "npc",
        speakerName: "Lena",
        text: "Freut mich auch! Woher kommst du, und sprichst du schon lange Deutsch?",
        english: "Nice to meet you too! Where are you from, and have you spoken German for long?",
      },
      {
        id: "intro-4",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Say you come from London and are learning German now.",
        text: "Ich komme aus London und lerne gerade Deutsch.",
        english: "I come from London and am learning German right now.",
        acceptedVariants: [
          "Ich komme aus London und ich lerne Deutsch.",
          "Ich bin aus London und lerne Deutsch.",
        ],
        options: [
          {
            text: "Ich komme aus London und lerne gerade Deutsch.",
            english: "I come from London and am learning German right now.",
            isBest: true,
            feedback: "Great use of 'aus' for origin and 'gerade' for right now.",
          },
          {
            text: "Ich komme mit dem Buch.",
            english: "I come with the book.",
            isBest: false,
            feedback: "Use 'Ich komme aus …' to say where you are from.",
          },
          {
            text: "Gestern habe ich geschlafen.",
            english: "Yesterday I slept.",
            isBest: false,
            feedback: "Answer Lena's question about where you come from and learning German.",
          },
        ],
      },
      {
        id: "intro-5",
        speaker: "npc",
        speakerName: "Lena",
        text: "Super! Dein Deutsch klingt schon richtig gut. Was machst du heute noch?",
        english: "Awesome! Your German already sounds really good. What else are you doing today?",
      },
      {
        id: "intro-6",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Say you want to walk through the park and drink coffee.",
        text: "Ich will durch den Park gehen und Kaffee trinken.",
        english: "I want to walk through the park and drink coffee.",
        acceptedVariants: [
          "Ich möchte durch den Park gehen und Kaffee trinken.",
          "Ich gehe in den Park und trinke Kaffee.",
        ],
        options: [
          {
            text: "Ich will durch den Park gehen und Kaffee trinken.",
            english: "I want to walk through the park and drink coffee.",
            isBest: true,
            feedback: "Clean modal bracket: 'will … gehen' and 'trinken' parked at the end!",
          },
          {
            text: "Mein Hund heißt Park.",
            english: "My dog is named Park.",
            isBest: false,
            feedback: "Tell Lena what you plan to do today.",
          },
          {
            text: "Das kostet zwölf Euro.",
            english: "It is twelve euros.",
            isBest: false,
            feedback: "Share a simple plan for today using a modal or present-tense verb.",
          },
        ],
      },
    ],
  },
  {
    id: "shopping",
    title: "Im Laden",
    setting: "Shopping",
    level: "A1–A2",
    summary: "Browse a shop, ask the price of a jacket, and pay by card.",
    turns: [
      {
        id: "shop-1",
        speaker: "npc",
        speakerName: "Verkäufer",
        text: "Hallo! Kann ich Ihnen helfen?",
        english: "Hello! Can I help you?",
      },
      {
        id: "shop-2",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Say yes, please — you are looking for a warm jacket.",
        text: "Ja, bitte. Ich suche eine warme Jacke.",
        english: "Yes, please. I am looking for a warm jacket.",
        acceptedVariants: [
          "Ja, ich suche eine Jacke.",
          "Ich suche eine warme Jacke, bitte.",
        ],
        options: [
          {
            text: "Ja, bitte. Ich suche eine warme Jacke.",
            english: "Yes, please. I am looking for a warm jacket.",
            isBest: true,
            feedback: "Clear and natural! 'suchen' already means 'to look for' — no preposition needed.",
          },
          {
            text: "Ja, ich trinke eine Jacke.",
            english: "Yes, I drink a jacket.",
            isBest: false,
            feedback: "Use 'suchen' (to look for) instead of 'trinken'!",
          },
          {
            text: "Der Zug hat Verspätung.",
            english: "The train is delayed.",
            isBest: false,
            feedback: "Tell the clerk what item you are looking for in the shop.",
          },
        ],
      },
      {
        id: "shop-3",
        speaker: "npc",
        speakerName: "Verkäufer",
        text: "Diese Jacke hier ist sehr beliebt. Sie passt bestimmt gut!",
        english: "This jacket here is very popular. It will surely fit well!",
      },
      {
        id: "shop-4",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Ask how much the jacket costs.",
        text: "Sie gefällt mir! Wie viel kostet die Jacke?",
        english: "I like it! How much does the jacket cost?",
        acceptedVariants: [
          "Wie viel kostet die Jacke?",
          "Was kostet die Jacke?",
          "Was kostet sie?",
        ],
        options: [
          {
            text: "Sie gefällt mir! Wie viel kostet die Jacke?",
            english: "I like it! How much does the jacket cost?",
            isBest: true,
            feedback: "Awesome dative idiom 'Sie gefällt mir' + 'Wie viel kostet …?'",
          },
          {
            text: "Wie spät ist die Jacke?",
            english: "What time is the jacket?",
            isBest: false,
            feedback: "'Wie spät' asks the time — use 'Wie viel kostet …?' for the price.",
          },
          {
            text: "Woher kommt die Jacke?",
            english: "Where is the jacket from?",
            isBest: false,
            feedback: "Try asking the price with 'Wie viel kostet die Jacke?'",
          },
        ],
      },
      {
        id: "shop-5",
        speaker: "npc",
        speakerName: "Verkäufer",
        text: "Sie kostet neunundfünfzig Euro.",
        english: "It costs fifty-nine euros.",
      },
      {
        id: "shop-6",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Say you'll take it and ask if you can pay by card.",
        text: "Ich nehme sie. Kann ich mit Karte zahlen?",
        english: "I'll take it. Can I pay by card?",
        acceptedVariants: [
          "Ich nehme die Jacke. Kann ich mit Karte zahlen?",
          "Kann ich mit Karte bezahlen?",
        ],
        options: [
          {
            text: "Ich nehme sie. Kann ich mit Karte zahlen?",
            english: "I'll take it. Can I pay by card?",
            isBest: true,
            feedback: "Spot-on shopping phrase! 'mit Karte zahlen' works everywhere in Germany.",
          },
          {
            text: "Ich vergesse sie. Kann ich schlafen?",
            english: "I forget it. Can I sleep?",
            isBest: false,
            feedback: "Use 'Ich nehme sie' (I'll take it) and ask 'Kann ich mit Karte zahlen?'",
          },
          {
            text: "Nein, danke, ich bin schon satt.",
            english: "No thanks, I am already full.",
            isBest: false,
            feedback: "'satt' is for food — here you want to buy the jacket and pay by card.",
          },
        ],
      },
      {
        id: "shop-7",
        speaker: "npc",
        speakerName: "Verkäufer",
        text: "Natürlich, gern! Bitte hier auflegen.",
        english: "Of course, gladly! Please tap here.",
      },
    ],
  },
  {
    id: "directions",
    title: "Nach dem Weg fragen",
    setting: "Asking Directions",
    level: "A1–A2",
    summary: "Ask a passerby how to reach the museum and confirm left, right, and walking time.",
    turns: [
      {
        id: "dir-1",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Politely ask where the museum is.",
        text: "Entschuldigung, wo ist das Museum?",
        english: "Excuse me, where is the museum?",
        acceptedVariants: [
          "Entschuldigung, wie komme ich zum Museum?",
          "Wo ist bitte das Museum?",
        ],
        options: [
          {
            text: "Entschuldigung, wo ist das Museum?",
            english: "Excuse me, where is the museum?",
            isBest: true,
            feedback: "Polite opener! 'Entschuldigung' (-ung = feminine) immediately gets friendly help.",
          },
          {
            text: "Entschuldigung, wer ist das Museum?",
            english: "Excuse me, who is the museum?",
            isBest: false,
            feedback: "Classic trap: 'wer' means 'who', whereas 'wo' means 'where'!",
          },
          {
            text: "Das Museum schmeckt gut.",
            english: "The museum tastes good.",
            isBest: false,
            feedback: "Ask for directions with 'wo ist das Museum?'",
          },
        ],
      },
      {
        id: "dir-2",
        speaker: "npc",
        speakerName: "Passantin",
        text: "Gehen Sie hier geradeaus und dann an der nächsten Kreuzung links.",
        english: "Go straight ahead here and then left at the next intersection.",
      },
      {
        id: "dir-3",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Ask if it is far on foot.",
        text: "Ist es weit zu Fuß?",
        english: "Is it far on foot?",
        acceptedVariants: [
          "Ist das weit zu Fuß?",
          "Wie weit ist es zu Fuß?",
        ],
        options: [
          {
            text: "Ist es weit zu Fuß?",
            english: "Is it far on foot?",
            isBest: true,
            feedback: "Concise verb-first yes/no question — no English 'do' needed!",
          },
          {
            text: "Ist es laut am Tisch?",
            english: "Is it loud at the table?",
            isBest: false,
            feedback: "Ask about walking distance with 'weit zu Fuß'.",
          },
          {
            text: "Ich habe zwei Hände.",
            english: "I have two hands.",
            isBest: false,
            feedback: "Try asking 'Ist es weit zu Fuß?'",
          },
        ],
      },
      {
        id: "dir-4",
        speaker: "npc",
        speakerName: "Passantin",
        text: "Nein, nur fünf Minuten. Das Museum ist direkt neben dem Park.",
        english: "No, only five minutes. The museum is right next to the park.",
      },
      {
        id: "dir-5",
        speaker: "learner",
        speakerName: "Du",
        prompt: "Confirm straight ahead, then left, and thank her warmly.",
        text: "Geradeaus und dann links, neben dem Park. Vielen Dank!",
        english: "Straight ahead and then left, next to the park. Thank you very much!",
        acceptedVariants: [
          "Vielen Dank für Ihre Hilfe!",
          "Danke schön, geradeaus und dann links!",
        ],
        options: [
          {
            text: "Geradeaus und dann links, neben dem Park. Vielen Dank!",
            english: "Straight ahead and then left, next to the park. Thank you very much!",
            isBest: true,
            feedback: "Great confirmation — you even echoed the dative 'neben dem Park'!",
          },
          {
            text: "Rechts und dann nach Hause.",
            english: "Right and then home.",
            isBest: false,
            feedback: "She said 'geradeaus und dann links' (straight ahead, then left).",
          },
          {
            text: "Ich möchte ein Glas Milch.",
            english: "I would like a glass of milk.",
            isBest: false,
            feedback: "Confirm the directions and thank her.",
          },
        ],
      },
      {
        id: "dir-6",
        speaker: "npc",
        speakerName: "Passantin",
        text: "Gern geschehen! Viel Spaß im Museum!",
        english: "You're welcome! Have fun at the museum!",
      },
    ],
  },
];

export interface DialogueTypedCheck {
  accepted: boolean;
  overlapPercent: number;
  feedback: string;
}

const DIALOGUE_NEGATION_WORDS = new Set([
  "nicht",
  "kein",
  "keine",
  "keinen",
  "keinem",
  "keiner",
  "keines",
  "nein",
  "nie",
  "niemals",
]);

const DIALOGUE_CRITICAL_WORDS = new Set([
  "wer",
  "wo",
  "was",
  "wann",
  "wie",
  "warum",
  "woher",
  "wohin",
  "eins",
  "zwei",
  "drei",
  "vier",
  "funf",
  "sechs",
  "sieben",
  "acht",
  "neun",
  "zehn",
  "elf",
  "zwolf",
  "funfzehn",
  "funfzig",
]);

/** Deterministically shuffle a dialogue turn's pick options keyed by turn.id. */
export function getShuffledDialogueOptions(turn: DialogueTurn): DialogueOption[] {
  const opts = turn.options ?? [];
  if (opts.length <= 1) return opts;
  return seededShuffle(opts, hashSeed(turn.id));
}

function scoreDialogueCandidate(inputTokens: string[], targetTokens: string[]): number {
  if (inputTokens.length === 0 || targetTokens.length === 0) return 0;

  const targetSet = new Set(targetTokens);
  // Reject extra negation or meaning-flipping question/number words absent from the target.
  for (const token of inputTokens) {
    if (
      (DIALOGUE_NEGATION_WORDS.has(token) || DIALOGUE_CRITICAL_WORDS.has(token)) &&
      !targetSet.has(token)
    ) {
      return 0;
    }
  }

  const inputBag = new Map<string, number>();
  for (const token of inputTokens) {
    inputBag.set(token, (inputBag.get(token) ?? 0) + 1);
  }

  let matched = 0;
  for (const expected of targetTokens) {
    const count = inputBag.get(expected) ?? 0;
    if (count > 0) {
      matched += 1;
      inputBag.set(expected, count - 1);
    }
  }

  const recall = matched / targetTokens.length;
  const precision = matched / inputTokens.length;
  return Math.round(Math.min(recall, precision) * 100);
}

/** Check typed learner turns in Situational Dialogues with both recall and precision. */
export function evaluateDialogueTypedTurn(
  input: string,
  turn: DialogueTurn
): DialogueTypedCheck {
  const inputTokens = normalizeForOverlap(input);
  const candidates = [turn.text, ...(turn.acceptedVariants ?? [])];
  let bestScore = 0;

  for (const candidate of candidates) {
    const targetTokens = normalizeForOverlap(candidate);
    const score = scoreDialogueCandidate(inputTokens, targetTokens);
    if (score > bestScore) {
      bestScore = score;
    }
  }

  if (bestScore >= 70) {
    return {
      accepted: true,
      overlapPercent: bestScore,
      feedback:
        bestScore === 100
          ? "Natural phrasing — spot on!"
          : `Well understood! Model reply: "${turn.text}"`,
    };
  }

  return {
    accepted: false,
    overlapPercent: bestScore,
    feedback: `Almost there — try including key words from: "${turn.text}"`,
  };
}
