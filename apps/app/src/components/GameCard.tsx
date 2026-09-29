import { Badge } from '@mantine/core';
import { ChevronRight, Play } from 'lucide-react';
import type { RegistryEntry } from '@aprincar/extension-contracts';
import { getSkill } from '@aprincar/skill-graph';
import { Link } from '@tanstack/react-router';
import { familyForGame } from '../game-families';

function FruitCluster() {
  return (
    <svg viewBox="0 0 180 110" className="approved-game-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="apple" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FF6B6B" />
          <stop offset="1" stopColor="#E92D3F" />
        </linearGradient>
        <linearGradient id="banana" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFE86A" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="grape" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
      <path
        d="M34 44c-10-18 7-29 23-21 11-8 28 1 26 18-2 24-19 38-30 43-12-6-19-18-19-40Z"
        fill="url(#apple)"
      />
      <ellipse cx="64" cy="28" rx="8" ry="4" fill="#22A447" transform="rotate(-22 64 28)" />
      <path d="M100 64c14 8 35 5 46-15 4 18-8 35-26 40-16 4-29-3-35-12 4-3 9-8 15-13Z" fill="url(#banana)" />
      <circle cx="126" cy="34" r="12" fill="url(#grape)" />
      <circle cx="140" cy="39" r="12" fill="url(#grape)" />
      <circle cx="117" cy="47" r="12" fill="url(#grape)" />
      <circle cx="133" cy="52" r="12" fill="url(#grape)" />
      <circle cx="126" cy="65" r="12" fill="url(#grape)" />
      <path d="M130 19c5-8 13-9 19-6" fill="none" stroke="#3A7B2F" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function BlockCluster() {
  return (
    <svg viewBox="0 0 180 110" className="approved-game-illustration" aria-hidden="true">
      <rect x="38" y="60" width="42" height="32" rx="7" fill="#2563EB" />
      <rect x="84" y="60" width="42" height="32" rx="7" fill="#FBBF24" />
      <rect x="61" y="24" width="42" height="32" rx="7" fill="#EF4444" />
      <rect x="107" y="24" width="36" height="32" rx="7" fill="#10B981" />
      <path
        d="M49 68h19M95 68h19M72 32h19M116 32h17"
        stroke="rgba(255,255,255,.55)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Lion() {
  return (
    <svg viewBox="0 0 180 110" className="approved-game-illustration" aria-hidden="true">
      <circle cx="90" cy="55" r="40" fill="#E58A21" />
      <circle cx="90" cy="57" r="29" fill="#FBC84A" />
      <circle cx="72" cy="37" r="8" fill="#FFF3C4" />
      <circle cx="108" cy="37" r="8" fill="#FFF3C4" />
      <circle cx="80" cy="54" r="4" fill="#172554" />
      <circle cx="100" cy="54" r="4" fill="#172554" />
      <ellipse cx="90" cy="66" rx="12" ry="10" fill="#FFF7DD" />
      <path d="M86 63h8l-4 5Z" fill="#7C3F00" />
      <path d="M77 68h-12M103 68h12" stroke="#8B4B17" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Letters() {
  return (
    <svg viewBox="0 0 180 110" className="approved-game-illustration" aria-hidden="true">
      <rect x="27" y="24" width="42" height="58" rx="12" fill="#2563EB" />
      <text x="48" y="63" textAnchor="middle" fontSize="34" fontWeight="800" fill="#fff">
        A
      </text>
      <rect x="70" y="18" width="42" height="64" rx="12" fill="#10B981" />
      <text x="91" y="61" textAnchor="middle" fontSize="34" fontWeight="800" fill="#fff">
        B
      </text>
      <rect x="113" y="28" width="42" height="54" rx="12" fill="#FBBF24" />
      <text x="134" y="64" textAnchor="middle" fontSize="34" fontWeight="800" fill="#172554">
        C
      </text>
    </svg>
  );
}

function Paint() {
  return (
    <svg viewBox="0 0 180 110" className="approved-game-illustration" aria-hidden="true">
      <path
        d="M43 70c0-29 24-50 53-50 25 0 45 17 45 38 0 13-8 18-18 18-8 0-12-5-19-5-10 0-12 20-31 20-17 0-30-9-30-21Z"
        fill="#FFE7D6"
      />
      <circle cx="67" cy="50" r="8" fill="#EF4444" />
      <circle cx="91" cy="39" r="8" fill="#FBBF24" />
      <circle cx="113" cy="47" r="8" fill="#10B981" />
      <circle cx="78" cy="70" r="8" fill="#2563EB" />
      <path d="M132 84 153 29" stroke="#8B5E3C" strokeWidth="8" strokeLinecap="round" />
      <path d="M151 31 160 18" stroke="#0EA5E9" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

function Illustration({ entry }: { entry: RegistryEntry }) {
  if (entry.id.includes('fruit-basket')) return <FruitCluster />;
  if (entry.id.includes('counting-animals')) return <Lion />;
  if (entry.id.includes('block-tower')) return <BlockCluster />;
  if (entry.id.includes('paint') || entry.id.includes('color-match')) return <Paint />;
  if (entry.id.includes('letter') || entry.id.includes('writing') || entry.id.includes('prewriting'))
    return <Letters />;
  return <BlockCluster />;
}

export function GameCard({ entry, compact = false }: { entry: RegistryEntry; compact?: boolean }) {
  const family = familyForGame(entry.id);
  const primarySkill = entry.skills[0] ? getSkill(entry.skills[0]) : undefined;
  const name = entry.name['pt-BR'] ?? entry.id.split('.').at(-1)?.replaceAll('-', ' ');
  const skill = primarySkill?.label['pt-BR'] ?? family?.title ?? 'Aprender brincando';
  const objective = entry.objective?.['pt-BR'] ?? entry.description?.['pt-BR'];

  return (
    <article className={`approved-game-card ${compact ? 'compact' : ''}`} data-game-id={entry.id}>
      <Link
        to="/play/$gameId"
        params={{ gameId: entry.id }}
        className="approved-game-thumb"
        aria-label={`Jogar ${name}`}
      >
        <Illustration entry={entry} />
      </Link>
      <div className="approved-game-card-content">
        <div className="approved-game-card-copy">
          <strong>{name}</strong>
          {objective && <span className="sr-only">{objective}</span>}
          <span>{family?.title ?? skill}</span>
          <small>
            {entry.ageGuidance?.min ?? 2}–{entry.ageGuidance?.max ?? 10} anos
          </small>
        </div>
        {!compact && <Badge variant="light">{skill}</Badge>}
        <Link
          to="/play/$gameId"
          params={{ gameId: entry.id }}
          className="approved-game-card-arrow"
          aria-label={`Abrir ${name}`}
        >
          {compact ? <ChevronRight size={22} /> : <Play size={20} fill="currentColor" />}
        </Link>
      </div>
    </article>
  );
}
