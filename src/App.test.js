import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sudoku Solver heading', () => {
  render(<App />);
  const heading = screen.getByText(/Sudoku Solver/i);
  expect(heading).toBeInTheDocument();
});