export const theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
  },
  radius: 12,
};

export function applyThemeVars() {
  const r = document.documentElement;
  r.style.setProperty('--color-primary', theme.colors.primary);
  r.style.setProperty('--color-secondary', theme.colors.secondary);
  r.style.setProperty('--color-error', theme.colors.error);
  r.style.setProperty('--color-bg', theme.colors.background);
  r.style.setProperty('--color-surface', theme.colors.surface);
  r.style.setProperty('--color-text', theme.colors.text);
}
