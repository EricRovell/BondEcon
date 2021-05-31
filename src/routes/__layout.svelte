<script lang="ts" context="module">
  import { registerDictionaries, locale } from "$stores/locale";
  
  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
   export async function load({ page }) {
    locale.set(page.params?.locale ?? "en");
    
    await registerDictionaries([
      { locale: "en" , url: "/locale/default-en.json" },
      { locale: "ru", url: "/locale/default-ru.json" }
    ]);
      
    return {
      status: 201
    };
  }
</script>

<script lang="ts">
  import { media } from "$stores";
  import { Footer } from "$components/layout";
  
  import "$styles/main.css";
  import "$styles/normalize.css";
  import "$styles/theme-dark.css";
  import "$styles/theme-light.css";
  import "$styles/typography.css";
  
  $: mobileDevice = $media.small;
</script>

<!--
  @component
  App Root Component
  
  Provides common layout for entire application.
-->
<div id="app">
  {#if !mobileDevice}
    {#await import("$components/layout/Header.svelte") then Header}
      <svelte:component this={Header.default} />
    {/await}
  {/if}
  <div class="content">
    <slot />
  </div>
  <Footer />
  {#if mobileDevice}
    {#await import("$components/layout/BottomNavigation.svelte") then BottomNavigation}
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