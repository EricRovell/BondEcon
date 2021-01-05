<script lang="ts" context="module">
  function currentHash(node: HTMLElement, hash?: string) {
    if (!hash) return;

    (node.dataset.hash === hash)
      ? node.setAttribute("aria-current", "page")
      : node.removeAttribute("aria-current");

    return {
      update(hash?: string) {
        (hash && node.dataset.hash === hash)
          ? node.setAttribute("aria-current", "page")
          : node.removeAttribute("aria-current");
      }
    };
  }
</script>

<script lang="ts">
  import { stores } from "@sapper/app";

  const { page } = stores();
</script>

<!--
  @component
  Tabs
  
  Usage:
    ```
    
    ```
    
  Props:
  
    | Name | type | default | description |
    |:-----|:-----|:--------|:------------|
    
-->
<ul role="tablist">
  <slot url={$page.path} />
</ul>

<style>
  ul {
    --height: 45px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    background-color: var(--color-1-500);
    width: 100%;
    height: var(--height);
    border-bottom: 1.5px solid hsl(var(--color-gray-800-str) / 0.15);
    margin-bottom: 2.5em;

    position: sticky;
    top: 0;

    z-index: 5;
  }
</style>