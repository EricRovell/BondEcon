<script lang="ts">
  export let name: string | undefined = undefined;
  export let label: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  
  export let list: string[] = []
  export let value: string | undefined = undefined;
  export let listValue: string | undefined = undefined;
  
  // the real input value -> tags as a string with comma as separator
  $: listValue = list.join(",");
  
  function handleKeyPress(event: KeyboardEvent) {
    
    if (event.key === "Enter") {
      event.preventDefault();
      addItem(value);
    }
  }
  
  function addItem(item: string) {
    list = [ ...list, item ];
    value = "";
  }
  
  function removeItem(item: string) {
    list = list.filter(listItem => listItem !== item);
  }
</script>

<label>
  <span>{label}</span>
  <input
    class="tag-list-input"
    type="text"
    {name}
    bind:value={listValue}
  />
  <input
    bind:value
    class="tag-input"
    on:keypress={handleKeyPress}
    type="text"
    {placeholder}
  />
  <!-- <button on:click={() => addItem(value)}>
    +
  </button> -->
  {#if list.length}
    <ol class="tag-list">
      {#each list as item}
        <li>
          <span
            on:click={() => removeItem(item)}
            class="tag"
          >
            {item}
          </span>
        </li>
      {/each}
    </ol>
  {/if}
</label>

<style>
  label {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  
  .tag-list-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }
  
  .tag-input {
    padding: var(--spacing-2, 0.5em);
    font-size: inherit;
  }
  
  .tag-list {
    display: flex;
    gap: 0.5em;
    padding: 0.5em 0;
  }
  
  .tag {
    border: 1px solid rgb(255 255 255 / 0.45);
    padding: 0.25em;
  }
</style>