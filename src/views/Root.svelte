<script>
  import { theme } from "@stores";
  import { Header, Footer } from "@views";
</script>

<svelte:head>
  <link rel="stylesheet" href={$theme.styles}>
</svelte:head>

<!--
  @component
  App Root Component
  
  Provides common layout for entire application.  
-->
<div id="app">
  <Header />
  <div class="content">
    <slot />
  </div>
  <Footer />
</div>

<style>
  #app {
    --max-width: 1440px;
    
    display: grid;
    grid-template: repeat(3, auto) / 1fr min(var(--max-width), 100%) 1fr;
    grid-template-areas:
      "header header header"
      ". content ."
      "footer footer footer";
    justify-content: center;
    
    font-family: var(--font-main);
    
    width: 100%;
  }
  
  #app > :global(header) {
    grid-area: header;
  }

  .content {
    grid-area: content;
    
    display: grid;
    grid-auto-rows: min-content;
    place-items: start start;
    position: relative;
    width: 100%;
    min-height: 100vh;
    
    margin-bottom: 40vh;
    
    --fading-edge-top: 50px;
    --fading-edge-height: 2.5em;
  }

  /* let bottom menu be full width */
  @media screen and (max-width: 640px) {
    #app {
      padding: 0;
      
      grid-template-areas:
        ". content ."
        ". footer ."
        ". header .";
    }
    
    .content {
      --fading-edge-top: 0px;
    }
  }
</style>