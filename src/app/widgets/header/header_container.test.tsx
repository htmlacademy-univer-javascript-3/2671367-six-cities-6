import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import * as hooks from '../../../shared/hooks/appHooks';
import * as offerHooks from '../../../entities/offer/hooks/offerHooks';
import * as offerModule from '../../../entities/offer';

import { getAuthorizationStatus } from '../../../entities/user/model/userSelector';
import * as logoutModule from '../../../entities/user/data/logoutUser';
import { AuthorizationStatus } from '../../../consts';
import { HeaderContainer } from './header_container';
import { renderWithProviders } from '../../../tests/renderWithProviders';
import {
  mockedUseAppDispatch,
  mockedUseAppSelector,
} from '../../../setupTests';

vi.mock('../../../entities/offer/hooks/offerHooks', async () => {
  const actual = await vi.importActual<typeof offerHooks>(
    '../../../entities/offer/hooks/offerHooks'
  );
  return {
    ...actual,
    useFavoriteOffersByCity: vi.fn(),
  };
});

const mockedUseFavoriteOffersByCity = vi.mocked(
  offerHooks.useFavoriteOffersByCity
);

beforeEach(() => vi.clearAllMocks());

afterEach(() => vi.restoreAllMocks());

describe('HeaderContainer', () => {
  it('dispatches fetchFavoriteOffers on mount when authorized', () => {
    const dispatch = vi.fn();
    mockedUseAppDispatch.mockReturnValue(
      dispatch as unknown as ReturnType<typeof hooks.useAppDispatch>
    );

    // Return user for user selector, and Auth for getAuthorizationStatus
    mockedUseAppSelector.mockImplementation((selector) => {
      if (selector === getAuthorizationStatus) {
        return AuthorizationStatus.Auth;
      }
      return { email: 'a@b.com' };
    });

    mockedUseFavoriteOffersByCity.mockReturnValue([]);

    const fetchFn = vi.fn();
    vi.spyOn(offerModule, 'fetchFavoriteOffers').mockReturnValue(
      fetchFn as unknown as typeof fetchFn
    );

    renderWithProviders(<HeaderContainer />);

    expect(dispatch).toHaveBeenCalled();
  });

  it('does not dispatch logout when not auth', () => {
    const dispatch = vi.fn();
    mockedUseAppDispatch.mockReturnValue(
      dispatch as unknown as ReturnType<typeof hooks.useAppDispatch>
    );

    mockedUseAppSelector.mockReturnValue(null);
    mockedUseFavoriteOffersByCity.mockReturnValue([]);

    const logoutFn = vi.fn();
    vi.spyOn(logoutModule, 'logout').mockReturnValue(
      logoutFn as unknown as typeof logoutFn
    );

    renderWithProviders(<HeaderContainer />);

    expect(dispatch).toHaveBeenCalledTimes(0);
  });
});
