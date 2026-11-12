import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 22,
  "slug": "gender-heuristics-suffix-clues",
  "title": "Gender Heuristics & Suffix Clues",
  "subtitle": "Decode gender instead of memorizing: -ung is feminine, -chen is neuter, -er is masculine",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "wahrnehmung",
    "begriff",
    "zeit",
    "woche",
    "straße",
    "tochter",
    "butter",
    "warnen",
    "zeitung",
    "berg",
    "geburtstag",
    "feiern",
    "flugzeug",
    "briefmarke"
  ],
  "table_word_ids": [
    "wahrnehmung",
    "straße",
    "woche",
    "butter",
    "tochter",
    "zeit",
    "begriff",
    "warnen",
    "zeitung",
    "berg",
    "geburtstag",
    "feiern",
    "flugzeug",
    "briefmarke",
    "vermissen",
    "handtasche"
  ],
  "hook": {
    "title": "The Suffix Tells You",
    "content": "You were told gender is arbitrary. Mostly false: German gender is written on the word's tail. Endings in -ung, -heit, -keit, -schaft, -ion are feminine — die Wahrnehmung (perception), die Zeitung (newspaper, 'a timing'). -chen and -lein are neuter, no exceptions — das Mädchen ('the little girl', the famous paradox). Nouns built from verbs with -er are masculine — der Staubsauger, the dust-sucker. Most plain -e nouns are feminine — die Straße, die Woche, die Lampe. Learn a dozen suffix laws and you can guess the gender of thousands of words you have never seen.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Das Mädchen, the Famous Paradox",
        "content": "Mädchen ('little maid') ends in the diminutive -chen, and -chen words are ALWAYS neuter — so the girl is grammatically an 'it'. The suffix outranks the sex: die Magd + chen → das Mädchen. The same law makes das Fräulein neuter."
      }
    ]
  },
  "pattern": {
    "title": "The Suffix Court",
    "content": "Feminine squad: -ung (die Zeitung, die Wahrnehmung — built from verbs!), -heit, -keit (die Gesundheit — health), -schaft (die Wissenschaft — knowledge-ship, science), -ion (die Nation), and most -e (die Straße, die Woche, die Lampe). Masculine squad: -er from verbs (der Sauger, der Fernseher), -ling (der Zwilling!), -ismus (der Tourismus). Neuter squad: -chen, -lein (das Mädchen, das Fräulein), and all -zeug words (das Feuerzeug — the -zeug law you know from the compounds). Collect the suffixes and every new word arrives pre-gendered.",
    "footnotes": [],
    "linguist_note": "These suffixes are the app's compendium in miniature: Wahrnehmung is the calque of Latin perceptio (truth-taking), Begriff the calque of conceptus (by-grip) — the abstract suffixes rode in with the Latin calques and kept their gender accordingly."
  },
  "exercises": [
    {
      "id": "l22_e1",
      "type": "shift_select",
      "prompt": "Look past noun endings: which pair has a different connection?",
      "options": [
        "what → was",
        "speak → sprechen",
        "two → zwei",
        "better → besser"
      ],
      "target_answer": "speak → sprechen",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Two, better and what use T → S/SS/Z. Speak → sprechen uses K → CH."
    },
    {
      "id": "l22_e2",
      "type": "derive",
      "prompt": "Run the factory: build the -ung noun from 'warnen' (the act of warning):",
      "english_hint": "warn + ung",
      "target_answer": "Warnung",
      "meaning": "die Warnung — the warning",
      "explanation": "warnen → Warnung: chop the verb's -en, glue -ung, collect the feminine article for free."
    },
    {
      "id": "l22_e3",
      "type": "shift_select",
      "prompt": "The famous paradox: why is 'das Mädchen' (the girl) neuter?",
      "options": [
        "Mädchen is a foreign loanword",
        "Girls were grammatically minor historically",
        "It is a spelling mistake that stuck",
        "The suffix -chen is ALWAYS neuter — it outranks the meaning"
      ],
      "target_answer": "The suffix -chen is ALWAYS neuter — it outranks the meaning",
      "meaning": "The -chen law beats the sex of the referent",
      "explanation": "die Magd + -chen → das Mädchen. Suffix laws are the one place German gender is perfectly predictable — das Flugzeug obeys -zeug, and der Geburtstag carries Tag's masculine law into the compound."
    },
    {
      "id": "l22_e4",
      "type": "matching_pairs",
      "prompt": "Match each suffix with its gender law. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "gh1",
          "english": "-ung",
          "german": "feminine — die Zeitung"
        },
        {
          "id": "gh2",
          "english": "-chen",
          "german": "neuter — das Mädchen"
        },
        {
          "id": "gh3",
          "english": "-er agent nouns",
          "german": "masculine — der Staubsauger"
        },
        {
          "id": "gh4",
          "english": "plain -e (mostly)",
          "german": "feminine — die Straße, die Briefmarke"
        },
        {
          "id": "recall1",
          "german": "ein Zahn",
          "english": "a tooth"
        },
        {
          "id": "recall2",
          "german": "Wir können feiern und singen",
          "english": "We can celebrate and sing"
        },
        {
          "id": "recall3",
          "german": "das Flugzeug",
          "english": "the aeroplane"
        },
        {
          "id": "recall4",
          "german": "die Wahrnehmung",
          "english": "perception"
        },
        {
          "id": "recall5",
          "german": "der Begriff",
          "english": "the concept"
        },
        {
          "id": "spaced1",
          "german": "mein Heimweh",
          "english": "my homesickness"
        }
      ],
      "target_answer": "feminine — die Zeitung, neuter — das Mädchen, masculine — der Staubsauger, feminine — die Straße, die Briefmarke, ein Zahn, Wir können feiern und singen, das Flugzeug, die Wahrnehmung, der Begriff, mein Heimweh",
      "meaning": "-ung; -chen; -er agent nouns; plain -e (mostly); a tooth; We can celebrate and sing; the aeroplane; perception; the concept; my homesickness",
      "explanation": "Four laws cover thousands of nouns — guess first, verify later."
    },
    {
      "id": "l22_e5",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're describing your morning scene: the woman reads the newspaper",
      "cues": [
        "Two feminine flags on show: die Frau (plain -e law) and die Zeitung (-ung factory) — and lesen mutates: sie liest"
      ],
      "target_answer": "Die Frau liest die Zeitung",
      "meaning": "The woman reads the newspaper",
      "vocab_hints": [
        {
          "word": "liest",
          "translation": "reads (er/sie form)",
          "note": "lesen → er liest — the vowel mutates like geben → gibt"
        },
        {
          "word": "die Zeitung",
          "translation": "the newspaper",
          "note": "Zeit + ung — 'a timing' — built by the feminine -ung factory"
        }
      ],
      "word_bank": [
        "die",
        "liest",
        "Frau",
        "Zeitung",
        "feiern",
        "Die",
        "lesen"
      ],
      "explanation": "Two feminine flags in one sentence: die Frau (plain -e law) and die Zeitung (-ung law)."
    }
  ],
  "summary": {
    "outcome": "Predict gender from suffixes: -ung/-heit/-e feminine, -chen neuter, -er/-ling masculine.",
    "use_example": {
      "german": "Die Frau liest die Zeitung.",
      "english": "The woman reads the newspaper."
    },
    "takeaway": "Gender is written on the tail: learn the suffix court and new nouns arrive pre-gendered.",
    "curiosity_teaser": "Next: the feminine squad — -ung, -heit, -keit drills: derive abstract nouns and their genders."
  },
  "twist": {
    "prompt": "She quit the news: negate the noun — the woman reads the newspaper becomes the woman reads NO newspaper. (The -ung law still holds.)",
    "target_answer": "Die Frau liest keine Zeitung",
    "word_bank": [
      "liest",
      "Zeitung",
      "kein",
      "Frau",
      "Die",
      "keine"
    ],
    "explanation": "Zeitung is feminine (-ung law), so kein takes its feminine dress: keine. The suffix decided the gender — and the negation followed it."
  }
};

export default lesson;
