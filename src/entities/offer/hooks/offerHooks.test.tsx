import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import * as redux from 'react-redux';
import {
  useOfferSort,
  useSetOfferSort,
  useFavoriteOffersByCity,
} from './offerHooks';
import { offerActions } from '../model/offerSlice';
import type { Offer } from '../index';
import { CityName } from '../../city';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof redux>('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

const mockedUseSelector = vi.mocked(redux.useSelector);
const mockedUseDispatch = vi.mocked(redux.useDispatch);

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('offerHooks', () => {
  it('useOfferSort returns current sort value from selector', () => {
    mockedUseSelector.mockReturnValue('price-asc');

    function TestComponent() {
      const value = useOfferSort();
      return <div data-testid="value">{value}</div>;
    }

    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('value').textContent).toBe('price-asc');
  });

  it('useSetOfferSort dispatches setSort action with correct payload', () => {
    const mockDispatchFn = vi.fn();
    mockedUseDispatch.mockReturnValue(
      mockDispatchFn as unknown as typeof mockDispatchFn
    );

    function TestComponent() {
      const setSort = useSetOfferSort();
      return <button data-testid="btn" onClick={() => setSort('price-desc')} />;
    }

    const { getByTestId } = render(<TestComponent />);
    fireEvent.click(getByTestId('btn'));
    expect(mockDispatchFn).toHaveBeenCalledWith(
      offerActions.setSort('price-desc')
    );
  });

  it('useFavoriteOffersByCity returns flattened favorite offers when no city provided', () => {
    const offersByCity: Record<string, Offer[]> = {
      ['Paris']: [
        {
          id: '1',
          title: 't1',
          type: 'Apartment',
          price: 100,
          city: {
            name: CityName.Paris,
            location: { latitude: 48.864716, longitude: 2.349014 },
          },
          location: { latitude: 48.864716, longitude: 2.349014 },
          rating: 4.5,
          isPremium: false,
          isFavorite: false,
          previewImage: '',
        },
      ],
      ['Cologne']: [
        {
          id: '2',
          title: 't2',
          type: 'Apartment',
          price: 120,
          city: {
            name: CityName.Cologne,
            location: { latitude: 50.935173, longitude: 6.953101 },
          },
          location: { latitude: 50.935173, longitude: 6.953101 },
          rating: 3.5,
          isPremium: false,
          isFavorite: false,
          previewImage: '',
        },
        {
          id: '3',
          title: 't3',
          type: 'Hotel',
          price: 200,
          city: {
            name: CityName.Cologne,
            location: { latitude: 50.935173, longitude: 6.953101 },
          },
          location: { latitude: 50.935173, longitude: 6.953101 },
          rating: 4.1,
          isPremium: false,
          isFavorite: false,
          previewImage: '',
        },
      ],
    };
    mockedUseSelector.mockReturnValue(offersByCity);

    function TestComponent() {
      const offers = useFavoriteOffersByCity();
      return <div data-testid="count">{offers.length}</div>;
    }

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('count').textContent).toBe('3');
  });

  it('useFavoriteOffersByCity returns offers for specific city', () => {
    const offersByCitySpecific: Record<string, Offer[]> = {
      ['Paris']: [
        {
          id: '1',
          title: 't1',
          type: 'Apartment',
          price: 100,
          city: {
            name: CityName.Paris,
            location: { latitude: 48.864716, longitude: 2.349014 },
          },
          location: { latitude: 48.864716, longitude: 2.349014 },
          rating: 4.5,
          isPremium: false,
          isFavorite: false,
          previewImage: '',
        },
      ],
    };
    mockedUseSelector.mockReturnValue(offersByCitySpecific);

    function TestComponent() {
      const offers = useFavoriteOffersByCity(CityName.Paris);
      return <div data-testid="count">{offers.length}</div>;
    }

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('count').textContent).toBe('1');
  });
});
