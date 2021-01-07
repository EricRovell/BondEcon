<script lang="ts">
  export let tag: "div" | "ul" | "ol" = "div";
  export let repeat: "auto-fill" | "auto-fit" = "auto-fill";
  export let minsize: string = "275px";
  export let maxsize: string = "1fr";
</script>

<!--
  @component
  GridView Component
  Used as responsive no-media-queries grid container.
  
  Usage:
    ```
      <GridView>
        <Card />
        <Card />
        <Card />
      </GridView>
    ```
  Props:
  
      | Name    | type   | default     | description                                        |
      |:--------|:-------|:------------|:---------------------------------------------------|
      | tag     | string | "div"       | The container's tag. Available as DIV, OL, UL tag. |
      | repeat  | string | "auto-fill" | Repeating pattern.                                 |
      | minsize | string | "275px"     | The minimum size of the card.                      |
      | maxsize | string | "1fr"       | The maximum size of the card                       | 
-->
{#if tag === "ol"}
  <ol
    class="grid"
    style="--minsize: {minsize}; --maxsize: {maxsize}; --repeat: {repeat}">
      <slot />
  </ol>
{:else if tag === "ul"}
  <ul
    class="grid"
    style="--minsize: {minsize}; --maxsize: {maxsize}; --repeat: {repeat}">
      <slot />
  </ul>
{:else}
  <div
    class="grid"
    style="--minsize: {minsize}; --maxsize: {maxsize}; --repeat: {repeat}">
      <slot />
  </div>
{/if}

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--repeat), minmax(var(--minsize), 1fr));
    grid-template-rows: 1fr;
    gap: var(--spacing-4);  
    width: 100%;
  }
</style>