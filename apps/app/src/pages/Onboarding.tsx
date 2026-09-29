import { Button, NumberInput, Text, TextInput } from '@mantine/core';
import { ArrowLeft, ArrowRight, Check, Palette, Puzzle, Sparkles, Type, WholeWord } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AprincarMascot, Brand, AvatarPicker, AgePicker, InterestPicker } from '@aprincar/ui';
import { useAppStore } from '../app-store';

export const ONBOARDING_STEPS = ['Perfil', 'Idade', 'Habilidades', 'Interesses', 'Tempo'] as const;
const focusOptions = [
  ['letters', Type, 'Letras e Sons'],
  ['math', WholeWord, 'Contagem e Números'],
  ['logic', Puzzle, 'Lógica e Padrões'],
  ['motor', Sparkles, 'Coordenação e Traçado'],
  ['creative', Palette, 'Criatividade e Cores'],
] as const;
const timeOptions = [15, 30, 45, 0] as const;
const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export function Onboarding() {
  const store = useAppStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | string>(5);
  const [avatar, setAvatar] = useState('⭐');
  const [focusSkills, setFocusSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>(['animals']);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(30);
  const canContinue = useMemo(
    () => (step === 0 ? name.trim().length > 0 : step === 1 ? Number(age) >= 2 && Number(age) <= 14 : true),
    [step, name, age],
  );

  const finish = async () =>
    store.createProfile({
      name: name.trim() || 'Criança Aprincar',
      age: Number(age),
      avatar,
      focusSkills,
      interests,
      dailyGoalMinutes,
    });

  return (
    <div className="onboarding-shell approved-onboarding-shell">
      <div className="onboarding-card approved-onboarding-card">
        <aside className="onboarding-visual approved-onboarding-visual">
          <Brand compact />
          <AprincarMascot size={310} className="onboarding-mascot" />
          <div className="onboarding-visual-copy">
            <strong>Descobrir é uma grande aventura!</strong>
            <span>Um espaço seguro para brincar e aprender.</span>
          </div>
        </aside>
        <main className="onboarding-form">
          <div className="onboarding-mobile-brand">
            <Brand compact />
          </div>
          <div className="onboarding-progress">
            {ONBOARDING_STEPS.map((label, index) => (
              <div key={label} className={`onboarding-progress-item ${index <= step ? 'active' : ''}`}>
                <span className="onboarding-step">{index < step ? <Check size={12} /> : index + 1}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>

          {step === 0 && (
            <section className="onboarding-step-panel">
              <span className="approved-kicker">Boas-vindas</span>
              <h1>Quem vai brincar?</h1>
              <p>Crie um perfil local para personalizar as sugestões.</p>
              <TextInput
                label="Nome ou apelido"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                size="lg"
                radius="lg"
                autoFocus
              />
              <Text fw={700} mt="lg" mb={8}>
                Escolha um avatar
              </Text>
              <AvatarPicker value={avatar} onChange={setAvatar} />
            </section>
          )}
          {step === 1 && (
            <section className="onboarding-step-panel">
              <span className="approved-kicker">Idade</span>
              <h1>Quantos anos?</h1>
              <p>A idade ajuda a sugerir jogos confortáveis.</p>
              <NumberInput
                label="Idade aproximada"
                min={2}
                max={14}
                value={age}
                onChange={setAge}
                size="lg"
                radius="lg"
              />
              <AgePicker value={Number(age)} onChange={setAge} />
            </section>
          )}
          {step === 2 && (
            <section className="onboarding-step-panel">
              <span className="approved-kicker">Habilidades</span>
              <h1>O que gosta de explorar?</h1>
              <p>Isso não é uma prova. Escolha quantas opções quiser.</p>
              <div className="onboarding-choice-grid">
                {focusOptions.map(([id, Icon, label]) => (
                  <button
                    key={id}
                    type="button"
                    className={`onboarding-choice ${focusSkills.includes(id) ? 'selected' : ''}`}
                    onClick={() => setFocusSkills(toggle(focusSkills, id))}
                  >
                    <Icon size={26} />
                    <strong>{label}</strong>
                  </button>
                ))}
              </div>
            </section>
          )}
          {step === 3 && (
            <section className="onboarding-step-panel">
              <span className="approved-kicker">Interesses</span>
              <h1>O que desperta curiosidade?</h1>
              <p>Os temas ajudam a variar as recomendações.</p>
              <InterestPicker selected={interests} onToggle={(id) => setInterests(toggle(interests, id))} />
            </section>
          )}
          {step === 4 && (
            <section className="onboarding-step-panel">
              <span className="approved-kicker">Tempo</span>
              <h1>Tempo para brincar</h1>
              <p>O responsável pode alterar essa preferência depois.</p>
              <div className="time-choice-grid">
                {timeOptions.map((minutes) => (
                  <button
                    key={minutes}
                    type="button"
                    className={`time-choice ${dailyGoalMinutes === minutes ? 'selected' : ''}`}
                    onClick={() => setDailyGoalMinutes(minutes)}
                  >
                    <strong>{minutes === 0 ? 'Livre' : `${minutes} min`}</strong>
                    <span>{minutes === 0 ? 'sem limite' : 'por dia'}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="onboarding-actions">
            <Button
              variant="subtle"
              color="gray"
              disabled={step === 0}
              onClick={() => setStep((v) => Math.max(0, v - 1))}
              leftSection={<ArrowLeft size={17} />}
            >
              Voltar
            </Button>
            {step < ONBOARDING_STEPS.length - 1 ? (
              <Button
                className="approved-primary-cta"
                disabled={!canContinue}
                onClick={() => setStep((v) => v + 1)}
                rightSection={<ArrowRight size={17} />}
              >
                Continuar
              </Button>
            ) : (
              <Button className="approved-primary-cta" onClick={finish} rightSection={<Sparkles size={17} />}>
                Criar meu espaço
              </Button>
            )}
          </div>
          <Text size="xs" c="dimmed" ta="center" mt="lg">
            Perfis e progresso ficam neste dispositivo.
          </Text>
        </main>
      </div>
    </div>
  );
}
