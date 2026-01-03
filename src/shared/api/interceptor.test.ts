import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import * as authToken from './auth-token';
import { AppRoute } from '../../consts';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  requestInterceptor,
  responseInterceptor,
  setupInterceptors,
} from './interceptor';

describe('setupInterceptors', () => {
  let api = axios.create();
  const originalLocation = window.location;

  beforeEach(() => {
    api = axios.create();
    vi.spyOn(authToken, 'getAccessToken').mockReturnValue('token123');
    vi.spyOn(authToken, 'removeAccessToken').mockImplementation(() => {});

    const mockLocation = { pathname: '/some', href: '' } as unknown as Location;
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      configurable: true,
    });

    setupInterceptors(api);
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', { value: originalLocation });
    vi.restoreAllMocks();
  });

  it('adds X-Token header if token exists', () => {
    const config: InternalAxiosRequestConfig = {
      headers: {} as AxiosRequestHeaders,
    };
    const result = requestInterceptor(config);

    expect(result.headers?.['X-Token']).toBe('token123');
  });

  it('does not fail if headers is undefined', () => {
    const config: InternalAxiosRequestConfig = {
      headers: undefined as unknown as AxiosRequestHeaders,
    };
    const result = requestInterceptor(config);

    expect(result.headers).toBeUndefined();
  });

  it('removes token and redirects on 401', async () => {
    const error = {
      response: { status: 401 },
      isAxiosError: true,
    } as unknown as AxiosError;

    const setHrefSpy = vi
      .spyOn(window.location, 'href', 'set')
      .mockImplementation(() => undefined);

    await expect(responseInterceptor(error)).rejects.toBe(error);

    expect(authToken.removeAccessToken).toHaveBeenCalled();
    expect(setHrefSpy).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('does not remove token for public routes', async () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: AppRoute.Login, href: '' } as unknown as Location,
      configurable: true,
    });

    const error = {
      response: { status: 401 },
      isAxiosError: true,
    } as unknown as AxiosError;

    await expect(responseInterceptor(error)).rejects.toBe(error);
    expect(authToken.removeAccessToken).not.toHaveBeenCalled();
  });

  it('does nothing when error is not an axios error', async () => {
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);

    const err = new Error('network') as unknown as AxiosError;

    await expect(responseInterceptor(err)).rejects.toBe(err);

    expect(authToken.removeAccessToken).not.toHaveBeenCalled();
  });

  it('does nothing for axios errors with non-401 status', async () => {
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const error = {
      response: { status: 403 },
      isAxiosError: true,
    } as unknown as AxiosError;

    await expect(responseInterceptor(error)).rejects.toBe(error);

    expect(authToken.removeAccessToken).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });

  it('registers interceptors on the api instance', () => {
    const reqUse = vi.fn();
    const resUse = vi.fn();

    const fakeApi = {
      interceptors: {
        request: { use: reqUse },
        response: { use: resUse },
      },
    } as unknown as AxiosInstance;

    setupInterceptors(fakeApi);

    expect(reqUse).toHaveBeenCalledWith(requestInterceptor);

    expect(resUse).toHaveBeenCalled();
    const [[firstArg, secondArg]] = resUse.mock.calls as unknown as [
      unknown,
      unknown
    ][];
    expect(typeof firstArg).toBe('function');
    expect(secondArg).toBe(responseInterceptor);
  });
});
