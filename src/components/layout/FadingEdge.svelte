<script lang="ts" context="module">
  import { customProperties } from "@util/actions";
</script>

<script lang="ts">
  export let mode: "sticky" | "fixed" | null = null;
  
  export let top: string | null = null;
  export let right: string | null = null;
  export let bottom: string | null = null;
  export let left: string | null = null;
  
  export let height: string | null = null;  
  export let bgColor: string | null = null;
  
  $: props = {
    "fading-edge-mode": mode,
    "fading-edge-top": top,
    "fading-edge-right": right,
    "fading-edge-bottom": bottom,
    "fading-edge-left": left,
    "fading-edge-bgColor": bgColor,
    "fading-edge-height": height
  }
</script>

<!--
  @component
  
  Decorative sticky bar for creating fading edge effect.
  
  Usage:
    ```
      <FadingEdge top="50px" height="1em" />
    ```
    
  Props:
  
    | Prop name | Type             | Default | Description                    |
    |-----------|------------------|---------|--------------------------------|
    | mode      | "sticky"/"fixed" | null    | edge's position mode           |
    | top       | string           | null    | top stickiness offset          |
    | right     | string           | null    | right stickiness offset        |
    | bottom    | string           | null    | bottom stickiness offset       |
    | left      | string           | null    | left stickiness offset         |
    | height    | string           | null    | edge's height                  |
    | bgColor   | string           | null    | color to merge with background |
    
  CSS Custom Properties:
  
    Component inherits custom properties for easier control.
    Custom properties are overriden with regular components props.
  
    | Prop name             | Type     | Default       | Description                    |
    |-----------------------|----------|---------------|--------------------------------|
    | --fading-edge-mode    | string   | sticky        | edge's position mode  
    | --fading-edge-top     | <length> | 50px          | top stickiness offset          |
    | --fading-edge-right   | <length> | null          | right stickiness offset        |
    | --fading-edge-bottom  | <length> | null          | bottom stickiness offset       |
    | --fading-edge-left    | <length> | null          | left stickiness offset         |
    | --fading-edge-height  | <length> | 1.5em         | edge's height                  |
    | --fading-edge-bgColor | <color>  | --color-1-500 | color to merge with background |  
-->
<div
  class="fading-edge"
  use:customProperties={props}
/>

<style>
  .fading-edge {
    position: var(--fading-edge-mode, sticky);
    top: var(--fading-edge-top, 50px);
    right: var(--fading-edge-right);
    bottom: var(--fading-edge-bottom);
    left: var(--fading-edge-left);
    
    height: var(--fading-edge-height, 1.5em);
    
    width: 100%;  
    background: linear-gradient(180deg, var(--bgColor, var(--color-1-500)), transparent);
  }
</style>