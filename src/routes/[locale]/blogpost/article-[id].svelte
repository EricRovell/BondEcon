<script context="module" lang="ts">
  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
   export async function load({ page, fetch }) {
    const response = await fetch(`/api/blog/articles/${page.params.id}.json`);
    
    if (response.ok) {
      return {
        props: {
          post: await response.json()
        }
      };
    }
  }
</script>

<script lang="ts">
  import { ArticleView } from "$components/content";
  import type { ArticleRecordView } from "$components/content";
  
  export let post: ArticleRecordView;
</script>

<!--
  @component
  Article Page View component
  
  Renders a blog post from html string data (processed .md file).
-->
<ArticleView {...post} />