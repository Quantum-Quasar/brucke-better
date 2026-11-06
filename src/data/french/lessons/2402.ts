import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2402,
  "slug": "lesson-2402",
  "title": "The Morning Round",
  "subtitle": "se lever, se laver, s'habiller, se coucher — chaining daily routine verbs.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "lever",
    "laver",
    "habiller",
    "coucher",
    "me",
    "te",
    "main",
    "tête",
    "heure"
  ],
  "table_word_ids": [
    "lever",
    "laver",
    "habiller",
    "coucher",
    "me",
    "te",
    "main",
    "tête",
    "heure"
  ],
  "hook": {
    "title": "Chaining the Morning and Evening Routine — and Body Parts",
    "content": "Walk through your day with se lever ('get up'), se laver ('wash'), s'habiller ('get dressed'), and se coucher ('go to bed'). When you wash your hands, the reflexive pronoun me already tells whose hands they are, so French uses the definite article les instead of 'my': Je me lave les mains! And in the past tense, ALL reflexive verbs live inside the être house: Je me suis levé(e)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why reflexives live inside the être house in the past tense!",
        "content": "Every reflexive verb forms its passé composé with être: Je me suis levé ('I got up'), Elle s'est habillée ('She got dressed')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Present: Je me lève; Past: Je me suis levé(e); Body Parts: Je me lave les mains",
    "content": "Chain routine verbs across present and past.",
    "linguist_note": "Inalienable possession of body parts in French uses a reflexive dative clitic + definite article.",
    "trap_note": "Don't say *Je me lave mes mains or *J'ai me levé — use les mains, and use être in the past (Je me suis levé)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each routine sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je me lève à sept heures",
          "german": "I get up at seven o'clock"
        },
        {
          "id": "p2",
          "english": "Je me lave les mains (definite les!)",
          "german": "I wash my hands"
        },
        {
          "id": "p3",
          "english": "Je m'habille vite",
          "german": "I get dressed quickly"
        },
        {
          "id": "p4",
          "english": "Je me couche tard",
          "german": "I go to bed late"
        },
        {
          "id": "p5",
          "english": "Je me suis levé tôt (être in past!)",
          "german": "I got up early"
        }
      ],
      "target_answer": "I get up at seven o'clock, I wash my hands, I get dressed quickly, I go to bed late, I got up early",
      "meaning": "Je me lève à sept heures, Je me lave les mains (definite les!), Je m'habille vite, Je me couche tard, Je me suis levé tôt (être in past!)",
      "explanation": "Reflexives use definite articles with body parts and take être in the passé composé.",
      "id": "fr2402_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Je me lave les mains'?",
      "german": "Je me lave les mains",
      "natural": "I wash my hands",
      "options": [
        "I wash me my hands",
        "I wash my hands",
        "I to-myself wash the hands"
      ],
      "target_answer": "I to-myself wash the hands",
      "meaning": "Literal structure: I to-myself wash the hands",
      "explanation": "me ('to-myself') already marks the owner, so French uses les mains ('the hands').",
      "id": "fr2402_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I got up at eight o'clock' in the passé composé?",
      "options": [
        "Je me suis levé à huit heures",
        "Je m'ai levé à huit heures",
        "J'ai me levé à huit heures"
      ],
      "target_answer": "Je me suis levé à huit heures",
      "meaning": "I got up at eight o'clock",
      "explanation": "All reflexive verbs take être in the passé composé: Je me suis levé(e)!",
      "id": "fr2402_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I get up and I get dressed quickly",
      "cues": [
        "I get up → Je me lève",
        "and I get dressed quickly → et je m'habille rapidement"
      ],
      "idea_parts": [
        "first reflexive → Je me lève",
        "second reflexive + adverb → et je m'habille rapidement"
      ],
      "target_answer": "Je me lève et je m'habille rapidement",
      "meaning": "I get up and get dressed quickly",
      "word_bank": [
        "lève",
        "s'habille",
        "et",
        "m'habille",
        "la",
        "je",
        "Je",
        "me",
        "rapidement"
      ],
      "explanation": "Repeat je + reflexive pronoun on each verb: Je me lève et je m'habille.",
      "diagnosis": {
        "slip": "used s'habille",
        "cue": "Match m'habille to je."
      },
      "id": "fr2402_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Elle s'est levée tôt ce matin",
      "replays": 2,
      "target_answer": "Elle s'est levée tôt ce matin",
      "meaning": "She got up early this morning",
      "cues": [
        "Elle s'est levée",
        "tôt ce matin"
      ],
      "explanation": "se + est elides to s'est, and levée agrees with Elle.",
      "affirmation": "You wrote Elle s'est levée with the feminine -e!",
      "id": "fr2402_e5"
    }
  ],
  "summary": {
    "outcome": "Chain reflexive daily-routine verbs across present and passé composé (with être), and use definite articles with body parts.",
    "use_example": {
      "german": "Ce matin, je me suis levé tôt et je me suis habillé.",
      "english": "This morning, I got up early and got dressed."
    },
    "takeaway": "All reflexives take être in the past (Je me suis levé), and body parts take le/la/les (Je me lave les mains).",
    "curiosity_teaser": "Up next on Le Pont ([25] il y a): see how The Morning Round leads directly into il y a."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I get up and get dressed quickly\" in French:",
    "target_answer": "Je me lève et je m'habille rapidement",
    "word_bank": [
      "ne",
      "rapidement",
      "m'habille",
      "lève",
      "me",
      "Je",
      "et",
      "pas",
      "je"
    ],
    "explanation": "Re-constructing \"Je me lève et je m'habille rapidement\" from the underlying rule cements the pattern of The Morning Round."
  }
};

export default lesson;
