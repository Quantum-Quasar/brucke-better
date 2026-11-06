import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 21,
  "slug": "plus-moins-aussi",
  "title": "Plus, Moins, aussi",
  "subtitle": "Comparing with plus… que, moins… que, aussi… que — and the twin suppletions bon → meilleur and mauvais → pire",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "plus",
    "moins",
    "aussi",
    "que",
    "meilleur",
    "pire",
    "cher",
    "grand",
    "petit",
    "bon"
  ],
  "table_word_ids": [
    "plus",
    "moins",
    "aussi",
    "que",
    "meilleur",
    "pire",
    "cher",
    "grand",
    "petit",
    "bon"
  ],
  "hook": {
    "title": "Why French Never Adds '-er' to an Adjective",
    "content": "English has two competing ways to compare: short Germanic adjectives add '-er' (bigger, smaller, cheaper), while long Latinate adjectives put 'more' in front (more important, more interesting). French uses the 'more / less / as' formula for EVERY adjective, short or long! 'Bigger than' is simply plus grand que ('more big than'). 'Less expensive than' is moins cher que. And 'as tall as' is aussi grand que.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why bon → meilleur is the exact twin of good → better",
        "content": "Neither English (*gooder) nor French (*plus bon) allows 'good' to take a regular comparative! Both languages reach for a separate ancient root (suppletion): Latin bonus jumped to melior (English 'ameliorate'), giving French meilleur ('better')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "plus / moins / aussi + Adjective + que",
    "content": "Notice that French uses que ('than') as the second hinge across all three comparisons: plus grand que ('more big than'), moins cher que ('less expensive than'), and aussi important que ('as important as'). And when you pronounce plus before an adjective starting with a consonant (plus grand, plus cher), the final -s of plus stays silent (/ply/)!",
    "linguist_note": "Latin comparative melior ('better') and peior ('worse', English pejorative) survived directly as synthetic comparatives meilleur and pire.",
    "trap_note": "The shortcut your mind will offer: saying *plus bon for 'better'. Just as English forbids 'gooder', French forbids *plus bon — always say meilleur!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each comparative pattern with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "plus grand que",
          "german": "bigger / taller than"
        },
        {
          "id": "p2",
          "english": "moins cher que",
          "german": "less expensive / cheaper than"
        },
        {
          "id": "p3",
          "english": "aussi important que",
          "german": "as important as"
        },
        {
          "id": "p4",
          "english": "meilleur que (never *plus bon)",
          "german": "better than (ameliorate)"
        },
        {
          "id": "p5",
          "english": "pire que (pejorative)",
          "german": "worse than"
        }
      ],
      "target_answer": "bigger / taller than, less expensive / cheaper than, as important as, better than (ameliorate), worse than",
      "meaning": "plus grand que, moins cher que, aussi important que, meilleur que (never *plus bon), pire que (pejorative)",
      "explanation": "plus, moins, and aussi all close their comparison with que ('than / as').",
      "id": "fr21_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French meilleur ('better') shares its Latin root melior with which formal English verb meaning 'to make better'?",
      "target_answer": "ameliorate",
      "meaning": "ameliorate ↔ meilleur ('better')",
      "explanation": "To ameliorate a situation is literally to make it 'better' (Latin melior → French meilleur).",
      "id": "fr21_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'The wine is better than the coffee'?",
      "options": [
        "Le vin est plus bon que le café",
        "Le vin est meilleur que le café",
        "Le vin est meilleur comme le café"
      ],
      "target_answer": "Le vin est meilleur que le café",
      "meaning": "The wine is better than the coffee",
      "explanation": "bon becomes meilleur in comparisons, and 'than' is always que.",
      "id": "fr21_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "this hotel is less expensive than the restaurant",
      "cues": [
        "This hotel is less expensive than the restaurant → Cet hôtel est moins cher que le restaurant"
      ],
      "idea_parts": [
        "subject → Cet hôtel",
        "comparative → est moins cher",
        "hinge + target → que le restaurant"
      ],
      "target_answer": "Cet hôtel est moins cher que le restaurant",
      "meaning": "This hotel is less expensive than the restaurant",
      "word_bank": [
        "le",
        "est",
        "plus",
        "moins",
        "restaurant",
        "la",
        "Cet",
        "hôtel",
        "cher",
        "que"
      ],
      "explanation": "moins cher que = 'less expensive than'.",
      "diagnosis": {
        "slip": "used comme instead of que",
        "cue": "Comparisons always close with que ('than')."
      },
      "id": "fr21_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La maison est aussi grande que l'hôtel",
      "replays": 2,
      "target_answer": "La maison est aussi grande que l'hôtel",
      "meaning": "The house is as big as the hotel",
      "cues": [
        "The house is: La maison est",
        "as big as: aussi grande que",
        "the hotel: l'hôtel"
      ],
      "explanation": "aussi... que means 'as... as', and grande agrees with la maison.",
      "affirmation": "You paired aussi and que with feminine grande.",
      "id": "fr21_e5"
    }
  ],
  "summary": {
    "outcome": "Build comparisons of superiority (plus… que), inferiority (moins… que), and equality (aussi… que), plus irregular meilleur and pire.",
    "use_example": {
      "german": "Le train est plus rapide et moins cher que la voiture.",
      "english": "The train is faster and cheaper than the car."
    },
    "takeaway": "Every comparison closes with que — and 'better' is always meilleur.",
    "curiosity_teaser": "Up next on Le Pont ([2101] The Twin Suppletions): see how Plus, Moins, aussi leads directly into The Twin Suppletions."
  },
  "twist": {
    "prompt": "Ungraded — 'The cake is better today':",
    "target_answer": "Le gâteau est meilleur aujourd'hui",
    "word_bank": [
      "plus",
      "meilleur",
      "Le",
      "est",
      "aujourd'hui",
      "gâteau",
      "bon"
    ],
    "explanation": "meilleur replaces plus bon everywhere."
  },
  "foreshadow": {
    "line": "Having mastered Plus, Moins, aussi, look ahead to Topic 22 (en & y), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 22
  },
  "payoff": {
    "ofLesson": 20,
    "text": "The foundation from Topic 20 (depuis & the Perfect Split) now pays off directly inside Plus, Moins, aussi: every sentence here builds on that earlier step."
  }
};

export default lesson;
