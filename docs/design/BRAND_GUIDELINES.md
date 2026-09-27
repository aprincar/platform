# Aprincar — Identidade Visual Aprovada

Status: **LOCKED**

A fonte de verdade visual são os boards aprovados pelo produto e o checklist
[`APPROVED_UI_IMPLEMENTATION_CHECKLIST.md`](./APPROVED_UI_IMPLEMENTATION_CHECKLIST.md).

## Essência

**Aprincar = aprender brincando.**

Tagline oficial: **Brincar hoje. Descobrir sempre.**

## Logo

A marca aprovada é composta por:

- um **A arredondado em azul**, formado por dois arcos;
- um **play amarelo** no centro;
- wordmark **Aprincar** em Navy + Blue;
- tipografia de interface **Poppins**.

Cores principais:

- Primary: `#2563EB`
- Secondary: `#0EA5E9`
- Accent: `#FBBF24`
- Navy: `#0F172A`

## Mascote

O mascote oficial é o **menino/cartoon dos boards aprovados**: cabelo castanho, camiseta branca Aprincar, shorts azuis, mochila azul e detalhes amarelos.

O mascote geométrico anterior está descontinuado e não deve voltar ao produto.

## Assets canônicos

- `logo-symbol.svg`
- `logo-horizontal.svg`
- `logo-stacked.svg`
- `app-icon.svg`
- `favicon.svg`
- `monochrome.svg`
- `mascot-approved.webp`

## UI

- Poppins;
- superfícies claras;
- cards brancos de alto radius;
- sombra leve;
- azul como ação principal;
- amarelo como destaque;
- chips arredondados;
- ilustrações de jogos com acabamento consistente;
- mobile-first.

## Temas

Claro é a aparência de referência. Escuro, automático e alto contraste devem preservar a mesma hierarquia e componentes, alterando apenas tokens semânticos.

## Regra de implementação

Não criar uma nova interpretação visual durante desenvolvimento. Se uma tela ainda não estiver migrada, ela deve ser adaptada aos boards em vez de gerar outra linguagem.

A representação React vive em `@aprincar/ui`; os assets estáticos ficam em `apps/app/public/brand`.
