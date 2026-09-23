import test from 'node:test';
import assert from 'node:assert/strict';
import type { RegistryEntry, TrustLevel } from '../extension-contracts/src/types.ts';
import { mergeRegistries, visibleForChild } from '../extension-registry/src/index.ts';

function entry(trust: TrustLevel, publisher = trust): RegistryEntry {
  return {
    id: 'aprincar.same-game',
    version: '1.0.0',
    trust,
    publisher,
    name: { 'pt-BR': 'Mesmo jogo' },
    skills: [],
    manifestUrl: `/${publisher}/manifest.json`,
    entryUrl: `/${publisher}/game.html`,
    integrity: `sha256-${publisher}`,
  };
}

test('official registry entry wins regardless of source order', () => {
  const official = entry('official', 'aprincar');
  const community = entry('community', 'community-author');

  assert.equal(mergeRegistries([official], [community])[0]?.publisher, 'aprincar');
  assert.equal(mergeRegistries([community], [official])[0]?.publisher, 'aprincar');
});

test('higher trust wins deterministically for the same id and version', () => {
  const merged = mergeRegistries([entry('experimental')], [entry('community')], [entry('curated')]);
  assert.equal(merged[0]?.trust, 'curated');
});

test('experimental entries never appear in child registry', () => {
  const entries = [entry('official'), entry('curated'), entry('community'), entry('experimental')];
  assert.deepEqual(
    visibleForChild(entries, true).map((item) => item.trust),
    ['official', 'curated', 'community'],
  );
});
