import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2802,
  "slug": "lesson-2802",
  "title": "Que Everywhere",
  "subtitle": "je pense que, je sais que, c'est… que — que as the master clause connector.",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "que",
    "cest",
    "savoir",
    "comprendre",
    "vouloir",
    "faut",
    "vraiment",
    "possible"
  ],
  "table_word_ids": [
    "que",
    "cest",
    "savoir",
    "comprendre",
    "vouloir",
    "faut",
    "vraiment",
    "possible"
  ],
  "hook": {
    "title": "que Everywhere: The Master Glue of French Thought",
    "content": "Where English drops 'that' ('I think [that] it's good'), French makes que ('that') MANDATORY glue whenever one verb introduces a second clause: Je pense que..., Je sais que..., Je vois que... And C'est... qui / C'est... que acts like a vocal spotlight!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How C'est… qui and C'est… que act like a spotlight",
        "content": "C'est moi qui paie ('I'm the one paying!') and C'est demain qu'on part ('It's tomorrow that we're leaving!') spotlight any word in the sentence!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Never Drop que After je pense, je sais, je vois, je crois",
    "content": "Always pronounce and write que (or qu' before il/elle/on) when bridging two clauses.",
    "linguist_note": "Subordinating complementizer que is obligatorily realized in finite embedded clauses.",
    "trap_note": "Never drop que in 'I know he is here' (*Je sais il est ici) — always build the bridge: Je sais qu'il est ici!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each bridged clause with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je sais qu'il est là (never drop qu'!)",
          "german": "I know (that) he is there"
        },
        {
          "id": "p2",
          "english": "Je pense que c'est possible",
          "german": "I think (that) it's possible"
        },
        {
          "id": "p3",
          "english": "Je vois que tu comprends",
          "german": "I see (that) you understand"
        },
        {
          "id": "p4",
          "english": "C'est toi qui as raison (spotlight!)",
          "german": "You're the one who is right!"
        },
        {
          "id": "p5",
          "english": "C'est demain qu'on part (spotlight!)",
          "german": "It's tomorrow that we're leaving!"
        }
      ],
      "target_answer": "I know (that) he is there, I think (that) it's possible, I see (that) you understand, You're the one who is right!, It's tomorrow that we're leaving!",
      "meaning": "Je sais qu'il est là (never drop qu'!), Je pense que c'est possible, Je vois que tu comprends, C'est toi qui as raison (spotlight!), C'est demain qu'on part (spotlight!)",
      "explanation": "que bridges every embedded clause and spotlights objects/adverbs after C'est.",
      "id": "fr2802_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I think she is ready' in French?",
      "options": [
        "Je pense elle est prête",
        "Je pense qu'elle est prête",
        "Je pense qui elle est prête"
      ],
      "target_answer": "Je pense qu'elle est prête",
      "meaning": "I think (that) she is ready",
      "explanation": "que is mandatory after Je pense, and elides before elle: Je pense qu'elle est prête!",
      "id": "fr2802_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal structure of 'C'est demain que je pars'?",
      "german": "C'est demain que je pars",
      "natural": "I'm leaving TOMORROW (emphasis)",
      "options": [
        "Tomorrow is when I leave",
        "I'm leaving TOMORROW (emphasis)",
        "It-is tomorrow that I leave"
      ],
      "target_answer": "It-is tomorrow that I leave",
      "meaning": "Literal structure: It-is tomorrow that I leave",
      "explanation": "French uses the cleft frame C'est [X] que... to put a vocal spotlight on X.",
      "id": "fr2802_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I know that it is very important",
      "cues": [
        "I know that → Je sais que",
        "it is very important → c'est très important"
      ],
      "idea_parts": [
        "main verb + connector → Je sais que",
        "embedded clause → c'est très important"
      ],
      "target_answer": "Je sais que c'est très important",
      "meaning": "I know (that) it is very important",
      "word_bank": [
        "la",
        "qui",
        "important",
        "c'est",
        "Je",
        "sais",
        "très",
        "que"
      ],
      "explanation": "que is mandatory between Je sais and c'est.",
      "diagnosis": {
        "slip": "omitted que",
        "cue": "Always include que after Je sais: Je sais que c'est..."
      },
      "id": "fr2802_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je pense qu'on va arriver à l'heure",
      "replays": 2,
      "target_answer": "Je pense qu'on va arriver à l'heure",
      "meaning": "I think we're going to arrive on time",
      "cues": [
        "Je pense qu'",
        "on va arriver à l'heure"
      ],
      "explanation": "que elides before on: Je pense qu'on va arriver.",
      "affirmation": "You wrote qu'on with the mandatory elided que!",
      "id": "fr2802_e5"
    }
  ],
  "summary": {
    "outcome": "Bridge clauses with mandatory que/qu' after verbs of knowing, thinking, and seeing, and use C'est… qui/que for emphasis.",
    "use_example": {
      "german": "Je sais qu'il est tard, mais je pense que c'est possible.",
      "english": "I know it's late, but I think it's possible."
    },
    "takeaway": "English drops 'that'; French NEVER drops que.",
    "curiosity_teaser": "Up next on Le Pont ([2803] Verb Dynasties: venir, tenir & prendre Matrices): see how Que Everywhere leads directly into Verb Dynasties: venir, tenir & prendre Matrices."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I know (that) it is very important\" in French:",
    "target_answer": "Je sais que c'est très important",
    "word_bank": [
      "pas",
      "Je",
      "sais",
      "ne",
      "très",
      "que",
      "c'est",
      "important"
    ],
    "explanation": "Re-constructing \"Je sais que c'est très important\" from the underlying rule cements the pattern of Que Everywhere."
  }
};

export default lesson;
