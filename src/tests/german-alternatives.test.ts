import { describe, expect, it } from "vitest";
import {
  expandGermanTargets,
  generateGermanRegisterAlternatives,
  generateGermanV2Alternatives,
  isUnspecifiedYouPrompt,
} from "../lib/german-alternatives";
import { gradeExerciseAttempt } from "../lib/exercise-grading";
import { gradeLessonAnswer } from "../lib/lesson-grading";
import type { ExerciseItem } from "../lib/types";
import lesson3 from "../data/lessons/3";
import lesson4 from "../data/lessons/4";
import lesson6 from "../data/lessons/6";
import lesson13 from "../data/lessons/13";
import lesson18 from "../data/lessons/18";
import lesson1302 from "../data/lessons/1302";
import lesson1802 from "../data/lessons/1802";
import lesson1903 from "../data/lessons/1903";
import lesson2801 from "../data/lessons/2801";
import lesson2902 from "../data/lessons/2902";
import lesson5011 from "../data/lessons/5011";
import lesson5072 from "../data/lessons/5072";

const deOptions = { languageId: "de", umlautTolerance: false, capitalizationTolerance: false };

const makeExercise = (overrides: Partial<ExerciseItem>): ExerciseItem => ({
  id: "test-alt",
  type: "transcribe",
  prompt: "Translate into German:",
  target_answer: "",
  ...overrides,
});

describe("German V2 fronted time/place adverb equivalence", () => {
  it.each([
    ["Ich bin gestern nach Berlin gefahren", "Gestern bin ich nach Berlin gefahren"],
    ["Gestern bin ich nach Berlin gefahren", "Ich bin gestern nach Berlin gefahren"],
    ["Ich habe gestern Deutsch gelernt", "Gestern habe ich Deutsch gelernt"],
    ["Wir sind gestern gewandert", "Gestern sind wir gewandert"],
    ["Der Himmel ist heute grau", "Heute ist der Himmel grau"],
    ["Ich esse jetzt Suppe", "Jetzt esse ich Suppe"],
    ["Ich trinke immer Kaffee am Morgen", "Immer trinke ich Kaffee am Morgen"],
    ["Das Buch ist hier", "Hier ist das Buch"],
    ["Das Schlafzimmer ist dort oben", "Dort oben ist das Schlafzimmer"],
    ["Gestern hatte ich keine Zeit", "Ich hatte gestern keine Zeit"],
    ["Morgen wollen wir Deutsch lernen", "Wir wollen morgen Deutsch lernen"],
    ["Morgen um acht trinken wir Kaffee", "Wir trinken morgen um acht Kaffee"],
    ["Jetzt habe ich einen Termin", "Ich habe jetzt einen Termin"],
    ["Später kaufe ich eine Hose und eine Jacke", "Ich kaufe später eine Hose und eine Jacke"],
    ["Gestern waren der Mann und die Frau in der Stadt", "Der Mann und die Frau waren gestern in der Stadt"],
    ["Ich sagte gestern, wo der Weg ist", "Gestern sagte ich, wo der Weg ist"],
    ["Ja es ist heute kälter", "Ja heute ist es kälter"],
  ])("accepts valid V2 inversion: %s <-> %s", (target, alternate) => {
    expect(generateGermanV2Alternatives(target)).toContain(alternate);
    const graded = gradeLessonAnswer([alternate], [target], deOptions);
    expect(graded.result.accuracy).toBe("exact");
  });

  it("supports multiple movable adverbs in the same main clause", () => {
    const alts = generateGermanV2Alternatives("Wir wohnen immer hier");
    expect(alts).toContain("Immer wohnen wir hier");
    expect(alts).toContain("Hier wohnen wir immer");
    expect(gradeLessonAnswer(["Hier wohnen wir immer"], ["Wir wohnen immer hier"], deOptions).result.accuracy).toBe("exact");
    expect(gradeLessonAnswer(["Immer wohnen wir hier"], ["Wir wohnen immer hier"], deOptions).result.accuracy).toBe("exact");
  });

  it("accepts valid V2 inversion on actual lesson exercises without needing manual accepted_answers", () => {
    const l1802 = lesson1802.exercises.find((e) => e.id === "l1802_e5")!;
    expect(gradeExerciseAttempt(l1802, ["Gestern bin ich nach Berlin gefahren"], deOptions).result.accuracy).toBe("exact");

    const l2801 = lesson2801.exercises.find((e) => e.id === "l2801_e5")!;
    expect(gradeExerciseAttempt(l2801, ["Ich bin gestern mit dem Zug nach Berlin gefahren"], deOptions).result.accuracy).toBe("exact");

    const l18 = lesson18.exercises.find((e) => e.id === "l18_e5")!;
    expect(gradeExerciseAttempt(l18, ["Gestern habe ich Deutsch gelernt"], deOptions).result.accuracy).toBe("exact");
  });

  it.each([
    // V3 errors (adverb + subject + finite verb)
    ["Ich bin gestern nach Berlin gefahren", "Gestern ich bin nach Berlin gefahren"],
    ["Ich bin gestern nach Berlin gefahren", "Ich gestern bin nach Berlin gefahren"],
    ["Gestern bin ich nach Berlin gefahren", "Gestern ich bin nach Berlin gefahren"],
    ["Morgen wollen wir Deutsch lernen", "Morgen wir wollen Deutsch lernen"],
    ["Jetzt habe ich einen Termin", "Jetzt ich habe einen Termin"],
    ["Der Himmel ist heute grau", "Heute der Himmel ist grau"],
    // Verb-final errors in main clauses
    ["Ich bin gestern nach Berlin gefahren", "Gestern ich nach Berlin gefahren bin"],
    ["Ich bin gestern nach Berlin gefahren", "Ich gestern nach Berlin gefahren bin"],
    // Broken verb bracket / scrambled order
    ["Ich bin gestern nach Berlin gefahren", "Gestern bin nach Berlin ich gefahren"],
    ["Ich bin gestern nach Berlin gefahren", "Gestern gefahren bin ich nach Berlin"],
    // Questions must not be inverted into declarative statements
    ["Kommst du morgen", "Morgen kommst du"],
    ["Kann ich morgen kommen", "Morgen kann ich kommen"],
    ["Wo wohnst du jetzt", "Jetzt wohnst du wo"],
    // Capitalized noun "Morgen" or degree-modified adverb must not be falsely fronted
    ["Es gibt keinen besseren Morgen", "Morgen gibt es keinen besseren"],
    ["Der Zug fährt sehr früh", "Früh fährt der Zug sehr"],
    // Subordinate clause adverb must not be extracted to the main clause
    ["Ich weiß, dass du morgen kommst", "Morgen weiß ich, dass du kommst"],
  ])("rejects invalid verb-position or non-equivalent order: %s ≠ %s", (target, invalid) => {
    const graded = gradeLessonAnswer([invalid], [target], deOptions);
    expect(graded.result.accuracy).toBe("incorrect");
  });
});

describe("Unspecified 'you' register equivalence (du / ihr / Sie)", () => {
  it("distinguishes unspecified 'you' prompts from explicit register prompts", () => {
    expect(isUnspecifiedYouPrompt("Translate: 'Do you know where the coffee is?'")).toBe(true);
    expect(isUnspecifiedYouPrompt("How would you say: Are you coming tomorrow?")).toBe(true);
    expect(isUnspecifiedYouPrompt("You want to say: I think of you")).toBe(true);

    // Pure meta-instruction "you" without target "you"
    expect(isUnspecifiedYouPrompt("Listen and write the German sentence you hear:")).toBe(false);
    expect(isUnspecifiedYouPrompt("Listen and write the whole sentence.")).toBe(false);
    expect(isUnspecifiedYouPrompt("How would you say: I have no time")).toBe(false);

    // Explicit register specifiers must stay strict
    expect(isUnspecifiedYouPrompt("Assemble the formal thank-you: 'I thank you (formal)'")).toBe(false);
    expect(isUnspecifiedYouPrompt("Ask (informal): Do you have time?")).toBe(false);
    expect(isUnspecifiedYouPrompt("Ask (plural): Are you coming tomorrow?")).toBe(false);
    expect(isUnspecifiedYouPrompt("Flip: 'du weißt' → question form:")).toBe(false);
    expect(isUnspecifiedYouPrompt("Say politely using Sie: Can you help me?")).toBe(false);
    expect(isUnspecifiedYouPrompt("Use ihr: Where do you live?")).toBe(false);
    expect(isUnspecifiedYouPrompt("Translate: 'I thank thee'")).toBe(false);
  });

  it("generates matching verb conjugations, object pronouns, and possessives across du / ihr / Sie", () => {
    expect(generateGermanRegisterAlternatives("Weißt du wo der Kaffee ist")).toEqual([
      "Wisst ihr wo der Kaffee ist",
      "Wissen Sie wo der Kaffee ist",
    ]);
    expect(generateGermanRegisterAlternatives("Bist du bereit")).toEqual([
      "Seid ihr bereit",
      "Sind Sie bereit",
    ]);
    expect(generateGermanRegisterAlternatives("Arbeitest du heute")).toEqual([
      "Arbeitet ihr heute",
      "Arbeiten Sie heute",
    ]);
    expect(generateGermanRegisterAlternatives("Ich weiß, dass du Deutsch lernst")).toEqual([
      "Ich weiß, dass ihr Deutsch lernt",
      "Ich weiß, dass Sie Deutsch lernen",
    ]);
    expect(generateGermanRegisterAlternatives("Ich danke dir")).toEqual([
      "Ich danke euch",
      "Ich danke Ihnen",
    ]);
    expect(generateGermanRegisterAlternatives("Das ist dein Buch")).toEqual([
      "Das ist euer Buch",
      "Das ist Ihr Buch",
    ]);
    expect(generateGermanRegisterAlternatives("Wo ist deine Tasche")).toEqual([
      "Wo ist eure Tasche",
      "Wo ist Ihre Tasche",
    ]);
    expect(generateGermanRegisterAlternatives("Könnten Sie mir helfen")).toEqual([
      "Könntest du mir helfen",
      "Könntet ihr mir helfen",
    ]);
  });

  it("accepts du / ihr / Sie equivalents on actual unspecified-'you' lesson exercises", () => {
    const l1302 = lesson1302.exercises.find((e) => e.id === "l1302_e5")!;
    expect(gradeExerciseAttempt(l1302, ["Wisst ihr wo der Kaffee ist"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(l1302, ["Wissen Sie wo der Kaffee ist"], deOptions).result.accuracy).toBe("exact");

    const l6 = lesson6.exercises.find((e) => e.id === "l6_e5")!;
    expect(gradeExerciseAttempt(l6, ["Was macht ihr in der Küche"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(l6, ["Was machen Sie in der Küche"], deOptions).result.accuracy).toBe("exact");

    const l13 = lesson13.exercises.find((e) => e.id === "l13_e3")!;
    expect(gradeExerciseAttempt(l13, ["Kommt ihr morgen"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(l13, ["Kommen Sie morgen"], deOptions).result.accuracy).toBe("exact");

    const l3 = lesson3.exercises.find((e) => e.id === "l3_e5")!;
    expect(gradeExerciseAttempt(l3, ["Ich hoffe ihr habt Lust"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(l3, ["Ich hoffe Sie haben Lust"], deOptions).result.accuracy).toBe("exact");

    const l4 = lesson4.exercises.find((e) => e.id === "l4_e5")!;
    expect(gradeExerciseAttempt(l4, ["Ich denke an euch"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(l4, ["Ich denke an Sie"], deOptions).result.accuracy).toBe("exact");

    const l1903 = lesson1903.exercises.find((e) => e.id === "l1903_e5")!;
    expect(gradeExerciseAttempt(l1903, ["Ich brachte Brot und dachte an euch"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(l1903, ["Ich brachte Brot und dachte an Sie"], deOptions).result.accuracy).toBe("exact");

    const l2902 = lesson2902.exercises.find((e) => e.id === "l2902_e5")!;
    expect(gradeExerciseAttempt(l2902, ["Wie geht's Danke gut und euch"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(l2902, ["Wie geht's Danke gut und Ihnen"], deOptions).result.accuracy).toBe("exact");
  });

  it("rejects mismatched verb conjugations even when register equivalence is enabled", () => {
    const item = makeExercise({
      prompt: "Translate: 'Do you know where the coffee is?'",
      target_answer: "Weißt du wo der Kaffee ist",
    });
    expect(gradeExerciseAttempt(item, ["Weißt Sie wo der Kaffee ist"], deOptions).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(item, ["Wissen du wo der Kaffee ist"], deOptions).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(item, ["Weißt ihr wo der Kaffee ist"], deOptions).result.accuracy).toBe("incorrect");

    const seinItem = makeExercise({
      prompt: "Translate: 'Are you ready?'",
      target_answer: "Bist du bereit",
    });
    expect(gradeExerciseAttempt(seinItem, ["Sind du bereit"], deOptions).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(seinItem, ["Seid Sie bereit"], deOptions).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(seinItem, ["Bist ihr bereit"], deOptions).result.accuracy).toBe("incorrect");
  });

  it("keeps explicit formal, informal, plural, and audio-dictation prompts strict", () => {
    // Explicit formal in real lesson l5011_e5
    const l5011 = lesson5011.exercises.find((e) => e.id === "l5011_e5")!;
    expect(gradeExerciseAttempt(l5011, ["Ich danke Ihnen"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(l5011, ["Ich danke dir"], deOptions).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(l5011, ["Ich danke euch"], deOptions).result.accuracy).toBe("incorrect");

    // Explicit informal prompt
    const informalItem = makeExercise({
      prompt: "Ask (informal): Are you coming tomorrow?",
      target_answer: "Kommst du morgen",
    });
    expect(gradeExerciseAttempt(informalItem, ["Kommst du morgen"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(informalItem, ["Kommen Sie morgen"], deOptions).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(informalItem, ["Kommt ihr morgen"], deOptions).result.accuracy).toBe("incorrect");

    // Explicit plural prompt
    const pluralItem = makeExercise({
      prompt: "Ask (plural): Are you coming tomorrow?",
      target_answer: "Kommt ihr morgen",
    });
    expect(gradeExerciseAttempt(pluralItem, ["Kommt ihr morgen"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(pluralItem, ["Kommst du morgen"], deOptions).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(pluralItem, ["Kommen Sie morgen"], deOptions).result.accuracy).toBe("incorrect");

    // Audio dictation without English "you" stays strict to spoken German
    const dictation = lesson5072.exercises.find((e) => e.id === "l5072_e5")!;
    expect(gradeExerciseAttempt(dictation, ["Kannst du das bitte buchstabieren"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(dictation, ["Können Sie das bitte buchstabieren"], deOptions).result.accuracy).toBe("incorrect");
  });

  it("composes register equivalence with V2 time-adverb fronting while still rejecting V3", () => {
    const item = makeExercise({
      prompt: "Translate: 'You are coming tomorrow.'",
      target_answer: "Du kommst morgen",
    });
    const expanded = expandGermanTargets(["Du kommst morgen"], { allowV2: true, allowRegister: true });
    expect(expanded).toEqual(
      expect.arrayContaining([
        "Du kommst morgen",
        "Morgen kommst du",
        "Ihr kommt morgen",
        "Morgen kommt ihr",
        "Sie kommen morgen",
        "Morgen kommen Sie",
      ]),
    );
    for (const valid of [
      "Du kommst morgen",
      "Morgen kommst du",
      "Ihr kommt morgen",
      "Morgen kommt ihr",
      "Sie kommen morgen",
      "Morgen kommen Sie",
    ]) {
      expect(gradeExerciseAttempt(item, [valid], deOptions).result.accuracy).toBe("exact");
    }
    expect(gradeExerciseAttempt(item, ["Morgen du kommst"], deOptions).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(item, ["Morgen Sie kommen"], deOptions).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(item, ["Sie kommst morgen"], deOptions).result.accuracy).toBe("incorrect");
  });
});

describe("German alternatives safety & negative cases", () => {
  it("maps coreferent reflexives cleanly and never accepts mismatched reflexives", () => {
    const fromDu = generateGermanRegisterAlternatives("Freust du dich auf das Wochenende?");
    expect(fromDu).toContain("Freuen Sie sich auf das Wochenende?");
    expect(fromDu).toContain("Freut ihr euch auf das Wochenende?");
    expect(fromDu).not.toContain("Freuen Sie Sie auf das Wochenende?");

    const fromSie = generateGermanRegisterAlternatives("Freuen Sie sich auf das Wochenende?");
    expect(fromSie).toContain("Freust du dich auf das Wochenende?");
    expect(fromSie).toContain("Freut ihr euch auf das Wochenende?");
    expect(fromSie).not.toContain("Freust du sich auf das Wochenende?");

    const item = makeExercise({
      prompt: "Translate: 'Are you looking forward to the weekend?'",
      target_answer: "Freuen Sie sich auf das Wochenende?",
    });
    expect(gradeExerciseAttempt(item, ["Freust du dich auf das Wochenende?"], deOptions).result.accuracy).toBe("exact");
    expect(gradeExerciseAttempt(item, ["Freust du sich auf das Wochenende?"], deOptions).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(item, ["Du freust sich auf das Wochenende"], deOptions).result.accuracy).toBe("incorrect");
  });

  it("handles -s-stem verbs, added irregulars, and separable prefixes without inventing broken forms", () => {
    const reist = generateGermanRegisterAlternatives("Du reist morgen nach Wien");
    expect(reist).toContain("Ihr reist morgen nach Wien");
    expect(reist).toContain("Sie reisen morgen nach Wien");
    expect(reist).not.toContain("Ihr reit morgen nach Wien");
    expect(reist).not.toContain("Sie reien morgen nach Wien");

    expect(generateGermanRegisterAlternatives("Du passt gut auf")).toContain("Sie passen gut auf");
    expect(generateGermanRegisterAlternatives("Du löst das Problem")).toContain("Sie lösen das Problem");
    expect(generateGermanRegisterAlternatives("Du vermisst mich")).toContain("Sie vermissen mich");
    expect(generateGermanRegisterAlternatives("Du beweist es")).toContain("Sie beweisen es");

    expect(generateGermanRegisterAlternatives("Du fängst den Ball")).toContain("Sie fangen den Ball");
    expect(generateGermanRegisterAlternatives("Du lädst Freunde ein")).toContain("Sie laden Freunde ein");
    expect(generateGermanRegisterAlternatives("Du schlägst das vor")).toContain("Sie schlagen das vor");
    expect(generateGermanRegisterAlternatives("Du wächst schnell")).toContain("Sie wachsen schnell");
    expect(generateGermanRegisterAlternatives("Du trittst ein")).toContain("Sie treten ein");
    expect(generateGermanRegisterAlternatives("Du rätst richtig")).toContain("Sie raten richtig");
    expect(generateGermanRegisterAlternatives("Ich weiß, dass du anfängst")).toContain("Ich weiß, dass Sie anfangen");
  });

  it("maps formal possessive Ihr without turning it into du or copying its capital mid-sentence", () => {
    const alts = generateGermanRegisterAlternatives("Wie ist Ihr Name?");
    expect(alts).toContain("Wie ist dein Name?");
    expect(alts).toContain("Wie ist euer Name?");
    expect(alts).not.toContain("Wie ist du Name?");
    expect(alts).not.toContain("Wie ist Dein Name?");
    expect(alts).not.toContain("Wie ist Euer Name?");
  });

  it("skips Sie-imperatives, expletive es, and sentence-initial ambiguous Sie", () => {
    expect(generateGermanRegisterAlternatives("Geben Sie mir bitte Ihren Pass")).toEqual([]);
    expect(generateGermanRegisterAlternatives("Seien Sie vorsichtig")).toEqual([]);
    expect(generateGermanV2Alternatives("Es kommen heute viele Gäste")).toEqual([]);
    expect(generateGermanRegisterAlternatives("Sie warten auf den Zug")).toEqual([]);
    expect(generateGermanRegisterAlternatives("Sie freuen sich auf das Wochenende")).toEqual([]);
  });

  it("never grants typo or umlaut 'almost' tolerance on generated alternatives and never quotes them in warningNote", () => {
    const item = makeExercise({
      prompt: "Translate: 'You are traveling to Vienna tomorrow.'",
      target_answer: "Du reist morgen nach Wien",
    });
    // Exact match on generated alternative succeeds
    expect(gradeExerciseAttempt(item, ["Sie reisen morgen nach Wien"], deOptions).result.accuracy).toBe("exact");
    // Typo against generated alternative must NOT be accepted as 'almost'
    const typoOnGenerated = gradeExerciseAttempt(item, ["Sie reissen morgen nach Wien"], deOptions);
    expect(typoOnGenerated.result.accuracy).toBe("incorrect");
    // Case-only mismatch on generated alternative must not quote the generated string in warningNote
    const caseOnGenerated = gradeExerciseAttempt(item, ["sie reisen morgen nach wien"], deOptions);
    expect(caseOnGenerated.result.accuracy).toBe("almost");
    expect(caseOnGenerated.result.warningNote ?? "").not.toContain("Sie reisen morgen nach Wien");
  });
});
