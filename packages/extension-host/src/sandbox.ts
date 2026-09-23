import type { ExtensionManifest, Permission } from '../../extension-contracts/src/types.ts';
import { hasEffectivePermission } from './permissions.ts';

function findOpeningTagEnd(html: string, tagName: 'head' | 'html'): number {
  const lower = html.toLowerCase();
  const needle = `<${tagName}`;
  let from = 0;

  while (from < lower.length) {
    const start = lower.indexOf(needle, from);
    if (start === -1) return -1;

    const boundary = lower[start + needle.length];
    if (boundary !== undefined && !/\s|>|\//.test(boundary)) {
      from = start + needle.length;
      continue;
    }

    let quote: '"' | "'" | null = null;
    for (let index = start + needle.length; index < html.length; index += 1) {
      const char = html[index];
      if (quote) {
        if (char === quote) quote = null;
        continue;
      }
      if (char === '"' || char === "'") {
        quote = char;
        continue;
      }
      if (char === '>') return index + 1;
    }

    return -1;
  }

  return -1;
}

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

  const headEnd = findOpeningTagEnd(html, 'head');
  if (headEnd !== -1) return `${html.slice(0, headEnd)}${meta}${html.slice(headEnd)}`;

  const htmlEnd = findOpeningTagEnd(html, 'html');
  if (htmlEnd !== -1) return `${html.slice(0, htmlEnd)}<head>${meta}</head>${html.slice(htmlEnd)}`;

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
