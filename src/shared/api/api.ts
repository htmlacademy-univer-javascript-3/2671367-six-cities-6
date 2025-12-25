import axios, { AxiosInstance } from 'axios';

import { BACKEND_URL, REQUEST_TIMEOUT } from '../../consts';
import { setupInterceptors } from './interceptor';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  setupInterceptors(api);

  return api;
};
