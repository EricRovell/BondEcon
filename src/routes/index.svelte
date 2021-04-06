<script context="module" lang="ts">
  import type { Preload } from "@sapper/common";
  import { supportsLocale } from "@stores/locale";
  
  export const preload: Preload = async function(this, page, session) {
    const locale = supportsLocale(session?.locale)
      ? session.locale
      : "en";    

    return this.redirect(301, `/${locale}/`);
  }
</script>