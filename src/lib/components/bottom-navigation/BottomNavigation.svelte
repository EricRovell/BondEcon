<div>
  <header>
    {#if $$slots.navigation}
      <slot name="navigation" />
    {/if}
  {#if $$slots.menu}
    <section label="menu">
      <slot name="menu" />
    </section>
  {/if}
  </header>
</div>

<!--
  @component
  Bottom Bar Wrapper Component
  
  Usage:
    ```
      <BottomNavigation>
        <Item slot="navigation" />
      </BottonNavigation>
    ```
    
  Slots:
    
      | Name       | fallback  | description                                       |
      |:-----------|:----------|:--------------------------------------------------|
      | navigation | -         | Provides a slot for placing a navigational items. |
      | menu       | -         | Prodives a slot for placing a menu container.     |
-->
<style>
  div {
    position: sticky;
    bottom: 0;
    z-index: var(--z-index-navigation);
    background-color: var(--color-surface-300);
  }
  
  header {
    position: relative;
    width: 100%;
  }
  
  header::after {
    content: "";
    position: absolute;
    top: 0;
    height: 2px;
    width: 100%;
    background-color: hsl(var(--gray-h) var(--gray-s-500) var(--gray-l-500) / 0.5);
  }
  
  section[label="menu"] {
    position: absolute;
    bottom: 100%;
    width: 100%;
  }
</style>