import { Progress as MantineProgress } from '@mantine/core';
import { db } from '@aprincar/storage';
import { useEffect, useMemo, useState } from 'react';
import type { SkillState } from '@aprincar/extension-contracts';
import { useAppStore } from '../app-store';
import { WORLDS } from '../worlds';

export function Progress() {
  const { profile } = useAppStore();
  const [states, setStates] = useState<SkillState[]>([]);

  useEffect(() => {
    if (!profile) return;
    db.skillStates.where('profileId').equals(profile.id).toArray().then(setStates);
  }, [profile?.id]);

  const rows = useMemo(() => WORLDS.map((world) => {
    const relevant = states.filter((state) => world.skillIds.includes(state.skillId));
    const value = relevant.length
      ? Math.round((relevant.reduce((sum, state) => sum + Math.max(0, Math.min(1, state.confidence)), 0) / relevant.length) * 100)
      : 0;
    return { ...world, value, evidence: relevant.reduce((sum, state) => sum + state.evidenceCount, 0) };
  }), [states]);

  return (
    <div className="aprincar-page approved-progress-page">
      <section className="approved-catalog-header">
        <div>
          <span className="approved-kicker">Seu progresso</span>
          <h1>Veja o que você já explorou</h1>
          <p>As barras representam evidências observadas nas brincadeiras; elas não são nota nem certificação de domínio.</p>
        </div>
      </section>
      <section className="approved-progress-card">
        {rows.map((row) => (
          <div key={row.id} className="approved-progress-row">
            <div className={`approved-progress-family category-${row.id}`}>{row.icon}</div>
            <div className="approved-progress-main">
              <div><strong>{row.title}</strong><span>{row.evidence} evidências registradas</span></div>
              <MantineProgress value={row.value} color={row.color} radius="xl" size="md" />
            </div>
            <strong className="approved-progress-value">{row.value}%</strong>
          </div>
        ))}
      </section>
    </div>
  );
}
