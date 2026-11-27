import { Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { db } from '@aprincar/storage';
import { useEffect, useState, type ReactNode } from 'react';

// Local parental control against accidental access, not an authentication boundary
// against someone who can inspect or modify the device's browser storage.
export function ParentGate({ children }: { children: ReactNode }) {
  const [pin, setPin] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [challenge] = useState(() => ({
    a: 4 + Math.floor(Math.random() * 5),
    b: 3 + Math.floor(Math.random() * 5),
  }));

  useEffect(() => {
    let active = true;
    db.settings
      .get('parentPin')
      .then((record) => {
        if (active) setPin(String(record?.value ?? ''));
      })
      .catch(() => {
        if (active) setError('Não foi possível verificar o acesso. Tente recarregar a página.');
      });
    return () => {
      active = false;
    };
  }, []);

  if (unlocked) return children;
  if (pin === null) return <Text role="status">{error || 'Verificando acesso do responsável…'}</Text>;

  function unlock() {
    const valid = pin
      ? answer.trim() === pin
      : answer.trim() !== '' && Number(answer) === challenge.a + challenge.b;
    if (!valid) {
      setError(pin ? 'PIN incorreto. Tente novamente.' : 'Resposta incorreta. Tente novamente.');
      return;
    }
    setAnswer('');
    setError('');
    setUnlocked(true);
  }

  return (
    <div className="aprincar-page approved-parent-page" style={{ alignItems: 'center', paddingTop: 40 }}>
      <form
        className="parent-card approved-parent-card"
        style={{ maxWidth: 440, width: '100%' }}
        onSubmit={(event) => {
          event.preventDefault();
          unlock();
        }}
      >
        <h2>{pin ? 'Acesso do responsável' : 'Confirmação do adulto'}</h2>
        <Text size="sm" c="dimmed" mb="md">
          {pin ? 'Digite o PIN para acessar os controles.' : 'Responda para evitar acessos acidentais.'}
        </Text>
        {pin ? (
          <PasswordInput
            label="PIN do responsável"
            value={answer}
            onChange={(event) => setAnswer(event.currentTarget.value)}
            error={error}
            autoFocus
          />
        ) : (
          <TextInput
            label={`Quanto é ${challenge.a} + ${challenge.b}?`}
            value={answer}
            onChange={(event) => setAnswer(event.currentTarget.value)}
            error={error}
            autoFocus
          />
        )}
        <Button type="submit" className="ap-primary" fullWidth mt="md">
          Entrar
        </Button>
      </form>
    </div>
  );
}
