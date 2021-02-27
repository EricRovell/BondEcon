<script lang="ts" context="module">
  import { portal } from "./portal";
</script>

<script lang="ts">
  export let target: string | HTMLElement = "body";
</script>

<!--
  @component
  Portal Component
  
  Renders default slot into the target element.
  Target can be a HTMLElement or a css selector that points to an already existing element.
  When no target is given it defaults to: document.body.
  
  The hidden atrribute is only needed when using ssr,
  when portal has moved the element to it's targetted location it removes the hidden attribute.
  
  Usage:
    ```
      <Portal target="body">
        <div class="toast">Entity successfully updated!</div>
      </Portal>
    ```
  
  Props:
  
    | Name    | type                  | default | description         |
    |:--------|:----------------------|:--------|:--------------------|
    | target  | string OR HTMLElement | body    | The target element. |
-->
<div class="portal" use:portal={target} hidden>
  <slot />
</div>

<style>
  .portal {
    display: contents;
  }
</style>