<script context="module" lang="ts">
  let form = {
    dateFrom: {
      name: "filter-date-from",
      min: "2019-01-01"
    },
    dateTo: {
      name: "filter-date-to",
      value: new Date().toISOString().substring(0, 10),
      min: "2019-01-01"
    },
    lang: {
      label: "Content language",
      name: "filter-language",
      id: "filter-language",
      options: [
        { label: "Русский", value: "ru" },
        { label: "English", value: "en" },
        { label: "Français", value: "fr" },
        { label: "Все", value: null }
      ]
    },
    sort: {
      label: "Sort by",
      name: "filter-sort",
      id: "filter-sort",
      options: [
        { label: "By newest", value: -1 },
        { label: "By oldest", value: 1 },
      ]
    }
  };
</script>

<script lang="ts">
  import { message } from "@stores/locale";
  import { goto, stores } from "@sapper/app";
  import { Select, DatePicker, Button, Form } from "..";
  import { Icon, iconCheckmark, iconRepeat } from "@svg";

  const { page } = stores();
  
  export let all = false;
  export let sort = false;
  export let lang = false;
  export let date = false;
  
  let formNode: HTMLFormElement;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    const data = new FormData(formNode);
    
    const state = {
      lang: data.get("filter-language"),
      dateFrom: data.get("filter-date-from"),
      dateTo: data.get("filter-date-to"),
      sort: data.get("filter-sort"),
    };
    
    const query = new URLSearchParams({ ...$page.query, ...state });
    
    for (let [ key, value ] of [ ...query ]) {   
      if (value === "undefined" || value === "") {
        query.delete(key);
      }
    }
    
    await goto(`${$page.path}?${query}`);
  }
  
  async function clearFilters() {
    formNode.reset();
    await goto($page.path);
  }
</script>

<div class="wrapper">
  <Form on:submit={handleSubmit} bind:node={formNode}>
    {#if all || sort}
      <Select
        {...form.sort}
        label={$message("sort", { defaultMessage: "Sort by" })} />
    {/if}
    {#if all || date}
      <DatePicker
        {...form.dateFrom}
        label={$message("published-after", { defaultMessage: "Published after" })} />
      <DatePicker
        {...form.dateTo}
        label={$message("published-before", { defaultMessage: "Published before" })} />
    {/if}
    {#if all || lang}
      <Select
        {...form.lang}
        label={$message("content-language", { defaultMessage: "Content language" })} />
    {/if}
    <div class="action">
      <Button variant="primary" appearance="fill">
        <Icon path={iconCheckmark} />
        Apply
      </Button>
      <Button type="button" on:click={clearFilters} variant="neutral" appearance="outline">
        <Icon path={iconRepeat} />
        Reset
      </Button>
    </div>
  </Form>
</div>

<style>
  .wrapper {
    width: max(250px, 100%);
    background: var(--color-surface-500);
    font-size: var(--font-size-1);
  }
  
  .action {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>