import { Badge } from '@mantine/core';
import { ChevronRight, Play, Star } from 'lucide-react';
import type { RegistryEntry } from '@aprincar/extension-contracts';
import { getSkill } from '@aprincar/skill-graph';
import { Link } from '@tanstack/react-router';
import { familyForGame } from '../game-families';

function FruitCluster() {
  return (
    <svg
      viewBox="0 0 190 118"
      className="approved-game-illustration approved-fruit-cluster"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="appleApproved" cx="34%" cy="28%" r="76%">
          <stop offset="0" stopColor="#FF7E78" />
          <stop offset=".48" stopColor="#FF3948" />
          <stop offset="1" stopColor="#D71F35" />
        </radialGradient>
        <linearGradient id="bananaApproved" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFF36E" />
          <stop offset=".52" stopColor="#FFD51F" />
          <stop offset="1" stopColor="#F5A500" />
        </linearGradient>
        <radialGradient id="grapeApproved" cx="30%" cy="25%" r="78%">
          <stop stopColor="#C36BFF" />
          <stop offset=".55" stopColor="#8D36E6" />
          <stop offset="1" stopColor="#5B1CB3" />
        </radialGradient>
        <filter id="fruitShadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#7AA6D9" floodOpacity=".22" />
        </filter>
      </defs>
      <g filter="url(#fruitShadow)">
        <g transform="translate(12 18)">
          <path
            d="M18 24C12 8 28 2 42 11 54 3 70 12 68 29 66 50 50 63 39 68 26 62 18 48 18 24Z"
            fill="url(#appleApproved)"
          />
          <ellipse cx="44" cy="13" rx="10" ry="5" fill="#38A852" transform="rotate(-24 44 13)" />
          <path d="M38 13c1-8 4-11 8-15" stroke="#6A3A17" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="31" cy="25" rx="6" ry="11" fill="#fff" opacity=".45" transform="rotate(28 31 25)" />
        </g>
        <g transform="translate(69 26)">
          <path
            d="M8 45c19 8 43 2 59-26 3 21-11 42-34 50C18 73 6 66 0 57c2-4 5-8 8-12Z"
            fill="url(#bananaApproved)"
          />
          <path
            d="M14 47c17 5 34 1 47-16"
            fill="none"
            stroke="#FFF9B0"
            strokeWidth="5"
            strokeLinecap="round"
            opacity=".7"
          />
          <circle cx="7" cy="48" r="4" fill="#7A4A1E" />
        </g>
        <g transform="translate(131 13)">
          <path d="M25 1c4 1 7 4 10 8" stroke="#6A3A17" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="36" cy="7" rx="11" ry="5" fill="#42AE4F" transform="rotate(-22 36 7)" />
          <circle cx="18" cy="22" r="12" fill="url(#grapeApproved)" />
          <circle cx="14" cy="17" r="3" fill="#fff" opacity=".33" />
          <circle cx="34" cy="22" r="12" fill="url(#grapeApproved)" />
          <circle cx="30" cy="17" r="3" fill="#fff" opacity=".33" />
          <circle cx="10" cy="36" r="12" fill="url(#grapeApproved)" />
          <circle cx="6" cy="31" r="3" fill="#fff" opacity=".33" />
          <circle cx="26" cy="36" r="12" fill="url(#grapeApproved)" />
          <circle cx="22" cy="31" r="3" fill="#fff" opacity=".33" />
          <circle cx="42" cy="36" r="12" fill="url(#grapeApproved)" />
          <circle cx="38" cy="31" r="3" fill="#fff" opacity=".33" />
          <circle cx="18" cy="50" r="12" fill="url(#grapeApproved)" />
          <circle cx="14" cy="45" r="3" fill="#fff" opacity=".33" />
          <circle cx="34" cy="50" r="12" fill="url(#grapeApproved)" />
          <circle cx="30" cy="45" r="3" fill="#fff" opacity=".33" />
          <circle cx="26" cy="64" r="12" fill="url(#grapeApproved)" />
          <circle cx="22" cy="59" r="3" fill="#fff" opacity=".33" />
        </g>
      </g>
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

function MemoryCards() {
  return (
    <svg viewBox="0 0 180 110" className="approved-game-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="memoryBlue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <g transform="translate(27 15)">
        <rect x="8" y="10" width="50" height="67" rx="12" fill="#EAF3FF" transform="rotate(-8 33 43)" />
        <rect x="68" y="8" width="50" height="67" rx="12" fill="#FFF5D9" transform="rotate(7 93 41)" />
        <rect x="36" y="3" width="55" height="74" rx="13" fill="url(#memoryBlue)" />
        <circle cx="63" cy="32" r="11" fill="#FBBF24" />
        <path d="M49 55c9-14 21-14 29 0" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        <circle cx="55" cy="46" r="3.5" fill="#fff" />
        <circle cx="71" cy="46" r="3.5" fill="#fff" />
      </g>
    </svg>
  );
}

function PatternBlocks() {
  return (
    <svg viewBox="0 0 180 110" className="approved-game-illustration" aria-hidden="true">
      <g transform="translate(20 28)">
        <rect x="0" y="18" width="34" height="34" rx="10" fill="#2563EB" />
        <circle cx="54" cy="35" r="17" fill="#FBBF24" />
        <rect x="76" y="18" width="34" height="34" rx="10" fill="#2563EB" />
        <circle cx="130" cy="35" r="17" fill="#FBBF24" />
        <path d="M16 3h112" stroke="#DBEAFE" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function ShapeCluster() {
  return (
    <svg viewBox="0 0 180 110" className="approved-game-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="shapeBlue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <g transform="translate(26 14)">
        <path d="M18 70 48 17l30 53Z" fill="url(#shapeBlue)" />
        <circle cx="102" cy="43" r="27" fill="#FBBF24" />
        <rect x="79" y="61" width="51" height="28" rx="8" fill="#10B981" transform="rotate(-8 105 75)" />
        <path d="M34 65 48 40l14 25Z" fill="#fff" opacity=".32" />
        <ellipse cx="92" cy="34" rx="8" ry="5" fill="#fff" opacity=".35" />
      </g>
    </svg>
  );
}

function WritingStroke() {
  return (
    <svg viewBox="0 0 180 110" className="approved-game-illustration" aria-hidden="true">
      <g transform="translate(26 16)">
        <rect x="0" y="0" width="118" height="78" rx="18" fill="#EFF6FF" />
        <path
          d="M25 62c18-40 31-50 44-34 9 12 5 31 17 35 9 3 16-4 25-17"
          fill="none"
          stroke="#2563EB"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path d="m112 12 16 5-12 37-11-4Z" fill="#FBBF24" />
        <path d="m128 17 5-8 4 11Z" fill="#EF4444" />
        <circle cx="25" cy="62" r="6" fill="#10B981" />
      </g>
    </svg>
  );
}

function Illustration({ entry }: { entry: RegistryEntry }) {
  if (entry.id.includes('fruit-basket')) return <FruitCluster />;
  if (entry.id.includes('counting-animals')) return <Lion />;
  if (entry.id.includes('block-tower')) return <BlockCluster />;
  if (entry.id.includes('memory')) return <MemoryCards />;
  if (entry.id.includes('pattern')) return <PatternBlocks />;
  if (entry.id.includes('space-shapes')) return <ShapeCluster />;
  if (entry.id.includes('paint') || entry.id.includes('color-match')) return <Paint />;
  if (
    entry.id.includes('writing') ||
    entry.id.includes('prewriting') ||
    entry.id.includes('cursive') ||
    entry.id.includes('print-letters')
  )
    return <WritingStroke />;
  if (entry.id.includes('letter')) return <Letters />;
  return <ShapeCluster />;
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
          <small className="approved-game-age">
            <Star size={12} fill="#FBBF24" strokeWidth={1.5} />
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
