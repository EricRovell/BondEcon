<script context="module" lang="ts">
  import type { ArticleRecordCard } from "$components/content";
  
  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
   export async function load({ page, fetch }) {
    const response = await fetch(`/api/blog/articles.json?${page.query?.toString()}`);

    if (response.ok) {
      return {
        props: {
          articles: await response.json()
        }
      };
    }
  }
</script>

<script lang="ts">
  import { BlogView } from "$views";
  import { ArticleCard } from "$components/content";
  import { articlePath } from "$core/routes";

  export let articles: ArticleRecordCard[] = [];
  
  $: tail = articles[articles.length - 1]?._id;
  $: finished = !!tail;
  
  async function fetchNext() {
    const url = new URL(document.URL);
    const query = new URLSearchParams(url.search);

    if (!tail) return;

    query.set("cursor", tail);

    const response = await fetch(`/api/blog/articles.json?${query}`);
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