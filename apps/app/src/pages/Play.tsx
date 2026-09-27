import { Button, Group } from '@mantine/core';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { GameHost } from '@aprincar/extension-host';
import type { ResolvedExtension } from '@aprincar/extension-contracts';
import { BrandMark, GameError, GameExitDialog, GameLoading } from '@aprincar/ui';
import { extensionManager, useAppStore } from '../app-store';
import { createGameServices } from '../game-services';
import { db, sumUsageSecondsForDay } from '@aprincar/storage';

export function Play() {
  const { gameId } = useParams({ from: '/play/$gameId' });
  const navigate = useNavigate();
  const { registry, profile, isOfflineReady } = useAppStore();

  const [resolved, setResolved] = useState<ResolvedExtension | null>(null);
  const [error, setError] = useState('');
  const [limitReached, setLimitReached] = useState(false);
  const [limitMinutes, setLimitMinutes] = useState(0);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);

  const entry = registry.find((candidate) => candidate.id === gameId);

  useEffect(() => {
    if (!entry || !profile) return;

    void (async () => {
      const limit = Number((await db.settings.get(`dailyLimit:${profile.id}`))?.value ?? 0);
      setLimitMinutes(limit);
      if (limit > 0) {
        const sessions = await db.sessions.where('profileId').equals(profile.id).toArray();
        const today = new Date().toISOString().slice(0, 10);
        if (sumUsageSecondsForDay(sessions, today) >= limit * 60) {
          setLimitReached(true);
          return;
        }
      }

      await isOfflineReady(entry);
      const result = await extensionManager.resolve(entry);
      setResolved(result);
    })().catch((cause) => setError(cause instanceof Error ? cause.message : String(cause)));
  }, [entry?.id, entry?.version, profile?.id]);

  const services = useMemo(
    () => (profile && entry ? createGameServices(profile.id, gameId, entry.trust) : null),
    [profile?.id, gameId, entry?.trust],
  );

  const gameName = entry?.name?.['pt-BR'] ?? 'Jogo Aprincar';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExitDialogOpen(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (limitReached) {
    return (
      <div className="game-runtime approved-game-runtime">
        <header className="approved-game-shell-header">
          <Link to="/" className="approved-game-back" aria-label="Voltar ao início">
            <ArrowLeft size={20} />
          </Link>
          <div className="approved-game-brand">
            <BrandMark size={32} />
            <strong>Aprincar</strong>
          </div>
          <span aria-hidden="true" />
        </header>
        <main className="approved-game-limit">
          <img
            src={`${import.meta.env.BASE_URL}brand/mascot-approved.webp`}
            alt=""
            aria-hidden="true"
            className="approved-game-limit-mascot"
          />
          <span className="approved-kicker">Hora de descansar os olhos</span>
          <h1>Você já brincou bastante hoje.</h1>
          <p>
            A meta de {limitMinutes} minutos foi alcançada. Que tal desenhar, construir ou fazer
            uma missão fora da tela?
          </p>
          <Group justify="center" mt="lg">
            <Button component={Link} to="/missions" className="approved-primary-cta">
              Ver missões
            </Button>
            <Button component={Link} to="/" className="approved-secondary-cta">
              Voltar ao início
            </Button>
          </Group>
        </main>
      </div>
    );
  }

  return (
    <div className="game-runtime approved-game-runtime">
      <header className="approved-game-shell-header">
        <button
          type="button"
          onClick={() => setExitDialogOpen(true)}
          className="approved-game-back"
          aria-label="Sair do jogo"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="approved-game-shell-title">
          <strong>{gameName}</strong>
          <span>Aprincar</span>
        </div>

        <div className="approved-game-shell-mark" aria-hidden="true">
          <BrandMark size={34} />
        </div>
      </header>

      <main className="approved-game-body">
        {error ? (
          <GameError
            message={error}
            onRetry={() => {
              setError('');
              if (entry) {
                void extensionManager
                  .resolve(entry)
                  .then(setResolved)
                  .catch((cause) => setError(String(cause)));
              }
            }}
            onExit={() => navigate({ to: '/' })}
          />
        ) : !entry ? (
          <GameError
            message="Esta brincadeira não foi encontrada no catálogo."
            onExit={() => navigate({ to: '/' })}
          />
        ) : !resolved || !services ? (
          <GameLoading title={`Preparando ${gameName}…`} />
        ) : (
          <div className="approved-game-surface">
            <GameHost
              html={resolved.html}
              manifest={resolved.manifest}
              services={services}
              title={gameName}
            />
          </div>
        )}
      </main>

      <GameExitDialog
        opened={exitDialogOpen}
        onConfirm={() => {
          setExitDialogOpen(false);
          navigate({ to: '/' });
        }}
        onCancel={() => setExitDialogOpen(false)}
      />
    </div>
  );
}
