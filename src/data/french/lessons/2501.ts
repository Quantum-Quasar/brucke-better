import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2501,
  "slug": "lesson-2501",
  "title": "It Has There",
  "subtitle": "il y a un café ('there is a café') vs il y a trois ans ('three years ago').",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "il_y_a",
    "y",
    "avoir",
    "ans",
    "semaine",
    "minute",
    "heure",
    "café",
    "gare"
  ],
  "table_word_ids": [
    "il_y_a",
    "y",
    "avoir",
    "ans",
    "semaine",
    "minute",
    "heure",
    "café",
    "gare"
  ],
  "hook": {
    "title": "Space ('There Is') and Time ('Ago') in One Three-Word Formula",
    "content": "Compare the two jobs of il y a: (1) Il y a un train dans dix minutes ('There is a train in ten minutes' — existence in space). (2) Le train est parti il y a dix minutes ('The train left ten minutes ago' — elapsed time in the past)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How to tell 'there is' apart from 'ago' in one glance",
        "content": "Before a person or object, il y a means 'there is / there are'. Before a time span alongside a past-tense verb, il y a means 'AGO'!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Il y a + Object = 'There is/are'; Past Verb + il y a + Time = 'Ago'",
    "content": "Contrast Present + depuis ('for X time', ongoing) with Past + il y a ('X time ago', completed).",
    "linguist_note": "Temporal il y a ('ago') grammaticalized from existential 'there is [X time elapsed since]...'.",
    "trap_note": "Don't translate 'ten minutes ago' as *dix minutes avant — put il y a right in front of the time span: il y a dix minutes!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Sort these il y a phrases into Space ('there is/are') vs. Time ('ago'):",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Il y a un bon café ici",
          "german": "Space: There is a good café here"
        },
        {
          "id": "p2",
          "english": "Il y a deux gares dans la ville",
          "german": "Space: There are two stations in the city"
        },
        {
          "id": "p3",
          "english": "Je suis arrivé il y a une heure",
          "german": "Time: I arrived an hour ago"
        },
        {
          "id": "p4",
          "english": "Il est parti il y a cinq minutes",
          "german": "Time: He left five minutes ago"
        },
        {
          "id": "p5",
          "english": "J'ai visité Lyon il y a trois ans",
          "german": "Time: I visited Lyon three years ago"
        }
      ],
      "target_answer": "Space: There is a good café here, Space: There are two stations in the city, Time: I arrived an hour ago, Time: He left five minutes ago, Time: I visited Lyon three years ago",
      "meaning": "Il y a un bon café ici, Il y a deux gares dans la ville, Je suis arrivé il y a une heure, Il est parti il y a cinq minutes, J'ai visité Lyon il y a trois ans",
      "explanation": "Before a time span in a past sentence, il y a always means 'ago'.",
      "id": "fr2501_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word order of 'il y a trois ans' ('three years ago')?",
      "german": "il y a trois ans",
      "natural": "three years ago",
      "options": [
        "it there has three years",
        "three years ago",
        "three years before there"
      ],
      "target_answer": "it there has three years",
      "meaning": "Literal structure: it there has three years",
      "explanation": "French puts il y a BEFORE the time span, whereas English puts 'ago' AFTER it!",
      "id": "fr2501_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Contrast Topic 20 and Topic 25: 'I have lived here FOR two years' vs. 'I arrived here two years AGO':",
      "options": [
        "J'habite ici il y a deux ans / Je suis arrivé ici depuis deux ans",
        "J'habite ici depuis deux ans / Je suis arrivé ici il y a deux ans",
        "J'ai habité ici depuis deux ans / J'arrive ici il y a deux ans"
      ],
      "target_answer": "J'habite ici depuis deux ans / Je suis arrivé ici il y a deux ans",
      "meaning": "Present + depuis = 'for X time (still ongoing)'; Past + il y a = 'X time ago (completed)'!",
      "explanation": "This pair is one of the most clarifying contrasts in French grammar.",
      "id": "fr2501_e3"
    },
    {
      "id": "fr2501_e4",
      "type": "pronoun_compression",
      "prompt": "Fold both noun phrases into pre-verbal French pronouns:",
      "shift_hint": "Double Pronoun Compression",
      "full_sentence": "Tu donnes la lettre à ton ami",
      "compressed_parts": [
        {
          "noun": "la lettre",
          "pronoun": "la",
          "role": "direct object"
        },
        {
          "noun": "à ton ami",
          "pronoun": "lui",
          "role": "indirect receiver"
        }
      ],
      "word_bank": [
        "lui",
        "la",
        "Tu",
        "donnes",
        "le",
        "ami"
      ],
      "target_answer": "Tu la lui donnes",
      "meaning": "You give it to him",
      "explanation": "In French, both objects step in front of the verb: the direct object (la) precedes the third-person receiver (lui)."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Il y a un train qui est parti il y a dix minutes",
      "replays": 2,
      "target_answer": "Il y a un train qui est parti il y a dix minutes",
      "meaning": "There is a train that left ten minutes ago",
      "cues": [
        "Il y a un train",
        "qui est parti il y a dix minutes"
      ],
      "explanation": "Both jobs of il y a in a single sentence!",
      "affirmation": "You nailed both uses of il y a in one sentence!",
      "id": "fr2501_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy il y a both for spatial existence ('there is/are') and elapsed past time ('ago'), contrasting it with depuis.",
    "use_example": {
      "german": "Il y a dix ans, j'habitais à Lyon.",
      "english": "Ten years ago, I used to live in Lyon."
    },
    "takeaway": "Before a time span in the past, il y a means 'ago'.",
    "curiosity_teaser": "Up next on Le Pont ([2502] il y a Gym): see how It Has There leads directly into il y a Gym."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"There is a train that left ten minutes ago\" in French:",
    "target_answer": "Il y a un train qui est parti il y a dix minutes",
    "word_bank": [
      "Il",
      "un",
      "dix",
      "a",
      "a",
      "qui",
      "minutes",
      "pas",
      "est",
      "y",
      "il",
      "train",
      "parti",
      "y",
      "ne"
    ],
    "explanation": "Re-constructing \"Il y a un train qui est parti il y a dix minutes\" from the underlying rule cements the pattern of It Has There."
  }
};

export default lesson;
