import { writable, get } from "svelte/store";
import { media } from "../media/media";
import { getCookie, setCookie } from "@util";

export type Theme = "light" | "dark";

function createThemeStore() {
  const themeFromCookie = getCookie("theme") as Theme;
  const themeFromMediaQuery = get(media).dark ? "dark" : "light";

  // current theme value
  const initial: Theme = themeFromCookie || themeFromMediaQuery || "light";

  function themeState(name: Theme) {
    return {
      name,
      dark: name === "dark",
      styles: `styles/theme-${(name === "dark") ? "dark" : "light"}.css`,
    }
  }

  const { subscribe, update } = writable(themeState(initial));

  // update cookie on change
  subscribe(value => {
    setCookie("theme", value.name);
  });

  // change theme
  function changeTheme() {
    update(state => {
      let theme: Theme = (state.name === "dark") ? "light" : "dark";
      return themeState(theme);
    });
  }

  return {
    subscribe,
    change: changeTheme
  };
}

export const theme = createThemeStore();