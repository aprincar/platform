import { BookOpen, ChevronRight, LockKeyhole, Palette, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useAppStore } from '../app-store';

export function More() {
  const { profile, libraryIds } = useAppStore();

  return (
    <div className="aprincar-page approved-profile-page">
      <section className="approved-profile-hero">
        <div className="approved-profile-avatar">
          <UserRound size={34} />
        </div>
        <div>
          <span className="approved-kicker">Seu espaço</span>
          <h1>{profile?.name ?? 'Perfil Aprincar'}</h1>
          <p>
            {profile?.age ? `${profile.age} anos · ` : ''}
            {libraryIds.size} jogos na biblioteca
          </p>
        </div>
      </section>

      <section className="approved-profile-grid">
        <Link to="/library" className="approved-setting-link">
          <div className="approved-setting-icon blue">
            <BookOpen size={22} />
          </div>
          <div>
            <strong>Favoritos e biblioteca</strong>
            <span>Continue suas brincadeiras salvas.</span>
          </div>
          <ChevronRight size={19} />
        </Link>
        <Link to="/missions" className="approved-setting-link">
          <div className="approved-setting-icon yellow">
            <Sparkles size={22} />
          </div>
          <div>
            <strong>Missões em família</strong>
            <span>Atividades para fazer fora da tela.</span>
          </div>
          <ChevronRight size={19} />
        </Link>
        <Link to="/settings" className="approved-setting-link">
          <div className="approved-setting-icon purple">
            <Palette size={22} />
          </div>
          <div>
            <strong>Configurações e acessibilidade</strong>
            <span>Tema, contraste, offline e privacidade.</span>
          </div>
          <ChevronRight size={19} />
        </Link>
        <Link to="/parent" className="approved-setting-link">
          <div className="approved-setting-icon green">
            <ShieldCheck size={22} />
          </div>
          <div>
            <strong>Área do responsável</strong>
            <span>Progresso, evidências e controles.</span>
          </div>
          <LockKeyhole size={18} />
        </Link>
      </section>


    </div>
  );
}
