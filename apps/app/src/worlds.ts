export interface WorldInfo {
  id: string;
  title: string;
  icon: string;
  color: string;
  accentBg: string;
  description: string;
  childSummary: string;
  skillIds: string[];
  gameIds: string[];
  suggestedAges: string;
  trail: string[];
}

export const WORLDS: WorldInfo[] = [
  {
    id: 'quantities',
    title: 'Números e Quantidades',
    icon: '🔢',
    color: '#F59E0B',
    accentBg: '#FFF7E2',
    description: 'Contagem, quantidade e ações concretas com objetos, frutas e blocos.',
    childSummary: 'Conte, escolha quantidades e use os números para resolver pequenas missões!',
    skillIds: ['math.counting.1-10'],
    gameIds: ['aprincar.counting-animals', 'aprincar.fruit-basket', 'aprincar.block-tower'],
    suggestedAges: '3 a 8 anos',
    trail: ['Perceber quantidades', 'Contar', 'Levar a quantidade certa', 'Construir contando'],
  },
  {
    id: 'literacy',
    title: 'Letras e Escrita',
    icon: '🔤',
    color: '#2563EB',
    accentBg: '#EBF2FF',
    description: 'Reconhecimento de letras e prática de traçado em uma progressão simples.',
    childSummary: 'Encontre letras e depois experimente desenhá-las com o dedo!',
    skillIds: ['literacy.letter.recognition', 'writing.trace-letter'],
    gameIds: ['aprincar.letter-hunt', 'aprincar.write-a'],
    suggestedAges: '4 a 8 anos',
    trail: ['Reconhecer', 'Encontrar', 'Observar o formato', 'Traçar'],
  },
  {
    id: 'logic',
    title: 'Lógica e Memória',
    icon: '🧩',
    color: '#8B5CF6',
    accentBg: '#F3EFFF',
    description: 'Padrões, previsão e memória visual em desafios curtos e progressivos.',
    childSummary: 'Descubra o que vem depois e encontre pares que estavam escondidos!',
    skillIds: ['logic.patterns.ab', 'logic.patterns.abc', 'perception.visual.discrimination'],
    gameIds: ['aprincar.pattern-play', 'aprincar.memory-animals'],
    suggestedAges: '3 a 9 anos',
    trail: ['Observar', 'Lembrar', 'Prever', 'Resolver'],
  },
  {
    id: 'creative',
    title: 'Cores e Criação',
    icon: '🎨',
    color: '#22C55E',
    accentBg: '#EAF8EE',
    description: 'Classificação por cores e expressão visual sem resposta única.',
    childSummary: 'Combine cores e depois crie do seu jeito com desenho e pintura!',
    skillIds: ['perception.colors.match', 'creativity.visual-expression'],
    gameIds: ['aprincar.color-match', 'aprincar.paint-free'],
    suggestedAges: '2 a 10 anos',
    trail: ['Perceber cores', 'Combinar', 'Experimentar', 'Criar livremente'],
  },
  {
    id: 'spatial',
    title: 'Formas e Espaço',
    icon: '🪐',
    color: '#F43F5E',
    accentBg: '#FFEBF0',
    description: 'Reconhecimento de sólidos e exploração espacial por rotação e observação.',
    childSummary: 'Gire formas no espaço e descubra cubos, esferas, cones e cilindros!',
    skillIds: ['math.geometry.solids'],
    gameIds: ['aprincar.space-shapes-3d'],
    suggestedAges: '5 a 10 anos',
    trail: ['Observar', 'Girar', 'Comparar', 'Reconhecer'],
  },
];

export interface MissionItem {
  id: string;
  title: string;
  prompt: string;
  category: string;
  worldId: string;
  icon: string;
}

export const MISSIONS: MissionItem[] = [
  {
    id: 'mission-quantities-1',
    title: 'Contador da Casa',
    prompt: 'Escolha um tipo de objeto perto de você e conte quantos consegue encontrar.',
    category: 'Números e Quantidades',
    worldId: 'quantities',
    icon: '🔢',
  },
  {
    id: 'mission-literacy-1',
    title: 'Caça à Primeira Letra',
    prompt: 'Procure um objeto que comece com a mesma letra do seu nome.',
    category: 'Letras e Escrita',
    worldId: 'literacy',
    icon: '🔤',
  },
  {
    id: 'mission-logic-1',
    title: 'Sequência da Casa',
    prompt: 'Escolha três objetos e invente uma sequência que outra pessoa consiga continuar.',
    category: 'Lógica e Memória',
    worldId: 'logic',
    icon: '🧩',
  },
  {
    id: 'mission-creative-1',
    title: 'Caça às Cores',
    prompt: 'Encontre três objetos de cores diferentes e organize do jeito que achar mais bonito.',
    category: 'Cores e Criação',
    worldId: 'creative',
    icon: '🎨',
  },
  {
    id: 'mission-spatial-1',
    title: 'Formas ao Redor',
    prompt: 'Encontre um objeto que pareça um cubo, uma esfera ou um cilindro.',
    category: 'Formas e Espaço',
    worldId: 'spatial',
    icon: '🪐',
  },
];
