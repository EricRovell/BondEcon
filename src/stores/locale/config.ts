interface LocaleStoreConfig {
  fallback: string;
  supports: Set<string>;
  initial: string | null;
}

const supportedLangs = new Set([
  "en",
  "ru",
  "fr"
]);

// locale options
export const config: LocaleStoreConfig = {
  fallback: "en",
  supports: supportedLangs,
  initial: null
};

export function supportsLocale(lang: string) {
  return supportedLangs.has(lang);
}