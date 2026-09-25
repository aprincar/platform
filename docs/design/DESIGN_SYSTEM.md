# Aprincar Design System v4

O Design System v4 transforma a identidade **Portal de Descoberta** em regras de produto reutilizáveis. A logo é a assinatura institucional; o mascote é um personagem de apoio e nunca substitui a marca.

## Princípios

1. **Mobile-first de verdade** — a menor superfície é o baseline, não uma adaptação tardia.
2. **Aprender com finalidade** — cada atividade explicita habilidade, objetivo e evidência observável.
3. **Acessibilidade como contrato** — teclado, leitor de tela, contraste, touch e redução de movimento fazem parte do DoD.
4. **Consistência sem monotonia** — o shell usa Navy + Blue; famílias pedagógicas podem usar acentos próprios.
5. **Local/offline-first** — aparência e preferências não dependem de identidade em nuvem.

## Marca

- Símbolo: A abstrato + portal/play + luz de descoberta.
- Wordmark: Navy `#17213D` + Blue `#4F6EF7`.
- Mascote: apoio em hero, onboarding, empty/loading states e comunicação pedagógica.
- O mascote não aparece como favicon, app icon ou substituto universal do logo.

## Tokens semânticos

| Token               | Claro     | Escuro    | Alto contraste |
| ------------------- | --------- | --------- | -------------- |
| `--ap-bg`           | `#F7F7FB` | `#101426` | `#000000`      |
| `--ap-surface`      | `#FFFFFF` | `#191F36` | `#111111`      |
| `--ap-text`         | `#20263A` | `#F3F5FF` | `#FFFFFF`      |
| `--ap-primary`      | `#4F6EF7` | `#79A5FF` | `#FFE500`      |
| `--ap-action-bg`    | `#3B55D9` | `#A7C3FF` | `#FFE500`      |
| `--ap-action-text`  | `#FFFFFF` | `#101426` | `#000000`      |
| `--ap-focus`        | `#245CF6` | `#A7C3FF` | `#00FFFF`      |
| `--ap-touch-target` | `44px`    | `44px`    | `44px`         |

Cores Sun, Leaf, Coral e Purple são acentos. Não devem substituir tokens semânticos de texto, superfície ou foco. O azul da marca não é usado automaticamente como fundo de texto: ações usam `--ap-action-bg`/`--ap-action-text` para preservar contraste AA.

## Temas

A preferência canônica possui quatro valores:

- `system`: segue `prefers-color-scheme` e reage a mudanças do sistema;
- `light`: força tema claro;
- `dark`: força tema escuro;
- `contrast`: força alto contraste.

Valores legados são migrados automaticamente: `standard -> light`, `night -> dark`, `pastel -> light`.

## Tipografia

- Corpo: Inter/system UI.
- Títulos: Nunito Sans/Inter/system UI.
- Não depender de fonte remota para a interface continuar legível offline.
- Texto essencial não deve ser renderizado dentro de imagens.

## Espaçamento e geometria

- Grid base: 4px.
- Ritmo recomendado: 8 / 12 / 16 / 24 / 32 / 48.
- Touch target mínimo: 44 × 44 CSS px.
- Radius de produto: 16–26px; componentes infantis podem usar valores maiores sem comprometer densidade.
- Conteúdo principal: largura máxima aproximada de 1240px.

## Estados interativos

Todo controle deve prever: default, hover quando aplicável, pressed, disabled e `:focus-visible`.

O foco nunca pode depender apenas de mudança de cor. O anel canônico usa 3px e offset de 3px.

## Movimento

`prefers-reduced-motion: reduce` desativa animações decorativas e reduz transições globalmente. Mecânicas pedagógicas não podem exigir animação para transmitir estado ou resposta.

## Estrutura de navegação

### Infantil

- Início
- Descobrir
- Biblioteca
- Mais

No mobile, a navegação primária fica na bottom navigation. Ações de perfil e responsáveis permanecem fora do fluxo principal da criança.

### Catálogo pedagógico

As atividades oficiais são organizadas por cinco famílias:

1. Números e Quantidades
2. Letras e Escrita
3. Lógica e Memória
4. Cores e Criação
5. Formas e Espaço

Cada card de atividade deve responder, sem abrir o jogo: **o que vou praticar, para quem é e qual é a ação principal**.

## Contrato para jogos educativos

Um jogo oficial não entra no catálogo apenas porque é divertido. Deve declarar:

- fantasia/contexto;
- habilidade principal;
- objetivo observável;
- mecânica coerente com a habilidade;
- feedback de tentativa;
- critério de conclusão;
- evidência produzida;
- faixa etária orientativa;
- funcionamento touch/mobile;
- comportamento offline quando declarado.

Repetições com a mesma mecânica e mesmo objetivo devem virar variações de conteúdo, e não jogos distintos.

## Acessibilidade — DoD

- navegação por teclado nas superfícies web;
- foco visível;
- labels e nomes acessíveis;
- contraste compatível com WCAG AA para conteúdo essencial;
- 44px de alvo táctil mínimo;
- `prefers-reduced-motion`;
- safe areas em mobile/PWA;
- layout funcional a partir de 320px;
- nenhuma instrução baseada somente em cor;
- leitores de tela recebem nomes e estados úteis.

## Ownership

- `@aprincar/ui`: primitives e representação React da marca;
- `apps/app/src/styles.css`: tokens semânticos e layout do App;
- `apps/app/src/theme.ts`: contrato e resolução de temas;
- `docs/design/BRAND_GUIDELINES.md`: uso da marca;
- este documento: regras de produto, tema, acessibilidade e composição.

Novos componentes devem consumir tokens existentes antes de criar novos valores locais.
