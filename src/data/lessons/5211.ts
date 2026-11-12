import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5211,
  "slug": "am-tisch-gabel-messer-flasche-becher-kanne",
  "title": "Am Tisch: die Gabel, das Messer, die Flasche, der Becher, die Kanne",
  "subtitle": "a knife that is literally a meat-saw, and three words Latin handed to both languages",
  "phase": 3,
  "shift_categories": [
    "t_to_s_ss_z"
  ],
  "word_ids": [
    "gabel",
    "messer",
    "flasche",
    "becher",
    "kanne",
    "zahl",
    "hälfte",
    "moment",
    "teller",
    "tisch",
    "heiß",
    "wasser",
    "kaffee"
  ],
  "table_word_ids": [
    "gabel",
    "messer",
    "flasche",
    "becher",
    "kanne",
    "zahl",
    "hälfte",
    "moment",
    "teller",
    "tisch",
    "heiß",
    "wasser",
    "kaffee",
    "salzig",
    "anzug",
    "zäh"
  ],
  "hook": {
    "title": "The Knife Is a Meat-Saw",
    "content": "das Messer is the oldest compound at the table: Proto-Germanic *matisahsą, built from *mati, 'food' — the exact word English meat comes from, which originally meant food of any kind — plus *sahs, 'blade', the word Old Norse preserved as sax. German shifted food's T to a Z (mati → mezzi, the zehn/two shift) and squeezed the compound down to Messer. The knife literally is a meat-blade. die Flasche and English flask are the same Germanic word, *flaska — but English had to borrow its own word BACK through Medieval Latin flasco, a boomerang loan. der Becher is Latin bicarium, which English borrowed as beaker; die Kanne most likely goes back to Latin canna, 'reed', the little tube that became German Kanne and English can — the standard guess, though not a settled fact. die Gabel is the honest loss: pure Germanic *gabulō, with no English twin — English took 'fork' from Latin furca instead.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Meat Once Meant Food",
        "content": "In Old English, mete meant food in general — 'sweetmeats', originally, were just sweets. So *matisahsą was not a 'meat-knife' in the modern sense; it was simply the food-knife, the blade you cut dinner with. German compressed the whole idea into seven letters: Messer."
      }
    ]
  },
  "pattern": {
    "title": "Pouring, Cutting, Counting",
    "content": "1. aus for what comes out: Ich trinke den Kaffee aus dem Becher — aus + dem, the drink leaves the vessel. 2. in for what goes in: Das Wasser ist in der Flasche — in + der, the water stays put. 3. Hot things get a warning frame: Einen Moment, bitte, die Kanne ist heiß — einen because der Moment is masculine accusative, bitte because politeness is free. 4. Counting the table: Die Zahl ist vier (the number is four), and the numeral again takes the bare plural — vier Teller, vier Gabeln, no article. 5. The half: Die Hälfte der Teller ist hier — die Hälfte governs the genitive, and the verb agrees with the singular Hälfte, not the plural Teller.",
    "footnotes": [],
    "linguist_note": "The standard guess: Latin canna 'reed' gave Germanic *kannō, 'small container' — perhaps, not proven. English kept it tiny (can), German made it elegant (die Kanne) — and if the guess holds, both languages still pour from the same Latin reed."
  },
  "exercises": [
    {
      "id": "l5211_e1",
      "type": "matching_pairs",
      "prompt": "Am Tisch — match each sentence with its reading. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "t11",
          "english": "A moment please, the pot is hot",
          "german": "Einen Moment, bitte, die Kanne ist heiß"
        },
        {
          "id": "t12",
          "english": "The water is in the bottle",
          "german": "Das Wasser ist in der Flasche"
        },
        {
          "id": "t13",
          "english": "I drink the coffee from the mug",
          "german": "Ich trinke den Kaffee aus dem Becher"
        },
        {
          "id": "t14",
          "english": "Half of the plates are here",
          "german": "Die Hälfte der Teller ist hier"
        },
        {
          "id": "t15",
          "english": "The number is four",
          "german": "Die Zahl ist vier"
        },
        {
          "id": "t16",
          "english": "The fork and the knife are on the table",
          "german": "Die Gabel und das Messer sind auf dem Tisch"
        },
        {
          "id": "recall1",
          "german": "die Etage",
          "english": "the floor (storey)"
        }
      ],
      "target_answer": "Einen Moment, bitte, die Kanne ist heiß, Das Wasser ist in der Flasche, Ich trinke den Kaffee aus dem Becher, Die Hälfte der Teller ist hier, Die Zahl ist vier, Die Gabel und das Messer sind auf dem Tisch, die Etage",
      "meaning": "A moment please, the pot is hot; The water is in the bottle; I drink the coffee from the mug; Half of the plates are here; The number is four; The fork and the knife are on the table; the floor (storey)",
      "explanation": "The table set in six sentences. in der Flasche is dative because the water rests there; aus dem Becher is dative because the coffee only leaves it; and die Gabel und das Messer shows the gender flip — die, then das — with no warning."
    },
    {
      "id": "l5211_e2",
      "type": "shift_select",
      "prompt": "Which of these table words wears the T→Z badge that turned *mati into mezzi-, food into meat's German twin?",
      "options": [
        "das Messer",
        "die Flasche",
        "der Becher",
        "die Kanne"
      ],
      "target_answer": "das Messer",
      "meaning": "messer's first half wears the T→Z badge: *mati → mezzi",
      "explanation": "das Messer is ancient *matisahsą: *mati 'food' + *sahs 'blade'. English meat kept the T of *mati; German hardened it to a Z-sound, exactly as in zwei/two and zehn/ten. The second half, *sahs 'blade', survives intact in Old Norse sax — the meat-saw that became das Messer. die Flasche, der Becher and die Kanne wear no shift badge; they are loans."
    },
    {
      "id": "l5211_e3",
      "type": "reverse_cognate",
      "prompt": "der Becher is German's version of Latin bicarium — give the English word borrowed from the same Latin:",
      "target_answer": "beaker",
      "meaning": "der Becher ↔ beaker — both from Latin bicarium",
      "explanation": "Latin bicarium served both languages: German took der Becher straight, English took beaker (and via Old Norse, bikarr). The same Latin poured die Flasche's cousin flask back into English and turned die Kanne's reed into a can."
    },
    {
      "id": "l5211_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the warning: 'A moment please, the pot is hot'",
      "tile_options": [
        "Moment",
        "Kanne",
        "die",
        "Wasser",
        "Teller",
        "Einen",
        "bitte",
        "ist",
        "heiß"
      ],
      "target_answer": "Einen Moment, bitte, die Kanne ist heiß",
      "meaning": "A moment please, the pot is hot",
      "explanation": "der Moment is masculine, so the accusative warning takes einen — a giveaway that English 'moment' never had. bitte softens it, and die Kanne ist heiß closes with the dangerous fact. The tiles Teller and Wasser are decoys from the rest of the table."
    },
    {
      "id": "l5211_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The number is four and the half is two'",
      "target_answer": "Die Zahl ist vier und die Hälfte ist zwei",
      "meaning": "The number is four and the half is two",
      "word_bank": [
        "ist",
        "zwei",
        "Teller",
        "die",
        "Gabeln",
        "ist",
        "Zahl",
        "vier",
        "Hälfte",
        "und",
        "Die"
      ],
      "explanation": "Setting the table with Zählen-I and Zählen-II grammar: die Zahl announces the count, die Hälfte halves it — vier Teller, zwei Gabeln — and the numeral again takes the bare plural with no article. The Teller and Gabeln in the bank are the pieces waiting to be counted."
    }
  ],
  "summary": {
    "outcome": "Set a table in German: pour from die Kanne, drink aus dem Becher, warn politely about what is heiß — and count die Zahl with bare plurals.",
    "use_example": {
      "german": "Einen Moment, bitte — die Kanne ist heiß, und die Zahl ist vier: vier Teller, vier Gabeln.",
      "english": "A moment please — the pot is hot, and the number is four: four plates, four forks."
    },
    "takeaway": "Messer is *matisahsą, the meat-saw (meat + the T→Z shift), Flasche and flask are one boomerang word, Becher and beaker share bicarium, Kanne and can probably share canna — and die Gabel stands alone, honestly.",
    "curiosity_teaser": "Next: the kitchen's real estate — der Herd, der Ofen, die Seife, der Kamm, die Klingel — and a word that really is oven's twin, with an f where English wears a v."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Am Tisch: die Gabel, das Messer, die Flasche, der Becher, die Kanne (The number is four and the half is two):",
    "target_answer": "Die Zahl ist vier und die Hälfte ist zwei",
    "word_bank": [
      "Die",
      "Hälfte",
      "heute",
      "zwei",
      "vier",
      "die",
      "und",
      "Zahl",
      "nicht",
      "ist",
      "ist"
    ],
    "explanation": "Re-assembling \"Die Zahl ist vier und die Hälfte ist zwei\" from scratch locks in the structural pattern of Am Tisch: die Gabel, das Messer, die Flasche, der Becher, die Kanne without relying on short-term echo."
  }
};

export default lesson;
