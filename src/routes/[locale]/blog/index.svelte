<script context="module" lang="ts">
  import type { Preload } from "@sapper/common";

  export const preload: Preload = async function(this, page) {
    const query = page.query.q;
    
    const response = await this.fetch(`api/blog/search.json?query=${query}`);
    const blogSearchResults = await response.json();

    return {
      blogSearchResults
    };
  }
</script>

<script lang="ts">
  import { goto, stores } from "@sapper/app";
  
  import { message } from "@stores/locale";
  import { Head } from "@components/util";
  import { SearchField } from "@components";
  import { Chip, SearchResult } from "@components/data-display";
  import { Button } from "@components/input";
  import { FlexBox } from "@components/layout";
  import { SVG, Icon, iconRepeat, girlCatchingStars } from "@svg";
  
  import type { SearchResults } from "#types";

  
  const { page, preloading } = stores();
  
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
  
  let search: string = "";
  
  export let blogSearchResults: SearchResults | null = null;
  
  async function searchIt() {
    const query = new URLSearchParams({ q: search });
    await goto(`${$page.path}?${query}`);
  }
  
  async function reset() {
    search = "";
    await searchIt();
  }
</script>

<Head {...meta} />

<main>
  <SearchField
    bind:value={search}
    on:search={searchIt}
    placeholder={$message("placeholder-search", { defaultMessage: "Type to search"})} />
  {#if $preloading}
    <p>Loading...</p>
  {/if}
  {#if blogSearchResults}
    <FlexBox tag="ol" justify="flex-start" gap="0.5em">
      <span class="total">Total search results:</span>
      {#each blogSearchResults.total as { tag: text, count }}
        <li>
          <Chip {text} {count} href={`/blog/${text}`} variant="link" />
        </li>
      {/each}
    </FlexBox>
    <ol class="search-results">
      {#each blogSearchResults.results as { _id, summary, title, type }}
        {#if type === "econtwitt"}
          <SearchResult
            href={`/blogpost/econtwitt-${_id}`}
            {summary}
            category={type}
          />
        {:else if type === "article"}
          <SearchResult
            href={`/blogpost/article-${_id}`}
            {summary}
            {title}
            category={type}
          />
        {/if}        
      {:else}
        <p>Empty</p>
      {/each}
    </ol>
    <Button on:click={reset}>
      <Icon path={iconRepeat} />
      Start over
    </Button>
  {:else}
    <p>
      <SVG data={girlCatchingStars} />
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
  
  .total {
    display: flex;
    place-items: center;
  }
</style>