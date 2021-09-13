<script>
  import { page } from "$app/stores";
  import { _, locale } from "svelte-i18n";
  import { SVG, girlWithDog } from "@components/svg";

  $: $locale = $page.params.locale;
</script>

<main>
  <h1>{$_("message.welcome")}</h1>
  <SVG data={girlWithDog} size="400px" />
  <p>{$_("message.wip:page")}</p>
</main>

<style>
  main {
    display: grid;
    justify-items: center;
    width: 100%;
    margin-top: 10vh;
  }

  p {
    font-size: var(--font-size-7);
  }
</style>