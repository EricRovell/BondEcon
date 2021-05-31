import type { Config, Locale } from "./types";

export const config: Config = {
  fallback: "en",
  supports: new Set([ "ru", "en", "fr" ]),
  initial: null
};

export function supportsLocale(locale: string) {
  return config.supports.has(locale);
}

export function getLocaleFromNavigator() {
  if (!globalThis.window) {
    return config.fallback
  }

  let clientLocale = (
    window.navigator.language ||
    window.navigator.languages[0]
  )?.slice(0, 2) as Locale;
  
  return (clientLocale && supportsLocale(clientLocale))
    ? clientLocale
    : config.fallback;
}

/**
 * Initialize the localization on client
 */
 export function startClient() {
  const localeValue = 
    //getCookie("locale") ??
    getLocaleFromNavigator() ??
    config.fallback;
  
  //locale.set(localeValue);
}