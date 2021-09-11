<script lang="ts" context="module">
  import { tick } from "svelte";

  export function portal(element: HTMLElement, target: string | HTMLElement = "body") {
    let targetElement;
    
    async function update(nextTarget: HTMLElement | string) {
      target = nextTarget;
      
      if (typeof target === "string") {
        targetElement = document.querySelector(target);
        
        if (!targetElement) {
          await tick();
          targetElement = document.querySelector(target);
        }
        
        if (!targetElement) {
          throw new Error(`No element found matching css selector: "${target}"`)
        };
        
      } else if (target instanceof HTMLElement) {
        targetElement = target;
      } else {
        throw new TypeError(`Unknown portal target type. Allowed types: string ot istance of HTMLElement`);
      }
      
      targetElement.appendChild(element);
      element.hidden = false;
    }
    
    function destroy() {
      if (element.parentElement) {
        element.parentElement.removeChild(element);
      }
    }
    
    update(target);
    
    return {
      update,
      destroy
    };
  }
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