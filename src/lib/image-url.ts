export function getProxyImageUrl(imageUrl: string): string {
  const safeUrl = imageUrl?.trim();
  if (!safeUrl) {
    return '';
  }

  try {
    const parsedUrl = new URL(safeUrl);
    const normalizedUrl = `${parsedUrl.host}${parsedUrl.pathname}${parsedUrl.search}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(normalizedUrl)}&n=-1`;
  } catch {
    return safeUrl;
  }
}
