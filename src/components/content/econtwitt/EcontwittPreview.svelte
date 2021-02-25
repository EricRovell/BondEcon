<script lang="ts">
  import { DateTime } from "@components/typography";
  
  export let _id: string;
  export let lang: string = "en";
  export let summary: string;
  export let date: string;
  export let href: string | null = null;
</script>

<!--
  @component
  Econtwitt Preview Card Component
  
  Usage:
    ```
      <EcontwittPreview {...props} />
    ```
    
  Props:
    
    | Name     | Type   | Default  | Description           |
    |:---------|:-------|:---------|:----------------------|
    | _id      | string | required | Econtwitt's ObjectID. |
    | lang     | string | en       | Content's language.   |
    | summary  | string | required | Short description.    |
    | date     | string | required | Date of creation.     |
    
  Inherited Custom Properties:
  
    | Name                 | Type     | Default  | Description                            |
    |:---------------------|:---------|:---------|:---------------------------------------|
    | --color-1-600        | <color>  | unset    | Card's background color.               |
    | --spacing-em-base    | <length> | 0.25em   | Defines card's padding and inner gaps. | 
    | --radius-medium      | <length> | 5px      | Defines card's border-radius           |
    | --color-primary      | <color>  | orange   | Anchor hover color.                    |
    | --font-size-1        | <length> | unset    | Date string font-size.                 |
    | --color-gray-800-str | <color>  | unset    | Date string font color.                |
    | --focus-ring-size    | <length> | 1.5px    | Focused state box-shadow size.         |
    | --focus-ring-color   | <color>  | orange   | Focused state box-shadow color.        |    
-->
<article {lang}>
  <a href={href ?? `/blogpost/econtwitt-${_id}`} title="Read more">
    <span>{summary}</span>
    <DateTime {date} relative />
  </a>
</article>

<style>
  article {
    --border-color: hsl(217 27% 35%);
    --datetime-font-size: var(--font-size-1);
    --datetime-color: hsl(var(--color-gray-800-str) / 0.75);
    
    font-size: var(--font-size-4);
    background-color: var(--color-1-600);
    border: 1px solid var(--border-color);
  }
  
  a {
    display: grid;
    grid-template: auto auto / 1fr;
    gap: calc(2 * var(--spacing-em-base));
    padding: calc(2 * var(--spacing-em-base, 0.25em)) calc(3 * var(--spacing-em-base, 0.25em));
    width: 100%;
    
    box-shadow: 0 0 0 var(--focus-ring-size, 1.5px) var(--focus-ring-color, orange);
    transition: box-shadow 0.15s linear;
  }
  
  article,
  a {
    border-radius: var(--radius-medium, 5px);  
  }
  
  span {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    /* prevent cutting off some letters */
    padding-bottom: 0.075em;
  }
  
  a:hover,
  a:focus {
    --focus-ring-size: 1.5px;  
    color: var(--color-primary, orange);
  }
  
  a:focus {
    outline: none;
  }
</style>