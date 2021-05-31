<script lang="ts" context="module">
  export type Position = "top" | "right" | "bottom" | "left";
  export type Mode = "sticky" | "fixed";
</script>

<script lang="ts">
  export let position: Position = "top";
  export let mode: Mode = "sticky";
  export let size: string | null = null;  
  export let bg: string | null = null;
  export let style: string = "";
  
  $: customProperties = [
    mode ? `--fading-edge-mode: ${mode};` : "",
    `--fading-edge-position: ${position};`,
    bg ? `--fading-edge-bg: ${bg};` : "",
    size ? `--fading-edge-size: ${size};` : ""
  ].join("").replace(/\s/g, "");
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
    | mode      | "sticky"/"fixed" | sticky  | edge's position mode           |
    | position  | Position         | top     | top stickiness offset          |
    | height    | string           | null    | edge's height                  |
    | bg        | string           | null    | color to merge with background |
    | style     | string           | ""      | Inline styles string           |
    
  CSS Custom Properties:
  
    Component inherits custom properties for easier control.
    Custom properties are overriden with regular components props.
  
    | Prop name              | Type     | Default           | Description                    |
    |------------------------|----------|-------------------|--------------------------------|
    | --fading-edge-mode     | string   | sticky            | edge's position mode           |
    | --fading-edge-position | Position | top               | Position                       |
    | --fading-edge-height   | <length> | 2.5em             | edge's height                  |
    | --fading-edge-bg       | <color>  | color-surface-400 | color to merge with background | 
-->
<div
  class="fading-edge {position}"
  style={`${customProperties} ${style}`}
/>

<style>
  .fading-edge {
    --gradient-angle: 180deg;
    
    position: var(--fading-edge-mode, auto);
    background: linear-gradient(
      var(--gradient-angle),
      var(--fading-edge-bg, var(--color-surface-400)),
      transparent
    );
  }
  
  .top,
  .bottom {
    width: 100%;
    height: var(--fading-edge-size, 1.5em);
  }
  
  .left,
  .right {
    height: 100%;
    width: var(--fading-edge-size, 1.5em);
  }
  
  .top {
    top: var(--fading-edge-position, 2.5em);
  }
  
  .right {
    --gradient-angle: 270deg;
    right: var(--fading-edge-position, 2.5em);
  }
  
  .bottom {
    --gradient-angle: 0deg;
    bottom: var(--fading-edge-position, 2.5em);
  }
  
  .left {
    --gradient-angle: 90deg;
    left: var(--fading-edge-position, 2.5em);
  }
</style>