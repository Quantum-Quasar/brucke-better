import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2403,
  "slug": "adjective-endings-articles-echo",
  "title": "Adjective Endings: the Article's Echo",
  "subtitle": "der kalte Tag vs ein kalter Tag — the adjective only speaks when the article is silent",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "kalt",
    "gut",
    "alt",
    "schön",
    "klein",
    "groß",
    "lang",
    "lecker",
    "neu",
    "spät",
    "schnell",
    "schwer"
  ],
  "table_word_ids": [
    "kalt",
    "gut",
    "alt",
    "schön",
    "klein",
    "groß",
    "lang",
    "lecker",
    "neu",
    "spät",
    "schnell",
    "schwer",
    "puls",
    "unfall",
    "geschäftsmann"
  ],
  "hook": {
    "title": "One Flag Per Phrase",
    "content": "German grammar allows exactly ONE flag-carrier per noun phrase — one ending that shouts the case and gender. When der/die/das stands in front, the article carries the flag and the adjective falls silent-ish: der kalt**e** Tag. But ein is a quiet article — it has no ending in the masculine nominative — so the adjective must pick the flag up: ein kalt**er** Tag. That is the whole system: the adjective is the article's echo, speaking only when the article cannot. English ran this same show once — 'the olden days', 'mine host' — and then let the endings go. German never did.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Predicative = No Flag At All",
        "content": "Der Tag ist kalt — no ending, because the adjective is not INSIDE a noun phrase, it stands alone after ist. The echo only sounds before a noun: der kalte Tag, but der Tag ist kalt. English does exactly the same: 'the cold day' vs 'the day is cold'."
      }
    ]
  },
  "pattern": {
    "title": "The 80/20 Echo Rule",
    "content": "After der/die/das (the loud articles): adjective takes -e in the nominative singular and -en almost everywhere else — der kalte Tag, den kalten Tag, die kalte Nacht, das kalte Wasser. After ein/kein/mein (the quiet articles): the adjective copies the article's missing ending — ein kalt**er** Tag (masc. nom.), ein kalt**es** Wasser (neut. nom./acc.), but ein kalt**en** Tee (masc. acc.), eine kalt**e** Nacht (fem.). The 80/20: when in doubt before ANY noun in real sentences, -en is the safe echo — den kalten Tee, mit einem kalten Getränk, die kalten Hände. Pattern: der gute Wein, ein guter Wein, der alte Kaffee, ein alter Kaffee, die kleine Nacht, eine kleine Nacht.\n\nRemember the golden boundary of this law: Predicate adjectives (adjectives that stand after 'ist/sind' rather than in front of a noun, like 'Der Kaffee ist kalt' or 'Die Suppe ist heiß') take NO ending at all — only an adjective standing directly in front of a noun wears a case/gender flag.",
    "footnotes": [],
    "linguist_note": "The two declensions are the living remains of the older demonstrative system: der/die/das and dieser/jener carry their own case endings (they ARE the old demonstratives), so the adjective never needs to double up. Ein is historically 'one' — a bare numeral with no flag — so the adjective is drafted to carry it."
  },
  "exercises": [
    {
      "id": "l2403_e1",
      "type": "matching_pairs",
      "prompt": "Match each noun phrase with who carries the case flag:",
      "matching_pairs": [
        {
          "id": "ae1",
          "english": "the cold day (article's flag)",
          "german": "der kalte Tag"
        },
        {
          "id": "ae2",
          "english": "a cold day (adjective's flag)",
          "german": "ein kalter Tag"
        },
        {
          "id": "ae3",
          "english": "the cold water (article's flag)",
          "german": "das kalte Wasser"
        },
        {
          "id": "ae4",
          "english": "a cold water (adjective's flag)",
          "german": "ein kaltes Wasser"
        }
      ],
      "target_answer": "der kalte Tag, ein kalter Tag, das kalte Wasser, ein kaltes Wasser",
      "meaning": "the cold day, a cold day, the cold water, a cold water",
      "explanation": "After der/die/das the adjective rests (-e); after ein it echoes the article's missing -er/-es. lecker (delicious — lick's cousin) rests to -e after der: der leckere Kuchen; neu goes strong after ein: ein neues Auto."
    },
    {
      "id": "l2403_e2",
      "type": "shift_select",
      "prompt": "'Ich nehme ein _____ Bier.' (a cold beer — ein is quiet, so who speaks?):",
      "options": [
        "kalte",
        "kalter",
        "kaltes",
        "kalten"
      ],
      "target_answer": "kaltes",
      "meaning": "ein kaltes Bier = a cold beer (neuter: the adjective echoes -es)",
      "explanation": "das Bier is neuter; ein shows no ending, so the adjective carries the neuter flag: kaltes. The speed set: ein schneller Zug, ein später Zug — ein goes quiet, the adjective speaks."
    },
    {
      "id": "l2403_e3",
      "type": "shift_select",
      "prompt": "'Ich trinke den kalt___ Tee.' (the cold tea — masculine accusative):",
      "options": [
        "e",
        "es",
        "er",
        "en"
      ],
      "target_answer": "en",
      "meaning": "den kalten Tee = the cold tea",
      "explanation": "den already flags the accusative loudly, and the adjective echoes it with -en — the 80/20 ending that covers most real sentences. schwer joins the echo: den schweren Kuchen — the dense cake."
    },
    {
      "id": "l2403_e4",
      "type": "shift_select",
      "prompt": "Which noun phrase correctly echoes after the quiet article?",
      "options": [
        "ein alter Kaffee",
        "ein alten Kaffee",
        "ein altes Kaffee",
        "ein alte Kaffee"
      ],
      "target_answer": "ein alter Kaffee",
      "meaning": "ein alter Kaffee = an old coffee (masculine nominative)",
      "explanation": "der Kaffee is masculine; ein is endingless in the nominative, so alt picks up the masculine -er exactly as der would wear it."
    },
    {
      "id": "l2403_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the phrase pair: 'The old wine is good'",
      "target_answer": "Der alte Wein ist gut",
      "meaning": "Der alte Wein ist gut = the old wine is good",
      "vocab_hints": [
        {
          "word": "alte",
          "translation": "old (before a noun)",
          "note": "alt + -e: the echo after the loud article der"
        }
      ],
      "word_bank": [
        "ein",
        "Der",
        "Wein",
        "alte",
        "gut",
        "sehr",
        "ist"
      ],
      "explanation": "der carries the flag, alte echoes with -e — and predicative gut stays bare, because outside the noun phrase nobody echoes."
    }
  ],
  "summary": {
    "outcome": "Choose adjective endings after der/die/das vs ein/kein/mein, using the one-flag principle and the 80/20 -en rule.",
    "use_example": {
      "german": "Der kalte Kaffee ist gut, aber ein kalter Tee ist besser.",
      "english": "The cold coffee is good, but a cold tea is better."
    },
    "takeaway": "One flag per phrase: loud articles speak, quiet ein/kein/mein force the adjective to echo (-er/-es), and -en is the 80% default.",
    "curiosity_teaser": "Next: no article? the adjective goes strong — kaltes Wasser, heißer Tee: the ending does the article's job alone."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Adjective Endings: the Article's Echo (Der alte Wein ist gut = the old wine is good):",
    "target_answer": "Der alte Wein ist gut",
    "word_bank": [
      "gut",
      "ist",
      "Der",
      "Wein",
      "heute",
      "nicht",
      "alte"
    ],
    "explanation": "Re-assembling \"Der alte Wein ist gut\" from scratch locks in the structural pattern of Adjective Endings: the Article's Echo without relying on short-term echo."
  }
};

export default lesson;
