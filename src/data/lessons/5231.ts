import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5231,
  "slug": "essen-iii-zucker-honig-schokolade-keks-torte",
  "title": "Essen III: der Zucker, der Honig, die Schokolade, der Keks, die Torte",
  "subtitle": "the sweet shelf — gravel that became sugar, and a plural 'cakes' German kept whole",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "zucker",
    "honig",
    "schokolade",
    "keks",
    "torte",
    "ofen",
    "manchmal",
    "ostern",
    "essen",
    "kaffee",
    "süß",
    "schmecken",
    "geburtstag",
    "nehmen"
  ],
  "table_word_ids": [
    "zucker",
    "honig",
    "schokolade",
    "keks",
    "torte",
    "ofen",
    "manchmal",
    "ostern",
    "essen",
    "kaffee",
    "süß",
    "schmecken",
    "geburtstag",
    "nehmen",
    "winken"
  ],
  "hook": {
    "title": "Sugar Was Gravel",
    "content": "The sweet shelf is where the borrowings go deepest. der Zucker made the longest journey of any word you own: Sanskrit śarkarā meant 'gravel, grit', Greek borrowed it as sákkharon for the crystalline sand that sweetens, Latin made it saccharum — and there the road splits: saccharum fathered only the saccharine branch, while sugar and Zucker took the trade road home — Persian shakar, Arabic sukkar, Medieval Latin succarum — then split again, English buying through French sucre and German through Italian zucchero. Same ancient gravel, ground fine. der Honig is the opposite: no journey at all, the pure twin of honey, one Proto-Germanic word in both mouths. die Schokolade is Nahuatl chocolātl through Spanish chocolate — the same door the tomato used. der Keks is the delicious one: German borrowed the English plural cakes whole, s and all, and respelled it — Keks is 'cakes' with a German accent. die Torte came from Italian torta, and English tart is the same word through French: both go back to Latin torquere, 'to twist' — the twisted pastry dough. One twin, one gravel, one ocean-crosser, one baked-in plural, one twist.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Plural Baked In",
        "content": "When der Keks arrived in the 19th century, German heard the whole English plural cakes and kept the s as part of the word — so der Keks is, literally, more than one cake baked into a singular. German then adds its own plural on top: die Kekse. English did its own re-hearing with pease: the old mass word sounded plural, so pea was carved out of it as the singular."
      }
    ]
  },
  "pattern": {
    "title": "The Sweet Shelf in Sentences",
    "content": "Four frames, one shelf. 1. Taking: Ich nehme Zucker in den Kaffee — nehmen for what you add, in + accusative for what goes into the cup. 2. Tasting: Der Honig schmeckt süß — schmecken takes the taste as a bare adjective: German tastes sweet, it does not have to be sweet. 3. Handing out: Zu Ostern gibt es Schokolade — gibt + es announces what exists: at Easter there is chocolate. 4. Frequency slot: Manchmal esse ich eine Torte — manchmal directly behind the verb, the lesson 5131 slot, with the food counted this time: eine Torte.",
    "footnotes": [],
    "linguist_note": "Keks is a rare baked-in loan: German borrowed an English plural and froze it into a singular noun. English did its own reshaping by ear with pea — the mass word pease re-heard as a plural, the new singular carved out of it — showing both languages re-analyzing forms in real time, centuries apart."
  },
  "exercises": [
    {
      "id": "l5231_e1",
      "type": "matching_pairs",
      "prompt": "The sweet shelf — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "ss1",
          "english": "At Easter there is chocolate",
          "german": "Zu Ostern gibt es Schokolade"
        },
        {
          "id": "ss2",
          "english": "I take sugar in my coffee",
          "german": "Ich nehme Zucker in den Kaffee"
        },
        {
          "id": "ss3",
          "english": "The honey tastes sweet",
          "german": "Der Honig schmeckt süß"
        },
        {
          "id": "ss4",
          "english": "I take a cookie with the coffee",
          "german": "Ich nehme einen Keks zum Kaffee"
        },
        {
          "id": "ss5",
          "english": "Sometimes I eat a cake",
          "german": "Manchmal esse ich eine Torte"
        },
        {
          "id": "ss6",
          "english": "The cake comes out of the oven",
          "german": "Der Kuchen kommt aus dem Ofen"
        }
      ],
      "target_answer": "Zu Ostern gibt es Schokolade, Ich nehme Zucker in den Kaffee, Der Honig schmeckt süß, Ich nehme einen Keks zum Kaffee, Manchmal esse ich eine Torte, Der Kuchen kommt aus dem Ofen",
      "meaning": "Easter chocolate, sugar in coffee, sweet honey, a cookie with coffee, sometimes a cake",
      "explanation": "gibt + es hands out what exists, schmecken takes the taste as a bare adjective, and manchmal sits directly behind the verb. Note the genders on the shelf: der Zucker, der Honig, die Schokolade, der Keks, die Torte."
    },
    {
      "id": "l5231_e2",
      "type": "shift_select",
      "prompt": "Which word did German borrow from English — plural s included?",
      "options": [
        "die Torte",
        "der Zucker",
        "der Honig",
        "der Keks"
      ],
      "target_answer": "der Keks",
      "meaning": "der Keks ← English cakes",
      "explanation": "Keks is English cakes respelled — a plural frozen into a singular noun. Torte came from Italian torta (English tart is the same twisted word through French), Zucker walked from Sanskrit gravel through Greek and Latin, and Honig never left Germanic at all."
    },
    {
      "id": "l5231_e3",
      "type": "reverse_cognate",
      "prompt": "Zucker's oldest ancestor is Sanskrit śarkarā — 'gravel'. Which English word walked the same Greek-to-Latin road?",
      "options": [
        "sugar",
        "gravel",
        "sweet",
        "sacred"
      ],
      "target_answer": "sugar",
      "meaning": "der Zucker ↔ sugar: both from Sanskrit śarkarā, 'gravel'",
      "explanation": "Sanskrit śarkarā became Greek sákkharon and Latin saccharum — the saccharine branch — but sugar and Zucker took the trade road: Persian shakar, Arabic sukkar, Medieval Latin succarum, and on to French sucre and Italian zucchero. The sweetest word on the shelf began as the grit under your feet — the crystals looked like sand."
    },
    {
      "id": "l5231_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble: 'The chocolate is too sweet'",
      "tile_options": [
        "zu",
        "ist",
        "Schokolade",
        "Zucker",
        "süß",
        "Honig",
        "Die"
      ],
      "target_answer": "Die Schokolade ist zu süß",
      "meaning": "The chocolate is too sweet",
      "explanation": "zu + adjective means too much of it — the same zu that scales every quality. The nouns keep their genders (die Schokolade, der Honig, der Zucker) and the adjective never notices."
    },
    {
      "id": "l5231_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'For the birthday we eat cake'",
      "target_answer": "Zum Geburtstag essen wir Torte",
      "word_bank": [
        "Zum",
        "Torte",
        "essen",
        "Honig",
        "wir",
        "Keks",
        "Schokolade",
        "Geburtstag"
      ],
      "meaning": "For the birthday we eat cake",
      "explanation": "zu + dem = zum names the occasion, and die Torte stands bare as the food in general — die Torte is the layered birthday cake, the one with the candles."
    }
  ],
  "summary": {
    "outcome": "Name the five sweet words with their genders, add sugar with nehmen, taste with schmecken + adjective, and hand things out with gibt es.",
    "use_example": {
      "german": "Zu Ostern gibt es Schokolade — manchmal eine Torte.",
      "english": "At Easter there is chocolate — sometimes a cake."
    },
    "takeaway": "Zucker is Sanskrit gravel, Honig is honey's untouched twin, Schokolade is Nahuatl chocolātl, Keks is English cakes with the s baked in, Torte is the twisted one — der, der, die, der, die.",
    "curiosity_teaser": "Next: the meal with its own noun — das Frühstück, das Brötchen, die Marmelade, der Toast, and butter coming back as a compound."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Essen III: der Zucker, der Honig, die Schokolade, der Keks, die Torte (For the birthday we eat cake):",
    "target_answer": "Zum Geburtstag essen wir Torte",
    "word_bank": [
      "heute",
      "Zum",
      "essen",
      "Geburtstag",
      "nicht",
      "wir",
      "Torte"
    ],
    "explanation": "Re-assembling \"Zum Geburtstag essen wir Torte\" from scratch locks in the structural pattern of Essen III: der Zucker, der Honig, die Schokolade, der Keks, die Torte without relying on short-term echo."
  }
};

export default lesson;
