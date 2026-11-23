"use client";

import React, { useMemo, useState } from "react";
import { CheckCircle2, MessageSquare, RotateCcw, Send, Volume2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { playTargetAudio } from "@/lib/audio";
import {
  evaluateDialogueTypedTurn,
  getShuffledDialogueOptions,
  SITUATIONAL_DIALOGUES,
  type DialogueOption,
} from "@/lib/practice-studio";

interface CompletedMessage {
  id: string;
  speaker: "npc" | "learner";
  speakerName: string;
  text: string;
  english: string;
  feedback?: string;
}

export const DialoguePractice: React.FC = () => {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  const [scenarioId, setScenarioId] = useState(SITUATIONAL_DIALOGUES[0].id);
  const [inputMode, setInputMode] = useState<"pick" | "type">("pick");
  const [turnIndex, setTurnIndex] = useState(0);
  const [typedReply, setTypedReply] = useState("");
  const [nudge, setNudge] = useState<string | null>(null);
  const [history, setHistory] = useState<CompletedMessage[]>([]);

  const scenario = useMemo(
    () =>
      SITUATIONAL_DIALOGUES.find((d) => d.id === scenarioId) ??
      SITUATIONAL_DIALOGUES[0],
    [scenarioId]
  );

  // Advance automatically through any leading NPC turns so the learner always sees the conversation up to their next turn.
  const visibleState = useMemo(() => {
    const messages: CompletedMessage[] = [...history];
    let idx = turnIndex;
    while (idx < scenario.turns.length && scenario.turns[idx].speaker === "npc") {
      const turn = scenario.turns[idx];
      if (!messages.some((m) => m.id === turn.id)) {
        messages.push({
          id: turn.id,
          speaker: turn.speaker,
          speakerName: turn.speakerName,
          text: turn.text,
          english: turn.english,
        });
      }
      idx += 1;
    }
    const activeTurn = idx < scenario.turns.length ? scenario.turns[idx] : null;
    const isComplete = idx >= scenario.turns.length;
    return { messages, nextIndex: idx, activeTurn, isComplete };
  }, [history, scenario, turnIndex]);

  const shuffledOptions = useMemo(() => {
    if (!visibleState.activeTurn) return [];
    return getShuffledDialogueOptions(visibleState.activeTurn);
  }, [visibleState.activeTurn]);

  if (activeLanguageId !== "de") {
    return (
      <div className="p-6 rounded-xl bg-[var(--bg-color)] border border-[var(--sub-color)]/25 space-y-2">
        <h2 className="text-lg font-bold text-[var(--text-color)]">
          Situational Dialogues (German only for now)
        </h2>
        <p className="text-sm text-[var(--sub-color)] leading-relaxed">
          Situational dialogues are currently authored for German. {language.name} conversation scenarios are coming soon — switch to German to try them, or use Shadowing and Weekly Mixed Test for {language.name}.
        </p>
      </div>
    );
  }

  const resetScenario = (nextId = scenarioId) => {
    setScenarioId(nextId);
    setTurnIndex(0);
    setHistory([]);
    setTypedReply("");
    setNudge(null);
  };

  const commitLearnerTurn = (text: string, english: string, feedback: string) => {
    const activeTurn = visibleState.activeTurn;
    if (!activeTurn) return;

    const updatedHistory: CompletedMessage[] = [
      ...visibleState.messages,
      {
        id: activeTurn.id,
        speaker: "learner",
        speakerName: activeTurn.speakerName,
        text,
        english,
        feedback,
      },
    ];
    setHistory(updatedHistory);
    setTurnIndex(visibleState.nextIndex + 1);
    setTypedReply("");
    setNudge(null);
  };

  const handlePickOption = (option: DialogueOption) => {
    if (!option.isBest) {
      setNudge(option.feedback);
      return;
    }
    commitLearnerTurn(option.text, option.english, option.feedback);
  };

  const handleTypedSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const activeTurn = visibleState.activeTurn;
    if (!activeTurn || !typedReply.trim()) return;
    const check = evaluateDialogueTypedTurn(typedReply.trim(), activeTurn);
    if (!check.accepted) {
      setNudge(check.feedback);
      return;
    }
    commitLearnerTurn(typedReply.trim(), activeTurn.english, check.feedback);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-color)]">
            Situational Dialogues
          </h2>
          <p className="text-xs text-[var(--sub-color)] mt-0.5">
            Practice 5 everyday German conversations — pick a natural reply or switch to typing your own turn.
          </p>
        </div>

        <div className="inline-flex rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 p-0.5 font-mono text-xs">
          <button
            type="button"
            onClick={() => setInputMode("pick")}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              inputMode === "pick"
                ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                : "text-[var(--sub-color)] hover:text-[var(--text-color)]"
            }`}
          >
            Pick reply
          </button>
          <button
            type="button"
            onClick={() => setInputMode("type")}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              inputMode === "type"
                ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                : "text-[var(--sub-color)] hover:text-[var(--text-color)]"
            }`}
          >
            Type turn
          </button>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {SITUATIONAL_DIALOGUES.map((dlg) => (
          <button
            key={dlg.id}
            type="button"
            onClick={() => resetScenario(dlg.id)}
            className={`p-2.5 rounded-lg border text-left transition cursor-pointer ${
              dlg.id === scenario.id
                ? "bg-[var(--bg-color)] border-[var(--main-color)]"
                : "bg-[var(--bg-color)]/50 border-[var(--sub-color)]/20 hover:border-[var(--sub-color)]/50"
            }`}
          >
            <div className="text-xs font-bold text-[var(--text-color)] truncate">
              {dlg.title}
            </div>
            <div className="text-[11px] font-mono text-[var(--sub-color)]">
              {dlg.setting} · {dlg.level}
            </div>
          </button>
        ))}
      </div>

      {/* Chat Transcript */}
      <div className="p-5 rounded-xl bg-[var(--bg-color)] border border-[var(--sub-color)]/25 space-y-4">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--sub-color)]/15">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[var(--main-color)]" aria-hidden="true" />
            <div>
              <div className="text-sm font-bold text-[var(--text-color)]">
                {scenario.title} — {scenario.setting}
              </div>
              <div className="text-xs text-[var(--sub-color)]">{scenario.summary}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => resetScenario(scenario.id)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] border border-[var(--sub-color)]/25 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>restart</span>
          </button>
        </div>

        <div className="space-y-3">
          {visibleState.messages.map((msg) => {
            const isLearner = msg.speaker === "learner";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isLearner ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 space-y-1 border ${
                    isLearner
                      ? "bg-[var(--main-color)]/12 border-[var(--main-color)]/35"
                      : "bg-[var(--sub-alt-color)] border-[var(--sub-color)]/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono font-bold text-[var(--sub-color)]">
                      {msg.speakerName}
                    </span>
                    <button
                      type="button"
                      onClick={() => playTargetAudio(msg.text, "de-DE")}
                      aria-label={`Listen to ${msg.speakerName}`}
                      className="text-[var(--sub-color)] hover:text-[var(--main-color)] transition cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <p lang="de" className="text-sm font-medium text-[var(--text-color)]">{msg.text}</p>
                  <p className="text-xs text-[var(--sub-color)]">{msg.english}</p>
                  {msg.feedback && (
                    <p className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 pt-1">
                      {msg.feedback}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Learner Turn Prompt */}
        {visibleState.activeTurn && (
          <div className="pt-3 border-t border-[var(--sub-color)]/15 space-y-3">
            <div className="text-xs font-mono text-[var(--main-color)]">
              Your turn: {visibleState.activeTurn.prompt}
            </div>

            {nudge && (
              <p className="text-xs font-mono text-amber-800 dark:text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2">
                {nudge}
              </p>
            )}

            {inputMode === "pick" ? (
              <div className="space-y-2">
                {shuffledOptions.map((opt) => (
                  <button
                    key={opt.text}
                    type="button"
                    onClick={() => handlePickOption(opt)}
                    className="w-full text-left p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 hover:border-[var(--main-color)] transition cursor-pointer"
                  >
                    <div lang="de" className="text-sm font-medium text-[var(--text-color)]">
                      {opt.text}
                    </div>
                    <div className="text-xs text-[var(--sub-color)]">{opt.english}</div>
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleTypedSubmit} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={typedReply}
                    onChange={(e) => setTypedReply(e.target.value)}
                    placeholder="Type your German reply…"
                    className="flex-1 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/30 px-3 py-2 text-sm text-[var(--text-color)] focus:outline-none focus:border-[var(--main-color)]"
                  />
                  <button
                    type="submit"
                    disabled={!typedReply.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-[var(--main-color)] text-[var(--bg-color)] disabled:opacity-40 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Send</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Dialogue Complete */}
        {visibleState.isComplete && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/35 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-color)]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>Dialogue complete! You handled {scenario.title} cleanly.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const currentIdx = SITUATIONAL_DIALOGUES.findIndex((d) => d.id === scenario.id);
                const next = SITUATIONAL_DIALOGUES[(currentIdx + 1) % SITUATIONAL_DIALOGUES.length];
                resetScenario(next.id);
              }}
              className="px-3.5 py-2 rounded-lg text-xs font-mono font-bold bg-[var(--main-color)] text-[var(--bg-color)] cursor-pointer"
            >
              Next dialogue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
