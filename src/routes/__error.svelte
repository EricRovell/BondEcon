<script lang="ts">
  import { SVG, girlSleeping } from "@components/svg";
</script>

<article>
  <figure>
    <SVG data={girlSleeping} />
  </figure>
  <h1>Something has broken!</h1>
</article>

<style>
  article {
    display: grid;
    gap: var(--spacing-2, 0.5em);
    place-items: center;
    justify-self: center;
    margin-top: 10vh;
    
    color: var(--color-gray-700);
  }
  
  h1 {
    font-size: var(--font-size-9);
    color: var(--color-danger);
  }
  
  figure {
    width: min(500px, 100%);
  }
  
  figure :global(svg) {
    width: 100%;
    height: auto;
  }
</style>