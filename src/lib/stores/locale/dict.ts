import { writable } from "svelte/store";
import { flatObject } from "$util";
import type { Locale, Dictionary, LocaleDictionary } from "./types";

function localeDictStore() {
  const { subscribe, update } = writable<Dictionary>(new Map());
  
  /**
   * Add a new dictionary to locale library.
   * 
   * There are two ways to add a new dictionary:
   *  1. The object can be flattened in the process and each key:value pair added to library as id:value.
   *     1.1: flatArrays: should be arrays flattened
   *     1.2: prefix: initial prefix for keys.
   *  2. The object can be added to the library as it is. Only the id should be specified. 
   */
  function add(locale: Locale, dictionary: LocaleDictionary) {
    if (!dictionary) return;

    update(current => {
      // if new locale
      if (!current.has(locale)) {
        current.set(locale, new Map());
      };

      const localeDictionary = current.get(locale);
      let flatDictionary = flatObject(dictionary);

      for (let key of Object.keys(flatDictionary)) {
        localeDictionary.set(key, flatDictionary[key]);
      }

      return current;
    });
  }
  
  return {
    subscribe,
    add
  }
}

export const dictionary = localeDictStore();