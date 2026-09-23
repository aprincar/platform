import type { ExtensionManifest, Permission } from '../../extension-contracts/src/types.ts';
import { hasEffectivePermission } from './permissions.ts';

export function buildSandboxDocument(
  html: string,
  manifest: Pick<ExtensionManifest, 'permissions' | 'optionalPermissions'>,
  grantedPermissions: readonly Permission[] = [],
): string {
  const connect = hasEffectivePermission(manifest as ExtensionManifest, grantedPermissions, 'network')
    ? 'https:'
    : "'none'";
  const csp = `default-src 'none'; script-src 'unsafe-inline' 'wasm-unsafe-eval' blob:; style-src 'unsafe-inline'; img-src data: blob:; media-src data: blob:; font-src data:; connect-src ${connect}; worker-src blob:; child-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'`;
  const meta = `<meta http-equiv="Content-Security-Policy" content="${csp}"><meta name="referrer" content="no-referrer">`;
  if (/<head[^>]*>/i.test(html)) return html.replace(/<head([^>]*)>/i, `<head$1>${meta}`);
  if (/<html[^>]*>/i.test(html)) return html.replace(/<html([^>]*)>/i, `<html$1><head>${meta}</head>`);
  return `<!doctype html><html><head>${meta}</head><body>${html}</body></html>`;
}

export function buildIframePermissionsPolicy(
  manifest: Pick<ExtensionManifest, 'permissions' | 'optionalPermissions'>,
  grantedPermissions: readonly Permission[] = [],
): string {
  const feature = (permission: Extract<Permission, 'camera' | 'microphone' | 'geolocation'>) =>
    hasEffectivePermission(manifest as ExtensionManifest, grantedPermissions, permission)
      ? `${permission} *`
      : `${permission} 'none'`;

  return [feature('camera'), feature('microphone'), feature('geolocation')].join('; ');
}
