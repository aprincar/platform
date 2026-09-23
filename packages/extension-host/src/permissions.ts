import type { ExtensionManifest, Permission } from '../../extension-contracts/src/types.ts';

export const SENSITIVE_PERMISSIONS = ['camera', 'microphone', 'network', 'geolocation'] as const satisfies readonly Permission[];

const SENSITIVE = new Set<Permission>(SENSITIVE_PERMISSIONS);

export function isSensitivePermission(permission: Permission) {
  return SENSITIVE.has(permission);
}

/**
 * Returns whether a permission is declared by the extension manifest.
 * Optional permissions are declarations only and never imply a grant.
 */
export function declaresPermission(manifest: ExtensionManifest, permission: Permission) {
  return manifest.permissions.includes(permission) || manifest.optionalPermissions.includes(permission);
}

/**
 * Required, non-sensitive permissions are available by declaration.
 * Sensitive permissions are available only when they are optional and the Host explicitly grants them.
 */
export function hasEffectivePermission(
  manifest: ExtensionManifest,
  grantedPermissions: readonly Permission[],
  permission: Permission,
) {
  if (!isSensitivePermission(permission)) return manifest.permissions.includes(permission);
  return manifest.optionalPermissions.includes(permission) && grantedPermissions.includes(permission);
}

/**
 * Backwards-compatible helper for non-sensitive host capabilities.
 * Sensitive permissions intentionally return false because declaration is not a grant.
 */
export function hasPermission(manifest: ExtensionManifest, permission: Permission) {
  return !isSensitivePermission(permission) && manifest.permissions.includes(permission);
}

export function effectiveSensitiveGrants(
  manifest: ExtensionManifest,
  grantedPermissions: readonly Permission[],
): Permission[] {
  return grantedPermissions.filter(
    (permission) => isSensitivePermission(permission) && manifest.optionalPermissions.includes(permission),
  );
}
