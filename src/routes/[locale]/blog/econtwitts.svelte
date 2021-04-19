<script context="module" lang="ts">
  import type { Preload } from "@sapper/common";
  import type { EcontwittRecordCard } from "@core/components/content";

  import { fetchAll } from "@util";

  export const preload: Preload = async function(this, page) {
    const uriList = [
      `api/blog/econtwitts.json?${new URLSearchParams({ ...page.query })}`
    ];

    const [ econtwitts ]: [ EcontwittRecordCard[] ] = await fetchAll(uriList, this.fetch);

    return {
      econtwitts
    };
  }
</script>

<script lang="ts">
  import { BlogView } from "@views";
  import { EcontwittCard } from "@core/components/content";

  export let econtwitts: EcontwittRecordCard[] = [];
  
  $: tail = econtwitts[econtwitts.length - 1]?._id;
  $: finished = !!tail;
  
  async function fetchNext() {
    const url = new URL(document.URL);
    const query = new URLSearchParams(url.search);
    
    if (!tail) return;

    query.set("tail", tail);

    const response = await fetch(`api/blog/econtwitts.json?${query}`);
    const data = await response.json();

    (data && data?.length)
      ? econtwitts = [ ...econtwitts, ...data ]
      : tail = "";
  }
</script>

<svelte:head>
	<title>Blog: Econtwitts</title>
</svelte:head>

<BlogView {finished} on:click={fetchNext}>
  <main>
    {#each econtwitts as econtwitt (econtwitt._id)}
      <EcontwittCard {...econtwitt} />
    {:else}
      <p>Sorry, nothing was found.</p>
    {/each}
  </main>
</BlogView>

<style>
  main {
    display: grid;
    grid-auto-rows: min-content;
    row-gap: 2em;
  }

  @media screen and (max-width: 700px) {
    main {
      grid-row: 2;
      grid-column: 1;
      row-gap: var(--spacing-6);
    }
  }
</style>