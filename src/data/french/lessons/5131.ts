import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5131,
  "slug": "lesson-5131",
  "title": "Le Train, Le Billet & La Gare",
  "subtitle": "Navigating the SNCF: le train, le billet, la gare, réservations, and platforms.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "train",
    "billet",
    "gare",
    "réservation",
    "prendre",
    "attendre",
    "heure",
    "quand"
  ],
  "table_word_ids": [
    "train",
    "billet",
    "gare",
    "réservation",
    "prendre",
    "attendre",
    "heure",
    "quand"
  ],
  "hook": {
    "title": "At the Train Station: Le Train, Le Billet & La Gare",
    "content": "Just as you 'take' a coffee with prendre (Je prends un café), you ALSO 'take' the train, bus, or metro with prendre: Je prends le train à la gare ('I take the train at the station')! And your ticket is le billet (/bijɛ/).",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why French has both 'le billet' (train/plane ticket) and 'le ticket' (metro/bus slip)",
        "content": "For a reserved journey on a train or plane (or a €20 banknote!), French says un billet.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "prendre le train + avoir son billet + attendre à la gare",
    "content": "Combine station vocabulary with your verb engines.",
    "linguist_note": "Transport expressions in French use transitive prendre ('take') + definite article (prendre le train).",
    "trap_note": "Remember: j'attends le train ('I am waiting for the train') needs NO preposition 'for'!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each station word or phrase with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "la gare",
          "german": "the train station"
        },
        {
          "id": "p2",
          "english": "le train",
          "german": "the train"
        },
        {
          "id": "p3",
          "english": "le billet (de train)",
          "german": "the (train) ticket"
        },
        {
          "id": "p4",
          "english": "prendre le train",
          "german": "to take the train"
        },
        {
          "id": "p5",
          "english": "attendre le train",
          "german": "to wait for the train"
        }
      ],
      "target_answer": "the train station, the train, the (train) ticket, to take the train, to wait for the train",
      "meaning": "la gare, le train, le billet (de train), prendre le train, attendre le train",
      "explanation": "prendre le train and attendre le train both take direct objects.",
      "id": "fr5131_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I am taking the train at eight o'clock'?",
      "options": [
        "J'ai le train à huit heures",
        "Je prends le train à huit heures",
        "Je prends du train à huit heures"
      ],
      "target_answer": "Je prends le train à huit heures",
      "meaning": "I take the train at eight o'clock",
      "explanation": "Modes of transport with prendre use the definite article: Je prends le train.",
      "id": "fr5131_e2"
    },
    {
      "type": "derive",
      "prompt": "Write 'my train ticket' using 'mon billet' + 'de train':",
      "english_hint": "no article after de for type of ticket",
      "target_answer": "mon billet de train",
      "meaning": "my train ticket",
      "explanation": "un billet de train = 'a train ticket'.",
      "id": "fr5131_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I have my ticket and I am waiting for the train at the station",
      "cues": [
        "I have my ticket → J'ai mon billet",
        "and I wait-for the train at the station → et j'attends le train à la gare"
      ],
      "idea_parts": [
        "possession → J'ai mon billet",
        "waiting + location → et j'attends le train à la gare"
      ],
      "target_answer": "J'ai mon billet et j'attends le train à la gare",
      "meaning": "I have my ticket and I'm waiting for the train at the station",
      "word_bank": [
        "mon",
        "la",
        "un",
        "le",
        "J'ai",
        "gare",
        "et",
        "billet",
        "pour",
        "à",
        "j'attends",
        "train"
      ],
      "explanation": "j'attends le train needs no 'pour'.",
      "diagnosis": {
        "slip": "added pour after j'attends",
        "cue": "attendre already means 'to wait for': j'attends le train."
      },
      "id": "fr5131_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "À quelle heure est-ce que tu prends le train",
      "replays": 2,
      "target_answer": "À quelle heure est-ce que tu prends le train",
      "meaning": "At what time are you taking the train?",
      "cues": [
        "À quelle heure",
        "est-ce que tu prends le train"
      ],
      "explanation": "À quelle heure = 'At what time'.",
      "affirmation": "You wrote À quelle heure and tu prends le train cleanly.",
      "id": "fr5131_e5"
    }
  ],
  "summary": {
    "outcome": "Navigate train stations using la gare, le train, le billet, prendre le train, and attendre le train.",
    "use_example": {
      "german": "Je vais à la gare parce que je prends le train de midi.",
      "english": "I'm going to the station because I'm taking the noon train."
    },
    "takeaway": "You 'take' both coffee and trains with prendre: Je prends un café, je prends le train.",
    "curiosity_teaser": "Up next on Le Pont ([5132] Départ, Arrivée & Aller-Retour): see how Le Train, Le Billet & La Gare leads directly into Départ, Arrivée & Aller-Retour."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I have my ticket and I'm waiting for the train at the station\" in French:",
    "target_answer": "J'ai mon billet et j'attends le train à la gare",
    "word_bank": [
      "J'ai",
      "pas",
      "ne",
      "le",
      "mon",
      "train",
      "à",
      "gare",
      "j'attends",
      "la",
      "billet",
      "et"
    ],
    "explanation": "Re-constructing \"J'ai mon billet et j'attends le train à la gare\" from the underlying rule cements the pattern of Le Train, Le Billet & La Gare."
  }
};

export default lesson;
