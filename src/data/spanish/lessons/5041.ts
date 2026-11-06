import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5041,
  "slug": "the-social-line-tu-usted",
  "title": "The Social Line",
  "subtitle": "Register decisions with tú, usted, and ustedes across Spain and Latin America",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "tú",
    "usted",
    "señor",
    "señora",
    "estás",
    "está",
    "son",
    "están",
    "querer",
    "desear"
  ],
  "table_word_ids": [
    "tú",
    "usted",
    "señor",
    "señora",
    "estás",
    "está",
    "son",
    "están",
    "querer",
    "desear"
  ],
  "hook": {
    "title": "Tú, Usted, and Plural Ustedes Across the Spanish-Speaking World",
    "content": "In singular address, both Spain and Latin America distinguish informal **tú** (friends, family, peers, children) from respectful **usted** (strangers, elders, formal titles like *señor / señora*). What about addressing a GROUP of people ('you all')? Across all of Latin America (and the Canary Islands and parts of Andalusia), speakers use **ustedes** (+ 3rd-person plural verb: *¿Cómo están ustedes?*, *¿Qué quieren ustedes?*) for BOTH friends and strangers! In central and northern Spain, speakers use informal *vosotros* with friends and *ustedes* in formal settings — meaning **ustedes** is understood and respected 100% everywhere in the Spanish-speaking world!"
  },
  "pattern": {
    "title": "One Rule for Both Usted and Ustedes: Use the 3rd-Person Verb!",
    "content": "• Singular **usted** uses the 'he/she' verb (está, es, quiere, tiene).\n• Plural **ustedes** uses the 'they' verb — simply add **-n** (están, son, quieren, tienen)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "how are you? (one friend: tú)",
          "german": "¿cómo estás?"
        },
        {
          "id": "p2",
          "english": "how are you? (one respected stranger: usted)",
          "german": "¿cómo está usted?"
        },
        {
          "id": "p3",
          "english": "how are you all? (group: ustedes)",
          "german": "¿cómo están ustedes?"
        },
        {
          "id": "p4",
          "english": "you all are (identity: ser)",
          "german": "ustedes son"
        },
        {
          "id": "p5",
          "english": "sir / madam",
          "german": "señor / señora"
        }
      ],
      "target_answer": "¿cómo estás?, ¿cómo está usted?, ¿cómo están ustedes?, ustedes son, señor / señora",
      "meaning": "how are you? (one friend: tú), how are you? (one respected stranger: usted), how are you all? (group: ustedes), you all are (identity: ser), sir / madam",
      "explanation": "usted takes 3rd-person singular; ustedes takes 3rd-person plural (+ -n).",
      "id": "es5041_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you ask a group of people 'Where are you all from?' using universal 'ustedes'?",
      "options": [
        "*¿De dónde es ustedes?",
        "*¿De dónde eres ustedes?",
        "¿De dónde son ustedes?"
      ],
      "target_answer": "¿De dónde son ustedes?",
      "meaning": "Where are you all from?",
      "explanation": "ustedes takes the 3rd-person plural verb son.",
      "id": "es5041_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'How are you all (ustedes)?'",
      "target_answer": "Cómo están ustedes",
      "meaning": "How are you all?",
      "word_bank": [
        "estás",
        "están",
        "está",
        "ustedes",
        "Cómo",
        "son"
      ],
      "explanation": "¿Cómo están ustedes?",
      "id": "es5041_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a gentleman politely: 'What do you wish, sir?'",
      "cues": [
        "What → ¿Qué",
        "wishes (usted form of desear) → desea",
        "sir → señor?"
      ],
      "idea_parts": [
        "What → Qué",
        "do you wish → desea",
        "sir → señor"
      ],
      "target_answer": "Qué desea señor",
      "meaning": "What would you like, sir?",
      "word_bank": [
        "señora",
        "desea",
        "señor",
        "deseas",
        "Qué",
        "tú"
      ],
      "explanation": "¿Qué desea, señor?",
      "id": "es5041_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Cómo está usted hoy señora",
      "replays": 2,
      "target_answer": "Cómo está usted hoy señora",
      "meaning": "How are you today, madam?",
      "cues": [
        "How are you (formal): Cómo está usted",
        "today: hoy",
        "madam: señora"
      ],
      "explanation": "¿Cómo está usted hoy, señora?",
      "affirmation": "tú, usted, and ustedes mastered!",
      "id": "es5041_e5"
    }
  ],
  "summary": {
    "outcome": "Navigate tú, usted, and plural ustedes across Spain and Latin America.",
    "use_example": {
      "german": "¿Cómo está usted, señor, y cómo están ustedes?",
      "english": "How are you, sir, and how are you all?"
    },
    "takeaway": "usted takes the 3rd-person singular verb; ustedes takes the 3rd-person plural verb (-n) across the entire Hispanic world.",
    "curiosity_teaser": "Next branch ([5051] Directions & Places): navigate city streets and plazas!"
  },
  "twist": {
    "prompt": "Assemble: 'Do you all (ustedes) have a reservation?'",
    "target_answer": "Tienen ustedes una reservación",
    "word_bank": [
      "Tienes",
      "reservación",
      "un",
      "Tiene",
      "una",
      "Tienen",
      "ustedes"
    ],
    "explanation": "¿Tienen ustedes una reservación?"
  }
};

export default lesson;
