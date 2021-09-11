<script>
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  import { locale } from "svelte-i18n";

  if (browser) {
    goto(`${$locale.slice(0, 2)}/home`, { replaceState: true })
  };
</script>