<script lang="ts" context="module">
  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
  export async function load({ page, fetch }) {
    const lang = page.params.locale ?? "ru";
    
    const response = await fetch(`/api/page.json?lang=${lang}&id=about`);
    const document = await response.json();
    
    if (response.ok) {
      return {
        props: document
      };
    }
  }
</script>

<script lang="ts">
  import { Article } from "$ui/data-display";
  import { Head } from "$ui/util";
  import { SVG, illustrationShootingStar } from "$ui/svg";
  import type { HeadMeta } from "$ui/util/head";
  
  export let html: string;
  export let title: string;
  export let pagename: string;
  export let description: string;
  
  let meta: HeadMeta;
  
  $: meta = {
    title,
    meta: {
      description,
      pagename
    },
    og: {
      type: "blog",
      image: "img/author.jpg"
    }
  };
</script>

<!--
  @component
  Page Route: About Project Bondecon
  
  Renders from processed html string and metadata for populating head.
  
  Props:
    - html: string - processed HTML string;
    - meta: HeadProps - meta data for populating head.
-->
<Head {...meta} />
<main>
  <SVG data={illustrationShootingStar} size="150px" />
  <Article {html} />  
</main>

<style>
  main {
    display: grid;
    grid-template: auto / minmax(auto, min(100%, 75ch));
    justify-items: center;
    justify-content: center;
    row-gap: var(--spacing-6);
    
    width: 100%;
    margin-top: 15vh;
    
    font-size: var(--font-size-3);
  }
</style>