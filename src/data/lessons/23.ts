import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 23,
  "slug": "plurals-and-i-mutation",
  "title": "Plurals & i-Mutation",
  "subtitle": "Mann→Männer is man→men: umlaut is English's fossil and German's living tool",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mann",
    "frau",
    "kind",
    "haus",
    "buch",
    "tochter",
    "fuß",
    "wasser",
    "glas",
    "blatt",
    "auge",
    "ei",
    "knie",
    "zeitung",
    "berg",
    "rechnung",
    "blume",
    "lampe",
    "bluse"
  ],
  "table_word_ids": [
    "mann",
    "fuß",
    "tochter",
    "haus",
    "buch",
    "kind",
    "frau",
    "wasser",
    "glas",
    "blatt",
    "auge",
    "ei",
    "knie",
    "zeitung",
    "berg",
    "rechnung",
    "blume",
    "lampe",
    "bluse"
  ],
  "hook": {
    "title": "The Fossil You Speak Daily",
    "content": "Say man and men. Foot and feet. Mouse and mice. Goose and geese. You are performing i-mutation — the ancient sound law that pulled a vowel toward i when a vanished -i suffix once followed it. German kept the suffix AND the vowel change, written as the two dots called umlaut: Mann → Männer, Fuß → Füße, Maus → Mäuse, Tochter → Töchter. English kept the vowel change and lost the dots. Your plurals are not a foreign system — they are your own fossil, still living on the continent.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Vanished Suffix",
        "content": "Proto-Germanic plurals once ended in -iz for some nouns. The i pulled the root vowel forward (a→ä, u→ü, ou→eu), then the suffix itself wore away. German writes the pulled vowel with ä/ö/ü; English just kept the pulled vowel — man/men, foot/feet — with no spelling to explain it."
      }
    ]
  },
  "pattern": {
    "title": "Five Plural Patterns, One Mutation Star",
    "content": "Pattern one, -er with umlaut: Mann → Männer, das Kind → die Kinder (no umlaut — the vowel never had an i to fear), das Buch → die Bücher (umlaut!). Pattern two, umlaut alone or with -e: der Apfel → die Äpfel, der Garten → die Gärten. Pattern three, -n/-en for the feminine squad: die Frau → die Frauen, die Zeit → die Zeiten, die Tochter → die Töchter (umlaut + n). Pattern four, -s for foreign and snappy words: das Auto → die Autos. Pattern five, no change at all: der Fernseher → die Fernseher — the -er agent nouns just stay. The dots are your friends: wherever German writes ä/ö/ü in a plural, English almost always changed the vowel too — Fuß/Füße ↔ foot/feet, Maus/Mäuse ↔ mouse/mice.",
    "footnotes": [],
    "trap_note": "Your mind will offer: “plurals add -e or -er.” German has several plural routes and no shortcut, but the article gives it away every time: die is plural as well as feminine. If you see die where you expected der, you are looking at a plural noun, not a feminine one.",
    "linguist_note": "Umlaut is a sound law, not a decoration: it applies whenever a historical i/j followed the root vowel — plurals (Mann/Männer), comparatives (kalt/kälter, next lesson), and verb mutations (geben/gibt — the same law you met in the strong verbs)."
  },
  "exercises": [
    {
      "id": "l23_e1",
      "type": "matching_pairs",
      "prompt": "Match each singular with its umlaut plural — and its English fossil. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "pl1",
          "english": "Mann → ? (man/men)",
          "german": "Männer"
        },
        {
          "id": "pl2",
          "english": "Fuß → ? (foot/feet)",
          "german": "Füße"
        },
        {
          "id": "pl3",
          "english": "Tochter → ? (daughter/daughters)",
          "german": "Töchter"
        },
        {
          "id": "pl4",
          "english": "das Buch → ?",
          "german": "Bücher"
        },
        {
          "id": "pl5",
          "english": "Blatt → ? (leaf/leaves — the blade twin)",
          "german": "Blätter"
        },
        {
          "id": "pl6",
          "english": "Berg → ? (mountain, no dots needed)",
          "german": "Berge"
        },
        {
          "id": "recall1",
          "german": "Die Rechnung für die Bluse",
          "english": "the bill for the blouse"
        },
        {
          "id": "recall2",
          "german": "die Lampe",
          "english": "the lamp"
        },
        {
          "id": "recall3",
          "german": "ein Blatt",
          "english": "a leaf"
        },
        {
          "id": "recall4",
          "german": "ein Ei",
          "english": "an egg"
        },
        {
          "id": "recall5",
          "german": "ein Knie",
          "english": "a knee"
        }
      ],
      "target_answer": "Männer, Füße, Töchter, Bücher, Blätter, Berge, Die Rechnung für die Bluse, die Lampe, ein Blatt, ein Ei, ein Knie",
      "meaning": "Mann → ? (man/men); Fuß → ? (foot/feet); Tochter → ? (daughter/daughters); das Buch → ?; Blatt → ? (leaf/leaves — the blade twin); Berg → ? (mountain, no dots needed); the bill for the blouse; the lamp; a leaf; an egg; a knee",
      "explanation": "The two dots mark the same vowel-pull English performed silently in men, feet, and geese — Blätter pulls them too; Berge takes the plain -e."
    },
    {
      "id": "l23_e2",
      "type": "shift_select",
      "prompt": "Which old connection is the odd one out in this set?",
      "options": [
        "garden → Garten",
        "make → machen",
        "week → Woche",
        "book → Buch"
      ],
      "target_answer": "garden → Garten",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Make, week and book use K → CH. Garden → Garten uses D → T."
    },
    {
      "id": "l23_e3",
      "type": "shift_select",
      "prompt": "Which plural takes the -s pattern (foreign and snappy words)?",
      "options": [
        "das Auto → die Autos",
        "der Mann → die Manns",
        "die Frau → die Fraus",
        "das Buch → die Buchs"
      ],
      "target_answer": "das Auto → die Autos",
      "meaning": "-s plurals for loanwords and abbreviations",
      "explanation": "Native nouns take -er/-e/-n or umlaut; the -s is the modern import lane — Autos, Fotos, Restaurants. The feminine -n squad sweeps your shelf: die Zeitung, die Rechnung, die Blume, die Lampe, die Bluse — every one takes -n in the plural."
    },
    {
      "id": "l23_e4d",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Die Männer haben große Füße",
      "replays": 2,
      "target_answer": "Die Männer haben große Füße",
      "meaning": "The men have big feet",
      "cues": [
        "Two plurals, both umlauted",
        "die covers plural as well as feminine",
        "groß takes -e before a plural noun"
      ],
      "explanation": "Mann → Männer with an umlaut, Fuß → Füße the same way. The umlaut is the plural's vowel signal, and die is plural as well as feminine.",
      "affirmation": "You heard both umlauts and wrote them from memory of the law — ä and ü in the right places."
    },
    {
      "id": "l23_e5",
      "type": "transcribe",
      "prompt": "How would you say:",
      "idea": "you're sketching the beer garden for a friend: the men drink beer and the women drink tea",
      "cues": [
        "Two umlaut plurals carry it: Mann → die Männer (man → men), Frau → die Frauen — then the plural verb trinken for both"
      ],
      "target_answer": "Die Männer trinken Bier und die Frauen trinken Tee",
      "meaning": "The men drink beer and the women drink tea",
      "vocab_hints": [
        {
          "word": "Bier",
          "translation": "beer",
          "note": "das Bier — a mass noun here, no plural marker"
        }
      ],
      "word_bank": [
        "Tee",
        "Bier",
        "Die",
        "das",
        "Mann",
        "die",
        "Männer",
        "und",
        "trinken",
        "Frauen",
        "trinken"
      ],
      "explanation": "Two umlaut plurals (Männer, Frauen) in one sentence — the fossil pair in the wild, built from a thought."
    }
  ],
  "summary": {
    "outcome": "Build umlaut plurals and sort nouns into the five plural patterns.",
    "use_example": {
      "german": "Die Männer trinken Bier und die Frauen trinken Tee.",
      "english": "The men drink beer and the women drink tea."
    },
    "takeaway": "Umlaut is English's own fossil — Mann/Männer ↔ man/men — and five patterns cover the plural system.",
    "curiosity_teaser": "Next: the fossil umlauts — man/men and foot/feet prove i-mutation is your own buried treasure."
  },
  "twist": {
    "prompt": "Shrink the party: the men drink beer becomes THE MAN drinks beer. (Umlaut off, ending changes.)",
    "target_answer": "Der Mann trinkt Bier",
    "word_bank": [
      "trinken",
      "Der",
      "Mann",
      "trinkt",
      "Männer",
      "Die",
      "Bier"
    ],
    "explanation": "die Männer → der Mann: the umlaut plural dissolves back to singular, and the verb returns to the er/sie -t form. The umlaut is the plural's signature — remove it and the ending steps in."
  }
};

export default lesson;
