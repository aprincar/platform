import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (relative: string) => fs.readFileSync(new URL(relative, import.meta.url), 'utf8');

test('Aprincar child experience is mobile-first and follows the v4 visual hierarchy', () => {
  const ui = read('../ui/src/index.tsx');
  const layout = read('../../apps/app/src/layout.tsx');
  const home = read('../../apps/app/src/pages/Home.tsx');
  const onboarding = read('../../apps/app/src/pages/Onboarding.tsx');
  const play = read('../../apps/app/src/pages/Play.tsx');
  const styles = read('../../apps/app/src/styles.css');

  assert.match(ui, /function BrandMark/);
  assert.match(ui, /AprincarMascot/);
  assert.doesNotMatch(layout, /\bAppShell\b/);
  assert.match(layout, /mobile-bottom-nav/);
  assert.match(layout, /mobile-topbar/);
  assert.match(layout, /path\.startsWith\(['"]\/play\//);
  assert.match(home, /child-hero/);
  assert.match(home, /game-shelf/);
  assert.match(home, /Começar a brincar/);
  assert.match(onboarding, /ONBOARDING_STEPS/);
  assert.match(onboarding, /Interesses/);
  assert.match(onboarding, /Tempo/);
  assert.match(play, /game-runtime/);

  assert.match(styles, /--ap-bg:\s*#F7F7FB/i);
  assert.match(styles, /safe-area-inset-bottom/);
  assert.match(styles, /100dvh/);
  assert.match(styles, /100svh/);
  assert.match(styles, /scroll-snap-type:\s*x mandatory/);
  assert.match(styles, /min-height:\s*48px/);
  assert.match(styles, /@media\s*\(max-width:\s*767px\)/);
  assert.match(styles, /@media\s*\(max-width:\s*359px\)/);

  const landscapeRules = styles.slice(styles.indexOf('@media (orientation: landscape)'));
  assert.doesNotMatch(landscapeRules, /\.mobile-topbar[\s\S]*display:\s*none/);
  assert.doesNotMatch(landscapeRules, /\.mobile-bottom-nav[\s\S]*display:\s*none/);
});

test('profile model can persist onboarding preferences without requiring cloud identity', () => {
  const storage = read('../storage/src/index.ts');
  const store = read('../../apps/app/src/app-store.tsx');
  assert.match(storage, /interests\?:\s*string\[\]/);
  assert.match(storage, /focusSkills\?:\s*string\[\]/);
  assert.match(storage, /dailyGoalMinutes\?:\s*number/);
  assert.match(store, /CreateProfileInput/);
  assert.match(store, /dailyGoalMinutes/);
});

test('design system exposes accessible light, dark, automatic and contrast themes', () => {
  const theme = read('../../apps/app/src/theme.ts');
  const settings = read('../../apps/app/src/pages/Settings.tsx');
  const styles = read('../../apps/app/src/styles.css');

  assert.match(theme, /AprincarThemePreference = 'system' \| 'light' \| 'dark' \| 'contrast'/);
  assert.match(theme, /prefers-color-scheme: dark/);
  assert.match(theme, /observeThemePreference/);
  assert.match(settings, /Automático \(seguir o aparelho\)/);
  assert.match(settings, /Alto contraste/);
  assert.match(styles, /data-aprincar-theme='dark'/);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /--ap-touch-target:\s*44px/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /color-scheme:\s*dark/);
});

test('game discovery exposes educational purpose without changing stable routes', () => {
  const layout = read('../../apps/app/src/layout.tsx');
  const families = read('../../apps/app/src/game-families.ts');
  const card = read('../../apps/app/src/components/GameCard.tsx');

  assert.match(layout, /\['\/discover', 'Jogos', Compass\]/);
  assert.match(families, /GAME_PURPOSES/);
  assert.match(families, /Contagem 1–10/);
  assert.match(families, /Reconhecimento de letras/);
  assert.match(families, /Raciocínio espacial/);
  assert.match(card, /game-purpose-label/);
  assert.match(card, /Pratica/);
  assert.match(card, /purposeForGame/);
});
