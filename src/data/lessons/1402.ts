import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1402,
  "slug": "weil-and-dass-the-verb-waits",
  "title": "weil & dass: the Verb Waits",
  "subtitle": "Twelve subclauses built on the two doors — verb-final, every time",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "weil",
    "dass",
    "wissen",
    "können",
    "müssen",
    "kommen",
    "lernen",
    "wandern",
    "weiß",
    "traurig",
    "angst",
    "hoffnung",
    "dunkel",
    "sorge",
    "gleich",
    "meinung",
    "katze",
    "hund",
    "kennen",
    "tier"
  ],
  "table_word_ids": [
    "weil",
    "dass",
    "wissen",
    "müssen",
    "kommen",
    "können",
    "lernen",
    "wandern",
    "weiß",
    "traurig",
    "angst",
    "hoffnung",
    "dunkel",
    "sorge",
    "gleich",
    "meinung",
    "katze",
    "hund",
    "kennen",
    "tier"
  ],
  "hook": {
    "title": "Two Doors, One Basement",
    "content": "Open a subclause with weil (because) or dass (that) and the conjugated verb walks to the very end of the clause and waits there. Ich lerne Deutsch, weil ich will — 'because I want-to'. Ich weiß, dass du kommst — 'that you coming-are'. This is the same verb-final habit Old English subordinate clauses loved, and German never abandoned it. weil is your while (same ancient word, new job), dass is your that — so the two doors are made of English wood; only the basement rule is new.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Spoken German's weil Rule",
        "content": "Colloquially, many Germans say weil with main-clause order — '...weil ich bin müde'. You will hear it everywhere; the written standard still wants the verb in the basement. Learn the standard, recognize the street version."
      }
    ]
  },
  "pattern": {
    "title": "Build the Basement",
    "content": "Main clause first, verb in position 2: Ich weiß. Ich lerne. Then the door + subclause, verb last: ...dass du kommst. ...weil ich wandern will — watch that one: the modal will takes the very end and its infinitive wandern waits just before it, so the basement stacks: ...weil ich wandern will. Contrast the two architectures side by side: Ich kann nicht kommen (bracket) versus ..., weil ich nicht kommen kann (basement, kann at the end). Same words, different floor plan.",
    "footnotes": [],
    "linguist_note": "dass is the doublet of das — Old High German daȥ, Old English þæt, one word. The spelling split is purely orthographic convention, a fact the German Duden itself states."
  },
  "exercises": [
    {
      "id": "l1402_e1",
      "type": "matching_pairs",
      "prompt": "Match each subclause sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "wd1",
          "english": "I know that you are coming",
          "german": "Ich weiß, dass du kommst"
        },
        {
          "id": "wd2",
          "english": "I am learning because I want to",
          "german": "Ich lerne, weil ich will"
        },
        {
          "id": "wd3",
          "english": "I know that the dog is dark",
          "german": "Ich weiß, dass der Hund dunkel ist"
        },
        {
          "id": "wd4",
          "english": "I am learning because I am sad",
          "german": "Ich lerne, weil ich traurig bin"
        },
        {
          "id": "wd5",
          "english": "She knows that I know the cat",
          "german": "Sie weiß, dass ich die Katze kenne"
        },
        {
          "id": "wd6",
          "english": "I am learning, because I have hope",
          "german": "Ich lerne, weil ich Hoffnung habe"
        },
        {
          "id": "wd7",
          "english": "I know that he is coming right away",
          "german": "Ich weiß, dass er gleich kommt"
        },
        {
          "id": "wd8",
          "english": "I know your opinion, because I know you",
          "german": "Ich kenne deine Meinung, weil ich dich kenne"
        }
      ],
      "target_answer": "Ich weiß, dass du kommst, Ich lerne, weil ich will, Ich weiß, dass der Hund dunkel ist, Ich lerne, weil ich traurig bin, Sie weiß, dass ich die Katze kenne, Ich lerne, weil ich Hoffnung habe, Ich weiß, dass er gleich kommt, Ich kenne deine Meinung, weil ich dich kenne",
      "meaning": "I know that you are coming, I am learning because I want to, I know that the dog is dark, I am learning because I am sad, she knows that I know the cat, I am learning because I have hope, I know that he is coming right away, I know your opinion because I know you",
      "explanation": "After weil and dass the conjugated verb waits at the very end of its clause — the basement rule. kennen knows people and things; wissen knows facts — both work the doors."
    },
    {
      "id": "l1402_e2",
      "type": "shift_select",
      "prompt": "Complete the basement: 'Ich weiß, dass du Deutsch _____.' (lernen, du-form)",
      "options": [
        "lerne",
        "du lernst",
        "lernst",
        "zu lernen"
      ],
      "target_answer": "lernst",
      "meaning": "Ich weiß, dass du Deutsch lernst",
      "explanation": "The subclause already has its subject (du), so only the verb lands at the end: lernst. Sorge has a seat too: Ich weiß, dass du Sorge hast — hast waits at the basement door."
    },
    {
      "id": "l1402_e3",
      "type": "shift_select",
      "prompt": "Which sentence keeps MAIN-clause order after weil — the colloquial street version?",
      "options": [
        "Neither is real German",
        "Both are identical",
        "..., weil ich müde bin (standard)",
        "..., weil ich bin müde (spoken style)"
      ],
      "target_answer": "..., weil ich bin müde (spoken style)",
      "meaning": "Colloquial weil often keeps verb-second",
      "explanation": "The standard wants müde bin (basement); street German often says bin müde. Understand both, write the standard."
    },
    {
      "id": "l1402_e4",
      "type": "derive",
      "prompt": "Stack the basement: '..., weil ich wandern _____' (want, ich-form, very last word):",
      "english_hint": "the modal takes the last slot, infinitive just before it",
      "target_answer": "will",
      "meaning": "..., weil ich wandern will = ...because I want to hike",
      "explanation": "The basement stacks: infinitive wandern, then the modal will at the very end — two verbs, one exit."
    },
    {
      "id": "l1402_e5",
      "type": "literal_gloss",
      "prompt": "Which English is built the German way?",
      "german": "Ich weiß, dass er Angst hat.",
      "natural": "I know that he is afraid.",
      "options": [
        "I know that he is afraid.",
        "I know that he fear has.",
        "I know that fear he has."
      ],
      "target_answer": "I know that he fear has.",
      "meaning": "I know that he is afraid.",
      "explanation": "Read it the German way: 'I know that he fear has.' The verb hat waits in the basement of the dass-clause — and Angst is English's own loanword: fear with a German passport."
    }
  ],
  "summary": {
    "outcome": "Build weil and dass subclauses with verb-final order, including stacked modals.",
    "use_example": {
      "german": "Ich weiß, dass du morgen kommst.",
      "english": "I know that you are coming tomorrow."
    },
    "takeaway": "weil and dass open the basement: the conjugated verb waits at the very end — Old English's habit, German's law.",
    "curiosity_teaser": "Next: zu + infinitive ladders — Ich habe vor, Deutsch zu lernen: the bracket with a zu-glue."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from weil & dass: the Verb Waits (Today that is very good):",
    "target_answer": "Heute ist das sehr gut",
    "word_bank": [
      "ist",
      "gut",
      "Heute",
      "nicht",
      "das",
      "sehr"
    ],
    "explanation": "Re-assembling \"Heute ist das sehr gut\" from scratch locks in the structural pattern of weil & dass: the Verb Waits without relying on short-term echo."
  }
};

export default lesson;
