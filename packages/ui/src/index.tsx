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
  bg: '#F7F7FB',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF1F7',
  text: '#20263A',
  muted: '#6B7280',
  border: '#DEE3EE',
  blue: '#4F6EF7',
  blueStrong: '#3B55D9',
  sun: '#FFC83D',
  yellow: '#FFC83D',
  orange: '#FF9F43',
  leaf: '#2FC98F',
  coral: '#FF6B6B',
  purple: '#8B6FF7',
  purpleSoft: '#F1EEFF',
  navy: '#17213D',
  dark: '#111827',
} as const;

export function BrandMark({ size = 46, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={style}
      data-aprincar-brand="portal-v4"
    >
      <g id="aprincar-portal">
        <path
          d="M12.8 48.6 26.1 16.2c2.1-5.1 9.3-5.1 11.4 0l13.7 32.4c2.3 5.5-1.7 11.4-7.7 11.4H20.6c-6 0-10.1-5.9-7.8-11.4Z"
          fill={APRINCAR_COLORS.blue}
        />
        <path
          d="M27.1 28.3c0-1.4 1.6-2.2 2.8-1.5l13.2 8.3a1.8 1.8 0 0 1 0 3L30 46.3a1.8 1.8 0 0 1-2.8-1.5V28.3Z"
          fill="#FFFFFF"
        />
        <circle cx="47.2" cy="15.5" r="6.3" fill={APRINCAR_COLORS.sun} />
        <path
          d="m14 18.2 2.3 4.3 4.4 2.2-4.4 2.2-2.3 4.3-2.2-4.3-4.4-2.2 4.4-2.2 2.2-4.3Z"
          fill={APRINCAR_COLORS.coral}
        />
      </g>
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
    <Group gap={9} wrap="nowrap" className="aprincar-brand" data-aprincar-brand="portal-v4">
      <BrandMark size={compact ? 38 : 48} />
      <div className="aprincar-brand-copy">
        <span
          aria-label="Aprincar"
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            fontFamily: 'ui-rounded, "Arial Rounded MT Bold", "Trebuchet MS", system-ui, sans-serif',
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
            Aprender acontece brincando.
          </Text>
        )}
      </div>
    </Group>
  );
}

export function AprincarMascot({
  size = 240,
  className,
  withPencil = true,
}: {
  size?: number;
  className?: string;
  withPencil?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 260 270"
      width={size}
      height={Math.round(size * 1.04)}
      className={className}
      aria-hidden="true"
      data-aprincar-brand="portal-v4"
    >
      <g id="aprincar-portal-mascot">
        <ellipse cx="130" cy="244" rx="70" ry="12" fill={APRINCAR_COLORS.navy} opacity=".1" />
        <path
          d="M62 142c0-58 26-101 68-101s68 43 68 101v35c0 39-29 67-68 67s-68-28-68-67v-35Z"
          fill={APRINCAR_COLORS.blue}
        />
        <path
          d="M82 143c0-35 19-60 48-60s48 25 48 60v23c0 30-19 49-48 49s-48-19-48-49v-23Z"
          fill="#FFFFFF"
          opacity=".96"
        />
        <circle cx="109" cy="127" r="7" fill={APRINCAR_COLORS.navy} />
        <circle cx="151" cy="127" r="7" fill={APRINCAR_COLORS.navy} />
        <circle cx="111.5" cy="124.5" r="2.1" fill="#FFFFFF" />
        <circle cx="153.5" cy="124.5" r="2.1" fill="#FFFFFF" />
        <path
          d="M112 148c12 12 24 12 36 0"
          fill="none"
          stroke={APRINCAR_COLORS.navy}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M115 167c0-3 3.3-4.8 5.9-3.2l22.2 13.8a3.8 3.8 0 0 1 0 6.4l-22.2 13.8c-2.6 1.6-5.9-.2-5.9-3.2V167Z"
          fill={APRINCAR_COLORS.blue}
        />
        <circle cx="174" cy="48" r="13" fill={APRINCAR_COLORS.sun} />
        <path
          d="m79 53 4.2 7.6 7.6 4.2-7.6 4.2-4.2 7.6-4.2-7.6-7.6-4.2 7.6-4.2 4.2-7.6Z"
          fill={APRINCAR_COLORS.coral}
        />
        <path
          d="M62 155c-19 2-31 11-39 26"
          fill="none"
          stroke={APRINCAR_COLORS.coral}
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M198 155c19 2 31 11 39 26"
          fill="none"
          stroke={APRINCAR_COLORS.leaf}
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M100 232c-6 10-14 17-25 21"
          fill="none"
          stroke={APRINCAR_COLORS.navy}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M160 232c6 10 14 17 25 21"
          fill="none"
          stroke={APRINCAR_COLORS.navy}
          strokeWidth="12"
          strokeLinecap="round"
        />
        {withPencil && (
          <g transform="translate(211 108) rotate(18)">
            <rect x="0" y="0" width="13" height="76" rx="6.5" fill={APRINCAR_COLORS.sun} />
            <rect x="0" y="0" width="13" height="17" rx="6.5" fill={APRINCAR_COLORS.coral} />
            <path d="M0 76h13L6.5 89Z" fill="#E7B887" />
            <path d="m4 84 2.5 5 2.5-5Z" fill={APRINCAR_COLORS.navy} />
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
