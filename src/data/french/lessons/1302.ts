import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1302,
  "slug": "sprig-1302",
  "title": "Chez, the House Word",
  "subtitle": "chez Marie, chez le docteur, chez moi — the Latin casa preposition with no English twin.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "chez",
    "moi",
    "toi",
    "lui",
    "elle",
    "nous",
    "vous",
    "docteur",
    "ami",
    "rester"
  ],
  "table_word_ids": [
    "chez",
    "moi",
    "toi",
    "lui",
    "elle",
    "nous",
    "vous",
    "docteur",
    "ami",
    "rester"
  ],
  "hook": {
    "title": "Why People Take chez Where Buildings Take à",
    "content": "Before a person's name, profession, or stressed pronoun, French uses chez (from Latin casa 'house') to mean 'at/to someone's home or office': chez Marie, chez le docteur, chez moi, chez toi, chez nous!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How chez covers both 'at' and 'to'",
        "content": "Je suis chez moi ('I am at home') and Je vais chez moi ('I am going home') both use bare chez!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Building → au / à la; Person or Pronoun → chez",
    "content": "Pair chez with people, professions, and stressed pronouns.",
    "linguist_note": "Unstressed proclitic use of Latin casa reduced phonetically to Old French chies → modern chez /ʃe/.",
    "trap_note": "Never say *Je vais à Marie or *à chez moi — chez already means 'at/to the home of' all by itself!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each chez phrase with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "chez moi",
          "german": "at / to my home"
        },
        {
          "id": "p2",
          "english": "chez toi",
          "german": "at / to your place (informal)"
        },
        {
          "id": "p3",
          "english": "chez lui / chez elle",
          "german": "at / to his / her place"
        },
        {
          "id": "p4",
          "english": "chez nous",
          "german": "at our home / in our country"
        },
        {
          "id": "p5",
          "english": "chez le docteur",
          "german": "at / to the doctor's office"
        }
      ],
      "target_answer": "at / to my home, at / to your place (informal), at / to his / her place, at our home / in our country, at / to the doctor's office",
      "meaning": "chez moi, chez toi, chez lui / chez elle, chez nous, chez le docteur",
      "explanation": "chez pairs with stressed pronouns or people/professions.",
      "id": "fr1302_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I am staying at home tonight'?",
      "options": [
        "Je reste chez moi ce soir",
        "Je reste chez je ce soir",
        "Je reste à moi ce soir"
      ],
      "target_answer": "Je reste chez moi ce soir",
      "meaning": "I am staying at home tonight",
      "explanation": "chez + stressed pronoun moi = 'at my home'.",
      "id": "fr1302_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal historical meaning of 'On dîne chez Marie'?",
      "german": "On dîne chez Marie",
      "natural": "We're having dinner at Marie's",
      "options": [
        "We dine to Marie",
        "One dines at-the-house-of Marie",
        "We're having dinner at Marie's"
      ],
      "target_answer": "One dines at-the-house-of Marie",
      "meaning": "Literal structure: One dines at-the-house-of Marie",
      "explanation": "chez (from Latin casa) means 'at the house/place of'.",
      "id": "fr1302_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "are you going to the doctor's office today",
      "cues": [
        "Are you going → Tu vas",
        "to the doctor's office today → chez le docteur aujourd'hui"
      ],
      "idea_parts": [
        "subject + verb → Tu vas",
        "person-destination + time → chez le docteur aujourd'hui"
      ],
      "target_answer": "Tu vas chez le docteur aujourd'hui",
      "meaning": "Are you going to the doctor's office today?",
      "word_bank": [
        "vas",
        "aujourd'hui",
        "docteur",
        "la",
        "chez",
        "le",
        "au",
        "Tu"
      ],
      "explanation": "Because le docteur is a person, French uses chez le docteur rather than au.",
      "diagnosis": {
        "slip": "used au docteur",
        "cue": "People and professions take chez: chez le docteur."
      },
      "id": "fr1302_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je suis chez mon ami ce soir",
      "replays": 2,
      "target_answer": "Je suis chez mon ami ce soir",
      "meaning": "I am at my friend's place tonight",
      "cues": [
        "Je suis",
        "chez mon ami ce soir"
      ],
      "explanation": "chez mon ami = 'at my friend's home'.",
      "affirmation": "You used chez mon ami cleanly.",
      "id": "fr1302_e5"
    }
  ],
  "summary": {
    "outcome": "Use chez with names, professions, and stressed pronouns for 'at/to someone's place'.",
    "use_example": {
      "german": "Tu viens chez moi ou on va chez toi ?",
      "english": "Are you coming to my place or are we going to yours?"
    },
    "takeaway": "Places take au / à la; people take chez.",
    "curiosity_teaser": "Up next on Le Pont ([1303] The Partitive: du, de la & Negative de): see how Chez, the House Word leads directly into The Partitive: du, de la & Negative de."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Are you going to the doctor's office today\" in French:",
    "target_answer": "Tu vas chez le docteur aujourd'hui",
    "word_bank": [
      "pas",
      "le",
      "docteur",
      "aujourd'hui",
      "Tu",
      "vas",
      "ne",
      "chez"
    ],
    "explanation": "Re-constructing \"Tu vas chez le docteur aujourd'hui\" from the underlying rule cements the pattern of Chez, the House Word."
  }
};

export default lesson;
