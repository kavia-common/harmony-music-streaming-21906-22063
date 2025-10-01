/* Player bar skeuomorphic:
   - Tactile circular controls, recessed track/volume, raised thumb. */
import React, { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import NowPlaying from '../player/NowPlaying';

function secondsToTime(s = 0) {
  const m = Math.floor(s / 60).toString();
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

export default function PlayerBar() {
  const { toggle, prev, next, isPlaying, position, duration, seek, volume, setVolume } = useContext(PlayerContext);

  return (
    <footer className="playerbar skeu-gloss">
      <div className="player-meta">
        <NowPlaying />
      </div>
      <div className="player-controls">
        <button className="icon-btn skeu-bevel" aria-label="Previous" onClick={prev}>⏮</button>
        <button className="btn skeu-bevel skeu-gloss" aria-label={isPlaying ? 'Pause' : 'Play'} onClick={toggle}>
          {isPlaying ? '⏸' : '▶️'}
        </button>
        <button className="icon-btn skeu-bevel" aria-label="Next" onClick={next}>⏭</button>
      </div>
      <div className="progress">
        <span className="muted" style={{ minWidth: 40, textAlign: 'right' }}>{secondsToTime(position)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="1"
          value={Math.floor(position)}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
        />
        <span className="muted" style={{ minWidth: 40 }}>{secondsToTime(duration)}</span>
        <div className="volume">
          <span className="muted" aria-hidden>🔊</span>
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(Number(e.target.value))} aria-label="Volume" />
        </div>
      </div>
    </footer>
  );
}
