import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders Browse page by default via redirect', async () => {
  render(<App />);
  expect(await screen.findByText(/browse/i)).toBeInTheDocument();
});
