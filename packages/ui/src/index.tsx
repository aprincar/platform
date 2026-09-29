import type { CSSProperties, ReactNode } from 'react';
import { Badge, Button, Group, Progress, Text, UnstyledButton } from '@mantine/core';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CloudDownload,
  CloudOff,
  Compass,
  Home,
  Info,
  Library,
  MoreHorizontal,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';

export const APRINCAR_COLORS = {
  bg: '#F8FBFF',
  surface: '#FFFFFF',
  surfaceMuted: '#EFF6FF',
  text: '#0F172A',
  muted: '#64748B',
  border: '#DCE8F7',
  blue: '#2563EB',
  blueStrong: '#1D4ED8',
  secondary: '#0EA5E9',
  sun: '#FBBF24',
  yellow: '#FBBF24',
  orange: '#F59E0B',
  leaf: '#10B981',
  coral: '#EF4444',
  purple: '#7C3AED',
  purpleSoft: '#F3E8FF',
  navy: '#0F172A',
  dark: '#07142E',
} as const;

export function BrandMark({ size = 46, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={style}
      data-aprincar-brand="approved-v1"
    >
      <defs>
        <linearGradient id="aprincar-a" x1="10" y1="10" x2="55" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA5E9" />
          <stop offset=".48" stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <path
        d="M12 52C14.5 28 23 12 32 12s17.5 16 20 40"
        fill="none"
        stroke="url(#aprincar-a)"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M27 29.8c0-2.2 2.4-3.5 4.2-2.3l12.4 8c1.7 1.1 1.7 3.6 0 4.7l-12.4 8A2.8 2.8 0 0 1 27 45.9V29.8Z"
        fill="#FBBF24"
      />
    </svg>
  );
}

const letters = [
  ['A', APRINCAR_COLORS.navy],
  ['p', APRINCAR_COLORS.navy],
  ['r', APRINCAR_COLORS.navy],
  ['i', APRINCAR_COLORS.blue],
  ['n', APRINCAR_COLORS.blue],
  ['c', APRINCAR_COLORS.blue],
  ['a', APRINCAR_COLORS.blue],
  ['r', APRINCAR_COLORS.blue],
] as const;

export function Brand({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <Group gap={9} wrap="nowrap" className="aprincar-brand" data-aprincar-brand="approved-v1">
      <BrandMark size={compact ? 38 : 48} />
      <div className="aprincar-brand-copy">
        <span
          aria-label="Aprincar"
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            fontFamily: '"Poppins", Inter, system-ui, sans-serif',
            fontSize: compact ? 23 : 29,
            fontWeight: 950,
            lineHeight: 1,
            letterSpacing: '-0.05em',
          }}
        >
          {letters.map(([letter, color], index) => (
            <span
              key={`${letter}-${index}`}
              className="aprincar-wordmark-letter"
              style={{ color: light ? '#fff' : color }}
              aria-hidden="true"
            >
              {letter}
            </span>
          ))}
        </span>
        {!compact && (
          <Text size="xs" c={light ? 'gray.2' : 'dimmed'} mt={3} fw={650}>
            Brincar hoje. Descobrir sempre.
          </Text>
        )}
      </div>
    </Group>
  );
}

export function AprincarMascot({
  size = 240,
  className,
  withPencil = false,
}: {
  size?: number;
  className?: string;
  withPencil?: boolean;
}) {
  const height = Math.round(size * 1.55);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 260 404"
      className={className}
      role="img"
      aria-label="Mascote Aprincar: menino sorrindo e acenando"
      data-aprincar-brand="approved-v1"
    >
      <defs>
        <linearGradient id="mascot-shirt-blue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="mascot-shorts-blue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="mascot-hair" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6B2E14" />
          <stop offset=".55" stopColor="#3F1B0E" />
          <stop offset="1" stopColor="#24100A" />
        </linearGradient>
        <radialGradient id="mascot-skin" cx=".42" cy=".32" r=".72">
          <stop stopColor="#FFD8BE" />
          <stop offset=".75" stopColor="#FFB68E" />
          <stop offset="1" stopColor="#F39A72" />
        </radialGradient>
        <filter id="mascot-shadow" x="-25%" y="-20%" width="150%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#1D4ED8" floodOpacity=".16" />
        </filter>
      </defs>

      <g filter="url(#mascot-shadow)">
        <ellipse cx="126" cy="390" rx="86" ry="11" fill="#1D4ED8" opacity=".12" />
        <circle cx="229" cy="54" r="10" fill="#FBBF24" />
        <path d="M230 27l7-14 8 13-7 6Z" fill="#FBBF24" />
        <path d="M25 84l8-15 8 15-8 7Z" fill="#FBBF24" opacity=".95" />

        <g>
          <rect x="54" y="177" width="57" height="116" rx="25" fill="#1D4ED8" />
          <rect x="46" y="188" width="23" height="88" rx="11" fill="#2563EB" />
          <rect x="51" y="216" width="14" height="31" rx="7" fill="#FBBF24" />
          <path d="M87 190c18 17 25 44 24 76" fill="none" stroke="#0F4EBC" strokeWidth="11" strokeLinecap="round" />
        </g>

        <g>
          <path d="M84 314c-5 24-7 39-6 53l33 1 8-54Z" fill="url(#mascot-shorts-blue)" />
          <path d="M139 313c3 22 8 40 12 54l31-5-12-51Z" fill="url(#mascot-shorts-blue)" />
          <rect x="81" y="356" width="24" height="25" rx="11" fill="url(#mascot-skin)" />
          <rect x="153" y="351" width="24" height="28" rx="11" fill="url(#mascot-skin)" />
          <g transform="rotate(-5 91 381)">
            <path d="M57 374c10-11 32-13 46-3l11 16c2 4-1 9-6 9H61c-10 0-13-13-4-22Z" fill="#2563EB" />
            <path d="M61 385h47" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
            <path d="M72 372l8 9m4-11 8 10" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 394h53" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" />
          </g>
          <g transform="rotate(7 170 380)">
            <path d="M145 371c12-10 33-9 45 1l12 14c3 4 0 10-6 10h-48c-10 0-13-15-3-25Z" fill="#2563EB" />
            <path d="M149 384h47" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
            <path d="M159 372l8 9m5-9 8 9" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            <path d="M148 394h53" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" />
          </g>
        </g>

        <path d="M74 244c-4 29 1 59 15 78 19 9 63 10 86-1 13-23 16-52 8-80-19-16-88-16-109 3Z" fill="#fff" />
        <path d="M83 249c13-10 26-13 48-13 22 0 39 4 52 14l-6 28H78Z" fill="#F8FAFC" />
        <path d="M93 238c-14-17-31-24-45-16-13 7-14 25-2 35 10 8 24 8 37 2Z" fill="url(#mascot-skin)" />
        <path d="M177 239c14-11 27-13 39-5 10 7 12 21 4 30-9 11-27 12-44 2Z" fill="url(#mascot-skin)" />
        <path d="M207 244c13-16 18-29 17-39-1-12 8-17 14-9 4 5 3 15 1 23 6-7 10-16 11-25 1-9 10-11 14-4 4 8-3 28-11 41-10 15-23 27-36 32Z" fill="url(#mascot-skin)" />
        <circle cx="235" cy="191" r="7" fill="url(#mascot-skin)" />
        <path d="M59 224c6 2 15 8 22 16" fill="none" stroke="#F39A72" strokeWidth="3" strokeLinecap="round" />

        <g>
          <path d="M109 264c8-15 15-22 22-22 8 0 15 7 23 22" fill="none" stroke="url(#mascot-shirt-blue)" strokeWidth="14" strokeLinecap="round" />
          <path d="M129 252l19 12-19 12Z" fill="#FBBF24" />
        </g>

        <rect x="112" y="198" width="39" height="38" rx="18" fill="url(#mascot-skin)" />

        <g>
          <ellipse cx="131" cy="136" rx="74" ry="70" fill="url(#mascot-skin)" />
          <ellipse cx="58" cy="144" rx="17" ry="22" fill="url(#mascot-skin)" />
          <ellipse cx="202" cy="144" rx="17" ry="22" fill="url(#mascot-skin)" />
          <ellipse cx="60" cy="145" rx="8" ry="11" fill="#F09C78" opacity=".55" />
          <ellipse cx="200" cy="145" rx="8" ry="11" fill="#F09C78" opacity=".55" />

          <path d="M65 113c-3-33 20-65 55-70-5-15 9-28 28-27 12 1 23 6 32 17 9-7 24-4 30 7-12 0-20 4-23 11 20 4 31 18 34 36-12-7-23-8-32-4 10 7 15 18 15 31-16-13-29-15-40-8-14-15-30-19-45-10-17 10-32 16-54 17Z" fill="url(#mascot-hair)" />
          <path d="M82 74c14 6 25 5 34-4m15-29c12 5 24 4 33-2m16 17c9 2 18 8 23 16" fill="none" stroke="#7A3717" strokeWidth="7" strokeLinecap="round" opacity=".8" />

          <path d="M82 118c10-8 22-8 31 0" fill="none" stroke="#4A210F" strokeWidth="6" strokeLinecap="round" />
          <path d="M149 118c11-8 23-8 32 0" fill="none" stroke="#4A210F" strokeWidth="6" strokeLinecap="round" />

          <ellipse cx="98" cy="139" rx="21" ry="25" fill="#fff" />
          <ellipse cx="164" cy="139" rx="21" ry="25" fill="#fff" />
          <ellipse cx="100" cy="142" rx="12" ry="16" fill="#6B351C" />
          <ellipse cx="162" cy="142" rx="12" ry="16" fill="#6B351C" />
          <ellipse cx="101" cy="144" rx="7" ry="11" fill="#160D09" />
          <ellipse cx="161" cy="144" rx="7" ry="11" fill="#160D09" />
          <circle cx="105" cy="136" r="4" fill="#fff" />
          <circle cx="165" cy="136" r="4" fill="#fff" />

          <ellipse cx="130" cy="160" rx="7" ry="5" fill="#EE8B6E" opacity=".75" />
          <ellipse cx="82" cy="163" rx="14" ry="8" fill="#FF8F8F" opacity=".25" />
          <ellipse cx="179" cy="163" rx="14" ry="8" fill="#FF8F8F" opacity=".25" />

          <path d="M103 171c9 20 45 24 58 0-17 5-39 5-58 0Z" fill="#8B1E25" />
          <path d="M111 174c13 5 29 5 42 0" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          <path d="M118 190c9 5 19 5 28 0" stroke="#FF6476" strokeWidth="6" strokeLinecap="round" />
        </g>

        <path d="M87 234c0-18 3-33 12-43m69 43c-1-17-5-31-13-42" fill="none" stroke="#1D4ED8" strokeWidth="10" strokeLinecap="round" />
        <path d="M93 239c-13 11-18 28-16 51m96-52c10 14 13 31 8 51" fill="none" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" opacity=".9" />

        {withPencil && (
          <g transform="translate(194 243) rotate(14)">
            <rect x="0" y="0" width="10" height="74" rx="5" fill="#FBBF24" />
            <rect x="0" y="0" width="10" height="18" rx="5" fill="#EF4444" />
            <path d="M0 74h10l-5 11Z" fill="#D29A65" />
          </g>
        )}
      </g>
    </svg>
  );
}

export function TrustBadge({ trust }: { trust: string }) {
  const label =
    trust === 'official'
      ? 'Oficial'
      : trust === 'curated'
        ? 'Curado'
        : trust === 'experimental'
          ? 'Experimental'
          : 'Comunidade';
  const color =
    trust === 'official'
      ? 'blue'
      : trust === 'curated'
        ? 'teal'
        : trust === 'experimental'
          ? 'orange'
          : 'gray';
  return (
    <Badge variant="light" radius="xl" color={color}>
      {label}
    </Badge>
  );
}

export function OfflineBadge({ ready }: { ready: boolean }) {
  return (
    <Badge leftSection={<CloudOff size={12} />} color={ready ? 'teal' : 'gray'} radius="xl" variant="light">
      {ready ? 'Offline pronto' : 'Online'}
    </Badge>
  );
}

export function PrincipleCard({ title, text, icon }: { title: string; text: string; icon?: ReactNode }) {
  return (
    <div className="aprincar-principle-card">
      <div className="aprincar-principle-icon">{icon ?? <ShieldCheck size={20} />}</div>
      <Text fw={850}>{title}</Text>
      <Text c="dimmed" size="sm">
        {text}
      </Text>
    </div>
  );
}

export function TouchButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftSection,
  rightSection,
  disabled = false,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'subtle' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const cls = [
    'touch-button',
    variant === 'primary' ? 'ap-primary' : variant === 'secondary' ? 'ap-secondary' : '',
    size === 'lg' ? 'touch-button-lg' : size === 'sm' ? 'touch-button-sm' : '',
    fullWidth ? 'touch-button-full' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Button
      className={cls}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      leftSection={leftSection}
      rightSection={rightSection}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
}

export function TouchIconButton({
  icon,
  onClick,
  ariaLabel,
  size = 48,
  active = false,
}: {
  icon: ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  size?: number;
  active?: boolean;
}) {
  return (
    <button
      className={`touch-icon-button ${active ? 'active' : ''}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}

export function ProgressState({
  state,
  showLabel = true,
}: {
  state: 'unknown' | 'exploring' | 'developing' | 'comfortable' | 'consolidated';
  showLabel?: boolean;
}) {
  const configs = {
    unknown: { emoji: '🌱', label: 'Não observado', color: 'gray' },
    exploring: { emoji: '🌱', label: 'Explorando', color: 'blue' },
    developing: { emoji: '🌿', label: 'Desenvolvendo', color: 'violet' },
    comfortable: { emoji: '🌳', label: 'Confortável', color: 'teal' },
    consolidated: { emoji: '✨', label: 'Consolidado', color: 'yellow' },
  };

  const current = configs[state] ?? configs.unknown;

  return (
    <Badge color={current.color} radius="xl" variant="light" className="progress-state-badge">
      <span style={{ marginRight: 4 }}>{current.emoji}</span>
      {showLabel && current.label}
    </Badge>
  );
}

export function WorldCard({
  id,
  title,
  icon,
  color,
  description,
  onClick,
  active = false,
}: {
  id: string;
  title: string;
  icon: string;
  color?: string;
  description?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <article
      className={`world-card ${active ? 'active' : ''}`}
      style={{ '--world-accent': color ?? APRINCAR_COLORS.blue } as CSSProperties}
      onClick={onClick}
      data-world-id={id}
    >
      <div className="world-card-icon">{icon}</div>
      <div className="world-card-content">
        <h3 className="world-card-title">{title}</h3>
        {description && <p className="world-card-desc">{description}</p>}
      </div>
    </article>
  );
}

export function MissionCard({
  id,
  title,
  prompt,
  category = 'Casa',
  completed = false,
  onComplete,
  onNext,
}: {
  id: string;
  title: string;
  prompt: string;
  category?: string;
  completed?: boolean;
  onComplete?: () => void;
  onNext?: () => void;
}) {
  return (
    <article className={`mission-card ${completed ? 'completed' : ''}`} data-mission-id={id}>
      <div className="mission-card-badge">
        <Sparkles size={14} />
        <span>Missão fora da tela · {category}</span>
      </div>
      <h3 className="mission-card-title">{title}</h3>
      <p className="mission-card-prompt">{prompt}</p>
      <div className="mission-card-actions">
        <Button
          className={completed ? 'ap-secondary' : 'ap-primary'}
          leftSection={completed ? <Check size={16} /> : <Star size={16} />}
          onClick={onComplete}
        >
          {completed ? 'Missão concluída! ✨' : 'Fizemos! 🎉'}
        </Button>
        {onNext && (
          <Button variant="subtle" color="gray" onClick={onNext} leftSection={<RotateCcw size={14} />}>
            Outra missão
          </Button>
        )}
      </div>
    </article>
  );
}

export function GameShelf({
  title,
  subtitle,
  children,
  action,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="shelf-section">
      {(title || action) && (
        <div className="section-head">
          <div>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action && <div className="section-more">{action}</div>}
        </div>
      )}
      <div className="game-shelf" style={{ marginTop: 14 }}>
        {children}
      </div>
    </section>
  );
}

export function Carousel({ children }: { children: ReactNode }) {
  return <div className="game-shelf">{children}</div>;
}

export function LoadingState({ message = 'Preparando a brincadeira…' }: { message?: string }) {
  return (
    <div className="aprincar-loading-state" role="status" aria-live="polite">
      <AprincarMascot size={160} className="loading-mascot" />
      <Text fw={850} fz="xl" mt="md">
        {message}
      </Text>
      <Text size="sm" c="dimmed">
        Carregando atividades locais…
      </Text>
    </div>
  );
}

export function EmptyState({
  title = 'Nada por aqui ainda',
  description = 'Explore as novidades para preencher este espaço.',
  action,
  icon,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon ?? <Sparkles size={36} color={APRINCAR_COLORS.purple} />}</div>
      <Text fw={850} fz="xl">
        {title}
      </Text>
      <Text mt={6} c="dimmed" size="md" style={{ maxWidth: 440, margin: '6px auto 0' }}>
        {description}
      </Text>
      {action && <div style={{ marginTop: 20 }}>{action}</div>}
    </div>
  );
}

export function OfflineState({
  message = 'Tudo bem. Você pode continuar brincando com o que já está neste dispositivo.',
}: {
  message?: string;
}) {
  return (
    <div className="offline-state-banner">
      <CloudOff size={20} />
      <span>{message}</span>
    </div>
  );
}

export function ErrorState({
  title = 'Quase lá!',
  message = 'Vamos tentar de outro jeito?',
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="error-state-card">
      <div className="error-state-icon">💫</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <Button className="ap-primary" onClick={onRetry} leftSection={<RotateCcw size={16} />}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}

export function InstallPrompt({ onInstall, onDismiss }: { onInstall: () => void; onDismiss: () => void }) {
  return (
    <aside className="install-prompt-panel" aria-label="Instalar Aprincar">
      <BrandMark size={36} />
      <div>
        <strong>Instale o Aprincar no seu celular</strong>
        <span>Brinque offline e acesse rápido com toque direto.</span>
      </div>
      <Group gap="xs">
        <Button size="xs" className="ap-primary" onClick={onInstall}>
          Instalar
        </Button>
        <UnstyledButton onClick={onDismiss} aria-label="Fechar aviso" style={{ padding: 4 }}>
          <X size={16} />
        </UnstyledButton>
      </Group>
    </aside>
  );
}

export function UpdatePrompt({ onUpdate, onDismiss }: { onUpdate: () => void; onDismiss: () => void }) {
  return (
    <div className="update-prompt-banner" role="alert">
      <Sparkles size={18} />
      <span>Nova versão pronta! Atualize quando terminar sua brincadeira.</span>
      <Group gap="xs" ml="auto">
        <Button size="xs" variant="white" color="blue" onClick={onUpdate}>
          Atualizar agora
        </Button>
        <UnstyledButton onClick={onDismiss} aria-label="Lembrar mais tarde">
          <X size={16} />
        </UnstyledButton>
      </Group>
    </div>
  );
}

export function AvatarPicker({
  value,
  onChange,
  avatars = ['⭐', '🦊', '🦕', '🐼', '🐯', '🐸', '🐙', '🐝', '🦁', '🚀', '🎨', '🎵'],
}: {
  value: string;
  onChange: (avatar: string) => void;
  avatars?: string[];
}) {
  return (
    <div className="avatar-choice-grid">
      {avatars.map((item) => (
        <button
          key={item}
          type="button"
          className={`avatar-choice ${value === item ? 'selected' : ''}`}
          onClick={() => onChange(item)}
          aria-label={`Avatar ${item}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function AgePicker({
  value,
  onChange,
  options = [2, 3, 4, 5, 6, 7, 8, 9, 10],
}: {
  value: number;
  onChange: (age: number) => void;
  options?: number[];
}) {
  return (
    <div className="age-shortcuts">
      {options.map((age) => (
        <button
          key={age}
          type="button"
          className={value === age ? 'selected' : ''}
          onClick={() => onChange(age)}
        >
          {age}
        </button>
      ))}
    </div>
  );
}

export function InterestPicker({
  selected,
  onToggle,
  interests = [
    { id: 'animals', icon: '🦕', label: 'Bichos' },
    { id: 'space', icon: '🪐', label: 'Espaço' },
    { id: 'drawing', icon: '🖍️', label: 'Desenhar' },
    { id: 'music', icon: '🎵', label: 'Música' },
    { id: 'stories', icon: '📚', label: 'Histórias' },
    { id: 'building', icon: '🧱', label: 'Construir' },
    { id: 'puzzles', icon: '🧩', label: 'Desafios' },
    { id: 'robots', icon: '🤖', label: 'Robôs' },
  ],
}: {
  selected: string[];
  onToggle: (id: string) => void;
  interests?: { id: string; icon: string; label: string }[];
}) {
  return (
    <div className="onboarding-choice-grid">
      {interests.map(({ id, icon, label }) => (
        <button
          key={id}
          type="button"
          className={`onboarding-choice ${selected.includes(id) ? 'selected' : ''}`}
          onClick={() => onToggle(id)}
        >
          <span>{icon}</span>
          <strong>{label}</strong>
        </button>
      ))}
    </div>
  );
}

export function SkillProgress({
  label,
  state,
  evidenceCount = 0,
  contextCount = 0,
  confidence = 0,
  description,
  offScreenActivity,
  onClick,
}: {
  label: string;
  state: 'unknown' | 'exploring' | 'developing' | 'comfortable' | 'consolidated';
  evidenceCount?: number;
  contextCount?: number;
  confidence?: number;
  description?: string;
  offScreenActivity?: string;
  onClick?: () => void;
}) {
  return (
    <div className="skill-row" onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <Text fw={850} fz="md">
          {label}
        </Text>
        <ProgressState state={state} />
      </div>
      {description && (
        <Text size="sm" c="dimmed" mt={4}>
          {description}
        </Text>
      )}
      <Progress value={Math.round(confidence * 100)} color="violet" radius="xl" mt={8} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 6,
          fontSize: 12,
          color: 'var(--ap-muted)',
        }}
      >
        <span>
          {evidenceCount} evidência{evidenceCount === 1 ? '' : 's'} · {contextCount} contexto
          {contextCount === 1 ? '' : 's'}
        </span>
      </div>
      {offScreenActivity && (
        <div className="skill-offscreen-tip" style={{ marginTop: 8 }}>
          <Sparkles size={14} color={APRINCAR_COLORS.sun} />
          <span>Sugestão fora da tela: {offScreenActivity}</span>
        </div>
      )}
    </div>
  );
}

export function SkillEvidenceList({
  evidences,
}: {
  evidences: Array<{
    id: string;
    gameTitle?: string;
    date: string;
    result: string;
    independent: boolean;
  }>;
}) {
  return (
    <div className="skill-evidence-list">
      {evidences.map((ev) => (
        <div key={ev.id} className="skill-evidence-item">
          <div>
            <strong>{ev.gameTitle ?? 'Atividade Aprincar'}</strong>
            <small>{ev.date}</small>
          </div>
          <Badge size="sm" color={ev.result === 'success' ? 'teal' : 'blue'} variant="light">
            {ev.result === 'success' ? 'Concluiu' : 'Explorou'}
          </Badge>
        </div>
      ))}
    </div>
  );
}

export function OrientationHint({ orientation }: { orientation: 'portrait' | 'landscape' }) {
  return (
    <div className="orientation-hint-banner" role="status">
      <Info size={16} />
      <span>
        Para melhor experiência, gire o dispositivo para{' '}
        {orientation === 'landscape' ? 'horizontal (lado a lado)' : 'vertical'}.
      </span>
    </div>
  );
}

export function GameLoading({ title = 'Preparando a brincadeira…' }: { title?: string }) {
  return (
    <div className="game-runtime-loading" role="status">
      <AprincarMascot size={150} className="loading-mascot" />
      <Text fw={850} mt="md" fz="lg">
        {title}
      </Text>
    </div>
  );
}

export function GameError({
  message = 'Não foi possível carregar esta brincadeira.',
  onRetry,
  onExit,
}: {
  message?: string;
  onRetry?: () => void;
  onExit?: () => void;
}) {
  return (
    <div className="game-runtime-message">
      <h3>💫 Quase lá!</h3>
      <p>{message}</p>
      <Group justify="center" mt="md">
        {onRetry && (
          <Button className="ap-primary" onClick={onRetry}>
            Tentar novamente
          </Button>
        )}
        {onExit && (
          <Button variant="subtle" color="gray" onClick={onExit}>
            Voltar ao início
          </Button>
        )}
      </Group>
    </div>
  );
}

export function GameExitDialog({
  opened,
  onConfirm,
  onCancel,
}: {
  opened: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!opened) return null;

  return (
    <div className="game-exit-dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="exit-title">
      <div className="game-exit-dialog-box">
        <h3 id="exit-title">Quer sair do jogo agora?</h3>
        <p>Tudo o que você conquistou já foi salvo no seu espaço.</p>
        <Group justify="flex-end" mt="lg">
          <Button variant="subtle" color="gray" onClick={onCancel}>
            Continuar jogando
          </Button>
          <Button className="ap-primary" onClick={onConfirm}>
            Sair e voltar
          </Button>
        </Group>
      </div>
    </div>
  );
}
