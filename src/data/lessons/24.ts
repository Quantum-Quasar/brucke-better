import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 24,
  "slug": "comparatives-and-suppletion",
  "title": "Comparatives & Suppletion",
  "subtitle": "gut→besser is good→better — the twin suppletion; kalt→kälter fires the umlaut",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "gut",
    "besser",
    "kalt",
    "alt",
    "hoch",
    "mehr",
    "groß",
    "wasser",
    "spät",
    "maus",
    "vogel",
    "kuh",
    "spiel",
    "stunde"
  ],
  "table_word_ids": [
    "gut",
    "besser",
    "kalt",
    "alt",
    "hoch",
    "groß",
    "mehr",
    "wasser",
    "spät",
    "maus",
    "vogel",
    "kuh",
    "spiel",
    "stunde",
    "interesse",
    "fest"
  ],
  "hook": {
    "title": "The Twin Irregulars",
    "content": "English says good, better. German says gut, besser. These are not similar forms — they are the same SUPPLETION: both languages replaced the missing comparative of 'good' with a word from the same ancient root (*bazizon, 'better'). And the regular comparatives are just as musical: alt → älter, kalt → kälter, hoch → höher — the umlaut you just learned as plural-maker fires again in comparison. English once did this too: old → elder, and 'elder' is still in your dictionary. German never stopped.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Elder and Älter Are One",
        "content": "English 'elder/elders' and German 'älter' are the same umlaut comparative of old/alt. The church kept 'elders' alive in English; daily speech swapped in 'older'. German never swapped — alt/älter is daily bread."
      }
    ]
  },
  "pattern": {
    "title": "-er / -ste, With Umlaut On Request",
    "content": "The regular system mirrors English -er/-est exactly: schnell → schneller → am schnellsten. The umlaut squad: alt → älter, kalt → kälter, groß → größer, hoch → höher, jung → jünger — short adjectives love the dots. The suppletive twins: gut → besser ↔ good → better; viel → mehr ↔ much → more. Comparisons use als (than): Ich bin älter als du. Equality uses wie: so groß wie (as big as). Superlatives take am + -sten: am besten (best — and best/besten are twins too).",
    "footnotes": [],
    "linguist_note": "besser ← *bazizon and better ← *batizon are parallel descendants of one Proto-Germanic comparative; the b and the ss report the shift laws (V→B, T→SS) doing paperwork on an irregular word."
  },
  "exercises": [
    {
      "id": "l24_e1",
      "type": "matching_pairs",
      "prompt": "Match the twin comparisons:",
      "matching_pairs": [
        {
          "id": "cs1",
          "english": "good → better",
          "german": "gut → besser"
        },
        {
          "id": "cs2",
          "english": "old → elder",
          "german": "alt → älter"
        },
        {
          "id": "cs3",
          "english": "cold → colder",
          "german": "kalt → kälter"
        },
        {
          "id": "cs4",
          "english": "high → higher",
          "german": "hoch → höher"
        }
      ],
      "target_answer": "gut → besser, alt → älter, kalt → kälter, hoch → höher",
      "meaning": "the twin comparatives",
      "explanation": "Suppletion (gut/besser) and umlaut (älter, kälter, höher) — both systems shared, one fossilized in English."
    },
    {
      "id": "l24_e2",
      "type": "shift_select",
      "prompt": "Complete the twin suppletion: 'Das Wasser ist _____.' (better):",
      "options": [
        "besser",
        "am besten",
        "guter",
        "mehrer"
      ],
      "target_answer": "besser",
      "meaning": "Das Wasser ist besser = The water is better",
      "explanation": "gut → besser is good → better: the same inherited comparative, shifted per the laws. The shelf supplies the bases: die Maus, der Vogel, die Kuh — klein oder groß, every noun can enter a comparison."
    },
    {
      "id": "l24_e3",
      "type": "derive",
      "prompt": "Umlaut it: 'spät' as a comparative (later):",
      "english_hint": "sp + ä + ter",
      "target_answer": "später",
      "meaning": "später — later",
      "explanation": "spät → später: the umlaut moves the vowel forward, the -er does the comparing — kälter, älter, größer, später, one family."
    },
    {
      "id": "l24_e4",
      "type": "shift_select",
      "prompt": "Comparison word check: 'Ich bin älter _____ du.' (than you):",
      "options": [
        "mehr",
        "als",
        "wie",
        "denn"
      ],
      "target_answer": "als",
      "meaning": "Ich bin älter als du = I am older than you",
      "explanation": "Inequality takes als; equality takes wie (so groß wie). English 'than' and 'as' split one job German keeps in two words — das Spiel dauert eine Stunde: nouns to compare, als to compare them with."
    },
    {
      "id": "l24_e5",
      "type": "transcribe",
      "prompt": "Put into German:",
      "idea": "you're at the café counter making your preference known: the coffee is better than the tea",
      "cues": [
        "The twin suppletion does the work: gut → besser (good → better) — then als introduces the loser"
      ],
      "target_answer": "Der Kaffee ist besser als der Tee",
      "meaning": "The coffee is better than the tea",
      "word_bank": [
        "der",
        "Kaffee",
        "ist",
        "Der",
        "gut",
        "als",
        "besser",
        "Tee"
      ],
      "explanation": "Suppletive comparative + als — the twin irregular in a real argument at the café."
    }
  ],
  "summary": {
    "outcome": "Build -er/-ste comparatives with umlaut and use the gut/besser twin suppletion.",
    "use_example": {
      "german": "Der Kaffee ist besser als der Tee.",
      "english": "The coffee is better than the tea."
    },
    "takeaway": "gut→besser ↔ good→better: one inherited suppletion — and the umlaut squad (älter, kälter, höher) mirrors English elder.",
    "curiosity_teaser": "Next: the twin suppletions — gut→besser is good→better: the shared irregular story."
  },
  "twist": {
    "prompt": "Diplomacy check: soften the verdict — the coffee is better than the tea becomes the coffee is NOT better than the tea.",
    "target_answer": "Der Kaffee ist nicht besser als der Tee",
    "word_bank": [
      "Der",
      "Kaffee",
      "besser",
      "ist",
      "als",
      "nicht",
      "Tee",
      "der"
    ],
    "explanation": "nicht slides in before the adjective it negates — after ist, before besser. The comparison stands; only the verdict flips."
  }
};

export default lesson;
