<script lang="ts" context="module">
  type Tag = "div" | "ol" | "ul";
  
  type Direction = "row" | "row-reverse" | "column" | "column-reverse";
  type Wrap = "nowrap" | "wrap" | "wrap-reverse";
  
  type Alignment = "flex-start" | "center" | "flex-end";
  
  type JustifyContent = Alignment | "space-between" | "space-around" | "space-evenly";
  type AlignItems = Alignment | "baseline" | "stretch";
  type AlignContent = Alignment | "space-between" | "space-around" | "stretch" | "unset";
</script>

<script lang="ts">
  export let tag: Tag = "div";
  
  export let inline = false;
  
  export let direction: Direction = "row";
  export let wrap: Wrap = "wrap";
  export let gap: string = "0";
  
  export let justify: JustifyContent = "center";
  export let align: AlignItems = "center";
  export let alignContent: AlignContent = "unset";
</script>

<!--
  @component
  FlexBox Layout Component
  
  Usage:
    ```
      <FlexBox>
        <Item />
        <Item />
        <Item />
      </FlexBox>
    ```
    
  Props:
  
    | Name         | type            | default  | description                                      |
    |:-------------|:----------------|:---------|:-------------------------------------------------|
    | tag          | Tag?            | "div"    | setting the tag for the container                |
    | inline       | boolean?        | false    | setting display to "inline-flex"                 |
    | direction    | Direction?      | "center" | Setting the main axis                            |
    | wrap         | Wrap?           | "wrap"   | Should the items wrap and how                    |
    | gap          | string?         | "0"      | Specified gap between flex items                 |
    | justify      | JustifyContent? | "center" | How to distribute extra space on the main axis.  |
    | align        | AlignItems?     | "center" | How items should be laid out on the cross axis   |
    | alignContent | AlignContent?   | "unset"  | How to distribute extra space on the cross axis. |
-->
{#if tag === "div"}
  <div
    class="flex"
    class:inline
    style="
      --flow: {direction} {wrap};
      --justify-content: {justify};
      --align-items: {align};
      --align-content: {alignContent};
      --gap: {gap};
    ">
      <slot />
  </div>
{:else if tag === "ul"}
  <ul
    class="flex"
    class:inline
    style="
      --flow: {direction} {wrap};
      --justify-content: {justify};
      --align-items: {align};
      --align-content: {alignContent};
      --gap: {gap};
    ">
      <slot />
</ul>
{:else if tag === "ol"}
  <ol
    class="flex"
    class:inline
    style="
      --flow: {direction} {wrap};
      --justify-content: {justify};
      --align-items: {align};
      --align-content: {alignContent};
      --gap: {gap};
    ">
      <slot />
  </ol>
{/if}

<style>
  .flex {
    display: flex;
    flex-flow: var(--flow);
    gap: var(--gap);
    width: 100%;
    height: min-content;
    
    justify-content: var(--justify-content);
    align-items: var(--align-items);
    align-content: var(--align-content, unset);
  }
  
  .inline {
    display: inline-flex;
    width: unset;
  }
  
  ol,
  ul {
    list-style: none;
  }
  
  /* glex gap fallback */  
  @supports (not (gap: 1em)) and (display: flex) {
    .flex {
      --gap: var(--gap);
      
      margin: 0 calc(-1 * var(--gap));
      padding-left: var(--spacing-2);
    }
    
    .flex > :global(*) {
      --half-gap: calc(0.5 * var(--gap));
      margin: var(--gap) var(--half-gap) 0 var(--half-gap);
    }
  }
</style>