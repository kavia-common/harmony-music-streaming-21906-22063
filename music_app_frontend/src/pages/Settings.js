import React, { useEffect, useMemo, useState } from 'react';
import { applyUserTheme } from '../theme';

/**
 * Settings page with sections:
 * - Appearance: light/dark, skeuomorphism intensity
 * - Playback: autoplay, crossfade duration
 * - Accessibility: reduced motion, high contrast
 * - Account: placeholder
 *
 * Persists to localStorage and applies theme via applyUserTheme.
 */
export default function Settings() {
  // Load initial settings from localStorage (with sensible defaults)
  const initial = useMemo(() => {
    const get = (k, fb) => {
      try {
        const raw = localStorage.getItem(k);
        return raw != null ? JSON.parse(raw) : fb;
      } catch {
        return fb;
      }
    };
    return {
      mode: get('ui.themeMode', 'light'),
      skeuoIntensity: get('ui.skeuoIntensity', 60),
      autoplay: get('playback.autoplay', true),
      crossfade: get('playback.crossfade', 0),
      reducedMotion: get('a11y.reducedMotion', false),
      highContrast: get('a11y.highContrast', false),
    };
  }, []);

  const [mode, setMode] = useState(initial.mode);
  const [skeuoIntensity, setSkeuoIntensity] = useState(initial.skeuoIntensity);
  const [autoplay, setAutoplay] = useState(initial.autoplay);
  const [crossfade, setCrossfade] = useState(initial.crossfade);
  const [reducedMotion, setReducedMotion] = useState(initial.reducedMotion);
  const [highContrast, setHighContrast] = useState(initial.highContrast);

  // Persist on change and apply theme
  useEffect(() => {
    try {
      localStorage.setItem('ui.themeMode', JSON.stringify(mode));
      localStorage.setItem('ui.skeuoIntensity', JSON.stringify(skeuoIntensity));
      localStorage.setItem('playback.autoplay', JSON.stringify(autoplay));
      localStorage.setItem('playback.crossfade', JSON.stringify(crossfade));
      localStorage.setItem('a11y.reducedMotion', JSON.stringify(reducedMotion));
      localStorage.setItem('a11y.highContrast', JSON.stringify(highContrast));
    } catch {
      // ignore storage errors
    }
    applyUserTheme({ mode, skeuoIntensity, highContrast, reducedMotion });
  }, [mode, skeuoIntensity, autoplay, crossfade, reducedMotion, highContrast]);

  return (
    <div className="fade-in-up" role="region" aria-label="Settings">
      <div className="h1">Settings</div>
      <div className="muted" style={{ marginBottom: 12 }}>
        Personalize your Harmony experience
      </div>

      <section className="card skeu-gloss" aria-labelledby="appearance-title">
        <div id="appearance-title" className="h2">Appearance</div>
        <div className="skeu-divider" style={{ margin: '8px 0' }} />
        <div className="list">
          <div className="space-between">
            <label htmlFor="theme-mode">Theme mode</label>
            <div className="row" role="group" aria-label="Theme mode">
              <button
                className={`btn skeu-bevel skeu-gloss ${mode === 'light' ? 'active' : ''}`}
                aria-pressed={mode === 'light'}
                onClick={() => setMode('light')}
              >
                Light
              </button>
              <button
                className={`btn skeu-bevel skeu-gloss ${mode === 'dark' ? 'active' : ''}`}
                aria-pressed={mode === 'dark'}
                onClick={() => setMode('dark')}
              >
                Dark
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="skeuo-intensity">Skeuomorphism intensity</label>
            <div className="row" style={{ marginTop: 6 }}>
              <input
                id="skeuo-intensity"
                className="input"
                type="range"
                min="0"
                max="100"
                step="1"
                value={skeuoIntensity}
                onChange={(e) => setSkeuoIntensity(Number(e.target.value))}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={skeuoIntensity}
                aria-label="Skeuomorphism intensity"
                style={{ accentColor: 'var(--color-primary)' }}
              />
              <div style={{ minWidth: 40, textAlign: 'right' }}>{skeuoIntensity}</div>
            </div>
            <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
              Adjust depth, bevel, and gloss strength.
            </div>
          </div>
        </div>
      </section>

      <section className="card skeu-gloss" aria-labelledby="playback-title" style={{ marginTop: 12 }}>
        <div id="playback-title" className="h2">Playback</div>
        <div className="skeu-divider" style={{ margin: '8px 0' }} />
        <div className="list">
          <div className="space-between">
            <label htmlFor="autoplay">Autoplay</label>
            <button
              id="autoplay"
              className="btn skeu-bevel"
              aria-pressed={autoplay}
              onClick={() => setAutoplay(v => !v)}
            >
              {autoplay ? 'On' : 'Off'}
            </button>
          </div>
          <div>
            <label htmlFor="crossfade">Crossfade (seconds)</label>
            <div className="row" style={{ marginTop: 6 }}>
              <input
                id="crossfade"
                className="input"
                type="range"
                min="0"
                max="10"
                step="1"
                value={crossfade}
                onChange={(e) => setCrossfade(Number(e.target.value))}
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={crossfade}
                aria-label="Crossfade duration"
                style={{ accentColor: 'var(--color-secondary)' }}
              />
              <div style={{ minWidth: 40, textAlign: 'right' }}>{crossfade}s</div>
            </div>
          </div>
        </div>
      </section>

      <section className="card skeu-gloss" aria-labelledby="a11y-title" style={{ marginTop: 12 }}>
        <div id="a11y-title" className="h2">Accessibility</div>
        <div className="skeu-divider" style={{ margin: '8px 0' }} />
        <div className="list">
          <div className="space-between">
            <label htmlFor="reduced-motion">Reduced motion</label>
            <button
              id="reduced-motion"
              className="btn skeu-bevel"
              aria-pressed={reducedMotion}
              onClick={() => setReducedMotion(v => !v)}
            >
              {reducedMotion ? 'On' : 'Off'}
            </button>
          </div>
          <div className="space-between">
            <label htmlFor="high-contrast">High contrast</label>
            <button
              id="high-contrast"
              className="btn skeu-bevel"
              aria-pressed={highContrast}
              onClick={() => setHighContrast(v => !v)}
            >
              {highContrast ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </section>

      <section className="card skeu-gloss" aria-labelledby="account-title" style={{ marginTop: 12 }}>
        <div id="account-title" className="h2">Account</div>
        <div className="skeu-divider" style={{ margin: '8px 0' }} />
        <div className="muted">Sign-in and profile management coming soon.</div>
      </section>
    </div>
  );
}
