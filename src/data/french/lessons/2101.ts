import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2101,
  "slug": "lesson-2101",
  "title": "The Twin Suppletions",
  "subtitle": "bon → meilleur (ameliorate) and mauvais → pire (pejorative): frozen Latin comparatives.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "meilleur",
    "pire",
    "bon",
    "plus",
    "moins",
    "que",
    "vin",
    "café",
    "gâteau"
  ],
  "table_word_ids": [
    "meilleur",
    "pire",
    "bon",
    "plus",
    "moins",
    "que",
    "vin",
    "café",
    "gâteau"
  ],
  "hook": {
    "title": "Why 'Good → Better' and 'Bon → Meilleur' Are Historical Twins",
    "content": "bon ('good') jumps to meilleur ('better', cousin of 'ameliorate'), and mauvais ('bad') jumps to pire ('worse', cousin of 'pejorative')! And putting le, la, or les in front of any comparative turns it into the superlative: le meilleur ('the best'), le plus grand ('the biggest')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Putting le / la / les in front makes the Superlative ('the best / the biggest')!",
        "content": "plus grand que = 'bigger than'; le plus grand = 'the biggest'. meilleur que = 'better than'; le meilleur / la meilleure = 'the best'!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Comparative + le/la/les in Front = Superlative ('the -est')",
    "content": "Use meilleur/pire for better/worse and prefix le/la/les for the best/worst.",
    "linguist_note": "Romance analytic superlatives are formed by prefixing the definite article to the comparative degree.",
    "trap_note": "Never say *le plus bon for 'the best' — 'better' is meilleur, and 'the best' is le meilleur / la meilleure!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each comparative or superlative form with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "meilleur que (never *plus bon)",
          "german": "better than"
        },
        {
          "id": "p2",
          "english": "le meilleur / la meilleure",
          "german": "the best"
        },
        {
          "id": "p3",
          "english": "pire que (pejorative)",
          "german": "worse than"
        },
        {
          "id": "p4",
          "english": "plus grand que",
          "german": "bigger than"
        },
        {
          "id": "p5",
          "english": "le plus grand / la plus grande",
          "german": "the biggest"
        }
      ],
      "target_answer": "better than, the best, worse than, bigger than, the biggest",
      "meaning": "meilleur que (never *plus bon), le meilleur / la meilleure, pire que (pejorative), plus grand que, le plus grand / la plus grande",
      "explanation": "Putting le/la/les in front of any comparative turns '-er' into 'the -est'!",
      "id": "fr2101_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'It is the best restaurant in the city'?",
      "options": [
        "C'est le plus bon restaurant dans la ville",
        "C'est meilleur restaurant de la ville",
        "C'est le meilleur restaurant de la ville"
      ],
      "target_answer": "C'est le meilleur restaurant de la ville",
      "meaning": "It is the best restaurant in the city",
      "explanation": "le meilleur = 'the best', and after a superlative French uses de ('of the city')!",
      "id": "fr2101_e2"
    },
    {
      "type": "derive",
      "prompt": "Turn 'meilleure' ('better', f.) into the feminine superlative 'the best':",
      "english_hint": "add la in front",
      "target_answer": "la meilleure",
      "meaning": "the best (feminine)",
      "explanation": "la + meilleure = la meilleure.",
      "id": "fr2101_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "this bakery has the best bread (use Cette boulangerie a le meilleur pain)",
      "cues": [
        "This bakery has → Cette boulangerie a",
        "the best bread → le meilleur pain"
      ],
      "idea_parts": [
        "subject + verb → Cette boulangerie a",
        "superlative object → le meilleur pain"
      ],
      "target_answer": "Cette boulangerie a le meilleur pain",
      "meaning": "This bakery has the best bread",
      "word_bank": [
        "plus",
        "pain",
        "boulangerie",
        "bon",
        "a",
        "le",
        "meilleur",
        "Cette"
      ],
      "explanation": "le meilleur pain = 'the best bread'.",
      "diagnosis": {
        "slip": "used plus bon",
        "cue": "Use le meilleur pain for 'the best bread'."
      },
      "id": "fr2101_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ce café est meilleur que l'autre",
      "replays": 2,
      "target_answer": "Ce café est meilleur que l'autre",
      "meaning": "This coffee is better than the other one",
      "cues": [
        "Ce café est meilleur",
        "que l'autre"
      ],
      "explanation": "meilleur que = 'better than'.",
      "affirmation": "You paired meilleur with que l'autre cleanly.",
      "id": "fr2101_e5"
    }
  ],
  "summary": {
    "outcome": "Use irregular comparatives meilleur ('better') and pire ('worse'), and form superlatives by adding le/la/les.",
    "use_example": {
      "german": "C'est la meilleure idée de la journée.",
      "english": "It's the best idea of the day."
    },
    "takeaway": "Add le/la/les to any comparative to make the superlative: meilleur → le meilleur ('the best').",
    "curiosity_teaser": "Up next on Le Pont ([2102] Comparison Gym): see how The Twin Suppletions leads directly into Comparison Gym."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"This bakery has the best bread\" in French:",
    "target_answer": "Cette boulangerie a le meilleur pain",
    "word_bank": [
      "pas",
      "a",
      "meilleur",
      "ne",
      "le",
      "pain",
      "Cette",
      "boulangerie"
    ],
    "explanation": "Re-constructing \"Cette boulangerie a le meilleur pain\" from the underlying rule cements the pattern of The Twin Suppletions."
  }
};

export default lesson;
