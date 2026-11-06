import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 15,
  "slug": "numbers-and-four-twenties",
  "title": "Numbers & the Four-Twenties",
  "subtitle": "Counting 1–100, vigesimal quatre-vingts ('four score'), and expressing age as possession with avoir",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "vingt",
    "trente",
    "soixante",
    "quatre_vingts",
    "cent",
    "ans"
  ],
  "table_word_ids": [
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "vingt",
    "trente",
    "soixante",
    "quatre_vingts",
    "cent",
    "ans"
  ],
  "hook": {
    "title": "Why French Counts Like the Gettysburg Address",
    "content": "When Abraham Lincoln opened the Gettysburg Address with 'Four score and seven years ago', a 'score' meant twenty — so four score and seven was 4 × 20 + 7 = 87. Standard French still counts its 70s, 80s, and 90s using that ancient Celtic/Norman twenty-based (vigesimal) system! Up to sixty (soixante) everything is decimal. Then at 70, instead of inventing a new ten-word, French says soixante-dix ('sixty-ten'). At 80 it says quatre-vingts ('four-twenties'). And at 90 it says quatre-vingt-dix ('four-twenty-ten')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How every number from 1 to 10 hides inside English",
        "content": "un (unit), deux (duet/deuce), trois (trio/three), quatre (quartet), cinq (quintet), six (six), sept (September), huit (octopus/October), neuf (November), dix (decimal), vingt (vigesimal), cent (century/percent).",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "You Don't 'Be' Your Age in French — You 'Have' Your Years",
    "content": "In English you say 'I am thirty years old', treating age as an identity. In French, years are something you collect and carry in your pocket with avoir: J'ai trente ans (literally 'I have thirty years'). And you never drop the word ans ('years'): English can say 'I am thirty', but French always names the years: J'ai vingt ans, il a quarante ans.",
    "linguist_note": "Gaulish substratum counting by twenties (vigesimal) survived in Parisian French for 70–99, while Swiss and Belgian French regularized them to septante, huitante/octante, and nonante.",
    "trap_note": "The shortcut your mind will offer: saying *Je suis trente ans for 'I am thirty years old'. Age is possession in Romance: ALWAYS use avoir (J'ai trente ans)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each French number with its English cognate clue and value:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "cinq (quintet)",
          "german": "5"
        },
        {
          "id": "p2",
          "english": "huit (octagon)",
          "german": "8"
        },
        {
          "id": "p3",
          "english": "vingt (vigesimal)",
          "german": "20"
        },
        {
          "id": "p4",
          "english": "soixante-dix (sixty-ten)",
          "german": "70"
        },
        {
          "id": "p5",
          "english": "quatre-vingts (four-twenties)",
          "german": "80"
        }
      ],
      "target_answer": "5, 8, 20, 70, 80",
      "meaning": "cinq (quintet), huit (octagon), vingt (vigesimal), soixante-dix (sixty-ten), quatre-vingts (four-twenties)",
      "explanation": "70 adds dix onto soixante; 80 multiplies quatre × vingt.",
      "id": "fr15_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'J'ai trente ans'?",
      "german": "J'ai trente ans",
      "natural": "I am thirty years old",
      "options": [
        "I am thirty years old",
        "I have thirty years",
        "I am thirty of years"
      ],
      "target_answer": "I have thirty years",
      "meaning": "Literal structure: I have thirty years",
      "explanation": "French expresses age as possession with avoir: J'ai trente ans ('I have thirty years').",
      "id": "fr15_e2"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French cent ('100') and ans ('years') combine inside which English word for a 100-year period?",
      "target_answer": "century",
      "meaning": "century / centennial ↔ cent (100)",
      "explanation": "Latin centum ('hundred') gave French cent and English century / percent.",
      "id": "fr15_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "my brother is twenty years old",
      "cues": [
        "My brother → Mon frère",
        "has twenty years → a vingt ans (use avoir, not est!)"
      ],
      "idea_parts": [
        "subject → Mon frère",
        "verb of age → a (has)",
        "number + years → vingt ans"
      ],
      "target_answer": "Mon frère a vingt ans",
      "meaning": "My brother is twenty years old",
      "word_bank": [
        "vingt",
        "frère",
        "ans",
        "trente",
        "a",
        "Mon",
        "est"
      ],
      "explanation": "Mon frère a vingt ans uses il a ('has') + vingt ans.",
      "diagnosis": {
        "slip": "used est instead of a for age",
        "cue": "Age uses avoir: Mon frère a vingt ans."
      },
      "id": "fr15_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "J'ai trente ans aujourd'hui",
      "replays": 2,
      "target_answer": "J'ai trente ans aujourd'hui",
      "meaning": "I am thirty years old today",
      "cues": [
        "I have: J'ai",
        "thirty years: trente ans",
        "today: aujourd'hui"
      ],
      "explanation": "trente ans links with a /t/ liaison (/tʁɑ̃.t‿ɑ̃/).",
      "affirmation": "You used J'ai + ans and spelled aujourd'hui with its apostrophe.",
      "id": "fr15_e5"
    }
  ],
  "summary": {
    "outcome": "Count from 1 to 100 including vigesimal 70–99, and state ages using avoir + ans.",
    "use_example": {
      "german": "Mon père a soixante ans et j'ai trente ans.",
      "english": "My father is sixty and I am thirty."
    },
    "takeaway": "80 is four-twenties (quatre-vingts), and you always 'have' your years (j'ai X ans).",
    "curiosity_teaser": "Up next on Le Pont ([1501] Counting Cognates Gym): see how Numbers & the Four-Twenties leads directly into Counting Cognates Gym."
  },
  "twist": {
    "prompt": "Ungraded — ask a friend 'How old are you?' (literally 'Which age have you?' using Quel âge):",
    "target_answer": "Tu as quel âge",
    "word_bank": [
      "es",
      "Tu",
      "quel",
      "as",
      "quelle",
      "âge"
    ],
    "explanation": "Because you 'have' your age, 'How old are you?' is Tu as quel âge ? (or Quel âge as-tu ?)."
  },
  "foreshadow": {
    "line": "Having mastered Numbers & the Four-Twenties, look ahead to Topic 16 (Days, Months & Dates), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 16
  },
  "payoff": {
    "ofLesson": 14,
    "text": "The foundation from Topic 14 (Possessives Agree with the Thing) now pays off directly inside Numbers & the Four-Twenties: every sentence here builds on that earlier step."
  }
};

export default lesson;
