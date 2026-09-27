import {
  Avatar,
  Button,
  Menu,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  BarChart3,
  Check,
  Gamepad2,
  Globe2,
  Home,
  Search,
  Settings,
  ShieldCheck,
  UserPlus,
  UserRound,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { Link, Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { Brand } from '@aprincar/ui';
import { useEffect, useState } from 'react';
import { useAppStore } from './app-store';
import { Onboarding } from './pages/Onboarding';

const childItems = [
  ['/', 'Início', Home],
  ['/discover', 'Jogos', Gamepad2],
  ['/worlds', 'Mundos', Globe2],
  ['/progress', 'Progresso', BarChart3],
  ['/profile', 'Perfil', UserRound],
] as const;

export function RootLayout() {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure();
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState<number | string>(5);
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine));
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { profile, profiles, selectProfile, createProfile, initialized } = useAppStore();
  const playing = path.startsWith('/play/');

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  const handleCreateProfile = async () => {
    if (!newName.trim()) return;
    await createProfile({ name: newName.trim(), age: Number(newAge), avatar: '⭐' });
    setNewName('');
    closeModal();
  };

  if (!initialized) return null;
  if (!profile && path !== '/onboarding') return <Onboarding />;
  if (playing) return <div className="game-route-shell"><Outlet /></div>;

  const profileMenu = (mobile = false) => (
    <Menu shadow="md" width={250} position="bottom-end" radius="lg">
      <Menu.Target>
        <UnstyledButton
          aria-label={mobile ? 'Abrir perfil e controles' : 'Menu de perfis'}
          className={`profile-button ${mobile ? 'profile-button-mobile' : ''}`}
        >
          <div className="profile-avatar">{profile?.avatar ?? '⭐'}</div>
          {!mobile && (
            <div className="profile-copy">
              <Text size="sm" fw={800} lh={1.1}>{profile?.name ?? 'Perfil'}</Text>
              <Text size="xs" c="dimmed" mt={3} className="profile-network">
                {online ? <Wifi size={11} /> : <WifiOff size={11} />} {online ? 'Online' : 'Offline'}
              </Text>
            </div>
          )}
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Perfis infantis</Menu.Label>
        {profiles.map((p) => (
          <Menu.Item
            key={p.id}
            onClick={() => selectProfile(p.id)}
            leftSection={<Avatar size="sm" color="yellow">{p.avatar}</Avatar>}
            rightSection={p.id === profile?.id ? <Check size={14} /> : null}
          >
            {p.name}
          </Menu.Item>
        ))}
        <Menu.Item leftSection={<UserPlus size={14} />} onClick={openModal}>Adicionar perfil</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<ShieldCheck size={15} />} onClick={() => navigate({ to: '/parent' })}>
          Área do responsável
        </Menu.Item>
        <Menu.Item leftSection={<Settings size={15} />} onClick={() => navigate({ to: '/settings' })}>
          Configurações
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <div className="app-bg approved-app">
      <header className="aprincar-topbar desktop-topbar approved-topbar">
        <div className="aprincar-topbar-inner">
          <Link to="/" className="brand-link" aria-label="Aprincar - Início"><Brand compact /></Link>
          <nav className="aprincar-nav" aria-label="Navegação principal">
            {childItems.map(([to, label, Icon]) => {
              const active = to === '/' ? path === '/' : path.startsWith(to);
              return (
                <Link key={to} to={to} className={`aprincar-nav-link ${active ? 'active' : ''}`}>
                  <Icon size={18} /><span>{label}</span>
                </Link>
              );
            })}
          </nav>
          <Link to="/discover" className="approved-search-link" aria-label="Buscar jogos"><Search size={19} /></Link>
          {profileMenu(false)}
        </div>
      </header>

      <header className="mobile-topbar approved-mobile-topbar">
        <Link to="/" className="brand-link" aria-label="Aprincar - Início"><Brand compact /></Link>
        <div className="approved-mobile-actions">
          <Link to="/discover" className="approved-icon-button" aria-label="Buscar jogos"><Search size={20} /></Link>
          {profileMenu(true)}
        </div>
      </header>

      <main className="aprincar-shell approved-shell"><Outlet /></main>

      <nav className="mobile-bottom-nav approved-bottom-nav" aria-label="Navegação infantil">
        {childItems.map(([to, label, Icon]) => {
          const active = to === '/' ? path === '/' : path.startsWith(to);
          return (
            <Link key={to} to={to} className={`mobile-nav-link ${active ? 'active' : ''}`}>
              <Icon size={21} strokeWidth={2.2} /><span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <Modal opened={modalOpened} onClose={closeModal} title="Criar novo perfil infantil" centered radius="xl">
        <Stack>
          <TextInput label="Nome ou apelido" placeholder="Ex: Lucas" value={newName}
            onChange={(e) => setNewName(e.currentTarget.value)} required autoFocus />
          <NumberInput label="Idade aproximada" min={2} max={14} value={newAge} onChange={setNewAge} />
          <Button className="ap-primary" fullWidth onClick={handleCreateProfile} disabled={!newName.trim()}>
            Criar perfil
          </Button>
        </Stack>
      </Modal>
    </div>
  );
}
