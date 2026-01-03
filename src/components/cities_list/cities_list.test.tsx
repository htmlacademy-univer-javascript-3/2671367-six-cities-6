import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { CitiesList } from './cities_ist';
import { City, CityName } from '../../entities/city';

afterEach(() => vi.clearAllMocks());

describe('CitiesList', () => {
  const cities: City[] = [
    { name: CityName.Paris, location: { latitude: 1, longitude: 2 } },
    { name: CityName.Cologne, location: { latitude: 3, longitude: 4 } },
  ];

  it('renders list of cities and calls onClick when city clicked', () => {
    const onClick = vi.fn();
    const { getByText } = render(
      <CitiesList cities={cities} currentCity={cities[0]} onClick={onClick} />
    );

    const el = getByText('Cologne');
    const link = el.closest('a') as HTMLElement;

    fireEvent.click(link);

    expect(onClick).toHaveBeenCalledWith(cities[1]);
  });

  it('marks current city as active', () => {
    const onClick = vi.fn();
    const { getByText } = render(
      <CitiesList cities={cities} currentCity={cities[1]} onClick={onClick} />
    );

    const el = getByText('Cologne');
    const link = el.closest('a') as HTMLElement;

    expect(link.className).toContain('tabs__item--active');
  });
});
