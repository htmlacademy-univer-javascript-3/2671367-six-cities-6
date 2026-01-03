import { render, screen } from '@testing-library/react';
import CitiesNoPlaces from './cities-no-places';

describe('CitiesNoPlaces', () => {
  it('renders text and city name', () => {
    render(<CitiesNoPlaces cityName="Dusseldorf" />);
    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Dusseldorf/)).toBeInTheDocument();
  });
});
