import React, { useContext, useMemo, useState } from 'react';
import { PlaylistContext } from '../../contexts/PlaylistContext';

export default function PlaylistItem({ playlist }) {
  const { savePlaylist, removePlaylist } = useContext(PlaylistContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(playlist.name);

  const tracksCount = useMemo(() => (playlist.trackIds?.length || 0), [playlist.trackIds]);

  const onSave = async () => {
    await savePlaylist(playlist.id, { name });
    setEditing(false);
  };

  return (
    <div className="card">
      {editing ? (
        <div className="row">
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn" onClick={onSave}>Save</button>
          <button className="btn ghost" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="space-between">
          <div>
            <div style={{ fontWeight: 600 }}>{playlist.name}</div>
            <div className="muted" style={{ fontSize: 12 }}>{tracksCount} tracks</div>
          </div>
          <div className="row">
            <button className="icon-btn" onClick={() => setEditing(true)}>✏️</button>
            <button className="icon-btn" onClick={() => removePlaylist(playlist.id)}>🗑</button>
          </div>
        </div>
      )}
    </div>
  );
}
