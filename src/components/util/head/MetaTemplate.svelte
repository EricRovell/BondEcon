<script lang="ts">
  export let prefix: string = "";
  export let meta: Partial<Record<string, string>> | undefined = undefined;
</script>

<!--
  @component
  MetaTemplate component
  
  Creates `<meta />` tags in `<head />` tag from structured data.
  
  Usage:
    ```
      <MetaTemplate {meta} prefix="og:" />
    ```

  Props:
  
    | Name   | type                   | default   | description                                                  |
    |:-------|:-----------------------|:----------|:-------------------------------------------------------------|
    | meta   | Record<string, string> | undefined | structured record with keys as name and properties as values |
    | prefix | string                 | ""        | prefix to append before name                                 |
-->
<svelte:head>
  {#if meta}
    {#each Object.entries(meta) as [ name, content ]}
      <meta name={`${prefix}${name}`} {content} />
    {/each}
  {/if}
</svelte:head>