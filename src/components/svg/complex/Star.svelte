<svelte:options namespace="svg" />

<script lang="ts" context="module">
  type StarMode = "light" | "dark" | "broken";
  
  interface SVGGradient {
    id: string;
    type: "radial-gradient" | "linear-gradient";
    cx?: string;
    cy?: string;
    r?: string;
    x1?: string;
    x2?: string;
    y1?: string;
    y2?: string;
    gradientTransform: string;
    stops: number[],
    xlink?: string;
  }
  
  const data: Record<StarMode, SVGGradient[]> = {
    "light": [
      {
        id: "star-logo-gradient",
        type: "radial-gradient",
        cx: "404.37",
        cy: "-741.89",
        r: "32.95",
        gradientTransform: "matrix(1.46, 0, 0, -1.42, -540.18, -999.82)",
        stops: [ 0, 1 ]
      }
    ],
    "dark": [
      {
        id: "star-logo-gradient",
        type: "radial-gradient",
        cx: "404.37",
        cy: "-741.89",
        r: "32.95",
        gradientTransform: "matrix(1.46, 0, 0, -1.42, -540.18, -999.82)",
        stops: [ 0, 1 ]
      }
    ],
    "broken": [
      {
        id: "star-logo-gradient-1",
        type: "radial-gradient",
        cx: "404.37",
        cy: "-741.89",
        r: "32.95",
        gradientTransform: "matrix(1.46, 0, 0, -1.42, -540.18, -999.82)",
        stops: [ 0, 1 ]
      },
      {
        id: "star-logo-gradient-2",
        type: "radial-gradient",
        cx: "404.37",
        cy: "-741.89",
        r: "32.95",
        gradientTransform: "matrix(1.46, 0, 0, -1.42, -540.18, -999.82)",
        stops: [ 0, 1 ]
      }
    ]
  };
</script>

<script lang="ts">
  import { fade } from "svelte/transition";
  import { theme } from "@stores";
  import { stores } from "@sapper/app";

  const { page } = stores();
  
  export let title: string | undefined = "Star";
  export let type: StarMode | undefined = undefined;
  export let size: string = "1em";
  
  let mode: StarMode;

  $: {
    if (type) {
      mode = type;
    } else if ($page.error) {
      mode = "broken";
    } else {
      mode = $theme;
    }
  }
</script>

<!--
  @component
  Star SVG Component.
  Dynamic component used as logo for the website.
  
  Usage:
    ```
      <Star title="BondEcon" type="light" />
    ```
    
  Props:
  
    | Name  | type     | default   | description                                                                                          |
    |:------|:---------|:----------|:-----------------------------------------------------------------------------------------------------|
    | title | string   | "Star"    | Custom logo title                                                                                    |
    | type  | StarMode | undefined | Logo type, if not specified, renders "broken" star used on error pages and sync to the current theme |
    | size  | string   | "1em"     | The logo's size                                                                                      |
-->
<svg
  viewBox="0 0 100 100"
  class:dark={mode === "dark" ? "dark" : ""}
  class:broken={mode === "broken" ? "broken" : ""}
  width={size}
  height={size}>
    <defs>
      {#each data[mode] as { type, id, cx, cy, r, gradientTransform, x1, y1, x2, y2, stops, xlink }}
        {#if type === "radial-gradient"}
          <radialGradient
            {id}
            {cx} {cy} {r}
            {gradientTransform}
            gradientUnits="userSpaceOnUse">
              {#each stops as offset}
                <stop {offset} />
              {/each}
          </radialGradient>
        {:else if type === "linear-gradient"}
          <linearGradient
            {id}
            {x1} {y1}
            {x2} {y2}
            {gradientTransform}
            xlink:href={xlink}
            gradientUnits="userSpaceOnUse">
            {#each stops as offset}
              <stop {offset} />
            {/each}
          </linearGradient>
        {/if}
      {/each}
    </defs>
    <title>{title}</title>
    {#if mode === "light" || mode === "dark"}
      <path transition:fade d="M1.07,39.75l24.18,23L20.28,95,49.7,79.62l30,15.27L73.82,62.47l24.63-23.4L64.36,34.65,49.37,5,34.42,34.91" fill="url(#star-logo-gradient)"/>
    {:else if mode === "broken"}
      <path transition:fade d="M20.37,93.61l5.16-32-24-22.45,33-4.73L49,6.14,44.29,56.45l6.58-6.89L49.23,78.47Z" fill="url(#star-logo-gradient-1)" />
      <path transition:fade d="M80.5,93.86l-5.66-32L98.45,39l-33-4.26L51.36,7.14l-2.8,40.78L55,41.17l-3,37.47Z" fill="url(#star-logo-gradient-2)" />
    {/if}
</svg>

<style>
  svg {
    stroke: #fff;
    stroke-linejoin: round;
    stroke-opacity: 0;
    stroke-width: 3px;
    fill-rule: evenodd;

    transition: transform 0.25s ease-in-out 0.25s;
  }

  svg defs stop {
    transition: stop-color 0.75s linear;
  }

  svg defs stop:first-child {
    stop-color: #ffa722;
  }

  svg defs stop:last-child {
    stop-color: #ac455a;
  }

  /* dark star */

  .dark {
    transform: rotate(72deg);
  }

  svg.dark defs stop:first-child {
    stop-color: #ac455a;
  }

  svg.dark defs stop:last-child {
    stop-color: #30163d;
  }

  /* broken star */

  .broken {
    transform: none;
  }

  svg.broken defs stop:first-child {
    stop-color: #4cbb17;
  }

  svg.broken defs stop:last-child {
    stop-color: #428422;
  }
</style>