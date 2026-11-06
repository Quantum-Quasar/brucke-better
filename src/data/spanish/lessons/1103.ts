import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1103,
  "slug": "diminutives-augmentatives-ito-illo-on",
  "title": "Diminutives & Augmentatives: -ito, -illo & -ón",
  "subtitle": "From poquito and cafecito (-ito) to word-builders bocadillo ('sandwich' < bocado), pesadilla ('nightmare' < pesado), and limón (< lima)",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "poquito",
    "bocadillo",
    "pesadilla",
    "limón",
    "un_poco",
    "agua",
    "queso",
    "café"
  ],
  "table_word_ids": [
    "poquito",
    "bocadillo",
    "pesadilla",
    "limón",
    "un_poco",
    "agua",
    "queso",
    "café"
  ],
  "hook": {
    "title": "Suffixes That Show Affection — and Invent New Words!",
    "content": "As highlighted in *The Thinking Method*, Spanish suffixes like -ito/-ita, -illo/-illa, and -ón/-ona do two remarkable things. First, -ito/-ita adds warmth, affection, or softness to everyday speech: un poco ('a little') becomes un poquito ('just a tiny bit'), un momento becomes un momentito ('just a quick second'), and un café becomes un cafecito! Second, -illo/-illa and -ón actually forged brand-new everyday nouns out of simpler roots!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'Limón' Has an Augmentative '-ón'",
        "content": "When citrus fruits arrived in Moorish Spain, the smaller green fruit kept the Arabic name lima ('lime'), and speakers added the 'big' suffix -ón to name the larger yellow citrus: el limón ('the big lime')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Decoding Bocadillo, Pesadilla, and Limón",
    "content": "Look at the etymological magic:\n• la boca ('mouth') → el bocado ('mouthful / bite') + -illo ('little') = el bocadillo ('little mouthful' → a Spanish baguette sandwich)!\n• pesado ('heavy', cousin of peso) + -illa = la pesadilla ('the heavy little thing sitting on your chest in sleep' → a nightmare)!\n• la lima ('lime') + augmentative -ón ('big') = el limón ('the big lime' → a lemon)!",
    "trap_note": "Why is poquito spelled with 'qu'? Because in Spanish, 'c' before 'i' would sound like /θ/ or /s/, so c changes to qu to protect the hard /k/ sound of poco!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "a tiny bit (poco + -ito)",
          "german": "un poquito"
        },
        {
          "id": "p2",
          "english": "a sandwich ('little mouthful': bocado + -illo)",
          "german": "el bocadillo"
        },
        {
          "id": "p3",
          "english": "a nightmare ('little heavy thing': pesado + -illa)",
          "german": "la pesadilla"
        },
        {
          "id": "p4",
          "english": "a lemon ('big lime': lima + -ón)",
          "german": "el limón"
        },
        {
          "id": "p5",
          "english": "cheese",
          "german": "el queso"
        }
      ],
      "target_answer": "un poquito, el bocadillo, la pesadilla, el limón, el queso",
      "meaning": "a tiny bit (poco + -ito), a sandwich ('little mouthful': bocado + -illo), a nightmare ('little heavy thing': pesado + -illa), a lemon ('big lime': lima + -ón), cheese",
      "explanation": "-ito adds warmth; -illo/-illa and -ón created everyday vocabulary.",
      "id": "es1103_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build the Spanish noun for 'sandwich / snack' from 'bocado' ('mouthful', dropping -o) plus the diminutive suffix:",
      "tile_options": [
        "bocad",
        "ito",
        "ón",
        "illo"
      ],
      "target_answer": "bocadillo",
      "meaning": "el bocadillo (the sandwich)",
      "explanation": "bocad(o) + illo = bocadillo ('little mouthful').",
      "id": "es1103_e2"
    },
    {
      "type": "shift_select",
      "prompt": "What literal image hides inside 'la pesadilla' ('the nightmare')?",
      "options": [
        "pescado ('fish') + -illa",
        "paso ('step') + -illa",
        "pesado ('heavy') + -illa ('a heavy little weight pressing on the sleeper')"
      ],
      "target_answer": "pesado ('heavy') + -illa ('a heavy little weight pressing on the sleeper')",
      "meaning": "the nightmare",
      "explanation": "Folklore pictured a nightmare as a heavy weight (pesado) sitting on your chest while you sleep!",
      "id": "es1103_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want a cheese sandwich'",
      "target_answer": "Quiero un bocadillo de queso",
      "meaning": "I want a cheese sandwich",
      "word_bank": [
        "Quiero",
        "una",
        "un",
        "queso",
        "pesadilla",
        "bocadillo",
        "limón",
        "de"
      ],
      "explanation": "Quiero un bocadillo de queso — de links the sandwich to its filling.",
      "id": "es1103_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask politely for 'a little bit of water, please' using poquito",
      "cues": [
        "A tiny bit → Un poquito",
        "of water → de agua",
        "please → por favor"
      ],
      "idea_parts": [
        "a little bit → Un poquito",
        "of water → de agua",
        "please → por favor"
      ],
      "target_answer": "Un poquito de agua por favor",
      "meaning": "A little bit of water, please",
      "word_bank": [
        "Un",
        "por",
        "poquito",
        "favor",
        "mucho",
        "de",
        "agua",
        "bocadillo",
        "la"
      ],
      "explanation": "Un poquito de agua, por favor — poquito sounds warm and polite across the whole Spanish-speaking world.",
      "id": "es1103_e5"
    }
  ],
  "summary": {
    "outcome": "Use affectionate -ito (poquito) and decode lexicalized -illo/-ón nouns (bocadillo, pesadilla, limón).",
    "use_example": {
      "german": "Quiero un bocadillo de queso y un poquito de agua con limón.",
      "english": "I want a cheese sandwich and a little bit of water with lemon."
    },
    "takeaway": "Spanish diminutives (-ito, -illo) and augmentatives (-ón) express both social warmth and vivid word creation.",
    "curiosity_teaser": "Up next ([12] The Near Future: ir a): step into future plans with voy a + infinitive."
  },
  "twist": {
    "prompt": "Assemble: 'Water with lemon, please'",
    "target_answer": "Agua con limón por favor",
    "word_bank": [
      "pesadilla",
      "Agua",
      "con",
      "por",
      "sin",
      "queso",
      "favor",
      "limón"
    ],
    "explanation": "Agua con limón, por favor."
  }
};

export default lesson;
