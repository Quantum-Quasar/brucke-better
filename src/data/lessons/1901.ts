import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1901,
  "slug": "sing-sang-sung-mirrors",
  "title": "sing/sang/sung Mirrors",
  "subtitle": "Practise German Ablaut forms with familiar English clues",
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
    "title": "Familiar Clues, German Forms",
    "content": "Start with sing, sang, sung — then say singen, sang, gesungen. Try drink, drank, drunk beside trinken, trank, getrunken. English can give you a foothold, but learn each German verb's own forms. Schreiben has a different kind of clue: scribe, describe and script help you remember its meaning. Describe is regular in English; the German forms are schreiben, schrieb, geschrieben.",
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
    "content": "Read each German set aloud: singen, sang, gesungen; trinken, trank, getrunken; finden, fand, gefunden; geben, gab, gegeben; sprechen, sprach, gesprochen; kommen, kam, gekommen. Then try fahren, fuhr, gefahren; schlafen, schlief, geschlafen; nehmen, nahm, genommen; schreiben, schrieb, geschrieben. Some English forms echo the vowel change; others only help with the meaning. Do not copy an English past-tense ending onto the German verb.",
    "footnotes": [],
    "linguist_note": "Use English as a memory clue, not as a rule for predicting every German vowel. Say the infinitive, simple past and participle together."
  },
  "exercises": [
    {
      "id": "l1901_e1",
      "type": "matching_pairs",
      "prompt": "Match the English clues to the German forms:",
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
      "meaning": "German forms for speaking, coming, writing and sleeping",
      "explanation": "The clues help you remember the German forms. Describe belongs to the scribe family, but is a regular English verb — not a shared vowel melody."
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
    "outcome": "Recall German Ablaut forms using English clues where they help.",
    "use_example": {
      "german": "Wir haben gestern Deutsch gesprochen.",
      "english": "We spoke German yesterday."
    },
    "takeaway": "Practise each German verb as a set: infinitive, simple past and participle. An English connection is a clue, not a guarantee of matching vowels.",
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
