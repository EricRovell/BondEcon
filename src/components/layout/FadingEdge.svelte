<script lang="ts">
  export let top: string = "0px";
  export let height: string = "1em";
</script>

<!--
  @component
  
  Decorative sticky bar for creating fading edge effect.
  
  Usage:
    <BlurryEdge top="50px" height="1em" />
    
  Props:
    | Prop name | Type   | Default | Description           |
    |-----------|--------|---------|-----------------------|
    | top       | string | 0       | top stickiness offset |
    | height    | string | 1em     | bar's height          |
-->
<div
  class="gradient"
  style="--top: {top}; --height: {height};"
/>

<style>
  .gradient {
    position: sticky;
    top: var(--top);
    
    width: 100%;
    height: var(--height);
    
    background: linear-gradient(180deg, var(--color-1-500), transparent);
  }
</style>