import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, removeAccessToken } from './authToken';
import { AppRoute } from '../../consts';

const PUBLIC_ROUTES = [AppRoute.Login, AppRoute.Root];

export function requestInterceptor(config: InternalAxiosRequestConfig) {
  const token = getAccessToken();

  if (token && config.headers) {
    config.headers['X-Token'] = token;
  }

  return config;
}

export function responseInterceptor(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (
      error.response?.status === 401 &&
      !PUBLIC_ROUTES.includes(window.location.pathname as AppRoute)
    ) {
      removeAccessToken();
      if (window.location.pathname !== (AppRoute.Login as string)) {
        window.location.href = AppRoute.Login;
      }
    }
  }

  return Promise.reject(error);
}

export function setupInterceptors(api: AxiosInstance) {
  api.interceptors.request.use(requestInterceptor);
  api.interceptors.response.use((res) => res, responseInterceptor);
}
