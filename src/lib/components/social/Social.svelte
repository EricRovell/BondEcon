<script lang="ts" context="module">
  import type { Variant } from "./types";
</script>

<script lang="ts">
  import { Icon } from "../svg";

  export let label: string | null = null;
  export let title: string | undefined = undefined;
  export let href: string;
  export let icon: string | null = null;
  export let color: Variant | undefined = undefined;
  export let size: string | undefined = undefined;
  export let hideLabel: boolean = false;
  
  if (!label || !icon) {
    console.error("Social link should have at least icon or label to render.");
  }
</script>

<!--
  @component
  Social Link Component
  
  Usage:
    ```
      <Social {...props} />
    ```
  
  Props:
  
    | Name      | type     | default   | description                           |
    |:----------|:---------|:----------|:--------------------------------------|
    | label     | string?  | null      | Label text.                           |
    | title     | string?  | undefined | Social item title.                    |
    | href      | string   | -         | Social item hyperlink.                |
    | icon      | string?  | null      | Social item svg compound path.        |
    | color     | Variant? | undefined | Social item icon color variant.       |
    | size      | string?  | undefined | Social item icon size.                |
    | hideLabel | boolean? | false     | Hides the label and leaves only icon. |
    
  Inherited Custom Props:
  
    | Name                    | type     | default | description                    |
    |:------------------------|:---------|:--------|:-------------------------------|
    | --spacing-1             | <length> | 0.25em  | Defines item's padding.        |
    | --spacing-2             | <length> | 0.5em   | Defines icon and label gap.    |
    | --color-primary         | <color>  | orange  | Defines outline color.         |
    | --social-item-font-size | <length> | inherit | Defines the label's font-size. |
-->
<a {href} {title}>
  {#if icon}
    <Icon path={icon} {color} {size} />
  {/if}
  {#if label && !hideLabel}
    <span>{label}</span>
  {/if}
</a>

<style>
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-2, 0.5em);
    padding: var(--spacing-1, 0.25em);
    outline-color: var(--color-primary, orange);
    font-size: var(--social-item-font-size, inherit);
    transition: filter 0.25s linear;
  }
  
  a:hover {
    filter: hue-rotate(90deg);
  }
</style>