import { render, screen } from '@testing-library/react';
import App from './App';

// PUBLIC_INTERFACE
test('smoke: app renders header navigation', () => {
  render(<App />);
  expect(screen.getByText(/browse/i)).toBeInTheDocument();
  expect(screen.getByText(/playlists/i)).toBeInTheDocument();
  expect(screen.getByText(/favorites/i)).toBeInTheDocument();
});
