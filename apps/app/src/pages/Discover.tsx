import { Button, RangeSlider, Select, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAppStore } from '../app-store';
import { GameCard } from '../components/GameCard';
import { EmptyState } from '@aprincar/ui';
import { GAME_FAMILIES, familyById, familyForGame } from '../game-families';

export function Discover() {
  const { registry } = useAppStore();
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');

  const [adultFiltersOpen, { toggle: toggleAdultFilters }] = useDisclosure(false);
  const [trustFilter, setTrustFilter] = useState<string>('all');
  const [ageRange, setAgeRange] = useState<[number, number]>([2, 10]);

  const list = useMemo(() => {
    return registry.filter((entry) => {
      const hay = (
        entry.id +
        ' ' +
        (entry.name?.['pt-BR'] ?? '') +
        ' ' +
        (entry.description?.['pt-BR'] ?? '') +
        ' ' +
        (entry.tags ?? []).join(' ') +
        ' ' +
        (entry.skills ?? []).join(' ')
      ).toLowerCase();

      const queryOk = !q || hay.includes(q.toLowerCase());
      const familyOk = category === 'all' || familyForGame(entry.id)?.id === category;
      const trustOk = trustFilter === 'all' || entry.trust === trustFilter;
      const minAge = entry.ageGuidance?.min ?? 2;
      const maxAge = entry.ageGuidance?.max ?? 10;
      const ageOk = minAge <= ageRange[1] && maxAge >= ageRange[0];

      return queryOk && familyOk && trustOk && ageOk;
    });
  }, [registry, q, category, trustFilter, ageRange]);

  const familySections = useMemo(
    () =>
      GAME_FAMILIES.map((family) => ({
        family,
        entries: list.filter((entry) => family.gameIds.includes(entry.id)),
      })).filter((section) => section.entries.length > 0),
    [list],
  );

  const otherEntries = useMemo(() => list.filter((entry) => !familyForGame(entry.id)), [list]);

  const selectedFamily = category === 'all' ? undefined : familyById(category);

  const resetFilters = () => {
    setQ('');
    setCategory('all');
    setTrustFilter('all');
    setAgeRange([2, 10]);
  };

  return (
    <div className="aprincar-page">
      <section className="hub-hero">
        <div>
          <div className="child-eyebrow" style={{ color: '#BDB4FF' }}>
            Escolha pelo que quer descobrir
          </div>
          <h1>Brincadeiras organizadas por objetivo</h1>
          <p>
            Em vez de uma lista solta de jogos, cada família reúne atividades que praticam uma ideia parecida
            de maneiras diferentes.
          </p>
        </div>
        <div className="hub-stat">
          <strong>{GAME_FAMILIES.length}</strong>
          <span>famílias de descoberta</span>
        </div>
      </section>

      <section className="aprincar-panel game-family-filter-panel">
        <div className="discover-search-row">
          <TextInput
            leftSection={<Search size={17} />}
            placeholder="Buscar brincadeiras, temas ou palavras…"
            value={q}
            onChange={(event) => setQ(event.currentTarget.value)}
            className="discover-search-input"
            radius="xl"
            aria-label="Buscar brincadeiras"
          />
          <Button
            variant={adultFiltersOpen ? 'filled' : 'light'}
            color="violet"
            leftSection={<SlidersHorizontal size={16} />}
            onClick={toggleAdultFilters}
          >
            Filtros do adulto
          </Button>
        </div>

        <div className="filter-row game-family-filter-row">
          <button
            className={`filter-chip ${category === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            <span>🌟</span> Todos
          </button>
          {GAME_FAMILIES.map((family) => (
            <button
              key={family.id}
              className={`filter-chip ${category === family.id ? 'active' : ''}`}
              onClick={() => setCategory(family.id)}
            >
              <span>{family.icon}</span> {family.title}
            </button>
          ))}
        </div>

        {adultFiltersOpen && (
          <div className="adult-filters-box">
            <div className="adult-filters-grid">
              <div>
                <Text size="sm" fw={800} mb={6}>
                  Nível de confiança
                </Text>
                <Select
                  value={trustFilter}
                  onChange={(value) => setTrustFilter(value ?? 'all')}
                  data={[
                    { value: 'all', label: 'Todos os níveis' },
                    { value: 'official', label: 'Oficial Aprincar' },
                    { value: 'curated', label: 'Curado pela equipe' },
                    { value: 'community', label: 'Comunidade' },
                    { value: 'experimental', label: 'Experimental' },
                  ]}
                  radius="md"
                />
              </div>

              <div>
                <Text size="sm" fw={800} mb={6}>
                  Faixa etária sugerida ({ageRange[0]} a {ageRange[1]} anos)
                </Text>
                <RangeSlider
                  min={2}
                  max={12}
                  step={1}
                  value={ageRange}
                  onChange={setAgeRange}
                  color="violet"
                  mt="sm"
                />
              </div>

              <div className="adult-filters-reset">
                <Button
                  variant="subtle"
                  color="gray"
                  leftSection={<RotateCcw size={14} />}
                  onClick={resetFilters}
                >
                  Limpar filtros
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {list.length === 0 ? (
        <EmptyState
          title="Nenhuma brincadeira encontrada"
          description="Tente ajustar a busca ou limpar os filtros para encontrar outras experiências."
          action={
            <Button className="ap-primary" onClick={resetFilters}>
              Ver todas as brincadeiras
            </Button>
          }
        />
      ) : selectedFamily ? (
        <section className="game-family-focus">
          <div className="game-family-heading">
            <div className="game-family-icon" aria-hidden="true">
              {selectedFamily.icon}
            </div>
            <div>
              <div className="child-eyebrow" style={{ color: selectedFamily.color }}>
                Família de brincadeiras
              </div>
              <h2>{selectedFamily.title}</h2>
              <p>{selectedFamily.objective}</p>
            </div>
          </div>
          <div className="game-grid game-family-grid">
            {list.map((entry) => (
              <GameCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      ) : (
        <>
          {familySections.map(({ family, entries }) => (
            <section key={family.id} className="game-family-section">
              <div className="game-family-heading">
                <div className="game-family-icon" aria-hidden="true">
                  {family.icon}
                </div>
                <div>
                  <div className="child-eyebrow" style={{ color: family.color }}>
                    {entries.length} {entries.length === 1 ? 'atividade' : 'atividades'}
                  </div>
                  <h2>{family.title}</h2>
                  <p>{family.summary}</p>
                </div>
              </div>
              <div className="game-shelf game-family-shelf">
                {entries.map((entry) => (
                  <GameCard key={entry.id} entry={entry} compact />
                ))}
              </div>
            </section>
          ))}

          {otherEntries.length > 0 && (
            <section className="game-family-section">
              <div className="section-head">
                <div>
                  <h2>Outras experiências</h2>
                  <p>Conteúdos curados ou da comunidade que ainda não pertencem às famílias oficiais.</p>
                </div>
              </div>
              <div className="game-grid" style={{ marginTop: 16 }}>
                {otherEntries.map((entry) => (
                  <GameCard key={entry.id} entry={entry} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
