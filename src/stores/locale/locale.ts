import { writable } from "svelte/store";
import { config } from "./config";

export let currentLocale: string;

export const locale = writable<string>("en", set => {
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
  )?.slice(0, 2);

  return (clientLocale && config.supports.has(clientLocale))
    ? clientLocale
    : config.fallback;
}

/**
 * Updates the currentLocale locale value and root lang attribute.
 */
locale.subscribe((locale: string) => {
  currentLocale = locale;

  if (!globalThis.window) return;
  document.documentElement.setAttribute("lang", locale);
});
