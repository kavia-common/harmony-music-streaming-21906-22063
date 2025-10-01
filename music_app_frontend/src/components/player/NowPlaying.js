/* NowPlaying kept simple; aligned with theme typography. */
import React, { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';

export default function NowPlaying() {
  const { currentTrack } = useContext(PlayerContext);
  if (!currentTrack) return <div className="muted">Nothing playing</div>;
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentTrack.title}</div>
      <div className="muted" style={{ fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentTrack.artist}</div>
    </div>
  );
}
