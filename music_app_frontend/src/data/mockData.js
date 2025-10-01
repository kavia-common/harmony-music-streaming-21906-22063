export const tracks = [
  { id: 't1', title: 'Ocean Drive', artist: 'Amber Waves', duration: 214, cover: '', src: '' },
  { id: 't2', title: 'Blue Horizon', artist: 'Deep Current', duration: 198, cover: '', src: '' },
  { id: 't3', title: 'Sunset Bloom', artist: 'Marina', duration: 232, cover: '', src: '' },
  { id: 't4', title: 'Neon Tide', artist: 'Aqua Pulse', duration: 201, cover: '', src: '' },
  { id: 't5', title: 'Quiet Bay', artist: 'Harbor Lights', duration: 185, cover: '', src: '' },
];

export const featured = [
  { id: 'f1', title: 'Top Ocean Hits', trackIds: ['t1','t2','t3'] },
  { id: 'f2', title: 'Evening Chill', trackIds: ['t3','t4','t5'] },
];

export function seedLocalStorage() {
  const seeded = window.localStorage.getItem('__seeded__');
  if (!seeded) {
    window.localStorage.setItem('tracks', JSON.stringify(tracks));
    window.localStorage.setItem('featured', JSON.stringify(featured));
    window.localStorage.setItem('playlists', JSON.stringify([
      { id: 'p1', name: 'My Favorites', trackIds: ['t1','t3'] }
    ]));
    window.localStorage.setItem('favorites', JSON.stringify(['t2']));
    window.localStorage.setItem('__seeded__', '1');
  }
}
