import { basename } from "path";

export async function get() {
	const posts = [];

	// Import all .md files in the directory
	const modules = import.meta.glob("/src/routes/content/**/*.md");

	for await (const [ filename, module ] of Object.entries(modules)) {
		const { metadata } = await module();
		const { type, slug, title, lang, created, tags } = metadata;

		if (type === "blogpost") {
			posts.push({
				title,
				date: new Date(created),
				slug,
				lang,
				tags: tags.split(",").map(item => item.toLowerCase().trim())
			});
		}
	}

	// Sort posts by descending date
	posts.sort((a, b) => (a.date > b.date ? -1 : 1));

	return {
		body: posts
	};
}