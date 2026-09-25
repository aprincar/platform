# Aprincar — Arquitetura de Informação v4

A navegação v4 separa **o que a criança quer fazer** do que o adulto precisa administrar.

## Navegação infantil

### Início
Retoma a experiência com destaque adequado à idade, biblioteca e famílias pedagógicas.

### Jogos
Catálogo em `/discover`. O rótulo da navegação é direto; a linguagem interna pode continuar convidando a descobrir.

O catálogo apresenta primeiro a finalidade pedagógica e depois filtros administrativos. Cada jogo oficial mostra:

- nome;
- família;
- habilidade praticada;
- finalidade em linguagem humana;
- idade orientativa;
- disponibilidade offline;
- nível de confiança.

### Biblioteca
Favoritos e conteúdos preparados para retorno rápido.

### Mais
Acesso secundário a missões fora da tela, aparência/configurações e área protegida do responsável.

## Área do responsável

Permanece separada do fluxo infantil e protegida por adult gate/PIN. Concentra progresso, evidências, tempo de tela, offline e configurações administrativas.

## Mundos e famílias

“Mundos” são uma apresentação infantil das cinco famílias pedagógicas. Não constituem uma taxonomia paralela.

- Números e Quantidades
- Letras e Escrita
- Lógica e Memória
- Cores e Criação
- Formas e Espaço

A fonte de verdade para associação jogo → família permanece em `game-families.ts`.

## Regra contra catálogo repetitivo

Dois jogos só devem permanecer como atividades distintas quando houver diferença relevante de mecânica, contexto ou evidência produzida. Variações apenas de conteúdo devem ser implementadas como níveis, desafios ou datasets do mesmo jogo.

## Mobile-first

No mobile, a bottom navigation contém apenas quatro destinos de alta frequência: Início, Jogos, Biblioteca e Mais. Não adicionar novos itens sem remover ou agrupar outro destino.
