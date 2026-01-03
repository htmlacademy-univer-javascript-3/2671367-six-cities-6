import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites_empty';

describe('FavoritesEmpty', () => {
  it('shows default message', () => {
    render(<FavoritesEmpty />);
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Save properties to narrow down search/i)
    ).toBeInTheDocument();
  });

  it('accepts custom text', () => {
    render(<FavoritesEmpty message="None" description="Add some" />);
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('Add some')).toBeInTheDocument();
  });
});
