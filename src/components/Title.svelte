<script lang="ts">
  import { Star } from "@svg/complex";
  
  export let size: string = "1em";
  export let iconSize: string = "1.5em";
</script>

<!--
  @component
  
  Website Title Component.
  
  Usage:
    ```
      <Title size="1em" iconSize="1.5em" />
    ```
  
  Props:
  
    | Name       | type    | default | description          |
    |------------|---------|---------|----------------------|
    | size       | string? | 1em     | The title font size. |
    | iconSize   | string? | 1.5em   | The title icon size. |
    
  Inherited Custom Properties:
  
    | Name               | Type     | Default   | Description                          |
    |:-------------------|:---------|:----------|:-------------------------------------|
    | --focus-ring-size  | <length> | 1.5px     | Focus ring size (box-shadow based).  |
    | --focus-ring-color | <color>  | unset     | Focus ring color (box-shadow based). |
    | --spacing-1        | <length> | 0.25em    | Icon and title spacing value.        |
-->
<a href="/" class="logo" style="--title-size: {size}">
  <Star size={iconSize} />
  <span>BondEcon</span>
</a>

<style>
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--title-size, 1em);
    box-shadow: 0 0 0 var(--focus-ring-size) var(--focus-ring-color);
  }
  
  .logo:focus {
    --focus-ring-size: 1.5px;
    outline: none;
  }

  .logo > span {
    display: flex;
    margin-left: var(--spacing-1, 0.25em);  
  }
</style>