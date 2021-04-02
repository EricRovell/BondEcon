<script lang="ts" context="module">
  import { abbreviateNumber } from "@util/helpers";
  import type { Variant } from "#types";
</script>

<script lang="ts">
  export let text: string;
  export let count: number | undefined = undefined;
  export let hash = false;
  export let href: string | undefined = undefined;
  export let variant: Variant | null = null;
  export let appearance: "fill" | "outline" | "text" = "outline";
  export let style: string = "";
  
  $: text = (text && hash) ? `#${text}` : text ? text : "";
  
  $: className = [
    "tag",
    appearance,
    variant ? `variant-${variant}` : "",
    href ? "link" : "",
    count ? "count" : "",
  ].filter(Boolean).join(" ");
  
  /* console.assert(
    appearance === "text" && !count,
    "Using counter with 'text' chip appearance is not encouraged."
  ); */
</script>

<!--
  @component
  Tag/Hashtag Component
  
  Tag component that can denote keywords, provide a link and show a counter.
  
  Usage:
    - Just as text:
        ```
          <Tag {tag} />
        ```
    - With link:
        ```
          Tag {tag} {href} />
        ```
    - With counter:
        ```
          <Tag {tag} {count} />
        ```
    - With counter and link:
        ```
          <Tag {tag} {href} {count} />
        ```
    - With slot:
      ```
        <Tag {tag} {href} {count}>
          <Icon />
        </Tag>
      ```
      
  Props:
  
    | Name       | type              | default   | description                     |
    |:-----------|:------------------|:----------|---------------------------------|
    | text       | string            | -         | The tag content itself.         |
    | href       | string?           | undefined | Use tag as a link.              |
    | count      | number?           | undefined | Provides a counter for a tag.   |
    | hash       | boolean?          | false     | Renders a hash before tag name. |
    | variant    | Variant?          | null      | Sets a variant color theme.     | 
    | appearance | fill/text/outline | outline   | Changes the chip's appearance.  |
    | style      | string            | ""        | Inline styles string.           |
    
  Slots:
  
    Provides a default slot that places content before tag name.
    Usefull for icons, in this case the icon better to have "1em" size.
-->
<span class={className} title={text} {style}>
  <!-- Chip with link and counter-->
  {#if href && !count}
    <a {href}>
      <slot>
        {text}
      </slot>
    </a>
  <!-- Chip with link and without counter-->
  {:else if href && count}
    <a {href}>
      <span>
        <slot>
          {text}
        </slot>
      </span>
      <span class="counter">
        {abbreviateNumber(count)}
      </span>
    </a>
  <!-- Text chip with counter-->
  {:else if !href && count}
    <span>
      <slot>
        {text}
      </slot>
    </span>
    <span class="counter">
      {abbreviateNumber(count)}
    </span>
  <!-- Text chip-->
  {:else}
    <slot>
      {text}
    </slot>
  {/if}
</span>

<style>
  .tag {
    --variant-color: hsl(var(--variant-h) var(--variant-s) var(--variant-l));
    
    --min-width: 0;
    --max-width: 15em;
    
    --border-color: var(--variant-color);
    --shadow-size: 0;
    
    display: inline-block;
    min-width: var(--min-width);
    border-radius: var(--radius-small);
    border: 1px solid var(--border-color);
    box-shadow: 0 0 0 var(--shadow-size) var(--variant-color);
    padding: var(--spacing-1) var(--spacing-2);
    background-color: var(--scheme, transparent);
    
    transition:
      border-color 0.15s linear,
      box-shadow 0.15s linear,
      transform 0.1s ease-in-out;
  }
  
  /* variant custom properties fallback */
  .tag:not([class*="variant-"]) {
    --variant-h: 0;
    --variant-s: 13%;
    --variant-l: 92%;
    /* --variant-contrast: black; */
  }
  
  .fill {
    background-color: var(--variant-color);
    color: var(--variant-contrast);
  }
  
  .fill .counter {
    border-left: 1px solid var(--variant-contrast);
  }
  
  .outline {
    border: 1px solid hsl(var(--variant-h) var(--variant-s) var(--variant-l) / 0.75);
    color: var(--variant-color);
  }
  
  .text {
    border: none;
    color: var(--variant-color);
  }
  
  .text .counter {
    background-color: unset;
    color: var(--variant-color);
    padding-left: 0;
  }
  
  .tag.link {
    cursor: pointer;
  }
  
  /* variations */  
  .tag.link:not(.count),
  .tag:not(.link).count,
  .tag.link.count a {
    display: flex;
    padding: 0;
  }
  
  .link:not(.count) a,
  :not(.link).count span,
  .link.count span {
    padding: var(--spacing-1) var(--spacing-2);
  }
  
  :not(.link):not(.count) a,
  .link.count {
    padding: 0;
  }
  
  .counter {
    background-color: var(--variant-color);
    color: var(--variant-contrast);
  }
  
  .link:not(.count) a,
  .count span:first-child,
  :not(.link):not(.count) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: var(--min-width);
    max-width: var(--max-width);
  }
  
  .link:active {
    transform: scale(0.95);
  }
  
  .link:hover,
  .link:focus {
    --border-color: hsl(var(--variant-h) var(--variant-s) var(--variant-l) / 0.75);
    --shadow-size: 0.1em;
  }
</style>