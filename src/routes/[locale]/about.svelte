<script context="module">
	export async function load({ page }) {
		const Post = (await import(`../content/about-${page.params.locale}.md`)).default;

		return {
			props: {
				Post
			}
		};
	}
</script>

<script>
	export let Post;
</script>

<Post />