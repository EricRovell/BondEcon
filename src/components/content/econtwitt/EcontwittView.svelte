<script lang="ts" context="module">
  import { copy, share } from "./utils";
</script>

<script lang="ts">
  import { fade } from "svelte/transition";
  import { Article, Button, Tag } from "@components";
  import { DateTime } from "@components/typography";
  import { FlexBox } from "@components/layout";
  import { Icon, iconCopy, iconWebShare } from "@svg";
  
  export let _id: string;
  export let lang: "en" | "ru" | "fr" = "ru";
  export let summary: string;
  export let html: string;
  export let tags: string[] = [];
  export let date: string;
</script>

<!--
  @component
  Econtwitt Blogpost View Component
  
  Renders view for a econtwitt blog post.
  
  Usage:
    ```
      <EcontwittView {...props} />
    ```
    
  Props:
    
    | Name     | Type     | Default  | Description                          |
    |:---------|:---------|:---------|:-------------------------------------|
    | _id      | string   | required | Econtwitt's ObjectID.                |
    | lang     | string   | ru       | Contents' language.                  |
    | html     | string   | required | Econtwitt's contents as html string. |
    | summary  | string   | required | Short description.                   |
    | date     | string   | required | Date of creation.                    |
    | tags     | string[] | []       | Tags list.                           |
    
  Inherited Custom Properties:
  
    | Name               | Type     | Default   | Description                       |
    |:-------------------|:---------|:----------|:----------------------------------|
    | --font-size-1      | <length> | unset     | Date string & tag list font-size. |
    | --font-size-3      | <length> | unset     | Contents font-size.               |
    | --color-1-600      | <color>  | unset     | Card's background color.          |
    | --radius-small     | <length> | 2px       | Card's border-radius.             |
    | --spacing-base-rem | <length> | 0.25rem   | Base spacing length.              |
-->
<article {lang} transition:fade={{ duration: 150 }}>
  <section class="content">
    <Article {html} />
    {#if Array.isArray(tags) && tags.length}
      <FlexBox tag="ol" justify="flex-start" gap="0.5em">
        {#each tags as tag}
        <li>
          <Tag {tag} href={`/blog/econtwitts?tag=${tag}`} />
        </li>
      {/each}
    </FlexBox>
  {/if}
  </section>
  <aside class="panel">
    <Button shape="square" on:click={() => copy({ summary, _id, tags })}>
      <Icon path={iconCopy} color="neutral" />
    </Button>
    <Button shape="square" on:click={() => share()}>
      <Icon path={iconWebShare} color="neutral" />
    </Button>
    <DateTime relative {date} />
  </aside>
</article>

<style>
  article {
    --datetime-font-size: var(--font-size-1);
    
    position: relative;
    
    background-color: var(--color-1-600); 
    max-width: 600px;
    height: min-content;
    border-radius: var(--radius-small, 2px);
    
    font-size: var(--font-size-3);
    line-height: 1.25;
    overflow: hidden;  
  }
  
  .content,
  .panel {
    padding: calc(4 * var(--spacing-base-rem, 0.25rem)); 
  }
  
  .content {
    display: grid;
    gap: 1em;
  }
  
  .panel {
    display: grid;
    grid-template: 1fr / repeat(2, 1.4em) 1fr;
    place-items: center;
    column-gap: 0.85em;
    padding-top: calc(1.5 * var(--spacing-base-rem, 0.25rem));
    padding-bottom: calc(1.5 * var(--spacing-base-rem, 0.25rem)); 
    
    background: hsl(217 27% 23%);
  }
  
  .panel :global(time) {
    justify-self: end;
  }
  
  /* tags font size */
  li {
    font-size: var(--font-size-1);
  }
</style>