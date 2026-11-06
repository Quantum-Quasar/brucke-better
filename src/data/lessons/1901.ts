import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1901,
  "slug": "sing-sang-sung-mirrors",
  "title": "sing/sang/sung Mirrors",
  "subtitle": "Map ten English irregulars onto their German ablauf pairs",
  "phase": 3,
  "shift_categories": [
    "strong_verbs_ablaut"
  ],
  "word_ids": [
    "singen",
    "trinken",
    "finden",
    "geben",
    "nehmen",
    "fahren",
    "sprechen",
    "kommen",
    "schreiben",
    "schlafen"
  ],
  "table_word_ids": [
    "singen",
    "trinken",
    "geben",
    "sprechen",
    "fahren",
    "schreiben",
    "finden",
    "nehmen",
    "kommen",
    "schlafen",
    "natürlich",
    "gefährlich",
    "rucksack",
    "eigentlich",
    "verwandte",
    "hauptbahnhof"
  ],
  "hook": {
    "title": "Ten Mirrors on the Wall",
    "content": "You have heard the melody in pairs. Today is the gallery: ten English irregular verbs hung beside their German twins, class by class. sing ↔ singen. drink ↔ trinken. find ↔ finden. give ↔ geben. speak ↔ sprechen. come ↔ kommen. schreiben's English kin is the scribe family (scribe, describe, script). drive ↔ treiben. fare ↔ fahren. sleep ↔ schlafen (sleep/slept ↔ schlafen/schlief — the vowels drift but the CLASS is identical). Stand in front of each pair and the recognition does the memorizing: the melody is not similar. It is the same.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Class Map",
        "content": "Proto-Germanic sorted strong verbs into seven classes by their vowel melody. English forgot the numbering; German grammars keep it. You only need the echoes: i-a-u (sing), ei-ie-ie (schreiben), a-u (fahren). When an English verb and a German verb share a class, they share a history."
      }
    ]
  },
  "pattern": {
    "title": "The Gallery Walk",
    "content": "Walk it: singen, sang, gesungen ↔ sing, sang, sung. trinken, trank, getrunken ↔ drink, drank, drunk. finden, fand, gefunden ↔ find, found. geben, gab, gegeben ↔ give, gave, given. kommen, kam, gekommen ↔ come, came (the vowel wandered, the class held). schreiben, schrieb, geschrieben ↔ describe, described (scribe family). fahren, fuhr, gefahren ↔ fare, fared. schlafen, schlief, geschlafen ↔ sleep, slept. Ten frames, one artist — the melody is the same artist in every language.",
    "footnotes": [],
    "linguist_note": "schlafen/schlief ↔ sleep/slept is the cleanest proof that classes are inherited, not coincidence: the consonants match, the vowels follow the same class drift, and neither language arranged this on purpose."
  },
  "exercises": [
    {
      "id": "l1901_e1",
      "type": "matching_pairs",
      "prompt": "Gallery wall one — match the melodies:",
      "matching_pairs": [
        {
          "id": "sg1",
          "english": "speak / spoke / spoken",
          "german": "sprechen / sprach / gesprochen"
        },
        {
          "id": "sg2",
          "english": "come / came / come",
          "german": "kommen / kam / gekommen"
        },
        {
          "id": "sg3",
          "english": "describe (scribe family)",
          "german": "schreiben / schrieb / geschrieben"
        },
        {
          "id": "sg4",
          "english": "sleep / slept",
          "german": "schlafen / schlief"
        }
      ],
      "target_answer": "sprechen / sprach / gesprochen, kommen / kam / gekommen, schreiben / schrieb / geschrieben, schlafen / schlief",
      "meaning": "the speak, come, scribe, sleep melodies",
      "explanation": "Same classes, same vowels, same history — the gallery wall of shared inheritance."
    },
    {
      "id": "l1901_e2",
      "type": "shift_select",
      "prompt": "Which English verb family is the true relative of 'schreiben / schrieb / geschrieben'?",
      "options": [
        "describe / described (scribe family)",
        "ride / rode",
        "write / wrote",
        "drive / drove"
      ],
      "target_answer": "describe / described (scribe family)",
      "meaning": "schreiben belongs to the scribe family, not write's family",
      "explanation": "schreiben is Latin scribere Germanicized — its English relatives are scribe, describe, script. Write/wrote is an unrelated native word."
    },
    {
      "id": "l1901_e3",
      "type": "derive",
      "prompt": "Sing it: 'kommen' in the er-past →",
      "english_hint": "come / came — the same wander",
      "target_answer": "kam",
      "meaning": "er kam = he came",
      "explanation": "kommen, kam, gekommen ↔ come, came, come — the vowel moved in both languages, the class never moved."
    },
    {
      "id": "l1901_e4",
      "type": "spoken_turn_reply",
      "prompt": "Answer the question in the conversational past:",
      "spoken_question": "Was hast du gestern gemacht?",
      "question_meaning": "What did you do yesterday?",
      "reply_idea": "Reply that you slept yesterday.",
      "cues": [
        "Open with Ich habe...",
        "Place gestern in the middle and geschlafen at the end of the bracket."
      ],
      "word_bank": [
        "habe",
        "gestern",
        "Ich",
        "gemacht",
        "geschlafen",
        "war"
      ],
      "target_answer": "Ich habe gestern geschlafen",
      "meaning": "I slept yesterday",
      "explanation": "haben sits in position two while the strong participle geschlafen closes the sentence bracket."
    },
    {
      "id": "l1901_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'We spoke German yesterday'",
      "target_answer": "Wir haben gestern Deutsch gesprochen",
      "meaning": "We spoke German yesterday",
      "word_bank": [
        "Wir",
        "aber",
        "gestern",
        "haben",
        "den",
        "gesprochen",
        "Deutsch"
      ],
      "explanation": "Strong participle gesprochen closes the bracket — sprechen, sprach, gesprochen ↔ speak, spoke, spoken."
    }
  ],
  "summary": {
    "outcome": "Map ten English irregulars to their German ablauf twins by class.",
    "use_example": {
      "german": "Wir haben gestern Deutsch gesprochen.",
      "english": "We spoke German yesterday."
    },
    "takeaway": "The irregular verbs are not lists — they are ten mirrors of one Germanic melody system.",
    "curiosity_teaser": "Next: Ablaut Families I — the e→i and a→o classes drilled with geben, sprechen and fahren."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"We sing here today\"",
    "target_answer": "Wir singen heute hier",
    "word_bank": [
      "sehr",
      "singen",
      "Wir",
      "nicht",
      "heute",
      "hier"
    ],
    "explanation": "Building \"Wir singen heute hier\" from the lesson's core pattern locks in sing/sang/sung Mirrors."
  }
};

export default lesson;
