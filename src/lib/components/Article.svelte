<script lang="ts">
  export let html: string;
</script>

<article>
  {@html html}
</article>

<!--
  @component
  Article Components.
  Renders HTML article from a string.
  
  Usage:
    ```
      <Article {html} />
    ```
  
  Props:
    
    | Name | Type   | Default | Description           |
    |:-----|:------ |:--------|:----------------------|
    | html | string | -       | HTML contents string. |
-->
<style>
  article {
    display: grid;
    row-gap: var(--spacing-4);
  }
  
  article :global(p) {
    text-indent: 0.25em;
    line-height: 1.3;
  }

  article :global(figure),
  article :global(img) {
    max-width: 100%;
    border-radius: 5px;
  }
  
  article :global(a) {
    font-size: inherit;
    transition: background-position 80ms ease-out 0s;
    background-image: linear-gradient(transparent 0px, var(--color-primary) 0px);
    background-repeat: no-repeat;
    box-shadow: none;
    padding: 0 0.25em;
    text-decoration: none;
    background-position: 0px 1em;
  }
  
  article :global(a:hover) {
    background-position: 0px 0px;
    color: var(--color-gray-200);
  }
  
  article :global(ul) {
    font-size: var(--font-size-2);
    margin-left: 1em;
  }
  
  article :global(ul li) {
    padding-left: var(--spacing-2);
  }
  
  article :global(ul li:not(:last-child)) {
    margin-bottom: 0.35em;
  }
  
  article :global(ul li::marker) {
    content: "✓";
    color: var(--color-gray-700);
    font-size: 1em;
  }
</style>