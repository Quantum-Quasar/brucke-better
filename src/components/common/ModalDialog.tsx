"use client";

// Native modal shell. <dialog>.showModal() supplies the focus trap, inert
// background, top-layer stacking and opener focus restoration; the app keeps
// only Escape routing and a shared page-scroll lock.

import React, { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react";

const BLOCKING_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "details > summary:first-of-type",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const openDialogs: HTMLDialogElement[] = [];
const nonBlockingDialogs = new WeakSet<HTMLDialogElement>();

let scrollLocks = 0;
let savedBodyOverflow = "";
let savedBodyPaddingRight = "";
let savedHtmlOverflow = "";

// Export the shared scroll lock so the one remaining custom-trap surface
// (SubviewOverlay) can participate without a second counter.
export function lockPageScroll() {
  if (typeof document === "undefined") return;
  if (scrollLocks === 0) {
    const root = document.documentElement;
    savedBodyOverflow = document.body.style.overflow;
    savedBodyPaddingRight = document.body.style.paddingRight;
    savedHtmlOverflow = root.style.overflow;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  scrollLocks += 1;
}

export function unlockPageScroll() {
  if (typeof document === "undefined") return;
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) {
    document.body.style.overflow = savedBodyOverflow;
    document.body.style.paddingRight = savedBodyPaddingRight;
    document.documentElement.style.overflow = savedHtmlOverflow;
  }
}

export function hasBlockingKeyboardDialog(owner?: HTMLElement | null): boolean {
  for (let index = openDialogs.length - 1; index >= 0; index--) {
    const dialog = openDialogs[index];
    if (!nonBlockingDialogs.has(dialog)) return dialog !== owner;
  }
  return false;
}

interface ModalDialogProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open" | "onClose"> {
  open?: boolean;
  onClose: () => void;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Dialogs that let the underlying lesson keep its own shortcuts. */
  blocksGlobalShortcuts?: boolean;
  /** Escape inside a field may belong to the surface beneath the dialog. */
  shouldHandleEscape?: (event: KeyboardEvent) => boolean;
}

export const ModalDialog = forwardRef<HTMLDialogElement, ModalDialogProps>(function ModalDialog({
  open = true,
  onClose,
  initialFocusRef,
  blocksGlobalShortcuts = true,
  shouldHandleEscape,
  className = "",
  children,
  ...rest
}, forwardedRef) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  useImperativeHandle(forwardedRef, () => dialogRef.current as HTMLDialogElement);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const escapeAllowedRef = useRef(shouldHandleEscape);
  escapeAllowedRef.current = shouldHandleEscape;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog.open) dialog.showModal();
    openDialogs.push(dialog);
    if (!blocksGlobalShortcuts) nonBlockingDialogs.add(dialog);
    lockPageScroll();

    const onCancel = (event: Event) => event.preventDefault();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      if (openDialogs[openDialogs.length - 1] !== dialog) return;
      if (escapeAllowedRef.current && !escapeAllowedRef.current(event)) return;
      event.preventDefault();
      event.stopPropagation();
      onCloseRef.current();
    };
    dialog.addEventListener("cancel", onCancel);
    document.addEventListener("keydown", onKeyDown, true);

    const focusTarget = initialFocusRef?.current
      ?? dialog.querySelector<HTMLElement>(BLOCKING_SELECTOR)
      ?? dialog;
    focusTarget.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      dialog.removeEventListener("cancel", onCancel);
      const index = openDialogs.lastIndexOf(dialog);
      if (index !== -1) openDialogs.splice(index, 1);
      nonBlockingDialogs.delete(dialog);
      unlockPageScroll();
      if (dialog.open) dialog.close();
      if (openerRef.current?.isConnected) openerRef.current.focus({ preventScroll: true });
    };
  }, [open, blocksGlobalShortcuts, initialFocusRef]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 m-0 hidden h-dvh w-full max-h-none max-w-none border-0 bg-transparent p-0 text-inherit ${className}`}
      {...rest}
    >
      {children}
    </dialog>
  );
}
);
