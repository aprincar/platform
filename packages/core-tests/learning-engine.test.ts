import test from 'node:test';
import assert from 'node:assert/strict';
import { recommendNextExperience } from '../learning-engine/src/index.ts';
import type { RegistryEntry } from '../extension-contracts/src/types.ts';

const entry = (id: string, skill: string): RegistryEntry => ({
  id,
  version: '1.0.0',
  publisher: 'Aprincar',
  trust: 'official',
  name: { 'pt-BR': id },
  skills: [skill],
  manifestUrl: '/manifest.json',
  entryUrl: '/game.html',
  integrity: 'a'.repeat(64),
});
const math = entry('math-game', 'math.counting.1-10');
const letters = entry('letters-game', 'literacy.letter.recognition');
const registry = [math, letters];

test('onboarding focus domains affect deterministic recommendations', () => {
  const profile = { id: 'p', name: 'Teste', focusSkills: ['math'] };
  assert.equal(recommendNextExperience({ registry, profile }).recommended?.id, math.id);
  assert.equal(recommendNextExperience({ registry: [...registry].reverse(), profile }).recommended?.id, math.id);
});

test('offline recommendations never select unavailable games', () => {
  assert.equal(recommendNextExperience({ registry, isOffline: true }).recommended, null);
  const result = recommendNextExperience({ registry, isOffline: true, offlineReadyIds: new Set([letters.id]) });
  assert.equal(result.recommended?.id, letters.id);
  assert.equal(result.ranked.length, 1);
});

test('immediate repetition is disfavored, and ties are stable', () => {
  assert.equal(recommendNextExperience({ registry, recentGameIds: [math.id] }).recommended?.id, letters.id);
  assert.equal(recommendNextExperience({ registry }).recommended?.id, recommendNextExperience({ registry: [...registry].reverse() }).recommended?.id);
});
