import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1802,
  "slug": "lesson-1802",
  "title": "Agreement Drills",
  "subtitle": "allée, allés, allées: why participles wear gender and plural agreements only inside the être house.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "allé",
    "arrivé",
    "venu",
    "parti",
    "sorti",
    "resté",
    "être",
    "suis",
    "elle",
    "nous",
    "vous"
  ],
  "table_word_ids": [
    "allé",
    "arrivé",
    "venu",
    "parti",
    "sorti",
    "resté",
    "être",
    "suis",
    "elle",
    "nous",
    "vous"
  ],
  "hook": {
    "title": "Participle Agreement Inside the être House",
    "content": "Inside the être house, the past participle agrees with the subject in gender (-e) and number (-s): il est allé, elle est allée (+e), ils sont allés (+s), elles sont allées (+es)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why allé, allée, allés, allées sound 100% identical (/ale/)",
        "content": "Adding -e or -s to allé, arrivé, parti, venu changes NOTHING in pronunciation — only your pen adds the agreement badge!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Same Sound in the Mouth, Gender/Number Badge on the Page",
    "content": "Add -e for a female subject and -s for a plural subject on être-house participles, while keeping avoir participles un-agreed with the subject.",
    "linguist_note": "Subject-participle agreement with être reflects the copular origin of the construction.",
    "trap_note": "Never add subject agreement to an avoir participle (*Elle a mangée is wrong!) — subject agreement belongs ONLY to the être house!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each subject with the correctly agreed written form of 'went' (allé):",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Il est... (one man)",
          "german": "allé"
        },
        {
          "id": "p2",
          "english": "Elle est... (one woman)",
          "german": "allée (+e)"
        },
        {
          "id": "p3",
          "english": "Nous sommes... (men or mixed group)",
          "german": "allés (+s)"
        },
        {
          "id": "p4",
          "english": "Elles sont... (group of women)",
          "german": "allées (+es)"
        },
        {
          "id": "p5",
          "english": "Elle a... (with avoir: 'she ate')",
          "german": "mangé (NO agreement with subject!)"
        }
      ],
      "target_answer": "allé, allée (+e), allés (+s), allées (+es), mangé (NO agreement with subject!)",
      "meaning": "Il est... (one man), Elle est... (one woman), Nous sommes... (men or mixed group), Elles sont... (group of women), Elle a... (with avoir: 'she ate')",
      "explanation": "Only être-house participles agree with the subject!",
      "id": "fr1802_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Compare 'She went to the café' (être) vs. 'She ate at the café' (avoir). Which written pair is right?",
      "options": [
        "Elle est allé au café / Elle a mangé au café",
        "Elle est allée au café / Elle a mangé au café",
        "Elle est allée au café / Elle a mangée au café"
      ],
      "target_answer": "Elle est allée au café / Elle a mangé au café",
      "meaning": "être agrees with Elle (allée); avoir does NOT agree with Elle (mangé)!",
      "explanation": "Subject agreement happens inside the être house (allée), never on avoir participles (mangé).",
      "id": "fr1802_e2"
    },
    {
      "type": "derive",
      "prompt": "Write 'She left this morning' (Elle + est + parti with feminine agreement + ce matin):",
      "english_hint": "add -e to parti for Elle",
      "target_answer": "Elle est partie ce matin",
      "meaning": "She left this morning",
      "explanation": "parti adds feminine -e to agree with Elle: Elle est partie.",
      "id": "fr1802_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "Marie arrived yesterday and she stayed at my place",
      "cues": [
        "Marie arrived yesterday → Marie est arrivée hier",
        "and she stayed at my place → et elle est restée chez moi"
      ],
      "idea_parts": [
        "first clause → Marie est arrivée hier",
        "second clause → et elle est restée chez moi"
      ],
      "target_answer": "Marie est arrivée hier et elle est restée chez moi",
      "meaning": "Marie arrived yesterday and stayed at my place",
      "word_bank": [
        "resté",
        "moi",
        "hier",
        "arrivée",
        "arrivé",
        "elle",
        "est",
        "et",
        "Marie",
        "chez",
        "restée",
        "est"
      ],
      "explanation": "Both arrivée and restée add -e to agree with Marie / elle.",
      "diagnosis": {
        "slip": "left off feminine -e",
        "cue": "Add feminine -e to both être participles for Marie: arrivée, restée."
      },
      "id": "fr1802_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Elles sont venues avec nous hier soir",
      "replays": 2,
      "target_answer": "Elles sont venues avec nous hier soir",
      "meaning": "They (f.) came with us last night",
      "cues": [
        "Elles sont venues",
        "avec nous hier soir"
      ],
      "explanation": "venues carries both feminine -e and plural -s for Elles.",
      "affirmation": "You wrote venues with -es for Elles!",
      "id": "fr1802_e5"
    }
  ],
  "summary": {
    "outcome": "Write accurate gender and number agreements (-e, -s, -es) on être-house participles.",
    "use_example": {
      "german": "Elle est sortie, mais elle a oublié son parapluie.",
      "english": "She went out, but she forgot her umbrella."
    },
    "takeaway": "être participles agree with the subject (Elle est allée); avoir participles do not (Elle a mangé).",
    "curiosity_teaser": "Up next on Le Pont ([5151] La Tête, La Main & Le Cœur): see how Agreement Drills leads directly into La Tête, La Main & Le Cœur."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Marie arrived yesterday and stayed at my place\" in French:",
    "target_answer": "Marie est arrivée hier et elle est restée chez moi",
    "word_bank": [
      "est",
      "ne",
      "hier",
      "et",
      "Marie",
      "est",
      "pas",
      "elle",
      "restée",
      "arrivée",
      "moi",
      "chez"
    ],
    "explanation": "Re-constructing \"Marie est arrivée hier et elle est restée chez moi\" from the underlying rule cements the pattern of Agreement Drills."
  }
};

export default lesson;
