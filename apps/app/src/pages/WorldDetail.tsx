import { Button } from '@mantine/core';
import { ArrowLeft, Sparkles, Star } from 'lucide-react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { WORLDS, type WorldInfo } from '../worlds';
import { useAppStore } from '../app-store';
import { GameCard } from '../components/GameCard';

export function WorldDetail() {
  const { worldId } = useParams({ from: '/world/$worldId' });
  const navigate = useNavigate();
  const { registry } = useAppStore();

  const world: WorldInfo = WORLDS.find((w) => w.id === worldId) ?? WORLDS[0]!;
  const matchingGames = world.gameIds
    .map((gameId) => registry.find((game) => game.id === gameId))
    .filter((game): game is NonNullable<typeof game> => Boolean(game));

  const featuredGame = matchingGames[0];
  const otherGames = matchingGames.slice(1);

  return (
    <div className="aprincar-page">
      <section
        className="world-detail-hero"
        style={{ '--world-hero-accent': world.color, backgroundColor: world.accentBg } as React.CSSProperties}
      >
        <Button
          variant="subtle"
          color="gray"
          leftSection={<ArrowLeft size={18} />}
          onClick={() => navigate({ to: '/' })}
          className="world-back-button"
        >
          Voltar para Início
        </Button>

        <div className="world-detail-header-inner">
          <div className="world-detail-icon">{world.icon}</div>
          <div>
            <div className="child-eyebrow" style={{ color: world.color }}>
              Família de brincadeiras · {world.suggestedAges}
            </div>
            <h1>{world.title}</h1>
            <p className="world-detail-desc">{world.description}</p>
          </div>
        </div>

        <div className="world-trail-panel">
          <div className="world-trail-title">
            <Sparkles size={16} color={world.color} />
            <strong>O que você vai praticar</strong>
          </div>
          <div className="world-trail-nodes">
            {world.trail.map((step, idx) => (
              <div key={step} className="world-trail-node-wrap">
                <div className={`world-trail-node ${idx === 0 ? 'current' : 'upcoming'}`}>
                  {idx === 0 ? <Star size={16} fill="currentColor" /> : idx + 1}
                </div>
                <span className="world-trail-label">{step}</span>
                {idx < world.trail.length - 1 && <div className="world-trail-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredGame && (
        <section className="aprincar-panel world-spotlight-card">
          <div className="section-head">
            <div>
              <div className="child-eyebrow" style={{ color: world.color }}>
                Primeira atividade
              </div>
              <h2>Comece por aqui</h2>
              <p>A primeira atividade apresenta o objetivo da família de forma simples.</p>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <GameCard entry={featuredGame} />
          </div>
        </section>
      )}

      {otherGames.length > 0 && (
        <section>
          <div className="section-head">
            <div>
              <h2>Continue explorando</h2>
              <p>Outras atividades trabalham o mesmo objetivo por uma mecânica diferente.</p>
            </div>
          </div>
          <div className="game-grid" style={{ marginTop: 16 }}>
            {otherGames.map((game) => (
              <GameCard key={game.id} entry={game} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
