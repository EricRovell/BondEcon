<script lang="ts">
  import { createEventDispatcher } from "svelte";
   
  export let ref: HTMLInputElement | null = null;
  export let value: string = "";
  export let placeholder: string | undefined = undefined;
  export let required = false;
  
  const dispatch = createEventDispatcher();
  
  /**
   * Handles the native on:keydown event to dispatch custom events:
   *  - keydown@enter
   *  - keydown@escape
   * for detecting when "Enter" and "Escape" key is fired,
   * otherwise just dispatches the pressed key value.
   */
  function handleKeydown(event: KeyboardEvent) {
    const key = event.key;
    
    const customEvent = (key === "Enter")
      ? "keydown@enter"
      : (key === "Escape")
      ? "keydown@escape"
      : "keydown";
      
    dispatch(customEvent, {
      key: event.key
    });
  }
</script>

<!--
  @component
  Input type="text" field component.
  
  Usage:
    ```
      <InputText
        bind:value
        on:focus={onFocus}
        on:blur
        on:input
        on:keydown@escape={callback}
        on:keydown@enter={callback}
      />
    ```
    
  Props:
    
    | Name        | type              | default   | description              |
    |:------------|:------------------|:----------|:-------------------------|
    | ref         | HTMLInputElement? | null      | The input node reference |
    | value       | string            | undefined | self-explanatory         |
    | placeholder | string            | undefined | self-explanatory         |
    | required    | boolean           | false     | self-explanatory         |
  
  Forwarded events: 
  
    | Name              | type   | detail  | description                                                                           |
    |:------------------|:-------|:--------|:--------------------------------------------------------------------------------------|
    | on:input          | native | Event   | Fired when any character is added or removed in the text field.                       |
    | on:change         | native | Event   | Fired when a change to the field's value is confirmed (with Enter or by unfocusing).  |
    | on:focus          | native | Event   | Fired when the field gains focus.                                                     |
    | on:blur           | native | Event   | Fired when the field loses focus.                                                     |
    | on:keydown        | native | { key } | Fired when any key is pressed inside the text field.                                  |
    | on:keydown@enter  | custom | { key } | Fired when "Enter" key is pressed inside the text field.                              |
    | on:keydown@escape | custom | { key } | Fired when "Escape" key is pressed inside the text field.                             |
-->
<input
  type="text"
  bind:this={ref}
  {required}
  bind:value
  on:input
  on:change
  on:focus
  on:blur
  on:keydown={handleKeydown}
  {placeholder}
>

<style>
  input {
    background: none;
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    transition: transform 0.15s ease-out;
    
    color: inherit;
    font-size: inherit;
    font-family: inherit;
  }

  input:focus {
    outline: none;
    border: none;
  }

  input:focus::placeholder {
    opacity: 0;
  }

  input::placeholder {
    font-family: inherit;
    color: inherit;
    opacity: 0.75;
  }
</style>