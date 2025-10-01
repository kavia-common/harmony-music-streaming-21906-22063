/* Theme tokens (Ocean Professional)
   - Central source of truth for JS-driven tokens that map to CSS variables. */
export const theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f0f4f9',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6b7280',
  },
  gradient: 'linear-gradient(135deg, rgba(59,130,246,0.10), #f0f4f9)',
  radius: {
    xs: 8,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  shadow: {
    xs: '0 1px 1px rgba(0,0,0,0.05)',
    sm: '0 2px 4px rgba(0,0,0,0.08)',
    md: '0 6px 16px rgba(0,0,0,0.10)',
    lg: '0 14px 30px rgba(0,0,0,0.12)',
    elev1: '0 4px 10px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.6) inset',
    elev2: '0 10px 24px rgba(0,0,0,0.12), 0 2px 0 rgba(255,255,255,0.5) inset',
  },
  bevel: {
    light: 'rgba(255,255,255,0.9)',
    dark: 'rgba(17,24,39,0.12)',
  },
  gloss: {
    start: 'rgba(255,255,255,0.55)',
    end: 'rgba(255,255,255,0)',
  },
  surfaces: {
    muted: 'linear-gradient(to bottom, #f7fafc, #eef2f7)',
    raised: 'linear-gradient(to bottom, #ffffff, #f2f6fb)',
    sunken: 'linear-gradient(to bottom, #f1f5fb, #e9eef6)',
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

  // Surfaces & effects
  r.style.setProperty('--surface-muted', theme.surfaces.muted);
  r.style.setProperty('--surface-raised', theme.surfaces.raised);
  r.style.setProperty('--surface-sunken', theme.surfaces.sunken);
  r.style.setProperty('--gloss-start', theme.gloss.start);
  r.style.setProperty('--gloss-end', theme.gloss.end);
  r.style.setProperty('--bevel-light', theme.bevel.light);
  r.style.setProperty('--bevel-dark', theme.bevel.dark);
  r.style.setProperty('--elev-1', theme.shadow.elev1);
  r.style.setProperty('--elev-2', theme.shadow.elev2);

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
