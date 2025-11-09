# Sistema de Gestão de Estoque

Sistema completo de gestão de estoque desenvolvido com React, TypeScript, Tailwind CSS e DaisyUI.

## Funcionalidades

- ✅ Dashboard com métricas em tempo real
- ✅ Cadastro, edição e exclusão de produtos
- ✅ Controle de estoque com alertas de reposição
- ✅ Histórico completo de movimentações
- ✅ Importação de produtos via CSV
- ✅ Exportação de dados em CSV e JSON
- ✅ Filtros e busca avançada
- ✅ Ordenação de tabelas
- ✅ Interface responsiva

## Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **DaisyUI** - Componentes para Tailwind CSS

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Alert.tsx
│   ├── AlertContainer.tsx
│   ├── DashboardCard.tsx
│   ├── EmptyState.tsx
│   ├── Modal.tsx
│   ├── StockBadge.tsx
│   └── Tabs.tsx
├── features/           # Features/páginas da aplicação
│   ├── alerts/
│   ├── dashboard/
│   ├── export/
│   ├── import/
│   ├── movements/
│   └── products/
├── hooks/              # Custom hooks
│   └── useInventory.ts
├── lib/                # Utilitários
│   └── utils.ts
├── services/           # Serviços de negócio
│   ├── csv.ts
│   ├── movements.ts
│   ├── products.ts
│   └── storage.ts
├── types/              # Definições TypeScript
│   └── index.ts
├── App.tsx             # Componente principal
├── main.tsx            # Entry point
└── index.css           # Estilos globais
```

## Uso

### Adicionar Produto

1. Navegue para a aba "Adicionar Produto"
2. Preencha os campos obrigatórios (Nome, Categoria, Preço, Estoque)
3. Clique em "Salvar Produto"

### Importar CSV

1. Navegue para a aba "Importar CSV"
2. Arraste um arquivo CSV ou clique para selecionar
3. O formato esperado é: `nome,categoria,preco,estoque`

### Exportar Dados

1. Navegue para a aba "Exportar"
2. Escolha entre CSV ou JSON
3. O arquivo será baixado automaticamente

### Alertas de Reposição

A aba "Alertas" mostra produtos que estão abaixo do estoque mínimo configurado.

## Armazenamento

Os dados são salvos no `localStorage` do navegador. Para produção, recomenda-se integrar com um backend/API.

## Licença

MIT

