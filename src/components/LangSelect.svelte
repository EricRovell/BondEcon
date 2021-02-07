<script lang="ts">
  import { goto, stores } from "@sapper/app";
  import { locale, supportsLocale } from "@stores/locale";
  import { SVG, iconLocale } from "@svg";
  import { Select } from "@components/controls";
  
  const { page } = stores();
  
  const options = [
    { label: "RU", value: "ru" },
    { label: "EN", value: "en" },
    { label: "FR", value: "fr" }
  ];
  
  /**
   * Get's the locale value, validates it and updates the URL path.
   * Also, adds a "loc" query parameter.
   */
  async function handleChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;

    if (supportsLocale(lang)) {
      $locale = lang;
      
      const query = new URLSearchParams({ ...$page.query, loc: lang });
      await goto(`${$page.path}?${query}`);
    }
  }
</script>

<!--
  @component
  LangSelect Component.
  Provides an option to change the locale of the website.
  
  Usage:
    ```
      <LangSelect />
    ```
-->
<div class="wrapper">
  <SVG data={iconLocale} icon accent />
  <Select
    id="global-language-select"
    name="global-language-select"
    title="Select a language"
    {options}
    hiddenFocus
    outline={false}
    defaultOption={$locale}
    on:change={handleChange}
  />
</div>

<style>
  .wrapper {
    --shadow-size: 0;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    box-shadow: 0 0 0 var(--shadow-size) var(--color-3-500);
    transition: box-shadow 0.15s linear;
    
    font-size: var(--font-size-6);
    padding: var(--spacing-1);
    border-radius: var(--radius-medium);
  }
  
  .wrapper:focus-within,
  .wrapper:hover {
    --shadow-size: 1px;
  }
</style>