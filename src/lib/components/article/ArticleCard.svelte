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
  
  export let title: string;
  export let date: string | Date;
  export let href: string;
</script>

<article>
  <section class="card">
    <footer class="meta">
      <DateTime {date} {options} />
    </footer>
    <Heading {href} level={2} weight={650} size={3} maxlines={2}>
      {title}
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
    display: grid;
  }
  
  .card {
    display: grid;
    align-items: start;
    row-gap: 0.5em;
    background-color: var(--color-surface-500);
    border: var(--border-1);
    padding: var(--spacing-4, 1em);
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
  }
</style>