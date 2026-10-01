import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const ui = fs.readFileSync(new URL('../ui/src/index.tsx', import.meta.url), 'utf8');
const root = new URL('../../apps/app/public/brand/', import.meta.url);
const assets = [
  'aprincar-mark.svg',
  'aprincar-logo.svg',
  'logo-symbol.svg',
  'logo-horizontal.svg',
  'logo-stacked.svg',
  'app-icon.svg',
  'favicon.svg',
].map((name) => fs.readFileSync(new URL(name, root), 'utf8'));
const guidelines = fs.readFileSync(new URL('../../docs/design/BRAND_GUIDELINES.md', import.meta.url), 'utf8');
test('approved Aprincar identity is consistent across React and static assets', () => {
  assert.match(ui, /data-aprincar-brand=["']approved-v2["']/);
  assert.match(ui, /mascot-approved\.webp/);
  assert.match(ui, /#2563EB/i);
  assert.match(ui, /#FBBF24/i);
  assert.doesNotMatch(ui, /data-aprincar-brand=["']portal-v4["']/);
  for (const asset of assets) {
    assert.match(asset, /data-brand-version=["']approved-v2["']/);
    assert.match(asset, /#2563EB/i);
  }
  assert.match(guidelines, /Brincar hoje\. Descobrir sempre\./i);
});
