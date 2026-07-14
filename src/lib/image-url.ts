export function getProxyImageUrl(imageUrl: string): string {
  try {
    const parsedUrl = new URL(imageUrl);
    const normalizedUrl = `${parsedUrl.host}${parsedUrl.pathname}${parsedUrl.search}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(normalizedUrl)}&n=-1`;
  } catch {
    return imageUrl;
  }
}
