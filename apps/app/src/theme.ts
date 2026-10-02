import { createTheme } from '@mantine/core';

export type AprincarThemePreference = 'system' | 'light' | 'dark' | 'contrast';
export type AprincarResolvedTheme = Exclude<AprincarThemePreference, 'system'>;

const LEGACY_THEME_MAP: Record<string, AprincarThemePreference> = {
  standard: 'light',
  pastel: 'light',
  night: 'dark',
};

export const theme = createTheme({
  primaryColor: 'aprincar',
  fontFamily: '"Poppins", Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: { fontFamily: '"Poppins", Inter, system-ui, sans-serif' },
  defaultRadius: 'lg',
  colors: {
    aprincar: [
      '#EFF6FF',
      '#DBEAFE',
      '#BFDBFE',
      '#93C5FD',
      '#60A5FA',
      '#3B82F6',
      '#2563EB',
      '#1D4ED8',
      '#1E40AF',
      '#1E3A8A',
    ],
  },
});

export const themeStyles: Record<
  AprincarResolvedTheme,
  { background: string; surface: string; text: string }
> = {
  light: { background: '#F8FBFF', surface: '#FFFFFF', text: '#0F172A' },
  dark: { background: '#07142E', surface: '#0E2144', text: '#F8FAFC' },
  contrast: { background: '#000000', surface: '#000000', text: '#FFFF00' },
};

export function normalizeThemePreference(value: unknown): AprincarThemePreference {
  const candidate = String(value ?? 'light');
  if (candidate === 'system' || candidate === 'light' || candidate === 'dark' || candidate === 'contrast') {
    return candidate;
  }
  return LEGACY_THEME_MAP[candidate] ?? 'light';
}

export function resolveThemePreference(
  preference: AprincarThemePreference,
  prefersDark = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches === true,
): AprincarResolvedTheme {
  if (preference === 'system') return prefersDark ? 'dark' : 'light';
  return preference;
}

export function applyThemePreference(preference: AprincarThemePreference): AprincarResolvedTheme {
  const resolved = resolveThemePreference(preference);
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.aprincarThemePreference = preference;
    document.documentElement.dataset.aprincarTheme = resolved;
    document.documentElement.style.colorScheme =
      resolved === 'dark' || resolved === 'contrast' ? 'dark' : 'light';
  }
  return resolved;
}

export function observeThemePreference(preference: AprincarThemePreference): () => void {
  applyThemePreference(preference);
  if (preference !== 'system' || typeof window === 'undefined' || !window.matchMedia) {
    return () => undefined;
  }
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = () => applyThemePreference('system');
  media.addEventListener?.('change', handleChange);
  return () => media.removeEventListener?.('change', handleChange);
}
