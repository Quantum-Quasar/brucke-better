import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2701,
  "slug": "uber-unter-durch-metaphor-set",
  "title": "über, unter, durch: Metaphor Set",
  "subtitle": "Spatial drills with the cognate prepositions — picture-based placement",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "über",
    "unter",
    "durch",
    "vor",
    "aus",
    "zu",
    "haus",
    "tisch",
    "hafen",
    "wald",
    "brücke",
    "ecke",
    "mitte",
    "strand",
    "legen"
  ],
  "table_word_ids": [
    "über",
    "unter",
    "durch",
    "vor",
    "aus",
    "zu",
    "haus",
    "tisch",
    "hafen",
    "wald",
    "brücke",
    "ecke",
    "mitte",
    "strand",
    "legen"
  ],
  "hook": {
    "title": "The Camera in Your Head",
    "content": "German prepositions are a camera language: each one places the scene. über: above, crossing, about (we speak ABOUT the book — über das Buch). unter: under, beneath, among (unter Freunden — among friends). durch: through — always moving, always accusative. vor: in front of, before (in space and in time: vor dem Haus, vor acht Uhr). aus: out of, origins (Ich komme aus Berlin). zu: toward, at (Zum Thema? keep it spatial: zur Schule? school untaught — zu dem Haus). Run the camera: place the object, choose the case, say the sentence.",
    "footnotes": [
      {
        "marker": "1",
        "title": "über Is Doing Overtime",
        "content": "über is the hardest-working preposition: over (spatial), above, across, about (Wir sprechen über das Buch — you drilled this in the V→B lesson), and über- as a prefix (übermorgen — over-morrow). One word, a whole coordinate system."
      }
    ]
  },
  "pattern": {
    "title": "Place the Scene",
    "content": "Static scenes (wo?): Das Buch ist auf? no — auf is next lesson's star; the dative set: über dem Tisch (above it), unter dem Tisch (under it), vor dem Haus (before it). Dynamic scenes (wohin?): Ich gehe unter die? — unter den Tisch (under it, going), über die Straße (across the street — Straße taught!), durch den Park (through it). Origins and targets: aus dem Haus (out of the house), zu dem Haus → zum Haus (to the house — the contraction!). Every sentence is a camera move: where is the camera, where is the thing, did it move?",
    "footnotes": [],
    "linguist_note": "durch is accusative-only because its meaning is inherently directional — you cannot 'be through' a park, only go through it. Meaning determines case here, not memorization."
  },
  "exercises": [
    {
      "id": "l2701_e1",
      "type": "shift_select",
      "prompt": "Camera check: 'Der Vogel ist über _____ Haus.' (above, hovering — no motion)",
      "options": [
        "den",
        "der",
        "das (accusative)",
        "dem (dative — location)"
      ],
      "target_answer": "dem (dative — location)",
      "meaning": "Der Vogel ist über dem Haus",
      "explanation": "wo? → dative. The bird hovers; nothing crosses a boundary. an der Ecke (at the corner), in der Mitte (in the middle), am Strand (on the beach) — three dative addresses; legen still accuses: Ich lege es auf den Tisch."
    },
    {
      "id": "l2701_e2",
      "type": "matching_pairs",
      "prompt": "Match each camera move with its preposition:",
      "matching_pairs": [
        {
          "id": "um1",
          "english": "through (the park)",
          "german": "durch den Park"
        },
        {
          "id": "um2",
          "english": "out of (the house)",
          "german": "aus dem Haus"
        },
        {
          "id": "um3",
          "english": "in front of (the house)",
          "german": "vor dem Haus"
        },
        {
          "id": "um4",
          "english": "to (the house)",
          "german": "zum Haus"
        },
        {
          "id": "um5",
          "english": "under the bridge",
          "german": "unter der Brücke"
        },
        {
          "id": "um6",
          "english": "into the harbor",
          "german": "in den Hafen"
        },
        {
          "id": "um7",
          "english": "through the forest",
          "german": "durch den Wald"
        }
      ],
      "target_answer": "durch den Park, aus dem Haus, vor dem Haus, zum Haus, unter der Brücke, in den Hafen, durch den Wald",
      "meaning": "through the park, out of the house, in front of the house, to the house, under the bridge, into the harbor, through the forest",
      "explanation": "Each preposition is a camera move — and the case (or contraction) reports whether anything moved: der Brücke hovers, den Hafen crosses."
    },
    {
      "id": "l2701_e3",
      "type": "shift_select",
      "prompt": "Wir sprechen _____ das Buch. (We speak ABOUT the book):",
      "options": [
        "über",
        "durch",
        "aus",
        "unter"
      ],
      "target_answer": "über",
      "meaning": "Wir sprechen über das Buch",
      "explanation": "über's 'about' meaning — the same preposition that is 'over' in space runs the topic-of-conversation job."
    },
    {
      "id": "l2701_e4",
      "type": "reverse_cognate",
      "prompt": "What English word is the twin of 'durch'?",
      "target_answer": "through",
      "meaning": "through ↔ durch (th → d, gh → ch)",
      "explanation": "A double-shift preposition: the th hardened to d and the guttural survives as ch — through and durch are one word."
    },
    {
      "id": "l2701_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the German sentence for 'We walk through the park':",
      "target_answer": "Wir gehen durch den Park",
      "meaning": "We walk through the park",
      "vocab_hints": [
        {
          "word": "den",
          "translation": "the (masculine accusative)",
          "note": "durch is always accusative — der Park becomes den Park"
        }
      ],
      "word_bank": [
        "gehen",
        "nach",
        "Wir",
        "durch",
        "Park",
        "mit",
        "den"
      ],
      "explanation": "durch demands the accusative — even though Park is masculine and 'walking' feels calm. The preposition rules."
    }
  ],
  "summary": {
    "outcome": "Place scenes with über/unter/durch/vor/aus/zu and match case to camera.",
    "use_example": {
      "german": "Wir gehen durch den Park.",
      "english": "We walk through the park."
    },
    "takeaway": "Prepositions are camera moves — and durch always films motion, so it always takes the accusative.",
    "curiosity_teaser": "Next: the Case Trigger Gym — twenty prompts deciding accusative or dative after two-way prepositions."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"Today that is very good\"",
    "target_answer": "Heute ist das sehr gut",
    "word_bank": [
      "Heute",
      "nicht",
      "ist",
      "sehr",
      "gut",
      "sehr",
      "das"
    ],
    "explanation": "Building \"Heute ist das sehr gut\" from the lesson's core pattern locks in über, unter, durch: Metaphor Set."
  }
};

export default lesson;
