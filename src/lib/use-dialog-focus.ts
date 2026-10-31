"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const dialogStack: HTMLElement[] = [];

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true"
  );
}

function focusElement(element: HTMLElement | null) {
  if (!element || !element.isConnected) return;
  try {
    element.focus({ preventScroll: true });
  } catch {
    element.focus();
  }
}

function isTopDialog(container: HTMLElement) {
  return dialogStack[dialogStack.length - 1] === container;
}

export interface DialogFocusOptions {
  open: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onEscape?: () => void;
  restoreFocus?: boolean;
  /**
   * Let a dialog opt out of Escape for specific events. The lesson overlay
   * uses this so Escape inside an input still reaches the lesson's own handler
   * instead of closing the whole view.
   */
  shouldHandleEscape?: (event: KeyboardEvent) => boolean;
}

/**
 * Small native focus-trap for the app's existing overlay markup.
 * Nested dialogs work because only the most recently opened dialog traps focus.
 */
export function useDialogFocus({
  open,
  containerRef,
  initialFocusRef,
  onEscape,
  restoreFocus = true,
  shouldHandleEscape,
}: DialogFocusOptions) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;
  const shouldHandleEscapeRef = useRef(shouldHandleEscape);
  shouldHandleEscapeRef.current = shouldHandleEscape;

  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const hadTabIndex = container.hasAttribute("tabindex");
    if (!hadTabIndex) container.setAttribute("tabindex", "-1");
    dialogStack.push(container);

    const focusFirst = () => {
      const preferred = initialFocusRef?.current;
      const target = preferred && getFocusableElements(container).includes(preferred)
        ? preferred
        : getFocusableElements(container)[0] || container;
      focusElement(target);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTopDialog(container)) return;

      if (event.key === "Escape") {
        if (shouldHandleEscapeRef.current && !shouldHandleEscapeRef.current(event)) return;
        event.preventDefault();
        event.stopPropagation();
        onEscapeRef.current?.();
        return;
      }

      if (event.key !== "Tab") return;
      event.stopPropagation();

      const focusable = getFocusableElements(container);
      if (focusable.length === 0) {
        event.preventDefault();
        focusElement(container);
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const activeIndex = active ? focusable.indexOf(active) : -1;

      if (event.shiftKey && (activeIndex <= 0)) {
        event.preventDefault();
        focusElement(last);
      } else if (!event.shiftKey && (activeIndex === -1 || activeIndex === focusable.length - 1)) {
        event.preventDefault();
        focusElement(first);
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (!isTopDialog(container)) return;
      if (!container.contains(event.target as Node)) focusFirst();
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("focusin", handleFocusIn, true);
    focusFirst();

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("focusin", handleFocusIn, true);

      const index = dialogStack.lastIndexOf(container);
      if (index !== -1) dialogStack.splice(index, 1);

      if (!hadTabIndex) container.removeAttribute("tabindex");
      if (restoreFocus && previouslyFocused?.isConnected) {
        window.setTimeout(() => {
          const focusIsStillInADialog = dialogStack.some((dialog) => dialog.contains(previouslyFocused));
          if (!dialogStack.length || focusIsStillInADialog) focusElement(previouslyFocused);
        }, 0);
      }
    };
  }, [open, containerRef, initialFocusRef, restoreFocus]);
}
