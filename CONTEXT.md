# Contexto do Projeto - Image PDF Renderer

## 📋 Resumo Geral
Projeto **Next.js 16** com **React 19** e **TypeScript** que renderiza imagens em sequência a partir de um arquivo JSON (`public/data/images.json`). Preparado para gerar PDFs a partir de imagens.

**Status:** ✅ Funcionando | **Porta:** `http://localhost:3000`

---

## 🚀 Quick Start

### Iniciar servidor de desenvolvimento
```bash
cd /e/Dev/page-images
npm run dev
```

### Compilar para produção
```bash
npm run build
npm run start
```

### Verificar código (linting)
```bash
npm run lint
```

---

## 📁 Estrutura do Projeto

```
/e/Dev/page-images/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Página principal (renderiza ImageSequenceViewer)
│   │   ├── layout.tsx         # Layout raiz da aplicação
│   │   └── globals.css        # Estilos globais Tailwind
│   └── components/
│       └── ImageSequenceViewer.tsx  # Componente principal
├── public/
│   └── data/
│       └── images.json        # Arquivo de configuração com URLs das imagens
├── next.config.ts            # ⚙️ Configurado para aceitar imagens de qualquer fonte
├── tsconfig.json             # Configuração TypeScript
├── tailwind.config.ts        # Tailwind CSS config
├── package.json              # Dependências do projeto
└── README_PT.md              # Documentação em Português
```

---

## 🔧 Configurações Críticas

### 1. **next.config.ts** - Remote Patterns
✅ **JÁ CONFIGURADO** para aceitar imagens de qualquer fonte (HTTP/HTTPS):
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**' },
    { protocol: 'http', hostname: '**' },
  ],
}
```

**Por que?** Permite usar imagens de qualquer URL sem erros de `hostname not configured`.

### 2. **ImageSequenceViewer.tsx** - Componente Principal
- Carrega dados de `public/data/images.json`
- Gerencia estado de navegação (índice da imagem atual)
- Renderiza miniaturas para navegação rápida
- Trata erros de carregamento

---

## 📸 Como Adicionar/Modificar Imagens

Edite o arquivo `public/data/images.json`:

```json
{
  "title": "Seu Título",
  "description": "Sua Descrição",
  "images": [
    {
      "id": 1,
      "title": "Nome da Imagem",
      "url": "https://seu-link-da-imagem.jpg"
    },
    {
      "id": 2,
      "title": "Outra Imagem",
      "url": "https://outro-link.png"
    }
  ]
}
```

**URLs testadas e funcionando:**
- `https://picsum.photos/800/1000` - Imagens aleatórias
- Qualquer URL de imagem pública (PNG, JPG, WebP, etc.)

---

## 🎯 Recursos Atuais

✅ Renderização de imagens em sequência  
✅ Navegação anterior/próxima  
✅ Miniaturas clicáveis  
✅ Estado de carregamento  
✅ Tratamento de erros  
✅ Design responsivo com Tailwind  
✅ Tema dark mode  
✅ TypeScript com tipagem completa  

---

## 🔮 Próximas Features (TODO)

- [ ] Exportação para PDF (usar biblioteca como `html2pdf` ou `jsPDF`)
- [ ] Upload de arquivo JSON customizado
- [ ] Atalhos de teclado (setas, espaço)
- [ ] Modo fullscreen
- [ ] Zoom nas imagens
- [ ] Animações de transição
- [ ] Controle de zoom com mouse wheel

---

## 🛠️ Stack Técnico

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| Next.js   | 16.2.10 | Framework React/SSR |
| React     | 19     | UI Components |
| TypeScript| Latest | Type Safety |
| Tailwind CSS | Latest | Estilização |
| ESLint    | Latest | Linting |
| Node.js   | 18+    | Runtime |
| npm       | 10+    | Package Manager |

---

## 📝 Tipo de Dados

### ImagesData Interface
```typescript
interface ImagesData {
  title: string;
  description: string;
  images: ImageItem[];
}

interface ImageItem {
  id: number;
  title: string;
  url: string; // URL da imagem (HTTP ou HTTPS)
}
```

---

## ⚠️ Pontos Importantes

1. **Endpoint JSON:** O arquivo `public/data/images.json` é servido em `GET /data/images.json`
2. **Otimização de Imagens:** Next.js otimiza automaticamente (webp, cache, etc.)
3. **URLs Externas:** Todas as URLs precisam ser válidas e acessíveis
4. **TypeScript:** Componente é `'use client'` (Client Component)
5. **Tailwind:** Estilos globais aplicados em `src/app/globals.css`

---

## 🐛 Troubleshooting

### Erro: "hostname not configured"
✅ **Resolvido** - `next.config.ts` já está configurado com wildcards

### Imagens não carregam
- Verifique se a URL é válida
- Teste a URL no navegador
- Verifique se a origem permite CORS

### Servidor não inicia
```bash
# Limpar cache e reinstalar
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

---

## 📚 Referências Úteis

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

## 📅 Última Atualização
**Data:** 14/07/2026  
**Mudanças:** Projeto criado, configuração de remote patterns, dados de exemplo adicionados

---

**Desenvolvido com ❤️ usando Next.js + React + TypeScript**
