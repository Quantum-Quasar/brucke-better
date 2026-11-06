import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5111,
  "slug": "lesson-5111",
  "title": "Dormant Consonants Wake Up",
  "subtitle": "S→/z/ (vous avez, les amis), T→/t/ (c'est un), N→/n/ (un ami) — reading connected French speech.",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "vous",
    "avez",
    "êtes",
    "nous",
    "avons",
    "cest",
    "un",
    "ami",
    "ans",
    "on"
  ],
  "table_word_ids": [
    "vous",
    "avez",
    "êtes",
    "nous",
    "avons",
    "cest",
    "un",
    "ami",
    "ans",
    "on"
  ],
  "hook": {
    "title": "How Dormant Consonants Wake Up Across Word Boundaries",
    "content": "When a determiner, pronoun, or short verb is followed by a vowel inside the same phrase, its sleeping final consonant wakes up in liaison: S/X → /z/ (les‿amis, vous‿êtes), T/D → /t/ (c'est‿un ami, quand‿il arrive), and N → /n/ (un‿ami, on‿arrive)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'et' ('and') NEVER makes a liaison",
        "content": "The word et ('and') NEVER links its final -t onto the next word — keeping et un (/e œ̃/) 100% distinct from est un (/ɛ.t‿œ̃/)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Hear the Resyllabification Across the Space",
    "content": "When a consonant links in liaison, it jumps across the space to start the next word: vous‿avez is pronounced 'vou-zavez' (/vu.za.ve/)!",
    "linguist_note": "Enchaînement and liaison resyllabify latent word-final consonants into the onset of a following vowel-initial syllable.",
    "trap_note": "Never pronounce the -t of et ('and') in liaison — et keeps its -t 100% silent everywhere!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each linked phrase with its spoken liaison sound:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "les‿amis / vous‿êtes (S before vowel)",
          "german": "/z/ sound: 'lé-zami / vou-zêt'"
        },
        {
          "id": "p2",
          "english": "c'est‿ici / quand‿il (T or D before vowel)",
          "german": "/t/ sound: 'cè-tici / kan-til'"
        },
        {
          "id": "p3",
          "english": "un‿ami / on‿arrive (N before vowel)",
          "german": "/n/ sound: 'un-nami / on-nariv'"
        },
        {
          "id": "p4",
          "english": "et il arrive (the word 'et')",
          "german": "NO liaison! (-t of et is always silent)"
        }
      ],
      "target_answer": "/z/ sound: 'lé-zami / vou-zêt', /t/ sound: 'cè-tici / kan-til', /n/ sound: 'un-nami / on-nariv', NO liaison! (-t of et is always silent)",
      "meaning": "les‿amis / vous‿êtes (S before vowel), c'est‿ici / quand‿il (T or D before vowel), un‿ami / on‿arrive (N before vowel), et il arrive (the word 'et')",
      "explanation": "S/X → /z/, T/D → /t/, N → /n/, and 'et' never links.",
      "id": "fr5111_e1"
    },
    {
      "type": "shift_select",
      "prompt": "In 'quand il arrive' ('when he arrives'), what sound does the final -d of 'quand' make in liaison before 'il'?",
      "options": [
        "A /z/ sound (/kɑ̃.z‿il/)",
        "A crisp /t/ sound (/kɑ̃.t‿il/)",
        "A /d/ sound (/kɑ̃.d‿il/)"
      ],
      "target_answer": "A crisp /t/ sound (/kɑ̃.t‿il/)",
      "meaning": "Final D devoices to /t/ when waking up in liaison!",
      "explanation": "In liaison, both T and D wake up as /t/: quand‿il (/kɑ̃.t‿il/).",
      "id": "fr5111_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Why does French forbid liaison after the word 'et' ('and')?",
      "options": [
        "Because 'et' ends in a vowel",
        "Because 'et' only appears at the end of a sentence",
        "Because the -t of 'et' is permanently silent, keeping 'et' distinct from 'est'"
      ],
      "target_answer": "Because the -t of 'et' is permanently silent, keeping 'et' distinct from 'est'",
      "meaning": "et (/e/) never links its t, whereas est (/ɛ/) links as /ɛ.t‿/ before a vowel.",
      "explanation": "et (/e/) never links its t, whereas est (/ɛ/) links as /ɛ.t‿/ before a vowel.",
      "id": "fr5111_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "we are arriving with a friend (using On arrive avec un ami)",
      "cues": [
        "We arrive → On arrive",
        "with a friend → avec un ami"
      ],
      "idea_parts": [
        "linked subject + verb → On arrive",
        "preposition + linked article + noun → avec un ami"
      ],
      "target_answer": "On arrive avec un ami",
      "meaning": "We are arriving with a friend",
      "word_bank": [
        "la",
        "un",
        "arrive",
        "ami",
        "avec",
        "On",
        "une"
      ],
      "explanation": "Both On‿arrive and un‿ami link with an /n/ sound.",
      "diagnosis": {
        "slip": "used une",
        "cue": "Use masculine un ami."
      },
      "id": "fr5111_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est un ami et il est très sympa",
      "replays": 2,
      "target_answer": "C'est un ami et il est très sympa",
      "meaning": "He is a friend and he is very nice",
      "cues": [
        "C'est un ami",
        "et il est très sympa"
      ],
      "explanation": "Hear the /t/ liaison in C'est‿un and the clean break after et.",
      "affirmation": "You heard the difference between linked C'est un and unlinked et il!",
      "id": "fr5111_e5"
    }
  ],
  "summary": {
    "outcome": "Hear and produce /z/, /t/, and /n/ liaisons across pronouns, articles, and verbs while keeping 'et' unlinked.",
    "use_example": {
      "german": "On arrive à huit heures avec nos amis.",
      "english": "We arrive at eight o'clock with our friends."
    },
    "takeaway": "S/X → /z/, T/D → /t/, N → /n/, and 'et' never links.",
    "curiosity_teaser": "Up next on Le Pont ([5112] H muet vs H aspiré): see how Dormant Consonants Wake Up leads directly into H muet vs H aspiré."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"We are arriving with a friend\" in French:",
    "target_answer": "On arrive avec un ami",
    "word_bank": [
      "pas",
      "On",
      "arrive",
      "ami",
      "avec",
      "ne",
      "un"
    ],
    "explanation": "Re-constructing \"On arrive avec un ami\" from the underlying rule cements the pattern of Dormant Consonants Wake Up."
  }
};

export default lesson;
