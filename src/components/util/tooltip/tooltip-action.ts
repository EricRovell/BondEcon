import type { SvelteComponent } from "svelte";
import Tooltip from "./Tooltip.svelte";

export function tooltip(node: HTMLElement) {
  
  let tooltipComponent: SvelteComponent;
  let title: string | null;
  
  const mouseOverHandler = (event: MouseEvent) => {
    title = node.getAttribute("title");
    node.removeAttribute("title");
    
    tooltipComponent = new Tooltip({
      props: {
        title,
        x: event.pageX,
        y: event.pageY
      },
      target: document.body
    });
  };
  
  const mouseLeaveHandler = () => {
    node.setAttribute("title", title || "");
    tooltipComponent.$destroy();
  };
  
  const mouseMoveHandler = (event: MouseEvent) => {
    tooltipComponent.$set({
      x: event.pageX,
      y: event.pageY
    });
  };
  
  node.addEventListener("mouseover", mouseOverHandler);  
  node.addEventListener("mouseleave", mouseLeaveHandler);  
  node.addEventListener("mousemove", mouseMoveHandler);
  
  return {
    destroy() {
      node.removeEventListener("mouseover", mouseOverHandler);  
      node.removeEventListener("mouseleave", mouseLeaveHandler);  
      node.removeEventListener("mousemove", mouseMoveHandler);
    }
  }
}