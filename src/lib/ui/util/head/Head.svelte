<script lang="ts" context="module">
  import type { HeadMeta } from "./types";
</script>

<script lang="ts">
  import MetaTemplate from "./MetaTemplate.svelte";

  export let title: HeadMeta["title"] = undefined;
  export let meta: HeadMeta["meta"] = undefined;
  export let og: HeadMeta["og"] = undefined;
  export let article: HeadMeta["article"] | undefined = undefined;
  export let twitter: HeadMeta["twitter"] | undefined = undefined;
</script>

<!--
  @component
  Head component.
  Generates title and meta tags for `<svelte:head />`.
  
  !There is a problem with dublication of head contents cause of hydration
  when `<svelte:head />` used in components.
  Look for more information and progress of the issue:
  https://github.com/sveltejs/svelte/issues/5668
  
  Props:
  
    | Name    | type                                         | default   | description                            |
    |:--------|:---------------------------------------------|:----------|:---------------------------------------|
    | title   | string                                       | undefined | `<title>` contents                     |
    | meta    | Partial<Record<HeadMetaKeys, string>>        | undefined | any valid meta key:value pairs         |
    | og      | Partial<Record<HeadMetaKeysOG, string>>      | undefined | og type meta key:value pairs           |
    | article | Partial<Record<HeadMetaKeysArticle, string>> | undefined | article type meta key:value pairs      |
    | twitter | Partial<Record<HeadMetaKeysTwitter, string>> | undefined | twitter card type meta key:value pairs |
  
-->
<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
</svelte:head>
<MetaTemplate {meta} />
<MetaTemplate meta={og} prefix="og:" />
<MetaTemplate meta={article} prefix="article:" />
<MetaTemplate meta={twitter} prefix="twitter:" />