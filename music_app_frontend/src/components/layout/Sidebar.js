/* Sidebar skeuomorphic:
   - Sunken container with recessed input and tactile add button. */
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import PlaylistItem from '../playlist/PlaylistItem';

export default function Sidebar() {
  const { playlists, addPlaylist } = useContext(PlaylistContext);
  const [name, setName] = useState('');
  const { pathname } = useLocation();
  const onCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    await addPlaylist(trimmed);
    setName('');
  };
  return (
    <aside className="sidebar">
      <div>
        <div className="h2">Playlists</div>
        <div className="row" style={{ margin: '8px 0' }}>
          <input className="input" placeholder="New playlist name" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn skeu-bevel skeu-gloss" onClick={onCreate}>Add</button>
        </div>
      </div>
      <div className="list" style={{ paddingTop: '4px' }}>
        {playlists.map(p => <PlaylistItem key={p.id} playlist={p} />)}
      </div>

      <div className="skeu-sunken" style={{ padding: 12, marginTop: 8 }}>
        <div className="h2" style={{ fontSize: '1rem' }}>Preferences</div>
        <div className="row" style={{ marginTop: 8, flexWrap: 'wrap' }}>
          <Link
            to="/settings"
            className="btn skeu-bevel"
            aria-current={pathname === '/settings' ? 'page' : undefined}
            style={{
              background: pathname === '/settings' ? 'var(--surface-sunken)' : undefined,
              boxShadow: pathname === '/settings'
                ? 'inset 0 1px 1px var(--bevel-light), inset 0 -6px 12px var(--bevel-dark)'
                : undefined,
            }}
          >
            ⚙️ Settings
          </Link>
        </div>
      </div>
    </aside>
  );
}
