# Aprincar — Brand Guidelines

A identidade canônica atual é o **Brand System v4 — Portal de Descoberta**.

## Essência

**Aprincar = APrender + brINCAR**

Tagline: **Aprender acontece brincando.**

A marca deve parecer lúdica e contemporânea sem cair em estética de clipart ou de sistema escolar tradicional.

## Símbolo

O símbolo combina três ideias em uma forma simples:

- um **A** abstrato, ligado ao nome Aprincar;
- um **portal/play**, representando começar, explorar e descobrir;
- uma pequena luz amarela e um brilho coral, representando curiosidade e descoberta.

O símbolo deve permanecer simples, legível em 24 px e reconhecível sem o wordmark.

## Wordmark

O wordmark reduz o excesso de cores da v3:

- **Apr**: Navy `#17213D`
- **incar**: Blue `#4F6EF7`

Essa divisão mantém a ideia de Aprender + Brincar sem transformar cada letra em uma cor diferente.

## Mascote

O mascote v4 deriva do mesmo vocabulário do símbolo: corpo azul arredondado, play no centro, luz amarela e pequenos acentos coral/verde.

Ele é uma personagem de apoio para hero, onboarding, loading e empty states. O mascote **não substitui o logo**.

## Assets canônicos

| Arquivo               | Uso                                    |
| --------------------- | -------------------------------------- |
| `logo-symbol.svg`     | avatar, selo, áreas quadradas          |
| `logo-horizontal.svg` | cabeçalhos e comunicação institucional |
| `logo-stacked.svg`    | composição vertical/quadrada           |
| `app-icon.svg`        | ícone de aplicação/PWA                 |
| `favicon.svg`         | contexto muito pequeno                 |
| `monochrome.svg`      | impressão ou contexto sem cor          |
| `aprincar-mark.svg`   | alias legado do símbolo                |
| `aprincar-logo.svg`   | alias legado horizontal                |

## Cores

- Background: `#F7F7FB`
- Surface: `#FFFFFF`
- Surface muted: `#EEF1F7`
- Text/Navy: `#17213D`
- Blue: `#4F6EF7`
- Blue strong: `#3B55D9`
- Sun: `#FFC83D`
- Leaf: `#2FC98F`
- Coral: `#FF6B6B`
- Purple: `#8B6FF7`

As famílias de jogos podem usar cores próprias como acento, mas o shell e a marca devem continuar ancorados em Navy + Blue.

## Espaço de proteção

Use ao redor da marca um respiro mínimo equivalente a aproximadamente **25% da altura do símbolo**.

## Tamanhos mínimos

- símbolo: 24 CSS px;
- horizontal: 140 CSS px;
- stacked: 96 CSS px.

## Fundos

Priorize branco, `#F7F7FB` ou superfícies claras. Em fundos escuros, use a marca clara ou a versão monocromática adequada.

## Não fazer

- não voltar ao wordmark arco-íris da v3;
- não reintroduzir a estrela como logo principal;
- não adicionar bevel, 3D, glow pesado ou efeitos fotográficos;
- não usar o mascote como substituto universal da marca;
- não criar ícones alternativos para App, Hub e jogos;
- não embutir raster gerado por IA como fonte canônica da identidade.

## Implementação

A representação React canônica vive em `@aprincar/ui`. Os SVGs em `apps/app/public/brand` são a distribuição estática da mesma identidade.

PWA, App, Hub, templates e jogos oficiais devem consumir a identidade canônica em vez de redesenhar a marca localmente.

## Design System

A implementação visual completa é definida em [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md). A marca permanece independente do mascote; temas, tokens, acessibilidade e componentes não devem redefinir a identidade.
