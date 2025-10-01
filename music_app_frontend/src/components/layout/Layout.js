import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';
import { applyThemeVars } from '../../theme';
import { seedLocalStorage } from '../../data/mockData';

export default function Layout() {
  useEffect(() => {
    applyThemeVars();
    seedLocalStorage();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Sidebar />
        <section className="surface" style={{ padding: 16 }}>
          <Outlet />
        </section>
      </main>
      <PlayerBar />
    </div>
  );
}
