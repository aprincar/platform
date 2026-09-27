import { Button } from '@mantine/core';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { WORLDS, type WorldInfo } from '../worlds';
import { useAppStore } from '../app-store';
import { GameCard } from '../components/GameCard';

export function WorldDetail() {
  const { worldId } = useParams({ from: '/world/$worldId' });
  const navigate = useNavigate();
  const { registry } = useAppStore();
  const world: WorldInfo = WORLDS.find((item) => item.id === worldId) ?? WORLDS[0]!;
  const games = world.gameIds.map((id) => registry.find((game) => game.id === id)).filter((game): game is NonNullable<typeof game> => Boolean(game));

  return (
    <div className="aprincar-page approved-world-detail">
      <Button variant="subtle" className="approved-back-link" leftSection={<ArrowLeft size={17}/>} onClick={() => navigate({ to: '/worlds' })}>
        Mundos
      </Button>

      <section className={`approved-world-detail-hero category-${world.id}`}>
        <div className="approved-world-icon">{world.icon}</div>
        <div>
          <span className="approved-kicker">Mundo · {world.suggestedAges}</span>
          <h1>{world.title}</h1>
          <p>{world.childSummary}</p>
        </div>
      </section>

      <section className="approved-trail-card">
        <div className="approved-settings-title"><Sparkles size={21}/><div><strong>O que você vai praticar</strong><span>{world.objective ?? world.description}</span></div></div>
        <div className="approved-trail">
          {world.trail.map((step, index) => (
            <div key={step} className="approved-trail-step"><span>{index + 1}</span><strong>{step}</strong></div>
          ))}
        </div>
      </section>

      <section className="approved-section">
        <div className="approved-section-head"><div><span>Atividades</span><h2>Comece por aqui</h2></div></div>
        <div className="approved-game-list">
          {games.map((game) => <GameCard key={game.id} entry={game} compact />)}
        </div>
      </section>
    </div>
  );
}
