import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1201,
  "slug": "sprig-1201",
  "title": "Amble & Go",
  "subtitle": "The ambulāre etymology; vais, vas, va, allons, allez in motion drills.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "aller",
    "je_vais",
    "vas",
    "va",
    "allons",
    "allez",
    "on",
    "où",
    "gare",
    "train"
  ],
  "table_word_ids": [
    "aller",
    "je_vais",
    "vas",
    "va",
    "allons",
    "allez",
    "on",
    "où",
    "gare",
    "train"
  ],
  "hook": {
    "title": "Why aller Has Two Ancient Families Inside One Verb",
    "content": "Singular je vais (/vɛ/), tu vas (/va/), il/elle/on va (/va/) come from Latin vādere ('to advance'), while aller, nous allons (/alɔ̃/), and vous allez (/ale/) come from Latin ambulāre ('to walk/amble', root of English amble and ambulance)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'ambulance' is a cousin of aller",
        "content": "A field hospital that walked along with the French army was called a 'walking hospital' (hôpital ambulant, from ambulāre)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Going Somewhere: aller + au / à la / à l' / chez",
    "content": "Use vais, vas, va, allons, allez with destinations.",
    "linguist_note": "Suppletion in Romance 'go' (vādere + ambulāre) is shared across French and Italian.",
    "trap_note": "Don't say *je va or *tu vais: je takes vais (-ai-), while tu vas and il/on va both sound like /va/!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each subject with its present-tense form of aller:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "je (I go)",
          "german": "vais (/vɛ/)"
        },
        {
          "id": "p2",
          "english": "tu (you go, informal)",
          "german": "vas (/va/)"
        },
        {
          "id": "p3",
          "english": "il / elle / on (goes / we go)",
          "german": "va (/va/)"
        },
        {
          "id": "p4",
          "english": "nous (we go — ambulāre)",
          "german": "allons (/alɔ̃/)"
        },
        {
          "id": "p5",
          "english": "vous (you go — ambulāre)",
          "german": "allez (/ale/)"
        }
      ],
      "target_answer": "vais (/vɛ/), vas (/va/), va (/va/), allons (/alɔ̃/), allez (/ale/)",
      "meaning": "je (I go), tu (you go, informal), il / elle / on (goes / we go), nous (we go — ambulāre), vous (you go — ambulāre)",
      "explanation": "Singular uses the v- stem; plural uses the regular all- stem.",
      "id": "fr1201_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "The all- stem of French aller / allons (from Latin ambulāre 'to walk') hides inside which English word for a leisurely walk?",
      "target_answer": "amble",
      "meaning": "amble / ambulance ↔ aller",
      "explanation": "Latin ambulāre gave English amble/ambulance and French aller.",
      "id": "fr1201_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you ask a friend 'Where are you going?'",
      "options": [
        "Où est-ce que tu vais",
        "Où est-ce que tu vas",
        "Où est-ce que tu aller"
      ],
      "target_answer": "Où est-ce que tu vas",
      "meaning": "Where are you going?",
      "explanation": "tu pairs with vas (/va/).",
      "id": "fr1201_e3"
    },
    {
      "id": "fr1201_e4",
      "type": "spoken_turn_reply",
      "prompt": "Answer the question in the negative using ne ... pas:",
      "spoken_question": "Est-ce que tu parles allemand ?",
      "question_meaning": "Do you speak German?",
      "reply_idea": "Reply that you do not speak German.",
      "cues": [
        "Begin with Je ne parle pas...",
        "Add allemand at the end."
      ],
      "word_bank": [
        "ne",
        "oui",
        "français",
        "Je",
        "parle",
        "allemand",
        "pas"
      ],
      "target_answer": "Je ne parle pas allemand",
      "meaning": "I do not speak German",
      "explanation": "French wraps ne and pas tightly around the conjugated verb parle."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je vais au cinéma avec mon ami",
      "replays": 2,
      "target_answer": "Je vais au cinéma avec mon ami",
      "meaning": "I am going to the cinema with my friend",
      "cues": [
        "Je vais au cinéma",
        "avec mon ami"
      ],
      "explanation": "à + le cinéma fuses into au cinéma.",
      "affirmation": "You wrote Je vais au cinéma avec mon ami cleanly.",
      "id": "fr1201_e5"
    }
  ],
  "summary": {
    "outcome": "Conjugate aller across all persons (vais, vas, va, allons, allez) and pair it with destinations.",
    "use_example": {
      "german": "Où est-ce que vous allez ? — Nous allons à la gare.",
      "english": "Where are you going? — We are going to the station."
    },
    "takeaway": "je vais (/vɛ/), tu vas (/va/), il/on va (/va/), nous allons, vous allez.",
    "curiosity_teaser": "Up next on Le Pont ([1202] Future Gym): see how Amble & Go leads directly into Future Gym."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am going to the cinema with my friend\" in French:",
    "target_answer": "Je vais au cinéma avec mon ami",
    "word_bank": [
      "Je",
      "avec",
      "vais",
      "cinéma",
      "ami",
      "pas",
      "ne",
      "mon",
      "au"
    ],
    "explanation": "Re-constructing \"Je vais au cinéma avec mon ami\" from the underlying rule cements the pattern of Amble & Go."
  }
};

export default lesson;
