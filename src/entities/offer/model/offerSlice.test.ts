import { offerReducer } from './offerSlice';
import { fetchFavoriteOffers } from '../data/fetchFavoriteOffers';
import { toggleFavoriteOffer } from '../data/toggleFavoriteOffer';
import { logout } from '../../user/data/logoutUser';
import type { OfferState } from './offerState';
import { OfferDetails } from './offerTypes';

describe('offer reducer', () => {
  it('should set favoriteOffers and favoriteCount on fetchFavoriteOffers.fulfilled', () => {
    const payload = {
      Paris: [{ id: '1' }, { id: '2' }],
      Dusseldorf: [],
    } as unknown as Partial<Record<string, { id: string }[]>>;
    const next = offerReducer(
      undefined,
      fetchFavoriteOffers.fulfilled(payload, '', undefined)
    );
    expect(next.favoriteOffers).toEqual(payload);
    expect(next.favoriteCount).toBe(2);
  });

  it('should add/remove favorites on toggleFavoriteOffer.fulfilled (status 1 add)', () => {
    const offer = { id: '1', city: { name: 'Paris' } } as unknown;
    const action = toggleFavoriteOffer.fulfilled(offer as OfferDetails, '', {
      id: '1',
      status: 1,
    });
    const next = offerReducer(undefined, action);
    expect(next.favoriteOffers['Paris']).toBeDefined();
    expect(next.favoriteCount).toBeGreaterThanOrEqual(1);
  });

  it('should clear favorites on logout.fulfilled', () => {
    const state = {
      favoriteOffers: { Paris: [{ id: '1' }] },
      favoriteCount: 1,
      availableOffers: [{ id: '1', isFavorite: true }],
      nearbyOffers: [{ id: '1', isFavorite: true }],
      offer: { id: '1', isFavorite: true },
    } as unknown as OfferState;
    const next = offerReducer(
      state,
      logout.fulfilled(undefined, '', undefined)
    );
    expect(next.favoriteOffers).toEqual({});
    expect(next.favoriteCount).toBe(0);
    expect(next.availableOffers[0].isFavorite).toBe(false);
    expect(next.nearbyOffers[0].isFavorite).toBe(false);
    expect(next.offer?.isFavorite).toBe(false);
  });
});
