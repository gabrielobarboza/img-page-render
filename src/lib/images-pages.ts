import rawData from '../../public/data/images.json';
import type { ImagesData } from '@/components/ImageSequenceViewer';

interface ImagesPagesFile {
  pages: ImagesData[];
}

const imagesPages = rawData as ImagesPagesFile;

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizePages(pages: ImagesData[]): ImagesData[] {
  const usedPaths = new Set<string>();

  return pages
    .map((page, index) => {
      const pageTitle = page.page_title?.trim() || `Página ${index + 1}`;
      const description = page.description?.trim() || '';
      const images = (page.images || [])
        .filter((imageUrl) => typeof imageUrl === 'string')
        .map((imageUrl) => imageUrl.trim())
        .filter((imageUrl) => imageUrl.length > 0);

      const basePath = slugify(page.url_path || pageTitle) || `pagina-${index + 1}`;

      let finalPath = basePath;
      let suffix = 2;
      while (usedPaths.has(finalPath)) {
        finalPath = `${basePath}-${suffix}`;
        suffix += 1;
      }
      usedPaths.add(finalPath);

      return {
        url_path: finalPath,
        page_title: pageTitle,
        description,
        images,
      };
    })
    .filter((page) => page.page_title.length > 0);
}

const normalizedPages = normalizePages(imagesPages.pages || []);

export function getAllPages(): ImagesData[] {
  return normalizedPages;
}

export function getPageByPath(urlPath: string): ImagesData | undefined {
  return normalizedPages.find((page) => page.url_path === urlPath);
}
