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

// PUBLIC_INTERFACE
export function applyUserTheme({ mode = 'light', skeuoIntensity = 60, highContrast = false, reducedMotion = false } = {}) {
  /**
   * Apply user-specific theme preferences:
   * - Dark/Light mode
   * - Skeuomorphic intensity (affects bevel, gloss, elevation)
   * - High contrast adjustments
   * - Reduced motion (affects transition durations)
   */
  const r = document.documentElement;

  // Base tokens first
  applyThemeVars();

  // Mode adjustments (colors and surfaces)
  if (mode === 'dark') {
    r.style.setProperty('--color-bg', '#0f172a');
    r.style.setProperty('--color-surface', '#0b1220');
    r.style.setProperty('--color-text', '#e5e7eb');
    r.style.setProperty('--color-muted', '#94a3b8');
    r.style.setProperty('--gradient', 'linear-gradient(135deg, rgba(59,130,246,0.10), #0f172a)');

    r.style.setProperty('--surface-muted', 'linear-gradient(to bottom, #0f172a, #0b1220)');
    r.style.setProperty('--surface-raised', 'linear-gradient(to bottom, #111827, #0f172a)');
    r.style.setProperty('--surface-sunken', 'linear-gradient(to bottom, #0b1220, #0a0f1b)');

    // Dark bevel/shadows baseline
    r.style.setProperty('--bevel-light', 'rgba(255,255,255,0.06)');
    r.style.setProperty('--bevel-dark', 'rgba(0,0,0,0.6)');
  } else {
    // reset to light defaults
    r.style.setProperty('--color-bg', theme.colors.background);
    r.style.setProperty('--color-surface', theme.colors.surface);
    r.style.setProperty('--color-text', theme.colors.text);
    r.style.setProperty('--color-muted', theme.colors.muted);
    r.style.setProperty('--gradient', theme.gradient);

    r.style.setProperty('--surface-muted', theme.surfaces.muted);
    r.style.setProperty('--surface-raised', theme.surfaces.raised);
    r.style.setProperty('--surface-sunken', theme.surfaces.sunken);

    r.style.setProperty('--bevel-light', theme.bevel.light);
    r.style.setProperty('--bevel-dark', theme.bevel.dark);
  }

  // Intensity mapping (0..100) to gloss/bevel/shadow strengths
  const clamped = Math.max(0, Math.min(100, Number(skeuoIntensity) || 0));
  const glossAlpha = 0.15 + (clamped / 100) * 0.5; // 0.15..0.65
  const bevelLightAlpha = mode === 'dark'
    ? 0.03 + (clamped / 100) * 0.12
    : 0.5 + (clamped / 100) * 0.4; // 0.5..0.9
  const bevelDarkAlpha = mode === 'dark'
    ? 0.4 + (clamped / 100) * 0.4 // 0.4..0.8
    : 0.08 + (clamped / 100) * 0.12; // 0.08..0.2

  r.style.setProperty('--gloss-start', `rgba(255,255,255,${glossAlpha})`);
  r.style.setProperty('--gloss-end', 'rgba(255,255,255,0)');
  if (mode === 'dark') {
    r.style.setProperty('--bevel-light', `rgba(255,255,255,${bevelLightAlpha})`);
    r.style.setProperty('--bevel-dark', `rgba(0,0,0,${bevelDarkAlpha})`);
  } else {
    r.style.setProperty('--bevel-light', `rgba(255,255,255,${bevelLightAlpha})`);
    r.style.setProperty('--bevel-dark', `rgba(17,24,39,${bevelDarkAlpha})`);
  }

  // Elevation depth (outer shadows)
  const elev1Opacity = mode === 'dark' ? (0.12 + (clamped / 100) * 0.14) : (0.06 + (clamped / 100) * 0.06);
  const elev2Opacity = mode === 'dark' ? (0.18 + (clamped / 100) * 0.18) : (0.10 + (clamped / 100) * 0.08);
  r.style.setProperty('--elev-1', `0 4px 10px rgba(0,0,0,${elev1Opacity}), 0 1px 0 rgba(255,255,255,0.4) inset`);
  r.style.setProperty('--elev-2', `0 10px 24px rgba(0,0,0,${elev2Opacity}), 0 2px 0 rgba(255,255,255,0.35) inset`);

  // High contrast tweaks
  if (highContrast) {
    r.style.setProperty('--color-text', mode === 'dark' ? '#ffffff' : '#0b0f19');
    r.style.setProperty('--color-muted', mode === 'dark' ? '#e5e7eb' : '#111827');
    r.style.setProperty('--border', '1px solid rgba(17,24,39,0.22)');
  } else {
    r.style.setProperty('--border', '1px solid rgba(17,24,39,0.08)');
  }

  // Reduced motion -> shorten or remove transitions
  if (reducedMotion) {
    r.style.setProperty('--transition-fast', '0ms');
    r.style.setProperty('--transition', '0ms');
    r.style.setProperty('--transition-slow', '0ms');
  } else {
    r.style.setProperty('--transition-fast', '150ms ease');
    r.style.setProperty('--transition', '200ms ease');
    r.style.setProperty('--transition-slow', '300ms ease');
  }
}
