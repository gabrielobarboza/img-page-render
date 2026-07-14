import rawData from '../../public/data/images.json';
import type { ImagesData } from '@/components/ImageSequenceViewer';

interface ImagesPagesFile {
  pages: ImagesData[];
}

const imagesPages = rawData as ImagesPagesFile;

export function getAllPages(): ImagesData[] {
  return imagesPages.pages;
}

export function getPageByPath(urlPath: string): ImagesData | undefined {
  return imagesPages.pages.find((page) => page.url_path === urlPath);
}
