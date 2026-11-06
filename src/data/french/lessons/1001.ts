import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1001,
  "slug": "sprig-1001",
  "title": "The H-Drop Doublets",
  "subtitle": "hôtel/hospital, homme/human, hiver/hibernate — French's silent H as an etymological fingerprint.",
  "phase": 1,
  "shift_categories": [
    "doublet"
  ],
  "word_ids": [
    "hôtel",
    "hôpital",
    "homme",
    "hiver",
    "histoire",
    "heure",
    "habiter",
    "avoir"
  ],
  "table_word_ids": [
    "hôtel",
    "hôpital",
    "homme",
    "hiver",
    "histoire",
    "heure",
    "habiter",
    "avoir"
  ],
  "hook": {
    "title": "Why French H Never Makes a Sound",
    "content": "Latin-origin H words in French (l'homme, l'hôtel, l'hôpital, l'hiver, l'histoire, l'heure, j'habite) have a completely silent H (h muet), so le, la, and je elide right across the H as if it weren't there!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How English kept the S and H that French dropped",
        "content": "Compare hospital / hostel with hôpital / hôtel: the circumflex hat (ô) marks the medieval S that vanished before T!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Mute H = Pure Vowel for Elision and Liaison",
    "content": "Treat Latin-origin H words as vowel-initial: l'homme, l'heure, l'histoire, l'hôtel, l'hôpital, j'habite.",
    "linguist_note": "French h muet (Latin origin) triggers mandatory vowel elision and prevocalic liaison.",
    "trap_note": "Never write *je habite or *la heure — elision to j'habite and l'heure is mandatory!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each elided silent-H word with its English cognate:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "l'hôpital (circumflex ô = lost s)",
          "german": "the hospital"
        },
        {
          "id": "p2",
          "english": "l'homme (Latin homo)",
          "german": "the man (human)"
        },
        {
          "id": "p3",
          "english": "l'histoire (both story & history)",
          "german": "the story / history"
        },
        {
          "id": "p4",
          "english": "l'heure (silent H)",
          "german": "the hour / time"
        },
        {
          "id": "p5",
          "english": "j'habite (je + habite)",
          "german": "I live / dwell (habitat)"
        }
      ],
      "target_answer": "the hospital, the man (human), the story / history, the hour / time, I live / dwell (habitat)",
      "meaning": "l'hôpital (circumflex ô = lost s), l'homme (Latin homo), l'histoire (both story & history), l'heure (silent H), j'habite (je + habite)",
      "explanation": "All five start with h muet and elide the preceding vowel.",
      "id": "fr1001_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you write 'I live in Paris' using 'habiter'?",
      "options": [
        "J'habite à Paris",
        "Je habite à Paris",
        "J'habites à Paris"
      ],
      "target_answer": "J'habite à Paris",
      "meaning": "I live in Paris",
      "explanation": "je elides before mute-H habite: J'habite à Paris.",
      "id": "fr1001_e2"
    },
    {
      "type": "derive",
      "prompt": "Elide the article before 'histoire' ('the story / history'):",
      "english_hint": "la + histoire → l'...",
      "target_answer": "l'histoire",
      "meaning": "the story / history",
      "explanation": "la drops its vowel before mute-H histoire: l'histoire.",
      "id": "fr1001_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "the man lives near the hospital (use habite près de l'hôpital)",
      "cues": [
        "The man lives → L'homme habite",
        "near the hospital → près de l'hôpital"
      ],
      "idea_parts": [
        "subject + verb → L'homme habite",
        "location → près de l'hôpital"
      ],
      "target_answer": "L'homme habite près de l'hôpital",
      "meaning": "The man lives near the hospital",
      "word_bank": [
        "habite",
        "homme",
        "près",
        "Le",
        "l'hôpital",
        "L'homme",
        "de"
      ],
      "explanation": "Both l'homme and l'hôpital elide because of mute H.",
      "diagnosis": {
        "slip": "wrote Le homme",
        "cue": "Elide both: L'homme and de l'hôpital."
      },
      "id": "fr1001_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "J'habite dans un grand hôtel",
      "replays": 2,
      "target_answer": "J'habite dans un grand hôtel",
      "meaning": "I live in a big hotel",
      "cues": [
        "J'habite",
        "dans un grand hôtel"
      ],
      "explanation": "In un grand‿hôtel, the silent d of grand wakes up as /t/ before mute-H hôtel!",
      "affirmation": "You wrote J'habite and un grand hôtel cleanly.",
      "id": "fr1001_e5"
    }
  ],
  "summary": {
    "outcome": "Apply mandatory elision and liaison across all Latin-origin mute-H words.",
    "use_example": {
      "german": "L'homme raconte une bonne histoire à l'hôtel.",
      "english": "The man tells a good story at the hotel."
    },
    "takeaway": "To a French ear, Latin H is invisible — elide and link right through it.",
    "curiosity_teaser": "Up next on Le Pont ([1002] J'ai Gym): see how The H-Drop Doublets leads directly into J'ai Gym."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"The man lives near the hospital\" in French:",
    "target_answer": "L'homme habite près de l'hôpital",
    "word_bank": [
      "habite",
      "pas",
      "ne",
      "près",
      "l'hôpital",
      "L'homme",
      "de"
    ],
    "explanation": "Re-constructing \"L'homme habite près de l'hôpital\" from the underlying rule cements the pattern of The H-Drop Doublets."
  }
};

export default lesson;
