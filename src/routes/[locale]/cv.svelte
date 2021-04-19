<script lang="ts" context="module">
  import type { Preload } from "@sapper/common";
  import type { Document } from "#types";
  
  export const preload: Preload = async function(this, page, session) {
    
    const query = new URLSearchParams({
      lang: page.params.locale ?? session.locale ?? "en",
      ...page.query
    });

    const uri = `api/cv/cv.json?${query}`;
    const response = await this.fetch(uri);
    const data: Document = await response.json();

    if (response.status === 200) {
      return {
        data
      };
    }

    this.error(404, "Not Found");
  }
</script>

<script lang="ts">
  import { locale, message } from "@stores/locale";
  import { navigationCV as navigation } from "@core/meta";
  import { Heading, IntersectionObserver, Timeline, TimelineRecord } from "@components";
  import { ContentsTabular, ContentsTab } from "@components/navigation/toc";
  import { ProfileCard, ExperienceCard, EducationCard, ProjectCard } from "@components/cards";

  export let data: Document;
  
  $: sections = [
    {
      sectionDictKey: "sections.experience",
      defaultMessage: "Experience",
      sectionID: "experience",
      data: data.experience,
      Card: ExperienceCard
    },
    {
      sectionDictKey: "sections.projects",
      defaultMessage: "Projects",
      sectionID: "projects",
      data: data.projects,
      Card: ProjectCard
    },
    {
      sectionDictKey: "sections.education",
      defaultMessage: "Education",
      sectionID: "education",
      data: data.education,
      Card: EducationCard
    },
  ];
  
  const timelineSections: HTMLElement[] = [];
  let currentSection: string = "experience";
  
  const handleIntersect = (event: CustomEvent) => {
    const node = event.detail.target;
    currentSection = node.dataset.title;
  };
</script>

<svelte:head>
	<title>CV: Xena Bondarenko</title>
</svelte:head>

<div class="container">
  <nav>
    <ContentsTabular>
      {#each navigation as { href, label, id }}
        <ContentsTab href={`${$locale}${href}`} active={id === currentSection}>
          {label}
        </ContentsTab>
      {/each}
    </ContentsTabular>
  </nav>
  <ProfileCard {...data.contacts} name={data.name} />
  <IntersectionObserver elements={timelineSections} on:intersect={handleIntersect}>
    <div id="cv">
      {#each sections as { sectionDictKey, defaultMessage, sectionID, data, Card }, index}
        <Timeline title={sectionID} bind:node={timelineSections[index]}>
            <Heading slot="title" size={6} weight={600} decorated id={sectionID}>
                {$message(sectionDictKey, { defaultMessage })}
            </Heading>
            {#each data as { timestamp, ...rest }}
              <TimelineRecord {timestamp}>
                <Card {...rest} />
              </TimelineRecord>
            {/each}
        </Timeline>
      {/each}
    </div>
  </IntersectionObserver>
</div>

<style>
  .container {
    display: grid;
    grid-template: auto auto / 1fr minmax(auto, 920px);
    place-items: start center;
    max-width: var(--max-width);
    gap: 1.25em;
    width: 100%;
    
    place-self: center;  
  }
  
  nav {
    position: sticky;
    top: 0;
    width: min(var(--max-width, 1440px), 100%);
    justify-self: center;
    z-index: calc(var(--z-index-navigation) + 1);
    background-color: hsl(var(--surface-h) var(--surface-s-400) var(--surface-l-400) / 0.8);
    backdrop-filter: saturate(180%) blur(5px);
    transition: background-color 0.2s linear;
  }

  #cv {
    grid-column: 2;
    grid-row: 2;

    display: grid;
    row-gap: 4em;
    width: min(840px, 100%);
  }

  /* tabs */
  :global(.container > nav) {
    grid-column: 1 / span 2;
    grid-row: 1;
  }

  @media screen and (max-width: 750px) {

    .container {
      grid-template: repeat(3, auto) / 1fr;
    }

    /* tabs */
    :global(.container > ul) {
      grid-column: 1;
      grid-row: 2;
    }

    #cv {
      grid-column: 1;
      grid-row: 3;
    }
  }
</style>