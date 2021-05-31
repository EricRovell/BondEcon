<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  
  export let element: HTMLElement | null = null;
  export let elements: HTMLElement[] = [];
  export let root: HTMLElement | null = null;
  export let rootMargin: string = "0px";
  export let threshold = 0;
  export let intersecting: IntersectionObserverEntry | null = null;
  export let once: boolean = false;
  
  if (element) {
    elements.push(element);
  }
  
  let observer: IntersectionObserver;
  
  const dispatch = createEventDispatcher();
  
  function handleIntersect(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dispatch("intersect", entry);
        intersecting = entry;
        
        if (once) {
          observer.unobserve(entry.target);
        }
      }
    });
  }
  
  onMount(() => {
    observer = new IntersectionObserver(handleIntersect, {
      root, rootMargin, threshold
    });
    
    for (let element of elements) {
      observer.observe(element);
    }
    
    return () => {
      dispatch("disconnect");
      observer.disconnect();
    }
  });
</script>

<!--
  @component
  Intersection Observer Component
  
  Detect if an element is in the viewport using the Intersection Observer API.
  
  Usage:
    ```
    <div class:intersecting>
      {intersecting ? 'Element is in view' : 'Element is not in view'}
    </div>

    <IntersectionObserver {element} bind:intersecting>
      <div bind:this={element}>Hello world</div>
    </IntersectionObserver>
    ```
    
  Props:
  
    | Name         | type                          | default   | description                                               |
    |:-------------|:------------------------------|:----------|:----------------------------------------------------------|
    | element      | HTMLElement?                  | null      | Element observed for intersection.                        |
    | elements     | HTMLElement[]?                | []        | Elements observed for intersection.                       |
    | root         | HTMLElement?                  | null      | Containing element.                                       |
    | rootMargin   | string                        | 0px       | Margin offset of the containing element.                  |
    | threshold    | number                        | 0         | Percentage of element visibility to trigger an event.     |
    | entry        | IntersectionObserverEntry     | undefined | Observed element metadata.                                |
    | once         | boolean                       | false     | Should the observed element be unobserved upon intersect. |
    | intersecting | boolean                       | null      | Does the observed element is intersecting the viewport.   |
    | observer     | IntersectionObserver instance | -         | IntersectionObserver instance.                            |
    
  Slots:
  
    | Name    | default          | Purpose             |
    |:--------|:-----------------|:--------------------|
    | default | -                | Wraps the children. |
  
  Events:
  
    | Name          | type         | description                                                               |
    |:--------------|:-------------|:--------------------------------------------------------------------------|
    | on:intersect  | custom event | fired when an intersection change occurs and the element is intersecting. |
    | on:disconnect | custom event | fired when the observer is disconnected.                                  |
-->
<slot {intersecting} {observer}>
  <p>Something is wrong.</p>
  <p>Intersection Observer component should have children.</p>
</slot>