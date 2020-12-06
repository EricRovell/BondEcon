interface ObserverParams {
  targets: string[] | string;
  handleIntersect: (entries: any, observer?: IntersectionObserver) => void
}

export function observe(node: HTMLElement, { targets, handleIntersect }: ObserverParams) {
  
  const observables = [];
  
  for (let target of targets) {
    observables.push(
      node.querySelector(target)
    );
  }
  
  if (!targets.length) return;

  const observer = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  });

  for (let observable of observables) {
    observer.observe(observable);
  }

  return {
    destroy() {
      console.log("Stop observing!")
      observer.disconnect();
    }
  }
}