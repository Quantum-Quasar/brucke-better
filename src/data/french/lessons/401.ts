import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 401,
  "slug": "pas-un-pas",
  "title": "Pas Un Pas",
  "subtitle": "The footstep etymology gym: negation as refusing to move",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "pas",
    "ne",
    "aller",
    "un_peu"
  ],
  "table_word_ids": [
    "pas",
    "ne",
    "aller",
    "un_peu"
  ],
  "hook": {
    "title": "A Negation You Can Picture",
    "content": "Picture a stubborn 12th-century Frenchman: je n'y vais pas un pas — 'I'm not going there, not one step'. The emphasis hardened into grammar, and now every je ne sais pas carries a ghost footstep inside it. Words with pictures inside them stick. That's the whole lesson.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The other negative nouns",
        "content": "rien ('nothing') was rem 'a thing'; personne ('nobody') was 'a person'; jamais ('never') was 'ever'. French negation is a museum of refused nouns.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "ne...pas + The Bare Infinitive",
    "content": "The sandwich also wraps allé-goers: je ne veux pas partir (I don't want to leave), il ne faut pas parler. The grip lands on the conjugated verb; parked infinitives stay outside. And in the street, you'll hear je sais pas — the ne dropped, the sandwich half-built. Understand it as the same sandwich, lazily served.",
    "trap_note": "Don't re-add ne when quoting speech: 'je sais pas' in a dialogue is not a typo — it's how French is spoken. Written French keeps both slices."
  },
  "exercises": [
    {
      "id": "fr401_e1",
      "type": "matching_pairs",
      "prompt": "Match each negative phrase with its ghost picture:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "not (a refused step)",
          "german": "pas"
        },
        {
          "id": "p2",
          "english": "not (Latin non's stub)",
          "german": "ne"
        },
        {
          "id": "p3",
          "english": "nothing (a refused thing)",
          "german": "rien"
        },
        {
          "id": "p4",
          "english": "nobody (a refused person)",
          "german": "personne"
        }
      ],
      "target_answer": "pas, ne, rien, personne",
      "meaning": "the negative museum",
      "explanation": "Every French negative was once a noun being refused. Pas is the only one the course needs for now."
    },
    {
      "id": "fr401_e2",
      "type": "derive",
      "prompt": "Negate with the sandwich: 'je veux venir' (I want to come) →",
      "target_answer": "Je ne veux pas venir",
      "meaning": "I don't want to come",
      "explanation": "ne before veux, pas after — venir stays parked."
    },
    {
      "id": "fr401_e3",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're refusing firmly: you don't want to celebrate",
      "cues": [
        "Sandwich: ne … veux … pas",
        "célébration → célébrer (strip whole)",
        "je ne veux pas célébrer"
      ],
      "target_answer": "Je ne veux pas célébrer",
      "meaning": "I don't want to celebrate",
      "word_bank": [
        "veux",
        "pas",
        "célébrater",
        "célébrer",
        "Je",
        "un",
        "ne"
      ],
      "idea_parts": [
        "the refusal → je ne veux pas",
        "the verb → célébrer (célébration minus -ation)"
      ],
      "explanation": "je ne veux pas célébrer — the negation sandwich wraps around the want, and the verb stays whole."
    },
    {
      "id": "fr401_e3b",
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Je ne veux pas venir'?",
      "german": "Je ne veux pas venir",
      "natural": "I don't want to come",
      "options": [
        "I do not want to come",
        "I not want step come",
        "Not I want come"
      ],
      "target_answer": "I not want step come",
      "meaning": "I don't want to come (ne = not, pas = step, venir = come)",
      "explanation": "Literally 'I not want step come': the sandwich hugs veux while venir waits outside."
    },
    {
      "id": "fr401_e4",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Il ne veut pas venir",
      "replays": 2,
      "target_answer": "Il ne veut pas venir",
      "meaning": "He doesn't want to come",
      "cues": [
        "New subject: il (he) — veut conjugates with it",
        "Sandwich: ne … veut … pas",
        "venir stays parked"
      ],
      "explanation": "il veut — the same want-verb, one new subject. veut is veux's sibling; hear the t.",
      "affirmation": "You caught veut with its t — the verb agrees with il."
    }
  ],
  "summary": {
    "outcome": "Feel the footstep inside pas, negate infinitive-chains correctly, and read the dropped-ne of speech.",
    "use_example": {
      "german": "Je n'y vais pas un pas.",
      "english": "I'm not going, not one step."
    },
    "takeaway": "Negation is a refused noun with a history — and the sandwich always grips the conjugated verb, never the parked one.",
    "curiosity_teaser": "Up next on Le Pont ([402] Negation in the Wild): see how Pas Un Pas leads directly into Negation in the Wild."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I don't want to celebrate\" in French:",
    "target_answer": "Je ne veux pas célébrer",
    "word_bank": [
      "ne",
      "célébrer",
      "pas",
      "très",
      "veux",
      "ici",
      "Je"
    ],
    "explanation": "Re-constructing \"Je ne veux pas célébrer\" from the underlying rule cements the pattern of Pas Un Pas."
  }
};

export default lesson;
