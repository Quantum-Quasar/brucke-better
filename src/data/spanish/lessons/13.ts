import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 13,
  "slug": "por-vs-para",
  "title": "por vs para",
  "subtitle": "Cause/exchange (por) vs goal/destination (para) — resolving the classic struggle",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "para",
    "por",
    "regalo",
    "invitación",
    "gracias",
    "mañana",
    "aquí",
    "comprender",
    "mi"
  ],
  "table_word_ids": [
    "para",
    "por",
    "regalo",
    "invitación",
    "gracias",
    "mañana",
    "aquí",
    "comprender",
    "mi"
  ],
  "hook": {
    "title": "Why English 'For' Hides Two Opposite Directions",
    "content": "In English, 'for' points both forward toward a goal ('This gift is FOR you', 'I'm leaving FOR Madrid') and backward toward a cause or exchange ('Thanks FOR the invitation', 'I paid ten euros FOR the book'). Spanish separates those two mental pictures cleanly into para and por!"
  },
  "pattern": {
    "title": "Para Is the Forward Arrow; Por Is the Cause, Scale & Path",
    "content": "• **para** = the Forward Arrow →: recipient (un regalo para ti 'a gift for you'), destination (el tren para Madrid 'the train for Madrid'), deadline (para mañana 'for/by tomorrow'), and goal before an infinitive (para comprender 'in order to understand').\n• **por** = the Cause, Scale & Path ⚖️: motive/cause (gracias por la invitación 'thanks because of the invitation', por favor), exchange/price on a scale (por diez euros), time of day (por la mañana), and path through space (por aquí 'this way / around here')!",
    "linguist_note": "Spanish por continues Latin prō + per; para fused Old Spanish por + a ('for-to' → forward direction).",
    "trap_note": "After prepositions (para, por, de, a, sin), 'yo' becomes mí (with an accent: para mí 'for me') and 'tú' becomes ti (without an accent: para ti 'for you')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "for (recipient, destination, deadline, 'in order to')",
          "german": "para"
        },
        {
          "id": "p2",
          "english": "for (because of, in exchange for, through)",
          "german": "por"
        },
        {
          "id": "p3",
          "english": "a gift for you",
          "german": "un regalo para ti"
        },
        {
          "id": "p4",
          "english": "thanks for (because of) the invitation",
          "german": "gracias por la invitación"
        },
        {
          "id": "p5",
          "english": "in order to understand",
          "german": "para comprender"
        },
        {
          "id": "p6",
          "english": "around here / this way",
          "german": "por aquí"
        }
      ],
      "target_answer": "para, por, un regalo para ti, gracias por la invitación, para comprender, por aquí",
      "meaning": "for (recipient, destination, deadline, 'in order to'), for (because of, in exchange for, through), a gift for you, thanks for (because of) the invitation, in order to understand, around here / this way",
      "explanation": "para points forward to the target/goal; por looks back at the cause, price, or path.",
      "id": "es13_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You bought a present to give to your mother (she is the recipient). Which preposition do you use?",
      "options": [
        "Es un regalo por mi madre",
        "Es un regalo para mi madre",
        "Es un regalo a mi madre"
      ],
      "target_answer": "Es un regalo para mi madre",
      "meaning": "It is a gift for my mother",
      "explanation": "The recipient at the end of the forward arrow always takes para.",
      "id": "es13_e2"
    },
    {
      "type": "shift_select",
      "prompt": "You are thanking someone BECAUSE OF their invitation. Which preposition follows gracias?",
      "options": [
        "Gracias para la invitación",
        "Gracias de la invitación",
        "Gracias por la invitación"
      ],
      "target_answer": "Gracias por la invitación",
      "meaning": "Thanks for the invitation",
      "explanation": "The invitation is the cause/motive of your gratitude (or what you give thanks in exchange for), so it always takes por: Gracias por...",
      "id": "es13_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'It is a gift for tomorrow'",
      "target_answer": "Es un regalo para mañana",
      "meaning": "It is a gift for tomorrow",
      "word_bank": [
        "regalo",
        "Es",
        "por",
        "un",
        "ayer",
        "mañana",
        "para",
        "una"
      ],
      "explanation": "Deadlines and target dates point forward with para: para mañana.",
      "id": "es13_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'Thank you for the coffee'",
      "cues": [
        "Thank you → Gracias",
        "for (cause/exchange) → por",
        "the coffee → el café"
      ],
      "idea_parts": [
        "Thanks → Gracias",
        "for → por",
        "the coffee → el café"
      ],
      "target_answer": "Gracias por el café",
      "meaning": "Thank you for the coffee",
      "word_bank": [
        "regalo",
        "café",
        "la",
        "el",
        "Gracias",
        "para",
        "por"
      ],
      "explanation": "Gracias por el café — gracias ALWAYS takes por!",
      "diagnosis": {
        "slip": "used para after Gracias",
        "cue": "Gratitude looks back at the cause/reason, so gracias is always followed by por."
      },
      "id": "es13_e5"
    }
  ],
  "summary": {
    "outcome": "Distinguish para (recipient, destination, deadline, 'in order to') from por (cause, exchange, path, time of day).",
    "use_example": {
      "german": "Gracias por el regalo — es para mi madre.",
      "english": "Thanks for the gift — it is for my mother."
    },
    "takeaway": "para = forward arrow toward recipient, destination, deadline, or goal; por = cause, exchange, or path through.",
    "curiosity_teaser": "Up next ([1301] para: The Arrow): practice all four forward-arrow uses of para."
  },
  "twist": {
    "prompt": "Assemble: 'It is for you (informal: para ti)'",
    "target_answer": "Es para ti",
    "word_bank": [
      "tú",
      "Es",
      "ti",
      "por",
      "para",
      "Está"
    ],
    "explanation": "After a preposition like para or por, tú becomes ti: para ti!"
  },
  "foreshadow": {
    "line": "Next in Topic 14: why Spanish possessives (mi/mis, su/sus) agree with the thing owned rather than the owner.",
    "resolvedIn": 14
  },
  "payoff": {
    "ofLesson": 12,
    "text": "Because para came from por + a, it shares the exact same forward-pointing arrow feel as ir a from Topic 12!"
  }
};

export default lesson;
