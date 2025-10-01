import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchBar from '../search/SearchBar';

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <Link to="/browse" style={{ textDecoration: 'none' }}>
          <span role="img" aria-label="wave">🌊</span> Harmony
        </Link>
      </div>
      <nav className="nav">
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/playlists">Playlists</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>
      <div style={{ minWidth: 220, maxWidth: 360, flex: 1 }}>
        <SearchBar />
      </div>
    </header>
  );
}
