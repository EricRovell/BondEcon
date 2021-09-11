import { addMessages, init, getLocaleFromNavigator } from "svelte-i18n";

import dictRU from "@assets/locale/ru.json";
import dictEN from "@assets/locale/en.json";

export function i18nInit(lang?: string) {
  addMessages("ru", dictRU);
  addMessages("en", dictEN);

  init({
    fallbackLocale: lang || "ru",
    initialLocale: getLocaleFromNavigator(),
  });
};