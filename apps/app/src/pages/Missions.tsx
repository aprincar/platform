import { Button } from '@mantine/core';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { GAME_FAMILIES } from '../game-families';
import { MISSIONS } from '../worlds';
import { MissionCard } from '@aprincar/ui';

export function Missions() {
  const [filter, setFilter] = useState('all');
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const visible = MISSIONS.filter((mission) => filter === 'all' || mission.worldId === filter);
  const toggle = (id: string) =>
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="aprincar-page approved-missions-page">
      <section className="approved-catalog-header">
        <span className="approved-kicker">Mundo real & família</span>
        <h1>Missões fora da tela</h1>
        <p>Pequenos desafios para explorar a casa e conversar em família, sem câmera e sem upload.</p>
      </section>

      <section className="approved-catalog-tools">
        <div className="approved-chip-row">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
            Todas
          </button>
          {GAME_FAMILIES.map((family) => (
            <button
              key={family.id}
              className={filter === family.id ? 'active' : ''}
              onClick={() => setFilter(family.id)}
            >
              {family.title}
            </button>
          ))}
        </div>
      </section>

      <section className="approved-section">
        <div className="approved-section-head">
          <div>
            <span>{completed.size} concluídas</span>
            <h2>{visible.length} missões para brincar</h2>
          </div>
          <Button variant="subtle" className="approved-text-action" leftSection={<Sparkles size={16} />}>
            Sem tela
          </Button>
        </div>
        <div className="approved-missions-grid">
          {visible.map((mission) => (
            <MissionCard
              key={mission.id}
              id={mission.id}
              title={mission.title}
              prompt={mission.prompt}
              category={mission.category}
              completed={completed.has(mission.id)}
              onComplete={() => toggle(mission.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
