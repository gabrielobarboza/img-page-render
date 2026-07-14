"use client";

import Link from 'next/link';
import Image from 'next/image';
import { getAllPages } from '@/lib/images-pages';
import { getProxyImageUrl } from '@/lib/image-url';
import { useMemo, useState } from 'react';

export default function Home() {
  const pages = useMemo(() => getAllPages(), []);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return pages;
    }

    return pages.filter((page) => {
      return (
        page.page_title.toLowerCase().includes(term) ||
        page.url_path.toLowerCase().includes(term)
      );
    });
  }, [pages, searchTerm]);

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
        <div className="catalog-search-row">
          <label htmlFor="catalog-search" className="catalog-search-label">
            Buscar por título
          </label>
          <div className="catalog-search-input-wrap">
            <span className="catalog-search-icon" aria-hidden="true">🔎</span>
            <input
              id="catalog-search"
              type="search"
              placeholder="Ex.: Bulbasaur, Pikachu, Totodile..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="catalog-search-input"
            />
            <div className="catalog-search-actions">
              {searchTerm ? (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="catalog-search-clear"
                  aria-label="Limpar busca"
                >
                  Limpar
                </button>
              ) : null}
              <span className="catalog-search-count">{filteredPages.length} resultado(s)</span>
            </div>
          </div>
        </div>

        {filteredPages.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-400">
            Nenhuma página encontrada para: {searchTerm}
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredPages.map((page, index) => {
              const coverImage = page.images.find((image) => typeof image === 'string' && image.trim().length > 0);
              const coverSrc = coverImage ? getProxyImageUrl(coverImage) : '';

              return (
                <Link
                  key={page.url_path}
                  href={`/${page.url_path}`}
                  className="catalog-card group"
                >
                  <div className="catalog-card-media">
                    {coverSrc ? (
                      <Image
                        src={coverSrc}
                        alt={`${page.page_title}-0`}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                        unoptimized
                        className="catalog-card-image"
                        priority={index < 2}
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
