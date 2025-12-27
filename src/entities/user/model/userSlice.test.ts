import { userReducer } from './userSlice';
import { AuthorizationStatus } from '../../../consts';
import { login } from '../data/loginUser';
import { logout } from '../data/logoutUser';
import { checkAuth } from '../data/checkUserAuth';
import type { UserAuthData } from '..';
import type { UserState } from './userState';
import { mockUnexpectedError, mockValidationError } from '../../../setupTests';

describe('user reducer', () => {
  const user: UserAuthData = {
    email: 'a@b.com',
    token: 'fake-token',
    name: 'John Doe',
    avatarUrl: 'avatar.jpg',
    isPro: false,
  };

  it('should have Unknown authStatus by default', () => {
    const state = userReducer(undefined, { type: 'unknown' });
    expect(state.authStatus).toBe(AuthorizationStatus.Unknown);
    expect(state.user).toBeUndefined();
  });

  it('should reset authError on login.pending', () => {
    const startState: UserState = {
      authStatus: AuthorizationStatus.NoAuth,
      authError: mockValidationError,
    };

    const next = userReducer(
      startState,
      login.pending('', { email: 'a@b.com', password: '123456' })
    );

    expect(next.authError).toBeUndefined();
  });

  it('should set user and Auth status on login.fulfilled', () => {
    const next = userReducer(
      undefined,
      login.fulfilled(user, '', { email: 'a@b.com', password: '123456' })
    );

    expect(next.user).toEqual(user);
    expect(next.authStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set NoAuth status and authError on login.rejected', () => {
    const next = userReducer(
      undefined,
      login.rejected(
        new Error('login failed'),
        '',
        { email: 'a@b.com', password: '123456' },
        mockUnexpectedError
      )
    );

    expect(next.authStatus).toBe(AuthorizationStatus.NoAuth);
    expect(next.authError).toBe(mockUnexpectedError);
  });

  it('should set user and Auth status on checkAuth.fulfilled', () => {
    const next = userReducer(
      undefined,
      checkAuth.fulfilled(user, '', undefined)
    );

    expect(next.user).toEqual(user);
    expect(next.authStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should clear user and set NoAuth status on checkAuth.rejected', () => {
    const startState: UserState = {
      user,
      authStatus: AuthorizationStatus.Auth,
    };

    const next = userReducer(
      startState,
      checkAuth.rejected(new Error('unauthorized'), '', undefined)
    );

    expect(next.user).toBeUndefined();
    expect(next.authStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should clear user and set NoAuth status on logout.fulfilled', () => {
    const startState: UserState = {
      user,
      authStatus: AuthorizationStatus.Auth,
    };

    const next = userReducer(
      startState,
      logout.fulfilled(undefined, '', undefined)
    );

    expect(next.user).toBeUndefined();
    expect(next.authStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should clear user but keep authStatus on logout.rejected', () => {
    const startState: UserState = {
      user,
      authStatus: AuthorizationStatus.Auth,
    };

    const next = userReducer(
      startState,
      logout.rejected(new Error('logout failed'), '', undefined)
    );

    expect(next.user).toBeUndefined();
    expect(next.authStatus).toBe(AuthorizationStatus.Auth);
  });
});
