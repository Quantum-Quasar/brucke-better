import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2404,
  "slug": "no-article-adjective-goes-strong",
  "title": "No Article? The Adjective Goes Strong",
  "subtitle": "kaltes Wasser, heißer Tee, guter Wein — the adjective does the article's job alone",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "wasser",
    "wein",
    "kaffee",
    "besser",
    "gut",
    "heiß",
    "kalt",
    "brot",
    "warm",
    "voll",
    "nass",
    "schnell",
    "schwer",
    "lecker",
    "neu"
  ],
  "table_word_ids": [
    "wasser",
    "wein",
    "kaffee",
    "heiß",
    "kalt",
    "besser",
    "gut",
    "brot",
    "warm",
    "voll",
    "nass",
    "schnell",
    "schwer",
    "lecker",
    "neu"
  ],
  "hook": {
    "title": "The Adjective Promoted to Flag-Carrier",
    "content": "Last lesson's law: one flag-carrier per noun phrase. der shows the case, the adjective whispers -e — der kalte Tag. But German nouns often roam FREE — no article at all: Kaltes Wasser ist gut. Heißer Tee, bitte. The moment the article steps out, the adjective is promoted: it must do the article's job alone, wearing the full strong ending — -er for masculine, -es for neuter, -e for feminine. This is the oldest layer of the system, and English once wore it too: Old English said gōd mann (strong, no article) but se gōda mann (weak, after the). English dropped both sets of endings; German kept them both, working.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Strong and Weak, the Old English Way",
        "content": "Linguists call the no-article endings the STRONG declension and the der/die/das endings the WEAK declension — the same terms used for Old English grammar (strong gōd mann vs weak se gōda mann). The names describe which word carries the case-flag: alone (strong) or propped up by a flagged article (weak)."
      }
    ]
  },
  "pattern": {
    "title": "The Strong Endings Are the Demonstrative Endings",
    "content": "Watch the pattern: the strong adjective borrows the endings of der/die/das itself — guter Wein (masculine -er, like der), kaltes Wasser (neuter -es, like das), gute Butter (feminine -e, like die). The article-less noun phrase is its own little demonstrative. Mixed recap: ein hides its flag in the masculine nominative (ein guter Wein) and neuter (ein kaltes Wasser) — the adjective covers for it — but einen, eine, einer carry their own flags, so the adjective falls back to weak: einen besseren Kaffee (the very form the capstone whispered). And in the no-article plural the adjective takes -e: alte Bücher, alte Wörter.",
    "footnotes": [],
    "linguist_note": "The strong endings are the old demonstrative pronoun endings (*sa, *sō, *þat) — German spread them onto the adjective so that even a bare noun phrase still announces case and gender. English kept the pronouns (he, she, that) but let the adjective go naked."
  },
  "exercises": [
    {
      "id": "l2404_e1",
      "type": "matching_pairs",
      "prompt": "Bare-noun phrases (no article!) — match each with its reading. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "sg1",
          "english": "cold water (no article)",
          "german": "kaltes Wasser"
        },
        {
          "id": "sg2",
          "english": "hot tea (no article)",
          "german": "heißer Tee"
        },
        {
          "id": "sg3",
          "english": "good wine (no article)",
          "german": "guter Wein"
        },
        {
          "id": "sg4",
          "english": "old bread (no article)",
          "german": "altes Brot"
        },
        {
          "id": "recall1",
          "german": "Die Straße ist lang",
          "english": "The street is long"
        },
        {
          "id": "recall1b",
          "german": "Das Brot ist lecker",
          "english": "The bread is tasty"
        }
      ],
      "target_answer": "kaltes Wasser, heißer Tee, guter Wein, altes Brot, Die Straße ist lang, Das Brot ist lecker",
      "meaning": "cold water (no article); hot tea (no article); good wine (no article); old bread (no article); The street is long; The bread is tasty",
      "explanation": "No article → the adjective goes strong: -es after neuter nouns, -er after masculine, mirroring der/das themselves. But predicates rest bare: der Zug ist schnell, der Kuchen ist lecker und schwer, alles ist neu, der Kühlschrank ist voll, die Straße ist nass — no endings when nothing follows the adjective."
    },
    {
      "id": "l2404_e2",
      "type": "shift_select",
      "prompt": "No article, neuter noun: '_____ Wasser ist kalt.' (cold):",
      "options": [
        "Kalt",
        "Kaltes",
        "Kalte",
        "Kalter"
      ],
      "target_answer": "Kaltes",
      "meaning": "Kaltes Wasser ist kalt = cold water is cold",
      "explanation": "Neuter strong ending -es — the adjective copies das: kaltes Wasser. It is doing the article's job alone."
    },
    {
      "id": "l2404_e3",
      "type": "morpheme_tiles",
      "prompt": "Assemble the unpreceded masculine nominative phrase for 'hot tea':",
      "tile_options": [
        "en",
        "heißer",
        "e",
        "es",
        "Tee"
      ],
      "target_answer": "heißer Tee",
      "meaning": "hot tea (no article — masculine strong)",
      "explanation": "heißer — the strong masculine -er, borrowed straight from der. Heißer Tee, bitte."
    },
    {
      "id": "l2404_e4",
      "type": "shift_select",
      "prompt": "The capstone's whisper, decoded: 'Ich trinke einen _____ Kaffee.' (better):",
      "options": [
        "besserer",
        "besseres",
        "besseren",
        "besser"
      ],
      "target_answer": "besseren",
      "meaning": "einen besseren Kaffee = a better coffee",
      "explanation": "einen already carries the accusative flag, so the adjective goes weak: besseren. The flag passes from article to adjective only when the article goes quiet."
    },
    {
      "id": "l2404_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"Kaltes Wasser ist besser als warmer Kaffee = cold water is better than warm coffee\"",
      "target_answer": "Kaltes Wasser ist besser als warmer Kaffee",
      "meaning": "Kaltes Wasser ist besser als warmer Kaffee = cold water is better than warm coffee",
      "vocab_hints": [
        {
          "word": "warmer",
          "translation": "warm (no article, masculine)",
          "note": "strong ending -er after a bare masculine noun"
        }
      ],
      "word_bank": [
        "hat",
        "Wasser",
        "das",
        "Kaltes",
        "ist",
        "warmer",
        "Kaffee",
        "als",
        "besser"
      ],
      "explanation": "Two strong adjectives in one sentence — kaltes (neuter) and warmer (masculine) — plus the als-comparison from the Sentence Gym.",
      "idea": "Kaltes Wasser ist besser als warmer Kaffee = cold water is better than warm coffee",
      "idea_parts": [
        "Kaltes Wasser ist besser als warmer Kaffee",
        "= cold water is better than warm coffee (verb in position 2)"
      ],
      "cues": [
        "Start with \"Kaltes\" and anchor \"Wasser\" in position 2.",
        "Close the frame with \"Kaffee\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Decline adjectives before bare nouns (strong) and after ein-family flags (mixed), including einen besseren Kaffee.",
    "use_example": {
      "german": "Kaltes Wasser ist besser als warmer Kaffee.",
      "english": "Cold water is better than warm coffee."
    },
    "takeaway": "No article → the adjective goes strong (-er/-es/-e, the demonstrative endings); a flagged article → the adjective falls back to weak.",
    "curiosity_teaser": "Next: hidden shifts I — the quiet V→B family: geben↔give, über↔over, sieben↔seven."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from No Article? The Adjective Goes Strong (Kaltes Wasser ist besser als warmer Kaffee = cold water is better than warm coffee):",
    "target_answer": "Kaltes Wasser ist besser als warmer Kaffee",
    "word_bank": [
      "ist",
      "nicht",
      "warmer",
      "Wasser",
      "als",
      "heute",
      "besser",
      "Kaffee",
      "Kaltes"
    ],
    "explanation": "Re-assembling \"Kaltes Wasser ist besser als warmer Kaffee\" from scratch locks in the structural pattern of No Article? The Adjective Goes Strong without relying on short-term echo."
  }
};

export default lesson;
