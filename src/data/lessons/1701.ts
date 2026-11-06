import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1701,
  "slug": "counting-cognates-gym",
  "title": "Counting Cognates Gym",
  "subtitle": "Phone numbers, prices, ages — and the elf ≠ elf trap",
  "phase": 3,
  "shift_categories": [
    "t_to_s_ss_z"
  ],
  "word_ids": [
    "zwei",
    "drei",
    "zwanzig",
    "elf",
    "zwölf",
    "dreißig",
    "uhr",
    "sieben",
    "acht",
    "hundert",
    "minute",
    "zählen"
  ],
  "table_word_ids": [
    "zwei",
    "drei",
    "zwanzig",
    "elf",
    "zwölf",
    "dreißig",
    "uhr",
    "sieben",
    "acht",
    "hundert",
    "minute",
    "zählen",
    "mahlzeit",
    "jahreszeit",
    "russisch",
    "grüßen"
  ],
  "hook": {
    "title": "Numbers in the Wild",
    "content": "You own the shift-ledger numbers — now spend them. Prices: Das kostet zwölf Euro. Ages: Ich bin dreißig. Time: Es ist acht Uhr. Phone numbers, read digit by digit: zwei–null–eins... And the trap that snags every learner at once: elf means eleven — but there is also die Elfe, the fairy, a modern borrowing from English elf. Same letters, different words, different genders. In the wild, context decides; in this gym, reps decide.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Zwo — the Anti-Mishear",
        "content": "On the phone and in radio traffic, Germans often say zwo for zwei — because zwei and drei differ by one sound and mix-ups cost lives on the autobahn. Pilots and the Bundeswehr say zwo too. two got a stunt double."
      }
    ]
  },
  "pattern": {
    "title": "Spend the Numbers",
    "content": "Prices: Das kostet zwanzig Euro — Euro is the same word in both languages. Ages: Ich bin dreißig Jahre alt (Jahre — year, the distant cousin of Uhr via the same PIE root). Clock: Es ist sieben Uhr — sieben is the v→b twin of seven, acht the gh→ch twin of eight. Compound numbers: einundzwanzig (21, where 'one' becomes ein-), zweiundzwanzig, dreiundzwanzig — the ones ALWAYS lead, reading like 'three-and-twenty'.",
    "footnotes": [],
    "linguist_note": "The ein- of einundzwanzig shows the ein-family doing number duty — the same ein as 'one/a'. English 'one' and German ein are twins; the article was always a number that got tired of counting."
  },
  "exercises": [
    {
      "id": "l1701_e1",
      "type": "matching_pairs",
      "prompt": "Match the number words with their English twins:",
      "matching_pairs": [
        {
          "id": "cc1",
          "english": "seven",
          "german": "sieben"
        },
        {
          "id": "cc2",
          "english": "eight",
          "german": "acht"
        },
        {
          "id": "cc3",
          "english": "eleven",
          "german": "elf"
        },
        {
          "id": "cc4",
          "english": "thirty",
          "german": "dreißig"
        },
        {
          "id": "cc5",
          "english": "hundred",
          "german": "hundert"
        }
      ],
      "target_answer": "sieben, acht, elf, dreißig, hundert",
      "meaning": "seven, eight, eleven, thirty, hundred",
      "explanation": "seven's v hardened to b, eight's gh became ch, elf kept its 'one-left', dreißig double-shifted — and the counting verb counts itself in: zählen, tale's twin, zählt die Zeit und bis hundert."
    },
    {
      "id": "l1701_e2",
      "type": "shift_select",
      "prompt": "Trap check: 'Die Elfe tanzt im Garten.' What is dancing?",
      "options": [
        "A clock",
        "An eleven-person dance",
        "The number eleven",
        "A fairy (die Elfe — the borrowed creature-word)"
      ],
      "target_answer": "A fairy (die Elfe — the borrowed creature-word)",
      "meaning": "elf (number) ≠ die Elfe (fairy)",
      "explanation": "The number elf has no article; the fairy die Elfe was borrowed from English 'elf' in the 18th century. Context and article decide."
    },
    {
      "id": "l1701_e3",
      "type": "morpheme_tiles",
      "prompt": "Build 23 the German way (ones first):",
      "tile_options": [
        "dreißig",
        "zwanzig",
        "drei",
        "zwei",
        "und"
      ],
      "target_answer": "dreiundzwanzig",
      "meaning": "twenty-three",
      "explanation": "drei + und + zwanzig — 'three-and-twenty', the archaic English order, written as one word. Minutes follow the same arithmetic: eine Minute, zwanzig Minuten — one always leads the line."
    },
    {
      "id": "l1701_e4",
      "type": "derive",
      "prompt": "Say your age: 'Ich bin _____.' (30):",
      "english_hint": "the double-shift number with the ß",
      "target_answer": "dreißig",
      "meaning": "Ich bin dreißig = I am thirty",
      "explanation": "dreißig — drei's th→d plus thirty's t→ß. The only number that spelled its shift. Moving day runs on the clock too: um acht Uhr wollen wir ausziehen."
    },
    {
      "id": "l1701_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The bus costs twenty euros'",
      "target_answer": "Der Bus kostet zwanzig Euro",
      "meaning": "The bus costs twenty euros",
      "vocab_hints": [
        {
          "word": "kostet",
          "translation": "costs (er/es form)",
          "note": "die Kosten — the costs; the -et is the er-form ending on a stem that ends in -t"
        }
      ],
      "word_bank": [
        "Bus",
        "Der",
        "weil",
        "Euro",
        "in",
        "zwanzig",
        "kostet"
      ],
      "explanation": "Verb in position 2, price at the end: 'Der Bus kostet zwanzig Euro' — der Bus and Euro are your free cognates."
    }
  ],
  "summary": {
    "outcome": "Use numbers for prices, ages, clock time — and survive the elf/Elfe trap.",
    "use_example": {
      "german": "Der Bus kostet zwanzig Euro.",
      "english": "The bus costs twenty euros."
    },
    "takeaway": "Numbers are shift-ledger words — and German says 23 as 'three-and-twenty', ones first, always.",
    "curiosity_teaser": "Next: Days of Thunder — the weekday etymologies of Donner, Mitte and Sonne in one calendar."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Counting Cognates Gym (The bus costs twenty euros):",
    "target_answer": "Der Bus kostet zwanzig Euro",
    "word_bank": [
      "kostet",
      "Bus",
      "Euro",
      "zwanzig",
      "nicht",
      "Der",
      "heute"
    ],
    "explanation": "Re-assembling \"Der Bus kostet zwanzig Euro\" from scratch locks in the structural pattern of Counting Cognates Gym without relying on short-term echo."
  }
};

export default lesson;
