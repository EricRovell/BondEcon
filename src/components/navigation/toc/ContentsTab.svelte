<script lang="ts">
  export let href: string;
  export let active = false;
</script>

<!--
  @component
  Contents Tab Component.
  Used to as section element for tabular table of contents.
  
  Usage:
    ```
      <ContentsTabular>
        <ContentsTab {href} {active} />
      </ContentsTabular>
    ```
    
  Props:
  
    | Name      | type              | default   | description                                |
    |:----------|:------------------|:----------|:-------------------------------------------|
    | href      | string            | required  | The tab link's hyperlink.                  |
    | active    | boolean?          | false     | Controlling the active state of the link.  |
    
  Inherited Custom Properties:
  
    | Name             | type     | default | description                                |
    |:-----------------|:---------|:--------|:-------------------------------------------|
    | --color-gray-600 | <color>  | unset   | Anchor's passive state font color.         |
    | --color-gray-800 | <color>  | unset   | Anchor's hover state font color.           |
    | --color-gray-900 | <color>  | unset   | Anchor's active state font color.          |
    | --color-primary  | <color>  | unset   | Active link underline color.               |
    | --radius-medium  | <length> | 5px     | Active link underline border-radius.       |
    | --spacing-3      | <length> | 0.75em  | Gap between the tabs.                      |
-->
<li>
  <a
    {href}
    aria-current={active ? "page" : undefined}>
      <slot />
  </a>
</li>

<style>
  li,
  a {
    height: 100%;
  }
  
  li:not(:first-child) {
    margin-left: var(--spacing-3, 0.75em);
  }

  a {
    position: relative;
    
    display: flex;
    justify-content: center;
    align-items: center;  
    width: 100%;
    
    text-decoration: none;
    text-transform: capitalize;
    color: var(--color-gray-600);
    cursor: pointer;
  }
  
  a:hover {
    color: var(--color-gray-800);
  }

  a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4px;
    background: var(--color-primary);
    border-radius: var(--radius-medium, 5px) var(--radius-medium, 5px) 0 0;
    transform-origin: 0 100%;
    transition: transform 0.15s ease-in-out;
    transform: scaleY(0);
  }
  
  a[aria-current] {
    color: var(--color-gray-900);
  }

  a[aria-current]::after {
    transform: scaleY(1);
  }
</style>