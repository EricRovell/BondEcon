import { writable } from "svelte/store";
import { config } from "./config";
import type { Locale } from "./types";

export let currentLocale: Locale;

export const locale = writable<Locale>("en", set => {
  set(getLocaleFromNavigator() || config.fallback);
});

export function getLocaleFromNavigator() {
  // client side check
  if (!globalThis.window) {
    return null
  }

  let clientLocale = (
    window.navigator.language ||
    window.navigator.languages[0]
  )?.slice(0, 2) as Locale;

  return (clientLocale && config.supports.has(clientLocale))
    ? clientLocale
    : config.fallback;
}

/**
 * Updates the currentLocale locale value and root lang attribute.
 */
locale.subscribe((locale: Locale) => {
  currentLocale = locale;

  if (!globalThis.window) return;
  document.documentElement.setAttribute("lang", locale);
});
