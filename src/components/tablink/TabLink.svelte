<script lang="ts">
  export let href: string;
  export let prefetch = false;
  export let url: string | undefined = undefined;
  export let active = false;
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
<li role="tab">
  <a
    {href}
    rel={prefetch ? "prefetch" : undefined}
    aria-current={active || (url === href) ? "page" : undefined}>
      <div>
        <slot />
      </div>
  </a>
</li>

<style>
  li:not(:first-child) {
    margin-left: var(--spacing-3);
  }

  a {
    width: 100%;
    text-decoration: none;
    color: var(--color-gray-400);
    cursor: pointer;
  }
  
  a:hover {
    color: var(--color-gray-600);
  }

  a[aria-current] {
    color: var(--color-gray-900);
    border-bottom: 2px solid red;
  }

  a > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--height);

    position: relative;
  }

  div::after {
    content: "";

    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.2em;
    border-radius: var(--radius-medium) var(--radius-medium) 0 0;
    background: var(--color-3-500);

    transform: scaleX(0);
    transform-origin: 0 0;
    transition: transform 0.15s ease-in-out;
  }

  a[aria-current] > div::after {
    transform: scaleX(1);
  }

  div {
    text-transform: capitalize;
  }
</style>