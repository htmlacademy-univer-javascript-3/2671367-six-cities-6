import { vi, describe, it, expect } from 'vitest';
import type { AxiosInstance } from 'axios';
import type { ThunkExtraArg } from '../../../app/providers/store/model/state_interfaces';
import type { AnyAction } from '@reduxjs/toolkit';
import * as authToken from '../../../shared/api/authToken';
import { logout } from './logoutUser';

describe('logout thunk', () => {
  it('should call api and remove access token', async () => {
    const mockApi = {
      delete: vi.fn().mockResolvedValue(undefined),
    } as unknown as AxiosInstance;

    const removeTokenSpy = vi
      .spyOn(authToken, 'removeAccessToken')
      .mockImplementation(() => {});

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = logout();

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.delete).toHaveBeenCalledWith('/login');
    expect(removeTokenSpy).toHaveBeenCalled();
    expect(result.type).toBe(logout.fulfilled.type);

    removeTokenSpy.mockRestore();
  });
});
