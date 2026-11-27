import { Button, Modal, PasswordInput, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BookOpen, ChevronRight, LockKeyhole, Palette, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { db } from '@aprincar/storage';
import { useAppStore } from '../app-store';

export function More() {
  const navigate = useNavigate();
  const { profile, libraryIds } = useAppStore();
  const [gateOpened, { open: openGate, close: closeGate }] = useDisclosure();
  const [pinRequired, setPinRequired] = useState(false);
  const [configuredPin, setConfiguredPin] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathProblem, setMathProblem] = useState({ q: '4 + 3', a: 7 });
  const [gateError, setGateError] = useState('');

  useEffect(() => {
    db.settings.get('parentPin').then((r) => {
      if (r?.value) {
        setPinRequired(true);
        setConfiguredPin(String(r.value));
      } else {
        setPinRequired(false);
        const n1 = Math.floor(Math.random() * 5) + 3;
        const n2 = Math.floor(Math.random() * 5) + 2;
        setMathProblem({ q: `${n1} + ${n2}`, a: n1 + n2 });
      }
    });
  }, [gateOpened]);

  const handleEnterParent = () => {
    const valid = pinRequired
      ? pinInput.trim() === configuredPin
      : Number(mathAnswer.trim()) === mathProblem.a;
    if (!valid) {
      setGateError(pinRequired ? 'PIN incorreto. Tente novamente.' : 'Resposta incorreta. Tente novamente.');
      return;
    }
    setGateError('');
    closeGate();
    navigate({ to: '/parent' });
  };

  return (
    <div className="aprincar-page approved-profile-page">
      <section className="approved-profile-hero">
        <div className="approved-profile-avatar">
          <UserRound size={34} />
        </div>
        <div>
          <span className="approved-kicker">Seu espaço</span>
          <h1>{profile?.name ?? 'Perfil Aprincar'}</h1>
          <p>
            {profile?.age ? `${profile.age} anos · ` : ''}
            {libraryIds.size} jogos na biblioteca
          </p>
        </div>
      </section>

      <section className="approved-profile-grid">
        <Link to="/library" className="approved-setting-link">
          <div className="approved-setting-icon blue">
            <BookOpen size={22} />
          </div>
          <div>
            <strong>Favoritos e biblioteca</strong>
            <span>Continue suas brincadeiras salvas.</span>
          </div>
          <ChevronRight size={19} />
        </Link>
        <Link to="/missions" className="approved-setting-link">
          <div className="approved-setting-icon yellow">
            <Sparkles size={22} />
          </div>
          <div>
            <strong>Missões em família</strong>
            <span>Atividades para fazer fora da tela.</span>
          </div>
          <ChevronRight size={19} />
        </Link>
        <Link to="/settings" className="approved-setting-link">
          <div className="approved-setting-icon purple">
            <Palette size={22} />
          </div>
          <div>
            <strong>Configurações e acessibilidade</strong>
            <span>Tema, contraste, offline e privacidade.</span>
          </div>
          <ChevronRight size={19} />
        </Link>
        <button type="button" className="approved-setting-link" onClick={openGate}>
          <div className="approved-setting-icon green">
            <ShieldCheck size={22} />
          </div>
          <div>
            <strong>Área do responsável</strong>
            <span>Progresso, evidências e controles.</span>
          </div>
          <LockKeyhole size={18} />
        </button>
      </section>

      <Modal opened={gateOpened} onClose={closeGate} title="Acesso do responsável" centered radius="xl">
        <Text size="sm" c="dimmed" mb="md">
          {pinRequired
            ? 'Digite o PIN configurado.'
            : `Para confirmar que você é um adulto, quanto é ${mathProblem.q}?`}
        </Text>
        {pinRequired ? (
          <PasswordInput
            value={pinInput}
            onChange={(e) => setPinInput(e.currentTarget.value)}
            error={gateError}
            autoFocus
          />
        ) : (
          <TextInput
            value={mathAnswer}
            onChange={(e) => setMathAnswer(e.currentTarget.value)}
            error={gateError}
            autoFocus
          />
        )}
        <Button className="ap-primary" fullWidth mt="lg" onClick={handleEnterParent}>
          Entrar
        </Button>
      </Modal>
    </div>
  );
}
