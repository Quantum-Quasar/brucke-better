import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5242,
  "slug": "farben-ii-braun-grau-rosa-lila-farbe",
  "title": "Farben II: braun, grau, rosa, lila, die Farbe",
  "subtitle": "the second row of the paintbox — two perfect twins, two imports, and the head noun that names them all",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "braun",
    "grau",
    "rosa",
    "lila",
    "farbe",
    "schwarz",
    "rot",
    "blau",
    "grün",
    "bunt",
    "auto",
    "himmel",
    "katze",
    "mütze"
  ],
  "table_word_ids": [
    "braun",
    "grau",
    "rosa",
    "lila",
    "farbe",
    "schwarz",
    "rot",
    "blau",
    "grün",
    "bunt",
    "auto",
    "himmel",
    "katze",
    "mütze",
    "rennen"
  ],
  "hook": {
    "title": "The Row Without a Badge",
    "content": "Farben I gave you five Germanic natives with shift stories. This row is quieter — and in its own way stranger. braun and grau are so old that neither language touched them: braun is English brown with the same consonants, and that w in the English spelling is simply the old u — German wrote the vowel, English later wrote it as w. grau is grey by the same trick. Neither wears a shift badge, because neither needs one: they are Proto-Germanic *brūnaz and *grēwaz, kept whole on both sides of the North Sea. rosa is the odd one out in a different way: it is Latin rosa itself — the exact word English keeps as rose — borrowed straight into German as a color adjective from Italian and French. lila arrived by an even longer road (see the footnote). And die Farbe is not a color at all but the head noun — the word that names the category and compounds it: die Farbenlehre is Goethe's great book on color theory, and whatever braun and grau are, they are Farben first.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Color That Sailed from India",
        "content": "lila began as Sanskrit nī́laḥ, 'dark blue', became Persian līlak/nīlak, 'bluish', then Arabic līlāk, then French lilas — the lilac shrub and its color — and finally German lila, clipped from the French in the 19th century. English took the identical loan as lilac: same Persian blue, same Arabic and French doorway, one purple arrival with two names."
      }
    ]
  },
  "pattern": {
    "title": "Where a Color Stands",
    "content": "Three frames, one of them borrowed. 1. After sein: Der Himmel ist grau (the sky is gray) — the color stands as the predicate and takes no ending. 2. In front of a noun it takes the endings you already know: ein brauner Hund, eine braune Katze — braun behaves like any native adjective. 3. The imports refuse: rosa and lila never decline — ein rosa Auto, die lila Mütze — they were borrowed finished and stay finished. And the head noun lets you ask and answer without pointing: Die Farbe der Mütze ist lila (the color of the cap is purple).",
    "footnotes": [],
    "linguist_note": "Duden's rule for rosa and lila is one line long: they do not decline. English went further and retired adjective endings altogether in the Middle Ages, so 'a purple cap' needs no agreement either. German kept the endings for its native stock and left the newest imports unfinished — loans enter through whatever door is already open."
  },
  "exercises": [
    {
      "id": "l5242_e1",
      "type": "matching_pairs",
      "prompt": "The second row — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "fc1",
          "english": "My car is gray",
          "german": "Mein Auto ist grau"
        },
        {
          "id": "fc2",
          "english": "The cat is brown",
          "german": "Die Katze ist braun"
        },
        {
          "id": "fc3",
          "english": "The flower is pink",
          "german": "Die Blume ist rosa"
        },
        {
          "id": "fc4",
          "english": "The cap is purple",
          "german": "Die Mütze ist lila"
        },
        {
          "id": "fc5",
          "english": "The flower is red",
          "german": "Die Blume ist rot"
        },
        {
          "id": "fc6",
          "english": "The color of the cap",
          "german": "Die Farbe der Mütze"
        },
        {
          "id": "fc7",
          "english": "Black and white are colors too",
          "german": "Schwarz und Weiß sind Farben"
        }
      ],
      "target_answer": "Mein Auto ist grau, Die Katze ist braun, Die Blume ist rosa, Die Mütze ist lila, Die Blume ist rot, Die Farbe der Mütze, Schwarz und Weiß sind Farben",
      "meaning": "gray, brown, pink, purple, red, the color",
      "explanation": "The same Blume wears rot from Farben I and rosa from Farben II — old row and new row in one sentence. And die Farbe is the head noun: the color OF the cap, genitive der."
    },
    {
      "id": "l5242_e2",
      "type": "shift_select",
      "prompt": "Four of these colors are Germanic natives; one crossed from India through Arabic and French — and English took the exact same journey with it. Which?",
      "options": [
        "blau",
        "lila",
        "braun",
        "grau"
      ],
      "target_answer": "lila",
      "meaning": "lila ↔ lilac: the same Persian loan, the same route",
      "explanation": "lila is French lilas clipped short, and English lilac is the same French word unclipped — Persian indigo to a purple paintbox, in both languages. braun, grau and blau never left the Germanic house."
    },
    {
      "id": "l5242_e3",
      "type": "reverse_cognate",
      "prompt": "'grau' and its English twin differ only in the last two letters — one diphthong kept, one dropped. Give the twin:",
      "target_answer": "grey",
      "meaning": "grau ↔ grey: the pure sound twin, no shift badge",
      "explanation": "Both come from Proto-Germanic *grēwaz. German kept the old w-glide — grēwaz became grau — while English lost it: grǣg, grey. braun/brown is the other twin of the row: same story, no badge needed."
    },
    {
      "id": "l5242_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the import sentence: 'The cap is purple'",
      "tile_options": [
        "grün",
        "bunt",
        "lila",
        "ist",
        "Mütze",
        "Die"
      ],
      "target_answer": "Die Mütze ist lila",
      "meaning": "The cap is purple",
      "explanation": "lila takes no ending even in front of the noun — eine lila Mütze, where eine grüne Mütze would take its -e. The imports stay imports: borrowed finished, uninflected, done."
    },
    {
      "id": "l5242_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"The sky is gray today\"",
      "target_answer": "Der Himmel ist heute grau",
      "meaning": "The sky is gray today",
      "word_bank": [
        "blau",
        "Himmel",
        "braun",
        "heute",
        "ist",
        "grau",
        "Der"
      ],
      "explanation": "Time word in the middle slot — Der Himmel ist heute grau, the same order as Der Zug fährt sehr früh. The bank holds two near-misses for contrast — braun from this row, blau from Farben I — but only grau fits: the sky is gray today.",
      "idea": "The sky is gray today",
      "idea_parts": [
        "The sky",
        "is gray today (verb in position 2)"
      ],
      "cues": [
        "Start with \"Der\" and anchor \"Himmel\" in position 2.",
        "Close the frame with \"grau\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Use the second row of colors after sein and before nouns — and leave rosa and lila endings-free.",
    "use_example": {
      "german": "Die Mütze ist lila und mein Auto ist grau.",
      "english": "The cap is purple and my car is gray."
    },
    "takeaway": "braun↔brown and grau↔grey are pure twins with no badge; rosa is Latin rosa (English rose); lila is Persian indigo (English lilac); die Farbe is the head noun that compounds them.",
    "curiosity_teaser": "Next: wheels and suitcases — das Fahrrad, der Koffer, die Karte, die Haltestelle, das Dorf."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Farben II: braun, grau, rosa, lila, die Farbe (The sky is gray today):",
    "target_answer": "Der Himmel ist heute grau",
    "word_bank": [
      "grau",
      "nicht",
      "ist",
      "heute",
      "Himmel",
      "Der"
    ],
    "explanation": "Re-assembling \"Der Himmel ist heute grau\" from scratch locks in the structural pattern of Farben II: braun, grau, rosa, lila, die Farbe without relying on short-term echo."
  }
};

export default lesson;
