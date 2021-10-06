<script>
  import { _ } from "svelte-i18n";
  import { Socials } from "./social";
  import Title from "./Title.svelte";
  import { LangSelect } from "./utility";
  import { licencePath } from "@core/routes";
  
  import { socials } from "@core/routes/socials";
  
  import { 
    creatorGithubProfilePath,
    designerPortfolioPath,
    blogPagePath,
    cvPagePath,
    researchPath,
    caseStudiesPath,
    aboutPagePath
  } from "@core/routes";

  $: sitemapRoutes = [
    {
      label: "blog",
      path: $blogPagePath
    },
    {
      label: "cv",
      path: $cvPagePath
    },
    {
      label: "research",
      path: $researchPath
    },
    {
      label: "cases",
      path: $caseStudiesPath
    },
    {
      label: "about",
      path: $aboutPagePath
    }
  ];
</script>

<!--
  @component
  Footer Component
-->
<footer>
  <div class="wrapper">
    <Title size="1.5rem" iconSize="1.75rem" />
    <span class="summary">
      {$_("message.introduction")}
    </span>
    <LangSelect />
    <Socials data={socials} color="info" size="35px" />
    <span class="author">
      <span>Made by</span>
      <a href={creatorGithubProfilePath}>by Eric Rovell,</a>
      <span>illustrated by</span>
      <a href={designerPortfolioPath}>
        Victoria
      </a>
    </span>
    <ul class="sitemap">
      {#each sitemapRoutes as { label, path }}
        <li>
          <a href={path}>
            {$_(`sections.${label}`)}
          </a>
        </li>
      {/each}
    </ul>
    <span class="copyright">
      © {new Date().getFullYear()} BondEcon | <a href={$licencePath}>Licence</a>
    </span>
  </div>
</footer>

<style>
  footer {
    grid-area: footer;
    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: var(--spacing-rem-6, 1.5rem) var(--spacing-rem-2, 0.5rem);
    background: var(--color-surface-300);
  }

  .wrapper {
    display: grid;
    place-items: center;
    gap: var(--spacing-6);
    width: 100%;
    height: 100%;

    justify-self: center;
    max-width: var(--max-width);
  }

  .summary {
    width: 30ch;
    text-align: center;
  }
  
  .author a,
  .copyright a {
    color: var(--color-primary, orange);
  }

  .sitemap {
    display: flex;
    gap: 0.5em;
    color: var(--color-primary);
  }
</style>