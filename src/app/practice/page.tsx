"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardCheck,
  Dumbbell,
  MessageSquare,
  Mic,
  Tags,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { ShadowingLab } from "@/components/practice/ShadowingLab";
import { DialoguePractice } from "@/components/practice/DialoguePractice";
import { WeeklyMixedTest } from "@/components/practice/WeeklyMixedTest";
import { GenderGuessLab } from "@/components/practice/GenderGuessLab";

type PracticeTabId = "shadowing" | "dialogues" | "weekly" | "gender";

const PRACTICE_TABS: Array<{
  id: PracticeTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "shadowing", label: "Shadowing", icon: Mic },
  { id: "dialogues", label: "Dialogues", icon: MessageSquare },
  { id: "weekly", label: "Weekly Test", icon: ClipboardCheck },
  { id: "gender", label: "Gender Lab", icon: Tags },
];

export default function PracticeStudioPage() {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const [activeTab, setActiveTab] = useState<PracticeTabId>("shadowing");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 font-sans">
      <div className="space-y-2">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>back to trail</span>
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Dumbbell className="w-6 h-6 text-[var(--main-color)]" aria-hidden="true" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-color)]">
              Practice Studio
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)]">
            <span aria-hidden="true">{language.flag}</span>
            <span>{language.name}</span>
          </span>
        </div>
        <p className="text-sm text-[var(--sub-color)] leading-relaxed">
          Focused drills outside the main trail — sharpen pronunciation, rehearse real dialogues, take a weekly mixed check, and master noun gender clues.
        </p>
      </div>

      {/* Tab Bar */}
      <div
        role="tablist"
        aria-label="Practice Studio modes"
        className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20"
      >
        {PRACTICE_TABS.map((tab, index) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`practice-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="practice-tabpanel"
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
                  e.preventDefault();
                  const nextIndex =
                    e.key === "Home" ? 0
                    : e.key === "End" ? PRACTICE_TABS.length - 1
                    : (index + (e.key === "ArrowRight" ? 1 : -1) + PRACTICE_TABS.length) % PRACTICE_TABS.length;
                  const nextTab = PRACTICE_TABS[nextIndex];
                  setActiveTab(nextTab.id);
                  document.getElementById(`practice-tab-${nextTab.id}`)?.focus();
                }
              }}
              className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                active
                  ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-sm"
                  : "text-[var(--sub-color)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)]/60"
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <section
        id="practice-tabpanel"
        role="tabpanel"
        aria-labelledby={`practice-tab-${activeTab}`}
        className="p-5 sm:p-6 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20"
      >
        {activeTab === "shadowing" && <ShadowingLab />}
        {activeTab === "dialogues" && <DialoguePractice />}
        {activeTab === "weekly" && <WeeklyMixedTest />}
        {activeTab === "gender" && <GenderGuessLab />}
      </section>
    </div>
  );
}
