import { StateSchema } from '../../../app/providers/store/model/state-interfaces';

export const getAvailableOffers = (state: StateSchema) =>
  state.offer.availableOffers;

export const getNearbyOffers = (state: StateSchema) => state.offer.nearbyOffers;

export const getOffer = (state: StateSchema) => state.offer.offer;

export const getFavoriteOffers = (state: StateSchema) =>
  state.offer.favorite_offers;

export const getFavoriteCount = (state: StateSchema) =>
  state.offer.favoriteCount;
