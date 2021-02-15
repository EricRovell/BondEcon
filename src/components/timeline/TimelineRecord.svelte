<script lang="ts" context="module">
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
</script>

<script lang="ts">
  import { DateTime } from "@components/typography";
  
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
  <DateTime date={timestamp} {options} />
  <span class="timeline" />
  <div class="content">
    <slot />
  </div>
</li>

<style>
  li {
    --date-width: 7em;
    
    display: grid;
    grid-template: auto 1fr / var(--date-width) 1fr;
    grid-template-areas:
      "timestamp card"
      "timeline card";
    column-gap: var(--spacing-6);
  }
  
  li:not(:last-child) .content {
    padding-bottom: var(--spacing-6);
  }
  
  li :global(time) {
    grid-area: timestamp;
    align-self: start;
    
    display: flex;
    justify-content: center;
    
    position: sticky;
    top: calc(50px + var(--spacing-2));
    
    padding: var(--spacing-2);
    background: var(--color-1-600);
  }
  
  .timeline {
    grid-area: timeline;
    justify-self: center;
    
    height: 100%;
    width: 1px;
    background: var(--color-1-600);
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
    background: var(--color-1-600);
  }
  
  .content {
    grid-area: card;
  }
  
  @media screen and (max-width: 810px) {
    li {
      --date-width: 1.5em;
    }
    
    li :global(time) {
      writing-mode: vertical-lr;
      border-top: 2px solid var(--color-1-700);
    }
  }
  
  @media screen and (max-width: 640px) {
    li {
      --date-width: 1.5em;
    }
    
    li :global(time) {
      font-size: var(--font-size-1);
    }
  }
</style>