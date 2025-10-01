/* Search page skeuomorphic:
   - Layered panels; results as raised cards. */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchTracks } from '../services/api';
import TrackCard from '../components/track/TrackCard';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const r = await searchTracks(q);
      if (mounted) setResults(r);
    })();
    return () => { mounted = false; };
  }, [q]);

  return (
    <div className="fade-in-up">
      <div className="h1">Search</div>
      <div className="skeu-sunken" style={{ padding: 12, marginBottom: 12 }}>
        <div className="muted">Showing results for: <strong>{q || 'All'}</strong></div>
      </div>
      <div className="grid">
        {results.map(t => <TrackCard key={t.id} track={t} allTracks={results} />)}
      </div>
    </div>
  );
}
