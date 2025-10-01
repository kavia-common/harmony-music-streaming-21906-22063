/* Header skeuomorphic:
   - Glossy gradient with raised container and beveled nav buttons.
   - Search input appears sunken for tactile contrast. */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchBar from '../search/SearchBar';

export default function Header() {
  return (
    <header className="header skeu-gloss">
      <div className="brand">
        <Link to="/browse">
          <span role="img" aria-label="wave">🌊</span> Harmony
        </Link>
      </div>
      <nav className="nav" aria-label="Primary">
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/playlists">Playlists</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>
      <div style={{ minWidth: 220, maxWidth: 420, flex: 1 }}>
        <SearchBar variant="sunken" />
      </div>
    </header>
  );
}
