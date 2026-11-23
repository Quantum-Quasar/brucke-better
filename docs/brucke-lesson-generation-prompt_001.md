# Brücke — Lesson Generation Prompt (for Gemini)

## How to use this (for you, not for Gemini)

1. **Attach these repo files to the Gemini chat** (they are the ground truth it must obey):
   - `src/lib/types.ts` (the `Lesson` / `ExerciseItem` schema)
   - `src/data/curriculum.ts` (current trail shells — Gemini will rewrite titles/plans)
   - `src/data/compendium-digest.md` (one line per German word = the allowed word ids)
   - `src/data/frequency-ranks.json` (only the block for the target language)
   - `src/data/english-hook-words.json` (allowed English "twin" words)
   - Two current lessons as *shape* references only: `src/data/lessons/2.ts` and `src/data/lessons/1901.ts`
   - For French/Spanish/Dutch: that language's `compendium-xx.ts` and `curriculum-xx.ts` instead of the German files.
2. Paste everything from **PROMPT START** to **PROMPT END**. Set `{TARGET_LANGUAGE}` at the top.
3. Run **Phase 1** (the plan) alone. Review it. Only then run Phase 2 in batches of 5 lessons.
4. Generate in this order: the 30 cores + the 5 stories + required grammar (sprigs 1603, 1604, 1904, 1905, 2403, 2404; branches 5060, 5080, 5100, 5110). That's about 50 lessons. Do the optional sprigs and branches last.
5. After each batch, drop the files into the repo and run:
   `bun run parse-data && bun run test && bun run lint && bun run typecheck && bun scripts/audit-word-refs.ts && bun scripts/audit-vocab-balance.ts --strict && bun scripts/audit-recurrence.ts --strict && bun scripts/audit-teasers.ts`
   Paste any failures back to Gemini with: "Fix only these failures. Do not change anything else."
6. **Tests that will break by design** if you adopt the new topic order, because they pin old content. Update or delete them on purpose; don't let Gemini weaken them silently:
   - the title-equality check in `trail-map.test.ts` (regenerate `curriculum.ts` together with the lessons)
   - lesson-specific assertions in `tm6-ideas.test.ts` (sprig 1003, `l15_e4`, the four spine lessons, sound imports, posture cues)
   - `docs/german-panorama.md` and `src/data/panorama-links.ts` (they map grammar to lesson ids)
   - word/lesson counts in `docs-sync.test.ts` and `word-counts.ts`
   - shift tags per core (atlas bridge), and the gate `why` texts in `TRAIL_GATES`

---

## PROMPT START

**Target language:** `{TARGET_LANGUAGE}` (German unless stated). **Learner's language:** English.

### 0. Your role

You are the lead curriculum writer for **Brücke**, a mobile-first web app that teaches {TARGET_LANGUAGE} to English-speaking adult beginners (A0 to A2). You are writing the course again **from scratch**, replacing the old lessons. The old lessons were written by AI and drifted. They read like a linguistics course with German attached, carried padded vocabulary, used templated exercises, and graded correct answers as wrong. Your job is to produce lessons that a beginner on a phone can finish in 5–8 minutes. After each one, the learner should be able to **say, understand and remember something real**.

You output **TypeScript lesson modules** that drop straight into an existing app. The app's engine, schema and tests are fixed. Obey the technical contract in §3 exactly.

### 1. The one test

Before you write any sentence, hint or exercise, ask:

> Does this help a beginner **understand, say, remember, or want to continue learning {TARGET_LANGUAGE}**?

If the honest answer is "it makes a word history more interesting", cut it.

English connections ("Wasser looks like water") are **memory hooks, used briefly when obvious**. They are never the subject of a lesson, an exercise or a question.

### 2. Who the learner is

- An adult English speaker with no prior {TARGET_LANGUAGE}, studying on a phone, often in 5–10 minute sessions, sometimes on a train with the sound off.
- Motivated by being able to *do* things: greet, order, ask, explain, tell what happened.
- Not interested in linguistics. Doesn't know words like "velar", "ablaut", "accusative" yet. If you introduce a grammar term, define it in one plain clause the first time.
- Will quit if a lesson feels long, tricky, or marks a correct answer as wrong.

### 3. Hard technical contract (the build and tests enforce this)

Output each lesson as one file, exactly in this shape:

```ts
import type { Lesson } from "@/lib/types";

const lesson: Lesson = { /* … */ };

export default lesson;
```

**Lesson fields**
- `id`: the shell id from the plan. Cores are 1–30. Sprigs are `topic*100+n` (e.g. 401, 402). Branch lessons are `5000+n*10+k` (e.g. 5061). Stories are 9001–9005. Never invent other id schemes.
- `slug`: kebab-case, unique.
- `title`: ≤ 40 characters. **Must match the curriculum shell title character for character** (you will also output the shell list).
- `subtitle`: one line. It's the **can-do promise** ("Say your name and order a drink").
- `phase`: topics 1–8 → 1, 9–16 → 2, 17–30 → 3. Sprigs and branches inherit their topic's phase.
- `shift_categories`: the sound-pattern id this lesson's word spotlight uses (see §10), or `[]`.
- `word_ids`: the new words this lesson **teaches and tests**. These are lowercase compendium ids. Every id must exist in the attached word list. If a word you need is missing, list it under "New compendium rows" (§12) and don't use it until it's added.
- `table_word_ids`: `word_ids` plus **at most 3** extra words that actually appear in this lesson's hook, pattern or examples. Never pad the table.
- `hook`, `pattern`: `{ title, content, footnotes?, trap_note? }`. Do **not** write `linguist_note`.
- `exercises`: **exactly 5** graded items (rules in §6).
- `twist`: exactly one (rules in §6.10).
- `summary`: `{ outcome, use_example: { german, english, accepted_answers?, mcq_distractors? }, takeaway, curiosity_teaser }`.
- `foreshadow` / `payoff`: optional. If you use `foreshadow: { line, resolvedIn }`, the lesson `resolvedIn` **must** carry a matching `payoff: { ofLesson, text }`. Otherwise omit both.

**Mechanical rules**
- Exercise ids are `l<lessonId>_e<n>` (n = 1–5) and globally unique.
- **The first exercise must be `matching_pairs`, `shift_select` or `morpheme_tiles`.** A lesson never opens with production or listening.
- No `target_answer`, `accepted_answers` entry, word-bank chip or twist target may end in punctuation (`. , ! ? ; :`). Internal commas are allowed.
- Every word bank must contain every word of the target (duplicates need duplicate chips), plus 1–3 distractors.
- `matching_pairs`: at most 12 pairs (aim for 4–6).
- `transcribe`: `cues` has 1–3 items. Topics 1–7: 3 cues; 8–16: 2; 17–30: 1.
- `affirmation` ≤ 140 characters. `diagnosis` needs both `slip` and `cue`.
- Every exercise has a non-empty `meaning` and `explanation`.
- Write literal Unicode (ä ö ü ß é ñ ç), never `\u00e4` escapes.
- Every German token in a production answer, word bank, twist or dictation must be a taught word, a word from an **earlier lesson in trail order**, or a word given in `vocab_hints` in this exercise. Trail order is: core → that topic's sprigs → that topic's branches → stories → next core.
- Use only these exercise types: `matching_pairs`, `shift_select`, `morpheme_tiles`, `derive`, `syntax_builder`, `transcribe`, `dictation`, `literal_gloss`, `spoken_turn_reply`, `reverse_cognate` (restricted, §6.8). Don't use `family_matrix`, `variant_english` or `pronoun_compression` unless the plan explicitly asks for them. If it does, copy the field shape exactly from the repo.

### 4. Pedagogy rules

**4.1 Every lesson has one can-do goal.** It's stated in the subtitle and in `summary.outcome`, and it's produced in the last exercise. Examples: "Say where you live", "Ask what something costs", "Say what you did yesterday". Never use "Recognise the X shift" as the goal.

**4.2 Usable language first, pattern second.** Each core teaches **one** structure plus **≤ 7 new words** (≤ 6 in topics 1–3; stories ≤ 8 supported words). The sound/word pattern is a 1–2 sentence spotlight that helps the learner remember the new words. It is never the lesson's point.

**4.3 Exercise mix in every lesson (5 items)**
- Slot 1: recognition (matching or choice), including **1–2 recall items from the previous lesson** (from lesson 2 onward).
- At least **2 production items** (`syntax_builder`, `transcribe`, `derive`, `spoken_turn_reply`, `dictation` counts as half).
- **At least 1 listening item** (`dictation` or `spoken_turn_reply`) in every core and every story.
- Slot 5: production of the lesson's can-do sentence (the engine hides the word bank at first, so this is real recall).
- At most 2 pure-recognition items in total. At most 1 `reverse_cognate`.
- No two lessons in a row with the same sequence of exercise types.

**4.4 Spaced recall built into the content**
- From topic 4 on, every core includes ≥ 1 graded item that uses words from **≥ 3 topics earlier**.
- From topic 5 on, every core includes one **mixed recognition** item that uses earlier words *without naming the rule in the prompt* (a test requires this).
- Every word in `word_ids` must be graded in **this lesson** and again in a graded exercise of **at least one later lesson**. Plan this in the ledger (§11). Words that appear only in tables, hints or prose don't count.

**4.5 Chunks before grammar.** Teaching a useful fixed phrase before its grammar is fine ("Einen Kaffee, bitte — learn it as one block; Topic 7 explains *einen*"). Name the topic that explains it, and keep that promise.

**4.6 Name the likely mistake before it happens.** Each core's `pattern.trap_note` (≤ 200 characters) names the one mistake an English speaker will make, and the fix. Example: "*heißen* is not 'hot' (that's *heiß*). *Ich heiße Lena* = My name is Lena."

**4.7 Pronunciation is taught, not assumed.** Topic 3 (or 1–2 for French/Dutch) is a sounds lesson. Whenever a new sound or spelling appears, add one short "say it like…" line, using English sounds the learner knows. Never claim a word "sounds the same as English" when it doesn't (*singen* starts with a z-sound).

**4.8 Difficulty curve inside a lesson:** recognise → choose → build with tiles → hear → produce. Within the course: each topic adds one new thing and reuses everything before it.

**4.9 Reading stories (9001–9005, plus any new ones):** 120–200 words, present tense unless the story's topic is a past tense, built ≥ 90% from taught words. Give a word bank for the rest. Exercises: comprehension (in English, about the story's *meaning*, never "which word is a cognate"), one listening, and one production of a story sentence.

### 5. Vocabulary rules

- **Frequency first.** At least 70% of new words in topics 1–20 must be in the top 2,000 of the attached frequency list. In topics 1–10, never introduce a word ranked worse than 10,000 unless the can-do needs it (e.g. a menu item). Note the rank in the ledger.
- **Must-have words early.** By the end of topic 6, these must be taught and graded: ja, nein, bitte, danke, hallo/guten Tag, tschüss, ich heiße/bin, auch, nicht, und, aber, sehr, gut, hier, was, wo, wie, wer, viel, gern(e), noch, schon, dann, Entschuldigung, Name. (For other languages, use the equivalent survival list.)
- **Nouns always appear with their article** in tables, matching and hints (`der Kaffee`, not `Kaffee`).
- **`english_meaning` is plain English only.** Never "leg (twin: bone)". Put connections in prose, not in meaning fields, options or answers.
- **English twins** only when both the English word is everyday (in the attached hook-word list) *and* the match is obvious to a beginner. Otherwise say nothing.
- **No duplicate meanings in one matching set** (two items both meaning "to see" is unfair).
- **Topic-themed lists** (food, jobs, countries): ≤ 8 new words per lesson. Split bigger sets into two lessons, or leave the rest as optional table-only extras (≤ 3).

### 6. Exercise-by-exercise rules

**6.1 Prompt wording (this fixes the old "you" bug).** Write the English the learner must say **in quotes, in first person**, with the situation before it:
- ✅ `At the bakery. Say: "I'd like two rolls, please."`
- ✅ `Tell your friend (informal — du): "Can you come tomorrow?"`
- ❌ `you can come tomorrow` (Is "you" the speaker? du or Sie? The old lessons graded *Du kannst…* wrong.)

Whenever "you" means the listener, say which form: (informal — du) or (formal — Sie). French: tu/vous. Spanish: tú/usted. Dutch: jij/u.

**6.2 `accepted_answers` (fair grading).** List **every** correct answer that fits the prompt:
- the same sentence with a fronted time or place word, verb still second (*Morgen kann ich kommen* for *Ich kann morgen kommen*)
- both natural equivalents taught so far (*Ich heiße Lena* / *Ich bin Lena*)
- natural contractions (*im* / *in dem* only if both are correct there)

Never accept a wrong word order, a missing ending or a missing article.

**6.3 `matching_pairs`**
- 4–6 pairs, ids `p1…pn` (recall pairs may use `recall1…`).
- `target_answer` is the target-language items joined with ", ". `meaning` is the English joined with "; ".
- **No identical or near-identical pairs** (Arm = arm and Finger = finger are free points). Pick words where the learner has to think.
- Keep one kind of item per set (all words, or all short phrases).

**6.4 `shift_select` (any multiple choice; the name is historical)**
- 3–4 `options`, including the `target_answer`.
- All options have the **same grammatical shape and similar length** (within about ±30%). The correct one must not be the longest.
- Each wrong option is wrong for **one real reason** a learner might fall for: wrong ending, wrong verb position, wrong article, wrong meaning. No joke options ("Because se means 'I'").
- **The answer is never an English grammar rule or a "why" explanation.** Ask "Which sentence says X?" or "Which is correct?"
- The prompt never contains the answer.

**6.5 `morpheme_tiles`**
- Only for words that really break into learnable parts (compounds, prefix + verb, stem + ending).
- The prompt must not spell the split ("learn + en" gives the answer away). Give the meaning only: "Build the German word for 'to learn'."
- `tile_options`: the parts plus 1–2 plausible distractors (another ending, another stem).

**6.6 `syntax_builder` and `transcribe`**
- Target: 3–9 words, a sentence a native would actually say in the stated situation.
- Word bank: every target word plus 1–3 distractors that test the lesson's point (wrong conjugation, wrong case form, the English-order trap).
- **Capitalisation giveaway:** the sentence's first word must not be the only capitalised chip. Include a capitalised distractor or a second valid opener (in German, nouns count).
- `transcribe` also needs `idea` (the situation plus the quoted English, per §6.1), `cues` (escalating; **cue 1 never gives a word away**, and no cue repeats the English), and optionally `idea_parts` (2–4 thought pieces, not a restatement).
- Add `diagnosis: { slip, cue }` for the single most likely mistake.

**6.7 `dictation`**
- `spoken` = `target_answer` (punctuation may differ), 2–8 words, only taught words, `replays: 2`.
- `cues`: 1–2. Cue 1 gives meaning or context, not the first word.
- Never in slot 1. Remember some learners can't play audio; the item must still be fair if read on screen.

**6.8 `reverse_cognate` (restricted)**
- At most 1 per lesson, only when the lesson's spotlight is a sound pattern, and only with everyday English answers.
- The prompt must not contain the answer or its stem ("twin of 'beginnen'" → *begin* is a giveaway).
- Prefer turning it around: give the English and ask for the {TARGET_LANGUAGE} word (that's `derive`).

**6.9 `derive`, `literal_gloss`, `spoken_turn_reply`**
- `derive`: English word → target word through the lesson's pattern. `english_hint` names the pattern ("th → d"), not the answer.
- `literal_gloss`: only in lessons whose point is **word order** (modals/verb bracket, questions, verb-second, weil/dass, separable verbs, Perfekt), at most 1 per lesson. 3–4 options: exactly one word-for-word rendering, the others natural or wrong in a *different* way. Never use it when the literal and natural English are the same.
- `spoken_turn_reply`: `spoken_question`, `question_meaning`, `reply_idea` (quoted, first person), `cues` (1–2), `word_bank`, `target_answer`, `accepted_answers` if there are alternatives. The reply must use the lesson's structure.

**6.10 `twist` (ungraded, after the 5 exercises)**
- A **new** sentence. It must not repeat any exercise target or the summary sentence. It combines this lesson's point with ≥ 1 word or structure from an earlier lesson.
- From topic 3 on: **no `word_bank`** (real recall). Topics 1–2 may include one.
- `prompt` follows §6.1. `explanation` is one specific sentence about *this* sentence. Never use templates like "Re-assembling … locks in the structural pattern of …".

**6.11 Feedback text**
- `explanation`: ≤ 160 characters. One reason why the answer is right, in plain words. No history.
- `affirmation` (optional): ≤ 140 characters. It names what the learner just did right ("You kept the verb second after *morgen*."). Never generic praise.

### 7. Writing rules

- **Hook:** ≤ 300 characters. A real situation or a quick win, then what you'll be able to do. No footnotes needed.
- **Pattern:** ≤ 650 characters. The rule in one or two plain sentences, then 3–5 short examples with English. Use line breaks (`\n\n`), not walls of text.
- **At most one** optional footnote per lesson, ≤ 200 characters, marked `interest: true`. Never needed to pass the lesson.
- **Tone:** warm, plain, adult, second person. **At most one exclamation mark per lesson.**
- **Banned in learner-facing text** (titles, hooks, patterns, prompts, options, explanations, cues): velar, dental, sibilant, ablaut, umlaut-as-process, i-mutation, suppletion, calque, Satzklammer, Proto-Germanic, Old English, Old High German, Indo-European, "Latin *x* → Greek *y*", reconstructed forms (`*rēdanō`), dates or centuries, "on record since…".
- **Banned hype words:** secret, secret weapon, magic, superpower, ancient, unlock, cleaner, staring right back, "you already know" (unless literally true), Spot on, caboose, lazy speaker.
- **Grammar terms** (subject, verb, ending, article, object) are fine once defined in plain English. Say "verb bracket" rather than "Satzklammer".
- **Never** leave drafting debris in the output ("wait —", "no, actually", half-sentences, two alternatives side by side).

### 8. Naturalness and correctness of {TARGET_LANGUAGE}

- Each sentence must be something a native speaker would plausibly say in the situation you give. Before writing it, picture who says it, to whom, and where.
  - ❌ *Wir können hungern* ("We can go hungry"), *Ich lerne Deutsch mit Brücke*, chains like *Das ist ein Hund. Der Hund ist braun.*
  - ✅ *Ich kann morgen nicht kommen.* *Wo ist der Bahnhof?* *Einen Kaffee, bitte.*
- Standard, neutral register (Hochdeutsch / standard French / neutral Latin-American-or-Peninsular Spanish, said once at the top / Netherlands Dutch). Mark colloquial forms "you'll hear…" and never grade them.
- Double-check: gender and article; case endings; adjective endings; verb position (V2, verb-last after *weil/dass*, separable prefix at the end); ß vs ss; capitalised nouns and *Sie*; accents and ñ/ç; Dutch de/het and ij.
- Don't use any structure before it's taught. If a sentence needs one, either pick a different sentence or teach it as a chunk (§4.5).

### 9. Anti-patterns from the old course (never repeat these)

The old **lesson 1** ("The Germanic Core") shows most of them:
1. A jargon title with no can-do goal. A promise of "hundreds of words you already know", but no real-life sentence. The only sentence was about the app itself.
2. It taught "-en infinitive: strip -en and you find English", then made the learner produce *lerne* (an untaught ending). The rule also fails for *gehen* and *sein*, its own words.
3. The table was padded with six unrelated words (Decke, nächste, schmal, Buche, Zeitschrift, Gesundheit). Lesson 2's modal lesson added Europa, Haselnuss, Rindfleisch and Zoll.
4. *gehen* and *Hand* were in `word_ids` but never practised.
5. Free points: *Arm = arm* and *Finger = finger* as matching pairs.
6. Answers given in the prompt: tiles prompt "(learn + en)", derive hint "bring + en", "Which English verb shares the root of *singen*?" → sing.
7. Untaught words rescued with trivia hints: *mit* ↔ midwife, *Brücke* ↔ ridge, *Deutsch* ↔ Pennsylvania Dutch.
8. Footnotes on Proto-Germanic dates, plus a misleading one equating the *-en* in "brighten" with the infinitive.
9. The twist said "without looking back", then repeated exercise 5 word for word, with a word bank.
10. "Say them aloud", but no listening or pronunciation help, and no warning that *singen* starts with a z-sound.
11. The teaser promised "Arm, Hand, Finger" next, the same words just taught.

Problems found **across** the old course:
- Prompts said "you" but only accepted *ich* (e.g. "you can come tomorrow" → *Ich kann morgen kommen*; "you live in Germany" → *Wir leben…*).
- No alternatives for fronted time words (*Gestern bin ich…* was marked wrong).
- The correct option was often the longest, or an English rule sentence.
- 116 German exercise texts used etymology (Proto-Germanic, Latin, Greek, centuries).
- Lessons carried up to 40 new words with only 5 exercises.
- 62% of German items were recognition, with almost no listening (14 dictations in 179 lessons).
- Survival words (ja, nein, auch, gerne, Name, hallo, tschüss) were never graded.
- French lesson 1 called *je, tu, la, un peu* "French twins" and put object pronouns (*Tu le veux*) in lesson 1.
- Spanish taught *se lo* (core 22) before *lo/la/le* (core 23).
- Dutch options were auto-filled with junk ("I am here. (1)", "not He is here.").

### 10. Curriculum plan (German) — keep these ids

The ids of required grammar and stories are fixed and pinned by tests. Keep them at these topics: imperative branch **5060 on topic 9**; reflexives **1603/1604 on topic 16**; Präteritum **1904/1905 on topic 19**; adjective endings **2403/2404 on topic 24**; Part 2 branches **5080/5100/5110 on topic 30**. Stories: **9001 after 10, 9002 after 20, 9003 after 24, 9004 after 27, 9005 after 30**. Gates sit after topics **7, 10, 16, 20, 26, 29**.

| Core | Can-do / structure | Word spotlight (`shift_categories`) |
|---|---|---|
| 1 | Hallo! Greet, say your name, yes/no/thanks, order a drink (chunks) | `[]` (twins: Kaffee, Wasser) |
| 2 | Present tense: ich/du/er/wir with everyday verbs (lernen, kommen, trinken, wohnen) | `[]` |
| 3 | How German sounds: ei/ie, w, z, ch, sch, ä/ö/ü, sp/st — and a minimal-pair listening drill | `t_to_s_ss_z` (Wasser, Zeit, zwei, was) |
| 4 | der/die/das, ein/eine, gender clues (-ung, -chen, -e) | `th_to_d` (das/the, Ding, denken, drei) |
| 5 | Saying no: nicht and kein | `k_to_ch` (ich, machen, Buch, Milch, noch) |
| 6 | Questions: wer, was, wo, wie, woher, and yes/no questions | `d_to_t` (Tag, trinken, tun, gut, Tür) |
| 7 | haben + "a/the" as object (einen, den, ihn); shopping basics | `p_to_pf_f` (Apfel, helfen, Schiff, offen) |
| 8 | Modals können, wollen, müssen, möchten + verb bracket | `v_to_b` (haben, leben, geben, sieben, halb) |
| 9 | Verbs that change: essen, sprechen, nehmen, fahren, lesen (→ imperative branch 5060) | `[]` |
| 10 | Numbers, time, days, appointments (→ story 9001) | `y_gh_to_g_ch` (acht, Nacht, Tag, Weg) |
| 11 | This one, that one: dieser and der/die/das as "that one" | `[]` |
| 12 | Plurals | `[]` |
| 13 | My, your, our: possessives and family | `[]` |
| 14 | Because and that: weil/dass, verb at the end | `[]` |
| 15 | Separable verbs and daily routine (anrufen, aufstehen, einkaufen) | `[]` |
| 16 | be-/ver-/er- verbs (→ reflexive sprigs 1603/1604) | `[]` |
| 17 | What I did: Perfekt with haben (ge-…-t) | `[]` |
| 18 | Where I went: Perfekt with sein, common irregular participles | `[]` |
| 19 | Strong verbs; war/hatte/konnte (→ sprigs 1904/1905) | `strong_verbs_ablaut` |
| 20 | To me, with you: the dative (mir, dir, mit, bei, zu) (→ story 9002) | `[]` |
| 21 | Where things are: in/auf/an/unter with place and motion | `[]` |
| 22 | Compound nouns and their gender | `[]` |
| 23 | Food and shopping: wie viel, kosten, gern/lieber/am liebsten | `[]` |
| 24 | Comparing and describing (→ adjective-ending sprigs 2403/2404, story 9003) | `[]` |
| 25 | International verbs: -ieren (telefonieren, reservieren, probieren) | `latin_ieren` |
| 26 | Getting around: directions, transport, nach/zu/in | `[]` |
| 27 | Time and movement words: seit, vor, über, durch (→ story 9004) | `[]` |
| 28 | One root, many verbs (stehen/verstehen, gehen/ausgehen) | `strong_verbs_ablaut` |
| 29 | Feelings and opinions: mir ist kalt, ich finde…, es gefällt mir | `[]` |
| 30 | Capstone reading (→ story 9005, Part 2) | `[]` |

Required dependencies: weil/dass (14), demonstratives (11) and Perfekt (17–18) must be solid before Part 2 (relative clauses, als/wenn/ob, Konjunktiv II). Each Part 2 lesson re-teaches anything it needs from optional lessons.

**Other languages (same rules, different traps)**
- **French:** lesson 1 is *je suis / c'est / je voudrais*, greetings and politeness. Sounds (silent endings, liaison, nasal vowels, é/è) by lesson 2. No object pronouns before the pronoun topic. Always mark tu/vous. Handle elision (j', l') in banks as single chips.
- **Spanish:** vowels and stress in lesson 1–2. Present tense -ar **and** -er/-ir by topic 3. Teach lo/la/le **before** se lo. Mark tú/usted. Keep ¿ ¡ out of chips. Pick one variety (Latin American or Peninsular) and state it.
- **Dutch:** output full `Lesson` objects (not `DutchLessonSpec`), so every option is hand-written. Teach de/het with every noun. Cover the g/ch sound, ij/ei, ui and eu early. Mark jij/je/u.

### 11. Workflow

**Phase 1 — Plan (output only this, then stop).** For every lesson in the batch range:
`id | title (≤ 40 chars) | can-do | structure | new words (≤ 7, with frequency rank) | recalled words + their source lesson | exercise-type sequence | where each new word is graded again later`
Also include: the gate texts (one sentence each: what the learner can now do), and the curriculum shell list (`id`, `title`, one-line `plan`).

**Phase 2 — Write**, at most 5 lessons per reply, in trail order. Keep a running **vocabulary ledger**: every taught word → the lesson that teaches it → the later lessons that grade it again.

**Phase 3 — Fix.** When I paste test or audit failures, fix exactly those, and change nothing else.

### 12. Output format for each Phase 2 reply

1. For each lesson: a heading with its repo path (`src/data/lessons/<id>.ts`), then one fenced `ts` block with the complete file.
2. **New compendium rows** needed (German), in this exact §2 format, one per line:
   `| # | **Wort** | english cognate or - | der/die/das or - | /IPA/ | `shift_id` or `Direct Cognate` | Satz. *("Sentence.")* | short plain note | domain |`
   Other languages: the TypeScript entry shape used in the attached `compendium-xx.ts`.
3. **Ledger update** (table: word | taught in | graded again in).
4. **Self-check** (one line per lesson: "passes §13" or the exact item it fails and why).
5. **Questions for me**, if any. Don't guess silently about a curriculum decision.

No other commentary.

### 13. Self-check before you output each lesson

- [ ] Can-do in the subtitle and outcome, and produced in exercise 5
- [ ] ≤ 7 new words (≤ 6 in topics 1–3). Each is graded here and scheduled again later. The table has ≤ 3 extras.
- [ ] Slot 1 is recognition with recall items. ≥ 2 production. ≥ 1 listening (cores and stories). ≤ 1 reverse_cognate.
- [ ] Every target-language token is taught earlier, taught here, or in `vocab_hints`
- [ ] Every "you" prompt says who is speaking and which form. Every prompt quotes the first-person English.
- [ ] `accepted_answers` covers fronted adverbs and taught synonyms
- [ ] No answer in any prompt. Correct option not the longest. No English-rule answers.
- [ ] The first word of a bank is not the only capitalised chip
- [ ] No banned terms, no etymology in exercises, ≤ 1 exclamation mark, hook ≤ 300, pattern ≤ 650 characters
- [ ] Every sentence is natural in its stated situation, and grammar, gender and spelling are checked
- [ ] The twist is new, has no bank (from topic 3 on) and a specific explanation
- [ ] The teaser names the **next lesson in trail order** by its exact title and says what it will let the learner do (≤ 120 characters)
- [ ] No punctuation at the end of answers or chips. Exercise ids are unique. Exactly 5 exercises.

### 14. Worked example — new German lesson 1 (copy the quality, not the content)

```ts
import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  id: 1,
  slug: "hallo-first-german",
  title: "Hallo! Your First German",
  subtitle: "Say your name, say yes, no and thanks, and order a coffee",
  phase: 1,
  shift_categories: [],
  word_ids: ["heißen", "ja", "nein", "danke", "bitte", "kaffee", "wasser"],
  table_word_ids: ["heißen", "ja", "nein", "danke", "bitte", "kaffee", "wasser", "tee"],
  hook: {
    title: "A café in Berlin",
    content:
      "You walk up to the counter. Good news: der Kaffee is coffee and das Wasser is water. Add ja, nein, danke and bitte, and by the end of this lesson you can order politely and give your name.",
  },
  pattern: {
    title: "Three things to say today",
    content:
      "Your name: Ich heiße Lena. It means \"My name is Lena\" (word for word: \"I am called Lena\"). Ich bin Lena works too.\n\nYes, no, thanks: ja, nein, danke. Nein, danke = No, thanks.\n\nOrdering: name the thing, then bitte. Einen Kaffee, bitte = A coffee, please. Learn einen Kaffee as one block for now; Topic 7 explains einen.",
    trap_note: "heißen is not \"hot\" (that's heiß). Ich heiße Lena means My name is Lena.",
  },
  exercises: [
    {
      id: "l1_e1",
      type: "matching_pairs",
      prompt: "Match the German with the English:",
      matching_pairs: [
        { id: "p1", english: "yes", german: "ja" },
        { id: "p2", english: "no", german: "nein" },
        { id: "p3", english: "thanks", german: "danke" },
        { id: "p4", english: "please", german: "bitte" },
        { id: "p5", english: "the coffee", german: "der Kaffee" },
        { id: "p6", english: "the water", german: "das Wasser" },
      ],
      target_answer: "ja, nein, danke, bitte, der Kaffee, das Wasser",
      meaning: "yes; no; thanks; please; the coffee; the water",
      explanation: "These six words get you through a café visit.",
    },
    {
      id: "l1_e2",
      type: "shift_select",
      prompt: "The barista asks your name. Which reply means \"My name is Tom\"?",
      options: ["Ich heiße Tom", "Ich heißt Tom", "Ich bin heiß Tom", "Heiße Tom ich"],
      target_answer: "Ich heiße Tom",
      meaning: "My name is Tom",
      vocab_hints: [{ word: "ich", translation: "I" }],
      explanation: "After ich the verb ends in -e: ich heiße. heiß on its own means hot.",
      affirmation: "Right ending, right meaning: ich heiße.",
    },
    {
      id: "l1_e3",
      type: "dictation",
      prompt: "Listen and write what you hear.",
      spoken: "Nein, danke",
      replays: 2,
      target_answer: "Nein, danke",
      meaning: "No, thanks",
      cues: ["A polite way to turn something down", "Two words from the matching exercise"],
      explanation: "Nein, danke is the polite way to refuse an offer.",
      affirmation: "You caught both words of a polite no.",
    },
    {
      id: "l1_e4",
      type: "syntax_builder",
      prompt: "At the counter. Say: \"A coffee, please.\"",
      target_answer: "Einen Kaffee bitte",
      accepted_answers: ["Kaffee bitte"],
      meaning: "A coffee, please",
      word_bank: ["Einen", "Ein", "Kaffee", "Wasser", "bitte", "danke"],
      vocab_hints: [{ word: "einen", translation: "a", note: "Say einen Kaffee as one block for now." }],
      explanation: "Name the thing, then add bitte. Einen Kaffee is the usual way to order one.",
    },
    {
      id: "l1_e5",
      type: "transcribe",
      prompt: "Say it in German:",
      idea: "The barista calls out \"Lena?\" You are Lena. Say: \"Yes, my name is Lena.\"",
      idea_parts: ["yes", "my name is → I am called", "Lena"],
      cues: [
        "Two parts: yes, then your name",
        "\"My name is\" = ich heiße",
        "Ja, ich heiße …",
      ],
      target_answer: "Ja, ich heiße Lena",
      accepted_answers: ["Ja, ich bin Lena"],
      meaning: "Yes, my name is Lena",
      word_bank: ["Ja", "Nein", "ich", "heiße", "heißt", "bin", "Lena"],
      vocab_hints: [
        { word: "ich", translation: "I" },
        { word: "Lena", translation: "a first name" },
      ],
      explanation: "Ja first, then ich heiße and your name. Ich bin Lena is also correct.",
      diagnosis: { slip: "heißt instead of heiße", cue: "After ich, the verb ends in -e: ich heiße." },
    },
  ],
  twist: {
    prompt: "The waiter offers you water. Say: \"No thanks, a coffee please.\"",
    target_answer: "Nein danke, einen Kaffee bitte",
    explanation: "Nein danke turns down the water; einen Kaffee bitte asks for what you want.",
  },
  summary: {
    outcome: "Greet, give your name, and order a drink politely.",
    use_example: {
      german: "Einen Kaffee, bitte.",
      english: "A coffee, please.",
      accepted_answers: ["Kaffee, bitte"],
      mcq_distractors: ["Einen Kaffee, danke", "Ein Wasser, bitte", "Kaffee einen, bitte"],
    },
    takeaway: "Name the thing, add bitte. When it arrives, say danke.",
    curiosity_teaser: "Next: I Learn, You Come — say what you and your friends do every day.",
  },
};

export default lesson;
```

Why this example is right: one can-do goal, 7 useful words, nouns with articles, no padding, listening included, production last, the likely mistake named before it happens, no etymology, a new twist sentence, and a teaser that names the next lesson's goal. The teaser must name the actual next node's exact title from your plan.

## PROMPT END
