import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { AuthorizationStatus, AppRoute } from '../../../../consts';
import { OfferDetailsUI } from './offer-details';
import { renderWithProviders } from '../../../../tests/render-with-providers';
import { offers } from '../../../../mocks/offers';

import { navigateMock, mockedUseAppSelector } from '../../../../setup-tests';

beforeEach(() => {
  vi.clearAllMocks();
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('OfferDetailsUI', () => {
  const baseOffer = offers[0];

  it('renders offer details content', () => {
    mockedUseAppSelector.mockReturnValue(
      AuthorizationStatus.NoAuth as AuthorizationStatus
    );
    const { getByText } = render(
      <OfferDetailsUI offer={{ ...baseOffer }} reviews={<div>REV</div>} />
    );

    expect(
      getByText('Beautiful & luxurious studio at great location')
    ).toBeInTheDocument();
    expect(getByText('Apartment')).toBeInTheDocument();
  });

  it('redirects to login on bookmark click when not auth', () => {
    mockedUseAppSelector.mockReturnValue(
      AuthorizationStatus.NoAuth as AuthorizationStatus
    );

    const { getByRole } = renderWithProviders(
      <OfferDetailsUI offer={{ ...baseOffer }} reviews={<div />} />
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('does not redirect to login on bookmark click when auth', () => {
    mockedUseAppSelector.mockReturnValue(
      AuthorizationStatus.Auth as AuthorizationStatus
    );
    navigateMock.mockClear();

    const { getByRole } = renderWithProviders(
      <OfferDetailsUI offer={{ ...baseOffer }} reviews={<div />} />
    );

    fireEvent.click(getByRole('button'));

    expect(navigateMock).not.toHaveBeenCalledWith(AppRoute.Login);
  });
});
