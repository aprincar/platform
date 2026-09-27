import { Button, Group, PasswordInput, Select, Switch, Text } from '@mantine/core';
import { db } from '@aprincar/storage';
import { useEffect, useState } from 'react';
import { Contrast, Download, LockKeyhole, Moon, ShieldCheck, Smartphone, Sun } from 'lucide-react';
import { useAppStore } from '../app-store';
import { normalizeThemePreference } from '../theme';

const themeCards = [
  { value: 'light', label: 'Claro', Icon: Sun },
  { value: 'dark', label: 'Escuro', Icon: Moon },
  { value: 'system', label: 'Automático', Icon: Smartphone },
  { value: 'contrast', label: 'Alto contraste', Icon: Contrast },
] as const;

export function Settings() {
  const { allowCommunity, setAllowCommunity, themePreference, setThemePreference } = useAppStore();
  const [pin, setPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  useEffect(() => { db.settings.get('parentPin').then((r) => r?.value && setPin(String(r.value))); }, []);

  return (
    <div className="aprincar-page approved-settings-page">
      <section className="approved-catalog-header">
        <span className="approved-kicker">Preferências</span>
        <h1>Configurações</h1>
        <p>Personalize o Aprincar sem alterar a experiência pedagógica.</p>
      </section>

      <section className="approved-settings-card">
        <div className="approved-settings-title"><Sun size={22}/><div><strong>Tema da interface</strong><span>Claro é o padrão visual aprovado.</span></div></div>
        <div className="approved-theme-grid">
          {themeCards.map(({ value, label, Icon }) => (
            <button key={value} className={themePreference === value ? 'active' : ''} onClick={() => void setThemePreference(value)}>
              <Icon size={24}/><strong>{label}</strong>
            </button>
          ))}
        </div>
        <Select
          className="sr-only"
          aria-label="Tema visual"
          value={themePreference}
          onChange={(value) => void setThemePreference(normalizeThemePreference(value))}
          data={[
            { value: 'system', label: 'Automático (seguir o aparelho)' },
            { value: 'light', label: 'Claro' },
            { value: 'dark', label: 'Escuro' },
            { value: 'contrast', label: 'Alto contraste' },
          ]}
        />
      </section>

      <section className="approved-settings-grid">
        <div className="approved-settings-card">
          <div className="approved-settings-title"><ShieldCheck size={22}/><div><strong>Conteúdo da comunidade</strong><span>Oficiais e curados continuam prioritários.</span></div></div>
          <Switch checked={allowCommunity} onChange={(e) => setAllowCommunity(e.currentTarget.checked)} label="Mostrar jogos da comunidade" />
        </div>

        <div className="approved-settings-card">
          <div className="approved-settings-title"><LockKeyhole size={22}/><div><strong>PIN do responsável</strong><span>Protege controles e dados pedagógicos.</span></div></div>
          <PasswordInput placeholder="Definir PIN" value={pin} onChange={(e) => setPin(e.currentTarget.value)} maxLength={8} />
          <Group mt="md">
            <Button className="ap-primary" onClick={async()=>{if(pin.trim()){await db.settings.put({key:'parentPin',value:pin.trim()});setPinSaved(true);setTimeout(()=>setPinSaved(false),1800);}}}>
              {pinSaved ? 'Salvo!' : 'Salvar PIN'}
            </Button>
            {pin && <Button variant="subtle" color="red" onClick={async()=>{await db.settings.delete('parentPin');setPin('');}}>Remover</Button>}
          </Group>
        </div>

        <div className="approved-settings-card">
          <div className="approved-settings-title"><Download size={22}/><div><strong>Backup local</strong><span>Exporte perfis, evidências e progresso.</span></div></div>
          <Text size="sm" c="dimmed" mb="md">Seus dados continuam sob seu controle.</Text>
          <Button className="approved-secondary-cta" leftSection={<Download size={16}/>} onClick={async()=>{
            const data={profiles:await db.profiles.toArray(),library:await db.library.toArray(),evidence:await db.evidence.toArray(),skillStates:await db.skillStates.toArray(),rewards:await db.rewards.toArray(),gameState:await db.gameState.toArray()};
            const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`aprincar-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href);
          }}>Exportar backup</Button>
        </div>
      </section>
    </div>
  );
}
