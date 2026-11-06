import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1603,
  "slug": "sich-and-the-lost-reflexives",
  "title": "sich & the Lost Reflexives",
  "subtitle": "hie thee hence, help yourself — the pronouns English dropped, German kept working",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "waschen",
    "erinnern",
    "freuen",
    "fühlen",
    "treffen",
    "uns",
    "verdienen",
    "beginnen",
    "bezahlen"
  ],
  "table_word_ids": [
    "waschen",
    "erinnern",
    "freuen",
    "fühlen",
    "treffen",
    "uns",
    "verdienen",
    "beginnen",
    "bezahlen",
    "fieber",
    "vielleicht",
    "fröhlich",
    "uniform",
    "einige",
    "angeln"
  ],
  "hook": {
    "title": "Hie Thee Hence",
    "content": "Shakespeare's English bounces actions back at the doer constantly: Get thee to a nunnery. Hie thee hence. Sit thee down. That thee is the reflexive pronoun doing its ancient job — and modern English keeps the fossils if you know where to look: help yourself, behave yourself, enjoy yourself. German never retired the system; it just standardized the pronoun: sich. ich wasche MICH, du wäschst DICH, er wäscht SICH, wir waschen UNS. The secret that makes it easy: the reflexive pronoun is just the ordinary pronoun from the Him-Case — except in the third person, where German deploys one all-purpose shape, sich, for he, she, it, they, and the formal Sie.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Feeling Verbs Are Reflexive by Birth",
        "content": "sich freuen (rejoice — froh, the frolic family) and sich fühlen (feel) have no object: the feeling lands on the feeler. German makes that visible with sich; English hides it inside the verb. Ich freue mich = I glad myself = I am glad."
      }
    ]
  },
  "pattern": {
    "title": "The Mirror Table",
    "content": "ich → mich (I wash myself: ich wasche mich). du → dich (thou thee! du wäschst dich). er/sie/es → sich. wir → uns. ihr → euch. sie (plural) → sich. Sie (formal) → sich. So only two new shapes exist: sich (third person + formal) and euch (ihr). Everything else you already drilled in the accusative gym. The stem-changer warning: waschen shifts a→ä in du and er — du wäschst dich, er wäscht sich. And reciprocal sich: Wir treffen uns — we meet (each other); Sie treffen sich — you (plural/formal) meet. Same pronoun, mutual action.",
    "footnotes": [],
    "linguist_note": "sich is the old dative/accusative reflexive *sik, shared with Old English (selfne / sīc in the Northumbrian glosses). English replaced it with self-phrases; Dutch and German kept the bare form. 'Himself' is literally the fossil: him + self, pronoun plus self glued together."
  },
  "exercises": [
    {
      "id": "l1603_e1",
      "type": "matching_pairs",
      "prompt": "The mirror table — match each reflexive sentence with its reading:",
      "matching_pairs": [
        {
          "id": "rf1",
          "english": "I wash myself",
          "german": "ich wasche mich"
        },
        {
          "id": "rf2",
          "english": "you wash yourself",
          "german": "du wäschst dich"
        },
        {
          "id": "rf3",
          "english": "he washes himself",
          "german": "er wäscht sich"
        },
        {
          "id": "rf4",
          "english": "we feel good",
          "german": "wir fühlen uns gut"
        },
        {
          "id": "rf5",
          "english": "to rejoice / be glad",
          "german": "sich freuen"
        }
      ],
      "target_answer": "ich wasche mich, du wäschst dich, er wäscht sich, wir fühlen uns gut, sich freuen",
      "meaning": "I wash myself, you wash yourself, he washes himself, we feel good, to rejoice",
      "explanation": "The reflexive is the ordinary accusative pronoun — except third person, where everyone shares sich. The factory verbs next door (verdienen, bezahlen, beginnen) carry no mirror: they act on the world, not the self."
    },
    {
      "id": "l1603_e2",
      "type": "shift_select",
      "prompt": "Third person shares one shape: 'Er freut _____.' (He is glad):",
      "options": [
        "mich",
        "sich",
        "uns",
        "dich"
      ],
      "target_answer": "sich",
      "meaning": "Er freut sich = he is glad (he rejoices himself)",
      "explanation": "er, sie, es, sie (plural) and Sie all take sich — the one reflexive pronoun German never splits."
    },
    {
      "id": "l1603_e3",
      "type": "morpheme_tiles",
      "prompt": "Assemble the reflexive sentence for 'I wash myself':",
      "tile_options": [
        "mich",
        "sich",
        "dich",
        "Ich",
        "wasche"
      ],
      "target_answer": "Ich wasche mich",
      "meaning": "I wash myself",
      "explanation": "ich acts on ich — the accusative mich bounces the action back, exactly like 'help yourself'."
    },
    {
      "id": "l1603_e4",
      "type": "derive",
      "prompt": "Stem-change alert: waschen in the er-form (he washes):",
      "english_hint": "a goes ä, plus the 3rd-person -t",
      "target_answer": "wäscht",
      "meaning": "er wäscht sich = he washes himself",
      "explanation": "du wäschst, er wäscht — the a→ä umlaut you know from the plural lesson (Mann → Männer), riding into the reflexive routine."
    },
    {
      "id": "l1603_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"Ich fühle mich gut = I feel good\"",
      "target_answer": "Ich fühle mich gut",
      "meaning": "Ich fühle mich gut = I feel good",
      "vocab_hints": [
        {
          "word": "fühle",
          "translation": "feel",
          "note": "fühlen — the twin of English feel; reflexive: sich fühlen"
        },
        {
          "word": "mich",
          "translation": "myself",
          "note": "the accusative of ich, bounced back"
        }
      ],
      "word_bank": [
        "ohne",
        "mich",
        "heute",
        "fühle",
        "Ich",
        "gut"
      ],
      "explanation": "sich fühlen needs its target: the feeling lands on the feeler — mich. English hides the same logic inside 'I feel good'.",
      "idea": "Ich fühle mich gut = I feel good",
      "idea_parts": [
        "Ich fühle mich gut",
        "= I feel good (verb in position 2)"
      ],
      "cues": [
        "Start with \"Ich\" and anchor \"fühle\" in position 2.",
        "Close the frame with \"gut\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Use the reflexive pronouns mich/dich/sich/uns/euch with waschen, freuen, fühlen and treffen.",
    "use_example": {
      "german": "Ich fühle mich gut und freue mich.",
      "english": "I feel good and I am glad."
    },
    "takeaway": "The reflexive is your accusative pronoun bounced back — mich, dich, uns — with sich covering he/she/it/they/Sie.",
    "curiosity_teaser": "Next: reflexive daily routines — anziehen, aufwachen, einschlafen: the morning round, all about yourself."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from sich & the Lost Reflexives (Ich fühle mich gut = I feel good):",
    "target_answer": "Ich fühle mich gut",
    "word_bank": [
      "heute",
      "fühle",
      "mich",
      "gut",
      "nicht",
      "Ich"
    ],
    "explanation": "Re-assembling \"Ich fühle mich gut\" from scratch locks in the structural pattern of sich & the Lost Reflexives without relying on short-term echo."
  }
};

export default lesson;
