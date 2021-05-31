<script lang="ts">
  import { Icon, iconLocation } from "$ui/svg";
  import { Heading } from "$ui/data-display";
  
  export let organization: string;
  export let href: string | undefined = undefined;
  export let degree: string;
  export let location: string;
</script>

<!--
  @component
  Education Card
  
  View for education description, should be used as part of CV section.
  
  Usage:
    ```
      <Education {...props} />
    ```
    
  Props:
  
    | Name         | type     | default   | description                     |
    |:-------------|:---------|:----------|:--------------------------------|
    | organization | string   | required  | Name of the organization        |
    | href         | string   | undefined | Link to organizations's website |
    | degree       | string   | required  | Degree title                    |
    | location     | string   | required  | Organization location           |
-->
<article>
  <Heading level={3} size={5} weight={500} {href} accent>
    {organization}
  </Heading>
  <Heading level={3} size={3} weight={500}>
    {degree}
  </Heading>
  <address>
    <Icon path={iconLocation} color="primary" />
    <span>{location}</span>
  </address>
</article>

<style>
  address {
    display: flex;
    place-items: center;
    font-size: var(--font-size-2);
    
    margin-bottom: 0.75em;
  }
</style>