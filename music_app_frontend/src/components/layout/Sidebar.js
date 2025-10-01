/* Sidebar modernized:
   - Surface with generous spacing, improved input/button layout, subtle separators. */
import React, { useContext, useState } from 'react';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import PlaylistItem from '../playlist/PlaylistItem';

export default function Sidebar() {
  const { playlists, addPlaylist } = useContext(PlaylistContext);
  const [name, setName] = useState('');
  const onCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    await addPlaylist(trimmed);
    setName('');
  };
  return (
    <aside className="sidebar surface">
      <div>
        <div className="h2">Playlists</div>
        <div className="row" style={{ margin: '8px 0' }}>
          <input className="input" placeholder="New playlist name" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn" onClick={onCreate}>Add</button>
        </div>
      </div>
      <div className="list" style={{ paddingTop: '4px' }}>
        {playlists.map(p => <PlaylistItem key={p.id} playlist={p} />)}
      </div>
    </aside>
  );
}
