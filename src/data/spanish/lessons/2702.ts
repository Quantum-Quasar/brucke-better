import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2702,
  "slug": "palatal-twins-ch-and-ll",
  "title": "The Palatal Twins: -ch- & ll-",
  "subtitle": "noctem → noche, lactem → leche, factum → hecho (-ct- → -ch-) and clāvis → llave, plēnus → lleno (cl-/pl- → ll-)",
  "phase": 5,
  "shift_categories": [
    "ct_to_ch",
    "pl_cl_fl_to_ll"
  ],
  "word_ids": [
    "noche",
    "leche",
    "ocho",
    "hecho",
    "llave",
    "lluvia",
    "lleno",
    "llamar",
    "me_llamo",
    "café"
  ],
  "table_word_ids": [
    "noche",
    "leche",
    "ocho",
    "hecho",
    "llave",
    "lluvia",
    "lleno",
    "llamar",
    "me_llamo",
    "café"
  ],
  "hook": {
    "title": "Why '-ct-' Became '-ch-' and 'pl-/cl-' Became 'll-'",
    "content": "When Roman soldiers and settlers spoke rapid Latin in Iberia, consonant clusters softened toward the roof of the mouth (the palate):\n• Medial **-ct-** fused into **-ch-** (/tʃ/): noctem → noche, lactem → leche, octō → ocho, factum → hecho, directum → derecho ('right/straight').\n• Initial **pl-, cl-, fl-** fused into **ll-**: clāvis → llave ('key'), pluvia → lluvia ('rain'), plēnus → lleno ('full'), clāmāre → llamar ('to call'), flamma → llama ('flame')!"
  },
  "pattern": {
    "title": "Seeing the English Cognate in a Flash",
    "content": "Once you know -ch- = -ct- and ll- = pl-/cl-, leche instantly flashes 'lactose', noche flashes 'nocturnal', llave flashes 'clavicle/clef', and lluvia flashes 'pluvial'!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "night (nocturnal: -ct- → -ch-)",
          "german": "la noche"
        },
        {
          "id": "p2",
          "english": "milk (lactose: -ct- → -ch-)",
          "german": "la leche"
        },
        {
          "id": "p3",
          "english": "eight (octave: -ct- → -ch-)",
          "german": "ocho"
        },
        {
          "id": "p4",
          "english": "key (clavicle/clef: cl- → ll-)",
          "german": "la llave"
        },
        {
          "id": "p5",
          "english": "rain (pluvial: pl- → ll-)",
          "german": "la lluvia"
        },
        {
          "id": "p6",
          "english": "full (plenty/plenary: pl- → ll-)",
          "german": "lleno"
        }
      ],
      "target_answer": "la noche, la leche, ocho, la llave, la lluvia, lleno",
      "meaning": "night (nocturnal: -ct- → -ch-), milk (lactose: -ct- → -ch-), eight (octave: -ct- → -ch-), key (clavicle/clef: cl- → ll-), rain (pluvial: pl- → ll-), full (plenty/plenary: pl- → ll-)",
      "explanation": "-ct- → -ch- and pl-/cl- → ll- are two of Spanish's most reliable etymological bridges.",
      "id": "es2702_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish la leche ('milk', from Latin lactem via -ct- → -ch-) shares its root with which English word for the natural sugar found in milk?",
      "target_answer": "lactose",
      "meaning": "lactose (and lactic) keeps the Latin -ct- that became -ch- in leche!",
      "explanation": "Latin lac, lactis gave English lactose/lactic and Spanish leche.",
      "id": "es2702_e2"
    },
    {
      "type": "shift_select",
      "prompt": "What Latin initial cluster turned into Spanish 'll-' in 'la llave' ('key') and 'llamar' ('to call')?",
      "options": [
        "ct- (noctem → noche)",
        "f- (facere → hacer)",
        "cl- (clāvis → llave, clāmāre → llamar)"
      ],
      "target_answer": "cl- (clāvis → llave, clāmāre → llamar)",
      "meaning": "key / to call",
      "explanation": "Initial cl- and pl- palatalized into Spanish ll-.",
      "id": "es2702_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The hotel is full tonight'",
      "target_answer": "El hotel está lleno esta noche",
      "meaning": "The hotel is full tonight",
      "word_bank": [
        "El",
        "esta",
        "lluvia",
        "noche",
        "lleno",
        "hotel",
        "llena",
        "es",
        "está"
      ],
      "explanation": "El hotel está lleno esta noche.",
      "id": "es2702_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Quiero un café con leche esta noche",
      "replays": 2,
      "target_answer": "Quiero un café con leche esta noche",
      "meaning": "I want a coffee with milk tonight",
      "cues": [
        "I want: Quiero",
        "a coffee with milk: un café con leche",
        "tonight: esta noche"
      ],
      "explanation": "Quiero un café con leche esta noche — both leche and noche showcase -ct- → -ch-!",
      "affirmation": "Both -ch- words in one sentence!",
      "id": "es2702_e5"
    }
  ],
  "summary": {
    "outcome": "Recognize -ct- → -ch- and pl-/cl- → ll- shifts across core Spanish nouns, verbs, and adjectives.",
    "use_example": {
      "german": "Esta noche el hotel está lleno por la lluvia, pero tengo mi llave.",
      "english": "Tonight the hotel is full because of the rain, but I have my key."
    },
    "takeaway": "-ch- hides Latin -ct- (noche, leche, ocho, hecho); ll- hides Latin cl-/pl- (llave, lluvia, lleno, llamar).",
    "curiosity_teaser": "Up next ([28] que & quien: Connective Tissue): connect complex thoughts with que, quien, and lo que!"
  },
  "twist": {
    "prompt": "Assemble: 'I have the key and the milk'",
    "target_answer": "Tengo la llave y la leche",
    "word_bank": [
      "la",
      "leche",
      "el",
      "llave",
      "lluvia",
      "noche",
      "Tengo",
      "y",
      "la"
    ],
    "explanation": "Tengo la llave y la leche."
  }
};

export default lesson;
