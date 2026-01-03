import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/react';

import * as appHooks from '../../../../shared/hooks/appHooks';
import { OfferCard } from './offer_card';
import { AuthorizationStatus, AppRoute } from '../../../../consts';
import type { Offer } from '../../index';
import { CityName } from '../../../city';
import { renderWithProviders } from '../../../../tests/renderWithProviders';

import {
  navigateMock,
  mockedUseAppDispatch,
  mockedUseAppSelector,
} from '../../../../setupTests';

beforeEach(() => {
  vi.clearAllMocks();
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('OfferCard', () => {
  const exampleOffer: Offer = {
    id: 'o1',
    title: 'Title',
    type: 'Apartment',
    price: 100,
    city: {
      name: CityName.Paris,
      location: { latitude: 48.864716, longitude: 2.349014 },
    },
    location: { latitude: 48.864716, longitude: 2.349014 },
    rating: 4,
    isPremium: true,
    isFavorite: false,
    previewImage: '/img.png',
  };

  it('renders offer information and premium badge', () => {
    mockedUseAppSelector.mockReturnValue(
      AuthorizationStatus.NoAuth as AuthorizationStatus
    );

    const { getByText, getByAltText } = renderWithProviders(
      <OfferCard offer={exampleOffer} variant="cities" />
    );

    expect(getByText('Title')).toBeInTheDocument();
    expect(getByAltText('Title')).toBeInTheDocument();
    expect(getByText('Premium')).toBeInTheDocument();
  });

  it('redirects to login when bookmark clicked while unauthorized', () => {
    mockedUseAppSelector.mockReturnValue(
      AuthorizationStatus.NoAuth as AuthorizationStatus
    );

    const { getByRole } = renderWithProviders(
      <OfferCard offer={exampleOffer} variant="cities" />
    );

    const bookmarkButton = getByRole('button', {
      name: /to bookmarks|in bookmarks/i,
    });
    fireEvent.click(bookmarkButton);

    expect(navigateMock).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('dispatches toggleFavoriteOffer when user is authorized', () => {
    mockedUseAppSelector.mockReturnValue(
      AuthorizationStatus.Auth as AuthorizationStatus
    );

    const dispatchMock = vi.fn(() => ({ unwrap: () => Promise.resolve() }));
    mockedUseAppDispatch.mockReturnValue(
      dispatchMock as unknown as ReturnType<typeof appHooks.useAppDispatch>
    );

    const { getByRole } = renderWithProviders(
      <OfferCard
        offer={{ ...exampleOffer, isFavorite: false }}
        variant="cities"
      />
    );

    const bookmarkButton = getByRole('button', {
      name: /to bookmarks|in bookmarks/i,
    });
    fireEvent.click(bookmarkButton);

    expect(dispatchMock).toHaveBeenCalled();
  });
});
