<script lang="ts" context="module">
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
</script>

<script lang="ts">
  import DateTime from "../DateTime.svelte";
  
  export let timestamp: string | undefined = undefined;
</script>

<!--
  @component
  Timeline Record.
  Prodives a container for timeline record with timestamp.
  
  Usage:
    ```
      <Timeline>
        <TimelineRecord {timestamp}>
          <Card />
        </TimelineRecord>
      </Timeline>
    ```
    
  Props:
  
      | Name      | type    | default   | description                                       |
      |:----------|:--------|:----------|:--------------------------------------------------|
      | timestamp | string? | undefined | The valid date string to construct a date object. |
-->
<li>
  <span class="timestamp">
    <DateTime date={timestamp} {options} />
  </span>
  <span class="timeline" />
  <div class="content">
    <slot />
  </div>
</li>

<style>
  li {
    --datetime-font-size: var(--font-size-1);
    
    display: grid;
    grid-template: auto 1fr / 10ch 1fr;
    grid-template-areas:
      "timestamp card"
      "timeline card";
    column-gap: var(--spacing-6);
  }
  
  li:not(:last-child) .content {
    padding-bottom: var(--spacing-6);
  }
  
  .timestamp {
    grid-area: timestamp;
    place-self: center;
    
    display: flex;
    justify-content: center;
    border-radius: var(--radius-medium);
    padding: var(--spacing-2);
    background-color: hsl(var(--surface-h) var(--surface-s-500) var(--surface-l-500) / 0.75);
    backdrop-filter: saturate(180%) blur(5px);
    width: 10ch;
    
    position: sticky;
    top: calc(50px + var(--spacing-2));
    
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  .timeline {
    grid-area: timeline;
    justify-self: center;
    
    height: 100%;
    width: 1px;
    background: var(--color-surface-500);
  }
  
  /* set ending of timeline */  
  li:last-child .timeline {
    position: relative;
  }
  
  li:last-child .timeline::after {
    content: "";
    position: absolute;
    width: 1.5em;
    height: 2px;
    bottom: 0;
    left: calc(50% - 0.75em);
    background: var(--color-surface-500);
  }
  
  .content {
    grid-area: card;
  }
  
  @media screen and (max-width: 810px) {
    li {
      grid-template: auto 1fr / 1fr;
      grid-template-areas:
        "timestamp"
        "card";
      row-gap: var(--spacing-6);
    }
    
    .timeline {
      display: none;
    }
    
    .timestamp {
      justify-self: center;
      margin: var(--spacing-2) 0;
    }
  }
</style>