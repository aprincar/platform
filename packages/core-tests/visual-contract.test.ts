import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = (relative: string) => fs.readFileSync(new URL(relative, import.meta.url), 'utf8');
test('approved child experience follows the locked mobile-first hierarchy', () => {
  const ui = read('../ui/src/index.tsx'),
    layout = read('../../apps/app/src/layout.tsx'),
    home = read('../../apps/app/src/pages/Home.tsx'),
    play = read('../../apps/app/src/pages/Play.tsx'),
    styles = read('../../apps/app/src/styles.css');
  assert.match(ui, /mascot-approved\.webp/);
  assert.match(ui, /approved-v1/);
  assert.match(layout, /approved-bottom-nav/);
  assert.match(layout, /approved-mobile-topbar/);
  assert.match(layout, /\['\/worlds', 'Mundos', Globe2\]/);
  assert.match(layout, /\['\/progress', 'Progresso', BarChart3\]/);
  assert.match(home, /approved-home-hero/);
  assert.match(home, /Descobrir é uma grande aventura!/);
  assert.match(home, /Explorar jogos/);
  assert.match(home, /mascot-approved\.webp/);
  assert.match(play, /game-runtime/);
  assert.match(styles, /--ap-bg:\s*#f8fbff/i);
  assert.match(styles, /--ap-primary:\s*#2563eb/i);
  assert.match(styles, /--ap-secondary:\s*#0ea5e9/i);
  assert.match(styles, /--ap-sun:\s*#fbbf24/i);
  assert.match(styles, /safe-area-inset-bottom/);
  assert.match(styles, /100svh/);
  assert.match(styles, /@media\s*\(max-width:\s*767px\)/);
});
test('profile model persists onboarding preferences locally', () => {
  const storage = read('../storage/src/index.ts'),
    store = read('../../apps/app/src/app-store.tsx');
  assert.match(storage, /interests\?:\s*string\[\]/);
  assert.match(storage, /focusSkills\?:\s*string\[\]/);
  assert.match(storage, /dailyGoalMinutes\?:\s*number/);
  assert.match(store, /CreateProfileInput/);
});
test('design system exposes light dark automatic and contrast themes', () => {
  const theme = read('../../apps/app/src/theme.ts'),
    settings = read('../../apps/app/src/pages/Settings.tsx'),
    styles = read('../../apps/app/src/styles.css');
  assert.match(theme, /AprincarThemePreference = 'system' \| 'light' \| 'dark' \| 'contrast'/);
  assert.match(theme, /prefers-color-scheme: dark/);
  assert.match(settings, /Automático \(seguir o aparelho\)/);
  assert.match(settings, /Alto contraste/);
  assert.match(styles, /data-aprincar-theme='dark'/);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /--ap-touch-target:\s*44px/);
});
test('game discovery keeps educational metadata in approved cards', () => {
  const layout = read('../../apps/app/src/layout.tsx'),
    families = read('../../apps/app/src/game-families.ts'),
    card = read('../../apps/app/src/components/GameCard.tsx'),
    contracts = read('../extension-contracts/src/types.ts');
  assert.match(layout, /\['\/discover', 'Jogos', Gamepad2\]/);
  assert.doesNotMatch(families, /GAME_PURPOSES/);
  assert.match(contracts, /objective\?:\s*LocalizedText/);
  assert.match(card, /getSkill/);
  assert.match(card, /entry\.objective\?\.\['pt-BR'\]/);
  assert.match(card, /approved-game-card/);
  assert.match(card, /sr-only/);
});
test('approved themes keep semantic surfaces', () => {
  const styles = read('../../apps/app/src/styles.css');
  assert.match(styles, /\.ap-primary\s*\{[\s\S]*var\(--ap-action-bg\)[\s\S]*var\(--ap-action-text\)/);
  assert.match(styles, /data-aprincar-theme='dark'/);
  assert.match(styles, /data-aprincar-theme='contrast'/);
});
