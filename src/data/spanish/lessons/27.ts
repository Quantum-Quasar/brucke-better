import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 27,
  "slug": "silent-h-and-palatal-shifts",
  "title": "The Silent H & Palatal Shifts",
  "subtitle": "Historical sound shifts: f- → h- (hacer, hijo, hierro, hambre, hermoso), -ct- → -ch- (noche, leche, ocho, hecho), pl-/cl- → ll- (llave, lluvia, lleno, llamar)",
  "phase": 5,
  "shift_categories": [
    "f_to_h",
    "ct_to_ch",
    "pl_cl_fl_to_ll"
  ],
  "word_ids": [
    "hacer",
    "hijo",
    "hierro",
    "hambre",
    "hermoso",
    "noche",
    "leche",
    "ocho",
    "hecho",
    "llave",
    "lluvia",
    "lleno"
  ],
  "table_word_ids": [
    "hacer",
    "hijo",
    "hierro",
    "hambre",
    "hermoso",
    "noche",
    "leche",
    "ocho",
    "hecho",
    "llave",
    "lluvia",
    "lleno"
  ],
  "hook": {
    "title": "Three Sound Shifts That Unlock Deep Spanish Etymology",
    "content": "Why do so many core Spanish words start with a silent H (hacer, hijo, hierro, hambre, hermoso), or contain -ch- (noche, leche, ocho, hecho), or begin with ll- (llamar, llave, lluvia, lleno)? Because as Latin evolved in northern Castile, three regular sound shifts transformed Latin consonants while English kept the original Latin letters! Once you see these three shifts, words that looked completely unrelated suddenly reveal their English twins!"
  },
  "pattern": {
    "title": "The Three Master Equations: F→H, CT→CH, and PL/CL→LL",
    "content": "1) **Latin initial F- → Spanish silent H-**: facere → **hacer** (fact/manufacture), fīlius → **hijo** (filial), ferrum → **hierro** (ferrous/iron), faminem → **hambre** (famine), formōsus → **hermoso** (Formosa)!\n2) **Latin medial -CT- → Spanish -CH-**: noctem → **noche** (nocturnal), lactem → **leche** (lactose), octō → **ocho** (octave), factum → **hecho** (fact — both shifts at once!)!\n3) **Latin initial PL-/CL- → Spanish LL-**: clāmāre → **llamar** (claim/clamor), clāvis → **llave** (clavicle/clef), pluvia → **lluvia** (pluvial), plēnus → **lleno** (plenty/plenary)!",
    "linguist_note": "Castilian arose near the Basque-speaking Cantabrian mountains, where the substrate lacked labiodental /f/ and substituted bilabial/aspirated [h], which later fell silent.",
    "trap_note": "Wait: why did words like formal, familia, and fantástico keep their F in Spanish? Because learned words re-borrowed from Latin by scholars in the Renaissance kept their F, whereas words spoken uninterruptedly on the street changed F- to H-!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to do/make (Latin facere: f- → h-)",
          "german": "hacer"
        },
        {
          "id": "p2",
          "english": "son (Latin fīlius: filial, f- → h-)",
          "german": "el hijo"
        },
        {
          "id": "p3",
          "english": "iron (Latin ferrum: ferrous, f- → h-)",
          "german": "el hierro"
        },
        {
          "id": "p4",
          "english": "done / fact (Latin factum: f→h AND ct→ch!)",
          "german": "el hecho"
        },
        {
          "id": "p5",
          "english": "key (Latin clāvis: clavicle, cl- → ll-)",
          "german": "la llave"
        },
        {
          "id": "p6",
          "english": "full (Latin plēnus: plenty, pl- → ll-)",
          "german": "lleno"
        }
      ],
      "target_answer": "hacer, el hijo, el hierro, el hecho, la llave, lleno",
      "meaning": "to do/make (Latin facere: f- → h-), son (Latin fīlius: filial, f- → h-), iron (Latin ferrum: ferrous, f- → h-), done / fact (Latin factum: f→h AND ct→ch!), key (Latin clāvis: clavicle, cl- → ll-), full (Latin plēnus: plenty, pl- → ll-)",
      "explanation": "F- → H-, -CT- → -CH-, and PL-/CL- → LL- decode the oldest layer of Spanish vocabulary.",
      "id": "es27_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish el hierro ('iron', from Latin ferrum via f- → h- and e → ie) shares its root with which English chemistry adjective for iron-containing metals (and why Iron on the periodic table is Fe)?",
      "target_answer": "ferrous",
      "meaning": "Fe (ferrum / ferrous) turned f- into silent h- and split stressed e into ie: hierro!",
      "explanation": "Latin ferrum gave chemical symbol Fe, English ferrous, and Spanish hierro.",
      "id": "es27_e2"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish lleno ('full', from Latin plēnus via pl- → ll-) shares its root with which everyday English word meaning 'an abundant, full amount'?",
      "target_answer": "plenty",
      "meaning": "plenty and replenish come from Latin plēnus — which became Spanish lleno!",
      "explanation": "Latin plēnus ('full') gave English plenty, plenary, replenish and Spanish lleno.",
      "id": "es27_e3"
    },
    {
      "type": "shift_select",
      "prompt": "Which single Spanish word demonstrates BOTH the 'f- → silent h-' shift AND the '-ct- → -ch-' shift from Latin 'factum'?",
      "options": [
        "hecho ('done / fact')",
        "hijo ('son')",
        "leche ('milk')"
      ],
      "target_answer": "hecho ('done / fact')",
      "meaning": "done / made; the fact",
      "explanation": "Latin factum: initial f- → silent h-, and medial -ct- → -ch- = hecho!",
      "id": "es27_e4"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The restaurant is full tonight'",
      "target_answer": "El restaurante está lleno esta noche",
      "meaning": "The restaurant is full tonight",
      "word_bank": [
        "lleno",
        "llena",
        "esta",
        "es",
        "este",
        "El",
        "restaurante",
        "está",
        "noche"
      ],
      "explanation": "El restaurante está lleno ('is full' — current state takes está!) + esta noche ('tonight').",
      "id": "es27_e5"
    }
  ],
  "summary": {
    "outcome": "Decode Spanish h-, -ch-, and ll- vocabulary from their Latin f-, -ct-, and pl-/cl- cognates in English.",
    "use_example": {
      "german": "Tengo la llave de hierro y el restaurante está lleno esta noche.",
      "english": "I have the iron key and the restaurant is full tonight."
    },
    "takeaway": "When you see initial silent h-, think f-; when you see -ch-, think -ct-; when you see ll-, think pl-/cl-!",
    "curiosity_teaser": "Up next ([2701] The Silent H Decoded): trace hacer, hijo, hierro, hambre, and hermoso back to their F- twins."
  },
  "twist": {
    "prompt": "Assemble: 'He is my son'",
    "target_answer": "Es mi hijo",
    "word_bank": [
      "mi",
      "hijo",
      "Está",
      "Es",
      "hierro",
      "hambre"
    ],
    "explanation": "Es mi hijo (Latin fīlius → hijo)."
  },
  "foreshadow": {
    "line": "Next in Topic 28: the connective tissue of fluent Spanish (que, quien, lo que) and the Latin verb-dynasty matrices (poner, tener, traer, mostrar)!",
    "resolvedIn": 28
  },
  "payoff": {
    "ofLesson": 26,
    "text": "Welcome to Phase 5! All nine conversion and sound-shift families in the Spanish Compendium are now unlocked."
  }
};

export default lesson;
