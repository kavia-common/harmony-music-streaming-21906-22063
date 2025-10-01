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
    <div>
      <div className="h1">Search</div>
      <div className="muted" style={{ marginBottom: 12 }}>Showing results for: <strong>{q || 'All'}</strong></div>
      <div className="grid">
        {results.map(t => <TrackCard key={t.id} track={t} allTracks={results} />)}
      </div>
    </div>
  );
}
