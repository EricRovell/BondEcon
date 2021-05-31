import { writable } from "svelte/store";
import { getLocaleFromNavigator } from "./config";
import type { Locale } from "./types";

export const locale = writable<Locale>("en", set => {
  const clientLocale = getLocaleFromNavigator();
  set(clientLocale);
});

export let localeValue: Locale = "en";

locale.subscribe(async (locale: Locale) => {
  localeValue = locale;
  
  if (globalThis.window) {
    document.documentElement.setAttribute("lang", locale);
  }
});