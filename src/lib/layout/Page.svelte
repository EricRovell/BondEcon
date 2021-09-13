<script>
	import { SVG, girlCatchingStars } from "@components/svg";

	export let title;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<header>
	<SVG data={girlCatchingStars} size="min(100%, 75vw, 350px)" />
	<h1>{title}</h1>	
</header>
<article>
	<slot />
</article>

<style>
	header {
		display: grid;
		gap: 0.75em;
		width: 100%;
		margin-top: 10vh;
		margin-bottom: 1em;
		justify-items: center;
	}

	h1 {
		text-align: center;
		padding: 0.5em;
	}

	article {
		display: grid;
		width: min(65ch, 100%);
		justify-self: center;
		gap: 0.75em;
	}

	article :global(:is(h1, h2, h3, h4, h5, h6)) {
		--border-size: 2px;

		margin-top: calc(8 * var(--spacing-em-base));
		padding-bottom: var(--spacing-2);
		border-bottom: solid var(--border-size) hsl(var(--gray-h) var(--gray-s-600) var(--gray-l-600) / 0.5);
	}

	article :global(a) {
		color: var(--color-primary);
	}
</style>