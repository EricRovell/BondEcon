<script lang="ts">
  import { message } from "$stores/locale";
  import { Heading } from "$ui/data-display";
  
  export let title: string;
  export let href: string | undefined = undefined;
  export let description: string;
  export let goals: string[];
  export let theses: string[];
</script>

<!--
  @component
  Project Card
  
  View for short project description.
  
  Usage:
    ```
      <Project {...props} />
    ```
    
  Props:
  
    | Name        | type     | default   | description           |
    |:------------|:---------|:----------|:----------------------|
    | title       | string   | required  | Project's title       |
    | href        | string   | undefined | Link to project       |
    | description | string   | required  | Project's description |
    | goals       | string[] | required  | Project's goals list  |
    | theses      | string[] | required  | Project's theses list |
-->
<article>
  <Heading level={3} size={5} weight={500} {href} accent>
    {title}
  </Heading>
  <p class="description">{description}</p>
  {#if goals && Array.isArray(goals) && goals.length}
    <Heading level={4} size={2}>
      {$message("goals", "Goals")}:
    </Heading>
    <ol class="goals">
      {#each goals as goal}
        <li>{goal}</li>
      {/each}
    </ol>
  {/if}
  {#if theses && Array.isArray(theses) && theses.length}
    <Heading level={4} size={2}>
      {$message("theses", "Theses")}:
    </Heading>
    <ol class="theses">
      {#each theses as thesis}
        <li>{thesis}</li>
      {/each}
    </ol>
  {/if}
</article>

<style>
  article {
    display: grid;
    gap: var(--spacing-2);
  }
  
  .description {
    font-size: var(--font-size-2);
  }
  
  ol {
    display: grid;
    gap: var(--spacing-2);
    font-size: var(--font-size-2);
    margin-left: 1.5em;
  }
  
  ol li {
    padding-left: var(--spacing-1);
  }
  
  .theses li::marker {
    content: "»";
    color: var(--color-gray-700);
    font-size: 1.5em;
  }
  
  .goals li::marker {
    content: "✓";
    color: var(--color-gray-700);
    font-size: 1em;
  }
</style>