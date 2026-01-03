import { StateSchema } from '../../../app/providers/store';

export const getUserAuthData = (state: StateSchema) => state.user.user;

export const getAuthError = (state: StateSchema) => state.user.authError;

export const getAuthorizationStatus = (state: StateSchema) =>
  state.user.authStatus;
