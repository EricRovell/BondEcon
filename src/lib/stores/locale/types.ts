export type Locale = "ru" | "en" | "fr";

export interface Config {
  fallback: Locale;
  supports: Set<Locale | string>,
  initial: Locale | null;
}

export type LocaleDictionary = Map<string, any>;
export type Dictionary = Map<Locale, LocaleDictionary>;

export type LocaleQueue = Set<LocaleDictionaryURI>;
export type Queue = Map<Locale, LocaleQueue>;
export type DictionaryHistory = Set<string>;

export interface Message {
  id?: string;
  locale?: string;
  default?: string;
}

export interface AddDictionaryParams {
  locale: string;
  dictionary: Record<string, any>,
  flat?: boolean;
  flatArrays?: boolean;
  prefix?: string;
  id?: string;
}

export interface LocaleDictionaryURI {
  locale: Locale;
  url: string;
}

export interface LocaleDictionaryResult extends LocaleDictionaryURI {
  dictionary: any;
}