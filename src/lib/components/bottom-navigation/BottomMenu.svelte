<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  export let show: boolean = true;

  const dispatch = createEventDispatcher();

  /**
  * Hide menu on route change.
  */
  function handleRouteChange(event: MouseEvent) {
    if (event.target instanceof HTMLAnchorElement) {
      dispatch("routechange");
    }
  }
  
  function closeMenu() {
    dispatch("close");
  }
</script>


{#if show}
  <span class="backdrop" on:click={closeMenu} transition:fade={{ duration: 250 }} />
{/if}
<div on:click={handleRouteChange} class:show={!show}>
  <slot />
</div>

<style>
  .show {
    transform: translate3d(0, calc(100%), 0) scaleY(0);
    opacity: 0;
    pointer-events: none;
    clip-path: circle(0px at 100% 100%);
  }
  
  div {
    max-height: calc(75vh);
    width: 100%;
    box-shadow: inset 0 0 2px hsl(var(--color-gray-700-str) / 0.25);
    background: var(--color-surface-300);
    padding: var(--spacing-2);

    font-size: var(--font-size-3);
    
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 502;
    
    opacity: 1;
    transform-origin: 50% 0;
    transition: opacity 0.25s ease-in-out;
    
    display: flex;
    justify-content: space-between;
  }
  
  .backdrop {
    position: absolute;
    bottom: 0;
    height: calc(100vh);
    width: 100%;
    background: rgb(0 0 0 / 0.25);
    z-index: 501;
  }
</style>