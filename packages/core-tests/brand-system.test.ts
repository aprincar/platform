import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui = fs.readFileSync(new URL('../ui/src/index.tsx', import.meta.url), 'utf8');
const brandRoot = new URL('../../apps/app/public/brand/', import.meta.url);
const mark = fs.readFileSync(new URL('aprincar-mark.svg', brandRoot), 'utf8');
const logo = fs.readFileSync(new URL('aprincar-logo.svg', brandRoot), 'utf8');
const symbol = fs.readFileSync(new URL('logo-symbol.svg', brandRoot), 'utf8');
const horizontal = fs.readFileSync(new URL('logo-horizontal.svg', brandRoot), 'utf8');
const stacked = fs.readFileSync(new URL('logo-stacked.svg', brandRoot), 'utf8');
const appIcon = fs.readFileSync(new URL('app-icon.svg', brandRoot), 'utf8');
const favicon = fs.readFileSync(new URL('favicon.svg', brandRoot), 'utf8');
const monochrome = fs.readFileSync(new URL('monochrome.svg', brandRoot), 'utf8');
const guidelines = fs.readFileSync(new URL('../../docs/design/BRAND_GUIDELINES.md', import.meta.url), 'utf8');
const icon192 = fs.readFileSync(new URL('../../apps/app/public/icons/icon-192.svg', import.meta.url), 'utf8');
const icon512 = fs.readFileSync(new URL('../../apps/app/public/icons/icon-512.svg', import.meta.url), 'utf8');

test('Brand System v3 uses the approved star identity and multicolor wordmark everywhere', () => {
  assert.match(ui, /data-aprincar-brand=["']star-v3["']/);
  assert.match(ui, /AprincarMascot/);
  assert.match(ui, /aprincar-wordmark-letter/);
  assert.match(ui, /#FBCB24/i);
  assert.match(ui, /#2563EB/i);
  assert.doesNotMatch(ui, /aprincar-mark-pieces/);

  for (const asset of [mark, logo, symbol, horizontal, stacked, appIcon, favicon, icon192, icon512]) {
    assert.match(asset, /data-brand-version=["']3["']/);
    assert.match(asset, /aprincar-star/i);
    assert.match(asset, /#FBCB24/i);
  }

  for (const asset of [logo, horizontal, stacked]) {
    assert.match(asset, /Aprincar/);
    assert.match(asset, /#2563EB/i);
    assert.match(asset, /#22C55E/i);
    assert.match(asset, /#F43F5E/i);
  }

  assert.match(monochrome, /data-brand-version=["']3["']/);
  assert.match(monochrome, /aprincar-star/i);
  assert.match(monochrome, /#13203D/i);
  assert.doesNotMatch(monochrome, /#FBCB24/i);

  for (const required of [
    'logo-symbol.svg',
    'logo-horizontal.svg',
    'logo-stacked.svg',
    'app-icon.svg',
    'favicon.svg',
    'monochrome.svg',
  ]) {
    assert.match(guidelines, new RegExp(required.replace('.', '\\.')));
  }
});
