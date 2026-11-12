import { describe, it, expect } from "vitest";
import { alignShiftPair, type TextSegment } from "../lib/shift-annotator";

function marked(segments: TextSegment[]): string {
  return segments.map(({ text, isChanged }) => isChanged ? `[${text}]` : text).join("");
}

// Brackets specify the complete visible highlight, not just a matching substring.
const GOLDENS = [
  ["hope", "hoffen", "ho[p]e", "ho[ff]en"],
  ["water", "Wasser", "wa[t]er", "Wa[ss]er"],
  ["think", "denken", "[th]ink", "[d]enken"],
  ["make", "machen", "ma[k]e", "ma[ch]en"],
  ["apple", "Apfel", "a[pp]le", "A[pf]el"],
  ["ship", "Schiff", "shi[p]", "Schi[ff]"],
  ["heart", "Herz", "hear[t]", "Her[z]"],
  ["foot", "Fuß", "foo[t]", "Fu[ß]"],
  ["seven", "sieben", "se[v]en", "sie[b]en"],
  ["give", "geben", "gi[v]e", "ge[b]en"],
  ["half", "halb", "hal[f]", "hal[b]"],
  ["say", "sagen", "sa[y]", "sa[g]en"],
  ["night", "Nacht", "ni[gh]t", "Na[ch]t"],
  ["light", "Licht", "li[gh]t", "Li[ch]t"],
  ["daughter", "Tochter", "[d]au[gh]ter", "[T]o[ch]ter"],
  ["deep", "tief", "[d]ee[p]", "[t]ie[f]"],
  ["yellow", "gelb", "[y]ellow", "[g]elb"],
  ["pepper", "Pfeffer", "[p]e[pp]er", "[Pf]e[ff]er"],
  ["nation", "nación", "na[tion]", "na[ción]"],
  ["liberty", "liberté", "liber[ty]", "liber[té]"],
] as const;

describe("visible shift alignment", () => {
  it.each(GOLDENS)("aligns %s → %s", (english, target, enHighlight, targetHighlight) => {
    const pair = alignShiftPair(english, target);
    expect(marked(pair.englishSegments)).toBe(enHighlight);
    expect(marked(pair.germanSegments)).toBe(targetHighlight);
    expect(pair.englishSegments.map((segment) => segment.text).join("")).toBe(english);
    expect(pair.germanSegments.map((segment) => segment.text).join("")).toBe(target);
  });

  it.each([["arm", "Arm"], ["Bitter", "bitter"], ["cat", "Hund"], ["", ""], ["", "Wasser"]])(
    "does not invent a correspondence in %s → %s", (english, target) => {
      const pair = alignShiftPair(english, target);
      expect(pair.englishSegments.some((segment) => segment.isChanged)).toBe(false);
      expect(pair.germanSegments.some((segment) => segment.isChanged)).toBe(false);
    },
  );

  it("preserves authored family labels without moving the v_to_b or y_gh_to_g_ch highlights", () => {
    const bilabial = alignShiftPair("seven", "sieben", "V / F → B");
    expect(bilabial.shiftRule).toBe("V / F → B");
    expect(marked(bilabial.englishSegments)).toBe("se[v]en");
    expect(marked(bilabial.germanSegments)).toBe("sie[b]en");
    const velar = alignShiftPair("night", "Nacht", "Y / GH → G / CH");
    expect(velar.shiftRule).toBe("Y / GH → G / CH");
    expect(marked(velar.englishSegments)).toBe("ni[gh]t");
    expect(marked(velar.germanSegments)).toBe("Na[ch]t");
  });

  it("names both visible correspondences in a double shift", () => {
    expect(alignShiftPair("daughter", "Tochter").shiftRule).toBe("D → T · GH → CH");
  });
});
