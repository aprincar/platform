export interface GameFamily {
  id: string;
  title: string;
  icon: string;
  color: string;
  summary: string;
  objective: string;
  gameIds: string[];
}

export interface GamePurpose {
  skillLabel: string;
  purpose: string;
}

export const GAME_PURPOSES: Record<string, GamePurpose> = {
  'aprincar.counting-animals': {
    skillLabel: 'Contagem 1–10',
    purpose: 'Contar um conjunto e relacionar a quantidade ao numeral correto.',
  },
  'aprincar.fruit-basket': {
    skillLabel: 'Quantidade e correspondência',
    purpose: 'Representar uma quantidade pedida selecionando e movendo objetos.',
  },
  'aprincar.block-tower': {
    skillLabel: 'Contagem e composição',
    purpose: 'Construir uma quantidade exata e revisar a própria contagem.',
  },
  'aprincar.letter-hunt': {
    skillLabel: 'Reconhecimento de letras',
    purpose: 'Identificar letras-alvo entre alternativas visuais.',
  },
  'aprincar.write-a': {
    skillLabel: 'Traçado de letras',
    purpose: 'Praticar o gesto gráfico com apoio visual progressivamente menor.',
  },
  'aprincar.pattern-play': {
    skillLabel: 'Padrões e lógica',
    purpose: 'Prever a próxima peça de uma sequência.',
  },
  'aprincar.memory-animals': {
    skillLabel: 'Memória visual',
    purpose: 'Localizar pares usando memória de posição e discriminação visual.',
  },
  'aprincar.color-match': {
    skillLabel: 'Percepção de cores',
    purpose: 'Reconhecer e combinar cores correspondentes.',
  },
  'aprincar.paint-free': {
    skillLabel: 'Expressão gráfica',
    purpose: 'Explorar desenho e cor sem resposta única.',
  },
  'aprincar.space-shapes-3d': {
    skillLabel: 'Raciocínio espacial',
    purpose: 'Reconhecer sólidos ao observar e girar formas em três dimensões.',
  },
};

export const GAME_FAMILIES: GameFamily[] = [
  {
    id: 'quantities',
    title: 'Números e Quantidades',
    icon: '123',
    color: '#F59E0B',
    summary: 'Conte, compare e use quantidades em brincadeiras diferentes.',
    objective: 'Perceber quantidade e relacionar contagem com uma ação concreta.',
    gameIds: ['aprincar.counting-animals', 'aprincar.fruit-basket', 'aprincar.block-tower'],
  },
  {
    id: 'literacy',
    title: 'Letras e Escrita',
    icon: 'Aa',
    color: '#4F6EF7',
    summary: 'Encontre letras e depois pratique como elas são desenhadas.',
    objective: 'Reconhecer símbolos e avançar da identificação para o traçado.',
    gameIds: ['aprincar.letter-hunt', 'aprincar.write-a'],
  },
  {
    id: 'logic',
    title: 'Lógica e Memória',
    icon: '◌',
    color: '#8B6FF7',
    summary: 'Observe sequências, lembre posições e descubra o que vem depois.',
    objective: 'Exercitar previsão, memória de trabalho e reconhecimento de padrões.',
    gameIds: ['aprincar.pattern-play', 'aprincar.memory-animals'],
  },
  {
    id: 'creative',
    title: 'Cores e Criação',
    icon: '✦',
    color: '#2FC98F',
    summary: 'Combine cores e use o desenho para criar livremente.',
    objective: 'Explorar percepção visual, classificação e expressão gráfica.',
    gameIds: ['aprincar.color-match', 'aprincar.paint-free'],
  },
  {
    id: 'spatial',
    title: 'Formas e Espaço',
    icon: '◇',
    color: '#FF6B6B',
    summary: 'Gire, observe e reconheça formas em três dimensões.',
    objective: 'Desenvolver reconhecimento de sólidos e raciocínio espacial.',
    gameIds: ['aprincar.space-shapes-3d'],
  },
];

export function familyById(id: string) {
  return GAME_FAMILIES.find((family) => family.id === id);
}

export function familyForGame(gameId: string) {
  return GAME_FAMILIES.find((family) => family.gameIds.includes(gameId));
}


export function purposeForGame(gameId: string) {
  return GAME_PURPOSES[gameId];
}
