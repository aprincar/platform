import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SKILLS, getSkill } from '../skill-graph/src/index.ts';

test('ships a unique, internally consistent 48-skill starter graph', () => {
  assert.equal(SKILLS.length, 48);
  assert.equal(new Set(SKILLS.map((skill) => skill.id)).size, SKILLS.length);
  for (const skill of SKILLS)
    for (const prerequisite of skill.prerequisites)
      assert.ok(getSkill(prerequisite), `${skill.id} references missing ${prerequisite}`);
});


test('official game ages stay within the declared skill age envelope', () => {
  const registry = JSON.parse(
    fs.readFileSync(new URL('../../apps/app/public/registry.json', import.meta.url), 'utf8'),
  );

  for (const entry of registry) {
    if (entry.trust !== 'official') continue;

    const skillIds = [...(entry.skills ?? []), ...(entry.secondarySkills ?? [])];
    assert.ok(skillIds.length > 0, `${entry.id} has no learning skills`);

    const definitions = skillIds.map((id: string) => {
      const skill = getSkill(id);
      assert.ok(skill, `${entry.id} references unknown skill ${id}`);
      assert.ok(skill.ageGuidance, `${id} has no age guidance`);
      return skill;
    });

    const envelopeMin = Math.min(...definitions.map((skill) => skill.ageGuidance!.min));
    const envelopeMax = Math.max(...definitions.map((skill) => skill.ageGuidance!.max));
    assert.ok(entry.ageGuidance, `${entry.id} has no game age guidance`);
    assert.ok(
      entry.ageGuidance.min >= envelopeMin,
      `${entry.id} starts below its declared skill envelope (${envelopeMin})`,
    );
    assert.ok(
      entry.ageGuidance.max <= envelopeMax,
      `${entry.id} extends beyond its declared skill envelope (${envelopeMax})`,
    );
  }
});
