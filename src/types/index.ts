import type { ArticleSearchRecord, EcontwittSearchRecord } from "@core/components/content";

export type Variant = "neutral" | "primary" | "success" | "danger" | "warning" | "info" | "link";

export type Lang = "ru" | "en" | "fr";
export type { Document } from "./cv";

export interface TagCount {
  tag: string;
  count: number;
}

export interface BlogTagsCount {
  econtwitts?: TagCount[];
  articles?: TagCount[];
}

export interface SearchResults {
  results: Array<ArticleSearchRecord | EcontwittSearchRecord>;
  total: {
    count: number,
    tag: string
  }[];
}

export type AriaCurrent = "page" | "location" | "date" | "step";