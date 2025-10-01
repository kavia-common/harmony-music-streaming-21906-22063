import React, { useEffect, useState } from 'react';
import { fetchFeatured, fetchTracks } from '../services/api';
import TrackCard from '../components/track/TrackCard';

export default function Browse() {
  const [featured, setFeatured] = useState([]);
  const [allTracks, setAllTracks] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const f = await fetchFeatured();
      const tracks = await fetchTracks();
      if (mounted) { setFeatured(f); setAllTracks(tracks); }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <div className="h1">Browse</div>
      <div className="muted" style={{ marginBottom: 12 }}>Featured playlists and tracks</div>
      <div className="grid" style={{ marginBottom: 16 }}>
        {allTracks.slice(0, 6).map(t => (
          <TrackCard key={t.id} track={t} allTracks={allTracks} />
        ))}
      </div>
      <div className="list">
        {featured.map((f) => (
          <section key={f.id} className="surface" style={{ padding: 12 }}>
            <div className="h2">{f.title}</div>
            <FeaturedTracks trackIds={f.trackIds} allTracks={allTracks} />
          </section>
        ))}
      </div>
    </div>
  );
}

function FeaturedTracks({ trackIds, allTracks }) {
  const tracks = allTracks.filter(t => trackIds.includes(t.id));
  return (
    <div className="grid">
      {tracks.map(t => <TrackCard key={t.id} track={t} allTracks={tracks} />)}
    </div>
  );
}
