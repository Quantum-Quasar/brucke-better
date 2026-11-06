import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1803,
  "slug": "gestern-habe-ich-story-drills",
  "title": "Gestern habe ich… Story Drills",
  "subtitle": "Narrate a weekend in Perfekt sentences using only taught vocabulary",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "haben",
    "sein",
    "essen",
    "trinken",
    "kommen",
    "gehen",
    "machen",
    "wandern",
    "brot"
  ],
  "table_word_ids": [
    "haben",
    "sein",
    "essen",
    "trinken",
    "kommen",
    "gehen",
    "machen",
    "wandern",
    "brot",
    "gürtel",
    "banane",
    "eigen",
    "pullover",
    "sonst",
    "rad"
  ],
  "hook": {
    "title": "The Weekend Machine",
    "content": "Grammar becomes biography the moment you chain it. Yesterday I drank coffee. I read. We hiked. Then we came home and ate bread. Every sentence is a Perfekt bracket you can already build — today you link them into a story. The secret is boring and beautiful: nothing new is needed. Gestern habe ich... opens the door, the participle closes it, and sein steps in whenever you moved somewhere. Ten sentences, one weekend, zero new grammar.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why Stories Beat Drills",
        "content": "The Perfekt is the tense of storytelling in spoken German — nobody narrates yesterday in the simple past at a café. Every rep today is a sentence a real German speaker would actually say."
      }
    ]
  },
  "pattern": {
    "title": "The Story Skeleton",
    "content": "Skeleton one — doing: Gestern habe ich Kaffee getrunken. Skeleton two — moving: Wir sind gewandert. Skeleton three — the chain: Gestern bin ich früh aufgestanden, habe Kaffee getrunken und Brot gegessen — chain two brackets behind one gestern; only the first auxiliary carries the time word. Skeleton four — the turn: Danach (after that) sind wir nach Hause gekommen. Danach, dann (then), am Abend (in the evening) — three glue words and your weekend writes itself.",
    "footnotes": [],
    "linguist_note": "When chaining, German drops the repeated subject and auxiliary: 'habe Kaffee getrunken und Brot gegessen' — one habe, two participles, exactly as English chains 'have eaten and drunk'."
  },
  "exercises": [
    {
      "id": "l1803_e1",
      "type": "matching_pairs",
      "prompt": "Match each weekend sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "sd1",
          "english": "Yesterday I drank coffee",
          "german": "Gestern habe ich Kaffee getrunken"
        },
        {
          "id": "sd2",
          "english": "We hiked",
          "german": "Wir sind gewandert"
        },
        {
          "id": "sd3",
          "english": "Then we ate bread",
          "german": "Dann haben wir Brot gegessen"
        },
        {
          "id": "sd4",
          "english": "We came home (motion)",
          "german": "Wir sind nach Hause gekommen"
        }
      ],
      "target_answer": "Gestern habe ich Kaffee getrunken, Wir sind gewandert, Dann haben wir Brot gegessen, Wir sind nach Hause gekommen",
      "meaning": "yesterday I drank coffee, we hiked, then we ate bread, we came home",
      "explanation": "haben for doing, sein for moving — the weekend machine never needs another part."
    },
    {
      "id": "l1803_e2",
      "type": "shift_select",
      "prompt": "Chain it: 'Ich bin früh aufgestanden und ___ Kaffee getrunken.'",
      "options": [
        "war",
        "wurde",
        "habe",
        "bin"
      ],
      "target_answer": "habe",
      "meaning": "...und habe Kaffee getrunken — and drank coffee",
      "explanation": "New action, new auxiliary: drinking is haben territory even inside a chained sentence that started with bin."
    },
    {
      "id": "l1803_e3",
      "type": "derive",
      "prompt": "Glue word: '_____ sind wir nach Hause gekommen.' (after that):",
      "english_hint": "da + nach, 'there-after'",
      "target_answer": "Danach",
      "meaning": "Danach sind wir nach Hause gekommen = After that we came home",
      "explanation": "danach — 'there-after' — is the story hinge. Its fronted position pushes the verb to position 2 as always."
    },
    {
      "id": "l1803_e4",
      "type": "variant_english",
      "prompt": "Select EVERY honest English rendering of this Perfekt sentence:",
      "german": "Wir sind gestern gewandert",
      "renderings": [
        "We hiked yesterday",
        "We went hiking yesterday"
      ],
      "traps": [
        "We are hiking yesterday",
        "We will hike yesterday"
      ],
      "target_answer": "We hiked yesterday",
      "meaning": "We hiked yesterday",
      "explanation": "German uses 'sind ... gewandert' (literally 'are hiked') for the conversational past of motion verbs, which English renders as past tense ('We hiked'). [Ref: Gestern habe ich Brot gegessen]"
    },
    {
      "id": "l1803_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'Yesterday we ate bread and drank beer'",
      "target_answer": "Gestern haben wir Brot gegessen und Bier getrunken",
      "meaning": "Yesterday we ate bread and drank beer",
      "vocab_hints": [
        {
          "word": "Bier",
          "translation": "beer",
          "note": "das Bier — the Hidden Twins cognate, back for the party"
        }
      ],
      "word_bank": [
        "aber",
        "Bier",
        "getrunken",
        "gegessen",
        "Brot",
        "Gestern",
        "haben",
        "und",
        "wir",
        "für"
      ],
      "explanation": "One auxiliary (haben), two participles (gegessen, getrunken) — the chain trick from the pattern section."
    }
  ],
  "summary": {
    "outcome": "Narrate a multi-sentence weekend in the Perfekt with chained brackets.",
    "use_example": {
      "german": "Gestern haben wir Brot gegessen und Bier getrunken.",
      "english": "Yesterday we ate bread and drank beer."
    },
    "takeaway": "gestern habe ich… + participle is the door; danach/dann glue the rooms; sein handles every move.",
    "curiosity_teaser": "Next: sing/sang/sung Mirrors — ten English irregular verbs mapped onto their German melodies."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Gestern habe ich… Story Drills (Yesterday we ate bread and drank beer):",
    "target_answer": "Gestern haben wir Brot gegessen und Bier getrunken",
    "word_bank": [
      "gegessen",
      "getrunken",
      "heute",
      "Gestern",
      "Brot",
      "und",
      "wir",
      "haben",
      "nicht",
      "Bier"
    ],
    "explanation": "Re-assembling \"Gestern haben wir Brot gegessen und Bier getrunken\" from scratch locks in the structural pattern of Gestern habe ich… Story Drills without relying on short-term echo."
  }
};

export default lesson;
