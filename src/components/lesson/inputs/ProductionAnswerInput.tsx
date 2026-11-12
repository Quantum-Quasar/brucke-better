"use client";

import { useId, useState, type RefObject } from "react";
import { AlertCircle } from "lucide-react";
import { GermanCharBar } from "@/components/common/GermanCharBar";
import type { CustomizationSettings } from "@/data/settings";

interface ProductionAnswerInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
  onVerify: () => void;
  onReset: () => void;
  label: string;
  languageId: string;
  placeholder: string;
  readOnly: boolean;
  settings: CustomizationSettings;
}

export function ProductionAnswerInput({
  inputRef, value, onChange, onVerify, onReset, label, languageId, placeholder, readOnly, settings,
}: ProductionAnswerInputProps) {
  const [focused, setFocused] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const warningId = useId();
  const showWarning = settings.capsLockWarning && capsLock;
  return (
    <div
      className="space-y-3"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div id={warningId} role="status" aria-live="polite">
        {showWarning && (
          <p className="flex items-center gap-1.5 text-xs text-[var(--error-color)] font-mono">
            <AlertCircle aria-hidden="true" className="w-3.5 h-3.5" /> caps lock is on
          </p>
        )}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        aria-label={label}
        aria-describedby={showWarning ? warningId : undefined}
        lang={languageId}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          setCapsLock(event.getModifierState("CapsLock"));
          if (event.nativeEvent.isComposing) return;
          if (settings.quickRestart === "esc" && event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            onReset();
          } else if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            if (!readOnly) onVerify();
          }
        }}
        readOnly={readOnly}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-[var(--main-color)] text-lg font-bold font-mono outline-none focus:border-[var(--main-color)] transition placeholder:text-[var(--sub-color)]/40"
      />
      {!readOnly && (settings.showCharBar === "always" || (settings.showCharBar === "on_focus" && focused)) && (
        <GermanCharBar inputRef={inputRef} value={value} onChange={onChange} />
      )}
    </div>
  );
}
