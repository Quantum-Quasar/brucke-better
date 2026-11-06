import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1401,
  "slug": "sprig-1401",
  "title": "The Trap Named",
  "subtitle": "mon frère / ma sœur, son frère ('his OR her brother'), and mon before feminine vowels (mon opinion).",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "mon",
    "ma",
    "mes",
    "ton",
    "son",
    "sa",
    "père",
    "mère",
    "frère",
    "sœur",
    "opinion",
    "histoire",
    "ami"
  ],
  "table_word_ids": [
    "mon",
    "ma",
    "mes",
    "ton",
    "son",
    "sa",
    "père",
    "mère",
    "frère",
    "sœur",
    "opinion",
    "histoire",
    "ami"
  ],
  "hook": {
    "title": "Why 'Her Brother' Is son frère and 'My Opinion' Is mon opinion",
    "content": "Trap 1: son/sa/ses agrees with the thing owned, never the owner — so 'her brother' is son frère (masculine!) and 'his sister' is sa sœur (feminine!). Trap 2: Before ANY feminine noun starting with a vowel or mute H (opinion, histoire, université, amie), ma/ta/sa switch to mon/ton/son to prevent a vowel crash: mon opinion, ton histoire, son amie!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How liaison makes mon opinion sound smooth",
        "content": "In mon‿opinion (/mɔ̃.nɔ.pi.njɔ̃/), the final /n/ of mon jumps onto opinion as a clean consonant bridge!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Ignore the Owner's Gender, and Use mon/ton/son Before ANY Vowel",
    "content": "Check the word right after the possessive for vowel/mute-H first, then gender.",
    "linguist_note": "Prevocalic feminine mon/ton/son avoids hiatus before vowel-initial feminine nouns.",
    "trap_note": "Never write *ma amie, *ma opinion, or *sa histoire — vowel-initial feminine nouns ALWAYS take mon, ton, son!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English phrase with its correct French possessive:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "her brother (frère is masculine!)",
          "german": "son frère"
        },
        {
          "id": "p2",
          "english": "his sister (sœur is feminine!)",
          "german": "sa sœur"
        },
        {
          "id": "p3",
          "english": "my opinion (feminine, starts with vowel!)",
          "german": "mon opinion"
        },
        {
          "id": "p4",
          "english": "your story (feminine, mute H!)",
          "german": "ton histoire"
        },
        {
          "id": "p5",
          "english": "his / her house (maison is feminine)",
          "german": "sa maison"
        }
      ],
      "target_answer": "son frère, sa sœur, mon opinion, ton histoire, sa maison",
      "meaning": "her brother (frère is masculine!), his sister (sœur is feminine!), my opinion (feminine, starts with vowel!), your story (feminine, mute H!), his / her house (maison is feminine)",
      "explanation": "Look only at the noun owned — and use mon/ton/son before any vowel or mute H.",
      "id": "fr1401_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'my female friend' (amie, feminine starting with a vowel)?",
      "options": [
        "mon amie",
        "ma amie",
        "m'amie"
      ],
      "target_answer": "mon amie",
      "meaning": "my (female) friend",
      "explanation": "Before a vowel, ma switches to mon: mon amie!",
      "id": "fr1401_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Paul is talking about his mother (la mère), and Marie is talking about her father (le père). Which pair is right?",
      "options": [
        "sa mère / sa père",
        "sa mère / son père",
        "son mère / sa père"
      ],
      "target_answer": "sa mère / son père",
      "meaning": "his mother (sa mère) / her father (son père)",
      "explanation": "mère is feminine (sa mère); père is masculine (son père).",
      "id": "fr1401_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "it is my opinion and it is her story",
      "cues": [
        "It is my opinion → C'est mon opinion",
        "and it is her story → et c'est son histoire"
      ],
      "idea_parts": [
        "first clause → C'est mon opinion",
        "second clause → et c'est son histoire"
      ],
      "target_answer": "C'est mon opinion et c'est son histoire",
      "meaning": "It is my opinion and it is her story",
      "word_bank": [
        "histoire",
        "c'est",
        "mon",
        "ma",
        "sa",
        "opinion",
        "son",
        "C'est",
        "et"
      ],
      "explanation": "Both opinion and histoire take mon/son because they start with a vowel/mute H!",
      "diagnosis": {
        "slip": "used ma or sa",
        "cue": "Use mon opinion and son histoire."
      },
      "id": "fr1401_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Elle cherche son frère et son père",
      "replays": 2,
      "target_answer": "Elle cherche son frère et son père",
      "meaning": "She is looking for her brother and her father",
      "cues": [
        "Elle cherche",
        "son frère et son père"
      ],
      "explanation": "Both frère and père are masculine, so 'her' is son for both.",
      "affirmation": "You kept son before both masculine nouns!",
      "id": "fr1401_e5"
    }
  ],
  "summary": {
    "outcome": "Master son/sa agreement with the possessed noun and mon/ton/son before vowel-initial feminine nouns.",
    "use_example": {
      "german": "C'est mon idée, mon opinion et mon histoire.",
      "english": "It is my idea, my opinion, and my story."
    },
    "takeaway": "Ignore the owner's gender, and use mon/ton/son before every vowel.",
    "curiosity_teaser": "Up next on Le Pont ([1402] Famille Gym): see how The Trap Named leads directly into Famille Gym."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"It is my opinion and it is her story\" in French:",
    "target_answer": "C'est mon opinion et c'est son histoire",
    "word_bank": [
      "histoire",
      "son",
      "pas",
      "opinion",
      "C'est",
      "et",
      "mon",
      "ne",
      "c'est"
    ],
    "explanation": "Re-constructing \"C'est mon opinion et c'est son histoire\" from the underlying rule cements the pattern of The Trap Named."
  }
};

export default lesson;
