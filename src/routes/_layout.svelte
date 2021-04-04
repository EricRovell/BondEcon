<script>
  import { media } from "@stores";
  import { Footer } from "@components/layout";
  
  $: mobileDevice = $media.small;
</script>

<!--
  @component
  App Root Component
  
  Provides common layout for entire application.
-->
<div id="app">
  {#if !mobileDevice}
    {#await import("@core/components/Header.svelte") then Header}
      <svelte:component this={Header.default} />
    {/await}
  {/if}
  <div class="content">
    <slot />
  </div>
  <Footer />
  {#if mobileDevice}
    {#await import("@core/components/BottomNavigation.svelte") then BottomNavigation}
      <svelte:component this={BottomNavigation.default} />
    {/await}
  {/if}
</div>

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    line-height: 1.0;

    position: relative;
  }

  :global(#sapper) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 0%;
  }
  
  #app {
    --max-width: 1440px;
    width: 100%;
    
    font-family: var(--font-main);
  }

  .content {
    display: grid;
    grid-auto-rows: min-content;
    place-items: start start;
    position: relative;
    width: 100%;
    min-height: 100vh;
    
    margin-bottom: 40vh;
  }

  /* let bottom menu be full width */
  @media screen and (max-width: 640px) {
    #app {
      padding: 0;
    }
  }
</style>