import { Progress as MantineProgress } from '@mantine/core';
import { Brain, Clock3, Sparkles, Trophy } from 'lucide-react';
import { db } from '@aprincar/storage';
import { useEffect, useMemo, useState } from 'react';
import type { SkillState } from '@aprincar/extension-contracts';
import { useAppStore } from '../app-store';
import { WORLDS } from '../worlds';

type ProgressView = 'skills' | 'achievements' | 'time';

export function Progress() {
  const { profile } = useAppStore();
  const [states, setStates] = useState<SkillState[]>([]);
  const [rewardCount, setRewardCount] = useState(0);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [view, setView] = useState<ProgressView>('skills');

  useEffect(() => {
    if (!profile) return;
    void Promise.all([
      db.skillStates.where('profileId').equals(profile.id).toArray(),
      db.rewards.where('profileId').equals(profile.id).toArray(),
      db.sessions.where('profileId').equals(profile.id).toArray(),
    ]).then(([skillStates, rewards, sessions]) => {
      setStates(skillStates);
      setRewardCount(rewards.length);
      const today = new Date().toISOString().slice(0, 10);
      let total = 0;
      let daily = 0;
      for (const session of sessions) {
        const seconds = Math.max(0, session.durationSeconds ?? 0);
        total += seconds;
        if (session.startedAt.slice(0, 10) === today) daily += seconds;
      }
      setSessionSeconds(total);
      setTodaySeconds(daily);
    });
  }, [profile?.id]);

  const rows = useMemo(
    () =>
      WORLDS.map((world) => {
        const relevant = states.filter((state) => world.skillIds.includes(state.skillId));
        const value = relevant.length
          ? Math.round(
              (relevant.reduce((sum, state) => sum + Math.max(0, Math.min(1, state.confidence)), 0) /
                relevant.length) *
                100,
            )
          : 0;
        return { ...world, value, evidence: relevant.reduce((sum, state) => sum + state.evidenceCount, 0) };
      }),
    [states],
  );

  const evidenceTotal = rows.reduce((sum, row) => sum + row.evidence, 0);
  const exploredFamilies = rows.filter((row) => row.evidence > 0).length;
  const totalMinutes = Math.round(sessionSeconds / 60);
  const todayMinutes = Math.round(todaySeconds / 60);

  return (
    <div className="aprincar-page approved-progress-page">
      <section className="approved-progress-header">
        <div>
          <span className="approved-kicker">Aprincar</span>
          <h1>Seu progresso</h1>
        </div>
      </section>

      <div className="approved-progress-tabs" role="tablist" aria-label="Visualização do progresso">
        <button
          type="button"
          role="tab"
          aria-selected={view === 'achievements'}
          className={view === 'achievements' ? 'active' : ''}
          onClick={() => setView('achievements')}
        >
          <Trophy size={15} /> Conquistas
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'skills'}
          className={view === 'skills' ? 'active' : ''}
          onClick={() => setView('skills')}
        >
          <Brain size={15} /> Habilidades
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'time'}
          className={view === 'time' ? 'active' : ''}
          onClick={() => setView('time')}
        >
          <Clock3 size={15} /> Tempo
        </button>
      </div>

      {view === 'skills' && (
        <section className="approved-progress-card" aria-label="Habilidades exploradas">
          {rows.map((row) => (
            <div key={row.id} className="approved-progress-row">
              <div className={`approved-progress-family category-${row.id}`}>{row.icon}</div>
              <div className="approved-progress-main">
                <div>
                  <strong>{row.title}</strong>
                  <span>{row.evidence ? `${row.evidence} evidências observadas` : 'Ainda não explorado'}</span>
                </div>
                <MantineProgress value={row.value} color={row.color} radius="xl" size="md" />
              </div>
              <strong className="approved-progress-value">{row.value}%</strong>
            </div>
          ))}
          <p className="approved-progress-note">
            As barras representam evidências observadas nas brincadeiras; não são nota nem certificação de domínio.
          </p>
        </section>
      )}

      {view === 'achievements' && (
        <section className="approved-progress-summary-grid" aria-label="Conquistas">
          <article className="approved-progress-summary-card blue">
            <Trophy size={28} />
            <strong>{rewardCount}</strong>
            <span>recompensas recebidas</span>
          </article>
          <article className="approved-progress-summary-card yellow">
            <Sparkles size={28} />
            <strong>{evidenceTotal}</strong>
            <span>evidências registradas</span>
          </article>
          <article className="approved-progress-summary-card green">
            <Brain size={28} />
            <strong>{exploredFamilies}/{rows.length}</strong>
            <span>famílias exploradas</span>
          </article>
        </section>
      )}

      {view === 'time' && (
        <section className="approved-progress-summary-grid" aria-label="Tempo de uso">
          <article className="approved-progress-summary-card blue">
            <Clock3 size={28} />
            <strong>{todayMinutes} min</strong>
            <span>hoje</span>
          </article>
          <article className="approved-progress-summary-card green">
            <Clock3 size={28} />
            <strong>{totalMinutes} min</strong>
            <span>tempo registrado</span>
          </article>
          <article className="approved-progress-summary-card yellow">
            <Sparkles size={28} />
            <strong>{evidenceTotal}</strong>
            <span>interações com evidência</span>
          </article>
        </section>
      )}
    </div>
  );
}
