<script lang="ts" context="module">
  export interface AccordeonItem {
    href?: string;
    label: string;
    open?: boolean | undefined;
    items?: AccordeonItem[];
  }

  export type AccordeonItems = AccordeonItem[];
</script>

<script lang="ts">
  import Details from "./Details.svelte";
  
  export let items: AccordeonItems = [];
</script>

<ul>
  {#each items as { open, items, label, href }}
    {#if items}
      <Details {open} title={label} type="accordion">
        <svelte:self {items} />
      </Details>
    {:else}
      <a {href}>
        {label}
      </a>
    {/if}
  {/each}
</ul>