import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { useAppStore } from "../lib/store";
import { isMastered, gradeCard } from "../lib/srs";

class LocalStorageMock {
  private store: Record<string, string> = {};
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

function setCardVersion(wordId: string, version: string) {
  useAppStore.setState((s) => ({
    ...s,
    progressVersions: {
      ...s.progressVersions,
      srsCards: { ...s.progressVersions.srsCards, [wordId]: version },
    },
  }));
}

describe("flagGuessed — honest, scoped, mastery-consistent", () => {
  beforeAll(() => {
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = new LocalStorageMock();
    (globalThis as any).document = { cookie: "" };
  });
  afterAll(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).localStorage;
    delete (globalThis as any).document;
  });
  beforeEach(() => {
    (globalThis as any).localStorage.clear();
    (globalThis as any).document.cookie = "";
    useAppStore.getState().resetProgress();
  });

  it("records the guess and reconciles mastery for a word that had no entry", () => {
    useAppStore.getState().flagGuessed(["haus"]);
    const card = useAppStore.getState().srsCards["haus"];
    expect(card).toBeDefined();
    expect(card.guessed).toBe(1);
    expect(card.repetitions).toBe(1); // a Hard re-grade is a successful review
    // Before the fix, flagGuessed never touched wordMastery, leaving it desynced.
    expect(useAppStore.getState().wordMastery["haus"]).toBe("encountered");
  });

  it("promotes mastery when the guess re-grade crosses the mastery threshold", () => {
    const store = useAppStore.getState();
    store.recordReview("milch", 4);
    store.recordReview("milch", 4);
    expect(useAppStore.getState().wordMastery["milch"]).toBe("encountered");
    expect(isMastered(useAppStore.getState().srsCards["milch"])).toBe(false);

    store.flagGuessed(["milch"]);
    expect(isMastered(useAppStore.getState().srsCards["milch"])).toBe(true);
    expect(useAppStore.getState().wordMastery["milch"]).toBe("mastered");
    expect(useAppStore.getState().srsCards["milch"].guessed).toBe(1);
  });

  it("increments the guess counter on repeat flags", () => {
    const store = useAppStore.getState();
    store.flagGuessed(["haus"]);
    store.flagGuessed(["haus"]);
    expect(useAppStore.getState().srsCards["haus"].guessed).toBe(2);
  });

  it("does nothing for an empty list", () => {
    useAppStore.getState().flagGuessed([]);
    expect(Object.keys(useAppStore.getState().srsCards)).toHaveLength(0);
  });
});

describe("restoreSrsCard — undo must not clobber a newer cross-tab grade", () => {
  beforeAll(() => {
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = new LocalStorageMock();
    (globalThis as any).document = { cookie: "" };
  });
  afterAll(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).localStorage;
    delete (globalThis as any).document;
  });
  beforeEach(() => {
    (globalThis as any).localStorage.clear();
    (globalThis as any).document.cookie = "";
    useAppStore.getState().resetProgress();
  });

  it("restores while the live card still carries the snapshot's version", () => {
    const store = useAppStore.getState();
    store.recordReview("winter", 4);
    const preGrade = { ...useAppStore.getState().srsCards["winter"] };
    store.recordReview("winter", 5);
    setCardVersion("winter", "v1");

    store.restoreSrsCard("winter", { card: preGrade, mastery: null, version: "v1" });
    expect(useAppStore.getState().srsCards["winter"]).toEqual(preGrade);
  });

  it("refuses to restore when another tab has moved the card on", () => {
    const store = useAppStore.getState();
    store.recordReview("winter", 4);
    const preGrade = { ...useAppStore.getState().srsCards["winter"] };
    store.recordReview("winter", 5);
    setCardVersion("winter", "v1");

    // A newer cross-tab grade lands: different card, newer version.
    const newer = gradeCard(useAppStore.getState().srsCards["winter"], 5);
    useAppStore.setState((s) => ({ ...s, srsCards: { ...s.srsCards, winter: newer } }));
    setCardVersion("winter", "v2");

    store.restoreSrsCard("winter", { card: preGrade, mastery: null, version: "v1" });
    expect(useAppStore.getState().srsCards["winter"]).toEqual(newer);
  });

  it("legacy snapshots without a version keep the existence-only behaviour", () => {
    const store = useAppStore.getState();
    store.recordReview("winter", 4);
    const preGrade = { ...useAppStore.getState().srsCards["winter"] };
    store.recordReview("winter", 5);

    store.restoreSrsCard("winter", { card: preGrade, mastery: null });
    expect(useAppStore.getState().srsCards["winter"]).toEqual(preGrade);
  });
});