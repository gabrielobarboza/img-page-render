export function getProxyImageUrl(imageUrl: string): string {
  const safeUrl = imageUrl?.trim();
  if (!safeUrl) {
    return '';
  }

  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

  const withBasePath = (path: string): string => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    if (!basePath) {
      return normalizedPath;
    }

    if (normalizedPath === basePath || normalizedPath.startsWith(`${basePath}/`)) {
      return normalizedPath;
    }

    return `${basePath}${normalizedPath}`;
  };

  const isExternal = /^https?:\/\//i.test(safeUrl) || safeUrl.startsWith('//');

  if (!isExternal) {
    const localPath = safeUrl.replace(/^\.\//, '');
    return withBasePath(localPath);
  }

  try {
    const parsedUrl = new URL(
      safeUrl.startsWith('//') ? `https:${safeUrl}` : safeUrl,
    );
    const normalizedUrl = `${parsedUrl.host}${parsedUrl.pathname}${parsedUrl.search}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(normalizedUrl)}&n=-1`;
  } catch {
    return withBasePath(safeUrl.replace(/^\.\//, ''));
  }
}
