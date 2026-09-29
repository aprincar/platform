import { Button, TextInput } from '@mantine/core';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAppStore } from '../app-store';
import { GameCard } from '../components/GameCard';
import { EmptyState } from '@aprincar/ui';
import { GAME_FAMILIES, familyForGame } from '../game-families';

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
        const familyOk = category === 'all' || familyForGame(entry.id)?.id === category;
        return queryOk && familyOk;
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
          <span className="approved-kicker">Escolha, explore, aprenda</span>
          <h1>Jogos educativos</h1>
          <p>Atividades organizadas por habilidade e idade, com interação simples para celular e tablet.</p>
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
          <button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>
            Todos
          </button>
          {GAME_FAMILIES.map((family) => (
            <button
              key={family.id}
              className={category === family.id ? 'active' : ''}
              onClick={() => setCategory(family.id)}
            >
              {family.title.replace(' e ', ' & ')}
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
