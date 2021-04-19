<script context="module" lang="ts">
  import { fetchAll } from "@util";
  import type { Preload } from "@sapper/common";
  import type { EcontwittRecordPreview, ArticleRecordCard } from "@core/components/content";

  export const preload: Preload = async function(this, page, session) {
    const fetch = this.fetch;
    const query = page.query as Record<string, string>;
    const lang = session.locale ?? "en";

    const uriList = [
      `api/blog/econtwitts.json?` + new URLSearchParams({
        ...query,
        lang,
        limit: "10",
        projection: "summary"
      }),
      `api/blog/articles.json?` + new URLSearchParams({
        ...query,
        lang,
        limit: "7",
        projection: "card"
      })
    ];

    const [ econtwitts, articles ]: [ EcontwittRecordPreview[], ArticleRecordCard[] ] = await fetchAll(uriList, fetch);

    return {
      econtwitts,
      articles
    };
  }
</script>

<script lang="ts">
  import { Heading, FlexBox, GridView, Head } from "@components";
  import { ArticleCard, EcontwittPreview } from "@core/components/content";
  import { locale, message } from "@stores/locale";
  import type { HeadMeta } from "@components/util/head";

  const head: HeadMeta = {
    title: "Bondecon: My Personal Space",
    meta: {
      description: "My name is Kseniya Bondarenko, I am passionate learner, researcher, economist, and a phD student.",
      pagename: "Econtwitt: My Personal Blog"
    },
    og: {
      type: "blog",
      image: "img/author.jpg"
    }
  };
  
  export let econtwitts: EcontwittRecordPreview[] = [];
  export let articles: ArticleRecordCard[] = [];
</script>

<!--
  @component
  Home Route
  
  Displays the latest blog content in form of compact cards:
    - Econtwitts, 15 cards;
    - Articles, 7 cards;
    
  More types of content might be added in the future.
-->
<Head {...head} />
<main>
  <section>
    <Heading level={1} weight={600} size={5} href={`/${$locale}/blog/econtwitts`}>
      {$message("econtwitts", { defaultMessage: "Econtwitts" })}
    </Heading>
    <FlexBox tag="ol" direction="column" gap="0.75em">
      {#each econtwitts as { _id, ...rest }}
        <li>
          <EcontwittPreview {...rest} href={`/${$locale}/blogpost/econtwitt-${_id}`} />
        </li>
      {/each}
    </FlexBox>
  </section>
  <section>
    <Heading level={1} weight={600} size={5} href={`/${$locale}/blog/articles`}>
      {$message("articles", { defaultMessage: "Articles" })}
    </Heading>
    <GridView tag="ol">
      {#each articles as { _id, ...rest }}
        <li>
          <ArticleCard {...rest} href={`/${$locale}/blogpost/article-${_id}`} />
        </li>
      {/each}
    </GridView>
  </section>
</main>

<style>
	main {
		display: grid;
    grid-template: 1fr / minmax(250px, 420px) minmax(450px, 1fr);
    
    padding: 5vh 0 20vh 0;
    min-height: 100vh;
    width: min(100%, var(--max-width));
    
    justify-self: center;
  }
  
  li {
    width: 100%;
  }
  
  main > :global(section) {
    padding: var(--spacing-4);
  }
  
  section {
    display: grid;
    row-gap: 1em;
    height: min-content;
  }
  
  @media screen and (max-width: 700px) {
    main {
      grid-template: auto auto / 1fr;
    }
  }
</style>