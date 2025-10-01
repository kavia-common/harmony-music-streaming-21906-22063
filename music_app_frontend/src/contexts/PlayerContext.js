import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// PUBLIC_INTERFACE
export const PlayerContext = createContext(null);

/**
 * PlayerProvider manages <audio> element playback state, queue, and controls.
 */
export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Attach audio events
  useEffect(() => {
    const a = audioRef.current;
    const onTime = () => setPosition(a.currentTime);
    const onLoaded = () => setDuration(a.duration || 0);
    const onEnd = () => next();
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onLoaded);
    a.addEventListener('ended', onEnd);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.volume = volume;
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onLoaded);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const play = useCallback((track, list) => {
    if (track) setCurrentTrack(track);
    if (Array.isArray(list)) setQueue(list);
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (currentTrack) {
      // Use an empty src for mocks; in real app, set a.src to track src URL.
      a.src = currentTrack.src || '';
      a.play().catch(() => {/* ignore */});
    }
  }, [currentTrack]);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!currentTrack) return;
    if (a.paused) a.play().catch(() => {}); else a.pause();
  }, [currentTrack]);

  const pause = useCallback(() => {
    audioRef.current.pause();
  }, []);

  const seek = useCallback((t) => {
    audioRef.current.currentTime = t;
  }, []);

  const next = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    const nextIdx = idx >= 0 ? (idx + 1) % queue.length : 0;
    setCurrentTrack(queue[nextIdx]);
  }, [currentTrack, queue]);

  const prev = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    const prevIdx = idx > 0 ? idx - 1 : queue.length - 1;
    setCurrentTrack(queue[prevIdx]);
  }, [currentTrack, queue]);

  const value = useMemo(() => ({
    currentTrack, isPlaying, queue, volume, position, duration,
    play, toggle, pause, next, prev, seek, setVolume,
  }), [currentTrack, isPlaying, queue, volume, position, duration, play, toggle, pause, next, prev, seek]);

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}
