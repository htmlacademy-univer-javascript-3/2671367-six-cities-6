import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import * as hooks from '../../../shared/hooks/app-hooks';
import * as offerHooks from '../../../entities/offer/hooks/offer-hooks';
import * as offerModule from '../../../entities/offer';

import { getAuthorizationStatus } from '../../../entities/user/model/user-selector';
import * as logoutModule from '../../../entities/user/data/logout-user';
import { AuthorizationStatus } from '../../../consts';
import { HeaderContainer } from './header-container';
import { renderWithProviders } from '../../../tests/render-with-providers';
import {
  mockedUseAppDispatch,
  mockedUseAppSelector,
} from '../../../setup-tests';

vi.mock('../../../entities/offer/hooks/offer-hooks', async () => {
  const actual = await vi.importActual<typeof offerHooks>(
    '../../../entities/offer/hooks/offer-hooks'
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
  it('dispatches fetch_favorite_offers on mount when authorized', () => {
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
