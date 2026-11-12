import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5132,
  "slug": "lesson-5132",
  "title": "Départ, Arrivée & Aller-Retour",
  "subtitle": "Combining aller, partir, arriver, and prendre for real travel scenarios.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "aller",
    "arriver",
    "parti",
    "revenir",
    "train",
    "gare",
    "billet",
    "demain"
  ],
  "table_word_ids": [
    "aller",
    "arriver",
    "parti",
    "revenir",
    "train",
    "gare",
    "billet",
    "demain"
  ],
  "hook": {
    "title": "Departures, Arrivals & Round-Trip Tickets: Aller simple vs. Aller-retour",
    "content": "At the ticket counter, aller ('going', used as a noun) + simple ('single') = 'a one-way ticket' (un aller simple), and aller + retour ('going-return') = 'a round-trip / return ticket' (un aller-retour)! And ticket destinations take pour ('for'): un aller-retour pour Lyon!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How French turns the infinitive 'aller' into a masculine noun ('un aller')",
        "content": "French uses the infinitive aller as a masculine noun meaning 'the outbound journey': un aller simple, un aller-retour!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "un aller simple (One-Way) vs. un aller-retour (Round-Trip)",
    "content": "Combine ticket buying with departure and arrival times.",
    "linguist_note": "Nominalized infinitives (l'aller, le dîner, le déjeuner) are always masculine in French.",
    "trap_note": "When buying a ticket 'to Lyon', French uses pour ('for Lyon'): un billet pour Lyon!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each travel expression with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "un aller simple",
          "german": "a one-way / single ticket"
        },
        {
          "id": "p2",
          "english": "un aller-retour",
          "german": "a round-trip / return ticket"
        },
        {
          "id": "p3",
          "english": "un billet pour Lyon (pour = 'to' on tickets!)",
          "german": "a ticket to Lyon"
        },
        {
          "id": "p4",
          "english": "le départ / l'arrivée",
          "german": "the departure / the arrival"
        },
        {
          "id": "p5",
          "english": "Je reviens demain (revenir)",
          "german": "I am coming back tomorrow"
        }
      ],
      "target_answer": "a one-way / single ticket, a round-trip / return ticket, a ticket to Lyon, the departure / the arrival, I am coming back tomorrow",
      "meaning": "un aller simple, un aller-retour, un billet pour Lyon (pour = 'to' on tickets!), le départ / l'arrivée, Je reviens demain (revenir)",
      "explanation": "Ticket destinations take pour: un aller-retour pour Paris.",
      "id": "fr5132_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word meaning of 'un aller-retour pour Paris'?",
      "german": "un aller-retour pour Paris",
      "natural": "a round-trip ticket to Paris",
      "options": [
        "a round-trip ticket to Paris",
        "an all-return to Paris",
        "a go-return for Paris"
      ],
      "target_answer": "a go-return for Paris",
      "meaning": "Literal structure: a go-return for Paris",
      "explanation": "aller ('go') + retour ('return') + pour ('for') Paris.",
      "id": "fr5132_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you ask the ticket agent for 'a round-trip ticket to Lyon, please'?",
      "options": [
        "Je voudrais un aller-retour pour Lyon, s'il vous plaît",
        "Je veux aller retourner Lyon",
        "Je voudrais un aller simple à Lyon, s'il vous plaît"
      ],
      "target_answer": "Je voudrais un aller-retour pour Lyon, s'il vous plaît",
      "meaning": "I would like a round-trip ticket to Lyon, please",
      "explanation": "un aller-retour + pour + city.",
      "id": "fr5132_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "the train leaves this morning and I am coming back tomorrow (use Le train part ce matin)",
      "cues": [
        "The train leaves this morning → Le train part ce matin",
        "and I come back tomorrow → et je reviens demain"
      ],
      "idea_parts": [
        "departure → Le train part ce matin",
        "return → et je reviens demain"
      ],
      "target_answer": "Le train part ce matin et je reviens demain",
      "meaning": "The train leaves this morning and I'm coming back tomorrow",
      "word_bank": [
        "train",
        "Le",
        "je",
        "matin",
        "et",
        "ce",
        "la",
        "part",
        "demain",
        "reviens",
        "partir"
      ],
      "explanation": "part is the 3rd-person singular of partir; je reviens is from revenir.",
      "diagnosis": {
        "slip": "used infinitive partir",
        "cue": "Conjugate Le train part and je reviens."
      },
      "id": "fr5132_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "J'ai pris un aller-retour pour Marseille",
      "replays": 2,
      "target_answer": "J'ai pris un aller-retour pour Marseille",
      "meaning": "I got a round-trip ticket to Marseille",
      "cues": [
        "J'ai pris",
        "un aller-retour pour Marseille"
      ],
      "explanation": "J'ai pris + un aller-retour pour...",
      "affirmation": "You wrote un aller-retour with its hyphen cleanly.",
      "id": "fr5132_e5"
    }
  ],
  "summary": {
    "outcome": "Buy one-way (aller simple) and round-trip (aller-retour) tickets with pour + city, and state departure and return plans.",
    "use_example": {
      "german": "Un aller-retour pour Bordeaux, s'il vous plaît.",
      "english": "A round-trip ticket to Bordeaux, please."
    },
    "takeaway": "One-way = un aller simple; Round-trip = un aller-retour; Ticket destination = pour [City].",
    "curiosity_teaser": "Up next on Le Pont ([13] à, de, chez): see how Départ, Arrivée & Aller-Retour leads directly into à, de, chez."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"The train leaves this morning and I'm coming back tomorrow\" in French:",
    "target_answer": "Le train part ce matin et je reviens demain",
    "word_bank": [
      "demain",
      "et",
      "ne",
      "je",
      "Le",
      "train",
      "part",
      "reviens",
      "ce",
      "matin",
      "pas"
    ],
    "explanation": "Re-constructing \"Le train part ce matin et je reviens demain\" from the underlying rule cements the pattern of Départ, Arrivée & Aller-Retour."
  }
};

export default lesson;
