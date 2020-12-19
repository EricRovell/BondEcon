export async function share({ title, text, url }: ShareData) {
  if (!navigator.share) return;

  try {
    await navigator.share({
      title,
      text,
      url
    });
  } catch (error) {
    console.error(`Sharing was unsuccessful: ${error}`);
  }
}