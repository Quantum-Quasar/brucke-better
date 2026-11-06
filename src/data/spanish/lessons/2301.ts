import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2301,
  "slug": "the-personal-a",
  "title": "The Personal 'a'",
  "subtitle": "Placing 'a' before specific human direct objects: veo a María, conozco a tu hermano, invito a mi amigo",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "a",
    "ver",
    "conocer",
    "invitar",
    "visitar",
    "hermano",
    "amigo",
    "padre",
    "madre",
    "hotel"
  ],
  "table_word_ids": [
    "a",
    "ver",
    "conocer",
    "invitar",
    "visitar",
    "hermano",
    "amigo",
    "padre",
    "madre",
    "hotel"
  ],
  "hook": {
    "title": "Respecting People in Grammar",
    "content": "Think of the personal 'a' as a grammatical bow of respect Whenever a verb's direct action lands on a specific human being (ver 'to see', conocer 'to know', invitar 'to invite', visitar 'to visit', ayudar 'to help'), place **a** before the person! And remember: if the person is masculine singular with el (el profesor, el señor), **a + el** still contracts to **al**: Veo al señor ('I see the gentleman')!"
  },
  "pattern": {
    "title": "Thing vs Person Side by Side",
    "content": "• Thing/Place: Veo la casa, Visito Madrid, Conozco el hotel (zero 'a').\n• Person: Veo a mi madre, Visito a mis padres, Conozco al profesor (personal 'a')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I see the house (thing)",
          "german": "veo la casa"
        },
        {
          "id": "p2",
          "english": "I see my mother (person)",
          "german": "veo a mi madre"
        },
        {
          "id": "p3",
          "english": "I visit Madrid (city)",
          "german": "visito Madrid"
        },
        {
          "id": "p4",
          "english": "I visit my parents (people)",
          "german": "visito a mis padres"
        },
        {
          "id": "p5",
          "english": "I know the gentleman (a + el)",
          "german": "conozco al señor"
        }
      ],
      "target_answer": "veo la casa, veo a mi madre, visito Madrid, visito a mis padres, conozco al señor",
      "meaning": "I see the house (thing), I see my mother (person), I visit Madrid (city), I visit my parents (people), I know the gentleman (a + el)",
      "explanation": "Things and cities take zero 'a'; specific people take the personal 'a' (or al = a + el).",
      "id": "es2301_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I am going to visit my brother'?",
      "options": [
        "Voy a visitar a mi hermano",
        "*Voy a visitar mi hermano",
        "*Voy visitar a mi hermano"
      ],
      "target_answer": "Voy a visitar a mi hermano",
      "meaning": "I am going to visit my brother",
      "explanation": "The first 'a' belongs to voy a + infinitive; the second 'a' is the personal 'a' before mi hermano!",
      "id": "es2301_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I see my friends here'",
      "target_answer": "Veo a mis amigos aquí",
      "meaning": "I see my friends here",
      "word_bank": [
        "mis",
        "los",
        "aquí",
        "amigos",
        "el",
        "Veo",
        "a",
        "por"
      ],
      "explanation": "Veo + a (personal 'a') + mis amigos + aquí.",
      "id": "es2301_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you want to invite your mother",
      "cues": [
        "I want to invite → Quiero invitar",
        "personal 'a' + my mother → a mi madre"
      ],
      "idea_parts": [
        "I want to invite → Quiero invitar",
        "my mother (with personal 'a') → a mi madre"
      ],
      "target_answer": "Quiero invitar a mi madre",
      "meaning": "I want to invite my mother",
      "word_bank": [
        "mi",
        "para",
        "padre",
        "Quiero",
        "invitar",
        "a",
        "la",
        "madre"
      ],
      "explanation": "Quiero invitar a mi madre.",
      "id": "es2301_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Conozco a tu hermano",
      "replays": 2,
      "target_answer": "Conozco a tu hermano",
      "meaning": "I know your brother",
      "cues": [
        "I know (conocer): Conozco",
        "personal 'a': a",
        "your brother: tu hermano"
      ],
      "explanation": "Conozco a tu hermano.",
      "affirmation": "Personal 'a' with conocer locked in!",
      "id": "es2301_e5"
    }
  ],
  "summary": {
    "outcome": "Place the personal 'a' (and contraction al) before specific human direct objects.",
    "use_example": {
      "german": "Visito Madrid y voy a visitar a mis padres.",
      "english": "I visit Madrid and I am going to visit my parents."
    },
    "takeaway": "If the direct object is a specific person, put 'a' in front of them.",
    "curiosity_teaser": "Up next ([2302] Dative Pronoun Redundancy): see why Spanish loves doubling le/les with 'a + person'."
  },
  "twist": {
    "prompt": "Assemble: 'I see the gentleman (al señor)'",
    "target_answer": "Veo al señor",
    "word_bank": [
      "por",
      "Veo",
      "al",
      "el",
      "la",
      "señor"
    ],
    "explanation": "a + el señor contracts to al señor: Veo al señor."
  }
};

export default lesson;
