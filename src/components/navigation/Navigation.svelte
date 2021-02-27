<script lang="ts">
  import { stores } from "@sapper/app";  
  import { setContext } from "svelte";
  
  export let wide = false;
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
    | wide        | boolean?          | false    | Element will take all the available width.                                         |
    | noBorder    | boolean?          | false    | Removes the bottom border from element.                                            |
    
  Context:
    - "page": sapper page store;
-->
<nav
  class:wide
  class:noBorder>
    <ul>
      <slot />
    </ul>
</nav>

<style>
  nav {
    --navigation-height: 50px;
    
    background-color: var(--navigation-background, transparent);
    border-bottom: 1.5px solid hsl(var(--gray-h) var(--gray-s-800) var(--gray-l-800) / 0.15);
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
</style>