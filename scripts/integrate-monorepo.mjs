import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const write = (file, text) => fs.writeFileSync(file, text);
const readJson = (file) => JSON.parse(read(file));
const writeJson = (file, value) => write(file, JSON.stringify(value, null, 2) + '\n');
const root = readJson('package.json');
const paths = ['games/official', 'games/community', 'content/curriculum-bncc', 'templates/vite', 'templates/react', 'templates/phaser', 'templates/threejs'];
root.workspaces = ['apps/*', 'packages/*', 'games/*', 'content/*', 'templates/*'];
root.scripts['build:games'] = 'npm run build -w aprincar-games-official && npm run registry -w aprincar-games-official && npm run sync:official';
root.scripts.build = 'npm run build:games && npm run build -w @aprincar/app && npm run build -w @aprincar/hub';
root.scripts['check:content'] = paths.map((p) => 'npm run check -w ' + p).join(' && ');
root.scripts['check:production'] = 'npm run check && npm run check:content && npm run verify:official && npm run test:e2e';
root.scripts['check:snapshot'] = 'npm run build:games && git diff --exit-code -- apps/app/public/registry.json apps/app/public/extensions apps/hub/public/registry.json apps/hub/public/extensions';
writeJson('package.json', root);

for (const dir of paths) {
  const file = dir + '/package.json';
  const pkg = readJson(file);
  // One root hook manager; no workspace may replace it.
  delete pkg.scripts.prepare;
  writeJson(file, pkg);
  fs.rmSync(dir + '/package-lock.json', { force: true });
}

const syncPath = 'scripts/sync-official-snapshot.mjs';
write(syncPath, read(syncPath).replace("path.join(root, '.canonical-games', 'dist')", "path.join(root, 'games', 'official', 'dist')"));
const verifyPath = 'scripts/verify-official-snapshot.mjs';
write(verifyPath, read(verifyPath).replace(': null;', ": (fs.existsSync(path.join(root, 'games', 'official', 'dist', 'registry.json'))\n      ? path.join(root, 'games', 'official', 'dist')\n      : null);"));

const pin = readJson('canonical-games.json');
pin.path = 'games/official';
pin.role = 'migration-provenance';
writeJson('canonical-games.json', pin);

// Imported repositories have their own checks and formatting conventions.
// Keep the existing Platform lint/format scope until source normalization is planned.
const eslintPath = 'eslint.config.js';
write(eslintPath, read(eslintPath).replace("'**/coverage/**'", "'**/coverage/**', 'games/**', 'content/**', 'templates/**'"));
const prettierPath = '.prettierignore';
write(prettierPath, read(prettierPath) + '\n# Imported modules retain their native validation during migration.\ngames/\ncontent/\ntemplates/\n');

const ciPath = '.github/workflows/ci.yml';
let ci = read(ciPath);
ci = ci.slice(0, ci.indexOf('  canonical-games:')) + `  canonical-games:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - name: Validate imported workspaces
        run: npm run check:content
      - name: Require canonical game snapshot parity
        run: npm run check:snapshot
      - name: Verify canonical snapshot integrity
        run: npm run verify:official
`;
write(ciPath, ci);

const artifactsPath = '.github/workflows/build-artifacts.yml';
let artifacts = read(artifactsPath);
const begin = artifacts.indexOf('      - name: Read canonical games pin');
const end = artifacts.indexOf('      - uses: actions/setup-node@v4');
if (begin < 0 || end < 0) throw new Error('Unexpected artifact workflow');
artifacts = artifacts.slice(0, begin) + artifacts.slice(end);
artifacts = artifacts.replace('      - run: npm ci\n', '      - run: npm ci\n      - run: npm run check:snapshot\n');
artifacts = artifacts.replace('        env:\n          APRINCAR_CANONICAL_GAMES_DIR: .canonical-games/dist\n', '');
write(artifactsPath, artifacts);

const readmePath = 'README.md';
const readme = read(readmePath);
write(readmePath, readme.replace('## O que existe neste repositório', `## Desenvolvimento em monorepo

Um único clone e um único lockfile. As fontes oficiais estão em \`games/official\`, jogos comunitários em \`games/community\`, currículo em \`content/curriculum-bncc\` e exemplos em \`templates/\`.

\`\`\`sh
npm ci
npm run dev
npm run build
npm run check:content
npm run check:production
\`\`\`

O build regenera o catálogo oficial localmente. O sandbox, SDK e manifest permanecem independentes do React. Veja [o plano de migração](docs/MONOREPO_MIGRATION.md).

## O que existe neste repositório`));

console.log('Integrated seven imported workspaces; regenerate root lockfile on Node 22/npm 10.');
