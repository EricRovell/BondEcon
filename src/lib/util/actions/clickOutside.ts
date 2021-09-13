interface ActionParams {
  enabled: boolean;
  callback: Function;
}

/**
 * Call callback on user click outside the given element.
 * 
 * Usage:
 *  ```
 *    <div use:clickOutside={{ enabled: true, () => console.log("Hello world!") }} />
 *  ```
 */
export function clickOutside(node: HTMLElement, { enabled, callback }: ActionParams) {
  
  const handleOutsideClick = ({ target }: MouseEvent) => {
    if (node.contains(target as Node)) {
      callback();
    }
  };
  
  function update({ enabled }: { enabled: boolean }) {
    enabled
      ? window.addEventListener("click", handleOutsideClick)
      : window.removeEventListener("click", handleOutsideClick);
  }
  
  function destroy() {
    window.removeEventListener("click", handleOutsideClick);
  }
  
  update({ enabled });
  
  return {
    update,
    destroy
  };
}