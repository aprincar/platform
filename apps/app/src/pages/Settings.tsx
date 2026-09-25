import { Button, Group, PasswordInput, Select, Stack, Switch, Text } from '@mantine/core';
import { db } from '@aprincar/storage';
import { useEffect, useState } from 'react';
import { Download, LockKeyhole, Palette, ShieldCheck, Smartphone } from 'lucide-react';
import { useAppStore } from '../app-store';
import { normalizeThemePreference } from '../theme';

export function Settings() {
  const {
    allowCommunity,
    setAllowCommunity,
    themePreference,
    setThemePreference,
  } = useAppStore();
  const [pin, setPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    db.settings.get('parentPin').then((r) => {
      if (r?.value) setPin(String(r.value));
    });

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="aprincar-page">
      <section className="section-head">
        <div>
          <div className="child-eyebrow">Preferências da Plataforma</div>
          <h2 style={{ fontSize: 36 }}>Configurações</h2>
          <p>Personalize aparência, acessibilidade e mantenha a proteção do ambiente infantil.</p>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
        <section className="parent-card">
          <div className="aprincar-principle-icon">
            <Palette size={20} />
          </div>
          <h3>Aparência e acessibilidade</h3>
          <Select
            label="Tema visual"
            value={themePreference}
            onChange={(value) => void setThemePreference(normalizeThemePreference(value))}
            data={[
              { value: 'system', label: 'Automático (seguir o aparelho)' },
              { value: 'light', label: 'Claro' },
              { value: 'dark', label: 'Escuro' },
              { value: 'contrast', label: 'Alto contraste' },
            ]}
            radius="md"
            allowDeselect={false}
          />
          <Text size="sm" c="dimmed" mt="sm">
            Automático acompanha a preferência claro/escuro do sistema. Alto contraste permanece explícito.
          </Text>
        </section>

        <section className="parent-card">
          <div className="aprincar-principle-icon">
            <Smartphone size={20} />
          </div>
          <h3>Aplicativo no Celular / PWA</h3>
          <Text size="sm" c="dimmed" mb="md">
            {installed
              ? 'O Aprincar já está instalado como aplicativo neste aparelho.'
              : 'Instale o Aprincar para abrir rápido e usar offline com facilidade.'}
          </Text>
          {deferredPrompt && !installed && (
            <Button className="ap-primary" onClick={handleInstallApp}>
              Instalar Aprincar no Aparelho
            </Button>
          )}
        </section>

        <section className="parent-card">
          <div className="aprincar-principle-icon">
            <ShieldCheck size={20} />
          </div>
          <h3>Extensões da Comunidade</h3>
          <Switch
            checked={allowCommunity}
            onChange={(e) => setAllowCommunity(e.currentTarget.checked)}
            label="Mostrar jogos Community no modo infantil"
            aria-label="Mostrar jogos Community no modo infantil"
            description="Jogos Oficiais e Curados aparecem por padrão."
          />
        </section>

        <section className="parent-card">
          <div className="aprincar-principle-icon">
            <LockKeyhole size={20} />
          </div>
          <h3>PIN do Responsável</h3>
          <Stack gap="xs">
            <PasswordInput
              placeholder="Definir PIN (ex: 1234)"
              value={pin}
              onChange={(e) => setPin(e.currentTarget.value)}
              maxLength={8}
            />
            <Group>
              <Button
                className="ap-primary"
                onClick={async () => {
                  if (pin.trim()) {
                    await db.settings.put({ key: 'parentPin', value: pin.trim() });
                    setPinSaved(true);
                    setTimeout(() => setPinSaved(false), 2000);
                  }
                }}
              >
                {pinSaved ? 'Salvo!' : 'Salvar PIN'}
              </Button>
              {pin && (
                <Button
                  variant="subtle"
                  color="red"
                  onClick={async () => {
                    await db.settings.delete('parentPin');
                    setPin('');
                  }}
                >
                  Remover
                </Button>
              )}
            </Group>
          </Stack>
        </section>

        <section className="parent-card">
          <div className="aprincar-principle-icon">
            <Download size={20} />
          </div>
          <h3>Dados Locais & Backup</h3>
          <Text size="sm" c="dimmed" mb="md">
            Faça download do arquivo de backup contendo todos os perfis, evidências e progresso.
          </Text>
          <Button
            className="ap-secondary"
            leftSection={<Download size={16} />}
            onClick={async () => {
              const data = {
                profiles: await db.profiles.toArray(),
                library: await db.library.toArray(),
                evidence: await db.evidence.toArray(),
                skillStates: await db.skillStates.toArray(),
                rewards: await db.rewards.toArray(),
                gameState: await db.gameState.toArray(),
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = `aprincar-backup-${new Date().toISOString().slice(0, 10)}.json`;
              a.click();
              URL.revokeObjectURL(a.href);
            }}
          >
            Exportar Backup JSON
          </Button>
        </section>
      </div>
    </div>
  );
}
