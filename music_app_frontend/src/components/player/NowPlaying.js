import React, { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';

export default function NowPlaying() {
  const { currentTrack } = useContext(PlayerContext);
  if (!currentTrack) return <div className="muted">Nothing playing</div>;
  return (
    <div>
      <div style={{ fontWeight: 600 }}>{currentTrack.title}</div>
      <div className="muted" style={{ fontSize: 12 }}>{currentTrack.artist}</div>
    </div>
  );
}
