# Aprincar — Checklist de implementação visual 1:1

Status: **LOCKED / fonte única de verdade**

A implementação desta branch deve reproduzir os boards aprovados pelo produto. Nenhum componente pode ser reinterpretado para outro estilo visual sem uma nova aprovação explícita.

## Regra de ouro

- [x] Congelar a direção visual aprovada.
- [x] Não reutilizar o mascote geométrico anterior.
- [x] Não reutilizar a marca triangular/Portal v4 anterior como identidade final.
- [x] Não criar uma terceira direção visual durante a implementação.
- [x] Mobile-first é o baseline.
- [x] Acessibilidade e funcionalidade não podem ser removidas para obter fidelidade visual.

## Identidade

- [ ] Logo com símbolo em A arredondado azul + play amarelo.
- [ ] Wordmark Aprincar em Navy + Blue.
- [ ] Tagline: **Brincar hoje. Descobrir sempre.**
- [ ] Mascote oficial: menino/cartoon com camiseta Aprincar, mochila azul, shorts azuis e detalhes amarelos.
- [ ] Variantes claras/escuras da marca.
- [ ] Favicon/app icon derivados da mesma marca.
- [ ] Remover usos visuais da identidade anterior nas telas de produto.

## Tokens do Design System

- [ ] Poppins como família principal da interface.
- [ ] Primary `#2563EB`.
- [ ] Secondary `#0EA5E9`.
- [ ] Accent `#FBBF24`.
- [ ] Success `#10B981`.
- [ ] Info `#06B6D4`.
- [ ] Warning `#F59E0B`.
- [ ] Error `#EF4444`.
- [ ] Navy/Neutral 900 coerente com o board.
- [ ] Radius, shadows, strokes e espaçamentos centralizados em tokens.
- [ ] Claro / Escuro / Automático / Alto contraste funcionando.

## Shell e navegação

- [ ] Header mobile idêntico à linguagem do board.
- [ ] Navegação inferior: Início / Jogos / Mundos ou Biblioteca conforme contexto aprovado / Progresso ou Mais conforme fluxo final.
- [ ] Ícones outline arredondados e consistentes.
- [ ] Alvos de toque >= 44px.
- [ ] Safe-area iOS/Android.
- [ ] Foco visível e teclado no desktop.

## Home

- [ ] Hero claro, com headline **Descobrir é uma grande aventura!**
- [ ] Mascote à direita/abaixo conforme breakpoint.
- [ ] CTA azul **Explorar jogos**.
- [ ] Categorias em cards coloridos.
- [ ] Destaques em cards compactos.
- [ ] Layout mobile coerente com o board aprovado.

## Catálogo

- [ ] Header **Jogos educativos**.
- [ ] Busca.
- [ ] Chips Todos / Números / Letras / Lógica / Cores / Memória / Criatividade.
- [ ] Cards brancos, compactos, com thumbnail, categoria, idade e CTA.
- [ ] Nenhum card escuro fora do tema escuro.
- [ ] Finalidade pedagógica acessível sem poluir o card.

## Progresso

- [ ] Tela visual por famílias/habilidades.
- [ ] Barras coloridas por categoria.
- [ ] Estados e percentuais legíveis.
- [ ] Evidência não apresentada como domínio.

## Mascote e assets

- [ ] Asset principal do mascote extraído da referência aprovada.
- [ ] Expressões/poses futuras usam o mesmo personagem.
- [ ] Frutas aprovadas: maçã, banana, uva, laranja, pera, morango, melancia, abacaxi, manga e kiwi.
- [ ] Nenhum emoji substitui fruta/objeto quando existe asset aprovado.
- [ ] Thumbnails dos jogos usam a mesma linguagem ilustrativa.

## Jogos / runtime

- [ ] Header do jogo alinhado à marca nova.
- [ ] Área de jogo visualmente integrada ao produto.
- [ ] Cesta de Frutas usa frutas refinadas.
- [ ] Conte os Bichos usa ilustração refinada.
- [ ] Botões e feedback seguem tokens do Design System.
- [ ] Portrait 360/390 validado.
- [ ] Landscape validado quando suportado.
- [ ] Tablet validado.
- [ ] Touch e drag continuam funcionais.

## Telas secundárias

- [ ] Biblioteca.
- [ ] Mundos/famílias.
- [ ] Mais.
- [ ] Configurações.
- [ ] Área do responsável.
- [ ] Onboarding.
- [ ] Empty/loading/error states.

## QA final

- [ ] Nenhum componente relevante usa hardcode fora dos tokens sem justificativa.
- [ ] Nenhum asset legado aparece no produto.
- [ ] Revisão visual lado a lado com os boards aprovados.
- [ ] 320/360/390/430px.
- [ ] Tablet portrait/landscape.
- [ ] Desktop.
- [ ] Claro.
- [ ] Escuro.
- [ ] Alto contraste.
- [ ] Reduced motion.
- [ ] Testes de navegação e jogos.
- [ ] Publicação no Pages validada após merge.
