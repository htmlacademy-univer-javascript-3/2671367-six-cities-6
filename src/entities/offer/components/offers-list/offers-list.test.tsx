import { describe, it, expect, vi, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { OffersList } from './offers-list';
import { offers } from '../../../../mocks/offers';
import { renderWithProviders } from '../../../../tests/render-with-providers';

afterEach(() => vi.clearAllMocks());

describe('OffersList', () => {
  it('renders correct container class for cities variant and renders offer cards', () => {
    const { container } = renderWithProviders(
      <OffersList offers={offers} variant="cities" />
    );

    expect(container.querySelector('.cities__places-list')).toBeInTheDocument();
    expect(container.querySelectorAll('.place-card').length).toBe(4);
  });

  it('calls onOfferHover when card hovered', () => {
    const onOfferHover = vi.fn();
    const { container } = renderWithProviders(
      <OffersList
        offers={offers}
        variant="cities"
        onOfferHover={onOfferHover}
      />
    );

    const card = container.querySelector('.place-card') as HTMLElement;
    fireEvent.mouseEnter(card);
    expect(onOfferHover).toHaveBeenCalledWith('1');

    fireEvent.mouseLeave(card);
    expect(onOfferHover).toHaveBeenCalledWith(null);
  });
});
