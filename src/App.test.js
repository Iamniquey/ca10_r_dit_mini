import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const redditLogo = screen.getByText(/R'dit Mini/i);
  expect(redditLogo).toBeInTheDocument();
});
