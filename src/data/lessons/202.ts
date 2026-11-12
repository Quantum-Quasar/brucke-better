import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 202,
  "slug": "bracket-sentences-in-the-wild",
  "title": "Bracket Sentences in the Wild",
  "subtitle": "Ich kann morgen kommen — one frame, three facts, zero effort",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "morgen",
    "können",
    "wollen",
    "müssen",
    "kommen",
    "wandern",
    "lernen",
    "folgen",
    "fernsehen",
    "einsteigen",
    "aussteigen",
    "deutsch",
    "bier",
    "kuchen",
    "wurst",
    "lust",
    "teuer"
  ],
  "table_word_ids": [
    "morgen",
    "kommen",
    "wandern",
    "lernen",
    "folgen",
    "können",
    "wollen",
    "müssen",
    "fernsehen",
    "einsteigen",
    "aussteigen",
    "deutsch",
    "bier",
    "kuchen",
    "wurst",
    "lust",
    "teuer"
  ],
  "hook": {
    "title": "The Sentence Sandwich",
    "content": "German grammar hands you a machine: the conjugated modal opens the sentence, the bare infinitive closes it, and everything you want to say lives in between. Ich kann morgen kommen says WHO (ich), WHAT (kommen), WHEN (morgen) and CAN — four facts in one breath. English needs three verbs for that. German needs one. The closing infinitive is called the Satzklammer — the sentence bracket — because it clamps around your message like a staple.",
    "footnotes": [
      {
        "marker": "1",
        "title": "A Frame You Will Meet Again",
        "content": "The same bracket architecture returns when Germans talk about the past (Ich habe... gegessen) — the tense verb opens, the participle closes. Master it now with modals and the past tense will feel like a rerun."
      }
    ]
  },
  "pattern": {
    "title": "Build the Bracket",
    "content": "Slot 1 is the subject, slot 2 the conjugated modal, then the contents, then the bare infinitive slams shut at the end: Ich kann morgen wandern. Wir wollen heute singen. Ich muss lernen. Du kannst folgen. Nothing else in the sentence may leave the bracket — time words like morgen (twin of 'morrow', the word inside to-morrow) and heute (today) ride inside it, usually right after the verb. The frame never breaks: no matter how full the middle gets, the infinitive waits at the caboose.\n\nOne Denglisch ladder, read it the German way first: Ich kann morgen kommen → I can tomorrow come → I can come tomorrow. The odd middle line is exact German — modal in position 2, contents inside, bare infinitive at the caboose — and Old English allowed every word of it.",
    "footnotes": [],
    "linguist_note": "English did this too — archaic 'I can go' survives, but Middle English also allowed 'I can the road go' patterns; modern English lost the bracket by fusing modals with a to-infinitive. German kept the original Germanic frame intact."
  },
  "exercises": [
    {
      "id": "l202_e1",
      "type": "shift_select",
      "prompt": "In 'Ich will Deutsch lernen', why does 'lernen' sit at the very end?",
      "options": [
        "Old words go last in German",
        "The bare infinitive always closes the modal bracket",
        "Deutsch pushed it out of position 2",
        "lernen is a question word"
      ],
      "target_answer": "The bare infinitive always closes the modal bracket",
      "meaning": "The Satzklammer: modal in position 2, bare infinitive last",
      "explanation": "The conjugated modal opens the frame; the bare infinitive clamps it shut. Everything else lives inside."
    },
    {
      "id": "l202_e2",
      "type": "matching_pairs",
      "prompt": "Match each bracket sentence with its English meaning. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "bw1",
          "english": "I can hike tomorrow",
          "german": "Ich kann morgen wandern"
        },
        {
          "id": "bw2",
          "english": "We want to sing today",
          "german": "Wir wollen heute singen"
        },
        {
          "id": "bw3",
          "english": "I have to learn",
          "german": "Ich muss lernen"
        },
        {
          "id": "bw4",
          "english": "You can follow",
          "german": "Du kannst folgen"
        },
        {
          "id": "bw5",
          "english": "You must get off",
          "german": "Du musst aussteigen"
        },
        {
          "id": "bw6",
          "english": "We want to watch TV",
          "german": "Wir wollen fernsehen"
        },
        {
          "id": "bw7",
          "english": "I feel like sausage",
          "german": "ich habe Lust auf Wurst"
        },
        {
          "id": "bw8",
          "english": "I want a beer",
          "german": "Ich will ein Bier"
        },
        {
          "id": "recall1",
          "german": "Wir sollen kommen",
          "english": "We ought to come"
        },
        {
          "id": "recall2",
          "german": "Wir mögen Bier",
          "english": "We like beer"
        }
      ],
      "target_answer": "Ich kann morgen wandern, Wir wollen heute singen, Ich muss lernen, Du kannst folgen, Du musst aussteigen, Wir wollen fernsehen, ich habe Lust auf Wurst, Ich will ein Bier, Wir sollen kommen, Wir mögen Bier",
      "meaning": "I can hike tomorrow; We want to sing today; I have to learn; You can follow; You must get off; We want to watch TV; I feel like sausage; I want a beer; We ought to come; We like beer",
      "explanation": "Modal in position 2, contents inside, bare infinitive at the end — the same frame every time, even for new verbs like aussteigen and fernsehen."
    },
    {
      "id": "l202_e3",
      "type": "derive",
      "prompt": "Close the bracket: 'Wir können morgen _____' (to board / get on):",
      "english_hint": "the bare infinitive rides at the end",
      "target_answer": "einsteigen",
      "meaning": "Wir können morgen einsteigen = We can board tomorrow",
      "explanation": "The bare infinitive 'einsteigen' closes the bracket — ein + steigen, 'climb on', kept as one word. No zu, no ending."
    },
    {
      "id": "l202_e4",
      "type": "reverse_cognate",
      "prompt": "The German time word 'morgen' hides inside an English adverb — which word is its twin?",
      "target_answer": "morrow",
      "meaning": "morrow — as in to-morrow (twin of German morgen)",
      "explanation": "English 'tomorrow' is literally 'to the morrow'; German morgen never needed the 'to'."
    },
    {
      "id": "l202_e5",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're eyeing the cake at the bakery and guessing about the price: it can be expensive",
      "cues": [
        "The thing → der Kuchen (der is the masculine flag)",
        "The modal kann holds position 2",
        "The bare infinitive closes the bracket: sein goes last"
      ],
      "target_answer": "Der Kuchen kann teuer sein",
      "meaning": "The cake can be expensive",
      "word_bank": [
        "kann",
        "sein",
        "kannst",
        "teuer",
        "ist",
        "Kuchen",
        "Der"
      ],
      "explanation": "kann holds position 2, the bare infinitive sein closes the bracket — and teuer is 'dear' with its d hardened to t."
    }
  ],
  "summary": {
    "outcome": "Build full modal brackets with time words: who, what, when, and can/want/must in one frame.",
    "use_example": {
      "german": "Ich will morgen Deutsch lernen.",
      "english": "I want to learn German tomorrow."
    },
    "takeaway": "Conjugated modal in position 2, bare infinitive last — the bracket carries your whole message.",
    "curiosity_teaser": "Next: the first great sound shift — how English 'hope' breathed into 'hoffen' and 'ship' into 'Schiff'."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Bracket Sentences in the Wild (The cake can be expensive):",
    "target_answer": "Der Kuchen kann teuer sein",
    "word_bank": [
      "sein",
      "Der",
      "teuer",
      "kann",
      "Kuchen",
      "nicht",
      "heute"
    ],
    "explanation": "Re-assembling \"Der Kuchen kann teuer sein\" from scratch locks in the structural pattern of Bracket Sentences in the Wild without relying on short-term echo."
  }
};

export default lesson;
