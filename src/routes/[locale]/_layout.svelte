<script lang="ts" context="module">
  import type { Preload } from "@sapper/common";
  import { registerDictionaries } from "@stores/locale";

  export const preload: Preload = async function(this, page, session) {  
    await registerDictionaries([
      { locale: "en", url: "locale/en/ui.json" },
      { locale: "ru", url: "locale/ru/ui.json" }
    ], page.params.locale ?? session?.locale);
  }
</script>

<slot />