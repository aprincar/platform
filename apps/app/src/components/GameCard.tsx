import { Badge, Button, Group, Text } from '@mantine/core';
import { CloudDownload, Play, Star } from 'lucide-react';
import type { RegistryEntry } from '@aprincar/extension-contracts';
import { getSkill } from '@aprincar/skill-graph';
import { OfflineBadge, TrustBadge } from '@aprincar/ui';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useAppStore } from '../app-store';
import { Link } from '@tanstack/react-router';
import { familyForGame } from '../game-families';

function art(entry: RegistryEntry) {
  if (entry.id.includes('space-shapes')) return { glyph: '◇ ○', cls: 'cover-3d' };
  if (entry.id.includes('memory')) return { glyph: '◌ ◍', cls: 'cover-memory' };
  if (entry.id.includes('cursive-letters')) return { glyph: 'a↝', cls: 'cover-letters' };
  if (entry.id.includes('print-letters')) return { glyph: 'ABC', cls: 'cover-letters' };
  if (entry.id.includes('prewriting-trails')) return { glyph: '⌁', cls: 'cover-letters' };
  if (entry.id.includes('write-a')) return { glyph: 'Aa', cls: 'cover-letters' };
  if (entry.id.includes('letter-hunt')) return { glyph: 'A · B', cls: 'cover-letters' };
  if (entry.id.includes('guided-painting')) return { glyph: '● ■', cls: 'cover-paint' };
  if (entry.id.includes('paint-free')) return { glyph: '✦ ✎', cls: 'cover-paint' };
  if (entry.id.includes('color-match')) return { glyph: '● ▲ ■', cls: 'cover-colors' };
  if (entry.id.includes('pattern-play')) return { glyph: '○ △ ○', cls: 'cover-logic' };
  if (entry.id.includes('fruit-basket')) return { glyph: '2 + 3', cls: 'cover-math' };
  if (entry.id.includes('block-tower')) return { glyph: '1 2 3', cls: 'cover-math' };
  if (entry.id.includes('counting-animals')) return { glyph: '1 · 2 · 3', cls: 'cover-math' };
  return { glyph: '✦', cls: 'cover-logic' };
}

export function GameCard({ entry, compact = false }: { entry: RegistryEntry; compact?: boolean }) {
  const store = useAppStore();
  const [offline, setOffline] = useState(false);
  const cover = useMemo(() => art(entry), [entry.id]);
  const family = familyForGame(entry.id);
  const primarySkill = entry.skills[0] ? getSkill(entry.skills[0]) : undefined;
  const objective = entry.objective?.['pt-BR'] ?? entry.description?.['pt-BR'];

  useEffect(() => {
    store.isOfflineReady(entry).then(setOffline);
  }, [entry.id, entry.version]);

  const name = entry.name['pt-BR'] ?? entry.id.split('.').at(-1)?.replaceAll('-', ' ');

  return (
    <article
      className={`child-card ${compact ? 'compact' : ''}`}
      data-game-id={entry.id}
      style={{ '--game-accent': family?.color ?? '#4F6EF7' } as CSSProperties}
    >
      <Link
        to="/play/$gameId"
        params={{ gameId: entry.id }}
        className="game-card-main-link"
        aria-label={`Jogar ${name}`}
      >
        <div className={`game-cover ${cover.cls}`}>
          {family && <span className="game-cover-family">{family.title}</span>}
          <div className="game-cover-art" aria-hidden="true">
            {cover.glyph}
          </div>
          <div className="game-cover-play">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      </Link>

      <div className="game-card-body">
        <Group justify="space-between" gap="xs" wrap="nowrap" className="game-card-heading">
          <div className="game-title">{name}</div>
          <div className="game-card-trust">
            <TrustBadge trust={entry.trust} />
          </div>
        </Group>

        {(primarySkill || objective) && (
          <div className="game-purpose">
            <span className="game-purpose-label">Pratica</span>
            <strong>{primarySkill?.label['pt-BR'] ?? entry.skills[0] ?? 'Exploração'}</strong>
            {!compact && objective && <span className="game-purpose-detail">{objective}</span>}
          </div>
        )}

        <div className="game-meta">
          <Badge radius="xl" variant="light">
            {entry.ageGuidance?.min ?? 2}–{entry.ageGuidance?.max ?? 10} anos
          </Badge>
          <span className="game-offline-badge">
            <OfflineBadge ready={offline} />
          </span>
        </div>

        {!compact && (
          <Text size="sm" c="dimmed" lineClamp={2} className="game-card-description">
            {entry.description?.['pt-BR'] ?? 'Uma experiência Aprincar.'}
          </Text>
        )}

        <div className="game-actions">
          <Link to="/play/$gameId" params={{ gameId: entry.id }}>
            <Button className="ap-primary game-play-button" fullWidth leftSection={<Play size={16} />}>
              Jogar
            </Button>
          </Link>
          <Button
            className="ap-secondary game-card-library-action"
            leftSection={<Star size={16} />}
            onClick={() => store.addLibrary(entry)}
          >
            Biblioteca
          </Button>
        </div>

        {!offline && (
          <Button
            className="game-card-offline-action"
            variant="subtle"
            color="blue"
            size="xs"
            leftSection={<CloudDownload size={15} />}
            onClick={async () => {
              await store.prepareOffline(entry);
              setOffline(true);
            }}
          >
            Disponibilizar offline
          </Button>
        )}
      </div>
    </article>
  );
}
