import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3001,
  "slug": "lesson-3001",
  "title": "A Day in Paris: Reading",
  "subtitle": "The capstone narrative in Paris synthesizing all 9 conversion bridges and tense frames.",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "ville",
    "hôtel",
    "gare",
    "train",
    "restaurant",
    "café",
    "ami",
    "depuis",
    "était",
    "arrivé"
  ],
  "table_word_ids": [
    "ville",
    "hôtel",
    "gare",
    "train",
    "restaurant",
    "café",
    "ami",
    "depuis",
    "était",
    "arrivé"
  ],
  "hook": {
    "title": "A Day in Paris: Reading & Building Connected Narrative",
    "content": "Follow a full day in Paris from morning arrival at la gare (Je suis arrivé à la gare) to walking through the city (la ville était belle) and meeting a friend who lives there (qui habite ici depuis cinq ans).",
    "footnotes": [
      {
        "marker": "1",
        "title": "Notice how every clause links with que, qui, où, or parce que",
        "content": "Connected French is simple clauses welded together with quand, parce que, qui, que, and où.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Scene (Imparfait) + Action (Passé Composé) + Ongoing Truth (Present + depuis)",
    "content": "Read and assemble connected multi-clause sentences set in Paris.",
    "linguist_note": "Narrative cohesion in French relies on tense-aspect switching and relative subordination.",
    "trap_note": "Keep each clause's tense true to its job: ongoing residence = Present + depuis; background scene = Imparfait; completed steps = Passé composé!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each clause from the Paris story with its tense and job:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je suis arrivé à la gare ce matin",
          "german": "Passé composé (être): completed arrival"
        },
        {
          "id": "p2",
          "english": "La ville était très belle",
          "german": "Imparfait: background description"
        },
        {
          "id": "p3",
          "english": "J'ai vu mon ami qui habite à Paris depuis trois ans",
          "german": "Passé composé + Present with depuis"
        },
        {
          "id": "p4",
          "english": "On va dîner au restaurant ce soir",
          "german": "Near future: evening plan"
        }
      ],
      "target_answer": "Passé composé (être): completed arrival, Imparfait: background description, Passé composé + Present with depuis, Near future: evening plan",
      "meaning": "Je suis arrivé à la gare ce matin, La ville était très belle, J'ai vu mon ami qui habite à Paris depuis trois ans, On va dîner au restaurant ce soir",
      "explanation": "Four tenses cooperate seamlessly inside one story.",
      "id": "fr3001_e1"
    },
    {
      "type": "variant_english",
      "prompt": "Which English sentences capture the meaning of 'Je suis allé au café où mon ami m'attendait'?",
      "german": "Je suis allé au café où mon ami m'attendait",
      "meaning": "I went to the café where my friend was waiting for me",
      "renderings": [
        "I went to the café where my friend was waiting for me",
        "I walked to the café where my friend was waiting"
      ],
      "traps": [
        "I am going to the café where my friend waits",
        "My friend went to the café where I was waiting"
      ],
      "target_answer": "I went to the café where my friend was waiting for me",
      "explanation": "Je suis allé is the completed motion; m'attendait (-ait) is the ongoing background action.",
      "id": "fr3001_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal structure of 'L'ami que j'ai vu habite ici depuis deux ans'?",
      "german": "L'ami que j'ai vu habite ici depuis deux ans",
      "natural": "The friend whom I saw has lived here for two years",
      "options": [
        "The friend whom I saw has lived here for two years",
        "The friend who saw me lived here two years ago",
        "The-friend that I have seen lives here since two years"
      ],
      "target_answer": "The-friend that I have seen lives here since two years",
      "meaning": "Literal structure: The-friend that I have seen lives here since two years",
      "explanation": "que j'ai vu modifies L'ami, and habite ici depuis deux ans uses the present tense.",
      "id": "fr3001_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I arrived in Paris this morning and the city is very beautiful",
      "cues": [
        "I arrived in Paris this morning → Je suis arrivé à Paris ce matin",
        "and the city is very beautiful → et la ville est très belle"
      ],
      "idea_parts": [
        "past arrival → Je suis arrivé à Paris ce matin",
        "description → et la ville est très belle"
      ],
      "target_answer": "Je suis arrivé à Paris ce matin et la ville est très belle",
      "meaning": "I arrived in Paris this morning and the city is very beautiful",
      "word_bank": [
        "ai",
        "et",
        "matin",
        "Je",
        "arrivé",
        "belle",
        "très",
        "ville",
        "ce",
        "la",
        "suis",
        "à",
        "le",
        "Paris",
        "est"
      ],
      "explanation": "arriver takes être (Je suis arrivé) and cities take à (à Paris).",
      "diagnosis": {
        "slip": "used ai instead of suis",
        "cue": "arriver takes être: Je suis arrivé."
      },
      "id": "fr3001_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Nous avons trouvé un petit bistro près de la gare",
      "replays": 2,
      "target_answer": "Nous avons trouvé un petit bistro près de la gare",
      "meaning": "We found a small bistro near the station",
      "cues": [
        "Nous avons trouvé",
        "un petit bistro près de la gare"
      ],
      "explanation": "trouvé (-é) with avons + BAGS adjective petit before bistro.",
      "affirmation": "You wrote the Paris narrative sentence cleanly.",
      "id": "fr3001_e5"
    }
  ],
  "summary": {
    "outcome": "Read and construct multi-clause French narratives combining past events, background descriptions, and ongoing states.",
    "use_example": {
      "german": "Quand je suis sorti de la gare, j'ai vu que la ville était magnifique.",
      "english": "When I walked out of the station, I saw that the city was magnificent."
    },
    "takeaway": "Real stories weave Passé composé (events), Imparfait (scene), and Present + depuis (ongoing truths).",
    "curiosity_teaser": "Up next on Le Pont ([3002] Trap Watch: False Friends in the Wild): see how A Day in Paris: Reading leads directly into Trap Watch: False Friends in the Wild."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I arrived in Paris this morning and the city is very beautiful\" in French:",
    "target_answer": "Je suis arrivé à Paris ce matin et la ville est très belle",
    "word_bank": [
      "à",
      "ne",
      "Je",
      "arrivé",
      "ville",
      "matin",
      "la",
      "très",
      "est",
      "pas",
      "Paris",
      "ce",
      "belle",
      "et",
      "suis"
    ],
    "explanation": "Re-constructing \"Je suis arrivé à Paris ce matin et la ville est très belle\" from the underlying rule cements the pattern of A Day in Paris: Reading."
  }
};

export default lesson;
