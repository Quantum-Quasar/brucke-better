import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5021,
  "slug": "pure-vowels-accent-mark",
  "title": "The Five Pure Vowels",
  "subtitle": "Never glide into diphthongs: clean vowel training and acute accent rules",
  "phase": 1,
  "shift_categories": [
    "ct_to_ch"
  ],
  "word_ids": [
    "pan",
    "vino",
    "agua",
    "noche",
    "leche",
    "ocho",
    "café",
    "con"
  ],
  "table_word_ids": [
    "pan",
    "vino",
    "agua",
    "noche",
    "leche",
    "ocho",
    "café",
    "con"
  ],
  "hook": {
    "title": "The Crystalline Five: a, e, i, o, u",
    "content": "In English, vowels constantly glide at the end: 'no' sounds like 'noh-oo' and 'day' sounds like 'deh-ee'. In Spanish, the five vowels **a, e, i, o, u** are crisp, pure, and short — your mouth never glides at the end of a vowel! Whether stressed or unstressed, every 'a' has the exact same open sound as in *casa*, and every 'o' is a clean, un-glided /o/ as in *ocho*!"
  },
  "pattern": {
    "title": "Latin -ct- → Spanish -ch- & Why Feminine 'Agua' Takes 'El'",
    "content": "Look at **la noche** ('night'), **la leche** ('milk'), and **ocho** ('eight'): all three come from Latin words with **-ct-** (*noctem, lactem, octō*)! And look at **el agua** ('the water'): *agua* is a feminine noun (*las aguas, el agua fría*), but in the singular it borrows **el** right in front of it so your mouth doesn't have to say two stressed A's in a row (*la agua*)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the bread (pantry / companion)",
          "german": "el pan"
        },
        {
          "id": "p2",
          "english": "the wine (vine / vintage)",
          "german": "el vino"
        },
        {
          "id": "p3",
          "english": "the water (feminine noun taking singular el!)",
          "german": "el agua"
        },
        {
          "id": "p4",
          "english": "the night (nocturnal: -ct- → -ch-)",
          "german": "la noche"
        },
        {
          "id": "p5",
          "english": "the milk (lactose: -ct- → -ch-)",
          "german": "la leche"
        },
        {
          "id": "p6",
          "english": "eight (octave: -ct- → -ch-)",
          "german": "ocho"
        }
      ],
      "target_answer": "el pan, el vino, el agua, la noche, la leche, ocho",
      "meaning": "the bread (pantry / companion), the wine (vine / vintage), the water (feminine noun taking singular el!), the night (nocturnal: -ct- → -ch-), the milk (lactose: -ct- → -ch-), eight (octave: -ct- → -ch-)",
      "explanation": "Pure vowels and the regular -ct- → -ch- shift.",
      "id": "es5021_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish el pan ('bread', from Latin pānis) hides inside which everyday English word for a close friend — literally 'a person with whom (com-) you share bread (pan)'?",
      "target_answer": "companion",
      "meaning": "a com-pan-ion is literally 'one you break bread (pan) with' (and a 'pantry' is where bread is kept)!",
      "explanation": "Late Latin compāniō ('bread-fellow', from com- 'with' + pānis 'bread') gave English companion and company.",
      "id": "es5021_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Why does Spanish say 'el agua' in the singular even though 'agua' is feminine?",
      "options": [
        "To avoid the vocal collision of 'la' before a noun starting with a stressed 'a-' (A-gua)",
        "Because agua ends in -a",
        "Because water is masculine in Spanish"
      ],
      "target_answer": "To avoid the vocal collision of 'la' before a noun starting with a stressed 'a-' (A-gua)",
      "meaning": "the water",
      "explanation": "Feminine nouns starting with stressed /a/ (agua, hambre, águila) take el in the singular while keeping feminine adjectives: el agua fría!",
      "id": "es5021_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Coffee with milk, please'",
      "target_answer": "Café con leche, por favor",
      "meaning": "Coffee with milk, please",
      "word_bank": [
        "con",
        "sin",
        "leche",
        "por",
        "favor",
        "el",
        "Café",
        "vino"
      ],
      "explanation": "Café con leche, por favor — the classic Spanish order.",
      "id": "es5021_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Quiero pan, vino y agua",
      "replays": 2,
      "target_answer": "Quiero pan, vino y agua",
      "meaning": "I want bread, wine, and water",
      "cues": [
        "I want: Quiero",
        "bread, wine: pan, vino",
        "and water: y agua"
      ],
      "explanation": "Quiero pan, vino y agua.",
      "affirmation": "Pure Spanish vowels mastered!",
      "id": "es5021_e5"
    }
  ],
  "summary": {
    "outcome": "Pronounce Spanish's five pure vowels cleanly, recognize -ct- → -ch-, and explain singular el agua.",
    "use_example": {
      "german": "Quiero café con leche y el agua, por favor.",
      "english": "I want coffee with milk and the water, please."
    },
    "takeaway": "Spanish vowels never glide — and feminine nouns starting with stressed /a/ borrow el in the singular (el agua).",
    "curiosity_teaser": "Up next ([5022] Minimal Pairs: Clean Vowels): put all five pure vowels to work inside real words!"
  },
  "twist": {
    "prompt": "Assemble: 'Good night'",
    "target_answer": "Buenas noches",
    "word_bank": [
      "Buenas",
      "Buenos",
      "leche",
      "noches",
      "vino"
    ],
    "explanation": "¡Buenas noches!"
  }
};

export default lesson;
