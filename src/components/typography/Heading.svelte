<script lang="ts" context="module">
  type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  type Alignment = "left" | "center" | "right" | "justify";
  
  /**
   * Action: sets the header's desired type.
   * 
   * With provided heading's level the desired heading element is created.
   * All the attributes are cloned and childNodes are replaced.
   */
  function setHeader(node: HTMLElement, level: HeaderLevel) {
    if (!level) return;

    let header = document.createElement(`h${level}`) as HTMLHeadingElement;
 
    // set attributes to new element 
    [ ...node.attributes ].forEach(attr => {
      header.setAttribute(attr.nodeName, attr.nodeValue)
    });
    
    node.replaceWith(header);
    while (node.firstChild) {
      header.appendChild(node.firstChild)
    }
    
    node = header;
  }
</script>

<script lang="ts">
  export let level: HeaderLevel = undefined;
  export let weight = 700;
  export let size: Size = 5;
  export let alignment: Alignment = "left";
  export let maxlines: number | undefined = undefined;
  export let ellipsis = false;
  export let accent = false;
  export let decorated = false;
  
  export let href: string | undefined = undefined;
</script>

<!--
  @component
  
  Heading component.
  
  Usage:
    ```
      <Heading level={3} weight={800} size={6} href="/some-link">
        Some title
      </Heading>
    ```
  
  Props:
    | Name       | type        | default   | description                                                                                 |
    |------------|-------------|---------- |--------------|------------------------------------------------------------------------------|
    | level      | HeaderLevel | undefined | heading level. If unset, becomes the header                                                 |
    | weight     | number      | 700       | font-weight value                                                                           |
    | size       | number      | 5         | the predefined value of font-size                                                           |
    | alignment  | Alignment   | left      | text alignment                                                                              |
    | maxlines   | number?     | undefined | truncating the text contents by the maximum lines of text. Mutually exclusive with ellipsis |
    | ellipsis   | boolean?    | false     | truncating the text at the end of the line. Mutually exclusive with maxlines                |
    | href       | string      | undefined | sets the link                                                                               |
    | accent     | boolean     | false     | sets the accent text color                                                                  |
    | decorated  | boolean     | false     | sets decorated underline                                                                    |
-->
<header
  class="header align-{alignment}"
  class:accent
  class:align={alignment}
  class:line-clamp={maxlines}
  class:ellipsis
  use:setHeader={level}
  style="--weight: {weight}; --size: var(--font-size-{size}); --maxlines: {maxlines}">
    {#if href}
      <a {href}>
        <slot />
      </a>
    {:else}
      <slot />
    {/if}
</header>

<style>
  .header {
    padding-bottom: var(--spacing-1);
    font-weight: var(--size);
    font-size: var(--size, 1.25em);
    
    line-height: 1.25;
  }
  
  .accent {
    color: var(--color-3-500);
  }
  
  .align-left {
    text-align: left;
  }
  .align-center {
    text-align: center;
  }
  .align-right {
    text-align: right;
  }
  .align-justify {
    text-align: justify;
  }
  
  .center {
    text-align: center;
  }
  
  .line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: var(--maxlines);
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 0
  }
  
  .ellipsis {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .decorated {
    position: relative;
    
    text-align: center;
    padding: var(--spacing-2) var(--spacing-4);
  }
  
  .header.decorated::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    
    border: 0;
    height: 1px;
    width: 100%;
    background: linear-gradient(
      to right,
      hsl(var(--color-gray-500-str) / 0.1),
      hsl(var(--color-gray-700-str) / 0.5),
      hsl(var(--color-gray-500-str) / 0.1)
    );
  }
  
  @supports (font-variation-settings: normal) {
    .header {
      font-weight: unset;
      font-variation-settings: "wght" var(--weight);
    }
  }
</style>