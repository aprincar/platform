import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const canonicalRoot = path.resolve(
  process.env.APRINCAR_CANONICAL_GAMES_DIR ?? path.join(root, '.canonical-games', 'dist'),
);
const registrySource = path.join(canonicalRoot, 'registry.json');
const extensionsSource = path.join(canonicalRoot, 'extensions');
const surfaces = [path.join(root, 'apps', 'app', 'public'), path.join(root, 'apps', 'hub', 'public')];

if (!fs.existsSync(registrySource)) {
  throw new Error(`Canonical registry missing: ${registrySource}`);
}
if (!fs.existsSync(extensionsSource)) {
  throw new Error(`Canonical extensions missing: ${extensionsSource}`);
}

for (const surface of surfaces) {
  const extensionsTarget = path.join(surface, 'extensions');
  fs.copyFileSync(registrySource, path.join(surface, 'registry.json'));
  fs.rmSync(extensionsTarget, { recursive: true, force: true });
  fs.cpSync(extensionsSource, extensionsTarget, { recursive: true });
}

console.log(`Official snapshot synced from ${canonicalRoot} to App and Hub`);
