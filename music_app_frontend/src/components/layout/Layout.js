/* Layout skeuomorphic:
   - Applies theme vars and initial seed
   - Main content uses raised tactile surface with gloss overlay. */
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';
import { applyThemeVars, applyUserTheme } from '../../theme';
import { seedLocalStorage } from '../../data/mockData';

export default function Layout() {
  useEffect(() => {
    applyThemeVars();
    // If user preferences exist, apply them on initial load
    try {
      const mode = JSON.parse(localStorage.getItem('ui.themeMode') || '"light"');
      const skeuoIntensity = JSON.parse(localStorage.getItem('ui.skeuoIntensity') || '60');
      const reducedMotion = JSON.parse(localStorage.getItem('a11y.reducedMotion') || 'false');
      const highContrast = JSON.parse(localStorage.getItem('a11y.highContrast') || 'false');
      applyUserTheme({ mode, skeuoIntensity, highContrast, reducedMotion });
    } catch {
      // ignore malformed values
    }
    seedLocalStorage();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Sidebar />
        <section className="surface skeu-gloss fade-in-up" style={{ padding: '16px' }}>
          <Outlet />
        </section>
      </main>
      <PlayerBar />
    </div>
  );
}
