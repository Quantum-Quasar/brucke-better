"use client";

import { useAppStore } from "@/lib/store";
import { SettingItem } from "./SettingItem";
import React, { useRef, useState } from "react";
import { ShieldAlert, Download, Upload, RotateCcw } from "lucide-react";
import { LocalDataControls } from "./LocalDataControls";
import { downloadProgressBackup } from "@/lib/progress-backup";

export function DangerZoneSettings({ matches, sectionVisible }: {
  matches: (keywords: string[]) => boolean;
  sectionVisible: (id: string) => boolean;
}) {
  const resetSettings = useAppStore((s) => s.resetSettings);
  const resetProgress = useAppStore((s) => s.resetProgress);
  const [backupStatusNote, setBackupStatusNote] = useState<string | null>(null);
  const [jsonPasteOpen, setJsonPasteOpen] = useState(false);
  const [jsonPasteText, setJsonPasteText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleExportBackup = () => {
    try {
      downloadProgressBackup(useAppStore.getState());
      setBackupStatusNote("Backup download started. Keep the file outside this browser.");
    } catch {
      setBackupStatusNote("Could not start the backup download. Please try again.");
    }
  };

  // Import JSON backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const MAX_BACKUP_BYTES = 2 * 1024 * 1024; // 2 MB
    if (file.size > MAX_BACKUP_BYTES) {
      alert("Backup file is too large (maximum allowed size is 2 MB).");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === "object") {
          const success = useAppStore.getState().importBackupState(parsed);
          if (success) {
            alert("Backup restored successfully! All settings and learning progress have been imported.");
          } else {
            alert("Could not restore backup. File contents are missing valid data.");
          }
        } else {
          alert("Invalid backup file format. Please upload a valid JSON backup.");
        }
      } catch {
        alert("Invalid backup file format. Please upload a valid JSON backup.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
        <section id="danger_zone" style={{ display: sectionVisible("danger_zone") ? undefined : "none" }} className="space-y-3 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--error-color)] border-b border-[var(--error-color)]/20 pb-2">
            <ShieldAlert className="w-4 h-4 text-[var(--error-color)]" />
            <span>danger zone</span>
          </div>

          {/* Dedicated Progress Backup & Restore (JSON File + Raw JSON) */}
          <div id="backup" className="space-y-2">
            <LocalDataControls />
            <SettingItem
              id="export-import"
              icon={Download}
              title="export & import progress as json"
              description="Export all your settings, completed lessons, SRS spaced-repetition schedules, and word mastery across all languages to a portable JSON file (or copy/paste raw JSON)."
              matchesSearch={matches(["backup", "export", "import", "restore", "json", "progress"])}
            >
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] text-[var(--text-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--main-color)]" />
                  <span>export json</span>
                </button>

                <label className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] text-[var(--text-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-[var(--main-color)]" />
                  <span>import json</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setJsonPasteOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer"
                >
                  <span>{jsonPasteOpen ? "hide raw json" : "paste json"}</span>
                </button>
              </div>
            </SettingItem>

            {backupStatusNote && (
              <p className="text-xs font-mono text-[var(--main-color)] pl-2" role="status">
                {backupStatusNote}
              </p>
            )}

            {jsonPasteOpen && (
              <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-2.5 font-mono text-xs">
                <p className="text-[var(--sub-color)]">
                  Paste a Brücke JSON backup below to restore your progress directly without a file picker:
                </p>
                <textarea
                  value={jsonPasteText}
                  onChange={(e) => setJsonPasteText(e.target.value)}
                  rows={4}
                  placeholder={'{"version": 2, "activeLanguageId": "de", ...}'}
                  className="w-full p-2.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-[var(--text-color)] text-xs font-mono outline-none focus:border-[var(--main-color)]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(jsonPasteText);
                        if (parsed && typeof parsed === "object" && useAppStore.getState().importBackupState(parsed)) {
                          setBackupStatusNote("Progress restored from pasted JSON!");
                          setJsonPasteText("");
                          setJsonPasteOpen(false);
                        } else {
                          setBackupStatusNote("Could not restore: JSON does not contain valid Brücke progress fields.");
                        }
                      } catch {
                        setBackupStatusNote("Invalid JSON syntax.");
                      }
                    }}
                    disabled={!jsonPasteText.trim()}
                    className="px-3.5 py-1.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs transition cursor-pointer disabled:opacity-40"
                  >
                    restore pasted json
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reset Settings to Default */}
          <SettingItem
            id="reset-settings"
            icon={RotateCcw}
            title="reset settings"
            description="Resets all customization preferences back to default values without affecting your lesson progress or SRS mastery."
            matchesSearch={matches(["reset settings", "default", "restore defaults"])}
          >
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset all settings to default values?")) {
                  resetSettings();
                }
              }}
              className="px-3 py-1.5 rounded text-xs font-mono text-[var(--error-color)] bg-[var(--error-color)]/10 hover:bg-[var(--error-color)] hover:text-[var(--bg-color)] border border-[var(--error-color)]/30 transition cursor-pointer"
            >
              reset settings
            </button>
          </SettingItem>

          {/* Reset Progress */}
          <SettingItem
            id="reset-progress"
            icon={ShieldAlert}
            title="reset learning progress"
            description="Clears all SRS cards, lesson completions, and word mastery stats. This action is permanent and cannot be undone!"
            matchesSearch={matches(["reset progress", "clear data", "delete progress"])}
          >
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    "DANGER: Are you sure you want to reset all lesson progress and SRS memory cards? This cannot be undone."
                  )
                ) {
                  resetProgress();
                  alert("Progress has been reset.");
                }
              }}
              className="px-3 py-1.5 rounded text-xs font-mono font-bold text-[var(--bg-color)] bg-[var(--error-color)] hover:opacity-90 transition cursor-pointer"
            >
              reset all progress
            </button>
          </SettingItem>
        </section>
  );
}
