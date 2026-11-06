import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1702,
  "slug": "lesson-1702",
  "title": "Hier j'ai… Story Drills",
  "subtitle": "Narrate a past day in passé composé sentences with avoir.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mangé",
    "parlé",
    "visiter",
    "trouvé",
    "aimé",
    "pris",
    "fait",
    "vu",
    "hier",
    "avec"
  ],
  "table_word_ids": [
    "mangé",
    "parlé",
    "visiter",
    "trouvé",
    "aimé",
    "pris",
    "fait",
    "vu",
    "hier",
    "avec"
  ],
  "hook": {
    "title": "Narrating a Full Day in the Passé Composé",
    "content": "Every converted verb from Topic 3's -ation engine (visiter, confirmer, organiser, réserver, célébrer, préparer) forms its past participle in -é (visité, confirmé, organisé, réservé, célébré, préparé) — and sounds 100% identical to its infinitive!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How context distinguishes j'ai visité (/vizite/) from je vais visiter (/vizite/)",
        "content": "Because visité and visiter are both pronounced /vizite/, the auxiliary in front of it does 100% of the time-travel work: je vais visiter (future) vs. j'ai visité (past)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Auxiliary Is the Time Machine: je vais /vizite/ vs. j'ai /vizite/",
    "content": "In writing, after je veux / je vais write -er (visiter); after avoir (j'ai / tu as) write -é (visité)!",
    "linguist_note": "Homophony of -er (/e/), -é (/e/), and -ez (/e/) makes pre-verbal auxiliaries the primary carriers of tense.",
    "trap_note": "Remember: after a conjugated verb (je veux / je vais), write -er; after avoir (j'ai / nous avons), write -é!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Contrast the written endings of /vizite/ and /paʁle/ by what precedes them:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "After je veux / je vais (infinitive)",
          "german": "visiter / parler (-er)"
        },
        {
          "id": "p2",
          "english": "After j'ai / tu as / nous avons (participle)",
          "german": "visité / parlé (-é)"
        },
        {
          "id": "p3",
          "english": "After vous in the present (2nd pl.)",
          "german": "visitez / parlez (-ez)"
        }
      ],
      "target_answer": "visiter / parler (-er), visité / parlé (-é), visitez / parlez (-ez)",
      "meaning": "After je veux / je vais (infinitive), After j'ai / tu as / nous avons (participle), After vous in the present (2nd pl.)",
      "explanation": "All three endings (-er, -é, -ez) sound like /e/!",
      "id": "fr1702_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Choose the correct written pair for 'I am going to reserve' vs. 'I reserved':",
      "options": [
        "Je vais réserver / J'ai réservé",
        "Je vais réservé / J'ai réserver",
        "Je vais réserver / J'ai réserver"
      ],
      "target_answer": "Je vais réserver / J'ai réservé",
      "meaning": "After vais → -er infinitive; after ai → -é participle",
      "explanation": "Both sound like /ʁezɛʁve/, but vais takes -er and ai takes -é!",
      "id": "fr1702_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the past sentence: 'Yesterday, I visited Paris' (Hier, j'ai + visit + Paris):",
      "english_hint": "after j'ai, write -é",
      "target_answer": "Hier, j'ai visité Paris",
      "meaning": "Yesterday, I visited Paris",
      "explanation": "After j'ai, visiter wears its -é participle ending: visité.",
      "id": "fr1702_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "yesterday I spoke with my friend and we ate at the restaurant",
      "cues": [
        "Yesterday I spoke with my friend → Hier, j'ai parlé avec mon ami",
        "and we ate at the restaurant → et nous avons mangé au restaurant"
      ],
      "idea_parts": [
        "first event → Hier, j'ai parlé avec mon ami",
        "second event → et nous avons mangé au restaurant"
      ],
      "target_answer": "Hier, j'ai parlé avec mon ami et nous avons mangé au restaurant",
      "meaning": "Yesterday, I spoke with my friend and we ate at the restaurant",
      "word_bank": [
        "avons",
        "ami",
        "parlé",
        "j'ai",
        "et",
        "parler",
        "la",
        "avec",
        "mon",
        "Hier",
        "au",
        "nous",
        "restaurant",
        "mangé"
      ],
      "explanation": "Both parlé and mangé take -é after avoir.",
      "diagnosis": {
        "slip": "wrote -er instead of -é",
        "cue": "After j'ai and nous avons, write parlé and mangé with -é."
      },
      "id": "fr1702_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "J'ai préparé le dîner et j'ai invité mes amis",
      "replays": 2,
      "target_answer": "J'ai préparé le dîner et j'ai invité mes amis",
      "meaning": "I prepared dinner and invited my friends",
      "cues": [
        "J'ai préparé le dîner",
        "et j'ai invité mes amis"
      ],
      "explanation": "Two -ation engine verbs in the past: préparé and invité.",
      "affirmation": "You wrote -é on both préparé and invité after j'ai!",
      "id": "fr1702_e5"
    }
  ],
  "summary": {
    "outcome": "Narrate sequences of past events with avoir and distinguish homophonous -er, -é, and -ez in writing.",
    "use_example": {
      "german": "Hier, j'ai réservé une table et nous avons célébré.",
      "english": "Yesterday, I reserved a table and we celebrated."
    },
    "takeaway": "In speech, je vais /vizite/ and j'ai /vizite/ differ only by vais vs. ai; in writing, vais takes -er and ai takes -é.",
    "curiosity_teaser": "Up next on Le Pont ([18] Motion Takes être): see how Hier j'ai… Story Drills leads directly into Motion Takes être."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Yesterday, I spoke with my friend and we ate at the restaurant\" in French:",
    "target_answer": "Hier, j'ai parlé avec mon ami et nous avons mangé au restaurant",
    "word_bank": [
      "mon",
      "avec",
      "nous",
      "mangé",
      "ami",
      "au",
      "restaurant",
      "avons",
      "ne",
      "pas",
      "parlé",
      "Hier",
      "et",
      "j'ai"
    ],
    "explanation": "Re-constructing \"Hier, j'ai parlé avec mon ami et nous avons mangé au restaurant\" from the underlying rule cements the pattern of Hier j'ai… Story Drills."
  }
};

export default lesson;
