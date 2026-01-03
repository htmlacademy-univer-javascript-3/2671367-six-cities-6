import { describe, it, expect } from 'vitest';
import {
  getAvailableOffers,
  getNearbyOffers,
  getOffer,
  getFavoriteOffers,
  getFavoriteCount,
} from './offer_selector';
import { StateSchema } from '../../../app/providers/store';

describe('offer selectors', () => {
  const mockState: StateSchema = {
    offer: {
      availableOffers: [{ id: 'a1' }],
      nearbyOffers: [{ id: 'n1' }],
      offer: { id: 'o1' },
      favorite_offers: [{ id: 'f1' }],
      favoriteCount: 7,
    },
  } as unknown as StateSchema;

  it('getAvailableOffers returns available offers', () => {
    expect(getAvailableOffers(mockState)).toEqual([{ id: 'a1' }]);
  });

  it('getNearbyOffers returns nearby offers', () => {
    expect(getNearbyOffers(mockState)).toEqual([{ id: 'n1' }]);
  });

  it('getOffer returns current offer', () => {
    expect(getOffer(mockState)).toEqual({ id: 'o1' });
  });

  it('getFavoriteOffers returns favorite offers', () => {
    expect(getFavoriteOffers(mockState)).toEqual([{ id: 'f1' }]);
  });

  it('getFavoriteCount returns favorite count', () => {
    expect(getFavoriteCount(mockState)).toBe(7);
  });
});
