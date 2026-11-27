import { Button } from '@mantine/core';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@aprincar/storage';
import { useAppStore } from '../app-store';
import { GAME_FAMILIES } from '../game-families';
import { MISSIONS } from '../worlds';
import { MissionCard } from '@aprincar/ui';

export function Missions() {
  const [filter, setFilter] = useState('all');
  const { profile } = useAppStore();
  const [history, setHistory] = useState<{ profileId: string; ids: Set<string> } | null>(null);
  const [error, setError] = useState('');
  const completed =
    history?.profileId === profile?.id ? (history?.ids ?? new Set<string>()) : new Set<string>();
  useEffect(() => {
    if (!profile) return;
    let active = true;
    void db.missionHistory
      .where('profileId')
      .equals(profile.id)
      .toArray()
      .then((rows) => {
        if (active) setHistory({ profileId: profile.id, ids: new Set(rows.map((row) => row.missionId)) });
      })
      .catch(() => {
        if (active) setError('Não foi possível carregar as missões.');
      });
    return () => {
      active = false;
    };
  }, [profile?.id]);
  const visible = MISSIONS.filter((mission) => filter === 'all' || mission.worldId === filter);
  const toggle = async (id: string) => {
    const mission = MISSIONS.find((item) => item.id === id);
    if (!profile || !mission || history?.profileId !== profile.id) return;
    const profileId = profile.id;
    const key = `${profileId}:${id}`;
    try {
      await db.transaction('rw', db.missionHistory, async () => {
        if (await db.missionHistory.get(key)) await db.missionHistory.delete(key);
        else
          await db.missionHistory.put({
            id: key,
            profileId,
            missionId: id,
            worldId: mission.worldId,
            skills: [],
            completedAt: new Date().toISOString(),
          });
      });
      const rows = await db.missionHistory.where('profileId').equals(profileId).toArray();
      setHistory({ profileId, ids: new Set(rows.map((row) => row.missionId)) });
      setError('');
    } catch {
      setError('Não foi possível salvar a missão. Tente novamente.');
    }
  };

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
        {error && <p role="alert">{error}</p>}
        <div className="approved-missions-grid">
          {visible.map((mission) => (
            <MissionCard
              key={mission.id}
              id={mission.id}
              title={mission.title}
              prompt={mission.prompt}
              category={mission.category}
              completed={completed.has(mission.id)}
              onComplete={() => void toggle(mission.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
