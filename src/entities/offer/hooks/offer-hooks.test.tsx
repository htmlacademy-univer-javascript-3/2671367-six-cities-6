import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import * as redux from 'react-redux';
import {
  useOfferSort,
  useSetOfferSort,
  useFavoriteOffersByCity,
} from './offer-hooks';
import { offerActions } from '../model/offer-slice';
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

describe('offer_hooks compact coverage', () => {
  it('useOfferSort returns value or undefined', () => {
    // нормальное значение
    mockedUseSelector.mockReturnValueOnce('price-asc');
    function Test1() {
      const val = useOfferSort();
      return <div data-testid="val1">{String(val)}</div>;
    }
    const { getByTestId } = render(<Test1 />);
    expect(getByTestId('val1').textContent).toBe('price-asc');

    mockedUseSelector.mockReturnValueOnce(undefined);
    function Test2() {
      const val = useOfferSort();
      return <div data-testid="val2">{String(val)}</div>;
    }
    const { getByTestId: get2 } = render(<Test2 />);
    expect(get2('val2').textContent).toBe('undefined');
  });

  it('useSetOfferSort dispatches multiple sort types', () => {
    const mockDispatchFn = vi.fn();
    mockedUseDispatch.mockReturnValue(mockDispatchFn);

    function Test() {
      const setSort = useSetOfferSort();
      return (
        <>
          <button data-testid="btn1" onClick={() => setSort('price-asc')} />
          <button data-testid="btn2" onClick={() => setSort('price-desc')} />
        </>
      );
    }
    const { getByTestId } = render(<Test />);
    fireEvent.click(getByTestId('btn1'));
    fireEvent.click(getByTestId('btn2'));

    expect(mockDispatchFn).toHaveBeenCalledWith(
      offerActions.setSort('price-asc')
    );
    expect(mockDispatchFn).toHaveBeenCalledWith(
      offerActions.setSort('price-desc')
    );
  });

  it('useFavoriteOffersByCity handles all city cases', () => {
    const favorite_offers: Record<string, Offer[] | null> = {
      Paris: [
        {
          id: '1',
          title: 't1',
          type: 'Apartment',
          price: 100,
          city: {
            name: CityName.Paris,
            location: { latitude: 0, longitude: 0 },
          },
          location: { latitude: 0, longitude: 0 },
          rating: 4,
          isPremium: false,
          isFavorite: false,
          previewImage: '',
        },
      ],
      Cologne: null,
    };
    mockedUseSelector.mockReturnValue(favorite_offers);

    function Test1() {
      const offers = useFavoriteOffersByCity(CityName.Paris);
      return <div data-testid="count1">{offers.length}</div>;
    }
    function Test2() {
      const offers = useFavoriteOffersByCity(CityName.Cologne);
      return <div data-testid="count2">{offers.length}</div>;
    }

    function Test3() {
      const offers = useFavoriteOffersByCity();
      return <div data-testid="count3">{offers.length}</div>;
    }

    const { getByTestId } = render(
      <>
        <Test1 />
        <Test2 />
        <Test3 />
      </>
    );

    expect(getByTestId('count1').textContent).toBe('1');
    expect(getByTestId('count2').textContent).toBe('0');
    expect(getByTestId('count3').textContent).toBe('1');
  });
});
