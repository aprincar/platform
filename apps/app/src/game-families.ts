export interface GameFamily {
  id: string;
  title: string;
  icon: string;
  color: string;
  summary: string;
  objective: string;
  gameIds: string[];
}

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
