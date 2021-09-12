<script lang="ts" context="module">
  const options = [
    { label: "RU", value: "ru" },
    { label: "EN", value: "en" }
  ];
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { locale } from "svelte-i18n";
  import { Icon, iconLocale } from "../svg";
  import Select from "../Select.svelte";

  export let title: string | undefined = undefined;
  
  /**
   * Get's the locale value, validates it and updates the URL path.
   * Also, adds a "loc" query parameter.
   */
  async function handleChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    $locale = lang;
    const langRegex = new RegExp(`\/(en|ru)(\/|$)`);
    const newPath = $page.path.replace(langRegex, `/${$locale}/`);
    await goto(`${newPath}`, { noscroll: true });
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
<div class="wrapper" {title}>
  <Icon path={iconLocale} color="primary" />
  <Select
    id="global-language-select"
    name="global-language-select"
    title="Select a language"
    {options}
    hiddenFocus
    outline={false}
    defaultOption={$locale.slice(0, 2)}
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