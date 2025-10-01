/* Playlists page modernized:
   - Consistent spacing and fade-in. */
import React, { useContext } from 'react';
import { PlaylistContext } from '../contexts/PlaylistContext';

export default function Playlists() {
  const { playlists, loading } = useContext(PlaylistContext);

  return (
    <div className="fade-in-up">
      <div className="h1">Your Playlists</div>
      {loading ? <div className="muted">Loading...</div> : (
        <div className="list" style={{ marginTop: 12 }}>
          {playlists.length === 0 ? <div className="muted">No playlists yet</div> : playlists.map(p => (
            <div className="card" key={p.id}>
              <div className="space-between">
                <div>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{p.trackIds?.length || 0} tracks</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
