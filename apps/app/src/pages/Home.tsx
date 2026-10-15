import { Button } from '@mantine/core';
import { ArrowRight, BarChart3, Gamepad2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { AprincarMascot } from '@aprincar/ui';
import { useAppStore } from '../app-store';
import { GameCard } from '../components/GameCard';
import { GAME_FAMILIES } from '../game-families';

const HOME_FAMILY_LABELS: Record<string, string> = {
  quantities: 'Números',
  literacy: 'Letras',
  logic: 'Lógica',
  creative: 'Cores',
  spatial: 'Formas',
};

export function Home() {
  const { profile, registry } = useAppStore();
  const age = profile?.age ?? 5;
  const fitting = registry.filter(
    (entry) => age >= (entry.ageGuidance?.min ?? 2) - 1 && age <= (entry.ageGuidance?.max ?? 10) + 1,
  );
  const featured = (fitting.length ? fitting : registry).slice(0, 4);

  return (
    <div className="aprincar-page approved-home">
      <section className="approved-home-hero">
        <div className="approved-hero-copy">
          <div className="approved-hero-kicker">Brincar hoje. Descobrir sempre.</div>
          <h1>Descobrir é uma grande aventura!</h1>
          <p>Jogos educativos para um futuro com mais possibilidades.</p>
          <Button
            component={Link}
            to="/discover"
            className="approved-primary-cta"
            rightSection={<ArrowRight size={18} />}
          >
            Explorar jogos
          </Button>
        </div>
        <div className="approved-hero-visual">
          <span className="approved-blob approved-blob-one" />
          <span className="approved-blob approved-blob-two" />
          <span className="approved-blob approved-blob-three" />
          <AprincarMascot size={230} className="approved-mascot" />
        </div>
      </section>

      <section className="approved-section">
        <div className="approved-section-head">
          <div>
            <span>Escolha um caminho</span>
            <h2>Categorias em destaque</h2>
          </div>
          <Button component={Link} to="/worlds" variant="subtle" className="approved-text-action">
            Ver todas <ArrowRight size={16} />
          </Button>
        </div>
        <div className="approved-category-grid">
          {GAME_FAMILIES.slice(0, 4).map((family) => (
            <Link
              key={family.id}
              to="/world/$worldId"
              params={{ worldId: family.id }}
              className={`approved-category-card category-${family.id}`}
            >
              <div className="approved-category-icon">{family.icon}</div>
              <strong>{HOME_FAMILY_LABELS[family.id] ?? family.title}</strong>
              <span>{family.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="approved-section">
        <div className="approved-section-head">
          <div>
            <span>Para começar agora</span>
            <h2>Jogos educativos</h2>
          </div>
          <Button component={Link} to="/discover" variant="subtle" className="approved-text-action">
            Ver catálogo <Gamepad2 size={16} />
          </Button>
        </div>
        <div className="approved-featured-grid">
          {featured.map((entry) => (
            <GameCard key={entry.id} entry={entry} compact />
          ))}
        </div>
      </section>

      <section className="approved-progress-banner">
        <div className="approved-progress-icon">
          <BarChart3 size={28} />
        </div>
        <div>
          <span>Seu progresso</span>
          <strong>Veja o que você já explorou</strong>
          <p>O Aprincar acompanha evidências de aprendizagem sem transformar brincadeira em ranking.</p>
        </div>
        <Button component={Link} to="/progress" className="approved-secondary-cta">
          Ver progresso
        </Button>
      </section>
    </div>
  );
}
