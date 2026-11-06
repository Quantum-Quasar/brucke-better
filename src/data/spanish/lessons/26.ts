import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 26,
  "slug": "would-world-and-subjunctive-preview",
  "title": "The Would-World & Subjunctive Preview",
  "subtitle": "me gustaría, podrías, and the opposite-vowel subjunctive after wishes",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "gustaría",
    "podría",
    "ojalá",
    "querer",
    "tener",
    "reservar",
    "hablar",
    "comer",
    "mesa",
    "importante"
  ],
  "table_word_ids": [
    "gustaría",
    "podría",
    "ojalá",
    "querer",
    "tener",
    "reservar",
    "hablar",
    "comer",
    "mesa",
    "importante"
  ],
  "hook": {
    "title": "Two Moods Beyond Plain Fact: The Conditional (-ía) & The Subjunctive",
    "content": "First, the **Conditional ('would')**: take ANY full infinitive verb (gustar, hablar, comer, vivir) and glue **-ía, -ías, -ía, -íamos, -ían** straight onto the end without removing -ar/-er/-ir! Thus me gusta ('it pleases me / I like') becomes **me gustaría** ('it would please me' = **'I would like'**): Me gustaría reservar una mesa! Second, the **Subjunctive**: when you want, hope, or say it's important that SOMEONE ELSE do something (Quiero que tú..., Es importante que..., Ojalá...), Spanish switches the verb's theme vowel to the **OPPOSITE vowel**: -ar verbs switch from -a to **-e** (hablas → **hables**, hable), and -er/-ir verbs switch from -e/-i to **-a** (comes → **comas**, tengas, viva)!"
  },
  "pattern": {
    "title": "When to Use Infinitive vs Subjunctive: Same Person vs Two People!",
    "content": "• **One person** ('I want to speak'): Quiero hablar (simple infinitive!).\n• **Two people connected by 'que'** ('I want YOU to speak' = 'I want that you speak'): **Quiero que hables** (opposite-vowel subjunctive!)!",
    "linguist_note": "The Romance conditional fused the Latin infinitive with the imperfect of habēre (gustāre + habēbam → gustaría), which is why -ía stays attached to the whole infinitive!",
    "trap_note": "Never say *Quiero tú hablar (copying English 'I want you to speak'). Whenever the subject changes after querer, Spanish requires que + subjunctive: Quiero que hables!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I would like (it would please me: gustar + -ía)",
          "german": "me gustaría"
        },
        {
          "id": "p2",
          "english": "could you / I could (polite conditional of poder)",
          "german": "podrías / podría"
        },
        {
          "id": "p3",
          "english": "that you speak (-ar flips to opposite vowel -e!)",
          "german": "que hables"
        },
        {
          "id": "p4",
          "english": "that you eat (-er flips to opposite vowel -a!)",
          "german": "que comas"
        },
        {
          "id": "p5",
          "english": "hopefully / God willing (always triggers subjunctive!)",
          "german": "ojalá"
        }
      ],
      "target_answer": "me gustaría, podrías / podría, que hables, que comas, ojalá",
      "meaning": "I would like (it would please me: gustar + -ía), could you / I could (polite conditional of poder), that you speak (-ar flips to opposite vowel -e!), that you eat (-er flips to opposite vowel -a!), hopefully / God willing (always triggers subjunctive!)",
      "explanation": "Conditional = full infinitive + -ía; Subjunctive = opposite ending vowel (-ar → -e, -er/-ir → -a).",
      "id": "es26_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'would like / would please' by gluing the conditional ending '-ía' onto the full infinitive 'gustar':",
      "tile_options": [
        "ó",
        "aba",
        "gustar",
        "ía"
      ],
      "target_answer": "gustaría",
      "meaning": "gustaría (would please / would like)",
      "explanation": "Full infinitive gustar + ía = gustaría.",
      "id": "es26_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How does Spanish express 'I want you to speak Spanish' (literally 'I want that you speak Spanish')?",
      "options": [
        "*Quiero tú hablar español",
        "Quiero que hables español",
        "*Quiero que hablas español"
      ],
      "target_answer": "Quiero que hables español",
      "meaning": "I want you to speak Spanish",
      "explanation": "After Quiero que..., the second verb switches its -ar ending (-as) to the opposite vowel (-es): que hables!",
      "id": "es26_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I would like to reserve a table'",
      "target_answer": "Me gustaría reservar una mesa",
      "meaning": "I would like to reserve a table",
      "word_bank": [
        "gustaría",
        "una",
        "un",
        "gusta",
        "reservar",
        "el",
        "mesa",
        "Me"
      ],
      "explanation": "Me gustaría ('I would like') + reservar una mesa.",
      "id": "es26_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Quiero que hables conmigo'?",
      "german": "Quiero que hables conmigo",
      "natural": "I want you to speak with me",
      "options": [
        "You want that I speak with me",
        "I want to speak with you",
        "I-want that you-speak(subj.) with-me",
        "I want you to speak with me"
      ],
      "target_answer": "I-want that you-speak(subj.) with-me",
      "meaning": "I want you to speak with me (literal Spanish blueprint: I-want that you-speak(subj.) with-me)",
      "explanation": "English uses an object + infinitive ('want you to speak'); Spanish uses 'Quiero que + subjunctive' ('I-want that you-speak').",
      "id": "es26_e5"
    }
  ],
  "summary": {
    "outcome": "Form the polite conditional (me gustaría, podría) and the opposite-vowel subjunctive after quiero que / es importante que.",
    "use_example": {
      "german": "Me gustaría reservar una mesa y quiero que hables con mi amigo.",
      "english": "I would like to reserve a table and I want you to speak with my friend."
    },
    "takeaway": "Conditional = infinitive + -ía; Subjunctive = flip -ar to -e and -er/-ir to -a after que.",
    "curiosity_teaser": "Up next ([2601] The Conditional of Politeness): soften requests with me gustaría and ¿podrías...?"
  },
  "twist": {
    "prompt": "Assemble: 'I would like a coffee, please'",
    "target_answer": "Me gustaría un café por favor",
    "word_bank": [
      "café",
      "gusta",
      "Me",
      "una",
      "favor",
      "por",
      "un",
      "gracias",
      "gustaría"
    ],
    "explanation": "Me gustaría un café, por favor."
  },
  "foreshadow": {
    "line": "You just unlocked the Deep Engine Gate! In Topic 27, we enter Phase 5 (Synthesis) by decoding the three historical sound shifts that unlock hundreds of deep Spanish roots: f-→h-, -ct-→-ch-, and pl-/cl-→ll-!",
    "resolvedIn": 27
  },
  "payoff": {
    "ofLesson": 25,
    "text": "Me gusta ('I like') from Topic 25 turns effortlessly into Me gustaría ('I would like') simply by adding -ía to gustar!"
  }
};

export default lesson;
