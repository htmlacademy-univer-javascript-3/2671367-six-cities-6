import { vi, describe, it, expect } from 'vitest';
import type { AxiosInstance } from 'axios';
import type { ThunkExtraArg } from '../../../app/providers/store/model/state-interfaces';
import type { AnyAction } from '@reduxjs/toolkit';
import * as authToken from '../../../shared/api/auth-token';
import { login } from './login-user';
import { ServerError } from '../../../interface/interface';

describe('login thunk', () => {
  it('should dispatch fulfilled and set access token', async () => {
    const authData = {
      id: '1',
      email: 'test@test.com',
      token: 'token123',
    };

    const mockApi = {
      post: vi.fn().mockResolvedValue({ data: authData }),
    } as unknown as AxiosInstance;

    const setTokenSpy = vi
      .spyOn(authToken, 'setAccessToken')
      .mockImplementation(() => {});

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(),
    };

    const thunk = login({ email: 'test@test.com', password: '123456' });

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(mockApi.post).toHaveBeenCalledWith('/login', {
      email: 'test@test.com',
      password: '123456',
    });

    expect(setTokenSpy).toHaveBeenCalledWith('token123');
    expect(result.type).toBe(login.fulfilled.type);
    expect(result.payload).toEqual(authData);

    setTokenSpy.mockRestore();
  });

  it('should dispatch rejected on error', async () => {
    const mockApi = {
      post: vi.fn().mockRejectedValue(new Error('err')),
    } as unknown as AxiosInstance;

    const extra: ThunkExtraArg = {
      api: mockApi,
      errorHandler: vi.fn(
        (): ServerError => ({
          errorType: 'UNEXPECTED_ERROR',
          message: 'err',
          details: [],
        })
      ),
    };

    const thunk = login({ email: 'test@test.com', password: '123456' });

    const result = (await thunk(vi.fn(), vi.fn(), extra)) as AnyAction;

    expect(result.type).toBe(login.rejected.type);
    expect(result.payload).toEqual({
      errorType: 'UNEXPECTED_ERROR',
      message: 'err',
      details: [],
    });
  });
});
