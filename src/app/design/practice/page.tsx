"use client";

import React, { useState } from "react";
import {
  ClipboardCheck,
  MessageSquare,
  Mic,
  Tags,
} from "lucide-react";
import { DesignFrame } from "@/components/design/DesignFrame";
import { ShadowingLab } from "@/components/practice/ShadowingLab";
import { DialoguePractice } from "@/components/practice/DialoguePractice";
import { WeeklyMixedTest } from "@/components/practice/WeeklyMixedTest";
import { GenderGuessLab } from "@/components/practice/GenderGuessLab";

type PracticeTabId = "shadowing" | "dialogues" | "weekly" | "gender";

const PRACTICE_TABS: Array<{
  id: PracticeTabId;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}> = [
  { id: "shadowing", label: "Shadowing", icon: Mic },
  { id: "dialogues", label: "Dialogues", icon: MessageSquare },
  { id: "weekly", label: "Weekly Test", icon: ClipboardCheck },
  { id: "gender", label: "Gender Lab", icon: Tags },
];

export default function DesignPracticePage() {
  const [activeTab, setActiveTab] = useState<PracticeTabId>("shadowing");

  return (
    <DesignFrame
      eyebrow="Focused Drills"
      title="Practice Studio"
      subtitle="Sharpen pronunciation, rehearse real-world dialogues, take a weekly mixed check, and master noun gender clues outside the main trail."
      showBackToTrail
      maxWidth="4xl"
    >
      <div className="space-y-5">
        <div
          role="tablist"
          aria-label="Practice Studio modes"
          className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-[var(--design-well)] border border-[var(--design-border)]"
        >
          {PRACTICE_TABS.map((tab, index) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`design-practice-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="design-practice-tabpanel"
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => {
                  if (
                    e.key === "ArrowRight" ||
                    e.key === "ArrowLeft" ||
                    e.key === "Home" ||
                    e.key === "End"
                  ) {
                    e.preventDefault();
                    const nextIndex =
                      e.key === "Home"
                        ? 0
                        : e.key === "End"
                        ? PRACTICE_TABS.length - 1
                        : (index + (e.key === "ArrowRight" ? 1 : -1) + PRACTICE_TABS.length) %
                          PRACTICE_TABS.length;
                    const nextTab = PRACTICE_TABS[nextIndex];
                    setActiveTab(nextTab.id);
                    document.getElementById(`design-practice-tab-${nextTab.id}`)?.focus();
                  }
                }}
                className={`min-h-11 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  active ? "shadow-xs" : "text-[var(--design-ink-muted)] hover:text-[var(--design-ink)]"
                }`}
                style={
                  active
                    ? {
                        backgroundColor: "var(--design-sapphire)",
                        color: "var(--design-on-accent)",
                      }
                    : undefined
                }
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden={true} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <section
          id="design-practice-tabpanel"
          role="tabpanel"
          aria-labelledby={`design-practice-tab-${activeTab}`}
          className="design-card p-5 sm:p-6"
        >
          {activeTab === "shadowing" && <ShadowingLab />}
          {activeTab === "dialogues" && <DialoguePractice />}
          {activeTab === "weekly" && <WeeklyMixedTest />}
          {activeTab === "gender" && <GenderGuessLab />}
        </section>
      </div>
    </DesignFrame>
  );
}
