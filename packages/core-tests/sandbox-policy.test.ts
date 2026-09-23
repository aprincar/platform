import test from 'node:test';
import assert from 'node:assert/strict';
import { buildIframePermissionsPolicy, buildSandboxDocument } from '../extension-host/src/sandbox.ts';

const manifest: any = { permissions: [], optionalPermissions: [] };

test('injects a CSP that blocks network connections for normal games', () => {
  const html = buildSandboxDocument('<!doctype html><html><head></head><body>ok</body></html>', manifest);
  assert.match(html, /Content-Security-Policy/i);
  assert.match(html, /connect-src 'none'/i);
  assert.match(html, /default-src 'none'/i);
});

test('declaring optional network does not grant network access', () => {
  const html = buildSandboxDocument(
    '<!doctype html><html><head></head><body>ok</body></html>',
    { permissions: [], optionalPermissions: ['network'] } as any,
  );
  assert.match(html, /connect-src 'none'/i);
});

test('network CSP is enabled only after an explicit host grant', () => {
  const html = buildSandboxDocument(
    '<!doctype html><html><head></head><body>ok</body></html>',
    { permissions: [], optionalPermissions: ['network'] } as any,
    ['network'],
  );
  assert.match(html, /connect-src https:/i);
});

test('sensitive iframe features default to deny and require matching optional grants', () => {
  const declared = { permissions: [], optionalPermissions: ['camera', 'microphone', 'geolocation'] } as any;
  assert.equal(
    buildIframePermissionsPolicy(declared),
    "camera 'none'; microphone 'none'; geolocation 'none'",
  );
  assert.equal(buildIframePermissionsPolicy(declared, ['camera']), "camera *; microphone 'none'; geolocation 'none'");
});

test('places CSP metadata inside a head even when the extension omits one', () => {
  const html = buildSandboxDocument('<!doctype html><html><body>ok</body></html>', manifest);
  assert.match(html, /<html[^>]*><head><meta http-equiv="Content-Security-Policy"/i);
});
