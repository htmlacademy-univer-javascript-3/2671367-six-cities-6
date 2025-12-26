import { userReducer } from './userSlice';
import { AuthorizationStatus } from '../../../consts';
import { login } from '../data/loginUser';
import { logout } from '../data/logoutUser';
import { UserAuthData } from '..';

describe('user reducer', () => {
  it('should have Unknown authStatus by default', () => {
    const state = userReducer(undefined, { type: 'unknown' });
    expect(state.authStatus).toBe(AuthorizationStatus.Unknown);
  });

  it('should set user on login.fulfilled', () => {
    const fakeUser: UserAuthData = {
      email: 'a@b.com',
      token: 'fake-token',
      name: 'John Doe',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    };

    const next = userReducer(
      undefined,
      login.fulfilled(fakeUser, '', { email: 'a@b.com', password: '123456' })
    );
    expect(next.user).toEqual(fakeUser);
    expect(next.authStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should clear user on logout.fulfilled', () => {
    const state = {
      user: { id: '1' },
      authStatus: AuthorizationStatus.Auth,
    } as unknown as import('./userState').UserState;
    const next = userReducer(state, logout.fulfilled(undefined, '', undefined));
    expect(next.user).toBeUndefined();
    expect(next.authStatus).toBe(AuthorizationStatus.NoAuth);
  });
});
