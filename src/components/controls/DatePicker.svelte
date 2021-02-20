<script lang="ts">
  export let label: string;
  export let name: string | undefined = undefined;
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
<label>
  <span>{label}:</span>
  <input
    type="date"
    bind:value
    {name}    
    {min}
    {max} />
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
    margin-bottom: 0.4em;
  }

  input[type="date"] {
    --shadow-size: 0;
    
    background: var(--color-1-500);
    color: var(--color-gray-700);
    border: 1px solid var(--color-gray-500);
    border-radius: var(--radius-small);
    padding: var(--spacing-1);
    width: 100%;
    
    box-shadow: 0 0 0 var(--shadow-size) var(--color-3-500);
    transition: box-shadow 0.15s linear;
  }

  input[type="date"]:focus,
  input[type="date"]:hover {
    --shadow-size: 1px;  
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
  }
</style>