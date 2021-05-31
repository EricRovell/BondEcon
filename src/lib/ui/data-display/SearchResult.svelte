<script lang="ts">
  import Heading from "./Heading.svelte";
  
  export let href: string;
  export let title: string | undefined = undefined;
  export let summary: string;
  export let category: string | undefined = undefined;
</script>

<!--
  @component
  Search Result Card Component
  
  Usage:
    ```
      <SeachResult {...props} />
    ```
    
  Props:
  
    | Name     | Type    | Default   | Description               |
    |:---------|:--------|:----------|:--------------------------|
    | href     | string  | -         | Search result's hyperlink |
    | title    | string? | undefined | Search result's header    |
    | summary  | string  | string    | Search result's summary   |
    | category | string? | undefined | Search result's category  |
    
  Inherited Custom Props:
  
    | Name     | Type    | Default   | Description               |
    |:---------|:--------|:----------|:--------------------------|
    | --color-surface-500 |
    | --spacing-1
    | --spacing-2
    | --font-size-1
    | --font-size-2
-->
<article>
  <a {href}>
    {#if category}
      <span>{category}</span>
    {/if}
    {#if title}
      <Heading level={2} size={2} ellipsis>
        {title}
      </Heading>
    {/if}
    <p>{summary}</p>
  </a>
</article>

<style>
  article {
    width: 100%;
  }
  
  article:hover {
    background-color: var(--color-surface-500);
  }
  
  a {
    display: grid;
    row-gap: var(--spacing-1);
    padding: var(--spacing-2);
    width: 100%;
  }
  
  span {
    font-size: var(--font-size-1);
    opacity: 0.75;
  }
  
  p {
    font-size: var(--font-size-2);
    
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>