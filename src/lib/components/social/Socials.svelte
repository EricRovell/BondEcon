<script lang="ts" context="module">
  import type { SocialItem, Variant } from "./types";
</script>

<script lang="ts">
  import Social from "./Social.svelte";
  
  export let data: SocialItem[] = [];
  export let color: Variant | undefined = undefined;
  export let size: string | undefined = undefined;
  export let hideLabel: boolean = false;
  
  if (hideLabel && data.some(({ icon }) => !icon)) {
    console.error("To hide labels all social items should have icons.");
  }
</script>

<!--
  @component
  Social Links View Component
  Renders a predefined list of owners social links.
  
  Usage:
    ```
      <Socials {data} />
    ```
  
  Props:
  
    | Name      | Type       | Default   | Description                           |
    |:----------|:-----------|:----------|:--------------------------------------|
    | data      | SocialItem | []        | The size of social icons              |
    | color     | Variant?   | undefined | Social item icon color variant.       |
    | size      | string?    | undefined | Social item icon size.                |
    | hideLabel | boolean?   | false     | Hides the label and leaves only icon. |
    
  Inherited Custom Props:
  
    | Name              | type     | default | description        |
    |:------------------|:---------|:--------|:-------------------|
    | --spacing-em-base | <length> | 0.25em  | Defines items gap. |
-->
<ul>
  {#each data as social}
    <li>
      <Social
        {...social}
        {hideLabel}
        {color}
        {size}
      />
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-flow: row wrap;
    place-content: center;
    gap: var(--spacing-em-base, 0.25em);
    width: min(100%, 720px);
  }
  
  ul li {
    list-style: none;
    height: 100%;  
    flex-grow: 1;
    flex-basis: 0;
  }
</style>