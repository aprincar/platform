import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui = fs.readFileSync(new URL('../ui/src/index.tsx', import.meta.url), 'utf8');
const brandRoot = new URL('../../apps/app/public/brand/', import.meta.url);
const styles = fs.readFileSync(new URL('../../apps/app/src/styles.css', import.meta.url), 'utf8');
const guidelines = fs.readFileSync(new URL('../../docs/design/BRAND_GUIDELINES.md', import.meta.url), 'utf8');

const approvedAssets = [
  'mascot-approved-v5.webp',
  'mascot-approved-v4.png',
  'logo-horizontal-approved-v5.svg',
  'logo-symbol-approved-v5.svg',
  'logo-horizontal-approved-dark-v5.svg',
  'app-icon-approved.png',
];

test('approved Aprincar identity uses only canonical board-derived runtime assets', () => {
  assert.match(ui, /data-aprincar-brand=["']approved-v5["']/);
  assert.match(ui, /logo-symbol-approved-v5\.svg/);
  assert.match(ui, /logo-horizontal-approved-v5\.svg/);
  assert.match(ui, /logo-horizontal-approved-dark-v5\.svg/);
  assert.match(ui, /mascot-approved-v5\.webp/);
  assert.doesNotMatch(ui, /brand\/logo-horizontal\.svg/);
  assert.doesNotMatch(ui, /brand\/logo-symbol\.svg/);
  for (const name of approvedAssets) {
    const stat = fs.statSync(new URL(name, brandRoot));
    assert.ok(stat.size > 1000, `${name}: canonical asset is unexpectedly small`);
  }
  assert.doesNotMatch(styles, /mix-blend-mode:\s*multiply/i);
  assert.doesNotMatch(styles, /mask-image:\s*linear-gradient/i);
  assert.match(guidelines, /Brincar hoje\. Descobrir sempre\./i);
});


test('board logo preserves white surround and approved tagline', () => {
  const logo = fs.readFileSync(new URL('logo-horizontal-approved-v5.svg', brandRoot), 'utf8');
  const symbol = fs.readFileSync(new URL('logo-symbol-approved-v5.svg', brandRoot), 'utf8');
  assert.match(logo, /BRINCAR HOJE\. DESCOBRIR SEMPRE\./);
  assert.match(logo, /fill="#FFFFFF"/);
  assert.match(symbol, /fill="#FFFFFF"/);
  assert.match(logo, /data-brand-version="approved-v5"/);
});
