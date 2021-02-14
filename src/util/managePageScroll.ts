/**
 * Desables/Enables page scroll depending on condition.
 */
export function managePageScroll(condition: boolean) {
  // SSR check
  if (!globalThis.window) return;
  
  if (condition) {
    // prevent page scroll
    // mostly for safari hack
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    const scrollY = parseInt(document.body.style.top || "0");
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollY * -1);
  }
}