<script lang="ts" context="module">
  import type { EcontwittRecordPreview, ArticleRecordCard } from "$components/content";
  
  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
  export async function load({ page, fetch }) {
    const lang = page.params.locale ?? "ru";
    
    const responses = await Promise.all([
      fetch(`/api/blog/econtwitts.json?lang=${lang}&limit=10&projection=summary`),
      fetch(`/api/blog/articles.json?lang=${lang}&limit=5&projection=card`)
    ]);
    
    const [ econtwitts, articles ] = await Promise.all(responses.map(r => r.json()));
      
    return {
      props: {
        econtwitts,
        articles
      }
    };
  }
</script>

<script lang="ts">
  import { Heading, FlexBox, GridView, Head } from "$ui";
  import { ArticleCard, EcontwittPreview } from "$components/content";
  import { message } from "$stores/locale";
  import type { HeadMeta } from "$ui/util/head";
  import { econtwittPath, articlesPagePath, econtwittsPagePath } from "$core/routes";
  
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
    <Heading level={1} weight={600} size={5} href={$econtwittsPagePath}>
      {$message("econtwitts", "Econtwitts")}
    </Heading>
    <FlexBox tag="ol" direction="column" gap="0.75em">
      {#each econtwitts as { _id, ...rest }}
        <li>
          <EcontwittPreview {...rest} href={$econtwittPath(_id)} />
        </li>
      {/each}
    </FlexBox>
  </section>
  <section>
    <Heading level={1} weight={600} size={5} href={$articlesPagePath}>
      {$message("articles", "Articles")}
    </Heading>
    <GridView tag="ol">
      {#each articles as article}
        <li>
          <ArticleCard {...article} />
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