import { derived } from "svelte/store";
import { locale } from "./locale";
import { dictionary } from "./dict";

export const localeDict = derived([ locale, dictionary ], ([ $locale, $dictionary ]) => {
  return $dictionary.get($locale);
});

export const message = derived(localeDict, $localeDict => {
  function getMessage(id: string, defaultMessage: string = "No translation is provided"): string {
    return $localeDict?.has(id)
      ? $localeDict.get(id)
      : defaultMessage
  }
  
  return getMessage;
});