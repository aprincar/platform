import { Button, TextInput } from '@mantine/core';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAppStore } from '../app-store';
import { GameCard } from '../components/GameCard';
import { EmptyState } from '@aprincar/ui';
import { familyForGame } from '../game-families';

const DISCOVERY_FILTERS = [
  { id: 'all', label: 'Todos', matches: () => true },
  { id: 'numbers', label: 'Números', matches: (gameId: string) => familyForGame(gameId)?.id === 'quantities' },
  { id: 'letters', label: 'Letras', matches: (gameId: string) => familyForGame(gameId)?.id === 'literacy' },
  { id: 'logic', label: 'Lógica', matches: (gameId: string) => gameId.includes('pattern') },
  { id: 'colors', label: 'Cores', matches: (gameId: string) => gameId.includes('color') || gameId.includes('guided-painting') },
  { id: 'memory', label: 'Memória', matches: (gameId: string) => gameId.includes('memory') },
  { id: 'creative', label: 'Criatividade', matches: (gameId: string) => gameId.includes('paint-free') },
] as const;

export function Discover() {
  const { registry } = useAppStore();
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');

  const list = useMemo(
    () =>
      registry.filter((entry) => {
        const hay = [
          entry.id,
          entry.name?.['pt-BR'] ?? '',
          entry.description?.['pt-BR'] ?? '',
          entry.objective?.['pt-BR'] ?? '',
          ...(entry.tags ?? []),
          ...(entry.skills ?? []),
        ]
          .join(' ')
          .toLowerCase();
        const queryOk = !q || hay.includes(q.toLowerCase());
        const activeFilter = DISCOVERY_FILTERS.find((filter) => filter.id === category) ?? DISCOVERY_FILTERS[0];
        return queryOk && activeFilter.matches(entry.id);
      }),
    [registry, q, category],
  );

  const reset = () => {
    setQ('');
    setCategory('all');
  };

  return (
    <div className="aprincar-page approved-catalog">
      <section className="approved-catalog-header">
        <div>
          <h1>Jogos educativos</h1>
        </div>
      </section>

      <section className="approved-catalog-tools">
        <TextInput
          leftSection={<Search size={18} />}
          placeholder="Buscar jogos, temas ou habilidades..."
          value={q}
          onChange={(event) => setQ(event.currentTarget.value)}
          className="approved-search-input"
          aria-label="Buscar jogos"
          rightSection={<SlidersHorizontal size={17} />}
        />
        <div className="approved-chip-row" role="group" aria-label="Filtrar jogos por categoria">
          {DISCOVERY_FILTERS.map((filter) => (
            <button
              key={filter.id}
              className={category === filter.id ? 'active' : ''}
              onClick={() => setCategory(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {list.length === 0 ? (
        <EmptyState
          title="Nenhum jogo encontrado"
          description="Tente outra busca ou limpe o filtro."
          action={
            <Button onClick={reset} leftSection={<RotateCcw size={16} />}>
              Limpar filtros
            </Button>
          }
        />
      ) : (
        <section className="approved-game-list" aria-label="Jogos encontrados">
          {list.map((entry) => (
            <GameCard key={entry.id} entry={entry} compact />
          ))}
        </section>
      )}
    </div>
  );
}
