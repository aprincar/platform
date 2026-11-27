# Linha única de desenvolvimento da primeira produção

- Branch de trabalho: `feat/production-v5-integration`.
- PR agregador: #88, destinado à main. Nenhuma nova branch de implementação até o encerramento da primeira produção.
- A main permanece como linha publicada; preservar merge commits.

## Reconciliação

- #35 e #67: commits originais já ancestrais da branch de produção; interface e jogos integrados, com correções posteriores.
- #68: script de arquivamento incorporado, com gate de ancestralidade de todas as refs antigas. Não autoriza exclusão sem backup.
- Roadmap: script Projects v2 incorporado; milestones/labels já provisionados. Workflow administrativo temporário não deve ser incorporado.
- Branch de preservação: manifesto de refs e histórico incorporados. Workflow temporário não deve ser repetido.
- V1.1 metadata/learning: histórico preservado; usar catálogo canônico de 14 jogos em vez dos snapshots antigos de 10. Testes de recomendações por contexto recuperados. Missões persistidas por perfil sem produzir evidência de domínio. As outras mudanças antigas não são reintroduzidas automaticamente.
- Branches de diagnóstico do Pages e redesign: históricos preservados; workflows antigos substituídos pelo pipeline da main e checks atuais.

Atualizações major de dependências são avaliadas no #59; não misturar upgrades incompatíveis com a primeira produção.

## Dependências

O grupo #25 de minor/patch será atualizado no lockfile desta mesma branch e validado com a suíte completa. Propostas de upgrade major #9, #13, #16, #17, #21, #22, #23 não fazem parte desta produção inicial: TypeScript, Vite, ESLint, lint-staged, lucide-react, plugin React e tipos Node permanecem nas majors suportadas pelo stack atual. Reavaliar em #59 após a primeira produção, exceto se uma correção de segurança exigir mudança antes. Não considerar as vulnerabilidades moderadas resolvidas sem nova evidência.
