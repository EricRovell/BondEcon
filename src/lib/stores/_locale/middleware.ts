import { config } from "./config";
import { locale } from "./locale";
import { getCookie, setCookie } from "$util";
import { getLocaleFromNavigator } from "./locale";
import type { Locale } from "./types";

// current locale
let currentLocale: Locale;

// update cookie on change
locale.subscribe(value => {
  if (!value) return;

  currentLocale = value.slice(0, 2) as Locale;

  // client-side -> save the preference in a cookie
  if (typeof window !== "undefined") {
    const now = new Date();
    now.setTime(now.getTime() + 7 * 24 * 3600 * 1000);

    setCookie("locale", value.slice(0, 2), {
      expires: now
    });
  }
});

/**
 * Initialize the localization on client
 */
export function startClient() {
  const localeValue = 
    getCookie("locale") ??
    getLocaleFromNavigator() ??
    config.fallback;
  
  // @ts-ignore
  locale.set(localeValue);
}

const DOCUMENT_REGEX = /^([^.?#@]+)?([?#](.+)?)?$/;

export function localeMiddleware() {
  startClient();

  return (request, response, next) => {
    const isDocument = DOCUMENT_REGEX.test(request.originalUrl);

		// get the initial locale only for a document request
		if (!isDocument) {
      next();
      return;
    };
    
    let localeValue = getCookie("locale", request.headers.cookie);

    if (!locale) {
      if (request.headers["accept-language"]) {
        const headerLang = request.headers["accept-language"].split(",")[0].trim();
        if (headerLang.length > 1) {
          localeValue = headerLang;
        }
      } else {
        localeValue = config.initial || config.fallback;
      }
    }

    if (localeValue && localeValue !== currentLocale) {
      // @ts-ignore
      locale.set(localeValue);
    }

    request.session = { locale: currentLocale };

    next();
  }
}
