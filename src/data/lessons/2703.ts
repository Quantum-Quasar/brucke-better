import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2703,
  "slug": "preposition-sentence-ladders",
  "title": "Preposition Sentence Ladders",
  "subtitle": "Full sentences chaining prepositional phrases onto taught verbs",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "in",
    "auf",
    "über",
    "unter",
    "vor",
    "durch",
    "mit",
    "aus",
    "bei",
    "zu",
    "haus",
    "tisch",
    "stadt",
    "zug",
    "fahrt",
    "fluss",
    "markt",
    "wand",
    "hafen",
    "wald",
    "brücke",
    "platz"
  ],
  "table_word_ids": [
    "in",
    "auf",
    "über",
    "mit",
    "durch",
    "aus",
    "unter",
    "vor",
    "bei",
    "zu",
    "haus",
    "tisch",
    "stadt",
    "zug",
    "fahrt",
    "fluss",
    "markt",
    "wand",
    "hafen",
    "wald",
    "brücke",
    "platz"
  ],
  "hook": {
    "title": "The Ladder Climb",
    "content": "One verb, one or two prepositional phrases, a full sentence: Ich fahre mit dem Zug nach Berlin (I travel by train to Berlin). Ich komme aus dem Haus (I come out of the house). Wir gehen durch die Stadt (we walk through the city). The ladder skill: stack phrases in TeKaMoLo order — Time, Cause, Manner, Place — Ich fahre morgen mit dem Zug nach Berlin (tomorrow, by train, to Berlin). Each phrase obeys its own case law: mit + dative, nach + dative, durch + accusative. The climb is the last grammar drill of the trail — after this, sentences build themselves.",
    "footnotes": [
      {
        "marker": "1",
        "title": "TeKaMoLo, Gently",
        "content": "Temporal (wann?) → Kausal (why?) → Modal (how?) → Lokal (where?): Ich fahre morgen (T) wegen des Wetters? skip the cause — mit dem Zug (M) nach Berlin (L). Three of the four slots fill a typical travel sentence; the order is a strong tendency, not a law."
      }
    ]
  },
  "pattern": {
    "title": "The Climb",
    "content": "Ladder one — travel: Ich fahre (morgen) (mit dem Zug) (nach Berlin). Ladder two — household: Ich stelle das Glas (jetzt) (auf den Tisch) (in der Küche). Ladder three — origins: Sie? — Er kommt (heute) (aus der Stadt). Ladder four — paths: Wir wandern (am Morgen) (durch den Park). Ladder five — position: Das Buch liegt (noch) (auf dem Tisch) (im Haus). Each ladder: verb first in neutral order, phrases in TeKaMoLo, cases decided by each preposition's own law. Chain two ladders with und and you are writing paragraphs.",
    "footnotes": [],
    "linguist_note": "The dative contractions carry the ladders: im Haus, zum Bahnhof? hint — (bahnhof untaught), zur Stadt? — zur Schule untaught; keep im/zum/vom: vom = von + dem. Three contractions, three ladders, no declension tables needed."
  },
  "exercises": [
    {
      "id": "l2703_e1",
      "type": "shift_select",
      "prompt": "TeKaMoLo order: 'Ich fahre _____ nach Berlin.' (tomorrow + by train — which order?):",
      "options": [
        "mit morgen dem Zug",
        "morgen mit dem Zug (Time before Manner)",
        "mit dem Zug morgen",
        "dem Zug mit morgen"
      ],
      "target_answer": "morgen mit dem Zug (Time before Manner)",
      "meaning": "Ich fahre morgen mit dem Zug nach Berlin",
      "explanation": "TeKaMoLo: Time (morgen) before Manner (mit dem Zug) before Location (nach Berlin). The locations stack the same way: am Fluss, auf dem Markt, an der Wand — place, then place, then place."
    },
    {
      "id": "l2703_e2",
      "type": "matching_pairs",
      "prompt": "Match each ladder with its case logic:",
      "matching_pairs": [
        {
          "id": "sl1",
          "english": "by train (manner — dative)",
          "german": "mit dem Zug"
        },
        {
          "id": "sl2",
          "english": "out of the house (origin — dative)",
          "german": "aus dem Haus"
        },
        {
          "id": "sl3",
          "english": "through the city (path — accusative)",
          "german": "durch die Stadt"
        },
        {
          "id": "sl4",
          "english": "onto the table (motion — accusative)",
          "german": "auf den Tisch"
        },
        {
          "id": "sl5",
          "english": "to the harbor (destination — dative)",
          "german": "zum Hafen"
        },
        {
          "id": "sl6",
          "english": "through the forest (path — accusative)",
          "german": "durch den Wald"
        },
        {
          "id": "sl7",
          "english": "on the square (location — dative)",
          "german": "auf dem Platz"
        }
      ],
      "target_answer": "mit dem Zug, aus dem Haus, durch die Stadt, auf den Tisch, zum Hafen, durch den Wald, auf dem Platz",
      "meaning": "seven case laws in seven phrases",
      "explanation": "Each preposition carries its own case law — the ladder is independent laws stacked. der Hafen and dem Wald report the same verb differently."
    },
    {
      "id": "l2703_e3",
      "type": "shift_select",
      "prompt": "Unpack the contraction: 'Ich komme aus _____ Haus.' (neuter dative article after aus):",
      "options": [
        "im",
        "vom",
        "dem",
        "zum"
      ],
      "target_answer": "dem",
      "meaning": "Ich komme aus dem Haus",
      "explanation": "aus does not contract — dem stays full. Only zu, von, in, an contract (zum, vom, im, ins...). Know your contractions! unter der Brücke — no contraction either; the bridge keeps its full dative."
    },
    {
      "id": "l2703_e4",
      "type": "reverse_cognate",
      "prompt": "What contraction hides in 'im Haus'?",
      "target_answer": "in dem",
      "meaning": "im = in + dem (dative location)",
      "explanation": "im is the dative contraction — 'in the house' at rest. The contraction reports the case before you finish the phrase."
    },
    {
      "id": "l2703_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the full ladder: 'Tomorrow I travel by train to Berlin'",
      "target_answer": "Morgen fahre ich mit dem Zug nach Berlin",
      "meaning": "Tomorrow I travel by train to Berlin",
      "word_bank": [
        "fahre",
        "aber",
        "dem",
        "Berlin",
        "Zug",
        "Morgen",
        "nach",
        "mit",
        "haben",
        "ich"
      ],
      "explanation": "Fronted Time (1), verb (2), subject (3), Manner (mit dem Zug), Location (nach Berlin) — the complete TeKaMoLo ladder with V2."
    }
  ],
  "summary": {
    "outcome": "Chain prepositional phrases in TeKaMoLo order with correct case laws.",
    "use_example": {
      "german": "Morgen fahre ich mit dem Zug nach Berlin.",
      "english": "Tomorrow I travel by train to Berlin."
    },
    "takeaway": "Time, Manner, Place — each phrase with its own case law, stacked on a V2 spine. The last drill; the sentences build themselves now.",
    "curiosity_teaser": "Next: verb families & root radiations — one root, many words: fahren/Fahrt, ziehen/Zug, like stand/understand."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"Today that is very good\"",
    "target_answer": "Heute ist das sehr gut",
    "word_bank": [
      "sehr",
      "gut",
      "nicht",
      "ist",
      "das",
      "sehr",
      "Heute"
    ],
    "explanation": "Building \"Heute ist das sehr gut\" from the lesson's core pattern locks in Preposition Sentence Ladders."
  }
};

export default lesson;
