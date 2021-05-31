<script context="module" lang="ts">
  import type { EcontwittRecordCard } from "$components/content";
  
  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
   export async function load({ page, fetch }) {
    const response = await fetch(`/api/blog/econtwitts.json?limit=10&${page.query}`);

    if (response.ok) {
      return {
        props: {
          econtwitts: await response.json()
        }
      };
    }
  }
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import { BlogView } from "$views";
  import { EcontwittCard } from "$components/content";

  export let econtwitts: EcontwittRecordCard[] = [];
  
  $: cursor = econtwitts[econtwitts.length - 1]?._id;
  $: finished = !!cursor;
  
  async function fetchNext() {
    if (!cursor) return;
    
    const { query } = $page;
    query.set("cursor", cursor);

    const response = await fetch(`/api/blog/econtwitts.json?${query}&limit=10`);
    const data = await response.json();

    (data && data?.length)
      ? econtwitts = [ ...econtwitts, ...data ]
      : cursor = "";
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