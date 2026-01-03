import { describe, it, expect, vi } from 'vitest';
import type { AxiosInstance } from 'axios';
import type { AnyAction } from '@reduxjs/toolkit';
import type { ThunkExtraArg } from '../../../app/providers/store/model/stateInterfaces';
import { toggleFavoriteOffer } from './toggleFavoriteOffer';

describe('toggleFavoriteOffer', () => {
  const mockOffer = {
    id: '1',
    city: { name: 'Paris' },
  };

  it('should successfully toggle favorite offer', async () => {
    const mockApi = {
      post: vi.fn().mockResolvedValue({ data: mockOffer }),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = toggleFavoriteOffer({ id: '1', status: 1 });

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.post).toHaveBeenCalledWith('/favorite/1/1');
    expect(result.type).toBe(toggleFavoriteOffer.fulfilled.type);
    expect(result.payload).toEqual(mockOffer);
  });

  it('should handle API error', async () => {
    const error = new Error('Network error');
    const errorPayload = { message: 'Error toggling favorite', status: 500 };

    const mockApi = {
      post: vi.fn().mockRejectedValue(error),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn().mockReturnValue(errorPayload),
    };

    const thunk = toggleFavoriteOffer({ id: '1', status: 0 });

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.post).toHaveBeenCalledWith('/favorite/1/0');
    expect(result.type).toBe(toggleFavoriteOffer.rejected.type);
    expect(result.payload).toEqual(errorPayload);
  });
});
