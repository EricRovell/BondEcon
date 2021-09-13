<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const url = `/data/cv-${page.params.locale}.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					document: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
  import { _ } from "svelte-i18n";
  import { Heading, Timeline, TimelineRecord } from "@components";
  import { ProfileCard, ExperienceCard, EducationCard } from "@components/cards";
  import type { Document } from "@types";

  export let document: Document;
</script>

<svelte:head>
	<title>CV: Xena Bondarenko</title>
</svelte:head>

<div class="container">
  <ProfileCard {...document.contacts} name={document.name} />
    <div id="cv">
      <Timeline>
        <Heading slot="title" size={6} weight={600} decorated>
          {$_("sections.experience")}
        </Heading>
        {#each document.experience as { timestamp, ...rest }}
          <TimelineRecord {timestamp}>
            <ExperienceCard {...rest} />
          </TimelineRecord>
        {/each}
      </Timeline>
        <Heading slot="title" size={6} weight={600} decorated>
          {$_("sections.education")}
        </Heading>
        {#each document.education as { timestamp, ...rest }}
          <TimelineRecord {timestamp}>
            <EducationCard {...rest} />
          </TimelineRecord>
        {/each}
    </div>
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