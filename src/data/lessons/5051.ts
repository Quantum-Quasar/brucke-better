import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5051,
  "slug": "motion-accusative-location-dative",
  "title": "Motion → Accusative, Location → Dative",
  "subtitle": "wohin?/wo? pair drills across an/auf/in/hinter/neben/über/unter/vor/zwischen",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "in",
    "auf",
    "über",
    "unter",
    "vor",
    "hinter",
    "neben",
    "zwischen",
    "haus",
    "tisch"
  ],
  "table_word_ids": [
    "in",
    "auf",
    "über",
    "unter",
    "vor",
    "hinter",
    "neben",
    "zwischen",
    "haus",
    "tisch",
    "huhn",
    "einfach",
    "fuchs",
    "unterschreiben",
    "puppe"
  ],
  "hook": {
    "title": "The Isle",
    "content": "Isolated for drilling: the nine two-way prepositions, one question, two cases. The set: an (at/on-edge), auf (on-surface), hinter (behind), in (in), neben (beside), über (over), unter (under), vor (in front of), zwischen (between). Ask wo? (where-at — location) → dative. Ask wohin? (where-to — motion) → accusative. Das Bild ist an der Wand (the picture hangs at the wall — dative). Ich hänge das Bild an die Wand (I hang it onto the wall — accusative). The picture never changed — only the question did.",
    "footnotes": [
      {
        "marker": "1",
        "title": "an vs auf: the German Haunted Pair",
        "content": "an = vertical attachment (an der Wand — on the wall's face), auf = horizontal surface (auf dem Tisch — on the table top). English 'on' covers both; German splits them. Book on table → auf; painting on wall → an. Memorize the pair as surface vs edge."
      }
    ]
  },
  "pattern": {
    "title": "The Pair Drill",
    "content": "Drill the pairs side by side: In die Stadt (into the city — motion) / in der Stadt (in the city — location). Auf den Tisch / auf dem Tisch. Unter den Tisch / unter dem Tisch. Vor das Haus / vor dem Haus. Hinter das Haus / hinter dem Haus. Neben den? — neben den Tisch / neben dem Tisch. Zwischen die? — zwischen die Bücher / zwischen den Büchern (zw-! your sibilant family). The motion verbs that trigger accusative: gehen, fahren, kommen, legen, stellen, hängen (hang-onto). The location verbs: sein, liegen, stehen, hängen (be-hanging).",
    "footnotes": [],
    "linguist_note": "The motion/location split is the last surviving trace of the Proto-Indo-European accusative of extent-of-motion — Greek and Latin showed it too. German kept the law fully armed; English kept only its verbs (lay/lie)."
  },
  "exercises": [
    {
      "id": "l5051_e1",
      "type": "matching_pairs",
      "prompt": "Match each scene with its case-logic. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "tw1",
          "english": "into the city (motion)",
          "german": "in die Stadt"
        },
        {
          "id": "tw2",
          "english": "in the city (location)",
          "german": "in der Stadt"
        },
        {
          "id": "tw3",
          "english": "onto the table (motion)",
          "german": "auf den Tisch"
        },
        {
          "id": "tw4",
          "english": "on the table (location)",
          "german": "auf dem Tisch"
        },
        {
          "id": "recall1",
          "german": "hinter dem Haus",
          "english": "behind the house"
        },
        {
          "id": "recall2",
          "german": "neben dem Garten",
          "english": "beside the garden"
        }
      ],
      "target_answer": "in die Stadt, in der Stadt, auf den Tisch, auf dem Tisch, hinter dem Haus, neben dem Garten",
      "meaning": "into the city (motion); in the city (location); onto the table (motion); on the table (location); behind the house; beside the garden",
      "explanation": "Same preposition, same nouns — the question (wohin? or wo?) alone decides the case."
    },
    {
      "id": "l5051_e2",
      "type": "shift_select",
      "prompt": "'Ich hänge das Bild an _____ Wand.' (I hang the picture onto the wall — motion):",
      "options": [
        "den",
        "dem",
        "die (accusative — motion)",
        "der (dative — location)"
      ],
      "target_answer": "die (accusative — motion)",
      "meaning": "Ich hänge das Bild an die Wand",
      "explanation": "hängen-onto is motion: wohin? → accusative (die Wand). The hanging picture AT REST would be an der Wand."
    },
    {
      "id": "l5051_e3",
      "type": "shift_select",
      "prompt": "Which verb is a LOCATION verb (dative trigger)?",
      "options": [
        "gehen (to go)",
        "stellen (to put-standing)",
        "legen (to lay)",
        "stehen (to stand)"
      ],
      "target_answer": "stehen (to stand)",
      "meaning": "The location verbs: sein, liegen, stehen, hängen-rest",
      "explanation": "stellen/legen put things somewhere (motion → accusative); stehen/liegen describe what IS somewhere (dative)."
    },
    {
      "id": "l5051_e4",
      "type": "reverse_cognate",
      "prompt": "What English preposition meaning 'in the space separating two things' is the twin of 'zwischen' (from 'zwei' / 'twain')?",
      "target_answer": "between",
      "meaning": "between ↔ zwischen (tw→zw + the -en pair)",
      "explanation": "Both are 'two-one': between = by-twain, zwischen = zwi-schen. The tw→zw twins from topic 5, still counting two."
    },
    {
      "id": "l5051_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The picture hangs on the wall' (at rest!)",
      "target_answer": "Das Bild hängt an der Wand",
      "meaning": "Das Bild hängt an der Wand = The picture hangs at the wall",
      "vocab_hints": [
        {
          "word": "hängt",
          "translation": "hangs (at rest)",
          "note": "hängen at rest = location → dative: an der Wand. 'Hanging onto' (motion) would take die."
        }
      ],
      "word_bank": [
        "hängt",
        "Wand",
        "Bild",
        "der",
        "an",
        "Das",
        "aus",
        "gut"
      ],
      "explanation": "hängt (rest) + an + der (dative) — the picture is AT the wall, not going to it. One verb, one case, one calm scene."
    }
  ],
  "summary": {
    "outcome": "Run wo?/wohin? across all nine two-way prepositions and decline correctly.",
    "use_example": {
      "german": "Das Bild hängt an der Wand.",
      "english": "The picture hangs on the wall."
    },
    "takeaway": "Nine prepositions, one question: wohin? → accusative, wo? → dative — and an/auf split surface from edge.",
    "curiosity_teaser": "Next: the Wechselpräpositionen Sentence Gym — twenty picture-prompt sentences switching cases."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"Today that is very good\"",
    "target_answer": "Heute ist das sehr gut",
    "word_bank": [
      "nicht",
      "sehr",
      "gut",
      "sehr",
      "ist",
      "Heute",
      "das"
    ],
    "explanation": "Building \"Heute ist das sehr gut\" from the lesson's core pattern locks in Motion → Accusative, Location → Dative."
  }
};

export default lesson;
