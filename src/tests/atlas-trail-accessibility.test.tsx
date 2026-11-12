import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getCurriculum } from "../data/curriculum-registry";
import { spineNodeIds } from "../data/curriculum-core";
import { buildTrailLayout, getTrailState, type TrailData } from "../lib/trail-map";
import { GenderBadge } from "../components/common/GenderBadge";
import { AtlasVocabularyTable } from "../components/atlas/AtlasVocabularyTable";
import type { WordEntity } from "../lib/types";

const trailFor = (language: string): TrailData => {
  const curriculum = getCurriculum(language);
  return { topics: curriculum.topics, branches: curriculum.trailBranches, gates: curriculum.trailGates, totalTopics: curriculum.totalTopics };
};

describe("Required trail spine access", () => {
  it.each(["de", "fr", "es", "nl"])("never unlocks topic 5 from a side lesson or future completion in %s", (language) => {
    const data = trailFor(language);
    const fourth = data.topics[3];
    const fifth = data.topics[4];
    const completed = [
      ...spineNodeIds(data.topics).filter((id) => id !== fourth.core.id && id !== fifth.core.id),
      ...data.topics.flatMap((topic) => topic.sprigs.map((lesson) => lesson.id)),
      ...data.branches.flatMap((branch) => branch.lessons.map((lesson) => lesson.id)),
    ];
    const state = getTrailState(completed, {}, undefined, data, data.gates.map((gate) => gate.id));
    expect(state.nodes.get(fifth.core.id)?.status).toBe("locked");
    expect(state.nodes.get(fourth.core.id)?.status).toBe("available");
    expect(state.gates.get(data.gates[0].id)?.open).toBe(false);
  });

  it.each(["de", "fr", "es", "nl"])("keeps required stories sequential and optional lessons skippable in %s", (language) => {
    const data = trailFor(language);
    const spine = spineNodeIds(data.topics);
    for (let index = 0; index < spine.length; index++) {
      const prefix = spine.slice(0, index);
      const state = getTrailState(prefix, {}, undefined, { ...data, gates: [] });
      expect(state.nodes.get(spine[index])?.status, `spine node ${spine[index]}`).toBe("available");
      if (index + 1 < spine.length) expect(state.nodes.get(spine[index + 1])?.status).toBe("locked");
    }
  });

  it("does not unlock a core backward from its sprig or a later core", () => {
    const data = trailFor("de");
    for (const completed of [[1, 2, 3, 501], [1, 2, 3, 6], [1, 3, 4]]) {
      expect(getTrailState(completed, {}, undefined, data).nodes.get(5)?.status).toBe("locked");
    }
  });

  it("uses curriculum order rather than German numeric ids and attributes branch stars to their topic", () => {
    const shell = (id: number) => ({ id, title: `Lesson ${id}`, plan: "Practice", authored: true });
    const data: TrailData = {
      topics: [
        { id: 10, title: "First", blurb: "First", core: shell(100), stories: [shell(150)], sprigs: [shell(101)] },
        { id: 20, title: "Second", blurb: "Second", core: shell(200), sprigs: [] },
      ],
      branches: [{ id: 5000, attach: 101, title: "Extra", blurb: "Extra", lessons: [shell(5001), shell(5002)] }],
      gates: [{ id: 1, afterTopic: 10, requiredStars: 4, title: "Checkpoint", why: "Review" }],
      totalTopics: 2,
    };
    const layout = buildTrailLayout(640, data);
    expect(layout.nodes.find((node) => node.id === 5001)?.topicId).toBe(10);
    expect(layout.gates).toHaveLength(1);
    expect(getTrailState([], {}, undefined, data).nodes.get(100)?.status).toBe("available");
    expect(getTrailState([101, 5002], {}, undefined, data).nodes.get(100)?.status).toBe("available");
    expect(getTrailState([101, 5002], {}, undefined, data).nodes.get(5001)?.status).toBe("locked");
    const completed = [100, 101, 150, 5001];
    const closed = getTrailState(completed, {}, undefined, data);
    expect(closed.gates.get(1)).toMatchObject({ stars: 4, open: false });
    expect(closed.nodes.get(200)?.status).toBe("locked");
    const open = getTrailState(completed, {}, undefined, data, [1]);
    expect(open.nodes.get(200)?.status).toBe("available");
    expect(open.litEdges.has("150-200")).toBe(true);
  });
});

describe("Atlas textual alternatives", () => {
  it.each([["der", "Masculine"], ["die", "Feminine"], ["das", "Neuter"], ["de", "Common"], ["het", "Neuter"]])("labels %s without relying on color", (article, label) => {
    const html = renderToStaticMarkup(<GenderBadge gender={article} />);
    expect(html).toContain(`aria-label="${article}: ${label} grammatical gender"`);
    expect(html).toContain(`<span>${article}</span>`);
    expect(html).toContain('aria-hidden="true"');
  });

  it("provides semantic English, German, shift and authored example columns", () => {
    const word: WordEntity = { id: "wasser", target_word: "Wasser", english_cognate: "water", english_meaning: "water", gender: "das", ipa: "", sound_shift_ids: ["t_to_ss"], shift_rule: "t → ss", context_phrase: "Ich trinke Wasser.", context_translation: "I drink water.", etymology_derivation: "" };
    const html = renderToStaticMarkup(<AtlasVocabularyTable words={[word]} caption="Water family" />);
    for (const text of ["English", "German", "Shift", "Example sentence", word.target_word, word.context_phrase, word.context_translation]) expect(html).toContain(text);
    expect(html).toContain('scope="col"');
    expect(html).toContain('scope="row"');
    expect(html).toContain('lang="de"');
    expect(html).toContain('<caption');
  });
});
