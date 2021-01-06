<script lang="ts">
  export let href: string;
  export let prefetch = false;
  export let url: string | undefined = undefined;
  export let active = false;
  export let underline: "top" | "bottom" = "bottom";
</script>

<!--
  @component
  TabLink component.
  
  Usage:
    ```
      <TabLink {href} {active} />
    ```
    
  Props:
  
    | Name      | type              | default   | description                                                                       |
    |:----------|:------------------|:----------|:----------------------------------------------------------------------------------|
    | href      | string            | required  | The tab link's href.                                                              |
    | url       | string            | undefined | The current url of the page.                                                      |
    | prefetch  | boolean?          | false     | Controlling the prefetching behaviour of the links.                               |
    | active    | boolean?          | false     | Controlling the active state of the link. If not provided, matched exactly by url |
    | underline | "top" or "bottom" | "bottom"  | Types of underline for links in active state.                                     |    
-->
<li role="tab">
  <a
    {href}
    rel={prefetch ? "prefetch" : undefined}
    class:underline-top={underline === "top"}
    class:underline-bottom={underline === "bottom"}
    aria-current={(active || url === href) ? "page" : undefined}>
      <slot />
  </a>
</li>

<style>
  li:not(:first-child) {
    margin-left: var(--spacing-3);
  }

  a {
    width: 100%;
    text-decoration: none;
    color: var(--color-gray-600);
    cursor: pointer;
    
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--height);
    
    text-transform: capitalize;

    position: relative;
  }
  
  a:hover {
    color: var(--color-gray-800);
  }

  a[aria-current] {
    color: var(--color-gray-900);
  }
  
  a::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--color-3-500);
    transform-origin: 0 0;
    transition: transform 0.15s ease-in-out;
    transform: scaleX(0);
  }

  a.underline-bottom::after {
    bottom: 0;      
    border-radius: var(--radius-medium) var(--radius-medium) 0 0;
  }
  
  a.underline-top::after {
    top: 0;
  }

  a[aria-current]::after {
    transform: scaleX(1);
  }
</style>