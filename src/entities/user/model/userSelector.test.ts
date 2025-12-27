import { describe, it, expect } from 'vitest';
import {
  getUserAuthData,
  getAuthError,
  getAuthorizationStatus,
} from './userSelector';
import { StateSchema } from '../../../app/providers/store';

describe('user selectors', () => {
  const mockState: StateSchema = {
    user: {
      user: { id: 'u1', name: 'User' },
      authError: 'bad creds',
      authStatus: 'AUTH',
    },
  } as unknown as StateSchema;

  it('getUserAuthData returns user data', () => {
    expect(getUserAuthData(mockState)).toEqual({ id: 'u1', name: 'User' });
  });

  it('getAuthError returns auth error', () => {
    expect(getAuthError(mockState)).toBe('bad creds');
  });

  it('getAuthorizationStatus returns auth status', () => {
    expect(getAuthorizationStatus(mockState)).toBe('AUTH');
  });
});
