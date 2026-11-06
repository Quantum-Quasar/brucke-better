import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1003,
  "slug": "sprig-1003",
  "title": "Liaison & Silent Consonants: CaReFuL",
  "subtitle": "Why final consonants go silent except C, R, F, L — and wake up before a vowel in liaison (vous avez, les amis).",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "vous",
    "avez",
    "êtes",
    "nous",
    "avons",
    "sont",
    "ami",
    "hôtel",
    "ans",
    "bon"
  ],
  "table_word_ids": [
    "vous",
    "avez",
    "êtes",
    "nous",
    "avons",
    "sont",
    "ami",
    "hôtel",
    "ans",
    "bon"
  ],
  "hook": {
    "title": "The Sleeping Consonant at the End of the Word",
    "content": "Use the English word CaReFuL! If a French word ends in C, R, F, or L (avec, hiver, neuf, hôtel), you usually pronounce that final consonant. If it ends in S, T, D, X, Z, P, N (vous, est, grand, deux, voulez), that final letter sleeps — until the very next word starts with a vowel and wakes it up in liaison!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Three Liaison Sounds: S/X → /z/, T/D → /t/, N → /n/",
        "content": "When a consonant wakes up before a vowel: S and X buzz like /z/ (vous‿avez, deux‿ans), T and D tap like /t/ (c'est‿un ami, grand‿hôtel), and N links as /n/ (un‿ami, mon‿ami)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "CaReFuL Finals Stay Awake; S/X, T/D, N Wake Before Vowels",
    "content": "Listen for the consonant bridge jumping across the space onto the next vowel-initial word.",
    "linguist_note": "Word-final consonants survived before vowel-initial words within the same phonological phrase (liaison).",
    "trap_note": "Never pronounce S or X as /s/ in liaison — it ALWAYS buzzes as voiced /z/ (vous‿avez /vu.za.ve/)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each linked phrase with its liaison sound:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "vous‿avez / les‿amis (S before vowel)",
          "german": "/z/ buzz"
        },
        {
          "id": "p2",
          "english": "deux‿ans / six‿heures (X before vowel)",
          "german": "/z/ buzz"
        },
        {
          "id": "p3",
          "english": "c'est‿important (T before vowel)",
          "german": "/t/ tap"
        },
        {
          "id": "p4",
          "english": "un‿ami / mon‿hôtel (N before vowel)",
          "german": "/n/ link"
        }
      ],
      "target_answer": "/z/ buzz, /z/ buzz, /t/ tap, /n/ link",
      "meaning": "vous‿avez / les‿amis (S before vowel), deux‿ans / six‿heures (X before vowel), c'est‿important (T before vowel), un‿ami / mon‿hôtel (N before vowel)",
      "explanation": "S/X → /z/, T/D → /t/, N → /n/.",
      "id": "fr1003_e1"
    },
    {
      "type": "shift_select",
      "prompt": "In 'deux ans' ('two years'), how is the final -x of 'deux' pronounced before 'ans'?",
      "options": [
        "Like /z/ (/dø.z‿ɑ̃/)",
        "Completely silent (/dø ɑ̃/)",
        "Like /ks/ (/døks ɑ̃/)"
      ],
      "target_answer": "Like /z/ (/dø.z‿ɑ̃/)",
      "meaning": "X wakes up as /z/ before a vowel in liaison",
      "explanation": "Both S and X turn into voiced /z/ before a vowel.",
      "id": "fr1003_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Which word below pronounces its final consonant even when standing alone (the CaReFuL rule)?",
      "options": [
        "grand (ends in D)",
        "neuf (ends in F)",
        "vous (ends in S)"
      ],
      "target_answer": "neuf (ends in F)",
      "meaning": "F is in CaReFuL, so neuf (/nœf/) pronounces its final f",
      "explanation": "C, R, F, L are usually pronounced at the end of a word.",
      "id": "fr1003_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you have two friends here (polite vous)",
      "cues": [
        "You have → Vous avez",
        "two friends here → deux amis ici"
      ],
      "idea_parts": [
        "polite subject + verb → Vous avez",
        "number + noun + place → deux amis ici"
      ],
      "target_answer": "Vous avez deux amis ici",
      "meaning": "You have two friends here",
      "word_bank": [
        "Tu",
        "Vous",
        "avez",
        "amis",
        "ici",
        "deux",
        "as"
      ],
      "explanation": "Both Vous‿avez and deux‿amis link with a /z/ buzz.",
      "diagnosis": {
        "slip": "used Tu as instead of Vous avez",
        "cue": "Use Vous avez deux amis ici."
      },
      "id": "fr1003_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est un bon hôtel",
      "replays": 2,
      "target_answer": "C'est un bon hôtel",
      "meaning": "It is a good hotel",
      "cues": [
        "C'est un (/sɛ.t‿œ̃/)",
        "bon hôtel (/bɔ.n‿o.tɛl/)"
      ],
      "explanation": "Double liaison: c'est‿un and bon‿hôtel.",
      "affirmation": "You heard the linked words and wrote C'est un bon hôtel cleanly.",
      "id": "fr1003_e5"
    }
  ],
  "summary": {
    "outcome": "Apply the CaReFuL rule for final consonants and produce /z/, /t/, and /n/ liaisons before vowels.",
    "use_example": {
      "german": "Vous avez un bon ami à l'hôtel.",
      "english": "You have a good friend at the hotel."
    },
    "takeaway": "Final consonants sleep unless they are CaReFuL — or unless the next word's vowel wakes them up.",
    "curiosity_teaser": "Up next on Le Pont ([11] Adjectives & the Silent -s): see how Liaison & Silent Consonants: CaReFuL leads directly into Adjectives & the Silent -s."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"You have two friends here\" in French:",
    "target_answer": "Vous avez deux amis ici",
    "word_bank": [
      "ici",
      "deux",
      "Vous",
      "ne",
      "pas",
      "amis",
      "avez"
    ],
    "explanation": "Re-constructing \"Vous avez deux amis ici\" from the underlying rule cements the pattern of Liaison & Silent Consonants: CaReFuL."
  }
};

export default lesson;
