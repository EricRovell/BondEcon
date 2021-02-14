export type locale = string;

export type LocaleDictionary = Map<string, any>;
export type Dictionary = Map<locale, LocaleDictionary>;

export type LocaleQueue = Set<LocaleDictionaryURI>;
export type Queue = Map<locale, LocaleQueue>;
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
  locale: locale;
  url: string;
}

export interface LocaleDictionaryResult extends LocaleDictionaryURI {
  dictionary: any;
}
