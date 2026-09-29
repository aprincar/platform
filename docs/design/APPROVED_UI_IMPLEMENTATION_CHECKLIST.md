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

- [x] Logo com símbolo em A arredondado azul + play amarelo.
- [x] Wordmark Aprincar em Navy + Blue.
- [x] Tagline: **Brincar hoje. Descobrir sempre.**
- [x] Mascote oficial: menino/cartoon com camiseta Aprincar, mochila azul, shorts azuis e detalhes amarelos.
- [x] Variantes claras/escuras da marca.
- [x] Favicon/app icon derivados da mesma marca.
- [x] Remover usos visuais da identidade anterior nas telas de produto.

## Tokens do Design System

- [x] Poppins como família principal da interface.
- [x] Primary `#2563EB`.
- [x] Secondary `#0EA5E9`.
- [x] Accent `#FBBF24`.
- [x] Success `#10B981`.
- [x] Info `#06B6D4`.
- [x] Warning `#F59E0B`.
- [x] Error `#EF4444`.
- [x] Navy/Neutral 900 coerente com o board.
- [ ] Radius, shadows, strokes e espaçamentos centralizados em tokens.
- [x] Claro / Escuro / Automático / Alto contraste funcionando.

## Shell e navegação

- [x] Header mobile idêntico à linguagem do board.
- [ ] Navegação inferior: Início / Jogos / Mundos ou Biblioteca conforme contexto aprovado / Progresso ou Mais conforme fluxo final.
- [x] Ícones outline arredondados e consistentes.
- [x] Alvos de toque >= 44px.
- [x] Safe-area iOS/Android.
- [x] Foco visível e teclado no desktop.

## Home

- [x] Hero claro, com headline **Descobrir é uma grande aventura!**
- [x] Mascote à direita/abaixo conforme breakpoint.
- [x] CTA azul **Explorar jogos**.
- [x] Categorias em cards coloridos.
- [ ] Destaques em cards compactos.
- [x] Layout mobile coerente com o board aprovado.

## Catálogo

- [x] Header **Jogos educativos**.
- [x] Busca.
- [x] Chips Todos / Números / Letras / Lógica / Cores / Memória / Criatividade.
- [x] Cards brancos, compactos, com thumbnail, categoria, idade e CTA.
- [x] Nenhum card escuro fora do tema escuro.
- [x] Finalidade pedagógica acessível sem poluir o card.

## Progresso

- [x] Tela visual por famílias/habilidades.
- [x] Barras coloridas por categoria.
- [x] Estados e percentuais legíveis.
- [x] Evidência não apresentada como domínio.

## Mascote e assets

- [x] Asset principal do mascote extraído da referência aprovada.
- [ ] Expressões/poses futuras usam o mesmo personagem.
- [ ] Frutas aprovadas: maçã, banana, uva, laranja, pera, morango, melancia, abacaxi, manga e kiwi.
- [ ] Nenhum emoji substitui fruta/objeto quando existe asset aprovado.
- [ ] Thumbnails dos jogos usam a mesma linguagem ilustrativa.

## Jogos / runtime

- [x] Header do jogo alinhado à marca nova.
- [x] Área de jogo visualmente integrada ao produto.
- [x] Cesta de Frutas usa frutas refinadas.
- [x] Conte os Bichos usa ilustração refinada.
- [x] Botões e feedback seguem tokens do Design System.
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
