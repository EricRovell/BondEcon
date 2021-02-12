<script lang="ts">
  import { getContext } from "svelte";
  import { active } from "./active";
  
  export let href: string;
  export let prefetch = false;
  export let pattern: RegExp | null = null;
  export let decoration: "top" | "bottom" = "bottom";
  
  const page = getContext("page");
</script>

<!--
  @component
  Navigation Item component.
  
  Usage:
    ```
      <Navigation>
        <NavItem />
        <NavItem />
      </Navigation>
    ```
    
  Props:
  
    | Name       | type              | default   | description                                                                       |
    |:-----------|:------------------|:----------|:----------------------------------------------------------------------------------|
    | href       | string            | required  | The navigation item hyperlink.                                                    |
    | prefetch   | boolean?          | false     | Controlling the prefetching behaviour of the links.                               |
    | pattern    | RegExp?           | null      | RegExp literal for matching the active state of the current link.                 |
    | decoration | "top" or "bottom" | "bottom"  | Types of underline for links in active state.                                     |    
-->
<li>
  <a
    class="nav-link underline-{decoration}"
    {href}
    use:active={{ current: $page.path, pattern }}
    rel={prefetch ? "prefetch" : undefined}>
      <slot />
  </a>
</li>

<style>
  li:not(:first-child) {
    margin-left: var(--spacing-3);
  }

  .nav-link {
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: var(--color-gray-600);
    cursor: pointer;
    
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--navigation-height);
    
    text-transform: capitalize;

    position: relative;
  }
  
  .nav-link:hover {
    color: var(--color-gray-800);
  }
  
  .nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--color-3-500);
    transform-origin: 0 100%;
    transition: transform 0.25s ease-in-out;
    transform: scaleY(0);
  }

  .nav-link.underline-bottom::after {
    transform-origin: 0 100%;
    bottom: 0;
    border-radius: var(--radius-medium) var(--radius-medium) 0 0;
  }
  
  .nav-link.underline-top::after {
    transform-origin: 100% 0%;
    top: 0;
  }
  
  li :global(.nav-link[aria-current]) {
    color: var(--color-gray-900);
  }

  li :global(.nav-link[aria-current]::after) {
    transform: scaleY(1);
  }
</style>