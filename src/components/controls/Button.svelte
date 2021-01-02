<script lang="ts" context="module">
  type ButtonType = "submit" | "reset" | "button" | undefined;
</script>

<script lang="ts">
  export let id: string | undefined = undefined;
  export let disabled = false;
  
  export let filled = false;
  export let outlined = false;
  
  export let danger = false;
  export let neutral = false;
  
  export let rounded = false;
  export let round = false;
  export let rectangle = true;
  
  // link specific props
  export let href: string | undefined | null = undefined;
  export let prefetch = false;
  export let ariaCurrent: string | null = null;
  
  // button specific props
  export let type: ButtonType = undefined;
  export let tooltip: string | undefined = undefined;  
</script>

<!--
  @component
  Button component.
  
  Usage:
    ```
      <Button>
        Push me!
      </Button>
    ```
  
  Props:
      
    | Name        | type       | default    | description                                                                      |
    |:------------|:-----------|:-----------|:---------------------------------------------------------------------------------|
    | id          | string     | undefined  | Button's node ID                                                                 |
    | disabled    | boolean    | false      | should be the button disabled                                                    |
    | href        | string     | undefined  | href link, makes the component link instead                                      |
    | prefetch    | boolean    | false      | should be the link's content prefetched                                          |
    | ariaCurrent | string     | undefined  | active link aria role                                                            |
    | type        | ButtonType | undefined  | button type                                                                      |
    | tooltip     | string     | undefined  | tooltip value                                                                    |
    | filled      | boolean    | false      | adds filled background to the button. Mutually exclusive with outlined           |
    | outlined    | boolean    | false      | adds border to the button. Mutually exclusive with filled.                       |
    | danger      | boolean    | false      | gives the button a color of danger. Mutually exclusive with neutral.             |
    | neutral     | boolean    | false      | gives the button a neutral color. Mutually exclusive with danger.                |
    | rounded     | boolean    | false      | adjusts the border radius.                                                       |
    | round       | boolean    | false      | adjusts the border radius to 50% (circle appearance), goot for icon-only buttons |
    | rectangle   | boolean    | true       | halves the border radius and increases the padding. Well-suited for large menus. |
  
  Forwarded events (for button only):
  
    | Event        | type   | description                                               |
    |:-------------|:-------|:----------------------------------------------------------|
    | on:click     | native | Fired when a user clicks on button.                       | 
    | on:mouseDown | native | Fired when user clicks on button (defaults are prevented) |
-->
{#if href}
  <a
    {href}
    rel={prefetch ? "prefetch" : undefined}
    aria-current={ariaCurrent}
    class="button"
    class:outlined
    class:filled
    class:danger
    class:neutral
    class:rounded
    class:disabled
    class:round
    class:rectangle>
      <slot />
  </a>
{:else}
  <button
    {id}
    {type}
    {disabled}
    on:click
    on:mousedown|preventDefault
    class="button"
    class:danger
    class:neutral
    class:outlined
    class:filled
    class:rounded
    class:disabled
    class:round
    class:rectangle
    data-tooltip={tooltip}>
      <slot />
  </button>
{/if}

<style>
  .button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: auto;
    height: auto;
    min-width: 2em;
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--radius-small);
    
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    font-variation-settings: "wght" 500;

    outline: none;
    border: none;
    cursor: pointer;

	  transition:
      transform 150ms cubic-bezier(0, 0, 0.58, 1),
      background-color 150ms cubic-bezier(0, 0, 0.58, 1),
      filter 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  
  .filled {
    background-color: var(--color-3-500);
    color: var(--color-gray-200);
  }
  
  .outlined {
    border: 2px solid var(--color-3-500);
    outline: none;
    background-color: initial;
    color: var(--color-3-500);
  }
  
  .button:not(.filled):hover {
    background-color: hsl(var(--color-gray-300-str) / 0.75);
  }
  
  .filled.danger {
    background: var(--color-danger);
  }
  
  .outlined.danger {
    border: 2px solid var(--color-danger);
    color: var(--color-danger);
  }
  
  /* .neutral {
    
  } */
  
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  .round {
    border-radius: 50%;
  }
  
  .rounded {
    border-radius: var(--radius-medium);
  }
  
  .rectangle {
    border-radius: var(--radius-small);
  }
  
  .button:active {
    filter: brightness(120%) hue-rotate(2deg);
    transform: scale(0.95);
  }
  
  .button:hover {
    filter: brightness(105%) hue-rotate(1deg);
  }
  
  .button:hover:active {
    filter: brightness(120%) hue-rotate(2deg);
  }
</style>