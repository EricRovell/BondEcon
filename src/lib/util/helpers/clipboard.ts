/**
 * Copies the string to clipboard using Clipbard API or "execCommand" if not supported.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  return (navigator.clipboard)
    ? await copyWithNavigator(text)
    : copyWithDummyInput(text);
}

/**
 * Copies string to Clipboard using Clipboard API.
 */
async function copyWithNavigator(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Something is wrong:", error.message);
    return false;
  }
}

/**
 * Copies string to clipboard using "execCommand" on dummy input control.
 */
function copyWithDummyInput(text: string) {
  // Dummy input woth execCommand method
  const input = document.createElement("textarea");
  input.value = text;

  // avoid scrolling
  input.style.top = "0";
  input.style.left = "0";
  input.style.position = "fixed";

  document.body.appendChild(input);
  input.focus();
  input.select();

  try {
    document.execCommand("copy");
  } catch (error) {
    console.error("Something is wrong:", error.message);
    return false;
  } finally {
    document.body.removeChild(input);
  }

  return true;
}