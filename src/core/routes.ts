import { derived } from "svelte/store";
import { locale } from "@stores";

export const basePath = derived(locale, $locale => `/${$locale}`);

// pages
export const blogPagePath = derived(locale, $locale => `${$locale}/blog`);
export const articlesPagePath = derived(blogPagePath, $path => `${$path}/articles`);
export const econtwittsPagePath = derived(blogPagePath, $path => `${$path}/econtwitts`);
export const cvPagePath = derived(locale, $locale => `${$locale}/cv`);
export const aboutPagePath = derived(locale, $locale => `${$locale}/about`);

// contents
export const articlePath = derived(basePath, $path => (id: string) => `${$path}/blogpost/article-${id}`);
export const econtwittPath = derived(basePath, $path => (id: string) => `${$path}/blogpost/econtwitt-${id}`);

// information
export const repositoryPath = "https://www.gitgub.com/EricRovell/bondecon.com";
export const creatorGithubProfilePath = "https://github.com/EricRovell";
export const designerPortfolioPath = "https://web.marcelforart.com/victoriakan";