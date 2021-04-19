<script context="module" lang="ts">
  import type { Preload } from "@sapper/common";

  export const preload: Preload = async function(this, page) {
    const response = await this.fetch(`api/blog/articles/${page.params.id}.json`);

    if (response.status === 200) {
      const post = await response.json();
      return {
        post
      };
    }

    this.error(404, "Not Found");
  }
</script>

<script lang="ts">
  import { ArticleView } from "@core/components/content";
  import type { ArticleRecordView } from "@core/components/content";
  
  export let post: ArticleRecordView;
</script>

<!--
  @component
  Article Page View component
  
  Renders a blog post from html string data (processed .md file).
-->
<ArticleView {...post} />