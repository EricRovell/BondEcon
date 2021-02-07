<script lang="ts" context="module">
  export type Variant = "neutral" | "primary" | "success" | "danger" | "warning" | "info" | "link";
</script>

<script lang="ts">
  export let id: string | undefined = undefined;
  export let title: string | null = null;
  export let viewBox: string = "0 0 100 100";
  
  export let path: string;
  export let color: Variant | null = null; 
  export let size: string = "1em";
  export let margin: string = "0";
</script>

<svelte:options namespace="svg" />

<!--
  @component
  
  SVG Icon component.
  
  Usage:
    ```
      <Icon {path} color="success" title="Success message" />
    ```
  
  Props:
    | Props name | type    | default       | description                                         |
    |------------|---------|---------------|-----------------------------------------------------|
    | path       | string  | required      | SVG path data string                                |
    | id         | string  | undefined     | SVG's node ID                                       |
    | title      | string  | null          | self-explanatory                                    |
    | viewBox    | string  | "0 0 100 100" | Custom viewBox parameters                           |
    | size       | string  | "1em"         | Rectangular size                                    |
    | margin     | string  | "0"           | Margin CSS string                                   |
    | color      | Variant | currentColor  | Icon's fill color, default to inherited color value |
-->
<svg
  xmlns="http://www.w3.org/2000/svg"
  {id}
  {viewBox}
  style={`--icon-margin: ${margin}; ${color ? `--icon-color: var(--color-${color})` : ""}`}
  width={size}
  height={size}
  aria-labelledby={title ?? null}
  role="presentation">
    {#if title}
      <title>{title}</title>
    {/if}
    <path d={path} />
</svg>

<style>
  svg {
    fill: var(--icon-color, currentColor);
    margin: var(--icon-margin, 0);
  }
</style>