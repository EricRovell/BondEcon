<script lang="ts">
  import { goto, stores } from "@sapper/app";
  
  import { SearchField, Button } from "@components";
  import { Details } from "@components/layout";
  import { FormFilter } from "@components/input/forms";
  import { SVG, illustrationShootingStar } from "@svg";
  import { message } from "@stores/locale/localeDict.js";
  
  const { page } = stores();
  
  export let finished: boolean;
  
  let query = "";
  
  async function searchIt() {
    const q = new URLSearchParams({ q: query });
    await goto(`${$page.path}?${q}`);
  }
</script>

<!--
  @component
  BlogView Layout Component
  
  Provides a view for blog contents with infinite timeline and filters/search form.
-->
<div>
  <slot />
  <aside>
    <SearchField bind:value={query} on:search={searchIt} />
    <Details title={$message("filters", { defaultMessage: "Filters" })}>
      <FormFilter all />
    </Details>
  </aside>
</div>
<Button on:click appearance="text" disabled={!finished}>
  <span class="load-more">
    <SVG data={illustrationShootingStar} />
    <span>{finished ? "Load more" : "No more content"}</span>
  </span>
</Button>

<style>
  div {
    position: relative;

    display: grid;
    grid-template: auto / auto auto;
    column-gap: var(--spacing-6);
    justify-content: center;

    width: 100%;
    min-height: 75vh;
    margin-bottom: 5vh;
  }

  aside {
    display: grid;
    gap: var(--spacing-2);
    
    position: sticky;
    top: calc(50px + 1.5em);

    height: min-content;
    justify-self: start;
  }
  
  .load-more {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  
  .load-more :global(svg) {
    width: 75px;
    height: 75px;
    margin-bottom: 0.4em;
  }

  @media screen and (max-width: 700px) {
    div {
      grid-template: auto auto / 1fr;
      row-gap: var(--spacing-6);

      margin: var(--spacing-5) 0;
    }

    aside {
      position: initial;

      grid-row: 1;
      grid-column: 1;
      width: 100%;
      overflow-x: hidden;
    }
  }
</style>
