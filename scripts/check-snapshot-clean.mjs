import { execFileSync } from 'node:child_process';

const paths = [
  'games/official/games',
  'apps/app/public/registry.json',
  'apps/app/public/extensions',
  'apps/hub/public/registry.json',
  'apps/hub/public/extensions',
];
const changes = execFileSync('git', ['status', '--porcelain', '--untracked-files=all', '--', ...paths], {
  encoding: 'utf8',
});
if (changes.trim()) {
  console.error('Generated game snapshots differ from the committed tree:\n' + changes);
  process.exitCode = 1;
} else {
  console.log('Generated game snapshots match the committed tree.');
}
