# Harmony Music Frontend

A lightweight React UI for browsing, searching, and playing music with a mocked service layer. Styled with the Ocean Professional theme.

## Highlights
- Routing with react-router-dom v6
- Player and Playlist contexts
- Mock API in `src/services/api.js` backed by localStorage
- Themed UI using CSS variables and `src/theme.js`
- Minimal dependencies, ESLint compliant

## Project Structure
- `src/theme.js`, `src/theme.css` - theme tokens and CSS variables
- `src/contexts/PlayerContext.js` - playback state and controls
- `src/contexts/PlaylistContext.js` - playlists CRUD
- `src/services/api.js` - mocked async API functions
- `src/data/mockData.js` - seed data for localStorage
- `src/components/` - layout, search, track cards, playlist items
- `src/pages/` - Browse, Search, Playlists, Favorites, NotFound
- `src/hooks/useLocalStorage.js` - helper hook
- `src/tests/smoke/App.render.test.js` - smoke test

## Run
- `npm install`
- `npm start`
- `npm test`

## Swap to Real REST
Replace functions in `src/services/api.js` with fetch/axios calls to your backend:
```js
// PUBLIC_INTERFACE
export async function searchTracks(q) {
  const res = await fetch(`/api/tracks?search=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}
```
Keep function signatures stable so UI remains unchanged. Remove localStorage helpers as needed.

## Theme
Tokens defined in `src/theme.js` are applied on load by `applyThemeVars()`. Update colors/radius and the CSS variables will reflect automatically.
