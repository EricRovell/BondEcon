<script lang="ts">
  export let node: HTMLElement | null = null;
  export let title: string | undefined = undefined;
</script>

<!--
  @component
  Timeline Component
  Provides a wrapper for timeline title and items.
  
  Usage:
    ```
      <Timeline>
        <header slot="title">
          Timeline section title
        </header>
        <TimelineItem />
        <TimelineItem />
        <TimelineItem />
      </Timeline>
    ```
    
    Props:
    
      | Name  | type        | default     | description                                       |
      |:------|:------------|:------------|:--------------------------------------------------|
      | node  | HTMLElement | HTMLElement | The sections node references. Useful for binding. |
      | title | string?     | undefined   | The data-title attribute.                         |
      
    Slots:
    
      | Name    | fallback                     | description                                                |
      |:--------|:-----------------------------|:-----------------------------------------------------------|
      | title   | header with title prop value | Provides a slot for placing a title for the timeline items |
      | default | none                         | Prodives a slot for timeline items in ordered list element |
-->
<section bind:this={node} data-title={title}>
  <slot name="title">
    <header>{title}</header>
  </slot>
  <ol>
    <slot />
  </ol>
</section>

<style>
  section {
    display: grid;
    gap: var(--spacing-4);
  }
  
  ol {
    display: grid;
    margin-top: var(--spacing-6);
  } 
</style>