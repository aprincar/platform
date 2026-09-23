# Aprincar — Brand Guidelines

A identidade canônica da V1 é o **Brand System v3**. Este documento define como usar a marca sem criar variantes paralelas.

## Essência

**Aprincar = APrender + brINCAR**

Tagline: **Aprender acontece brincando.**

A marca deve parecer infantil sem ser infantilizada, tecnológica sem ser corporativa e educacional sem parecer uma escola tradicional.

## Símbolo

O símbolo é a estrela amarela amigável com rosto e pequeno acento de aprendizagem/lápis. Não redesenhe a estrela, não troque a expressão, não aplique efeitos 3D e não introduza gradientes como requisito de funcionamento.

## Wordmark

A sequência canônica usa:

| Letra | Cor       |
| ----- | --------- |
| A     | `#2563EB` |
| p     | `#FBCB24` |
| r     | `#22C55E` |
| i     | `#F43F5E` |
| n     | `#2563EB` |
| c     | `#FB923C` |
| a     | `#22C55E` |
| r     | `#8B5CF6` |

O wordmark pode usar fallback rounded/system sem distribuir fonte proprietária. Não transforme a tipografia em dependência de um arquivo de fonte externo.

## Assets canônicos

| Arquivo               | Uso                                         |
| --------------------- | ------------------------------------------- |
| `logo-symbol.svg`     | avatar, selo, áreas quadradas               |
| `logo-horizontal.svg` | cabeçalhos e comunicação institucional      |
| `logo-stacked.svg`    | composição vertical/quadrada                |
| `app-icon.svg`        | ícone de aplicação/PWA                      |
| `favicon.svg`         | contexto muito pequeno                      |
| `monochrome.svg`      | impressão ou contexto sem cor               |
| `aprincar-mark.svg`   | alias legado do símbolo                     |
| `aprincar-logo.svg`   | alias legado horizontal                     |

Os aliases antigos permanecem por compatibilidade; novos consumidores devem preferir os nomes canônicos.

## Cores

- Background: `#F7F6F2`
- Surface: `#FFFFFF`
- Text: `#242523`
- Navy: `#13203D`
- Blue: `#2563EB`
- Sun: `#FBCB24`
- Orange: `#FB923C`
- Leaf: `#22C55E`
- Coral: `#F43F5E`
- Purple: `#8B5CF6`

## Espaço de proteção

Use ao redor da marca um respiro mínimo equivalente a aproximadamente **25% da altura da estrela**. Em superfícies muito pequenas, prefira o símbolo isolado.

## Tamanhos mínimos

- símbolo: 24 CSS px;
- favicon: usar o asset dedicado;
- horizontal: 140 CSS px de largura;
- stacked: 96 CSS px de largura.

Abaixo desses limites, use o símbolo ou favicon em vez de comprimir a marca completa.

## Fundos

Preferir `#F7F6F2`, branco ou superfícies claras com contraste suficiente. Em fundos fotográficos ou muito coloridos, coloque a marca em uma superfície sólida. Para contextos de uma cor, use `monochrome.svg`.

## Não fazer

- não distorcer proporções;
- não trocar as cores letra a letra;
- não separar a estrela em um novo logo independente;
- não adicionar sombra pesada, bevel, glow ou 3D;
- não usar o mascote como substituto universal do logo;
- não criar outro ícone para App, Hub ou jogos;
- não embutir raster gerado por IA como fonte canônica da marca.

## Implementação

A representação React canônica vive em `@aprincar/ui`. Os SVGs deste diretório são a distribuição estática da mesma identidade. PWA, App, Hub, templates e jogos oficiais devem consumir uma dessas duas superfícies, nunca redesenhar a marca localmente.
