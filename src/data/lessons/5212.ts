import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5212,
  "slug": "in-der-kueche-herd-ofen-seife-kamm-klingel",
  "title": "In der Küche: der Herd, der Ofen, die Seife, der Kamm, die Klingel",
  "subtitle": "the stove and its hearth-cousin, soap's old P→F badge — and a look-alike that is not a twin",
  "phase": 3,
  "shift_categories": [
    "th_to_d",
    "p_to_pf_f"
  ],
  "word_ids": [
    "herd",
    "ofen",
    "seife",
    "kamm",
    "klingel",
    "sekunde",
    "küche",
    "heiß",
    "wasser",
    "tür",
    "hand",
    "bad",
    "kuchen"
  ],
  "table_word_ids": [
    "herd",
    "ofen",
    "seife",
    "kamm",
    "klingel",
    "sekunde",
    "küche",
    "heiß",
    "wasser",
    "tür",
    "hand",
    "bad",
    "kuchen",
    "durstig",
    "feld",
    "seitdem"
  ],
  "hook": {
    "title": "Cousins, Twins, and One False Twin",
    "content": "der Herd and English hearth are cousins, not twins: two old words for the fire-place, *herþuz and *kerþą, that wandered apart at the very start — German hardened the old þ to d (Herd), English kept the th (hearth), the same law that made drei out of three. die Seife and soap are genuine twins from Proto-Germanic *saipō — a word so good that Rome bought it: Latin sapo, the Romans' hair-dye soap, is Germanic in origin, and German shifted the P to F (Seife) while English kept it (soap). der Kamm ↔ comb is the plain twin, *kambaz on both sides of the North Sea. die Klingel is klingen made into a thing — and klingen's own cousin is English clink, the same bell-root with an echo. And then the surprise: der Ofen looks like oven because it IS oven's twin — the same ancient Germanic word, on record since the eighth century on both shores (OHG ovan, OE ofen), originally the cooking pot, with English wearing the v where German wears the f. The stranger in this family is English furnace — Latin furnus, a different root entirely — the look-alike that ended up in English, not German. The kitchen is where honesty pays: cousins, twins, and one beautiful false twin — and the false twin is furnace, not Ofen.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Rome Bought Its Soap-Word",
        "content": "Pliny the Elder writes that sapo — a mix of tallow and beech ash — was a Gaulish invention the Romans used on their hair, not their bodies. The word is Germanic *saipō borrowed into Latin, which is why die Seife and soap can be twins across the North Sea while Latin holds a loan-copy."
      }
    ]
  },
  "pattern": {
    "title": "Hot Things, Closed Doors, Small Machines",
    "content": "1. The warning frame: Eine Sekunde, bitte, der Herd ist heiß — eine because die Sekunde is feminine, bitte because the stove does not negotiate. 2. Location: Der Kuchen ist im Ofen, die Klingel ist an der Tür — im for what bakes inside, an der for what hangs on the surface. 3. The imperative: Wasch die Hände mit Seife — waschen drops to Wasch in the du-imperative, mit + dative for the tool. 4. Carrying things between rooms: Der Kamm ist in der Tasche — the comb travels, the Wohnen-II Tasche holds it.",
    "footnotes": [],
    "linguist_note": "The h/k pair in *herþuz and *kerþą is an old variation inside Germanic, not a one-off: the same wobble separates German Hürde from English hurdle, two words for a woven frame. That is why dictionaries print the hearth and Herd reconstructions as two related forms rather than one word — cousins with a shared fire-place, diverging before either language had a spelling to argue about."
  },
  "exercises": [
    {
      "id": "l5212_e1",
      "type": "matching_pairs",
      "prompt": "In der Küche — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "c11",
          "english": "One second please, the stove is hot",
          "german": "Eine Sekunde, bitte, der Herd ist heiß"
        },
        {
          "id": "c12",
          "english": "The cake is in the oven",
          "german": "Der Kuchen ist im Ofen"
        },
        {
          "id": "c13",
          "english": "Wash your hands with soap",
          "german": "Wasch die Hände mit Seife"
        },
        {
          "id": "c14",
          "english": "The bell is at the door",
          "german": "Die Klingel ist an der Tür"
        },
        {
          "id": "c15",
          "english": "The comb is in the bag",
          "german": "Der Kamm ist in der Tasche"
        },
        {
          "id": "c16",
          "english": "We are cooking in the kitchen",
          "german": "Wir kochen in der Küche"
        }
      ],
      "target_answer": "Eine Sekunde, bitte, der Herd ist heiß, Der Kuchen ist im Ofen, Wasch die Hände mit Seife, Die Klingel ist an der Tür, Der Kamm ist in der Tasche, Wir kochen in der Küche",
      "meaning": "a hot stove and one second of patience, a cake in the oven, washed hands, a bell at the door, a comb in the bag, cooking in the kitchen",
      "explanation": "Five rooms' worth of small machines. im Ofen is dative because the cake rests inside; an der Tür because the bell hangs at the surface; and Wasch is the bare du-imperative — the ending left with the hands it washes."
    },
    {
      "id": "l5212_e2",
      "type": "shift_select",
      "prompt": "Which kitchen word wears the P→F badge that separates English soap from its German twin?",
      "options": [
        "der Ofen",
        "die Seife",
        "die Klingel",
        "der Kamm"
      ],
      "target_answer": "die Seife",
      "meaning": "Seife ↔ soap: the P→F shift, with Rome holding a loan-copy",
      "explanation": "*saipō kept its P in English soap and shifted it to F in German Seife — the pool/Pfuhl law at work in your bathroom. Rome liked the word enough to borrow it as sapo, so the Latin copy sits between the two Germanic twins."
    },
    {
      "id": "l5212_e3",
      "type": "reverse_cognate",
      "prompt": "One of these kitchen words is the twin everyone misreads — people call it a Latin borrowing, but it is the family's own, on record since the eighth century. Which?",
      "options": [
        "die Seife",
        "der Kamm",
        "der Ofen",
        "die Klingel"
      ],
      "target_answer": "der Ofen",
      "meaning": "der Ofen and oven are the same old Germanic word — the twin that survived on both shores",
      "explanation": "der Ofen is oven's true twin — the same ancient Germanic word (OHG ovan, OE ofen; it began as the cooking pot), with English wearing the v where German wears the f. The real Latin stranger is English furnace, from furnus — a different root entirely. der Kamm is comb's twin (*kambaz), die Klingel runs on klingen's root with English clink, and die Seife is soap's twin (*saipō)."
    },
    {
      "id": "l5212_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the warning: 'One second please, the stove is hot'",
      "tile_options": [
        "der",
        "Sekunde",
        "heiß",
        "Eine",
        "bitte",
        "Kamm",
        "ist",
        "Herd"
      ],
      "target_answer": "Eine Sekunde, bitte, der Herd ist heiß",
      "meaning": "One second please, the stove is hot",
      "explanation": "die Sekunde is feminine, so the counted time takes eine — Eine Sekunde, bitte — and der Herd ist heiß delivers the reason. The Herd is the hearth-cousin: German's d where hearth keeps its th."
    },
    {
      "id": "l5212_e5",
      "type": "transcribe",
      "prompt": "Say it in German:",
      "idea": "you are baking and need the kitchen to yourself: the cake is in the oven and the water is hot",
      "cues": [
        "der Ofen — oven's own twin: English wears the v where German wears the f"
      ],
      "target_answer": "Der Kuchen ist im Ofen und das Wasser ist heiß",
      "meaning": "The cake is in the oven and the water is hot",
      "word_bank": [
        "Kuchen",
        "im",
        "Tür",
        "heiß",
        "Herd",
        "ist",
        "Ofen",
        "Wasser",
        "das",
        "ist",
        "und",
        "Der"
      ],
      "explanation": "im Ofen contracts in + dem for the masculine — the cake bakes inside, so dative. das Wasser ist heiß carries the shift story twice over: Wasser and heiß both wear the T→S badge, the kitchen's most common sound law.",
      "diagnosis": {
        "slip": "the dative in the Ofen phrase collapsed to den",
        "cue": "in + the masculine dative is im — in dem Ofen contracts. The accusative den would mean motion INTO the oven, and nobody wants that sentence."
      }
    }
  ],
  "summary": {
    "outcome": "Run a German kitchen: warn about the hot Herd, bake im Ofen, wash mit Seife, and spot the twin everyone misreads on the shelf.",
    "use_example": {
      "german": "Eine Sekunde, bitte — der Herd ist heiß und der Kuchen ist im Ofen.",
      "english": "One second please — the stove is hot and the cake is in the oven."
    },
    "takeaway": "Herd and hearth are cousins (þ→d), Seife and soap are twins with Rome holding a loan-copy, Kamm ↔ comb and Klingel ↔ clink ring true — and der Ofen is oven itself: the twin both shores kept, with English furnace as the family's real Latin stranger.",
    "curiosity_teaser": "Next: Essen I — der Fisch, das Fleisch, der Käse, die Suppe, das Gemüse — the meal itself, after all this kitchen talk."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from In der Küche: der Herd, der Ofen, die Seife, der Kamm, die Klingel (The cake is in the oven and the water is hot):",
    "target_answer": "Der Kuchen ist im Ofen und das Wasser ist heiß",
    "word_bank": [
      "nicht",
      "Der",
      "und",
      "Ofen",
      "heute",
      "das",
      "Kuchen",
      "heiß",
      "im",
      "ist",
      "ist",
      "Wasser"
    ],
    "explanation": "Re-assembling \"Der Kuchen ist im Ofen und das Wasser ist heiß\" from scratch locks in the structural pattern of In der Küche: der Herd, der Ofen, die Seife, der Kamm, die Klingel without relying on short-term echo."
  }
};

export default lesson;
