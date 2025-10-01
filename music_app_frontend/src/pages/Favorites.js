import React, { useEffect, useState } from 'react';
import { fetchTracks, getFavorites } from '../services/api';
import TrackCard from '../components/track/TrackCard';

export default function Favorites() {
  const [favIds, setFavIds] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const ids = await getFavorites();
      const all = await fetchTracks();
      const subset = all.filter(t => ids.includes(t.id));
      if (mounted) { setFavIds(ids); setTracks(subset); }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <div className="h1">Favorites</div>
      {favIds.length === 0 ? <div className="muted">No favorites yet</div> : (
        <div className="grid" style={{ marginTop: 12 }}>
          {tracks.map(t => <TrackCard key={t.id} track={t} allTracks={tracks} />)}
        </div>
      )}
    </div>
  );
}
