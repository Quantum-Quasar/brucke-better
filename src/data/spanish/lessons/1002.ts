import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1002,
  "slug": "hay-universal-existence",
  "title": "hay: The Universal Existence",
  "subtitle": "hay un problema, ¿hay café?, no hay nada — existence independent of number",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "hay",
    "problema",
    "café",
    "mesa",
    "restaurante",
    "nada",
    "nadie",
    "aquí"
  ],
  "table_word_ids": [
    "hay",
    "problema",
    "café",
    "mesa",
    "restaurante",
    "nada",
    "nadie",
    "aquí"
  ],
  "hook": {
    "title": "One Word for Singular and Plural",
    "content": "In English, you must choose between 'there is a table' and 'there are three tables'. In Spanish, hay never changes! Hay una mesa ('There is a table') and Hay tres mesas ('There are three tables') both use hay."
  },
  "pattern": {
    "title": "Greek -ma Nouns: Why It Is 'Un Problema'",
    "content": "Look at el problema ('the problem'). Even though it ends in -a, it came into Latin from Greek neuter nouns in -ma (el problema, el sistema, el programa, el tema, el clima), which are all MASCULINE in Spanish: hay un problema!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "there is / there are",
          "german": "hay"
        },
        {
          "id": "p2",
          "english": "a problem (masculine!)",
          "german": "un problema"
        },
        {
          "id": "p3",
          "english": "there isn't anything",
          "german": "no hay nada"
        },
        {
          "id": "p4",
          "english": "there is nobody",
          "german": "no hay nadie"
        },
        {
          "id": "p5",
          "english": "is there coffee?",
          "german": "¿hay café?"
        },
        {
          "id": "p6",
          "english": "here",
          "german": "aquí"
        }
      ],
      "target_answer": "hay, un problema, no hay nada, no hay nadie, ¿hay café?, aquí",
      "meaning": "there is / there are, a problem (masculine!), there isn't anything, there is nobody, is there coffee?, here",
      "explanation": "hay handles both singular and plural; el/un problema is masculine.",
      "id": "es1002_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Why do we say 'Hay UN problema' instead of *una problema?",
      "options": [
        "Greek nouns ending in -ma (problema, sistema, programa) are masculine in Spanish",
        "Because problema ends in a consonant",
        "Because hay forces masculine gender"
      ],
      "target_answer": "Greek nouns ending in -ma (problema, sistema, programa) are masculine in Spanish",
      "meaning": "There is a problem",
      "explanation": "Words of Greek origin ending in -ma take el / un: el problema, un problema.",
      "id": "es1002_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'There is a good restaurant here'",
      "target_answer": "Hay un restaurante bueno aquí",
      "meaning": "There is a good restaurant here",
      "word_bank": [
        "una",
        "Hay",
        "restaurante",
        "bueno",
        "aquí",
        "Está",
        "un",
        "allí"
      ],
      "explanation": "Hay ('There is') + un restaurante bueno + aquí.",
      "id": "es1002_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that there is nobody here",
      "cues": [
        "negation before hay → No hay",
        "nobody → nadie",
        "here → aquí"
      ],
      "idea_parts": [
        "there is not → No hay",
        "anybody/nobody → nadie",
        "here → aquí"
      ],
      "target_answer": "No hay nadie aquí",
      "meaning": "There is nobody here",
      "word_bank": [
        "hay",
        "aquí",
        "problema",
        "nadie",
        "está",
        "nada",
        "No"
      ],
      "explanation": "No hay nadie aquí — double negation with hay + nadie.",
      "id": "es1002_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Hay un problema aquí",
      "replays": 2,
      "target_answer": "Hay un problema aquí",
      "meaning": "There is a problem here",
      "cues": [
        "There is (silent h): Hay",
        "a problem (masculine): un problema",
        "here: aquí"
      ],
      "explanation": "Hay un problema aquí.",
      "affirmation": "You caught both silent-h hay and masculine un problema!",
      "id": "es1002_e5"
    }
  ],
  "summary": {
    "outcome": "Use hay for singular and plural existence and treat Greek -ma nouns like problema as masculine.",
    "use_example": {
      "german": "¿Hay café? — No, no hay nada aquí.",
      "english": "Is there coffee? — No, there is nothing here."
    },
    "takeaway": "Use estar for the location of a specific thing (El café está aquí) and hay for general existence (Hay café aquí).",
    "curiosity_teaser": "Up next ([1003] Boot Verbs: e→ie, o→ue & e→i Under Stress): see the stress rhythm that powers querer, poder, dormir, empezar, and pedir!"
  },
  "twist": {
    "prompt": "Assemble: 'There is nothing here'",
    "target_answer": "No hay nada aquí",
    "word_bank": [
      "está",
      "hay",
      "nada",
      "es",
      "No",
      "nadie",
      "aquí"
    ],
    "explanation": "No hay nada aquí."
  }
};

export default lesson;
