import { writable, get } from "svelte/store";
import { media } from "../media/media";
import { getCookie, setCookie } from "@util";

import type { Theme } from "./types";

function createThemeStore() {
  const initial: Theme = 
    getCookie("theme") as Theme ??
    get(media).dark ? "dark" : "light" ??
    "light";

  const { subscribe, update } = writable<Theme>(initial);

  // update cookie on change
  subscribe(value => {
    setCookie("theme", value);
  });

  return {
    subscribe,
    change: () => update(value => value === "dark" ? "light" : "dark")
  };
}

export const theme = createThemeStore();