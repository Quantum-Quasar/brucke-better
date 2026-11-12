import { describe, expect, it } from "vitest";
import { voiceInstallInstructions } from "@/components/common/VoiceGuidanceSheet";

describe("OS-specific native voice install guidance", () => {
  it.each([
    ["Android 14 Linux", "Text-to-speech output"],
    ["iPhone", "Spoken Content"],
    ["Macintosh iPad", "Spoken Content"],
    ["Windows NT 10.0", "Manage voices"],
    ["Macintosh", "Manage Voices"],
    ["X11 Linux", "speech-dispatcher"],
    ["Unknown platform", "accessibility"],
  ])("offers actionable steps for %s", (platform, expected) => {
    const instructions = voiceInstallInstructions(platform, "Dutch").join(" ");
    expect(instructions).toContain(expected);
    expect(instructions).toContain("Dutch");
    expect(instructions).toMatch(/restart|reopen/i);
  });
});
