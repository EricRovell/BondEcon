<!-- <script lang="ts" context="module">
  //type Position = "up" | "right" | "down" | "bottom";
  //type Alignment = "start" | "center" | "end";
  //type Placement = `${Position}-${Alignment}`;
  //type Trigger = "hover-&-touch" | "focus-&-touch" | "hover" | "click";
</script> -->

<script lang="ts">
  import { fade } from "svelte/transition";
  
  export let title: string;
  export let x: number;
  export let y: number;
  
  //export let position: Placement = "up-center";
  //export let maxwidth: string = "300px";
  //export let timeShow;
  //export let timeHide
</script>

<div
  transition:fade
  style="top: {y + 5}px; left: {x + 5}px;"
  role="tooltip">
    {title}
</div>

<style>
  div {
    border: 1px solid black;
    position: absolute;
    background-color: white;
    padding: 1em;
    z-index: var(--z-index-popover, 5);
  }
</style>