import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2102,
  "slug": "lesson-2102",
  "title": "Comparison Gym",
  "subtitle": "plus… que, moins… que, aussi… que across cities, food, and ideas.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "plus",
    "moins",
    "aussi",
    "que",
    "grand",
    "petit",
    "cher",
    "possible",
    "ville",
    "hôtel"
  ],
  "table_word_ids": [
    "plus",
    "moins",
    "aussi",
    "que",
    "grand",
    "petit",
    "cher",
    "possible",
    "ville",
    "hôtel"
  ],
  "hook": {
    "title": "Running Comparisons at Speed: plus… que, moins… que, aussi… que",
    "content": "Run the three comparison frames across adjectives you own: plus [adj] que ('more [adj] than'), moins [adj] que ('less [adj] than'), and aussi [adj] que ('as [adj] as'). The adjective still agrees in gender and number with the subject being described!",
    "footnotes": [
      {
        "marker": "1",
        "title": "When the final -s of plus wakes up",
        "content": "Before a consonant (plus grand, plus cher), the -s of plus is silent (/ply/). Before a vowel (plus‿important), the -s wakes up in liaison as /z/!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Subject + être + plus/moins/aussi + Agreed Adjective + que + Target",
    "content": "Keep the adjective agreed with the first noun, and close every comparison with que.",
    "linguist_note": "Comparative degree markers precede the adjective while the standard of comparison is introduced by que.",
    "trap_note": "Don't use *comme after aussi in a comparison (*aussi grand comme) — even for 'as... as', the second word is que (aussi grand que)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each comparative sentence with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "La maison est plus grande que l'hôtel",
          "german": "The house is bigger than the hotel"
        },
        {
          "id": "p2",
          "english": "Le train est moins cher que l'avion",
          "german": "The train is cheaper than the plane"
        },
        {
          "id": "p3",
          "english": "Lyon est aussi beau que Paris",
          "german": "Lyon is as beautiful as Paris"
        },
        {
          "id": "p4",
          "english": "Cette table est plus petite que l'autre",
          "german": "This table is smaller than the other"
        }
      ],
      "target_answer": "The house is bigger than the hotel, The train is cheaper than the plane, Lyon is as beautiful as Paris, This table is smaller than the other",
      "meaning": "La maison est plus grande que l'hôtel, Le train est moins cher que l'avion, Lyon est aussi beau que Paris, Cette table est plus petite que l'autre",
      "explanation": "All three frames (plus, moins, aussi) close with que.",
      "id": "fr2102_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'She is as tall as her brother'?",
      "options": [
        "Elle est aussi grande que son frère",
        "Elle est aussi grande comme son frère",
        "Elle est aussi grand que son frère"
      ],
      "target_answer": "Elle est aussi grande que son frère",
      "meaning": "She is as tall as her brother",
      "explanation": "grande agrees with Elle (-e), and 'as... as' uses aussi... que!",
      "id": "fr2102_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word structure of 'Le train est moins cher que le taxi'?",
      "german": "Le train est moins cher que le taxi",
      "natural": "The train is cheaper than the taxi",
      "options": [
        "The train is cheaper than the taxi",
        "The train is less dear than the taxi",
        "The train is fewer expensive as the taxi"
      ],
      "target_answer": "The train is less dear than the taxi",
      "meaning": "Literal structure: The train is less dear than the taxi",
      "explanation": "moins ('less') + cher ('dear/expensive') + que ('than').",
      "id": "fr2102_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "this city is bigger than my city",
      "cues": [
        "This city is bigger → Cette ville est plus grande",
        "than my city → que ma ville"
      ],
      "idea_parts": [
        "subject + comparative → Cette ville est plus grande",
        "hinge + target → que ma ville"
      ],
      "target_answer": "Cette ville est plus grande que ma ville",
      "meaning": "This city is bigger than my city",
      "word_bank": [
        "ville",
        "est",
        "que",
        "Cette",
        "plus",
        "grand",
        "ma",
        "ville",
        "la",
        "grande"
      ],
      "explanation": "la ville is feminine, so grande takes -e.",
      "diagnosis": {
        "slip": "forgot -e on grande",
        "cue": "ville is feminine: plus grande que ma ville."
      },
      "id": "fr2102_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est moins compliqué que je pensais",
      "replays": 2,
      "target_answer": "C'est moins compliqué que je pensais",
      "meaning": "It is less complicated than I thought",
      "cues": [
        "C'est moins compliqué",
        "que je pensais"
      ],
      "explanation": "moins... que works with clauses too!",
      "affirmation": "You wrote moins compliqué que je pensais cleanly.",
      "id": "fr2102_e5"
    }
  ],
  "summary": {
    "outcome": "Compare people, places, and things using plus… que, moins… que, and aussi… que with full adjective agreement.",
    "use_example": {
      "german": "Ce bistro est moins cher et aussi bon que le restaurant.",
      "english": "This bistro is cheaper and just as good as the restaurant."
    },
    "takeaway": "'as... as' is aussi... que (never comme), and the adjective agrees with the first noun.",
    "curiosity_teaser": "Up next on Le Pont ([22] en & y): see how Comparison Gym leads directly into en & y."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"This city is bigger than my city\" in French:",
    "target_answer": "Cette ville est plus grande que ma ville",
    "word_bank": [
      "ville",
      "que",
      "ma",
      "Cette",
      "plus",
      "grande",
      "pas",
      "ville",
      "est",
      "ne"
    ],
    "explanation": "Re-constructing \"Cette ville est plus grande que ma ville\" from the underlying rule cements the pattern of Comparison Gym."
  }
};

export default lesson;
