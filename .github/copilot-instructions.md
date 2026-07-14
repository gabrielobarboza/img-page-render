# Instruções do Projeto - Image PDF Renderer

Este é um projeto **Next.js 16** que renderiza imagens em sequência a partir de um arquivo JSON.

## 🎯 Objetivo Principal
Criar um visualizador de imagens em sequência com suporte a navegação, miniaturas e preparado para exportação de PDF.

## 📂 Localização do Projeto
- **Caminho:** `/e/Dev/page-images`
- **Sistema:** Windows (E: drive)
- **Porta de desenvolvimento:** `http://localhost:3000`

## 🚀 Como Retomar o Contexto

### 1. Iniciar Servidor
```bash
cd /e/Dev/page-images
npm run dev
```

### 2. Arquivos Principais Para Editar
- **Imagens:** `public/data/images.json` - Adicione/modifique URLs de imagens aqui
- **Componente:** `src/components/ImageSequenceViewer.tsx` - Lógica de visualização
- **Página:** `src/app/page.tsx` - Renderiza o componente
- **Estilos:** `src/app/globals.css` - Estilos Tailwind globais
- **Configuração:** `next.config.ts` - ✅ Já configurado para remotePatterns

### 3. Estrutura de Dados
```typescript
// Formato esperado em public/data/images.json
{
  "title": "string",
  "description": "string", 
  "images": [
    { "id": number, "title": "string", "url": "string" }
  ]
}
```

## ✅ Configurações Já Feitas

1. ✅ **Remote Patterns** - `next.config.ts` aceita HTTP(S) de qualquer hostname
2. ✅ **Tailwind CSS** - Configurado com tema dark
3. ✅ **TypeScript** - Project setup com tipos completos
4. ✅ **App Router** - Estrutura moderna com `app/` directory
5. ✅ **Estilos Globais** - `globals.css` com Tailwind base

## 🔄 Workflow Recomendado

1. **Modificar dados** → Editar `public/data/images.json`
2. **Melhorar componente** → Editar `src/components/ImageSequenceViewer.tsx`
3. **Adicionar features** → Criar novos componentes em `src/components/`
4. **Testar** → Abrir `http://localhost:3000`
5. **Build final** → `npm run build && npm run start`

## 🛠️ Dependências Instaladas
- next@16.2.10
- react@19
- typescript@latest
- tailwindcss@latest
- eslint-config-next@latest

## 📝 Próximas Features Planejadas
- [ ] Exportação para PDF
- [ ] Upload customizado de JSON
- [ ] Atalhos de teclado
- [ ] Modo fullscreen
- [ ] Zoom em imagens
- [ ] Animações de transição

## ⚠️ Pontos Críticos
- **Não edite:** `next.config.ts` (remotePatterns já configurado corretamente)
- **Sempre valide:** URLs das imagens em `public/data/images.json`
- **Componente é:** Client Component (`'use client'` em ImageSequenceViewer.tsx)
- **Formato imagens:** Qualquer URL pública HTTP(S) funcionará

## 🔗 Ver Detalhes Completos
Leia `CONTEXT.md` na raiz do projeto para documentação detalhada.

---
**Última atualização:** 14/07/2026
