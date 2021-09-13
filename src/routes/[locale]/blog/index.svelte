<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const res = await fetch("/api/blog/posts.json");

		if (res.ok) {
			return {
				props: {
					posts: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error("Could not load URL")
		};
	}
</script>

<script>
	import { articlePath } from "@core/routes";
	import { TimelineSimple } from "@components";
	import { ArticleCard } from "@components/article";

	export let posts = [];
</script>

<TimelineSimple.Container>
	{#each posts as { title, date, slug, tags }}
		<TimelineSimple.Item action="New blogpost" {date}>
			<ArticleCard
				{title}
				{date}
				href={$articlePath(slug)}
			/>
		</TimelineSimple.Item>
	{/each}
</TimelineSimple.Container>