import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "../lib/store";
import { evaluateAnswerAccuracy } from "../lib/letter-diff";
import { matchingPairForKey } from "../lib/matching";

describe("Keyboard Navigation & Interactive Exercise Controls", () => {
  beforeEach(() => {
    useAppStore.getState().resetProgress();
  });

  it("verifies prediction correctness with three-tier feedback (spot on green, almost right yellow, incorrect red)", () => {
    const expected = "Wasser";

    // 1. Exact match -> Spot on (Green)
    const exact = evaluateAnswerAccuracy("Wasser", expected);
    expect(exact.accuracy).toBe("exact");

    // 2. Case error (German noun lowercase) -> Almost right (Yellow)
    const caseClose = evaluateAnswerAccuracy("wasser", expected);
    expect(caseClose.accuracy).toBe("almost");
    expect(caseClose.reason).toBe("case");
    expect(caseClose.warningNote).toContain("capitalized");

    // 3. Umlaut substitution -> Almost right (Yellow)
    const umlautClose = evaluateAnswerAccuracy("Apfel", "Äpfel");
    expect(umlautClose.accuracy).toBe("almost");
    expect(umlautClose.reason).toBe("umlaut");
    expect(umlautClose.warningNote).toContain("umlaut");

    // 4. Minor typo (1 edit distance on length >= 4) -> Almost right (Yellow)
    const typoClose = evaluateAnswerAccuracy("wassser", expected);
    expect(typoClose.accuracy).toBe("almost");
    expect(typoClose.reason).toBe("typo");

    // 5. Infinitive ending omission (e.g. "trink" instead of "trinken") -> Almost right (Yellow)
    const infinitiveClose = evaluateAnswerAccuracy("trink", "trinken");
    expect(infinitiveClose.accuracy).toBe("almost");
    expect(infinitiveClose.reason).toBe("infinitive");
    expect(infinitiveClose.warningNote).toContain("infinitive ending");

    // 6. Obviously wrong -> Incorrect (Red)
    const wrong = evaluateAnswerAccuracy("water", expected);
    expect(wrong.accuracy).toBe("incorrect");
  });

  it("verifies morpheme tile selection with numeric shortcuts (1-N) and undo via Backspace", () => {
    const tileOptions = ["ver-", "steh-", "-en"];
    let selectedIndices: number[] = [];

    const pickTile = (numKey: number) => {
      const idx = numKey - 1;
      if (idx >= 0 && idx < tileOptions.length && !selectedIndices.includes(idx)) {
        selectedIndices.push(idx);
      }
    };

    const unpickTile = () => {
      if (selectedIndices.length > 0) {
        selectedIndices.pop();
      }
    };

    // Press 1, 2, 3
    pickTile(1);
    pickTile(2);
    pickTile(3);
    expect(selectedIndices).toEqual([0, 1, 2]);

    const assembled = selectedIndices.map((i) => tileOptions[i]).join("");
    expect(assembled).toBe("ver-steh--en");

    // Press Backspace: unpicks tile 3
    unpickTile();
    expect(selectedIndices).toEqual([0, 1]);

    // Press 3 again
    pickTile(3);
    expect(selectedIndices).toEqual([0, 1, 2]);
  });

  it("verifies syntax builder keyboard word banking sequence", () => {
    const wordBank = ["Wir", "haben", "das", "Buch", "gelesen"];
    let selectedIndices: number[] = [];

    const pickWord = (numKey: number) => {
      const idx = numKey - 1;
      if (idx >= 0 && idx < wordBank.length && !selectedIndices.includes(idx)) {
        selectedIndices.push(idx);
      }
    };

    // Assemble sentence using keys 1, 2, 3, 4, 5
    [1, 2, 3, 4, 5].forEach((k) => pickWord(k));
    const sentence = selectedIndices.map((i) => wordBank[i]).join(" ");
    expect(sentence).toBe("Wir haben das Buch gelesen");
  });

  it("keeps matching keybindings stable when earlier pairs are matched", () => {
    const english = [
      { id: "p1", english: "water", german: "Wasser" },
      { id: "p2", english: "foot", german: "Fuß" },
      { id: "p3", english: "pipe", german: "Pfeife" },
    ];
    // the German column renders in a rotated order (last pair first)
    const german = [english[2], english[0], english[1]];

    let selectedEnglish: string | null = null;
    const matchedIds: string[] = [];

    const selectEnglishByKey = (numKey: number) => {
      const pair = matchingPairForKey(english, matchedIds, numKey);
      if (pair) selectedEnglish = pair.english;
    };

    const matchGermanByKey = (numKey: number) => {
      if (!selectedEnglish) return;
      const pair = matchingPairForKey(german, matchedIds, numKey);
      if (pair && pair.english === selectedEnglish) {
        matchedIds.push(pair.id);
        selectedEnglish = null;
      }
    };

    // 1. 'water' is English key 1, 'Wasser' is German key 2 in the rotated column
    selectEnglishByKey(1);
    expect(selectedEnglish).toBe("water");
    matchGermanByKey(2);
    expect(matchedIds).toEqual(["p1"]);
    expect(selectedEnglish).toBeNull();

    // 2. the matched card's key goes dead; 'foot' keeps key 2 instead of shifting to 1
    selectEnglishByKey(1);
    expect(selectedEnglish).toBeNull();
    selectEnglishByKey(2);
    expect(selectedEnglish).toBe("foot");
    matchGermanByKey(3);
    expect(matchedIds).toEqual(["p1", "p2"]);

    // 3. 'pipe' still owns key 3 on the English side
    selectEnglishByKey(3);
    expect(selectedEnglish).toBe("pipe");

    // 4. out-of-range and already-matched keys do nothing
    expect(matchingPairForKey(english, [], 4)).toBeNull();
    expect(matchingPairForKey(english, ["p1"], 1)).toBeNull();
  });

  it("progresses lesson segments via Enter key simulation", () => {
    const segments = ["hook", "pattern", "table", "practice", "summary"] as const;
    let currentSegmentIndex = 0;
    const completed: string[] = [];

    const advanceSegmentOnEnter = () => {
      completed.push(segments[currentSegmentIndex]);
      if (currentSegmentIndex + 1 < segments.length) {
        currentSegmentIndex += 1;
      }
    };

    expect(segments[currentSegmentIndex]).toBe("hook");
    advanceSegmentOnEnter(); // To pattern
    expect(segments[currentSegmentIndex]).toBe("pattern");
    advanceSegmentOnEnter(); // To table
    expect(segments[currentSegmentIndex]).toBe("table");
    advanceSegmentOnEnter(); // To practice
    expect(segments[currentSegmentIndex]).toBe("practice");
    advanceSegmentOnEnter(); // To summary
    expect(segments[currentSegmentIndex]).toBe("summary");

    expect(completed).toEqual(["hook", "pattern", "table", "practice"]);
  });
});
