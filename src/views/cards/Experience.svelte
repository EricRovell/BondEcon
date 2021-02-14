<script lang="ts">
  import { Icon, iconLocation } from "@components/svg";
  import { Heading } from "@components/typography";
  
  export let organization: string;
  export let href: string | undefined = undefined;
  export let title: string;
  export let location: string;
  export let activities: string[] | undefined = undefined;
</script>

<!--
  @component
  Experience Card
  
  View for experience description, should be used as part of CV section.
  
  Usage:
    ```
      <Experience {...props} />
    ```
    
  Props:
  
    | Name         | type     | default   | description                     |
    |:-------------|:---------|:----------|:--------------------------------|
    | organization | string   | required  | Name of the organization        |
    | href         | string   | undefined | Link to organizations's website |
    | title        | string   | required  | Job title                       |
    | location     | string   | required  | Organization location           |
    | activities   | string[] | undefined | Activities list                 |
-->
<article>
  <Heading level={3} size={5} weight={500} {href} accent>
    {organization}
  </Heading>
  <Heading level={4} size={3} weight={500}>
    {title}
  </Heading>
  <address>
    <Icon path={iconLocation} color="primary" />
    <span>{location}</span>
  </address>
  {#if activities && Array.isArray(activities) && activities.length}
    <ul>
      {#each activities as activity}
        <li>
          <span>{activity};</span>  
        </li>
      {/each}
    </ul>
  {/if}
</article>

<style>
  address {
    display: flex;
    place-items: center;
    font-size: var(--font-size-2);
    
    margin-bottom: 0.75em;
  }
  
  ul {
    font-size: var(--font-size-2);
    margin-left: 1em;
  }
  
  ul li {
    padding-left: var(--spacing-2);
  }
  
  ul li:not(:last-child) {
    margin-bottom: 0.35em;
  }
  
  li::marker {
    content: "✓";
    color: var(--color-gray-700);
    font-size: 1em;
  }
</style>