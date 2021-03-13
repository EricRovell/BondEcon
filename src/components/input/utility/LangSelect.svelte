<script lang="ts" context="module">
  const options = [
    { label: "RU", value: "ru" },
    { label: "EN", value: "en" },
    { label: "FR", value: "fr" }
  ];
</script>

<script lang="ts">
  import { goto, stores } from "@sapper/app";
  import { locale, supportsLocale } from "@stores/locale";
  import { Icon, iconLocale } from "@svg";
  import { Select } from "@components/input";
  
  const { page } = stores();
  
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
    
  Inherited Custom Properties:
  
    | Name               | Type     | Default  | Description                         |
    |:-------------------|:---------|:---------|:------------------------------------|
    | --focus-ring-size  | <length> | 1.5px    | Focus ring size (box-shadow based). |
    | --focus-ring-color | <color>  | unset    | Focus ring color (box-shadow based).|
    | --font-size-6      | <length> | unset    | Options font size.                  |
    | --spacing-1        | <length> | 0.25em   | Icon and options spacing.           |
    | --radius-medium    | <length> | 5px      | Element's border radius.            |
-->
<div class="wrapper">
  <Icon path={iconLocale} color="primary" />
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
    display: flex;
    justify-content: center;
    align-items: center;
    
    box-shadow: 0 0 0 var(--focus-ring-size) var(--focus-ring-color);
    transition: box-shadow 0.15s linear;
    
    font-size: var(--font-size-6);
    padding: var(--spacing-1, 0.25em);
    border-radius: var(--radius-medium, 5px);
  }
  
  .wrapper:focus-within,
  .wrapper:hover {
    --focus-ring-size: 1.5px;
  }
  
  .wrapper :global(select) {
    --focus-ring-size: 0;
  }
</style>