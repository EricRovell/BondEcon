import { derived } from "svelte/store";
import { locale } from "@stores";

export const basePath = derived(locale, $locale => `/${$locale}`);

// contents
export const articlePath = derived(basePath, $path => (id: string) => `${$path}/blogpost/article-${id}`);
export const econtwittPath = derived(basePath, $path => (id: string) => `${$path}/blogpost/econtwitt-${id}`);

// information
export const repositoryPath = "https://www.gitgub.com/EricRovell/bondecon.com";
export const creatorGithubProfilePath = "https://github.com/EricRovell";
export const designerPortfolioPath = "https://web.marcelforart.com/victoriakan";