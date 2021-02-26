<script context="module" lang="ts">
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
</script>

<script lang="ts">
  import { Head } from "@components/head";
  import type { HeadMeta } from "@components/head";
  
  import { Article, Tag } from "@components";
  import { DateTime } from "@components/typography";  
  import { FlexBox, FadingEdge } from "@components/layout";
  import { Icon, iconQuillFilled, iconTag, iconEye, iconTime } from "@components/svg";
  import { Heading } from "@components/typography";
  
  export let _id: string;
  export let html: string;
  export let title: string;
  export let summary: string;
  export let author: string;
  export let category: string;
  export let date: string;
  export let tags: string[];
  
  const head: HeadMeta = {
    title,
    meta: {
      description: summary
    },
    og: {
      url: `/blogpost/article-${_id}`
    }
  }
</script>

<!--
  @component
  Article Page View
  
  Renders view for a blog post.
  
  Usage:
    ```
      <ArticleView {...props} />
    ```
    
  Props:
    
    | Name     | Type     | Default  | Description                      |
    |:---------|:---------|:---------|:---------------------------------|
    | _id      | string   | required | Article ObjectID.                |
    | html     | string   | required | Article contents as html string. |
    | title    | string   | required | Self-explanatory.                |
    | summary  | string   | required | Short description.               |
    | author   | string   | required | Article's author name.           |
    | category | string   | required | Self-explanatory.                |
    | date     | string   | required | Date of creation.                |
    | tags     | string[] | []       | Tags list.                       |
    
  Inherited Custom Properties:
  
    | Name                | Type     | Default   | Description                          |
    |:--------------------|:---------|:----------|:-------------------------------------|
    | --font-secondary    | <string> | system-ui | Article's title font family.         |
    | --font-size-2       | <length> | unset     | Article's summary text font size.    |
    | --font-size-3       | <length> | unset     | Article's contents font size.        |
    | --spacing-4         | <color>  | 1.25em    | Meta and aside contents spacing gap. |
    | --spacing-5         | <length> | 1em       | Article's header spacing gap.        |
    | --color-surface-400 | <color>  | unset     | Article's header background color    |
-->
<Head {...head} />
<header>
  <Heading level={1} size={9} decorated>
    {title}
  </Heading>
  <p>{summary}</p>
  <div class="meta">
    <div>
      <span><Icon path={iconQuillFilled} color="primary" margin="0 0.4em 0 0" /></span>
      <span>{author}</span>
    </div>
    <div>
      <Icon path={iconTime} color="primary" margin="0 0.4em 0 0" />
      <DateTime options={dateOptions} {date} />
    </div>
    <div>
      <span><Icon path={iconTag} color="primary" margin="0 0.4em 0 0" /></span>
      <span>{category}</span>
    </div>
    <div>
      <span><Icon path={iconEye} color="primary" margin="0 0.4em 0 0" /></span>
      <span>{12023}</span>
    </div>
  </div>
</header>
<FadingEdge />
<main>
  <Article {html} />
</main>
<aside>
  <FlexBox tag="ul" gap="0.5em" justify="flex-start">
    {#each tags as tag}
      <li>
        <Tag {tag} />
      </li>
    {/each}
  </FlexBox>
</aside>

<style>
  header {
    display: grid;
    row-gap: var(--spacing-5);
    place-self: center;
    place-items: center;
    padding: 15vh 0;  
    width: 100%;
    
    text-align: center;
    background: var(--color-surface-400);
  }
  
  header :global(h1) {
    font-family: var(--font-secondary);
  }
  
  header p {
    font-style: italic;
  }
  
  .meta {
    display: flex;
    place-items: space-evenly center;
    gap: var(--spacing-4, 1em);
    
    font-size: var(--font-size-2);
  }
  
  .meta > div {
    display: flex;
    place-items: center;
  }
  
  main,
  aside {
    width: min(100%, 768px);
    padding: var(--spacing-4, 1em) 0;
  }
  
  main {
    display: grid;
    place-self: center;
    margin-bottom: 5vh;
    
    font-size: var(--font-size-3);
  }
  
  aside {
    place-self: start center;
  }
  
  aside > :global(.list) {
    place-content: start start;
  }
</style>