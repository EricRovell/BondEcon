<script lang="ts" context="module">
  import type { Preload } from "@sapper/common";
  
  export const preload: Preload = async function(this, page) {
    const response = await this.fetch(`api/blog/econtwitts/${page.params.id}.json`);

    if (response.status === 200) {
      const post = await response.json();
      return {
        post
      };
    }

    this.error(404, "Not Found");
  }
</script>

<script lang="ts">
  import { EcontwittCard } from "@core/components/content";
  import type { EcontwittRecordCard } from "@core/components/content";

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
