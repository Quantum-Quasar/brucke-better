import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5051,
  "slug": "lesson-5051",
  "title": "Lieu & Direction: ici, là, tout droit",
  "subtitle": "Navigating streets: tout droit, à gauche, à droite, où est la gare ?",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "ici",
    "là",
    "tout_droit",
    "gauche",
    "droite",
    "gare",
    "hôtel",
    "où",
    "aller"
  ],
  "table_word_ids": [
    "ici",
    "là",
    "tout_droit",
    "gauche",
    "droite",
    "gare",
    "hôtel",
    "où",
    "aller"
  ],
  "hook": {
    "title": "Street Navigation: ici, là, tout droit, à gauche, à droite",
    "content": "When you ask for directions (Excusez-moi, où est la gare ?), three phrases guide you: tout droit ('straight ahead'), à gauche ('on/to the left'), and à droite ('on/to the right')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why English borrowed 'gauche' (left) and 'adroit' (right)",
        "content": "English borrowed French gauche ('left') for 'awkward' and French à droit ('to the right') as 'adroit' ('skillful')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Allez tout droit, puis à gauche / à droite",
    "content": "Combine Où est…? with tout droit, à gauche, à droite, ici, and là.",
    "linguist_note": "Deictic adverbs ici/là and directional prepositional phrases (à gauche, à droite) anchor spatial navigation.",
    "trap_note": "Don't say *sur la gauche for basic 'on/to the left' — French uses à: à gauche, à droite!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each street-direction phrase with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "tout droit (all direct)",
          "german": "straight ahead"
        },
        {
          "id": "p2",
          "english": "à gauche (English 'gauche')",
          "german": "to / on the left"
        },
        {
          "id": "p3",
          "english": "à droite (English 'adroit')",
          "german": "to / on the right"
        },
        {
          "id": "p4",
          "english": "ici / là",
          "german": "here / there"
        },
        {
          "id": "p5",
          "english": "Où est la gare ?",
          "german": "Where is the train station?"
        }
      ],
      "target_answer": "straight ahead, to / on the left, to / on the right, here / there, Where is the train station?",
      "meaning": "tout droit (all direct), à gauche (English 'gauche'), à droite (English 'adroit'), ici / là, Où est la gare ?",
      "explanation": "tout droit, à gauche, and à droite handle 90% of street directions.",
      "id": "fr5051_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French droite ('right') and droit ('straight/direct') gave English which adjective meaning 'clever or skillful with one's hands'?",
      "target_answer": "adroit",
      "meaning": "adroit ↔ à droit ('to the right')",
      "explanation": "Just as 'gauche' (left) came to mean awkward in English, 'adroit' (to the right) came to mean skillful!",
      "id": "fr5051_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you tell someone 'Go straight ahead, then to the left' (polite vous)?",
      "options": [
        "Allez tout droit, puis à gauche",
        "Aller tout droit, puis à la gauche",
        "Allez tout droite, puis sur gauche"
      ],
      "target_answer": "Allez tout droit, puis à gauche",
      "meaning": "Go straight ahead, then to the left",
      "explanation": "tout droit uses masculine invariable droit; 'to the left' is à gauche.",
      "id": "fr5051_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "the train station is on the right and the hotel is on the left",
      "cues": [
        "The station is on the right → La gare est à droite",
        "and the hotel is on the left → et l'hôtel est à gauche"
      ],
      "idea_parts": [
        "first location → La gare est à droite",
        "second location → et l'hôtel est à gauche"
      ],
      "target_answer": "La gare est à droite et l'hôtel est à gauche",
      "meaning": "The station is on the right and the hotel is on the left",
      "word_bank": [
        "l'hôtel",
        "est",
        "droit",
        "gauche",
        "à",
        "la",
        "à",
        "droite",
        "gare",
        "est",
        "et",
        "La"
      ],
      "explanation": "à droite ('on the right') and à gauche ('on the left').",
      "diagnosis": {
        "slip": "used droit instead of droite",
        "cue": "The noun phrase 'on the right' is feminine: à droite."
      },
      "id": "fr5051_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Vous allez tout droit et c'est là",
      "replays": 2,
      "target_answer": "Vous allez tout droit et c'est là",
      "meaning": "You go straight ahead and it is right there",
      "cues": [
        "Vous allez tout droit",
        "et c'est là"
      ],
      "explanation": "tout droit = straight ahead.",
      "affirmation": "You wrote Vous allez tout droit et c'est là cleanly.",
      "id": "fr5051_e5"
    }
  ],
  "summary": {
    "outcome": "Ask for and give street directions using Où est…?, tout droit, à gauche, à droite, ici, and là.",
    "use_example": {
      "german": "Pardon, la gare ? — C'est tout droit, puis à gauche.",
      "english": "Excuse me, the station? — It's straight ahead, then on the left."
    },
    "takeaway": "Straight ahead = tout droit; left = à gauche; right = à droite.",
    "curiosity_teaser": "Up next on Le Pont ([5052] Où est la gare ?): see how Lieu & Direction: ici, là, tout droit leads directly into Où est la gare ?"
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"The station is on the right and the hotel is on the left\" in French:",
    "target_answer": "La gare est à droite et l'hôtel est à gauche",
    "word_bank": [
      "pas",
      "La",
      "gare",
      "et",
      "à",
      "l'hôtel",
      "gauche",
      "à",
      "droite",
      "est",
      "ne",
      "est"
    ],
    "explanation": "Re-constructing \"La gare est à droite et l'hôtel est à gauche\" from the underlying rule cements the pattern of Lieu & Direction: ici, là, tout droit."
  }
};

export default lesson;
