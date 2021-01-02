<script lang="ts" context="module">
  type HeadMetaKeys =
    "author" | "description" | "keywords" | "subject" | "language" |  "revised" |  "abstract" |
    "topic" | "summary" | "classification" | "designer" | "owner" | "identifier-URL" | "pagename" |
    "category" | "robots";

  type HeadMetaKeysOG =
    "title" | "description" | "type" | "image" | "url" | "locale" | "site_name";
    
  type HeadMetaKeysArticle =
    "author" | "published_time" | "modified_time" | "section" | "tag";
    
  type HeadMetaKeysTwitter =
    "card" | "site" | "creator" | "title" | "description" | "image" | "image:alt";
    
  export type HeadMeta = {
    title?: string;
    meta?: Partial<Record<HeadMetaKeys, string>>;
    og?: Partial<Record<HeadMetaKeysOG, string>>;
    article?: Partial<Record<HeadMetaKeysArticle, string>>
    twitter?: Partial<Record<HeadMetaKeysTwitter, string>>;
  };
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
{#if title}
  <title>{title}</title>
{/if}
<MetaTemplate {meta} />
<MetaTemplate meta={og} prefix="og:" />
<MetaTemplate meta={article} prefix="article:" />
<MetaTemplate meta={twitter} prefix="twitter:" />