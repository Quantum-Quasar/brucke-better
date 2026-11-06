import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 502,
  "slug": "cest-gym",
  "title": "C'est Gym",
  "subtitle": "The pointer verb: identification, questions, and la vie",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "cest",
    "est",
    "est_ce_que",
    "très",
    "bon",
    "être"
  ],
  "table_word_ids": [
    "cest",
    "est_ce_que",
    "bon",
    "très",
    "est",
    "être"
  ],
  "hook": {
    "title": "The Most Useful Two Letters in French",
    "content": "C'est does the work of four English phrases: it is, this is, that is, he's/she's (when pointing). C'est bon. C'est Marie. C'est la vie. And it questions beautifully: est-ce que c'est bon? — literally 'is it that it's good?' — a question built by putting a tiny question-machine in front of a statement."
  },
  "pattern": {
    "title": "est-ce que — the Question Machine",
    "content": "Take any statement. Put est-ce que in front. Done: tu veux → est-ce que tu veux ? No word order changes, nothing conjugates. It's the lazy man's inversion, and French made it respectable. The three ladders of asking (voice, est-ce que, inversion) get their full lesson in topic 7.",
    "footnotes": [
      {
        "marker": "1",
        "title": "que, everywhere",
        "content": "que is 'that' — c'est que, je sais que, est-ce que. French's most frequent word is also its quietest: it just connects.",
        "interest": true
      }
    ],
    "trap_note": "Don't stack question machines: 'est-ce que c'est…?' is fine, but est-ce que already asks — no rising voice required, though it's welcome."
  },
  "exercises": [
    {
      "id": "fr502_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the question machine from its parts (is + it + that):",
      "tile_options": [
        "est",
        "que",
        "pas",
        "ce",
        "ne"
      ],
      "target_answer": "estceque",
      "meaning": "est-ce que (the question opener)",
      "explanation": "est 'is' + ce 'it' + que 'that' — a question scaffolded out of a statement. (Tiles join as est-ce que in writing.)"
    },
    {
      "id": "fr502_e2",
      "type": "syntax_builder",
      "prompt": "Assemble the question: 'Is it that you want the cake?' (natural English: Do you want the cake?)",
      "target_answer": "Est-ce que tu veux le gâteau",
      "meaning": "Do you want the cake?",
      "word_bank": [
        "gâteau",
        "la",
        "Est-ce",
        "le",
        "que",
        "tu",
        "un",
        "veux"
      ],
      "explanation": "Statement in, question out — the words inside never move."
    },
    {
      "id": "fr502_e3",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're confirming a plan: is it that it's good? (is it good?)",
      "cues": [
        "the pointer: c'est bon",
        "the machine in front: est-ce que",
        "Est-ce que c'est bon ?"
      ],
      "target_answer": "Est-ce que c'est bon",
      "meaning": "Is it good?",
      "word_bank": [
        "très",
        "bon",
        "que",
        "la",
        "Est-ce",
        "c'est"
      ],
      "idea_parts": [
        "the machine → est-ce que",
        "the statement → c'est bon",
        "nothing else moves"
      ],
      "explanation": "est-ce que c'est bon ? — two c'est-family words cooperating. The question barely touched the sentence."
    },
    {
      "id": "fr502_e4",
      "type": "shift_select",
      "prompt": "'That's life' — the French:",
      "options": [
        "Elle est la vie",
        "C'est la vie",
        "Il est la vie"
      ],
      "target_answer": "C'est la vie",
      "meaning": "That's life",
      "explanation": "c'est points at the whole idea. Il/elle est would describe a specific he/she — the pointer beats the describer here."
    },
    {
      "id": "fr502_e5",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Est-ce que c'est très important",
      "replays": 2,
      "target_answer": "Est-ce que c'est très important",
      "meaning": "Is it very important?",
      "cues": [
        "machine: est-ce que",
        "pointer: c'est",
        "the -ance twin: important"
      ],
      "explanation": "The -ance bridge in a question — importance's adjective, already English's own word.",
      "affirmation": "Machine, pointer, bridge — three systems, one sentence, all yours."
    }
  ],
  "summary": {
    "outcome": "Identify with c'est, ask with est-ce que, and feel que as the connective tissue it is.",
    "use_example": {
      "german": "Est-ce que c'est la vie ? — Oui, c'est la vie.",
      "english": "Is that life? — Yes, that's life."
    },
    "takeaway": "c'est points, est-ce que asks — and neither disturbs the sentence underneath.",
    "curiosity_teaser": "Up next on Le Pont ([6] The -ité & -ance Bridges): see how C'est Gym leads directly into The -ité & -ance Bridges."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Do you want the cake\" in French:",
    "target_answer": "Est-ce que tu veux le gâteau",
    "word_bank": [
      "pas",
      "Est-ce",
      "que",
      "le",
      "gâteau",
      "tu",
      "ne",
      "veux"
    ],
    "explanation": "Re-constructing \"Est-ce que tu veux le gâteau\" from the underlying rule cements the pattern of C'est Gym."
  }
};

export default lesson;
