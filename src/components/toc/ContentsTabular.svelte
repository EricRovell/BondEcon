<!--
  @component
  Contents Tabular View Component
  Wrapper tabular table of contents.
  
  Usage:
      ```
        <ContentsTabular>
          <ContentsTab {href} />
          <ContentsTab {href} {active} />
        </ContentsTabular>
      ```
    
  Inherited Custom Props:
  
    | Name              | type     | default     | description                     |
    |:------------------|:---------|:------------|:--------------------------------|
    | --contents-height | <length> | unset       | Contents list height.           |
    | --color-1-500     | <color>  | transparent | Contents list background color. |
-->
<ul>
  <slot />
</ul>

<style>
  ul {
    --contents-height: 50px;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: var(--contents-height);
    width: 100%;
    background-color: var(--color-1-500, transparent);
    border-bottom: 1.5px solid hsl(var(--color-gray-800-str) / 0.15);  
  }
</style>