/**
 * Mock API layer with swappable base. Replace implementations to point to real REST.
 */

// helpers
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));
const read = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
};
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const uid = () => Math.random().toString(36).slice(2, 9);

// PUBLIC_INTERFACE
export async function fetchFeatured() {
  /** Get featured collections. */
  await delay();
  return read('featured', []);
}

// PUBLIC_INTERFACE
export async function fetchTracks(ids) {
  /** Fetch tracks by optional id list. */
  await delay();
  const all = read('tracks', []);
  if (!ids || ids.length === 0) return all;
  const set = new Set(ids);
  return all.filter(t => set.has(t.id));
}

// PUBLIC_INTERFACE
export async function searchTracks(q) {
  /** Search tracks by title/artist containing q (case-insensitive). */
  await delay();
  const all = read('tracks', []);
  const term = (q || '').toLowerCase();
  if (!term) return all;
  return all.filter(t => t.title.toLowerCase().includes(term) || t.artist.toLowerCase().includes(term));
}

// PUBLIC_INTERFACE
export async function getPlaylists() {
  /** Return all playlists. */
  await delay();
  return read('playlists', []);
}

// PUBLIC_INTERFACE
export async function createPlaylist(name) {
  /** Create playlist with a name. */
  await delay();
  const lists = read('playlists', []);
  const p = { id: uid(), name, trackIds: [] };
  write('playlists', [p, ...lists]);
  return p;
}

// PUBLIC_INTERFACE
export async function updatePlaylist(id, patch) {
  /** Update playlist fields (name, trackIds). */
  await delay();
  const lists = read('playlists', []);
  const next = lists.map(p => p.id === id ? { ...p, ...patch } : p);
  write('playlists', next);
  return next.find(p => p.id === id);
}

// PUBLIC_INTERFACE
export async function deletePlaylist(id) {
  /** Delete a playlist by id. */
  await delay();
  const lists = read('playlists', []);
  const next = lists.filter(p => p.id !== id);
  write('playlists', next);
  return { ok: true };
}

// PUBLIC_INTERFACE
export async function getFavorites() {
  /** Return favorite track ids. */
  await delay();
  return read('favorites', []);
}

// PUBLIC_INTERFACE
export async function toggleFavorite(trackId) {
  /** Toggle a track id in favorites. */
  await delay();
  const favs = new Set(read('favorites', []));
  if (favs.has(trackId)) favs.delete(trackId); else favs.add(trackId);
  const arr = Array.from(favs);
  write('favorites', arr);
  return arr;
}

// PUBLIC_INTERFACE
export async function getTrackById(id) {
  /** Return a single track by id. */
  await delay();
  const all = read('tracks', []);
  return all.find(t => t.id === id) || null;
}
