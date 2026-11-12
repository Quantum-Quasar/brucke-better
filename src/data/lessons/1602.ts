import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1602,
  "slug": "be-er-verb-factory",
  "title": "be- & er- Verb Factory",
  "subtitle": "bekommen, erinnern, erklären — meaning-shapers, and stress as the test",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "bekommen",
    "erinnern",
    "erklären",
    "verstehen",
    "versuchen",
    "verkaufen",
    "beginnen",
    "bezahlen",
    "einkaufen",
    "abfahren",
    "verdienen"
  ],
  "table_word_ids": [
    "bekommen",
    "erinnern",
    "erklären",
    "verstehen",
    "versuchen",
    "verkaufen",
    "beginnen",
    "bezahlen",
    "einkaufen",
    "abfahren",
    "verdienen",
    "hart",
    "unwetter",
    "alles",
    "post",
    "gefahr"
  ],
  "hook": {
    "title": "The Meaning-Shapers",
    "content": "ver- is the cognate star, but be- and er- are the factory workers. be- converts: bekommen (come by → GET), besuchen (seek → VISIT), bestellen (order — place-at!). er- achieves: erinnern (inner-ize → REMEMBER), erklären (clear-out → EXPLAIN), erkennen (know-out → RECOGNIZE), erledigen? hint — (done-out → finish). English once ran the same factory — be-think (bethought), be-come, and the archaic 'I would bethink me' — but retired it. The stress test tells you which factory a verb comes from: inseparable prefixes never take the stress, separable prefixes always do. Stress is the separable-detector.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Stress Detector",
        "content": "Say them: AUFwachen (separable — stress on the prefix) vs verSTEHen (inseparable — stress on the root). beKOMmen, erKLÄren — unstressed prefix. The rule: if the prefix is stressed, it will fly to the sentence end; if not, it stays welded. Hear the stress, know the grammar."
      }
    ]
  },
  "pattern": {
    "title": "The Factory Floor",
    "content": "The be- floor: bekommen (GET — the trap!), besuchen (visit), bestellen (order), bezahlen (pay — the 'by-tally'! zahlen = pay/count), beginnen (begin — the same word as begin!). The er- floor: erinnern (remember), erklären (explain), erkennen (recognize), erledigen (finish off — hint), erreichen (reach — erreichen/er- + reichen, to reach!). Both factories take ge--free participles: bekommen, besucht, erinnert, erklärt. And the productive test: meet a new verb with be-/er-/ver- and you know — inseparable, ge--free, root-stressed, and the prefix is doing meaning-work.",
    "footnotes": [],
    "linguist_note": "beginnen and English begin are twins (both *biginnan, 'to open/undertake') — be- in both! The factory is older than the languages' split: be- and er- (Germanic *uz-, cognate with Latin ex-) were prefix-verbs in Proto-Germanic itself."
  },
  "exercises": [
    {
      "id": "l1602_e1",
      "type": "matching_pairs",
      "prompt": "The factory floor — match each verb with its product. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "bf1",
          "english": "to visit",
          "german": "besuchen"
        },
        {
          "id": "bf2",
          "english": "to recognize",
          "german": "erkennen"
        },
        {
          "id": "bf3",
          "english": "to remember",
          "german": "erinnern"
        },
        {
          "id": "bf4",
          "english": "to explain (make clear)",
          "german": "erklären"
        },
        {
          "id": "bf5",
          "english": "to pay",
          "german": "bezahlen"
        },
        {
          "id": "spaced1",
          "german": "Ich kann das vergessen",
          "english": "I can forget that"
        },
        {
          "id": "spaced1b",
          "german": "Ich kann das verlieren",
          "english": "I can lose that"
        }
      ],
      "target_answer": "besuchen, erkennen, erinnern, erklären, bezahlen, Ich kann das vergessen, Ich kann das verlieren",
      "meaning": "to visit; to recognize; to remember; to explain (make clear); to pay; I can forget that; I can lose that",
      "explanation": "be- converts, er- achieves — and each product is ge--free in the participle: besucht, erkannt, erinnert, erklärt, bezahlt."
    },
    {
      "id": "l1602_e2",
      "type": "shift_select",
      "prompt": "The stress test: which verb is SEPARABLE (stressed prefix)?",
      "options": [
        "erKLÄren (explain)",
        "verSTEHen (understand)",
        "beKOMmen (get)",
        "AUFwachen (wake up)"
      ],
      "target_answer": "AUFwachen (wake up)",
      "meaning": "Stressed prefix = separable = it will fly",
      "explanation": "auf- takes the stress and the flight; ver-/be-/er- stay unstressed and welded. Hear the stress, predict the grammar. The separable shelf — einkaufen, abfahren — flies its prefixes; verdienen welds ver- like the rest of the factory."
    },
    {
      "id": "l1602_e3",
      "type": "shift_select",
      "prompt": "Which participle is correct for 'erklären'?",
      "options": [
        "erklärt",
        "geerklärt",
        "klärt",
        "erklärt ge"
      ],
      "target_answer": "erklärt",
      "meaning": "explained (no ge-)",
      "explanation": "Inseparable prefix blocks ge-: erklärt, bekommen, verstanden — the No-ge- Club's third wing."
    },
    {
      "id": "l1602_e4",
      "type": "reverse_cognate",
      "prompt": "What English verb is the true twin of 'beginnen'?",
      "target_answer": "begin",
      "meaning": "begin ↔ beginnen (be- in both!)",
      "explanation": "Both *biginnan: the be- prefix is Germanic heritage, not a German invention — English's begin kept it too."
    },
    {
      "id": "l1602_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'He explains the word and I remember it'",
      "target_answer": "Er erklärt das Wort und ich erinnere mich",
      "meaning": "He explains the word and I remember it",
      "vocab_hints": [
        {
          "word": "mich",
          "translation": "myself (reflexive)",
          "note": "sich erinnern — remember is reflexive in German: 'inner-ize MYSELF'"
        }
      ],
      "word_bank": [
        "erinnere",
        "erklärt",
        "ich",
        "Er",
        "der",
        "Wort",
        "und",
        "mich",
        "das",
        "ist"
      ],
      "explanation": "Two er- factory verbs in one sentence — and erinnern demands its reflexive mich: the inner-izing needs a target."
    }
  ],
  "summary": {
    "outcome": "Use be-/er- verbs with ge--free participles and apply the stress test to new verbs.",
    "use_example": {
      "german": "Er erklärt das Wort und ich erinnere mich.",
      "english": "He explains the word and I remember it."
    },
    "takeaway": "be- converts, er- achieves — both factories are unstressed, ge--free, and detectable by stress alone.",
    "curiosity_teaser": "Next: sich & the lost reflexives — hie thee hence: the pronouns English dropped, the daily verbs that kept them."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from be- & er- Verb Factory (He explains the word and I remember it):",
    "target_answer": "Er erklärt das Wort und ich erinnere mich",
    "word_bank": [
      "mich",
      "Er",
      "ich",
      "das",
      "nicht",
      "und",
      "Wort",
      "erklärt",
      "heute",
      "erinnere"
    ],
    "explanation": "Re-assembling \"Er erklärt das Wort und ich erinnere mich\" from scratch locks in the structural pattern of be- & er- Verb Factory without relying on short-term echo."
  }
};

export default lesson;
