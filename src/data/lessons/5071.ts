import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5071,
  "slug": "first-introductions",
  "title": "First Introductions",
  "subtitle": "ich heiße, ich komme aus, ich wohne — the first sentences Germans actually speak",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "heißen",
    "kommen",
    "wohnen",
    "alt",
    "jahr",
    "herr",
    "öl",
    "tüte",
    "fabrik",
    "gymnasium",
    "rente",
    "dom",
    "art",
    "kaution",
    "eventuell"
  ],
  "table_word_ids": [
    "heißen",
    "kommen",
    "wohnen",
    "jahr",
    "alt",
    "herr",
    "öl",
    "tüte",
    "fabrik",
    "gymnasium",
    "rente",
    "dom",
    "art",
    "kaution",
    "eventuell"
  ],
  "hook": {
    "title": "Four Formulas You Already Half-Know",
    "content": "Every German course opens with ich heiße, and the introduction kit around it is more yours than it looks. Ich komme aus England — come is kommen. Ich bin zwanzig Jahre alt — Jahr is the exact twin of year, and alt is old. Ich wohne in Berlin is the one honest stranger: wohnen has no English twin, so learn it as the reside verb. Take the four formulas as phrases, say them out loud, and you can introduce yourself for a full minute.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "hight: heißen's Archaic Sibling",
        "content": "Heißen descends from Proto-Germanic *haitaną, 'to call, to be called'. English wore the same verb until Shakespeare's day: archaic hight meant 'was called' — 'a city hight Rome' — and the family also survives in behest, a bidding or command. None of that is modern English, so file it under old books; the phrase to own is ich heiße."
      }
    ]
  },
  "pattern": {
    "title": "The Four Formulas",
    "content": "1. Ich heiße Anna. — 'I am called Anna'; question form: Wie heißt du? (informal) / Wie heißen Sie? (formal). 2. Ich komme aus England. — come from; most countries take aus with no article: aus Deutschland; feminine and plural countries keep theirs: aus der Schweiz. 3. Ich wohne in Berlin. — reside; city = bare in, country = in + dative: in Deutschland, in der Schweiz. 4. Ich bin zwanzig Jahre alt. — literally 'I am twenty years old', word for word English. Stack them and the self-introduction builds itself: Ich heiße Anna. Ich komme aus England, und ich wohne jetzt in Berlin.",
    "footnotes": [],
    "linguist_note": "Heißen and hight share the s of *haitaną's present stem — heißt keeps it, hight wore it down. The question 'Wie heißen Sie?' literally asks 'How are you called?', the same logic as archaic 'How are you hight?' — both languages asking for a name by way of a calling."
  },
  "exercises": [
    {
      "id": "l5071_e1",
      "type": "matching_pairs",
      "prompt": "Match each introduction formula with its literal reading:",
      "matching_pairs": [
        {
          "id": "fi1",
          "english": "I am called (= my name is)",
          "german": "Ich heiße"
        },
        {
          "id": "fi2",
          "english": "I come from",
          "german": "Ich komme aus"
        },
        {
          "id": "fi3",
          "english": "I live / reside in",
          "german": "Ich wohne in"
        },
        {
          "id": "fi4",
          "english": "I am twenty years old",
          "german": "Ich bin zwanzig Jahre alt"
        },
        {
          "id": "fi5",
          "english": "The oil is in the bag",
          "german": "Das Öl ist in der Tüte"
        },
        {
          "id": "fi6",
          "english": "Mister Braun lives here",
          "german": "Herr Braun wohnt hier"
        }
      ],
      "target_answer": "Ich heiße, Ich komme aus, Ich wohne in, Ich bin zwanzig Jahre alt, Das Öl ist in der Tüte, Herr Braun wohnt hier",
      "meaning": "my name is, I come from, I live in, I am twenty years old, the oil is in the bag, Mister Braun lives here",
      "explanation": "heißen = to be called; wohnen = to reside, with wo as its first syllable; jahr = the year you count yourself in. The age formula is word-for-word English — years old = Jahre alt. The nouns arrive next: Herr in front of the surname, die Fabrik where you work, das Gymnasium where you studied, die Rente, der Dom, die Art, die Kaution and eventuell already in your pocket."
    },
    {
      "id": "l5071_e2",
      "type": "shift_select",
      "prompt": "'Ich komme _____ Deutschland.' (I come from Germany):",
      "options": [
        "bei",
        "von",
        "aus",
        "in"
      ],
      "target_answer": "aus",
      "meaning": "Ich komme aus Deutschland = I come from Germany",
      "explanation": "aus = out of — origins run through the out-of preposition, and most countries stand bare: aus Deutschland (but aus der Schweiz keeps its article)."
    },
    {
      "id": "l5071_e3",
      "type": "shift_select",
      "prompt": "'Wie _____ du?' — asking a friend's name:",
      "options": [
        "heiße",
        "heißt",
        "heiß",
        "heißen"
      ],
      "target_answer": "heißt",
      "meaning": "Wie heißt du? = What is your name? (how are you called)",
      "explanation": "The du-form wears -t: ich heiße, du heißt. The polite Wie heißen Sie? keeps the -en — both ask the name by way of the calling verb."
    },
    {
      "id": "l5071_e4",
      "type": "reverse_cognate",
      "prompt": "'Jahr' is the exact twin of which English word?",
      "target_answer": "year",
      "meaning": "Jahr ↔ year (Proto-West Germanic *jār)",
      "explanation": "Ich bin zwanzig Jahre alt — 'I am twenty years old' — with Jahr/year the twin it has been for two thousand years."
    },
    {
      "id": "l5071_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the German sentence for 'My name is Anna and I come from Berlin':",
      "target_answer": "Ich heiße Anna und ich komme aus Berlin",
      "meaning": "Ich heiße Anna und ich komme aus Berlin",
      "vocab_hints": [
        {
          "word": "heiße",
          "translation": "am called",
          "note": "ich heiße = my name is — literally 'I am called'"
        },
        {
          "word": "aus",
          "translation": "from / out of",
          "note": "kommen aus = come from (origin)"
        }
      ],
      "word_bank": [
        "heiße",
        "für",
        "und",
        "Ich",
        "aber",
        "ich",
        "komme",
        "Anna",
        "aus",
        "Berlin"
      ],
      "explanation": "Two verb-second clauses joined by und — each clause holds its own verb in position 2, the rule from topic 14 already at work."
    }
  ],
  "summary": {
    "outcome": "Introduce yourself with heiße, komme aus, wohne in and the age formula, and know which of the formulas are old English twins (kommen/come, Jahr/year, alt/old).",
    "use_example": {
      "german": "Ich heiße Anna. Ich komme aus England, und ich wohne in Berlin.",
      "english": "My name is Anna. I come from England, and I live in Berlin."
    },
    "takeaway": "ich heiße (my name is), kommen aus (origins: come), wohnen in (residence), Jahre alt (age: year, word for word) — most of your first minute is cognate-built.",
    "curiosity_teaser": "Next: the alphabet — W is 'veh', V is 'fow', Z is 'tsett', and buchstabieren spells your name out loud."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"We be called here today\"",
    "target_answer": "Wir heißen heute hier",
    "word_bank": [
      "Wir",
      "heute",
      "hier",
      "nicht",
      "sehr",
      "heißen"
    ],
    "explanation": "Building \"Wir heißen heute hier\" from the lesson's core pattern locks in First Introductions."
  }
};

export default lesson;
