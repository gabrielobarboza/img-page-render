"use client";

import Link from 'next/link';
import { getProxyImageUrl } from '@/lib/image-url';

export interface ImagesData {
  url_path: string;
  page_title: string;
  description: string;
  images: string[];
}

export default function ImageSequenceViewer({ page }: { page: ImagesData }) {
  const totalImages = page.images.length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="viewer-page">
      {/* Toolbar */}
      <div className="viewer-toolbar no-print">
        <div className="viewer-shell viewer-toolbar-inner">
          <Link
            href="/"
            className="viewer-button viewer-button-secondary"
          >
            ← Voltar para home
          </Link>

          <button
            type="button"
            onClick={handlePrint}
            className="viewer-button viewer-button-primary"
          >
            Imprimir / PDF
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="viewer-header no-print">
        <div className="viewer-shell viewer-header-inner">
          <div className="viewer-header-copy">
            <span className="viewer-eyebrow">Página interna</span>
            <h1 className="viewer-title">{page.page_title}</h1>

            {page.description ? (
              <p className="viewer-description">{page.description}</p>
            ) : null}
          </div>

          <div className="viewer-metadata">
            <div className="viewer-metadata-item">
              <span className="viewer-metadata-label">Path</span>
              <span className="viewer-metadata-value">/{page.url_path}</span>
            </div>
            <div className="viewer-metadata-divider" />
            <div className="viewer-metadata-item">
              <span className="viewer-metadata-label">Imagens</span>
              <span className="viewer-metadata-value">{totalImages}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="viewer-content">
        {totalImages === 0 ? (
          <div className="viewer-empty-state">Nenhuma imagem encontrada no JSON.</div>
        ) : (
          <div className="viewer-images">
            {page.images.map((imageUrl, index) => (
              <img
                key={`${page.page_title}-${index}`}
                src={getProxyImageUrl(imageUrl)}
                alt={`${page.page_title}-${index}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="viewer-image"
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="viewer-footer no-print">
        <p>{totalImages} imagem(ns)</p>
      </footer>
    </div>
  );
}
