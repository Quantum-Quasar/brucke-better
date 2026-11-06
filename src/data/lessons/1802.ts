import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1802,
  "slug": "haben-or-sein-choice-gym",
  "title": "haben or sein? Choice Gym",
  "subtitle": "Twenty past-sentence prompts — motion vs transitive logic decides",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "haben",
    "sein",
    "kommen",
    "gehen",
    "essen",
    "machen",
    "fahren",
    "trinken",
    "einschlafen",
    "fliegen",
    "ankommen",
    "buchen",
    "tragen"
  ],
  "table_word_ids": [
    "haben",
    "sein",
    "kommen",
    "gehen",
    "fahren",
    "essen",
    "machen",
    "trinken",
    "einschlafen",
    "fliegen",
    "ankommen",
    "buchen",
    "tragen",
    "notruf",
    "chinesisch",
    "flug"
  ],
  "hook": {
    "title": "Two Auxiliaries, One Question",
    "content": "Every German Perfekt sentence asks one question before anything else: did you DO something to something, or did you GO somewhere? Do → haben. Go → sein. Ich habe gegessen (I ate something) versus Ich bin gegangen (I went). Ich habe das Buch gefunden versus Ich bin nach Berlin gefahren. English solved this problem by abandoning sein-pasts entirely; German kept the ancient perfect-of-motion, and so did English once — 'he is come' is authentic Early Modern English, straight out of the King James Bible.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "He Is Come",
        "content": "'He is risen', 'The hour is come', 'Joy cometh in the morning' — the KJV uses be-perfects exactly like German sein-perfects. English narrowed them to phrases of arrival and change; German still runs the whole system: sein with gehen, kommen, fahren, aufstehen, einschlafen, bleiben."
      }
    ]
  },
  "pattern": {
    "title": "The Decision Tree",
    "content": "Branch one: is there a direct object (something acted on)? → haben, always: Ich habe den Kaffee getrunken. Branch two: motion or change of state with no object? → sein: Ich bin gekommen, Wir sind gegangen, sie ist eingeschlafen (she fell asleep — a change of state). Branch three: the sneaky verbs — bleiben (stay) and sein itself take sein despite zero motion: Wir sind zu Hause geblieben. When in doubt: 'could I do it TO something?' haben. 'did I move or change?' sein.",
    "footnotes": [],
    "linguist_note": "Some verbs flip meaning with the auxiliary: Ich habe das Auto gefahren (I drove the car — transitive) versus Ich bin gefahren (I traveled — motion). The auxiliary is doing grammar work, not decoration."
  },
  "exercises": [
    {
      "id": "l1802_e1",
      "type": "shift_select",
      "prompt": "'Ich ___ gegangen.' (I went)",
      "options": [
        "werde",
        "habe",
        "bin",
        "war"
      ],
      "target_answer": "bin",
      "meaning": "Ich bin gegangen = I went",
      "explanation": "gehen is pure motion, no object: sein. English's own KJV said 'he is gone' the same way. ankommen and fliegen ride sein too — arrivals and flights are motion."
    },
    {
      "id": "l1802_e2",
      "type": "shift_select",
      "prompt": "'Ich ___ das Buch gelesen.' (I read the book — lesen hinted: to read)",
      "options": [
        "wurde",
        "bin",
        "war",
        "habe"
      ],
      "target_answer": "habe",
      "meaning": "Ich habe das Buch gelesen = I read the book",
      "explanation": "Direct object (das Buch) → haben, no debate. Doing something to something is haben territory — buchen takes its object the same way: Ich habe alles gebucht."
    },
    {
      "id": "l1802_e3",
      "type": "matching_pairs",
      "prompt": "Match each Perfekt sentence with its auxiliary logic:",
      "matching_pairs": [
        {
          "id": "hs1",
          "english": "I came (motion)",
          "german": "Ich bin gekommen"
        },
        {
          "id": "hs2",
          "english": "I ate something (object)",
          "german": "Ich habe gegessen"
        },
        {
          "id": "hs3",
          "english": "We stayed home (the sneaky verb)",
          "german": "Wir sind geblieben"
        },
        {
          "id": "hs4",
          "english": "I flew (motion)",
          "german": "Ich bin geflogen"
        },
        {
          "id": "hs5",
          "english": "I carried it (object)",
          "german": "Ich habe es getragen"
        },
        {
          "id": "hs6",
          "english": "I drove the car (transitive)",
          "german": "Ich habe das Auto gefahren"
        }
      ],
      "target_answer": "Ich bin gekommen, Ich habe gegessen, Wir sind geblieben, Ich habe das Auto gefahren",
      "meaning": "I came, I ate, we stayed, I drove the car",
      "explanation": "Motion → sein; object → haben; bleiben always sein; gefahren flips by whether something was driven. The verb decides: fliegen flies (sein), tragen carries (haben)."
    },
    {
      "id": "l1802_e4",
      "type": "derive",
      "prompt": "Complete with the auxiliary: 'Sie ___ eingeschlafen.' (she fell asleep — change of state)",
      "english_hint": "change of state rides sein",
      "target_answer": "ist",
      "meaning": "Sie ist eingeschlafen = She fell asleep",
      "explanation": "einschlafen is a change of state (awake → asleep) — sein territory, like 'he is fallen' in old English."
    },
    {
      "id": "l1802_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I drove to Berlin yesterday'",
      "target_answer": "Ich bin gestern nach Berlin gefahren",
      "meaning": "I drove (traveled) to Berlin yesterday",
      "vocab_hints": [
        {
          "word": "nach",
          "translation": "to (for cities and countries)",
          "note": "nach Berlin — the 'to' of destination; cities and article-free countries take nach (nach Deutschland)"
        }
      ],
      "word_bank": [
        "Berlin",
        "gefahren",
        "bin",
        "der",
        "nach",
        "ist",
        "Ich",
        "gestern"
      ],
      "explanation": "No object driven — just travel: sein. 'Ich bin gefahren' is 'I am come' with wheels."
    }
  ],
  "summary": {
    "outcome": "Choose haben or sein correctly across transitive, motion, and sneaky-verb cases.",
    "use_example": {
      "german": "Ich bin gestern nach Berlin gefahren.",
      "english": "I drove to Berlin yesterday."
    },
    "takeaway": "Object → haben; motion or change → sein; bleiben always sein — the KJV's 'he is come' logic, still living.",
    "curiosity_teaser": "Next: Gestern habe ich… Story Drills — narrate a whole weekend in Perfekt sentences from taught words."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"We have here today\"",
    "target_answer": "Wir haben heute hier",
    "word_bank": [
      "nicht",
      "haben",
      "hier",
      "sehr",
      "heute",
      "Wir"
    ],
    "explanation": "Building \"Wir haben heute hier\" from the lesson's core pattern locks in haben or sein? Choice Gym."
  }
};

export default lesson;
