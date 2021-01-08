<script lang="ts" context="module">
  interface Tab {
    href: string;
    label: string;
    hash?: string;
    id?: string;
  }
</script>

<script lang="ts">
  import { stores } from "@sapper/app";
  import TabLink from "./TabLink.svelte";
  
  export let tabs: Tab[] = [];
  export let fullWidth = false;
  export let prefetch = false;
  export let underline: "top" | "bottom" = "bottom";
  export let exact = false;
  export let activeID: string | undefined = undefined;

  const { page } = stores();
</script>

<!--
  @component
  TabsLinkList Component
  Wrapper for Links used as Tabs for navigation.
  
  Usage:
    - Tabs can be generated from object:
      ```
        <Tabs {tabs} />
      ```
    - Tabs can be included as slotted content. Component can provide value of the current URL to the slot:
      ```
        <Tabs let:url>
          <Tab {url} />
          <Tab {url} />
        </Tabs>
      ```
    
  Props:
  
    | Name      | type              | default  | description                                                                  |
    |:----------|:------------------|:---------|:-----------------------------------------------------------------------------|
    | tabs      | Tab[]?            | []       | Tabs object. Used to construct tabs. If not provided, the slot is provided.  |
    | fullWidth | boolean?          | false    | TabsList will take all the available width.                                  |
    | prefetch  | boolean?          | false    | Controlling prefetching behaviour of tab links.                              |
    | underline | "top" or "bottom" | "bottom" | How active links should be underlined with active state                      |
    | exact     | boolean?          | false    | Active tabs href should be match with the url exactly.                       |
-->
<ul
  role="tablist"
  class:full-width={fullWidth}
  class:remove-border={underline === "top"}>
    {#if tabs.length}
      {#each tabs as { label, href, id }}
        <TabLink
          {href}
          {underline}
          {prefetch}
          url={exact && $page.path}
          active={(activeID && id === activeID) || (!exact && !exact && `/${$page.path.split("/")[1]}` === href)}
        >
          {label}
        </TabLink>
      {/each}
    {:else}
      <slot url={$page.path} />
    {/if}
</ul>

<style>
  ul {
    --height: 50px;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    width: fit-content;
    height: var(--height);
    background-color: var(--color-1-500);
    border-bottom: 1.5px solid hsl(var(--color-gray-800-str) / 0.15);

    position: sticky;
    top: 0;

    z-index: 5;
  }
  
  .remove-border {
    border-bottom: none;
  }
  
  .full-width {
    width: 100%;
  }
</style>