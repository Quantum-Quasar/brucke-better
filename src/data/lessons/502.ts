import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 502,
  "slug": "eszett-and-the-sharp-s",
  "title": "Eszett & the Sharp S",
  "subtitle": "groß, Straße, muss — the T→SS story you can now read letter by letter",
  "phase": 1,
  "shift_categories": [
    "t_to_s_ss_z"
  ],
  "word_ids": [
    "groß",
    "straße",
    "heiß",
    "fuß",
    "müssen",
    "besser",
    "wasser",
    "salz",
    "süß",
    "zunge",
    "mund",
    "kleid",
    "monat",
    "darm"
  ],
  "table_word_ids": [
    "groß",
    "straße",
    "heiß",
    "fuß",
    "müssen",
    "besser",
    "wasser",
    "salz",
    "süß",
    "zunge",
    "mund",
    "kleid",
    "monat",
    "darm",
    "wohnzimmer",
    "hass",
    "fußgänger"
  ],
  "hook": {
    "title": "The Letter English Deleted",
    "content": "That letter that looks like a strange B — ß — is not a B at all. Germans call it Eszett: 'S-z'. It is a sharp S, and it exists because of the shift you already know. When an ancient t hissed into s after a long vowel, German wrote the hiss as ß: groß (great), heiß (hot), Fuß (foot), Straße (street). After a short vowel, the same hiss is written double-s: Wasser, besser, muss. English deleted its sharp s centuries ago and let the plain s do both jobs — German kept the specialist.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Country That Abolished It",
        "content": "Switzerland stopped using ß in the 1930s and writes ss everywhere. So 'ss' and 'ß' are pure spelling tradition — the sound is the same sharp [s]. Austria and Germany kept the long/short distinction."
      }
    ]
  },
  "pattern": {
    "title": "The Sharp-S Spelling Compass",
    "content": "Long vowel or diphthong → ß: groß, heiß, Fuß, Straße, weiß (white — the same word as wise: ich weiß, I know, is 'I am wise'). Short vowel → ss: Wasser, besser, muss, muss's du-form musst. The shift underneath never changes: water → Wasser (t → ss), better → besser (tt → ss), foot → Fuß (t → ß). Ordering drinks now needs no new words: ein Glas Wasser, and when it is too hot, zu heiß. Salt, Salz, is the t → z twin of English salt — one more member of the same sibilant family.",
    "footnotes": [],
    "linguist_note": "Straße carries the full Roman history: Latin via strata ('paved road') gave English street (keeping Latin t) and German Straße (shifting t to ß). The same road produced both words on two sides of the Rhine."
  },
  "exercises": [
    {
      "id": "l502_e1",
      "type": "matching_pairs",
      "prompt": "Match the English t-words with their sharp-s German twins. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "es1",
          "english": "great",
          "german": "groß"
        },
        {
          "id": "es2",
          "english": "hot",
          "german": "heiß"
        },
        {
          "id": "es3",
          "english": "foot",
          "german": "Fuß"
        },
        {
          "id": "es4",
          "english": "street",
          "german": "Straße"
        },
        {
          "id": "es5",
          "english": "sweet",
          "german": "süß"
        },
        {
          "id": "es6",
          "english": "tongue",
          "german": "Zunge"
        },
        {
          "id": "recall1",
          "german": "der Zwilling",
          "english": "the twin"
        },
        {
          "id": "recall2",
          "german": "der Zwerg",
          "english": "the dwarf"
        },
        {
          "id": "recall3",
          "german": "zweimal kommen",
          "english": "to come twice"
        }
      ],
      "target_answer": "groß, heiß, Fuß, Straße, süß, Zunge, der Zwilling, der Zwerg, zweimal kommen",
      "meaning": "great; hot; foot; street; sweet; tongue; the twin; the dwarf; to come twice",
      "shift_hint": "T → ß",
      "explanation": "Each ß marks where an ancient t hissed into a sharp s after a long vowel — and Zunge shows the sibling outcome: t → z, the /ts/ costume."
    },
    {
      "id": "l502_e2",
      "type": "shift_select",
      "prompt": "When does German write ß instead of ss?",
      "options": [
        "At the start of words",
        "After the letter z",
        "Only in Switzerland",
        "After long vowels and diphthongs"
      ],
      "target_answer": "After long vowels and diphthongs",
      "meaning": "Long vowel → ß; short vowel → ss",
      "explanation": "groß, heiß, Fuß (long) versus Wasser, muss (short). The sound is the same; the spelling tracks the vowel. Run your shelf while you're here — der Mund and der Darm from topic 4, der Monat too: none of them needs a new sound, only the flags you already collected."
    },
    {
      "id": "l502_e3",
      "type": "reverse_cognate",
      "prompt": "Which English adjective meaning 'total / flagrant' (or 'twelve dozen') is the T/SS→S twin of 'groß'?",
      "target_answer": "gross",
      "meaning": "gross — large/total (twin of German groß)",
      "explanation": "English gross kept the old sense 'big, total' in gross income and a gross error — no yuck factor involved."
    },
    {
      "id": "l502_e4",
      "type": "derive",
      "prompt": "Conjugate: 'Ich muss, du _____' (the sharp double-s du-form):",
      "english_hint": "muss + st",
      "target_answer": "musst",
      "meaning": "du musst = you must",
      "explanation": "Short vowel, so the spelling doubles the s: musst. The sound never changed."
    },
    {
      "id": "l502_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The dress is too big'",
      "target_answer": "Das Kleid ist zu groß",
      "meaning": "The dress is too big",
      "vocab_hints": [
        {
          "word": "das",
          "translation": "the (neuter)",
          "note": "das Kleid — the dress you met through its hardened th"
        }
      ],
      "word_bank": [
        "Kleid",
        "Mund",
        "morgen",
        "zu",
        "ist",
        "den",
        "groß",
        "Das"
      ],
      "explanation": "zu does double duty — 'to' and 'too' — and groß wears the sharp S of its ancient t, the word English kept as gross."
    }
  ],
  "summary": {
    "outcome": "Read ß as a shifted t, spell musst correctly, and complain about clothes and drinks.",
    "use_example": {
      "german": "Das Kleid ist zu groß.",
      "english": "The dress is too big."
    },
    "takeaway": "ß is the written receipt of T→SS after long vowels; after short vowels German writes ss.",
    "curiosity_teaser": "Next: the Velar Shift — how English make melted into machen and book into Buch."
  },
  "twist": {
    "prompt": "Same dress, different verdict: it isn't too big after all. Negate it.",
    "target_answer": "Das Kleid ist nicht zu groß",
    "word_bank": [
      "nicht",
      "groß",
      "ist",
      "zu",
      "heiß",
      "Kleid",
      "Das"
    ],
    "explanation": "nicht slides in before the phrase it cancels — here the whole zu groß. ist holds position 2 either way."
  }
};

export default lesson;
