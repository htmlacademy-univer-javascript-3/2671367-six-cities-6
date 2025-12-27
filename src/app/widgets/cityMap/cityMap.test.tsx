import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('../../../components/map/map', () => ({
  __esModule: true,
  default: ({
    location,
  }: {
    location: { latitude: number; longitude: number };
  }) => <div data-testid={`map-${location.latitude}-${location.longitude}`} />,
}));

import { CityMap } from './cityMap';
import {
  CITY_LOCATIONS,
  CityName,
  FALLBACK_CITY,
} from '../../../entities/city/constant/cityConsts';

afterEach(() => vi.clearAllMocks());

describe('CityMap', () => {
  it('uses city.location when city object provided', () => {
    const city = {
      name: CityName.Paris,
      location: CITY_LOCATIONS[CityName.Paris],
    };
    const { getByTestId } = render(<CityMap city={city} offers={[]} />);

    expect(
      getByTestId(
        `map-${CITY_LOCATIONS[CityName.Paris].latitude}-${
          CITY_LOCATIONS[CityName.Paris].longitude
        }`
      )
    ).toBeInTheDocument();
  });

  it('uses CITY_LOCATIONS when city name provided', () => {
    const { getByTestId } = render(
      <CityMap city={CityName.Cologne} offers={[]} />
    );

    expect(
      getByTestId(
        `map-${CITY_LOCATIONS[CityName.Cologne].latitude}-${
          CITY_LOCATIONS[CityName.Cologne].longitude
        }`
      )
    ).toBeInTheDocument();
  });

  it('falls back to default city when null provided', () => {
    const { getByTestId } = render(<CityMap city={null} offers={[]} />);

    const fb = CITY_LOCATIONS[FALLBACK_CITY];
    expect(
      getByTestId(`map-${fb.latitude}-${fb.longitude}`)
    ).toBeInTheDocument();
  });
});
