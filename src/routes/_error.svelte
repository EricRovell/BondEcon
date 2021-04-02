<script lang="ts">
  import { SVG, girlSleeping } from "@svg";
  
  export let status: string;
	export let error: Error;
	
	const dev = process.env.NODE_ENV === "dev";
</script>

<article>
  <figure>
    <SVG data={girlSleeping} />
  </figure>
  <h1>Something has broken!</h1>
  <h2>Error: {error.message}</h2>
  <p>Status: {status}</p>
</article>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

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
  
  h2, p {
    font-size: var(--font-size-7);
  }
  
  figure {
    width: min(500px, 100%);
  }
  
  figure :global(svg) {
    width: 100%;
    height: auto;
  }
</style>