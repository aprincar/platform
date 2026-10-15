import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { GAME_FAMILIES } from '../game-families';

export function Worlds() {
  return (
    <div className="aprincar-page approved-worlds-page">
      <section className="approved-catalog-header">
        <div>
          <span className="approved-kicker">Aprenda por caminhos</span>
          <h1>Mundos de aprendizagem</h1>
          <p>
            Cada mundo reúne jogos com objetivos próximos, sem transformar a brincadeira em uma lista de
            exercícios.
          </p>
        </div>
      </section>
      <section className="approved-world-grid">
        {GAME_FAMILIES.map((family) => (
          <Link
            key={family.id}
            to="/world/$worldId"
            params={{ worldId: family.id }}
            className={`approved-world-card category-${family.id}`}
          >
            <div className="approved-world-icon">{family.icon}</div>
            <div>
              <strong>{family.title}</strong>
              <p>{family.objective}</p>
            </div>
            <ArrowRight size={20} />
          </Link>
        ))}
      </section>
    </div>
  );
}
