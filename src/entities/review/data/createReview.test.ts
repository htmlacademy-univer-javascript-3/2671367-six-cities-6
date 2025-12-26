import { describe, it, expect, vi } from 'vitest';
import type { AxiosInstance } from 'axios';
import type { AnyAction } from '@reduxjs/toolkit';
import type { ThunkExtraArg } from '../../../app/providers/store/model/stateInterfaces';

import { createOfferReview } from './createReview';

describe('createOfferReview', () => {
  it('should successfully create review', async () => {
    const createdReview = { id: 'r1', comment: 'ok' };

    const mockApi = {
      post: vi.fn().mockResolvedValue({ data: createdReview }),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = createOfferReview({
      offerId: '1',
      rating: 5,
      comment: 'ok',
    });

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.post).toHaveBeenCalledWith('/comments/1', {
      rating: 5,
      comment: 'ok',
    });

    expect(result.type).toBe(createOfferReview.fulfilled.type);
    expect(result.payload).toEqual({
      offerId: '1',
      review: createdReview,
    });
  });

  it('should handle API error', async () => {
    const error = new Error('Network error');
    const errorPayload = { message: 'Error creating review', status: 400 };

    const mockApi = {
      post: vi.fn().mockRejectedValue(error),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn().mockReturnValue(errorPayload),
    };

    const thunk = createOfferReview({
      offerId: '1',
      rating: 5,
      comment: 'ok',
    });

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.post).toHaveBeenCalledWith('/comments/1', {
      rating: 5,
      comment: 'ok',
    });

    expect(result.type).toBe(createOfferReview.rejected.type);
    expect(result.payload).toEqual(errorPayload);
  });
});
