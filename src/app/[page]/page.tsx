import { notFound } from 'next/navigation';
import ImageSequenceViewer from '@/components/ImageSequenceViewer';
import { getAllPages, getPageByPath } from '@/lib/images-pages';

export function generateStaticParams() {
  return getAllPages().map((page) => ({
    page: page.url_path,
  }));
}

export default async function ImagesPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageData = getPageByPath(page);

  if (!pageData) {
    notFound();
  }

  return <ImageSequenceViewer page={pageData} />;
}
