<script lang="ts" context="module">
  function renderCount(count: number) {
    return (count > 1000)
      ? `${Math.floor(count / 1000)}k`
      : count;
  }
  
  function renderTag(tag: string, hash: boolean) {
    return `${hash ? "#" : ""}${tag}`;
  }
</script>

<script lang="ts">
  export let tag: string;
  export let count: number | undefined = undefined; 
  export let hash = false;
  export let hrefTemplate: (tag: string) => string;
</script>

<!--
  @component
  Tag Component
-->
{#if hrefTemplate}
  <span class="tag link" class:count title={tag}>
    <a href={hrefTemplate(tag)}>
      <slot />
      {#if count}
        <span>{renderTag(tag, hash)}</span>
        <span>{renderCount(count)}</span>
      {:else}
        {renderTag(tag, hash)}
      {/if}
    </a>
  </span>
{:else}
  <span class="tag" class:count title={tag}>
    <slot />
    {#if count}
      <span>{renderTag(tag, hash)}</span>
      <span>{renderCount(count)}</span>
    {:else}
      {renderTag(tag, hash)}
    {/if}
  </span>
{/if}

<style>
  .tag {
    --min-width: 0;
    --max-width: 12em;
    
    --border-color: hsl(217 27% 35%);
    --shadow-size: 0;
    
    display: inline-block;
    min-width: var(--min-width);
    border-radius: var(--radius-small);
    border: 1px solid var(--border-color);
    box-shadow: 0 0 0 var(--shadow-size) var(--color-3-500);
    padding: var(--spacing-1) var(--spacing-2);
    
    user-select: none;
    cursor: pointer;
    
    transition:
      border-color 0.15s linear,
      box-shadow 0.15s linear,
      transform 0.1s ease-in-out;
  }
  
  .tag:hover,
  .tag:focus {
    --border-color: var(--color-3-500);
    --shadow-size: 0.1em;
  }
  
  .tag:active {
    transform: scale(0.95);
  }
  
  /* variations */  
  .tag.link:not(.count),
  .tag:not(.link).count,
  .tag.link.count a {
    display: flex;
    padding: 0;
  }
  
  .tag.link:not(.count) a,
  .tag:not(.link).count span,
  .tag.link.count span {
    padding: var(--spacing-1) var(--spacing-2);
  }
  
  .tag:not(.link):not(.count) a,
  .tag.link.count {
    padding: 0;
  }
  
  .tag.count span:last-child {
    background-color: var(--color-1-600);
  }
  
  .tag.link:not(.count) a,
  .tag.count span:first-child,
  .tag:not(.link):not(.count) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: var(--min-width);
    max-width: var(--max-width);
  }
</style>