import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 18,
  "slug": "motion-takes-etre",
  "title": "Motion Takes être",
  "subtitle": "je suis allé(e), elle est venue, il est parti — the motion verbs that take être in the past and agree like adjectives",
  "phase": 3,
  "shift_categories": [
    "e"
  ],
  "word_ids": [
    "allé",
    "arrivé",
    "venu",
    "parti",
    "sorti",
    "monté",
    "descendu",
    "resté",
    "tombé",
    "né",
    "être",
    "suis"
  ],
  "table_word_ids": [
    "allé",
    "arrivé",
    "venu",
    "parti",
    "sorti",
    "monté",
    "descendu",
    "resté",
    "tombé",
    "né",
    "être",
    "suis"
  ],
  "hook": {
    "title": "Why 'I Went' Is Literally 'I Am Gone'",
    "content": "Think of old English sentences like 'He is risen', 'The summer is gone', or 'Babylon is fallen'. Why did English use 'is' instead of 'has' there? Because those verbs don't act on an outside object — they change the state or location of the speaker! French kept that exact rule for a cozy house of whole-body motion and doorway verbs: aller (allé 'gone'), venir (venu 'come'), arriver (arrivé 'arrived'), partir (parti 'left'), sortir (sorti 'gone out'), monter (monté 'gone up'), descendre (descendu 'gone down'), rester (resté 'stayed'), tomber (tombé 'fallen'), and naître (né 'born').",
    "footnotes": [
      {
        "marker": "1",
        "title": "Picture a house with a front door and stairs",
        "content": "Instead of memorizing an acronym like DR & MRS VANDERTRAMP, picture one house: you approach it (aller/venir), cross the threshold (arriver/partir, entrer/sortir), take the stairs (monter/descendre, tomber), stay inside (rester), and live your life cycle (naître/mourir)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Inside the être House, the Participle Wears Gender and Number",
    "content": "Because je suis allé literally means 'I am gone', the participle behaves just like an adjective after être! If the speaker is a woman, she writes an extra silent -e: Je suis allée, elle est venue, elle est partie. If the subject is plural, add a silent -s: Nous sommes arrivés (or -es for a group of women: Elles sont arrivées). In sound, allé, allée, allés, allées are 100% identical (/ale/) — only your pen adds the badge!",
    "linguist_note": "Intransitive unaccusative verbs in Latin (nātus sum, reversus sum) formed their perfect with esse and agreed with the subject; French and Italian preserved this split auxiliary system.",
    "trap_note": "The shortcut your mind will offer: saying *J'ai allé for 'I went'. Motion-and-doorway verbs ALWAYS take être: Je suis allé(e)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each être-house past participle with its opposite partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "allé (gone)",
          "german": "venu (come)"
        },
        {
          "id": "p2",
          "english": "arrivé (arrived)",
          "german": "parti (left / departed)"
        },
        {
          "id": "p3",
          "english": "monté (gone up)",
          "german": "descendu (gone down)"
        },
        {
          "id": "p4",
          "english": "sorti (gone out)",
          "german": "resté (stayed)"
        },
        {
          "id": "p5",
          "english": "né (born)",
          "german": "tombé (fallen)"
        }
      ],
      "target_answer": "venu (come), parti (left / departed), descendu (gone down), resté (stayed), tombé (fallen)",
      "meaning": "allé (gone), arrivé (arrived), monté (gone up), sorti (gone out), né (born)",
      "explanation": "Notice how the être house is organized in natural spatial pairs!",
      "id": "fr18_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Elle est arrivée hier'?",
      "german": "Elle est arrivée hier",
      "natural": "She arrived yesterday",
      "options": [
        "She has arrived yesterday",
        "She is arrived yesterday",
        "She arrived yesterday"
      ],
      "target_answer": "She is arrived yesterday",
      "meaning": "Literal structure: She is arrived yesterday",
      "explanation": "Because arriver is an être-house motion verb, French says 'She is arrived' with feminine -e on arrivée.",
      "id": "fr18_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Marie is speaking: how does she write 'I went to the café'?",
      "options": [
        "J'ai allé au café",
        "Je suis allé au café",
        "Je suis allée au café"
      ],
      "target_answer": "Je suis allée au café",
      "meaning": "I went to the café (female speaker)",
      "explanation": "aller takes être (je suis), and a female speaker adds feminine -e: allée.",
      "id": "fr18_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "she came with her brother",
      "cues": [
        "She came (is come, feminine) → Elle est venue + with her brother → avec son frère"
      ],
      "idea_parts": [
        "subject + être auxiliary → Elle est",
        "feminine participle → venue",
        "companion → avec son frère"
      ],
      "target_answer": "Elle est venue avec son frère",
      "meaning": "She came with her brother",
      "word_bank": [
        "frère",
        "est",
        "venue",
        "venu",
        "son",
        "Elle",
        "a",
        "avec"
      ],
      "explanation": "venir takes être, and elle adds feminine -e to venu → venue.",
      "diagnosis": {
        "slip": "used a instead of est or forgot -e on venue",
        "cue": "venir takes être and agrees with Elle: Elle est venue."
      },
      "id": "fr18_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Il est parti ce matin",
      "replays": 2,
      "target_answer": "Il est parti ce matin",
      "meaning": "He left this morning",
      "cues": [
        "He is left: Il est parti",
        "this morning: ce matin"
      ],
      "explanation": "partir takes être: Il est parti.",
      "affirmation": "You used est parti and ce matin cleanly.",
      "id": "fr18_e5"
    }
  ],
  "summary": {
    "outcome": "Form the passé composé of motion and doorway verbs using être and agree the participle with the subject in writing.",
    "use_example": {
      "german": "Je suis allé à la gare et elle est venue avec moi.",
      "english": "I went to the station and she came with me."
    },
    "takeaway": "Whole-body motion and doorway verbs take être ('I am gone'), and their participle agrees with the traveller.",
    "curiosity_teaser": "Up next on Le Pont ([1801] The être House): see how Motion Takes être leads directly into The être House."
  },
  "twist": {
    "prompt": "Ungraded — 'We stayed here' (masculine plural: Nous sommes restés):",
    "target_answer": "Nous sommes restés ici",
    "word_bank": [
      "restés",
      "avons",
      "ici",
      "Nous",
      "resté",
      "sommes"
    ],
    "explanation": "rester ('to stay') lives in the être house, and plural nous adds -s to restés."
  },
  "foreshadow": {
    "line": "Having mastered Motion Takes être, look ahead to Topic 19 (The Storytelling Past), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 19
  },
  "payoff": {
    "ofLesson": 17,
    "text": "The foundation from Topic 17 (The -é Past) now pays off directly inside Motion Takes être: every sentence here builds on that earlier step."
  }
};

export default lesson;
