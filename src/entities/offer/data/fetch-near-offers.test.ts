import { describe, it, expect, vi } from 'vitest';
import type { AxiosInstance } from 'axios';
import type { AnyAction } from '@reduxjs/toolkit';
import type { ThunkExtraArg } from '../../../app/providers/store/model/state-interfaces';

import { fetchNearOffersByCity } from '..';
import { CityName } from '../../city/constant/city-consts';
import type { Offer } from '../model/offer-types';
import { offers } from '../../../mocks/offers';

describe('fetchNearOffersByCity', () => {
  const baseOffer: Offer = offers[0];

  it('should fetch and filter nearby offers by city', async () => {
    const mockOffers: Offer[] = [
      {
        ...baseOffer,
        id: '2',
        city: { ...baseOffer.city, name: CityName.Paris },
      },
      {
        ...baseOffer,
        id: '3',
        city: { ...baseOffer.city, name: CityName.Cologne },
      },
      {
        ...baseOffer,
        id: '4',
        city: { ...baseOffer.city, name: CityName.Paris },
      },
    ];

    const mockApi = {
      get: vi.fn().mockResolvedValue({ data: mockOffers }),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = fetchNearOffersByCity({
      id: '1',
      city: CityName.Paris,
    });

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.get).toHaveBeenCalledWith('/offers/1/nearby');
    expect(result.type).toBe(fetchNearOffersByCity.fulfilled.type);
    expect(result.payload).toEqual([mockOffers[0], mockOffers[2]]);
  });

  it('should return empty array if no offers match the city', async () => {
    const mockOffers: Offer[] = [
      {
        ...baseOffer,
        id: '2',
        city: { ...baseOffer.city, name: CityName.Cologne },
      },
    ];

    const mockApi = {
      get: vi.fn().mockResolvedValue({ data: mockOffers }),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = fetchNearOffersByCity({
      id: '1',
      city: CityName.Paris,
    });

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(result.type).toBe(fetchNearOffersByCity.fulfilled.type);
    expect(result.payload).toEqual([]);
  });

  it('should handle API error', async () => {
    const error = new Error('Network error');
    const errorPayload = {
      message: 'Error fetching nearby offers',
      status: 404,
    };

    const mockApi = {
      get: vi.fn().mockRejectedValue(error),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn().mockReturnValue(errorPayload),
    };

    const thunk = fetchNearOffersByCity({
      id: '1',
      city: CityName.Paris,
    });

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(result.type).toBe(fetchNearOffersByCity.rejected.type);
    expect(result.payload).toEqual(errorPayload);
  });
});
