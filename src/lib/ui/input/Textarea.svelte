<script lang="ts">
  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let rows: number | undefined = undefined;
  export let cols: number | undefined = undefined;
  export let value: string | undefined = undefined;
  //export let autocomplete = false;
  //export let autofocus = false;
  export let disabled = false;
  export let placeholder: string | undefined = undefined;
  export let readonly = false;
  export let required = false;
  export let form: string | undefined = undefined;
  export let maxlength: number | undefined = undefined;
  export let minlength: number | undefined = undefined;
  export let spellcheck = false;
  
  export let resize = false;
  export let label: string | undefined = undefined;
</script>

<label>
  <slot>
    <span>{label}</span>
  </slot>
  <textarea
    bind:value
    {id}
    {form}
    {name}
    {rows}
    {cols}
    {disabled}
    {placeholder}
    {readonly}
    {required}
    {maxlength}
    {minlength}
    {spellcheck}
    class:resize
  />
</label>

<style>
  label {
    display: flex;
    flex-flow: column;
    gap: var(--spacing-2, 0.5em);
  }
  
  textarea {
    padding: var(--spacing-2, 0.5em);
    resize: none;
  }
  
  label,
  textarea {
    font-family: inherit;
    color: inherit;
    font-size: inherit;
  }
  
  .resize {
    resize: both;
  }
</style>