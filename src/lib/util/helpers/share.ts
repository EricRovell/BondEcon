export async function webShare({ title, text, url }: ShareData) {
  if (!navigator.share) {
    return false;
  }

  try {
    await navigator.share({
      title,
      text,
      url
    });
    
    return true;
  } catch (error) {
    console.error(`Sharing was unsuccessful: ${error.message}`);
  }
}