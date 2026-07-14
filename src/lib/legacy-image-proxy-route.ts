import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get('url');

  if (!rawUrl) {
    return new Response('Parâmetro "url" é obrigatório.', { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(rawUrl);
  } catch {
    return new Response('URL inválida.', { status: 400 });
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return new Response('Apenas URLs HTTP(S) são permitidas.', { status: 400 });
  }

  try {
    const upstreamResponse = await fetch(parsedUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageSequenceRenderer/1.0)',
      },
      cache: 'force-cache',
      next: {
        revalidate: 3600,
      },
    });

    if (!upstreamResponse.ok) {
      return new Response(`Falha ao carregar imagem (status ${upstreamResponse.status}).`, {
        status: 502,
      });
    }

    const contentType = upstreamResponse.headers.get('content-type') ?? 'image/jpeg';
    const cacheControl = upstreamResponse.headers.get('cache-control') ?? 'public, max-age=3600';
    const body = await upstreamResponse.arrayBuffer();

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
      },
    });
  } catch {
    return new Response('Erro ao buscar imagem no servidor de origem.', { status: 502 });
  }
}
