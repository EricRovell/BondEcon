<script lang="ts">
  import { dev } from "$app/env";
  import { Textarea, Button, Select, TagList, DatePicker } from "$ui/input";
  import { econtwittPath } from "$core/routes";
  
  let insertedId = null;
  
  async function handleSubmit(event) {
    const response = await fetch("/api/blog/econtwitts/econtwitt.json", {
      method: "POST",
      body: new FormData(event.target)
    });
    
    insertedId = await response.json();
  }
</script>

{#if dev}
  <form on:submit|preventDefault={handleSubmit}>
    <Textarea
      label="Content:"
      placeholder="The econtwitt body (use Markdown format)"
      name="md"
      cols={25}
      rows={8}
      required
    />
    <Textarea
      label="Summary:"
      placeholder="Post's summary (1 or 2 sentences)"
      name="summary"
      cols={25}
      required
    />
    <TagList
      label="Post tags:"
      name="tags"
      placeholder="Add tags using Enter key"
    />
    <Select
      title="Select a language"
      label="Content language:"
      name="lang"
      options={[
        { label: "Русский", value: "ru" },
        { label: "English", value: "en" },
        { label: "français", value: "fr" },
      ]}
      hiddenFocus
    />
    <DatePicker type="datetime-local" name="date" label="Creation time:" />
    <Button appearance="fill" variant="info" type="submit">Post</Button>
    <Button appearance="outline" variant="info" type="reset">Reset</Button>
  </form>
  <article>
    {#if insertedId}
      {#await insertedId then _id}
        <a href={$econtwittPath(_id)}>
          The link to the post
        </a>
      {:catch error}
        <p>{error.message}</p>
      {/await}
    {/if}
  </article>
{/if}

<style>
  form {
    display: grid;
    grid-auto-flow: row;
    gap: 1em;
    
    place-self: center;
    width: 640px;
  }
</style>