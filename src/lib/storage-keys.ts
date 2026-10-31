// Storage keys shared by the client store and the server-rendered root layout.
//
// This module deliberately has no "use client" directive: the root layout is a
// Server Component and needs the keys for the pre-paint theme script, while the
// store is a client module. Importing the constants from the store into the
// server layout would hand back a client-reference proxy instead of the string,
// so both sides import them from here. `src/lib/store.ts` re-exports them for
// backwards compatibility.
export const STORAGE_KEY = "brucke_app_state_v1";
export const STORAGE_COOKIE_KEY = "brucke_progress";
/** Per-view UI position (never progress); kept separate from STORAGE_KEY. */
export const VIEW_STORAGE_KEY = "brucke_view_state_v1";
