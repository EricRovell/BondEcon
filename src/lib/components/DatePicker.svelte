<script context="module" lang="ts">
  export type DateInputType =
    "datetime-local" |
    "month" |
    "time" |
    "week" |
    "date";
</script>

<script lang="ts">
  export let label: string;
  export let name: string | undefined = undefined;
  export let type: DateInputType = "date";
  export let value: string | undefined = undefined;
  export let min: string | undefined = undefined;
  export let max: string = new Date().toISOString().substring(0, 10);
</script>

<!--
  @component
  Native datepicker component
  
  Usage:
    ```
      <DatePicker
        label="Pick a date"
        name="date-picker"
        value="2020-12-12"
        min="2015-12-12"
        max="2021-01-01"
      />
    ```
    
  | Prop name | type   | default      | description      |
  |-----------|--------|--------------|------------------|
  | label     | string |              | self-explanatory |
  | name      | string | undefined    | self-explanatory |
  | value     | string | undefined    | self-explanatory |
  | min       | string | undefined    | self-explanatory |
  | max       | string | current date | self-explanatory |
-->
<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
  <span>{label}:</span>
  {#if type === "datetime-local"}
    <input type="datetime-local" bind:value {name} {min} {max} />
  {:else if type === "month"}
    <input type="month" bind:value {name} {min} {max} />
  {:else if type === "week"}
    <input type="week" bind:value {name} {min} {max} />
  {:else if type === "time"}
    <input type="week" bind:value {name} {min} {max} />
  {:else}
    <input type="date" bind:value {name} {min} {max} />
  {/if}
</label>

<style>
  label {
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: flex-start;
    width: 100%;
  }

  span {
    margin-bottom: var(--spacing-2, 0.5em);
  }

  input {
    --shadow-size: 0;
    
    background: var(--color-surface-400);
    color: var(--color-gray-700);
    border: 1px solid var(--color-gray-500);
    border-radius: var(--radius-small);
    padding: var(--spacing-2, 0.5em);
    width: 100%;
    
    box-shadow: 0 0 0 var(--shadow-size) var(--color-primary);
    transition: box-shadow 0.15s linear;
  }

  input:focus,
  input:hover {
    --shadow-size: 1px;  
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
  }
</style>