import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { createPlaylist, deletePlaylist, getPlaylists, updatePlaylist } from '../services/api';

// PUBLIC_INTERFACE
export const PlaylistContext = createContext(null);

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await getPlaylists();
    setPlaylists(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addPlaylist = useCallback(async (name) => {
    const p = await createPlaylist(name);
    setPlaylists((prev) => [p, ...prev]);
    return p;
  }, []);

  const savePlaylist = useCallback(async (id, patch) => {
    const updated = await updatePlaylist(id, patch);
    setPlaylists((prev) => prev.map(p => p.id === id ? updated : p));
    return updated;
  }, []);

  const removePlaylist = useCallback(async (id) => {
    await deletePlaylist(id);
    setPlaylists((prev) => prev.filter(p => p.id !== id));
  }, []);

  const value = useMemo(() => ({
    playlists, loading, refresh, addPlaylist, savePlaylist, removePlaylist
  }), [playlists, loading, refresh, addPlaylist, savePlaylist, removePlaylist]);

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}
