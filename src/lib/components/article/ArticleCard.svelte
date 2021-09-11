<script lang="ts" context="module">
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  };
</script>

<!--
  @component
  Article Card
  
  Provides information about article contents.
  
  Usage:
    ```
      <ArticleCard {...props} />
    ```
    
  Props:
    
    | Name     | Type   | Default  | Description           |
    |:---------|:-------|:---------|:----------------------|
    | title    | string | required | Self-explanatory.     |
    | summary  | string | required | Short description.    |
    | category | string | required | Self-explanatory.     |
    | date     | string | required | Date of creation.     |
    | cover    | string | -        | Cover image hypelink. |
    
  Inherited Custom Properties:
  
    | Name                | Type     | Default  | Description                 |
    |:--------------------|:---------|:---------|:----------------------------|
    | --color-surface-500 | <color>  | unset    | Card's background color.    |
    | --spacing-4         | <length> | 1em      | Card's padding.             |
    | --font-size-1       | <length> | unset    | Category & date font-size.  |
    | --color-primary     | <color>  | unset    | Category & date font color. |
-->
<script lang="ts">
  import Button from "../Button.svelte";
  import Heading from "../Heading.svelte";
  import DateTime from "../DateTime.svelte";
  import { Icon, iconArrowNext } from "../svg";
  import { articlePath } from "@core/routes";
  
  export let _id: string;
  export let title: string;
  export let summary: string;
  export let category: string;
  export let date: string | Date;
  export let cover: string = "/img/article-cover-default";
  export let href: string = $articlePath(_id);
</script>

<article>
  <picture class="cover">
    <source srcset={`${cover}.webp`} type="image/webp" alt={title}>
    <source srcset={`${cover}.jpg`} type="image/jpeg" alt={title}>
    <img src={`${cover}.jpg`} alt={title}>
  </picture>
  <section class="card">
    <footer class="meta">
      <span class="category">{category}</span>
      <DateTime {date} {options} />
    </footer>
    <Heading {href} level={2} weight={650} size={3} maxlines={2}>
      {title}
    </Heading>
    <Heading level={3} weight={400} size={1} maxlines={4}>
      {summary}
    </Heading>
    <Button {href} prefetch appearance="text">
      <Icon path={iconArrowNext} size="1.5em" color="primary" />
      Read
    </Button>
  </section>
</article>

<style>
  article {
    width: 100%;
    height: 100%;
    min-height: 150px;
    
    display: grid;
    grid-template: 175px 2em 1fr / 1fr;
  }
  
  .cover {
    grid-row: 1 / span 2;
    grid-column: 1;
  }

  picture {
    display: block;
    width: 100%;
    overflow: hidden;
  }

  picture img {
    object-fit: cover;
    object-position: center;
    transition: transform 0.35s ease-in-out;
    width: 100%;
    height: 100%;
    border: var(--border-1);
  }
  
  .card {
    display: grid;
    grid-template-rows: repeat(3, min-content) 1fr;
    align-items: start;
    row-gap: 1em;
    
    background-color: var(--color-surface-500);
    border: var(--border-1);
    width: 92%;
    
    grid-row: 2 / span 2;
    grid-column: 1;
    justify-self: center;
    
    padding: var(--spacing-4, 1em);
  }
  
  /* .card :global(a) */
  
  .category {
    display: flex;
    justify-content: center;
    align-items: center;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    
    cursor: pointer;
  }
  
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    font-size: var(--font-size-1);
    color: var(--color-primary);
  }
  
  article :global(a) {
    place-self: end;
    margin-top: 2em;
  }
</style>