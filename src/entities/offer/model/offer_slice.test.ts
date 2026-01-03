import { offerReducer, offerActions } from './offerSlice';
import { fetchFavoriteOffers } from '../data/fetchFavoriteOffers';
import { toggleFavoriteOffer } from '../data/toggleFavoriteOffer';
import { fetchOffersByCity } from '../data/fetchOffersByCity';
import { fetchOfferDetalies } from '../data/fetchOfferDetailes';
import { fetchNearOffersByCity } from '../data/fetchNearOffers';
import { logout } from '../../user/data/logoutUser';
import type { OfferState } from './offerState';
import type { OfferDetails } from './offerTypes';
import { CityName } from '../../city';

describe('offer reducer', () => {
  const parisOffer = {
    id: '1',
    isFavorite: false,
    city: { name: 'Paris' },
  } as OfferDetails;

  const amsterdamOffer = {
    id: '2',
    isFavorite: true,
    city: { name: 'Amsterdam' },
  } as OfferDetails;

  it('should return initial state by default', () => {
    const state = offerReducer(undefined, { type: 'unknown' });

    expect(state.availableOffers).toEqual([]);
    expect(state.nearbyOffers).toEqual([]);
    expect(state.offer).toBeNull();
    expect(state.favoriteOffers).toEqual({});
    expect(state.favoriteCount).toBe(0);
    expect(state.filterBy).toBe('popular-desc');
  });

  it('should set availableOffers on fetchOffersByCity.fulfilled', () => {
    const next = offerReducer(
      undefined,
      fetchOffersByCity.fulfilled([parisOffer], '', CityName.Paris)
    );

    expect(next.availableOffers).toEqual([parisOffer]);
  });

  it('should set offer on fetchOfferDetalies.fulfilled', () => {
    const next = offerReducer(
      undefined,
      fetchOfferDetalies.fulfilled(parisOffer, '', '1')
    );

    expect(next.offer).toEqual(parisOffer);
  });

  it('should set nearbyOffers on fetchNearOffersByCity.fulfilled', () => {
    const next = offerReducer(
      undefined,
      fetchNearOffersByCity.fulfilled([parisOffer], '', {
        id: '1',
        city: CityName.Paris,
      })
    );

    expect(next.nearbyOffers).toEqual([parisOffer]);
  });

  it('should set favoriteOffers and favoriteCount on fetchFavoriteOffers.fulfilled', () => {
    const payload = {
      Paris: [parisOffer],
      Amsterdam: [amsterdamOffer],
    };

    const next = offerReducer(
      undefined,
      fetchFavoriteOffers.fulfilled(payload, '', undefined)
    );

    expect(next.favoriteOffers).toEqual(payload);
    expect(next.favoriteCount).toBe(2);
  });

  it('should add offer to favorites on toggleFavoriteOffer.fulfilled with status = 1', () => {
    const next = offerReducer(
      undefined,
      toggleFavoriteOffer.fulfilled(parisOffer, '', {
        id: '1',
        status: 1,
      })
    );

    expect(next.favoriteOffers['Paris']).toHaveLength(1);
    expect(next.favoriteOffers['Paris']![0].id).toBe('1');
    expect(next.favoriteCount).toBe(1);
  });

  it('should remove offer from favorites on toggleFavoriteOffer.fulfilled with status = 0', () => {
    const startState: OfferState = {
      availableOffers: [],
      nearbyOffers: [],
      offer: null,
      filterBy: 'popular-desc',
      favoriteCount: 1,
      favoriteOffers: {
        Paris: [parisOffer],
      },
    };

    const next = offerReducer(
      startState,
      toggleFavoriteOffer.fulfilled(parisOffer, '', {
        id: '1',
        status: 0,
      })
    );

    expect(next.favoriteOffers['Paris']).toEqual([]);
    expect(next.favoriteCount).toBe(0);
  });

  it('should toggle isFavorite in availableOffers and nearbyOffers', () => {
    const startState: OfferState = {
      availableOffers: [{ ...parisOffer }],
      nearbyOffers: [{ ...parisOffer }],
      offer: null,
      favoriteOffers: {},
      favoriteCount: 0,
      filterBy: 'popular-desc',
    };

    const next = offerReducer(
      startState,
      toggleFavoriteOffer.fulfilled({ ...parisOffer, isFavorite: true }, '', {
        id: '1',
        status: 1,
      })
    );

    expect(next.availableOffers[0].isFavorite).toBe(true);
    expect(next.nearbyOffers[0].isFavorite).toBe(true);
  });

  it('should toggle isFavorite on current offer if ids match', () => {
    const startState: OfferState = {
      availableOffers: [],
      nearbyOffers: [],
      offer: { ...parisOffer, isFavorite: false },
      favoriteOffers: {},
      favoriteCount: 0,
      filterBy: 'popular-desc',
    };

    const next = offerReducer(
      startState,
      toggleFavoriteOffer.fulfilled({ ...parisOffer, isFavorite: true }, '', {
        id: '1',
        status: 1,
      })
    );

    expect(next.offer?.isFavorite).toBe(true);
  });

  it('should clear favorites and reset flags on logout.fulfilled', () => {
    const startState: OfferState = {
      availableOffers: [{ ...parisOffer, isFavorite: true }],
      nearbyOffers: [{ ...parisOffer, isFavorite: true }],
      offer: { ...parisOffer, isFavorite: true },
      favoriteOffers: { Paris: [parisOffer] },
      favoriteCount: 1,
      filterBy: 'popular-desc',
    };

    const next = offerReducer(
      startState,
      logout.fulfilled(undefined, '', undefined)
    );

    expect(next.favoriteOffers).toEqual({});
    expect(next.favoriteCount).toBe(0);
    expect(next.availableOffers[0].isFavorite).toBe(false);
    expect(next.nearbyOffers[0].isFavorite).toBe(false);
    expect(next.offer?.isFavorite).toBe(false);
  });

  it('should set sort filter on setSort', () => {
    const next = offerReducer(undefined, offerActions.setSort('price-asc'));

    expect(next.filterBy).toBe('price-asc');
  });
});
