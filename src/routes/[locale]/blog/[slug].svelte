<script context="module">
	export async function load({ page }) {
		const Post = (await import(`../../content/${page.params.slug}.md`)).default;

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