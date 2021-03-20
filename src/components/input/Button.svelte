<script lang="ts" context="module">
  import type { Variant, AriaCurrent } from "#types";
  
  export type ElementType = HTMLButtonElement | HTMLAnchorElement;
  export type ButtonType = "submit" | "reset" | "button" | undefined;
  export type Appearance = "fill" | "outline" | "text";
  export type Shape = "rect" | "rounded" | "pill" | "circle" | "square";
  export type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
</script>

<script lang="ts">
  export let node: ElementType | undefined = undefined;
  export let id: string | undefined = undefined;
  export let style: string = "";
  
  export let variant: Variant = "neutral";
  export let appearance: Appearance = "outline";
  export let shape: Shape = "rect";
  //export let size: Size | undefined = undefined;
  
  export let loading = false;
  export let disabled = false;
  export let wide = false;
  export let flow: "row" | "column" = "row";
  
  // link specific props
  export let href: string | undefined | null = undefined;
  export let prefetch: true | undefined = undefined;
  export let ariaCurrent: AriaCurrent | null = null;
  
  // button specific props
  export let type: ButtonType = undefined;
  
  export let action: any = () => null;
  
  if ((!href && ariaCurrent)) {
    console.warn("aria-current attribute can only be used with links, please provide href attribute.");
  }
  
  if (!href && prefetch) {
    console.warn("Only links can be prefetched, please provide href attrubute");
  }
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
      
    | Name        | type         | default    | description                                                                  |
    |:------------|:-------------|:------------|:----------------------------------------------------------------------------|
    | node        | ElementType? | undefined  | Element's ref.                                                               |
    | id          | string?      | undefined  | Button's node ID.                                                            |
    | type        | ButtonType?  | undefined  | Button type attribute.                                                       |
    | variant     | Variant?     | "neutral"  | Button's color variant.                                                      |
    | appearance  | Appearance?  | "outline"  | Defines the button's appearance.                                             |
    | shape       | Shape?       | "rect"     | Defines the button's shape.                                                  |
    | size        | Size?        | 5          | Defines the button's size.                                                   |
    | loading     | boolean?     | false      | Loading state.                                                               |
    | disabled    | boolean?     | false      | Disabled state.                                                              |
    | wide        | boolean?     | false      | Makes component block element.                                               |
    | flow        | row / column | "row"      | Defines the flex-flow of the component.                                      |
    | href        | string       | undefined  | href link attribute, transforms the button to anchor element.                |
    | prefetch    | boolean      | false      | Defines the prefetching behaviour. Can be used only if href is provided.     |
    | ariaCurrent | AriaCurrent  | undefined  | Defines the "aria-current" attribute. Can be used only if href is provided.  |
    
  Inherited Custom Props:
      
    | Name                   | type      | default          | description                       |
    |:-----------------------|:----------|:-----------------|-----------------------------------|
    | --variant-h            | <integer> | 0                | Variant hue value.                |
    | --variant-s            | <percent> | 13%              | Variant saturation value.         |
    | --variant-l            | <percent> | 92%              | Variant lightness value.          |
    | --button-bg-alpha      | <float>   | 1                | Background alpha channel value.   |
    | --color-contrast       | <color>   | hsl(210 15% 25%) | Variant contrast color.           |
    | --button-font-size     | <length>  | inherit          | Font-size value.                  |
    | --button-border-radius | <length>  | 2px              | Self-explanatory.                 |
    | --shadow-size          | <length>  | 0                | Box-shadow based focus ring size. |
    | --spacing-1            | <length>  | 0.25em           | Vertical padding spacing value.   |
    | --spacing-2            | <length>  | 0.5em            | Horizontal padding spacing value. |
    
  Forwarded events (button):
  
    | Event        | type   | description                         |
    |:-------------|:-------|:------------------------------------|
    | on:click     | native | Fired when a user clicks on button. | 
    | on:mouseDown | native | Fired when user clicks on button.   |
-->
{#if href}
  <a
    bind:this={node}
    {id}
    style="{style}"
    class="button {appearance} variant-{variant} {shape}"
    {href}
    sapper:prefetch={prefetch}
    aria-current={ariaCurrent}
    class:wide
    class:flow-column={flow === "column"}
    use:action
    {...$$restProps}
  >
    <slot />
  </a>
{:else}
  <button
    bind:this={node}
    style="{style}"
    class="button {appearance} variant-{variant} {shape}"
    {id}
    {type}
    {disabled}
    class:disabled
    class:loading={loading && !$$slots.loader}
    class:flow-column={flow === "column"}
    class:wide
    on:click
    on:mousedown
    use:action
    {...$$restProps}
  >
    {#if $$slots.loader && loading}
      <div class="loader-wrapper">
        <slot name="loader" />
      </div>
    {/if}
    <slot />
  </button>
{/if}

<style>
  .button {
    --button-border-radius: var(--radius-small, 2px);
    --shadow-size: 0;
    --button-bg-alpha: 1;
    
    position: relative;  
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-2, 0.5em);

    width: auto;
    height: auto;
    min-width: 5em;
    min-height: 2em;
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--button-border-radius);
    background-color: hsl(var(--variant-h) var(--variant-s) var(--variant-l) / var(--button-bg-alpha));
    
    color: inherit;
    font-size: var(--button-font-size, inherit);
    font-family: inherit;
    font-variation-settings: "wght" 500;

    outline: none;
    border: none;
    cursor: pointer;

    box-shadow: 0 0 0 var(--shadow-size) hsl(var(--variant-h) var(--variant-s) var(--variant-l) / 0.5);

	  transition:
      background-color 150ms cubic-bezier(0, 0, 0.58, 1),
      filter 150ms cubic-bezier(0, 0, 0.58, 1),
      box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* variant custom properties fallback */
  .button:not([class*="variant-"]) {
    --variant-h: 0;
    --variant-s: 13%;
    --variant-l: 92%;
  }
  
  /* Button::fill */
  
  .button.fill {
    color: var(--variant-contrast);
  }
  
  /* Button::ouline */
  
  .button.outline {
    --button-bg-alpha: 0;
    
    border: 2px solid hsl(var(--variant-h) var(--variant-s) var(--variant-l));
    color: hsl(var(--variant-h) var(--variant-s) var(--variant-l));
  }
  
  .button.outline:hover {
    --button-bg-alpha: 0.2;
  }
  
  /* Button::text */
  
  .button.text {
    --button-bg-alpha: 0;
    color: hsl(var(--variant-h) var(--variant-s) var(--variant-l));
  }
  
  .button.text:hover {
    --button-bg-alpha: 0.1;
  }
  
  /* Feedback */
  
  .button:active {
    filter: brightness(120%) hue-rotate(5deg);
    transform: scale(0.975);
  }
  
  button:focus {
    --shadow-size: 3px;
  }
  
  /* State */
  
  .button:disabled {
    opacity: 0.75;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  .button.loading {
    color: transparent;
    cursor: progress;
    pointer-events: none;
    user-select: none;
  }
  
  .button.loading > :not(.loader-wrapper) {
    visibility: hidden;
    opacity: 0;
  }
  
  .button.loading:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1em;
    height: 1em;
    margin-top: -0.5em;
    margin-left: -0.5em;
    border-radius: 50%;
    border-top: 0.1em solid hsl(var(--variant-h) var(--variant-s) var(--variant-l));
    border-right: 0.1em solid transparent;
    animation: spinner .6s linear infinite;
  }
  
  @keyframes spinner {
    to { transform: rotate(360deg); }
  }
  
  /* Display */
  
  .wide {
    display: flex;
  }
  
  .flow-column {
    flex-flow: column;
  }
  
  /* Shapes */
  
  .rect {
    --button-border-radius: var(--radius-small, 2px);
  }
  
  .rounded {
    --button-border-radius: var(--radius-medium, 5px);
  }
  
  .pill {
    --button-border-radius: 20px;
    padding: var(--spacing-1) var(--spacing-3);
  }
  
  .circle {
    --button-border-radius: 50%;
  }
  
  .circle,
  .square {
    min-width: unset;
    min-height: unset;
    aspect-ratio: 1 / 1;
  }
  
  @media (hover: hover) {
    .button:hover {
      filter: brightness(110%) hue-rotate(5deg);
    }
  }
  
  /* slots */
  
  .loader-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    
    display: flex;
    place-items: center;
  }
</style>