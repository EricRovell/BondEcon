<script>
  import { page } from "$app/stores";
  import { _, locale } from "svelte-i18n";
  import { SVG, girlWithDog } from "@components/svg";

  $: $locale = $page.params.locale;
</script>

<main>
  <SVG data={girlWithDog} size="min(100%, 75vw, 350px)" />
  <p>{$_("message.wip:page")}</p>
</main>

<style>
  main {
    display: grid;
    gap: 1em;
    justify-items: center;
    width: 100%;
  }

  p {
    font-size: var(--font-size-5);
		text-align: center;
  }
</style>