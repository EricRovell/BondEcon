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