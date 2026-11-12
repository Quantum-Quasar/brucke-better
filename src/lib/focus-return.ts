"use client";

// Modal openers can live on SVG or be replaced by a re-render between the user's
// key/click event and the dialog's mount effect. Remember the element at the
// event that opened the dialog, then hand it back on close.
let opener: Element | null = null;

/** SVG graph nodes are focusable Elements but not HTMLElements. */
export function rememberFocusOpener(element?: Element | null): void {
  if (typeof document === "undefined" || typeof Element === "undefined") return;
  const candidate = element instanceof Element
    ? element
    : document.activeElement instanceof Element
      ? document.activeElement
      : null;
  if (candidate && candidate !== document.body && candidate !== document.documentElement) opener = candidate;
}

export function focusOpener(): Element | null {
  return opener?.isConnected ? opener : null;
}

export function clearFocusOpener(): void {
  opener = null;
}
