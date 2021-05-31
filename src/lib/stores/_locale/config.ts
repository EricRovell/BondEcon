import type { Locale } from "./types";

interface LocaleStoreConfig {
  fallback: Locale;
  supports: Set<string>;
  initial: string | null;
}

export const supportedLangs = new Set<Locale>([ "en", "ru", "fr" ]);

// locale options
export const config: LocaleStoreConfig = {
  fallback: "en",
  supports: supportedLangs,
  initial: null
};

export function supportsLocale(lang: Locale) {
  return supportedLangs.has(lang);
}