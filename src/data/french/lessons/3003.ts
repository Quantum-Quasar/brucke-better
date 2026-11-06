import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3003,
  "slug": "lesson-3003",
  "title": "The Whole-Trail Review Game",
  "subtitle": "Mixed-mode synthesis across all 30 topics of Le Pont.",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "vouloir",
    "aller",
    "avoir",
    "être",
    "faut",
    "voudrais",
    "depuis",
    "en_pron",
    "y",
    "qui",
    "que"
  ],
  "table_word_ids": [
    "vouloir",
    "aller",
    "avoir",
    "être",
    "faut",
    "voudrais",
    "depuis",
    "en_pron",
    "y",
    "qui",
    "que"
  ],
  "hook": {
    "title": "The Whole-Trail Synthesis Game: All 30 Topics in Action",
    "content": "Mix every major tool from the entire 30-topic trail in one synthesis circuit: left-walking pronouns (le, la, lui, y, en), the ne...pas sandwich, partitive collapse (pas de), Present + depuis, Passé composé vs. Imparfait, Conditional politeness (je voudrais), impersonal necessity (il faut que), and relative clauses (qui / que / dont).",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why your French brain now builds instead of memorizing",
        "content": "Every complex sentence is just 2 or 3 small rules snapping together in sequence!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Think the Pieces, Assemble the Chain",
    "content": "Complete the final mixed-mode synthesis challenges across all five phases of Le Pont.",
    "linguist_note": "Compositional mastery of clitic placement, TMA auxiliaries, and relativization covers the core grammar of French.",
    "trap_note": "Check: (1) Where does the pronoun stand? (2) Which tense fits the time frame? (3) Does que bridge the clause?"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each core French structure with its flagship example:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Ongoing duration (Present + depuis)",
          "german": "J'habite ici depuis trois ans"
        },
        {
          "id": "p2",
          "english": "Completed past + ago (Passé composé + il y a)",
          "german": "Je suis arrivé il y a trois ans"
        },
        {
          "id": "p3",
          "english": "Polite conditional + partitive",
          "german": "Je voudrais du pain, s'il vous plaît"
        },
        {
          "id": "p4",
          "english": "Subjunctive after necessity (Il faut que)",
          "german": "Il faut que j'y aille"
        },
        {
          "id": "p5",
          "english": "Subject vs. object relative (qui vs. que)",
          "german": "L'ami qui parle / Le livre que j'aime"
        }
      ],
      "target_answer": "J'habite ici depuis trois ans, Je suis arrivé il y a trois ans, Je voudrais du pain, s'il vous plaît, Il faut que j'y aille, L'ami qui parle / Le livre que j'aime",
      "meaning": "Ongoing duration (Present + depuis), Completed past + ago (Passé composé + il y a), Polite conditional + partitive, Subjunctive after necessity (Il faut que), Subject vs. object relative (qui vs. que)",
      "explanation": "Five master contrasts that define fluent French.",
      "id": "fr3003_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Je ne lui en ai pas parlé'?",
      "german": "Je ne lui en ai pas parlé",
      "natural": "I didn't speak to him/her about it",
      "options": [
        "I didn't speak to him/her about it",
        "I not to-him/her of-it have step spoken",
        "I did not speak of it to him"
      ],
      "target_answer": "I not to-him/her of-it have step spoken",
      "meaning": "Literal structure: I not to-him/her of-it have step spoken",
      "explanation": "ne + lui (to-him/her) + en (of-it) + ai + pas + parlé!",
      "id": "fr3003_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Choose the sentence that is 100% grammatical in French:",
      "options": [
        "Voici le restaurant dont j'ai te parlé hier",
        "Voici le restaurant que je t'ai parlé hier",
        "Voici le restaurant dont je t'ai parlé hier"
      ],
      "target_answer": "Voici le restaurant dont je t'ai parlé hier",
      "meaning": "parler de triggers dont, and t' stands before ai parlé",
      "explanation": "dont replaces de + restaurant, and te elides before the auxiliary ai!",
      "id": "fr3003_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I would like to go there tomorrow because it is very beautiful",
      "cues": [
        "I would like to-there-go tomorrow → Je voudrais y aller demain",
        "because it is very beautiful → parce que c'est très beau"
      ],
      "idea_parts": [
        "conditional + y + infinitive → Je voudrais y aller demain",
        "reason clause → parce que c'est très beau"
      ],
      "target_answer": "Je voudrais y aller demain parce que c'est très beau",
      "meaning": "I would like to go there tomorrow because it is very beautiful",
      "word_bank": [
        "très",
        "y",
        "c'est",
        "beau",
        "demain",
        "voudrais",
        "pourquoi",
        "aller",
        "Je",
        "que",
        "parce",
        "la"
      ],
      "explanation": "y stands right before the infinitive aller, and parce que bridges the reason.",
      "diagnosis": {
        "slip": "placed y before voudrais",
        "cue": "Put y before aller and use parce que for 'because'."
      },
      "id": "fr3003_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Il faut que je parte parce qu'on m'attend",
      "replays": 2,
      "target_answer": "Il faut que je parte parce qu'on m'attend",
      "meaning": "I have to leave because they are waiting for me",
      "cues": [
        "Il faut que je parte",
        "parce qu'on m'attend"
      ],
      "explanation": "Subjunctive parte after Il faut que + everyday on m'attend.",
      "affirmation": "Congratulations — you completed the entire 30-topic French trail!",
      "id": "fr3003_e5"
    }
  ],
  "summary": {
    "outcome": "Synthesize all grammatical engines and conversion bridges of Le Pont with accuracy and confidence.",
    "use_example": {
      "german": "Je sais maintenant que je peux parler français.",
      "english": "I know now that I can speak French."
    },
    "takeaway": "Every complex French sentence is built from simple, transparent pieces you now own.",
    "curiosity_teaser": "Up next on Le Pont ([5011] Bonjour & Merci): see how The Whole-Trail Review Game leads directly into Bonjour & Merci."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I would like to go there tomorrow because it is very beautiful\" in French:",
    "target_answer": "Je voudrais y aller demain parce que c'est très beau",
    "word_bank": [
      "beau",
      "ne",
      "aller",
      "parce",
      "très",
      "pas",
      "demain",
      "que",
      "c'est",
      "voudrais",
      "y",
      "Je"
    ],
    "explanation": "Re-constructing \"Je voudrais y aller demain parce que c'est très beau\" from the underlying rule cements the pattern of The Whole-Trail Review Game."
  }
};

export default lesson;
