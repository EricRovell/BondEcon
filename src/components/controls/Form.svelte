<script lang="ts">
  export let node: HTMLFormElement | null = null;
</script>

<!--
  @components
  Form Component
  
  Usage:
    ```
      <Form on:submit={handleSubmit} />
        <Input />
        <Input />
      </Form>
    ```
    
    Props:
    
      | Name | Type            | Default | Description               |
      |------|-----------------|---------|---------------------------|
      | node | HTMLFormElement | null    | The form's node reference |
      
    Events:
    
      | Name      | Description                  |
      |-----------|------------------------------|
      | on:submit | Fires on submiting the form. |
      
    Inherited Custom Properties:
    
      | Name        | Type     | Default | Description                                              |
      |-------------|----------|---------|----------------------------------------------------------|
      | --spacing-4 | <length> | 1em     | Gap value length between the components direct children. |
-->
<form on:submit bind:this={node}>
  <slot />
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-shrink: 0;
    gap: var(--spacing-4, 1em);

    font-size: inherit;
  }
</style>