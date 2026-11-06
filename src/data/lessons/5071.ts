import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5071,
  "slug": "first-introductions",
  "title": "First Introductions",
  "subtitle": "ich heiße ↔ hight, ich komme aus, ich wohne — the first sentences Germans actually speak",
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
    "title": "Hight: the Verb You Already Owned",
    "content": "Every German course opens with ich heiße — and the verb is an heirloom. Heißen descends from Proto-Germanic *haitaną, 'to call, to be called', and English wore the same verb until Shakespeare's day: archaic hight meant 'is called' — 'a city hight Rome'. Sir Gawain is hight so; your name is heißt so. The rest of the introduction kit is equally old: ich komme aus England (come, already yours), ich wohne in Berlin (the live/reside verb — no English twin, an honest memorize), ich bin zwanzig Jahre alt (and Jahr is the exact twin of year). Four formulas, all cognate-tested, and you can introduce yourself for a full minute.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "behest: the Command Sibling",
        "content": "Heißen's family survives in English 'behest' — a bidding or command, literally a 'be-called'. The king's behest is what he calls you to do. Same *haitaną root as heißen, hight, and German Heißt du...?"
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
      "explanation": "heißen = to be called (hight's twin); wohnen = to reside, with wo as its first syllable; jahr = the year you count yourself in. The age formula is word-for-word English — years old = Jahre alt. The nouns arrive next: Herr in front of the surname, die Fabrik where you work, das Gymnasium where you studied, die Rente, der Dom, die Art, die Kaution and eventuell already in your pocket."
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
      "prompt": "Which archaic English word is the twin of 'heiße'?",
      "options": [
        "hest",
        "hot",
        "hallowed",
        "hight"
      ],
      "target_answer": "hight",
      "meaning": "heißen ↔ hight = to be called",
      "explanation": "'A city hight Rome' = 'a city is called Rome' — same *haitaną, same meaning, one s worn away."
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
          "note": "ich heiße = my name is — the hight twin"
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
    "outcome": "Introduce yourself with heiße, komme aus, wohne in and the age formula — and explain the heißen/hight twin.",
    "use_example": {
      "german": "Ich heiße Anna. Ich komme aus England, und ich wohne in Berlin.",
      "english": "My name is Anna. I come from England, and I live in Berlin."
    },
    "takeaway": "heißen ↔ hight ('to be called'), kommen aus (origins), wohnen in (residence), Jahre alt (age, word for word) — the whole first minute is cognate-built.",
    "curiosity_teaser": "Next: the alphabet — W is 'veh', V is 'fow', Z is 'tsett', and buchstabieren spells your name out loud."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"We be called (twin: hight) here today\"",
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
