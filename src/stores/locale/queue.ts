import { currentLocale, locale } from "./locale";
import { addDictionary } from "./dict";

import type {
  LocaleQueue,
  Queue,
  DictionaryHistory,
  LocaleDictionaryURI,
  LocaleDictionaryResult
} from "./types";

/**
 * The queue mimics the Dictionary, but instead of actual locale dictionaries
 * it holds the dictionaries that is not loaded but registered to load as needed.
 * 
 * The dictionaries for the current locale are loaded immediately.
 * 
 * The queue stores the dictionaries to be loaded within the Map instance using locale as the key.
 * 
 * When the locale changes, all the dictionaries are fetched by the client.
 */


/**
 * Holds the dictionary loaders objects that is not loaded to the dictionary yet.
 * 
 * Each key represents different locale.
 * Each value contains the Set of loaders objects with information about dictionary
 * and how should it be loaded.
 */
const queue: Queue = new Map();

/**
 * History contains all the loaded dictionaries URIs.
 * To prevent the unnecessary dictionaries reload.
 */
const history: DictionaryHistory = new Set();

/**
 * Register provided dictionaries.
 */
export async function registerDictionaries(dicts: LocaleDictionaryURI[], sessionLocale?: string) {
  for (let dict of dicts) {
    // check cache
    if (history.has(dict.url)) {
      continue;
    }

    // check locale presence
    if (!queue.has(dict.locale)) {
      queue.set(dict.locale, new Set());
    }

    (queue.get(dict.locale) as LocaleQueue).add(dict);
  }

  // ?
  if (sessionLocale) {
    locale.set(sessionLocale);
  }
  await loadLocaleDictionaries(sessionLocale ?? currentLocale);
}

/**
 * Fetch the dictionary object from URL and injects the data into the input object.
 */
async function fetchDictionary({ url, locale }: LocaleDictionaryURI) {
  try {
    const response = await fetch(url);
    const dictionary = await response.json();

    return {
      url,
      locale,
      dictionary
    } as LocaleDictionaryResult;
  } catch (error) {
    console.error("Can't load the dictionary.");
    return {} as LocaleDictionaryResult;
  }
}

/**
 * Loads the registered dictionaries for the locale.
 */
export async function loadLocaleDictionaries(locale: string) {
  if (!globalThis.window) return;

  // check queue
  if (!queue.has(locale)) return;
  
  const localeQueue = queue.get(locale) as LocaleQueue;

  // nothing to load?
  if (!localeQueue.size) return;

  const loadedDictionaries = await Promise.allSettled(
    [ ...localeQueue ].map(fetchDictionary)
  );

  for (let dict of loadedDictionaries) {
    if (dict.status === "rejected") {
      continue;
    }

    addDictionary(dict.value.locale, dict.value.dictionary);
    history.add(dict.value.url)
  }

  queue.delete(locale);
}


// load from queue for updated locale value
locale.subscribe(async value => {
  await loadLocaleDictionaries(value);
});