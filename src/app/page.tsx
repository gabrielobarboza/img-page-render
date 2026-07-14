import Link from 'next/link';
import Image from 'next/image';
import { getAllPages } from '@/lib/images-pages';
import { getProxyImageUrl } from '@/lib/image-url';

export default function Home() {
  const pages = getAllPages();

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <div className="catalog-shell catalog-header-inner">
          <div className="catalog-header-copy">
            <span className="catalog-eyebrow">Image PDF Renderer</span>
            <h1 className="catalog-title">Catálogo de páginas</h1>
            <p className="catalog-description">
              Selecione uma página para abrir a sequência completa. Cada card mostra a imagem de capa da página.
            </p>
          </div>

          <div className="catalog-metadata">
            <div className="catalog-metadata-item">
              <span className="catalog-metadata-label">Páginas</span>
              <span className="catalog-metadata-value">{pages.length}</span>
            </div>
            <div className="catalog-metadata-divider" />
            <div className="catalog-metadata-item">
              <span className="catalog-metadata-label">Formato</span>
              <span className="catalog-metadata-value">3:4</span>
            </div>
          </div>
        </div>
      </header>

      <div className="catalog-shell">

        {pages.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-400">
            Nenhuma página encontrada no JSON.
          </div>
        ) : (
          <div className="catalog-grid">
            {pages.map((page) => {
              const coverImage = page.images[0];

              return (
                <Link
                  key={page.url_path}
                  href={`/${page.url_path}`}
                  className="catalog-card group"
                >
                  <div className="catalog-card-media">
                    {coverImage ? (
                      <Image
                        src={getProxyImageUrl(coverImage)}
                        alt={`${page.page_title}-0`}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                        unoptimized
                        className="catalog-card-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-500">
                        Sem imagem
                      </div>
                    )}

                    <div className="catalog-card-overlay" />
                  </div>

                  <div className="catalog-card-body">
                    <div>
                      <h2 className="catalog-card-title">{page.page_title}</h2>
                      {page.description ? (
                        <p className="catalog-card-description">{page.description}</p>
                      ) : null}
                    </div>

                    <div className="catalog-card-meta">
                      <span>/{page.url_path}</span>
                      <span>{page.images.length} imagem(ns)</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
