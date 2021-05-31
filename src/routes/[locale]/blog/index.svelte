<script context="module" lang="ts">
  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
   export async function load({ page, fetch }) {
    const q = page.query.get("q");
    
    if (!q) {
      return {
        props: {
          data: null,
          total: null
        }
      };
    }
    
    const response = await fetch(`/api/blog/search.json?q=${q}`);
    const { data, total } = await response.json();
    
    if (response.ok) {
      return {
        props: {
          data,
          total
        }
      }
    }
  }
</script>

<script lang="ts">
  import { page, navigating } from "$app/stores";
  import { goto } from "$app/navigation";
  import { articlePath, econtwittPath } from "$core/routes";

  import { message } from "$stores/locale";
  import { Head, SearchField, FlexBox } from "$ui";
  import { Chip, SearchResult } from "$ui/data-display";
  import { SVG, girlCatchingStars } from "$ui/svg";
  
  const meta  = {
    title: "Bondecon: Blog Section",
    meta: {
      description: "Latest econtwitts and publications about economics and more!",
      pagename: "BondEcon: Blog Section"
    },
    og: {
      type: "article",
      image: "img/author.jpg"
    }
  };
  
  // query
  let q: string = "";
  
  export let data = null;
  export let total = null;
  
  async function doSearch() {
    await goto(`${$page.path}?q=${q}`);
  }
  
  async function clearSearch() {
    q = "";
    await goto(`${$page.path}`);
  }
</script>

<Head {...meta} />
<main>
  <SearchField
    bind:value={q}
    on:search={doSearch}
    on:cancel={clearSearch}
    placeholder={$message("placeholder-search", "Type to search")}
  />
  <!-- Fetching -->
  {#if $navigating}
    <p>Loading...</p>
  <!-- Show results if present -->
  {:else if Array.isArray(data) && data.length}
    <FlexBox tag="ol" justify="flex-start" gap="0.5em">
      {#each total as { type: text, count }}
        <li>
          <Chip {text} {count} href={`/blog/${text}`} variant="link" />
        </li>
      {/each}
    </FlexBox>
    <ol class="search-results">
      {#each data as { _id, summary, title, type }}
        {#if type === "econtwitt"}
          <SearchResult
            href={$econtwittPath(_id)}
            {summary}
            category={type}
          />
        {:else if type === "article"}
          <SearchResult
            href={$articlePath(_id)}
            {summary}
            {title}
            category={type}
          />
        {/if}        
      {:else}
        <p>Empty</p>
      {/each}
    </ol>
  <!-- Illustration -->
  {:else}
    <p>
      <SVG data={girlCatchingStars} size="400px" />
    </p>
  {/if}
</main>

<style>
  main > :global(button) {
    font-size: var(--font-size-5);
  }
  
  main {
    place-self: center;
    
    display: grid;
    justify-items: center;
    gap: var(--spacing-6);
    
    position: relative;
    width: min(640px, 100%);
  }
  
  .search-results {
    display: grid;
    gap: var(--spacing-2);
  }
</style>