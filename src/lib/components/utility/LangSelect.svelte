<script lang="ts">
  import { locale } from "@stores";
  import { Icon, iconLocale } from "../svg";
  import Select from "../Select.svelte";

  export let title: string | undefined = undefined;
</script>

<div class="lang-select" {title}>
  <Icon path={iconLocale} color="primary" />
	<a href="/ru/home" class:active={$locale === "ru"}>RU</a>
	<a href="/en/home" class:active={$locale === "en"}>EN</a>
</div>

<style>
  .lang-select {
    display: flex;
    justify-content: center;
    align-items: center;
		gap: var(--spacing-1);
   
    font-size: var(--font-size-2);
    padding: var(--spacing-1, 0.25em);
    border-radius: var(--radius-medium, 5px);
		border: var(--border-1);
		padding: 0.5em;
  }

	.active {
		color: var(--color-primary);
	}
</style>