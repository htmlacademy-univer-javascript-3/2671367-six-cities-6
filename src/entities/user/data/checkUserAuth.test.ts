import { vi, describe, it, expect } from 'vitest';
import type { AxiosInstance } from 'axios';
import type { ThunkExtraArg } from '../../../app/providers/store/model/state_interfaces';
import type { AnyAction } from '@reduxjs/toolkit';
import { checkAuth } from './checkUserAuth';

describe('checkAuth thunk', () => {
  it('should dispatch fulfilled with user auth data', async () => {
    const authData = {
      id: '1',
      email: 'test@test.com',
      token: 'token123',
    };

    const mockApi = {
      get: vi.fn().mockResolvedValue({ data: authData }),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = checkAuth();

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.get).toHaveBeenCalledWith('/login');
    expect(result.type).toBe(checkAuth.fulfilled.type);
    expect(result.payload).toEqual(authData);
  });
});
