/* Theme tokens (Ocean Professional)
   - Central source of truth for JS-driven tokens that map to CSS variables. */
export const theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6b7280',
  },
  gradient: 'linear-gradient(135deg, rgba(59,130,246,0.10), #f9fafb)',
  radius: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  shadow: {
    xs: '0 1px 1px rgba(0,0,0,0.04)',
    sm: '0 1px 2px rgba(0,0,0,0.06)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 10px 24px rgba(0,0,0,0.10)',
  }
};

// PUBLIC_INTERFACE
export function applyThemeVars() {
  /** Apply theme tokens to CSS variables at runtime (if overridden in future). */
  const r = document.documentElement;
  r.style.setProperty('--color-primary', theme.colors.primary);
  r.style.setProperty('--color-secondary', theme.colors.secondary);
  r.style.setProperty('--color-success', theme.colors.success);
  r.style.setProperty('--color-error', theme.colors.error);
  r.style.setProperty('--color-bg', theme.colors.background);
  r.style.setProperty('--color-surface', theme.colors.surface);
  r.style.setProperty('--color-text', theme.colors.text);
  r.style.setProperty('--color-muted', theme.colors.muted);
  r.style.setProperty('--gradient', theme.gradient);

  r.style.setProperty('--radius-xs', `${theme.radius.xs}px`);
  r.style.setProperty('--radius-sm', `${theme.radius.sm}px`);
  r.style.setProperty('--radius', `${theme.radius.md}px`);
  r.style.setProperty('--radius-lg', `${theme.radius.lg}px`);
  r.style.setProperty('--radius-xl', `${theme.radius.xl}px`);

  r.style.setProperty('--shadow-xs', theme.shadow.xs);
  r.style.setProperty('--shadow-sm', theme.shadow.sm);
  r.style.setProperty('--shadow-md', theme.shadow.md);
  r.style.setProperty('--shadow-lg', theme.shadow.lg);

  // Border stays consistent
  r.style.setProperty('--border', '1px solid rgba(17,24,39,0.08)');
}
