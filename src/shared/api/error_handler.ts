import { AxiosError } from 'axios';
import { UNEXPECTED_ERROR_MESSAGE } from '../../consts';
import { ServerError } from '../../interface/interface';

export function apiErrorHandler(e: unknown) {
  if (e instanceof AxiosError && e.response?.data) {
    const serverError = e.response.data as ServerError;
    return serverError;
  }
  return {
    errorType: 'UNEXPECTED_ERROR',
    message: UNEXPECTED_ERROR_MESSAGE,
    details: [],
  };
}
