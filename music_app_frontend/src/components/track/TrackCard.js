import React, { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import { getFavorites, toggleFavorite } from '../../services/api';

export default function TrackCard({ track, allTracks }) {
  const { play, currentTrack, isPlaying, toggle } = useContext(PlayerContext);
  const active = currentTrack?.id === track.id;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let mounted = true;
    getFavorites().then((f) => mounted && setFavorites(f));
    return () => { mounted = false; };
  }, [track.id]);

  const onPlayClick = () => {
    if (active) toggle();
    else play(track, allTracks || []);
  };

  const onFav = async () => {
    const next = await toggleFavorite(track.id);
    setFavorites(next);
  };

  const isFav = favorites.includes(track.id);

  return (
    <div className="card">
      <div className="h2" style={{ fontSize: '1rem' }}>{track.title}</div>
      <div className="muted">{track.artist}</div>
      <div className="row">
        <button className="btn" onClick={onPlayClick}>{active ? (isPlaying ? 'Pause' : 'Resume') : 'Play'}</button>
        <button className={`icon-btn ${isFav ? 'active' : ''}`} onClick={onFav} aria-label="Favorite">★</button>
      </div>
    </div>
  );
}
