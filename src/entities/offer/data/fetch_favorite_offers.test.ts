import { describe, it, expect, vi } from 'vitest';
import type { AxiosInstance } from 'axios';
import type { AnyAction } from '@reduxjs/toolkit';
import { CityName } from '../../city';
import { ThunkExtraArg } from '../../../app/providers/store/model/state_interfaces';
import { fetch_favorite_offers, Offer } from '..';
import { offers } from '../../../mocks/offers';

describe('fetch_favorite_offers', () => {
  const mockOffer: Offer = offers[0];

  it('should successfully fetch and group favorite offers by city', async () => {
    const mockOffers: Offer[] = [
      {
        ...mockOffer,
        id: '1',
        city: { ...mockOffer.city, name: CityName.Paris },
      },
      {
        ...mockOffer,
        id: '2',
        city: { ...mockOffer.city, name: CityName.Paris },
      },
      {
        ...mockOffer,
        id: '3',
        city: { ...mockOffer.city, name: CityName.Cologne },
      },
    ];

    const mockApi = {
      get: vi.fn().mockResolvedValue({ data: mockOffers }),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = fetch_favorite_offers();

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.get).toHaveBeenCalledWith('/favorite');
    expect(result.type).toBe(fetch_favorite_offers.fulfilled.type);
    expect(result.payload).toEqual({
      [CityName.Paris]: [mockOffers[0], mockOffers[1]],
      [CityName.Cologne]: [mockOffers[2]],
    });
  });

  it('should handle empty response', async () => {
    const mockApi = {
      get: vi.fn().mockResolvedValue({ data: [] }),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const result = (await fetch_favorite_offers()(
      vi.fn(),
      vi.fn(),
      extra
    )) as AnyAction;

    expect(result.type).toBe(fetch_favorite_offers.fulfilled.type);
    expect(result.payload).toEqual({});
  });

  it('should handle API error', async () => {
    const error = new Error('Network error');

    const mockApi = {
      get: vi.fn().mockRejectedValue(error),
    } as unknown as AxiosInstance;

    const errorPayload = { message: 'Error fetching favorites', status: 500 };

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn().mockReturnValue(errorPayload),
    };

    const result = (await fetch_favorite_offers()(
      vi.fn(),
      vi.fn(),
      extra
    )) as AnyAction;

    expect(result.type).toBe(fetch_favorite_offers.rejected.type);
    expect(result.payload).toEqual(errorPayload);
  });
});
