import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui = fs.readFileSync(new URL('../ui/src/index.tsx', import.meta.url), 'utf8');
const brandRoot = new URL('../../apps/app/public/brand/', import.meta.url);
const styles = fs.readFileSync(new URL('../../apps/app/src/styles.css', import.meta.url), 'utf8');
const guidelines = fs.readFileSync(new URL('../../docs/design/BRAND_GUIDELINES.md', import.meta.url), 'utf8');

const approvedAssets = [
  'mascot-approved.webp',
  'mascot-approved.png',
  'logo-horizontal-approved.png',
  'logo-wordmark-approved.png',
  'logo-symbol-approved.png',
  'logo-horizontal-approved-dark.png',
  'app-icon-approved.png',
];

test('approved Aprincar identity uses only canonical board-derived runtime assets', () => {
  assert.match(ui, /data-aprincar-brand=["']approved-v3["']/);
  assert.match(ui, /logo-symbol-approved\.png/);
  assert.match(ui, /logo-wordmark-approved\.png/);
  assert.match(ui, /logo-horizontal-approved\.png/);
  assert.match(ui, /mascot-approved\.webp/);
  assert.doesNotMatch(ui, /logo-horizontal\.svg/);
  assert.doesNotMatch(ui, /logo-symbol\.svg/);
  for (const name of approvedAssets) {
    const stat = fs.statSync(new URL(name, brandRoot));
    assert.ok(stat.size > 1000, `${name}: canonical asset is unexpectedly small`);
  }
  assert.doesNotMatch(styles, /mix-blend-mode:\s*multiply/i);
  assert.doesNotMatch(styles, /mask-image:\s*linear-gradient/i);
  assert.match(guidelines, /Brincar hoje\. Descobrir sempre\./i);
});
