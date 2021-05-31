<script context="module" lang="ts">
  import { supportsLocale } from "$stores/locale";
  
  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
  export async function load({ fetch, session }) {
    const locale = supportsLocale(session?.locale)
      ? session.locale
      : "en";
      
    return {
      redirect: `/${locale}/home`,
      status: 301
    };
  }
</script>