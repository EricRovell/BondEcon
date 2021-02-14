import { derived } from "svelte/store";

import { locale } from "./locale";
import { dictionary } from "./dict";
import type { LocaleDictionary } from "./types.js";

let currentLocaleDict: LocaleDictionary;

export const localeDict = derived([ locale, dictionary ], ([ $locale, $dictionary ]) => {
  return $dictionary.get($locale) as LocaleDictionary;
});

localeDict.subscribe(value => {
  currentLocaleDict = value;
});

/**
 * Retrieves the localized message from locale dictionary.
 */
export function getMessage(id: string, { defaultMessage } = { defaultMessage: "none" }) {
  return (currentLocaleDict?.has(id))
    ? currentLocaleDict.get(id)
    : defaultMessage;
}

export const message = derived([ locale, localeDict ], () => getMessage);