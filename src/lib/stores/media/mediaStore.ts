import { writable } from "svelte/store";
import type { Media, MediaQueryMap, MediaQueries } from "./types";

/**
 * Composes an object of current media queries state.
 */
function calcMedia<T extends string>(mqls: MediaQueryMap<T>) {
  let media = {} as Media<T>;

  for (let [ alias, mediaList ] of mqls) {
    media[alias] = mediaList.matches;
  }

  return media;
}

/**
 * Typed entries function.
 */
function entries<T extends string>(obj: Record<T, string>) {
  return Object.entries<string>(obj) as [ T, string ][];
}

/**
 * Initializes a watching media store.
 */
export function mediaStore<T extends string>(mediaQueries: MediaQueries<T>) {
  return writable({} as Media<T>, set => {
    // SSR check
    if (!globalThis.window) return;

    let mqls: MediaQueryMap<T> = new Map();
    
    let updateMedia = () => set(calcMedia<T>(mqls));

    for (let [ alias, mediaQueryString ] of entries<T>(mediaQueries)) {
      const media = window.matchMedia(mediaQueryString);
      media.addEventListener("change", updateMedia);
      
      mqls.set(alias, window.matchMedia(mediaQueryString));
    }

    updateMedia();

    return () => {
      for (let alias of mqls.keys()) {
        mqls.get(alias)?.removeEventListener("change", updateMedia);
      }
    }
  });
}