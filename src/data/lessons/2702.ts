import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2702,
  "slug": "case-trigger-gym",
  "title": "Case Trigger Gym",
  "subtitle": "Twenty prompts: motion → accusative, location → dative",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "in",
    "auf",
    "über",
    "unter",
    "vor",
    "tisch",
    "haus",
    "stadt",
    "straße",
    "platz",
    "ecke",
    "mitte",
    "strand",
    "hafen",
    "wald",
    "brücke"
  ],
  "table_word_ids": [
    "über",
    "unter",
    "vor",
    "tisch",
    "haus",
    "stadt",
    "in",
    "auf",
    "straße",
    "platz",
    "ecke",
    "mitte",
    "strand",
    "hafen",
    "wald",
    "brücke"
  ],
  "hook": {
    "title": "The Two-Question Machine",
    "content": "Every two-way preposition (an, auf, hinter, in, neben, über, unter, vor, zwischen) asks you one question before you answer: wohin or wo? Where-TO (motion into the space) → accusative. Where-AT (position inside the space) → dative. Ich gehe INS Haus (into the house — motion, accusative) versus Ich bin IM Haus (in the house — location, dative). The contractions are your cheat sheet: ins = in das (accusative), im = in dem (dative). Twenty reps today until the question asks itself.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Full Two-Way Set",
        "content": "an (at/on — vertical edge), auf (on — horizontal surface), hinter (behind), in (in), neben (next to), über (over), unter (under), vor (in front of), zwischen (between). All nine switch cases by motion — the most drilled topic in every German classroom, now just one question deep."
      }
    ]
  },
  "pattern": {
    "title": "Ask, Then Decline",
    "content": "Round one — wo?: Das Buch ist auf DEM Tisch (dative). Round two — wohin?: Ich lege das Buch auf DEN Tisch (accusative). Round three — the verbs decide: gehen/fahren/kommen/legen/stellen (put-standing) are motion verbs → accusative; sein/liegen/stehen (be/lying/standing) are location verbs → dative. Round four — contractions: ins Kino? untaught — ins Haus, im Haus, an den? keep: am Montag (dative of time, from topic 17!). The logic is physical: if the scene has a trajectory, accusative; if it has an address, dative.",
    "footnotes": [],
    "linguist_note": "legen/liegen and stellen/stehen are the motion/location verb twins: legen = lay (motion → accusative), liegen = lie (location → dative). English once made the same distinction — 'lay' takes an object, 'lie' does not — and still half-remembers it."
  },
  "exercises": [
    {
      "id": "l2702_e1",
      "type": "shift_select",
      "prompt": "'Ich lege das Buch auf _____ Tisch.' (I lay the book ON the table — motion!):",
      "options": [
        "der",
        "dem (dative — location)",
        "den (accusative — motion)",
        "des"
      ],
      "target_answer": "den (accusative — motion)",
      "meaning": "Ich lege das Buch auf den Tisch",
      "explanation": "legen is a motion verb: the book travels to the surface. wohin? → accusative: den. am Strand, im Wald — rest words; in den Wald — motion words: the forest walk crosses its boundary."
    },
    {
      "id": "l2702_e2",
      "type": "shift_select",
      "prompt": "'Das Buch liegt auf _____ Tisch.' (The book IS LYING on the table — no motion):",
      "options": [
        "das",
        "eine",
        "den (accusative)",
        "dem (dative — location)"
      ],
      "target_answer": "dem (dative — location)",
      "meaning": "Das Buch liegt auf dem Tisch",
      "explanation": "liegen is a location verb: the book is AT REST. wo? → dative: dem. One verb flip, one case flip."
    },
    {
      "id": "l2702_e3",
      "type": "matching_pairs",
      "prompt": "Match each scene with its correct case logic:",
      "matching_pairs": [
        {
          "id": "ct1",
          "english": "into the house (motion)",
          "german": "ins Haus (in + das)"
        },
        {
          "id": "ct2",
          "english": "in the house (location)",
          "german": "im Haus (in + dem)"
        },
        {
          "id": "ct3",
          "english": "under the table, going",
          "german": "unter den Tisch"
        },
        {
          "id": "ct4",
          "english": "under the table, resting",
          "german": "unter dem Tisch"
        },
        {
          "id": "ct5",
          "english": "at the corner (location)",
          "german": "an der Ecke"
        },
        {
          "id": "ct6",
          "english": "in the middle (location)",
          "german": "in der Mitte"
        },
        {
          "id": "ct7",
          "english": "under the bridge (location)",
          "german": "unter der Brücke"
        },
        {
          "id": "ct8",
          "english": "into the harbor (motion)",
          "german": "in den Hafen"
        }
      ],
      "target_answer": "ins Haus, im Haus, unter den Tisch, unter dem Tisch, an der Ecke, in der Mitte, unter der Brücke, in den Hafen",
      "meaning": "the case logic in eight scenes",
      "explanation": "The contraction or article ending IS the case report — motion gets accusative, location gets dative. der Brücke rests, den Hafen crosses."
    },
    {
      "id": "l2702_e4",
      "type": "derive",
      "prompt": "Contract it: 'Wir gehen zu _____ Haus.' (zu + dem, to the house):",
      "english_hint": "zu + dem = one syllable",
      "target_answer": "zum",
      "meaning": "Wir gehen zum Haus = We go to the house",
      "explanation": "zum = zu + dem — the dative contraction, because gehen TOWARD is location-grammar's cousin: destination as state. Auf dem Platz (on the square — the open space) — location, dative."
    },
    {
      "id": "l2702_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The cat goes under the table' (motion!)",
      "target_answer": "Die Katze geht unter den Tisch",
      "meaning": "The cat goes under the table",
      "word_bank": [
        "unter",
        "geht",
        "den",
        "Tisch",
        "Katze",
        "mit",
        "nicht",
        "Die"
      ],
      "explanation": "gehen = motion → wohin? → accusative: unter den Tisch. Yesterday's resting cat took dem; today it moves."
    }
  ],
  "summary": {
    "outcome": "Choose accusative or dative after two-way prepositions on reflex.",
    "use_example": {
      "german": "Die Katze geht unter den Tisch.",
      "english": "The cat goes under the table."
    },
    "takeaway": "wohin? → accusative (motion); wo? → dative (location) — and the contractions im/ins report the case for free.",
    "curiosity_teaser": "Next: Preposition Sentence Ladders — chain prepositional phrases onto taught verbs."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Case Trigger Gym (The cat goes under the table):",
    "target_answer": "Die Katze geht unter den Tisch",
    "word_bank": [
      "Katze",
      "Die",
      "nicht",
      "heute",
      "unter",
      "den",
      "geht",
      "Tisch"
    ],
    "explanation": "Re-assembling \"Die Katze geht unter den Tisch\" from scratch locks in the structural pattern of Case Trigger Gym without relying on short-term echo."
  }
};

export default lesson;
