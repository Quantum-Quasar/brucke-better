import { chromium, type Browser, type BrowserContext, type Page } from "@playwright/test";
import path from "path";
import fs from "fs";
import { resolveSiteUrl } from "../src/lib/site-url";

const BASE_URL = (() => {
  try {
    return resolveSiteUrl({
      siteUrl: process.env.DEMO_BASE_URL || process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
    }).origin;
  } catch (cause) {
    throw new Error("DEMO_BASE_URL (or PLAYWRIGHT_BASE_URL) must be an HTTP(S) origin without credentials, a path, query or fragment.", { cause });
  }
})();
const CHROMIUM_PATH = process.env.CHROMIUM_PATH;
const OUT_DIR = path.resolve(process.env.DEMO_OUTPUT_DIR || "./demo-images");
const STORAGE_KEY = "brucke_app_state_v1";

if (CHROMIUM_PATH && !fs.existsSync(CHROMIUM_PATH)) {
  throw new Error(`CHROMIUM_PATH does not exist: ${CHROMIUM_PATH}. Unset it to use Playwright's bundled Chromium (bunx playwright install chromium).`);
}
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Rich realistic state to populate UI
const BASE_SEEDED_STATE = {
  activeLanguageId: "de",
  hasCompletedOnboarding: true,
  isOnboardingOpen: false,
  hasSeenGenderIntro: true,
  theme: "alduin",
  font: "Lexend_Deca",
  completedLessons: [1, 2, 3, 101, 102, 103, 201, 202, 301, 302],
  currentLessonId: 4,
  lessonStars: {
    1: "purple",
    2: "gold",
    3: "purple",
    101: "gold",
    102: "purple",
    103: "gold",
    201: "gold",
    202: "purple",
    301: "purple",
    302: "gold",
  },
  wordMastery: {
    wasser: "mastered",
    denken: "mastered",
    brot: "mastered",
    glas: "mastered",
    trinken: "mastered",
    apfel: "learning",
    schiff: "learning",
    hoffen: "learning",
    bruder: "learning",
    danken: "encountered",
    zwei: "encountered",
    besser: "encountered",
    machen: "encountered",
    buch: "encountered",
    gift: "learning",
  },
  srsCards: {
    wasser: {
      word_id: "wasser",
      interval: 6,
      repetitions: 2,
      ease_factor: 2.5,
      due_date: "2026-10-12",
      lapses: 0,
      last_reviewed: "2026-10-10",
    },
    denken: {
      word_id: "denken",
      interval: 1,
      repetitions: 1,
      ease_factor: 2.5,
      due_date: "2026-10-12",
      lapses: 0,
      last_reviewed: "2026-10-11",
    },
    schiff: {
      word_id: "schiff",
      interval: 1,
      repetitions: 1,
      ease_factor: 2.5,
      due_date: "2026-10-12",
      lapses: 0,
      last_reviewed: "2026-10-11",
    },
    hoffen: {
      word_id: "hoffen",
      interval: 1,
      repetitions: 1,
      ease_factor: 2.4,
      due_date: "2026-10-12",
      lapses: 1,
      last_reviewed: "2026-10-11",
    },
    apfel: {
      word_id: "apfel",
      interval: 1,
      repetitions: 1,
      ease_factor: 2.5,
      due_date: "2026-10-12",
      lapses: 0,
      last_reviewed: "2026-10-11",
    },
    gift: {
      word_id: "gift",
      interval: 1,
      repetitions: 1,
      ease_factor: 2.2,
      due_date: "2026-10-12",
      lapses: 1,
      last_reviewed: "2026-10-11",
    },
  },
  weeklyActivity: [true, true, true, false, true, true, false],
  lessonProgress: {},
  settings: {
    quickRestart: "off",
    lazyMode: true,
    capitalizationTolerance: true,
    showPostureCues: true,
    stopOnError: "off",
    confidenceMode: false,
    showCharBar: "always",
    soundPack: "cherry_black",
    volume: 0.5,
  },
  progressByLanguage: {
    de: {
      completedLessons: [1, 2, 3, 101, 102, 103, 201, 202, 301, 302],
      currentLessonId: 4,
      lessonProgress: {},
      lessonStars: {
        1: "purple",
        2: "gold",
        3: "purple",
        101: "gold",
        102: "purple",
        103: "gold",
        201: "gold",
        202: "purple",
        301: "purple",
        302: "gold",
      },
      wordMastery: {
        wasser: "mastered",
        denken: "mastered",
        brot: "mastered",
        glas: "mastered",
        trinken: "mastered",
        apfel: "learning",
        schiff: "learning",
        hoffen: "learning",
        bruder: "learning",
        danken: "encountered",
        zwei: "encountered",
        besser: "encountered",
        machen: "encountered",
        buch: "encountered",
        gift: "learning",
      },
      srsCards: {},
      weeklyActivity: [true, true, true, false, true, true, false],
    },
  },
};

type TaskFn = (browser: Browser, workerId: number) => Promise<void>;

async function createPageWithState(
  browser: Browser,
  stateOverrides: Record<string, any> = {},
  viewport = { width: 1440, height: 900 }
): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
  });

  const mergedState: any = { ...BASE_SEEDED_STATE, ...stateOverrides };
  if (stateOverrides.lessonProgress) {
    mergedState.progressByLanguage = {
      ...BASE_SEEDED_STATE.progressByLanguage,
      de: {
        ...BASE_SEEDED_STATE.progressByLanguage.de,
        lessonProgress: stateOverrides.lessonProgress,
      },
    };
  }

  await context.addInitScript(
    ([key, state]) => {
      window.localStorage.setItem(key, JSON.stringify(state));
    },
    [STORAGE_KEY, mergedState]
  );

  const page = await context.newPage();
  return { context, page };
}

// -------------------------------------------------------------
// WORKER 1: Trail Map, Progression, Insights & Themes (1-9)
// -------------------------------------------------------------
async function runWorker1(browser: Browser) {
  console.log("[Worker 1] Starting Trail Map & Theme captures...");

  // 01: Trail Map Overview
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, "01_trail_map_overview.png") });
    await context.close();
    console.log("  ✓ 01_trail_map_overview.png");
  }

  // 02: Lesson Node Drawer Open
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const node1 = page.getByRole("button", { name: /The Germanic Core/i }).first();
    if (await node1.isVisible()) {
      await node1.click();
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "02_trail_lesson_node_drawer.png") });
    await context.close();
    console.log("  ✓ 02_trail_lesson_node_drawer.png");
  }

  // 03: Star Gate Drawer
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const gateBtn = page.getByRole("button", { name: /Gate|Shift Gate/i }).first();
    if (await gateBtn.isVisible()) {
      await gateBtn.click();
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "03_trail_star_gate_drawer.png") });
    await context.close();
    console.log("  ✓ 03_trail_star_gate_drawer.png");
  }

  // 04: Daily Insight Card
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT_DIR, "04_trail_daily_insight_card.png") });
    await context.close();
    console.log("  ✓ 04_trail_daily_insight_card.png");
  }

  // 05: Theme Nord
  {
    const { context, page } = await createPageWithState(browser, { theme: "nord" });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "05_trail_map_theme_nord.png") });
    await context.close();
    console.log("  ✓ 05_trail_map_theme_nord.png");
  }

  // 06: Theme Retro (Warm Light)
  {
    const { context, page } = await createPageWithState(browser, { theme: "retro" });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "06_trail_map_theme_retro.png") });
    await context.close();
    console.log("  ✓ 06_trail_map_theme_retro.png");
  }

  // 07: Theme Serika Dark
  {
    const { context, page } = await createPageWithState(browser, { theme: "serika_dark" });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "07_trail_map_theme_serika_dark.png") });
    await context.close();
    console.log("  ✓ 07_trail_map_theme_serika_dark.png");
  }

  // 08: Trail Map Mobile
  {
    const { context, page } = await createPageWithState(browser, {}, { width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "08_trail_map_mobile.png") });
    await context.close();
    console.log("  ✓ 08_trail_map_mobile.png");
  }
}

// -------------------------------------------------------------
// WORKER 2: 5-Part Lesson Experience & Exercises (09-26)
// -------------------------------------------------------------
async function runWorker2(browser: Browser) {
  console.log("[Worker 2] Starting Lesson Experience & Drills captures...");

  // 09: Step 1 Hook
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 1: { segment: "hook", practiceIndex: 0, completedSegments: [], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/1`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "09_lesson_step1_hook.png") });
    await context.close();
    console.log("  ✓ 09_lesson_step1_hook.png");
  }

  // 10: Step 2 Pattern
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 1: { segment: "pattern", practiceIndex: 0, completedSegments: ["hook"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/1`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "10_lesson_step2_pattern.png") });
    await context.close();
    console.log("  ✓ 10_lesson_step2_pattern.png");
  }

  // 11: Step 3 Transformation Table
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 1: { segment: "table", practiceIndex: 0, completedSegments: ["hook", "pattern"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/1`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "11_lesson_step3_transformation_table.png") });
    await context.close();
    console.log("  ✓ 11_lesson_step3_transformation_table.png");
  }

  // 12: Step 4 Practice - Morpheme Tiles (Lesson 1, practiceIndex 0)
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 1: { segment: "practice", practiceIndex: 0, completedSegments: ["hook", "pattern", "table"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/1`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "12_lesson_step4_exercise_morpheme_tiles.png") });
    await context.close();
    console.log("  ✓ 12_lesson_step4_exercise_morpheme_tiles.png");
  }

  // 13: Step 4 Practice - Matching Pairs (Lesson 1, practiceIndex 1)
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 1: { segment: "practice", practiceIndex: 1, completedSegments: ["hook", "pattern", "table"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/1`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "13_lesson_step4_exercise_matching_pairs.png") });
    await context.close();
    console.log("  ✓ 13_lesson_step4_exercise_matching_pairs.png");
  }

  // 14: Step 4 Practice - Syntax Builder (Lesson 1, practiceIndex 4)
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 1: { segment: "practice", practiceIndex: 4, completedSegments: ["hook", "pattern", "table"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/1`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "14_lesson_step4_exercise_syntax_builder.png") });
    await context.close();
    console.log("  ✓ 14_lesson_step4_exercise_syntax_builder.png");
  }

  // 15: Step 4 Practice - Transcribe Production Drill (Lesson 2, practiceIndex 4)
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 2: { segment: "practice", practiceIndex: 4, completedSegments: ["hook", "pattern", "table"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/2`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "15_lesson_step4_exercise_transcribe.png") });
    await context.close();
    console.log("  ✓ 15_lesson_step4_exercise_transcribe.png");
  }

  // 16: Step 4 Practice - Literal Gloss Direct Translation (Lesson 2, practiceIndex 2)
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 2: { segment: "practice", practiceIndex: 2, completedSegments: ["hook", "pattern", "table"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/2`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "16_lesson_step4_exercise_literal_gloss.png") });
    await context.close();
    console.log("  ✓ 16_lesson_step4_exercise_literal_gloss.png");
  }

  // 17: Step 4 Practice - Dictation Listening Drill (Lesson 2, practiceIndex 3)
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 2: { segment: "practice", practiceIndex: 3, completedSegments: ["hook", "pattern", "table"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/2`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "17_lesson_step4_exercise_dictation.png") });
    await context.close();
    console.log("  ✓ 17_lesson_step4_exercise_dictation.png");
  }

  // 18: Step 4 Practice - Family Matrix Grid (Lesson 15, practiceIndex 3)
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 15: { segment: "practice", practiceIndex: 3, completedSegments: ["hook", "pattern", "table"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/15`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "18_lesson_step4_exercise_family_matrix.png") });
    await context.close();
    console.log("  ✓ 18_lesson_step4_exercise_family_matrix.png");
  }

  // 19: Step 4 Practice - Variant English (Lesson 12, practiceIndex 3)
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 12: { segment: "practice", practiceIndex: 3, completedSegments: ["hook", "pattern", "table"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/12`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "19_lesson_step4_exercise_variant_english.png") });
    await context.close();
    console.log("  ✓ 19_lesson_step4_exercise_variant_english.png");
  }

  // 20: Step 4 Practice - Detour Tangent (Lesson 4, practiceIndex 2 has interest footnote)
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 4: { segment: "practice", practiceIndex: 2, completedSegments: ["hook", "pattern", "table"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/4`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "20_lesson_step4_detour_tangent.png") });
    await context.close();
    console.log("  ✓ 20_lesson_step4_detour_tangent.png");
  }

  // 21: Exercise Feedback - Success Affirmation
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 1: { segment: "practice", practiceIndex: 0, completedSegments: ["hook", "pattern", "table"], everQueued: false } },
    });
    await page.goto(`${BASE_URL}/trail/1`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    // Use hotkeys: 1 (lern), 2 (en), then Enter to verify and reveal success feedback sheet
    await page.keyboard.press("1");
    await page.waitForTimeout(150);
    await page.keyboard.press("2");
    await page.waitForTimeout(150);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "21_lesson_feedback_success_sheet.png") });
    await context.close();
    console.log("  ✓ 21_lesson_feedback_success_sheet.png");
  }

  // 22: Step 5 Summary & Purple Star
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 1: { segment: "summary", practiceIndex: 5, completedSegments: ["hook", "pattern", "table", "practice"], everQueued: false } },
      lessonStars: { 1: "purple" },
    });
    await page.goto(`${BASE_URL}/trail/1`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "22_lesson_step5_summary_stars.png") });
    await context.close();
    console.log("  ✓ 22_lesson_step5_summary_stars.png");
  }

  // 23: Lesson Mobile View
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 1: { segment: "table", practiceIndex: 0, completedSegments: ["hook", "pattern"], everQueued: false } },
    }, { width: 390, height: 844 });
    await page.goto(`${BASE_URL}/trail/1`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "23_lesson_mobile.png") });
    await context.close();
    console.log("  ✓ 23_lesson_mobile.png");
  }
}

// -------------------------------------------------------------
// WORKER 3: Sound Shift Atlas & Grammar Panorama (24-35)
// -------------------------------------------------------------
async function runWorker3(browser: Browser) {
  console.log("[Worker 3] Starting Atlas & Grammar Panorama captures...");

  // 24: Atlas Overview Hub (9 Shift Families & Donut Rings)
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/atlas`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, "24_atlas_overview_families.png") });
    await context.close();
    console.log("  ✓ 24_atlas_overview_families.png");
  }

  // 25: Atlas Radial Constellation TH -> D
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/atlas/th_to_d`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, "25_atlas_radial_constellation_th_d.png") });
    await context.close();
    console.log("  ✓ 25_atlas_radial_constellation_th_d.png");
  }

  // 26: Atlas Radial Constellation T -> SS/S/Z
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/atlas/t_to_s_ss_z`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, "26_atlas_radial_constellation_t_ss.png") });
    await context.close();
    console.log("  ✓ 26_atlas_radial_constellation_t_ss.png");
  }

  // 27: Atlas Philology & Sources Card
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/atlas/th_to_d`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollBy({ top: 450, behavior: "instant" }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT_DIR, "27_atlas_philology_sources.png") });
    await context.close();
    console.log("  ✓ 27_atlas_philology_sources.png");
  }

  // 28: Atlas Branch Drill Modal
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/atlas/th_to_d`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const drillBtn = page.getByRole("button", { name: /practice this branch/i }).first();
    if (await drillBtn.isVisible()) {
      await drillBtn.click();
      await page.waitForTimeout(600);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "28_atlas_branch_drill_modal.png") });
    await context.close();
    console.log("  ✓ 28_atlas_branch_drill_modal.png");
  }

  // 29: Atlas Master Web Constellation
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/atlas/master`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT_DIR, "29_atlas_master_constellation_web.png") });
    await context.close();
    console.log("  ✓ 29_atlas_master_constellation_web.png");
  }

  // 30: Grammar Panorama Overview Hub
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/panorama`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, "30_panorama_overview_hub.png") });
    await context.close();
    console.log("  ✓ 30_panorama_overview_hub.png");
  }

  // 31: Panorama Diagram 1 - Articles as Pronouns
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/panorama`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const diagram1 = page.locator("section").filter({ hasText: "The words for" }).first();
    if (await diagram1.isVisible()) {
      await diagram1.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "31_panorama_articles_as_pronouns.png") });
    await context.close();
    console.log("  ✓ 31_panorama_articles_as_pronouns.png");
  }

  // 32: Panorama Diagram 2 - Verb Bracket (Satzklammer)
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/panorama`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const diagram2 = page.locator("section").filter({ hasText: "The verb bracket" }).first();
    if (await diagram2.isVisible()) {
      await diagram2.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "32_panorama_verb_bracket.png") });
    await context.close();
    console.log("  ✓ 32_panorama_verb_bracket.png");
  }

  // 33: Panorama Diagram 3 - Adjective Endings Matrix
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/panorama`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const diagram3 = page.locator("section").filter({ hasText: "The adjective carries" }).first();
    if (await diagram3.isVisible()) {
      await diagram3.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "33_panorama_adjective_endings.png") });
    await context.close();
    console.log("  ✓ 33_panorama_adjective_endings.png");
  }

  // 34: Panorama Diagram 4 - Tense Map
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/panorama`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const diagram4 = page.locator("section").filter({ hasText: "Time, and how German marks it" }).first();
    if (await diagram4.isVisible()) {
      await diagram4.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "34_panorama_tense_map.png") });
    await context.close();
    console.log("  ✓ 34_panorama_tense_map.png");
  }
}

// -------------------------------------------------------------
// WORKER 4: SRS Review Hub, Modals & Inspector (35-46)
// -------------------------------------------------------------
async function runWorker4(browser: Browser) {
  console.log("[Worker 4] Starting Review Hub & Modals captures...");

  // 35: Review Hub Decks Selector
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/review`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, "35_review_deck_selector.png") });
    await context.close();
    console.log("  ✓ 35_review_deck_selector.png");
  }

  // 36: Review Style Picker Modal
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/review`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const deckBtn = page.getByRole("button", { name: /review recent|due today|by shift/i }).first();
    if (await deckBtn.isVisible()) {
      await deckBtn.click();
      await page.waitForTimeout(400);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "36_review_style_modal.png") });
    await context.close();
    console.log("  ✓ 36_review_style_modal.png");
  }

  // 37: Review Card Front with Gender Shield
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/review`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const deckBtn = page.getByRole("button", { name: /review recent/i }).first();
    if (await deckBtn.isVisible()) {
      await deckBtn.click();
      await page.waitForTimeout(300);
      const styleBtn = page.getByRole("button", { name: /recall \(flashcard\)/i }).first();
      if (await styleBtn.isVisible()) await styleBtn.click();
      await page.waitForTimeout(400);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "37_review_card_front_gender_shield.png") });
    await context.close();
    console.log("  ✓ 37_review_card_front_gender_shield.png");
  }

  // 38: Review Card Back Revealed with SM-2 Grading
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/review`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const deckBtn = page.getByRole("button", { name: /review recent/i }).first();
    if (await deckBtn.isVisible()) {
      await deckBtn.click();
      await page.waitForTimeout(300);
      const styleBtn = page.getByRole("button", { name: /recall \(flashcard\)/i }).first();
      if (await styleBtn.isVisible()) await styleBtn.click();
      await page.waitForTimeout(400);
      // Flip the card with Space
      await page.keyboard.press("Space");
      await page.waitForTimeout(400);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "38_review_card_back_sm2_grading.png") });
    await context.close();
    console.log("  ✓ 38_review_card_back_sm2_grading.png");
  }

  // 39: Review Mobile View
  {
    const { context, page } = await createPageWithState(browser, {}, { width: 390, height: 844 });
    await page.goto(`${BASE_URL}/review`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, "39_review_mobile.png") });
    await context.close();
    console.log("  ✓ 39_review_mobile.png");
  }

  // 40: WordCardDrawer Inspector (Wasser)
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/atlas/t_to_s_ss_z`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const wasserBtn = page.getByRole("button", { name: /wasser/i }).first();
    if (await wasserBtn.isVisible()) {
      await wasserBtn.click();
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "40_word_card_drawer_wasser.png") });
    await context.close();
    console.log("  ✓ 40_word_card_drawer_wasser.png");
  }

  // 41: WordCardDrawer Inspector False Friend (Gift)
  {
    const { context, page } = await createPageWithState(browser, {
      lessonProgress: { 3002: { segment: "table", practiceIndex: 0, completedSegments: ["hook", "pattern"], everQueued: false } }
    });
    await page.goto(`${BASE_URL}/trail/3002`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const giftBtn = page.getByRole("button", { name: /gift/i }).first();
    if (await giftBtn.isVisible()) {
      await giftBtn.click();
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "41_word_card_drawer_false_friend_gift.png") });
    await context.close();
    console.log("  ✓ 41_word_card_drawer_false_friend_gift.png");
  }

  // 42: Settings & Preferences Page
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/settings`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, "42_settings_preferences.png") });
    await context.close();
    console.log("  ✓ 42_settings_preferences.png");
  }

  // 43: Theme Selector Modal
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/settings`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    const themeBtn = page.getByRole("button", { name: /browse.*themes/i }).first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "43_theme_selector_modal.png") });
    await context.close();
    console.log("  ✓ 43_theme_selector_modal.png");
  }

  // 44: Font Selector Modal
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/settings`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    const fontBtn = page.getByRole("button", { name: /browse.*fonts/i }).first();
    if (await fontBtn.isVisible()) {
      await fontBtn.click();
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: path.join(OUT_DIR, "44_font_selector_modal.png") });
    await context.close();
    console.log("  ✓ 44_font_selector_modal.png");
  }

  // 45: First-Time Onboarding Welcome Modal
  {
    const { context, page } = await createPageWithState(browser, {
      hasCompletedOnboarding: false,
      isOnboardingOpen: true,
    });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, "45_onboarding_welcome_modal.png") });
    await context.close();
    console.log("  ✓ 45_onboarding_welcome_modal.png");
  }

  // 46: About & Philosophy Page
  {
    const { context, page } = await createPageWithState(browser);
    await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, "46_about_philosophy_page.png") });
    await context.close();
    console.log("  ✓ 46_about_philosophy_page.png");
  }
}

// -------------------------------------------------------------
// MAIN SWARM ORCHESTRATOR: Launches 4 Parallel Workers
// -------------------------------------------------------------
async function main() {
  console.log(`🚀 Launching Playwright browser swarm against ${BASE_URL}...`);
  const startTime = Date.now();

  const browser = await chromium.launch({
    ...(CHROMIUM_PATH ? { executablePath: CHROMIUM_PATH } : {}),
    headless: true,
  }).catch((cause: unknown) => {
    throw new Error("Cannot launch Chromium. Run `bunx playwright install chromium`, or set CHROMIUM_PATH to an installed browser executable.", { cause });
  });

  try {
    // Run the 4 workers in parallel as a concurrent swarm!
    await Promise.all([
      runWorker1(browser),
      runWorker2(browser),
      runWorker3(browser),
      runWorker4(browser),
    ]);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n🎉 Swarm complete! All 46 screenshots captured in ${duration}s into ${OUT_DIR}`);
  } catch (err) {
    throw new Error(`Demo capture failed against ${BASE_URL}. Check DEMO_BASE_URL and ensure the app is running.`, { cause: err });
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
