import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1401,
  "slug": "verb-second-bootcamp",
  "title": "Verb-Second Bootcamp",
  "subtitle": "Front adverbs and objects — the verb never leaves position 2",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "morgen",
    "wollen",
    "müssen",
    "lernen",
    "kommen",
    "trinken",
    "buch",
    "haus"
  ],
  "table_word_ids": [
    "morgen",
    "wollen",
    "müssen",
    "lernen",
    "kommen",
    "trinken",
    "buch",
    "haus",
    "großeltern",
    "schmerz",
    "entschuldigung",
    "sicher",
    "wärme",
    "krankenhaus",
    "konto",
    "steuer"
  ],
  "hook": {
    "title": "The Glued Verb",
    "content": "German main clauses have one load-bearing wall: the conjugated verb sits in position 2. You may front anything — Morgen lerne ich Deutsch. Das Buch lese ich. Heute wandern wir. — but the verb does not budge. Front the adverb and the subject slides right; front the object and it slides again. The wall never moves. English speakers feel this as 'weird word order'; feel it instead as what it is — the same V2 habit Old English verse used ('Hwæt! We Gar-Dena...'), still standing in German.",
    "footnotes": [
      {
        "marker": "1",
        "title": "V2 Is the Germanic Default",
        "content": "All the old Germanic languages ran verb-second in main clauses. English lost it; German, Dutch, and the Scandinavian languages kept it. Yoda's 'Much to learn, you still have' accidentally speaks better Old English than modern English does."
      }
    ]
  },
  "pattern": {
    "title": "Front Anything, Move Nothing Else",
    "content": "Neutral: Ich lerne morgen Deutsch. Fronted time: Morgen lerne ich Deutsch — verb glued at 2, subject slides to 3. Fronted object: Das Buch lese ich heute — same glue. Fronted place: Im Haus lerne ich — same glue. The subject must still appear somewhere: if it is not in position 1, it lands immediately after the verb. One warning pair: Ich will... (modal in 2, infinitive at the end) versus Willst du...? (flipped question) — both keep the verb in the wall.",
    "footnotes": [],
    "linguist_note": "Adverb order inside the sentence follows the famous TeKaMoLo guideline — Time, Cause, Manner, Place — but at your level one adverb at a time is plenty: Morgen lerne ich. Heute trinken wir."
  },
  "exercises": [
    {
      "id": "l1401_e1",
      "type": "shift_select",
      "prompt": "Front the time: which is correct German?",
      "options": [
        "Morgen Deutsch ich lerne",
        "Morgen lerne ich Deutsch",
        "Morgen ich lerne Deutsch",
        "Ich morgen lerne Deutsch"
      ],
      "target_answer": "Morgen lerne ich Deutsch",
      "meaning": "Tomorrow I am learning German",
      "explanation": "Position 1 = Morgen, so the verb holds position 2 and the subject slides to third."
    },
    {
      "id": "l1401_e2",
      "type": "matching_pairs",
      "prompt": "Match each fronted sentence with its English meaning. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "vb1",
          "english": "Today we drink tea",
          "german": "Heute trinken wir Tee"
        },
        {
          "id": "vb2",
          "english": "Tomorrow I am coming",
          "german": "Morgen komme ich"
        },
        {
          "id": "vb3",
          "english": "The book I am reading",
          "german": "Das Buch lese ich"
        },
        {
          "id": "vb4",
          "english": "now we walk",
          "german": "Jetzt wandern wir"
        },
        {
          "id": "recall1",
          "german": "nichts und niemand",
          "english": "nothing and nobody"
        },
        {
          "id": "recall2",
          "german": "meine Sorge",
          "english": "my worry"
        },
        {
          "id": "spaced1",
          "german": "Wann lernen wir",
          "english": "When are we learning"
        }
      ],
      "target_answer": "Heute trinken wir Tee, Morgen komme ich, Das Buch lese ich, Jetzt wandern wir, nichts und niemand, meine Sorge, Wann lernen wir",
      "meaning": "Today we drink tea; Tomorrow I am coming; The book I am reading; now we walk; nothing and nobody; my worry; When are we learning",
      "explanation": "Anything can take position 1 — the verb answers from position 2 every time."
    },
    {
      "id": "l1401_e3",
      "type": "derive",
      "prompt": "Reorder into neutral order: 'Morgen komme ich' with the subject first:",
      "english_hint": "ich + komme + morgen",
      "target_answer": "Ich komme morgen",
      "meaning": "I am coming tomorrow",
      "explanation": "Neutral order: subject first, verb second, time word third. Fronting Morgen just reshuffles around the glued verb."
    },
    {
      "id": "l1401_e4",
      "type": "variant_english",
      "prompt": "Select EVERY honest English rendering of this German subordinate clause:",
      "german": "Ich weiß, dass er heute kommt",
      "renderings": [
        "I know that he is coming today",
        "I know that he comes today"
      ],
      "traps": [
        "I know that today comes he",
        "He knows that I am coming today"
      ],
      "target_answer": "I know that he is coming today",
      "meaning": "I know that he is coming today",
      "explanation": "Even though 'dass' sends 'kommt' to the end of the German clause, natural English keeps the verb right after 'he' (jetzt weiß ich es). [Ref: will]"
    },
    {
      "id": "l1401_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'Tomorrow we want to learn German'",
      "target_answer": "Morgen wollen wir Deutsch lernen",
      "meaning": "Tomorrow we want to learn German",
      "word_bank": [
        "wir",
        "wollen",
        "lernen",
        "Deutsch",
        "Morgen",
        "weil",
        "in"
      ],
      "explanation": "Morgen (1), wollen (2), wir (3), contents inside, lernen closes — V2 and the bracket in one sentence."
    }
  ],
  "summary": {
    "outcome": "Front adverbs and objects while keeping the conjugated verb in position 2.",
    "use_example": {
      "german": "Morgen wollen wir Deutsch lernen.",
      "english": "Tomorrow we want to learn German."
    },
    "takeaway": "Front anything you like — the verb stays glued to position 2 and the subject slides in right behind it.",
    "curiosity_teaser": "Next: weil & dass — the subclause doors where the verb finally leaves position 2 and waits in the basement."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Verb-Second Bootcamp (Tomorrow we want to learn German):",
    "target_answer": "Morgen wollen wir Deutsch lernen",
    "word_bank": [
      "Deutsch",
      "Morgen",
      "heute",
      "wollen",
      "wir",
      "nicht",
      "lernen"
    ],
    "explanation": "Re-assembling \"Morgen wollen wir Deutsch lernen\" from scratch locks in the structural pattern of Verb-Second Bootcamp without relying on short-term echo."
  }
};

export default lesson;
