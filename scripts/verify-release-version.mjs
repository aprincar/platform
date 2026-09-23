import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const fail = (message) => {
  console.error(`release version verification failed: ${message}`);
  process.exitCode = 1;
};

const rootPackage = readJson('package.json');
const version = rootPackage.version;

if (!/^\d+\.\d+\.\d+(?:[+-][0-9A-Za-z.-]+)?$/.test(version)) {
  fail(`invalid root SemVer "${version}"`);
}

const workspacePaths = [];
for (const parent of ['apps', 'packages']) {
  for (const entry of fs.readdirSync(path.join(root, parent), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const packagePath = path.posix.join(parent, entry.name, 'package.json');
    if (fs.existsSync(path.join(root, packagePath))) workspacePaths.push(packagePath);
  }
}
workspacePaths.sort();

const workspaces = workspacePaths.map((packagePath) => ({
  packagePath,
  relativeDir: path.posix.dirname(packagePath),
  packageJson: readJson(packagePath),
}));
const workspaceNames = new Set(workspaces.map(({ packageJson }) => packageJson.name));

const verifyInternalSpecs = (owner, packageJson) => {
  for (const section of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
    for (const [name, spec] of Object.entries(packageJson[section] ?? {})) {
      if (workspaceNames.has(name) && spec !== version) {
        fail(`${owner}: ${section}["${name}"] must be "${version}", found "${spec}"`);
      }
    }
  }
};

for (const { packagePath, packageJson } of workspaces) {
  if (packageJson.version !== version) {
    fail(`${packagePath}: version must be "${version}", found "${packageJson.version ?? '<missing>'}"`);
  }
  verifyInternalSpecs(packagePath, packageJson);
}

const lock = readJson('package-lock.json');
if (lock.version !== version) fail(`package-lock.json top-level version must be "${version}"`);
if (lock.packages?.['']?.version !== version) {
  fail(`package-lock.json root package version must be "${version}"`);
}

for (const { packagePath, relativeDir } of workspaces) {
  const lockEntry = lock.packages?.[relativeDir];
  if (!lockEntry) {
    fail(`package-lock.json is missing workspace entry "${relativeDir}"`);
    continue;
  }
  if (lockEntry.version !== version) {
    fail(
      `package-lock.json ${relativeDir}: version must be "${version}", found "${lockEntry.version ?? '<missing>'}"`,
    );
  }
  verifyInternalSpecs(`package-lock.json:${relativeDir}`, lockEntry);
}

if (!process.exitCode) {
  console.log(`release version verification passed: ${version} across ${workspaces.length} workspaces`);
}
