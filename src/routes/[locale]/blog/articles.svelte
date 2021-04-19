<script context="module" lang="ts">
  import type { Preload } from "@sapper/common";
  import type { ArticleRecordCard } from "@core/components/content";
  
  import { fetchAll } from "@util";

  export const preload: Preload = async function(this, page) {
    const uriList = [
      `api/blog/articles.json?${new URLSearchParams({ ...page.query })}`,
    ];

    const [ articles ]: [ ArticleRecordCard[] ] = await fetchAll(uriList, this.fetch);

    return {
      articles
    };
  }
</script>

<script lang="ts">
  import { BlogView } from "@views";
  import { ArticleCard } from "@core/components/content";

  // posts
  export let articles: ArticleRecordCard[] = [];
  
  $: tail = articles[articles.length - 1]?._id;
  $: finished = !!tail;
  
  async function fetchNext() {
    const url = new URL(document.URL);
    const query = new URLSearchParams(url.search);

    if (!tail) return;

    query.set("tail", tail);

    const response = await fetch(`api/blog/articles.json?${query}`);
    const data = await response.json();

    (data && data?.length)
      ? articles = [ ...articles, ...data ]
      : tail = "";
  }
</script>

<svelte:head>
	<title>Blog: Articles</title>
</svelte:head>

<BlogView {finished} on:click={fetchNext}>
  <main>
    {#each articles as article (article._id)}
      <ArticleCard {...article} />
    {:else}
      <p>Sorry, nothing was found.</p>
    {/each}
  </main>
</BlogView>

<style>
  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
    gap: var(--spacing-4);
    width: 100%;
    height: min-content;
  }
</style>