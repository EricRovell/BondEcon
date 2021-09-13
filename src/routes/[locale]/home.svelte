<script>
  import { page } from "$app/stores";
  import { _, locale } from "svelte-i18n";
  import { SVG, girlWithDog } from "@components/svg";

  $: $locale = $page.params.locale;
</script>

<main>
  <h1>{$_("message.welcome")}</h1>
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

  h1 {
    font-size: var(--font-size-7);
  }

  p {
    font-size: var(--font-size-5);
  }

  h1, p {
    text-align: center;
  }
</style>