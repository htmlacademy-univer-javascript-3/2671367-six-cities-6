import { describe, it, expect, vi } from 'vitest';
import type { AxiosInstance } from 'axios';
import type { AnyAction } from '@reduxjs/toolkit';
import type { ThunkExtraArg } from '../../../app/providers/store/model/state-interfaces';

import { OfferDetails } from '../model/offer-types';
import { fetchOfferDetalies } from '..';
import { offers } from '../../../mocks/offers';

describe('fetchOfferDetalies', () => {
  const mockOfferDetails: OfferDetails = offers[0];

  it('should successfully fetch offer details', async () => {
    const mockApi = {
      get: vi.fn().mockResolvedValue({ data: mockOfferDetails }),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = fetchOfferDetalies('1');

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.get).toHaveBeenCalledWith('/offers/1');
    expect(result.type).toBe(fetchOfferDetalies.fulfilled.type);
    expect(result.payload).toEqual(mockOfferDetails);
  });

  it('should reject if response data is null', async () => {
    const errorPayload = { message: 'Empty response', status: 500 };

    const mockApi = {
      get: vi.fn().mockResolvedValue({ data: null }),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn().mockReturnValue(errorPayload),
    };

    const thunk = fetchOfferDetalies('1');

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.get).toHaveBeenCalledWith('/offers/1');
    expect(result.type).toBe(fetchOfferDetalies.rejected.type);
    expect(result.payload).toEqual(errorPayload);
  });

  it('should handle API error', async () => {
    const error = new Error('Network error');
    const errorPayload = { message: 'Server error', status: 500 };

    const mockApi = {
      get: vi.fn().mockRejectedValue(error),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn().mockReturnValue(errorPayload),
    };

    const thunk = fetchOfferDetalies('1');

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.get).toHaveBeenCalledWith('/offers/1');
    expect(result.type).toBe(fetchOfferDetalies.rejected.type);
    expect(result.payload).toEqual(errorPayload);
  });
});
