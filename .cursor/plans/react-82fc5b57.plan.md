<!-- 82fc5b57-1af6-431e-afc4-fb9309ae6501 71dd9181-8e95-4946-8801-2e03c48a5dbf -->
# Plano de Migração para React + TS + Tailwind

1. Preparar ambiente Vite/React/TS: inicializar projeto, configurar Tailwind e DaisyUI, migrar assets globais e metadados de `index.html`.
2. Projetar arquitetura em pastas: definir `src/features`, `src/components`, `src/hooks`, `src/lib`, `src/styles`, criar tipos compartilhados e serviços de armazenamento local.
3. Converter estado e lógica: portar serviços (`products`, `movements`, `storage`) para TypeScript modular, garantir APIs equivalentes.
4. Implementar interface React: recriar layout com Tailwind/DaisyUI, criar componentes reutilizáveis (cards, tabelas, tabs, modais, alertas) e telas principais (dashboard, produtos, importar/exportar, histórico, alertas).
5. Garantir paridade funcional: replicar filtros, ordenação, import/export CSV/JSON, validações, alertas; adicionar testes básicos ou verificações manuais e atualizar documentação de uso.

### To-dos

- [ ] Criar nova base Vite React TS com Tailwind e DaisyUI configurados
- [ ] Organizar estrutura de pastas e definir tipos/utilitários compartilhados
- [ ] Migrar lógica de produtos, movimentações e storage para módulos TypeScript
- [ ] Implementar componentes React com Tailwind/DaisyUI replicando todas as telas
- [ ] Testar fluxos principais, exportações/importações e atualizar documentação