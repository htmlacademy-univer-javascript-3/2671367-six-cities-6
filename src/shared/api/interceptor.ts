import axios, { AxiosInstance } from 'axios';
import { getAccessToken, removeAccessToken } from './authToken';
import { AppRoute } from '../../consts';

const PUBLIC_ROUTES = [AppRoute.Login, AppRoute.Root];

export function setupInterceptors(api: AxiosInstance) {
  api.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
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
  );
}
