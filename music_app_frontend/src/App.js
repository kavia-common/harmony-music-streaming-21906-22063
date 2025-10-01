import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './theme.css';
import { PlayerProvider } from './contexts/PlayerContext';
import { PlaylistProvider } from './contexts/PlaylistContext';
import Layout from './components/layout/Layout';
import Browse from './pages/Browse';
import Search from './pages/Search';
import Playlists from './pages/Playlists';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';

// PUBLIC_INTERFACE
function App() {
  /** App entry wiring routing, contexts, and the themed layout. */
  return (
    <BrowserRouter>
      <PlaylistProvider>
        <PlayerProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Navigate to="/browse" replace />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/search" element={<Search />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </PlayerProvider>
      </PlaylistProvider>
    </BrowserRouter>
  );
}

export default App;
