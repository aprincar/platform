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
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: { fontFamily: '"Nunito Sans", Inter, system-ui, sans-serif' },
  defaultRadius: 'lg',
  colors: {
    aprincar: [
      '#EEF1FF',
      '#DDE3FF',
      '#C2CCFF',
      '#A3B1FF',
      '#8193FF',
      '#657CFA',
      '#4F6EF7',
      '#3B55D9',
      '#2F45B8',
      '#22358E',
    ],
  },
});

export const themeStyles: Record<
  AprincarResolvedTheme,
  { background: string; surface: string; text: string }
> = {
  light: { background: '#F7F7FB', surface: '#FFFFFF', text: '#20263A' },
  dark: { background: '#101426', surface: '#191F36', text: '#F3F5FF' },
  contrast: { background: '#000000', surface: '#111111', text: '#FFFFFF' },
};

export function normalizeThemePreference(value: unknown): AprincarThemePreference {
  const candidate = String(value ?? 'system');
  if (candidate === 'system' || candidate === 'light' || candidate === 'dark' || candidate === 'contrast') {
    return candidate;
  }
  return LEGACY_THEME_MAP[candidate] ?? 'system';
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
    document.documentElement.style.colorScheme = resolved === 'dark' || resolved === 'contrast' ? 'dark' : 'light';
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
