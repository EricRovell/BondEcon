<script lang="ts" context="module">
  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
   export async function load({ page, fetch }) {
    const response = await fetch(`/api/blog/econtwitts/${page.params.id}.json`);
    
    if (response.ok) {
      return {
        props: {
          post: await response.json()
        }
      };
    }
  }
</script>

<script lang="ts">
  import { EcontwittCard } from "$components/content";
  import type { EcontwittRecordCard } from "$components/content";

  export let post: EcontwittRecordCard;
</script>

<svelte:head>
	<title>Econtwitts</title>
</svelte:head>
<main>
  <EcontwittCard {...post} />
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    min-height: calc(50vh);
  }
</style>
