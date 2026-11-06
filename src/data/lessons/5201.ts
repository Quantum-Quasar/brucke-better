import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5201,
  "slug": "wohnen-i-zimmer-wohnung-flur-keller-etage",
  "title": "Wohnen I: das Zimmer, die Wohnung, der Flur, der Keller, die Etage",
  "subtitle": "the rooms of a flat — and the twin hiding inside English timber",
  "phase": 3,
  "shift_categories": [
    "t_to_s_ss_z"
  ],
  "word_ids": [
    "zimmer",
    "wohnung",
    "flur",
    "keller",
    "etage",
    "dort",
    "gegenüber",
    "oben",
    "unten",
    "nähe",
    "weit",
    "sofa",
    "fenster"
  ],
  "table_word_ids": [
    "zimmer",
    "wohnung",
    "flur",
    "keller",
    "etage",
    "dort",
    "gegenüber",
    "oben",
    "unten",
    "nähe",
    "weit",
    "sofa",
    "fenster",
    "zinn",
    "zuerst",
    "ausländer",
    "zweifel"
  ],
  "hook": {
    "title": "The Room and the Timber",
    "content": "das Zimmer and English timber are the same Proto-Germanic word, *timrą — the building material. English kept the boards; German shifted the T to a Z-sound (the zehn/two shift) and kept the meaning 'room', because a room is what the timber builds. die Wohnung is wohnen's noun, the place where the living happens. der Keller is a Roman import both languages share: Latin cellarium became German Keller and English cellar. die Etage came from French étage — and English stage is its doublet, both from Old French estage, a 'standing place', which is why a stage is where actors stand and an Etage is where a flat stands. der Flur looks like floor, and the two may be distant cousins — but the trail is muddy, so treat the resemblance as a hint, not a proof. English lost the twin, if it ever had one.",
    "footnotes": [
      {
        "marker": "1",
        "title": "One Head Noun, Four Rooms",
        "content": "German builds rooms with a compound engine: das Wohnzimmer (living room, wohnen + Zimmer), das Schlafzimmer (schlafen + Zimmer), das Badezimmer (Bad + Zimmer), das Esszimmer (essen + Zimmer). Learn das Zimmer once and four rooms come free."
      }
    ]
  },
  "pattern": {
    "title": "Where the Rooms Stand",
    "content": "Position words do the navigating. 1. With sein: Der Keller ist dort unten (the basement is down there), Das Zimmer ist oben (the room is up top). 2. gegenüber after the noun: Das Haus gegenüber ist alt (the house opposite is old) — no preposition, the word leans back on its noun. 3. die Nähe with in: Der Markt ist in der Nähe (the market is nearby), Das Sofa ist in der Nähe vom Fenster (the sofa is near the window) — and the opposite is weit: der Weg ist weit (the way is far). 4. The compound engine: das Wohnzimmer, das Schlafzimmer, das Badezimmer, das Esszimmer — one head noun, four different front halves.",
    "footnotes": [],
    "linguist_note": "*timrą meant 'material for building', and its verb *timrjan 'to build' survives in English 'to timber' — to brace something with beams. English kept the engineer's word; German narrowed the noun to the finished product: the room."
  },
  "exercises": [
    {
      "id": "l5201_e1",
      "type": "matching_pairs",
      "prompt": "A flat, navigated — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "w11",
          "english": "The basement is down there",
          "german": "Der Keller ist dort unten"
        },
        {
          "id": "w12",
          "english": "The house opposite is old",
          "german": "Das Haus gegenüber ist alt"
        },
        {
          "id": "w13",
          "english": "The room is up top",
          "german": "Das Zimmer ist oben"
        },
        {
          "id": "w14",
          "english": "The sofa is near the window",
          "german": "Das Sofa ist in der Nähe vom Fenster"
        },
        {
          "id": "w15",
          "english": "My flat is big and bright",
          "german": "Meine Wohnung ist groß und hell"
        },
        {
          "id": "w16",
          "english": "The shoes are standing in the hallway",
          "german": "Die Schuhe stehen im Flur"
        }
      ],
      "target_answer": "Der Keller ist dort unten, Das Haus gegenüber ist alt, Das Zimmer ist oben, Das Sofa ist in der Nähe vom Fenster, Meine Wohnung ist groß und hell, Die Schuhe stehen im Flur",
      "meaning": "a basement down there, a house opposite, a room up top, a sofa near the window, a big bright flat, shoes in the hallway",
      "explanation": "Five rooms and four position words. gegenüber follows its noun like an afterthought, and die Schuhe stehen im Flur is where German boots live — standing, not lying, because stehen is the verb furniture prefers."
    },
    {
      "id": "l5201_e2",
      "type": "shift_select",
      "prompt": "Which of these rooms wears the T→Z badge that turned English timber into its German twin?",
      "options": [
        "die Etage",
        "der Keller",
        "das Zimmer",
        "der Flur"
      ],
      "target_answer": "das Zimmer",
      "meaning": "das Zimmer ↔ timber: the T→Z shift inside a doublet",
      "explanation": "*timrą kept its T in English timber and hardened it to a Z-sound in German Zimmer — the same law that made zwei out of two and zehn out of ten. One word became the material in English and the room in German. der Keller and die Etage are Latin and French imports, and der Flur's trail goes cold."
    },
    {
      "id": "l5201_e3",
      "type": "reverse_cognate",
      "prompt": "der Keller is German's borrowing of Latin cellarium — give the English word that borrowed the same Latin:",
      "target_answer": "cellar",
      "meaning": "der Keller ↔ cellar — both from Latin cellarium",
      "explanation": "Latin cellarium, a store-room, was borrowed whole by German (der Keller) and by English (cellar). And die Etage has its own doublet: French étage and English stage both come from Old French estage — English just kept the S."
    },
    {
      "id": "l5201_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the distance sentence: 'The market is nearby, the way is far'",
      "tile_options": [
        "Weg",
        "Keller",
        "der",
        "Der",
        "Nähe",
        "ist",
        "weit",
        "in",
        "ist",
        "Markt",
        "Zimmer",
        "der"
      ],
      "target_answer": "Der Markt ist in der Nähe, der Weg ist weit",
      "meaning": "The market is nearby, the way is far",
      "explanation": "in der Nähe is the fixed frame for 'nearby' — die Nähe always wears in der here — and weit answers it from the other end. der Weg is the same word family as German's way-verbs: the road you walk every day."
    },
    {
      "id": "l5201_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The bedroom is up there'",
      "target_answer": "Das Schlafzimmer ist dort oben",
      "meaning": "The bedroom is up there",
      "word_bank": [
        "Badezimmer",
        "Schlafzimmer",
        "Das",
        "dort",
        "Etage",
        "ist",
        "Zimmer",
        "oben",
        "Wohnung",
        "Keller",
        "im",
        "unten"
      ],
      "explanation": "das Schlafzimmer is schlafen + Zimmer, built by the compound engine — and das Badezimmer in the bank shows the same engine again. Stack the position words: dort oben, dort unten — German lets them pile up in that order."
    }
  ],
  "summary": {
    "outcome": "Name the rooms, place them with oben, unten, dort and gegenüber, and say what is in der Nähe and what is weit.",
    "use_example": {
      "german": "Der Keller ist dort unten — das Schlafzimmer ist oben.",
      "english": "The basement is down there — the bedroom is up top."
    },
    "takeaway": "Zimmer is timber's shifted twin (T→Z), Keller and cellar share Latin cellarium, Etage and stage share estage — and das Schlafzimmer builds itself from schlafen + Zimmer.",
    "curiosity_teaser": "Next: the things inside the rooms — der Teppich, der Schrank, der Spiegel, der Vorhang, der Balkon — and a wardrobe related to English shrink."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Wohnen I: das Zimmer, die Wohnung, der Flur, der Keller, die Etage (The bedroom is up there):",
    "target_answer": "Das Schlafzimmer ist dort oben",
    "word_bank": [
      "Das",
      "ist",
      "oben",
      "nicht",
      "dort",
      "heute",
      "Schlafzimmer"
    ],
    "explanation": "Re-assembling \"Das Schlafzimmer ist dort oben\" from scratch locks in the structural pattern of Wohnen I: das Zimmer, die Wohnung, der Flur, der Keller, die Etage without relying on short-term echo."
  }
};

export default lesson;
