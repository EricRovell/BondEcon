<script lang="ts">
  import { stores } from "@sapper/app";  
  import { setContext } from "svelte";
  
  export let wide = false;
  export let transparent = false;
  export let noBorder = false;
  
  const { page } = stores();
  
  setContext("page", page);
</script>

<!--
  @component
  Navigation Component
  Wrapper component for navigational links.
  
  Usage:
    ```
      <Navigation>
        <NavItem />
        <NavItem />
      </Navigation>
    ```
    
  Props:
  
    | Name        | type              | default  | description                                                                        |
    |:------------|:------------------|:---------|:-----------------------------------------------------------------------------------|
    | transparent | boolean?          | false    | Removes background-color from element. By default is matches the theme background. |
    | wide        | boolean?          | false    | Element will take all the available width.                                         |
    | noBorder    | boolean?          | false    | Removes the bottom border from element.                                            |
    
  Context:
    - "page": sapper page store;
-->
<nav
  class:wide
  class:transparent
  class:noBorder>
    <ul>
      <slot />
    </ul>
</nav>

<style>
  nav {
    --navigation-height: 50px;
    
    background-color: var(--color-1-500);
    border-bottom: 1.5px solid hsl(var(--color-gray-800-str) / 0.15);
    position: sticky;
    top: 0;
    z-index: 5;
  }
  
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    width: fit-content;
    height: var(--navigation-height);   
  }
  
  .noBorder {
    border-bottom: none;
  }
  
  .wide {
    width: 100%;
  }
  
  .transparent {
    background-color: transparent;
  }
</style>