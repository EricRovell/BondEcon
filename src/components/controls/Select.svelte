<script lang="ts" context="module">
  interface SelectOption {
    label: string;
    value?: string | number | null;
  }
</script>

<script lang="ts">
  export let options: SelectOption[];
  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let label: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let value: string | null = null;
  export let defaultOption: string | null = null;
  
  export let hiddenFocus = false;  
  export let outline: boolean = true;
</script>

<!--
  @component
  Select component.
  
  Usage:
    ```
      <SelectControl
        title="Select a language"
        label="Content language",
        name="filter-language",
        id="filter-language",
        options={[
          { label: "Русский", value: "ru" },
          { label: "English", value: "en" },
        ]}
        hiddenFocus
        on:change={handleChange}
      />
    ```
  
  Props:

    | Name          | type         | default   | description                                                   |
    |:--------------|:-------------|:----------|:--------------------------------------------------------------|
    | id            | string       | undefined | input's ID                                                    |
    | name          | string       | undefined | input's name                                                  |
    | label         | string       | undefined | label text                                                    |
    | title         | string       | undefined | used in case if no label needed for better accessibility      |
    | options       | SelectOption |     -     | select options object                                         |
    | value         | string       | undefined | current selected value                                        |
    | defaultOption | string       | undefined | default selected value                                        |
    | hiddenFocus   | boolean      | false     | hides the visible focus effects, useful in complex components |
    | outline       | boolean      | false     | renders the outline                                           |
  
  Events:
  
    | Event     | type   |  Description                                                                         |
    |:----------|:-------|:-------------------------------------------------------------------------------------|
    | on:change | Native |Fired when a change to the field's value is confirmed (with Enter or by unfocusing).  |
    | on:blur   | Native |Fired when the field loses focus.                                                     |
  
  Inherited Custom Properties:
  
    | Name               | type     | default | description                                                   |
    |:-------------------|:---------|:--------|:--------------------------------------------------------------|
    | --spacing-2        | <length> | 0.5em   | Determines margin between the input elements and the label.   |
    | --color-1-500      | <color>  | unset   | Determines the background color of the select element.        |
    | --color-gray-700   | <color>  | unset   | Sets the font-color for select element and it's children.     |
    | --spacing-1        | <length> | 0.25em  | Sets the padding of the select element.                       | 
    | --radius-small     | <length> | 2px     | Sets the border-radius of the select element.                 |
    | --focus-ring-size  | <length> | 0       | Sets the focus ring (based on box-shadow) size.               |
    | --focus-ring-color | <color>  | unset   | Sets the focus ring (based on box-shadow) color.              |
-->
<div class="wrapper">
  {#if label}
    <label for={id}>
      {label}
    </label>
  {/if}
  <select
    {id}
    {name}
    {title}
    bind:value
    on:change
    on:blur
    class:outline
    class:hiddenFocus>
      {#each options as { value, label}}
        <option {value} selected={defaultOption === value}>
          {label}
        </option>
      {/each}
  </select>
</div>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  
  label {
    margin-bottom: var(--spacing-2, 0.5em);
  }

  select {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    background: var(--color-1-500);
    color: var(--color-gray-700);
    cursor: pointer;
    border: none;
    
    padding: var(--spacing-1, 0.25em);
    border-radius: var(--radius-small, 2px);
    
    box-shadow: 0 0 0 var(--focus-ring-size, 0) var(--focus-ring-color);
    transition: box-shadow 0.15s linear;
  }
  
  select:hover,
  select:focus {
    --focus-ring-size: 1.5px;
  }
  
  .outline {
    border: 1px solid var(--color-gray-500);
  }
  
  select.hiddenFocus:hover,
  select.hiddenFocus:focus {
    --focus-ring-size: 0;
    
    outline: none;
  }  
</style>