import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5171,
  "slug": "richtung-ii-hinten-norden-osten-westen-sueden",
  "title": "Richtung II: hinten, Norden, Osten, Westen, Süden",
  "subtitle": "behind, and the four compass points — dawn, evening, sun-side and the left hand",
  "phase": 3,
  "shift_categories": [
    "d_to_t",
    "th_to_d"
  ],
  "word_ids": [
    "hinten",
    "norden",
    "osten",
    "westen",
    "süden",
    "garten",
    "auto",
    "zug",
    "stadt",
    "kirche",
    "brücke",
    "links",
    "rechts",
    "geradeaus",
    "eins",
    "vier",
    "zehn"
  ],
  "table_word_ids": [
    "hinten",
    "norden",
    "osten",
    "westen",
    "süden",
    "garten",
    "auto",
    "zug",
    "stadt",
    "kirche",
    "brücke",
    "links",
    "rechts",
    "geradeaus",
    "eins",
    "vier",
    "zehn",
    "haustür",
    "teich"
  ],
  "hook": {
    "title": "One Body Word, Four Sky Words",
    "content": "Five direction words — one for your body, four for the sky. hinten is the body word: German built it on the same ancient behind-root that gave English behind (be-hind, 'by the hind part') — and the t in hinten is German's old directional suffix, not the D→T shift: the shift never touches this word, behind simply kept the d. English keeps the hin family only in the archaic-sounding hence and hither; German still says hin every day — hin und her, back and forth. The four compass points are pure twins, because German and English read the same sky. der Norden ↔ north. der Osten ↔ east — from the dawn-word *austrōn, 'toward the sunrise', the same dawn-root Latin turned into aurora. der Süden ↔ south — from *sunþrą, literally 'the sun side', the warm side of the sky. der Westen ↔ west — from the evening-root Latin keeps in vesper. Four sky twins, one body twin, and a lesson you can navigate by.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "North Is a Left-Handed Word",
        "content": "Norden is the odd one out: it is not a sun word. The old root *ner- meant 'left' — face the rising sun and north is your left hand. East is where you look at dawn, west where the evening glow goes (Latin vesper and English west are the same evening-word), and south is the sun side. One compass, four etymologies."
      }
    ]
  },
  "pattern": {
    "title": "The Compass Takes der, hinten Takes Nothing",
    "content": "Compass points are masculine and take im: im Norden, im Osten, im Süden, im Westen — 'in the north'. Motion adds the accusative: in den Süden, or plain nach Süden ('southward'). hinten is an adverb — no article, no case: hinten links (at the back on the left), von hinten (from behind), hinten im Garten (at the back of the garden). The fronting frame from Richtung I still holds: put a place in position 1 and the verb holds slot 2 — Im Süden ist es warm. And the compass scales into real sentences: Der Zug kommt aus dem Osten — the train comes from the east.",
    "footnotes": [],
    "linguist_note": "English behind is literally 'by the hind part' — the same hind that survives in hind legs and hindquarters. German kept the whole family alive: hinten, hinter, hintereinander. English kept the adjective and the preposition; German kept the everyday adverb."
  },
  "exercises": [
    {
      "id": "l5171_e1",
      "type": "matching_pairs",
      "prompt": "The compass and the space behind you — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "rw1",
          "english": "The garden is at the back on the left",
          "german": "Der Garten ist hinten links"
        },
        {
          "id": "rw2",
          "english": "The car comes from behind",
          "german": "Das Auto kommt von hinten"
        },
        {
          "id": "rw3",
          "english": "The train comes from the east",
          "german": "Der Zug kommt aus dem Osten"
        },
        {
          "id": "rw4",
          "english": "The bridge is in the south",
          "german": "Die Brücke ist im Süden"
        },
        {
          "id": "rw5",
          "english": "There are four streets in the north",
          "german": "Es gibt vier Straßen im Norden"
        },
        {
          "id": "rw6",
          "english": "The church is in the west",
          "german": "Die Kirche ist im Westen"
        },
        {
          "id": "rw7",
          "english": "Go straight ahead, not to the right",
          "german": "Gehen Sie geradeaus, nicht nach rechts"
        }
      ],
      "target_answer": "Der Garten ist hinten links, Das Auto kommt von hinten, Der Zug kommt aus dem Osten, Die Brücke ist im Süden, Es gibt vier Straßen im Norden, Die Kirche ist im Westen, Gehen Sie geradeaus, nicht nach rechts",
      "meaning": "behind, east, south, north, west",
      "explanation": "hinten needs no article; the compass points take im or aus dem. The frame is always the same: place phrase, verb, rest — Der Zug kommt aus dem Osten."
    },
    {
      "id": "l5171_e2",
      "type": "shift_select",
      "prompt": "One of these words describes the space BEHIND you, not a point of the compass — which?",
      "options": [
        "Westen",
        "hinten",
        "Osten",
        "Norden"
      ],
      "target_answer": "hinten",
      "meaning": "hinten = at the back, behind you — not a sky direction",
      "explanation": "hinten is where YOUR body is: hinten links, von hinten. Norden, Osten and Westen are world-fixed — they point the same way no matter how you turn. Body-relative versus sky-fixed: one word each."
    },
    {
      "id": "l5171_e3",
      "type": "reverse_cognate",
      "prompt": "Osten is the pure twin of an everyday English direction word. Which one?",
      "options": [
        "oyster",
        "easy",
        "east",
        "aster"
      ],
      "target_answer": "east",
      "meaning": "Osten ↔ east — the dawn direction",
      "explanation": "Osten and east both grow from the old dawn-word *austrōn — 'toward the sunrise'; even Latin aurora (dawn) is a cousin. The compass points are world-fixed: der Osten always lies where the sun rises."
    },
    {
      "id": "l5171_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the weather-on-the-compass sentence: 'It is warm in the south'",
      "tile_options": [
        "Im",
        "warm",
        "Süden",
        "Norden",
        "es",
        "ist",
        "kalt"
      ],
      "target_answer": "Im Süden ist es warm",
      "meaning": "It is warm in the south",
      "explanation": "Place first, verb second: Im Süden ist es warm. The impersonal es does the work, and the two distractor tiles show the frame scales to every compass point — Im Norden ist es kalt."
    },
    {
      "id": "l5171_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The train comes from the south at ten o'clock'",
      "target_answer": "Der Zug kommt um zehn Uhr aus dem Süden",
      "meaning": "The train comes from the south at ten o'clock",
      "word_bank": [
        "dem",
        "Süden",
        "Der",
        "um",
        "Osten",
        "Zug",
        "kommt",
        "eins",
        "Uhr",
        "zehn",
        "aus",
        "vier"
      ],
      "explanation": "Time before place: um zehn Uhr, then aus dem Süden. The bank holds eins and vier to prove the frame takes any clock number — um eins, um vier, um zehn."
    }
  ],
  "summary": {
    "outcome": "Use hinten for the space behind you and the four compass points for the world's directions — im Norden, aus dem Osten, in den Süden.",
    "use_example": {
      "german": "Der Zug kommt um zehn Uhr aus dem Süden.",
      "english": "The train comes from the south at ten o'clock."
    },
    "takeaway": "hinten is behind's twin — German built it with a t-suffix, not the D→T shift; Norden, Osten, Westen and Süden are pure sky twins — dawn, evening, sun-side and the left hand.",
    "curiosity_teaser": "Next: the distance axis — die Nähe, weit, fern, quer, entlang."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"We at the back here today\"",
    "target_answer": "Wir hinten heute hier",
    "word_bank": [
      "sehr",
      "nicht",
      "hier",
      "Wir",
      "hinten",
      "heute"
    ],
    "explanation": "Building \"Wir hinten heute hier\" from the lesson's core pattern locks in Richtung II: hinten, Norden, Osten, Westen, Süden."
  }
};

export default lesson;
