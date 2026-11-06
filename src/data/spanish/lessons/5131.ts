import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5131,
  "slug": "estacion-tren-billete",
  "title": "La Estación, El Tren & El Billete",
  "subtitle": "Navigating la estación, el tren, el billete, and departure times",
  "phase": 2,
  "shift_categories": [
    "cion"
  ],
  "word_ids": [
    "estación",
    "tren",
    "billete",
    "ocho",
    "nueve",
    "diez",
    "para",
    "comprar",
    "tener",
    "dónde"
  ],
  "table_word_ids": [
    "estación",
    "tren",
    "billete",
    "ocho",
    "nueve",
    "diez",
    "para",
    "comprar",
    "tener",
    "dónde"
  ],
  "hook": {
    "title": "Why 'La Estación' Means Both 'Train Station' and 'Season'",
    "content": "Look at **la estación** (from Latin *stātiō*, cousin of *estar* 'to stand'): a train **station** is where the train stands still, and a **season of the year** (spring, summer, autumn, winter) is where the sun stands in its annual cycle! Alongside **el tren** ('the train') and **el billete** ('the ticket' in Spain; also called *el boleto* in Latin America), you can navigate any rail journey."
  },
  "pattern": {
    "title": "The Train FOR Madrid: El Tren Para Madrid",
    "content": "Remember our forward arrow **para** from Topic 13: a train or bus heading toward a destination city is **el tren para Madrid** ('the train for/to Madrid')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the train station",
          "german": "la estación de tren"
        },
        {
          "id": "p2",
          "english": "the train for Madrid (destination arrow)",
          "german": "el tren para Madrid"
        },
        {
          "id": "p3",
          "english": "the train ticket",
          "german": "el billete de tren"
        },
        {
          "id": "p4",
          "english": "at eight o'clock",
          "german": "a las ocho"
        },
        {
          "id": "p5",
          "english": "at nine in the morning",
          "german": "a las nueve de la mañana"
        }
      ],
      "target_answer": "la estación de tren, el tren para Madrid, el billete de tren, a las ocho, a las nueve de la mañana",
      "meaning": "the train station, the train for Madrid (destination arrow), the train ticket, at eight o'clock, at nine in the morning",
      "explanation": "de links noun compounds (la estación de tren, el billete de tren); para marks the train's destination.",
      "id": "es5131_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I want to buy a train ticket for Madrid'?",
      "options": [
        "*Quiero comprar un tren billete por Madrid",
        "Quiero comprar un billete de tren para Madrid",
        "*Quiero comprar una billete de tren"
      ],
      "target_answer": "Quiero comprar un billete de tren para Madrid",
      "meaning": "I want to buy a train ticket for Madrid",
      "explanation": "un billete de tren ('a ticket of train') + para Madrid ('for Madrid' — destination).",
      "id": "es5131_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Where is the train station?'",
      "target_answer": "Dónde está la estación de tren",
      "meaning": "Where is the train station?",
      "word_bank": [
        "la",
        "tren",
        "es",
        "está",
        "el",
        "de",
        "Dónde",
        "estación",
        "por"
      ],
      "explanation": "¿Dónde está la estación de tren?",
      "id": "es5131_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you have your ticket for the train at eight",
      "cues": [
        "I have my ticket → Tengo mi billete",
        "for the train → para el tren",
        "at eight → a las ocho"
      ],
      "idea_parts": [
        "I have my ticket → Tengo mi billete",
        "for the train at eight → para el tren a las ocho"
      ],
      "target_answer": "Tengo mi billete para el tren a las ocho",
      "meaning": "I have my ticket for the train at eight",
      "word_bank": [
        "tu",
        "ocho",
        "el",
        "son",
        "mi",
        "para",
        "tren",
        "Tengo",
        "las",
        "billete",
        "a",
        "por"
      ],
      "explanation": "Tengo mi billete para el tren a las ocho.",
      "id": "es5131_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tengo el billete de tren para mañana",
      "replays": 2,
      "target_answer": "Tengo el billete de tren para mañana",
      "meaning": "I have the train ticket for tomorrow",
      "cues": [
        "I have: Tengo",
        "the train ticket: el billete de tren",
        "for tomorrow: para mañana"
      ],
      "explanation": "Tengo el billete de tren para mañana.",
      "affirmation": "Train station and ticket Spanish mastered!",
      "id": "es5131_e5"
    }
  ],
  "summary": {
    "outcome": "Navigate train stations and tickets using la estación de tren, el billete de tren, and para + destination.",
    "use_example": {
      "german": "¿Dónde está la estación de tren? Tengo un billete para Madrid.",
      "english": "Where is the train station? I have a ticket for Madrid."
    },
    "takeaway": "Noun +noun compounds in Spanish link with de: el billete de tren ('the train ticket'), la estación de tren ('the train station').",
    "curiosity_teaser": "Up next ([5132] Ida y Vuelta, Salida & Llegada): buy one-way and round-trip tickets and read station boards!"
  },
  "twist": {
    "prompt": "Assemble: 'I have my train ticket'",
    "target_answer": "Tengo mi billete de tren",
    "word_bank": [
      "mi",
      "mis",
      "billete",
      "la",
      "Tengo",
      "tren",
      "de",
      "por"
    ],
    "explanation": "Tengo mi billete de tren."
  }
};

export default lesson;
