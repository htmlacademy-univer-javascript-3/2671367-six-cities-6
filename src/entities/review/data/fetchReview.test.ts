import { vi, describe, it, expect } from 'vitest';
import type { AxiosInstance } from 'axios';
import type { ThunkExtraArg } from '../../../app/providers/store/model/stateInterfaces';
import type { AnyAction } from '@reduxjs/toolkit';
import { fetchOfferReviews } from '..';

describe('fetchOfferReviews thunk', () => {
  it('should dispatch fulfilled with reviews', async () => {
    const reviews = [
      { id: 'r1', comment: 'good', rating: 5 },
      { id: 'r2', comment: 'ok', rating: 4 },
    ];

    const mockApi = {
      get: vi.fn().mockResolvedValue({ data: reviews }),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = fetchOfferReviews('1');

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.get).toHaveBeenCalledWith('/comments/1');
    expect(result.type).toBe(fetchOfferReviews.fulfilled.type);
    expect(result.payload).toEqual({
      offerId: '1',
      reviews,
    });
  });

  it('should dispatch rejected on error', async () => {
    const mockApi = {
      get: vi.fn().mockRejectedValue(new Error('err')),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = fetchOfferReviews('1');

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(result.type).toBe(fetchOfferReviews.rejected.type);
    expect(result.payload).toEqual({
      errorType: 'UNEXPECTED_ERROR',
      message: 'err',
      details: [],
    });
  });
});
