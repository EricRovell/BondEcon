<script lang="ts" context="module">
  import type { Preload } from "@sapper/common";
  
  export const preload: Preload = async function(this, page, session) {
    const query = new URLSearchParams({
      lang: page.params.locale ?? session.locale ?? "en",
      id: "about"
    });

    const uri = `api/page.json?${query}`;
    const response = await this.fetch(uri);
    const document = await response.json();

    if (response.status === 200) {
      return document;
    }

    this.error(404, "Not Found");
  }
</script>

<script lang="ts">
  import { Article, Head } from "@components";
  import { SVG, illustrationShootingStar } from "@svg";
  import type { HeadMeta } from "@components/util/head";
  
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